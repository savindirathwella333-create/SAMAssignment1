// ========================================
// API & Authentication Service
// ========================================

const API_URL = 'http://localhost:3000/api';

// ── Token & User Management ───────────────────────────────
const saveToken   = (token) => localStorage.setItem('token', token);
const getToken    = ()      => localStorage.getItem('token');
const removeToken = ()      => localStorage.removeItem('token');
const saveUser    = (user)  => localStorage.setItem('user', JSON.stringify(user));
const getUser     = ()      => JSON.parse(localStorage.getItem('user') || 'null');
const isAdmin     = ()      => getUser()?.role === 'admin';
const isLoggedIn  = ()      => !!getToken();

// ── Auth Headers ──────────────────────────────────────────
const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

// ── Register ──────────────────────────────────────────────
async function register(username, email, password) {
  const res  = await fetch(`${API_URL}/auth/register`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ username, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  saveToken(data.token);
  saveUser(data.user);
  return data;
}

// ── Login ─────────────────────────────────────────────────
async function login(email, password) {
  const res  = await fetch(`${API_URL}/auth/login`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  saveToken(data.token);
  saveUser(data.user);
  return data;
}

// ── Logout ────────────────────────────────────────────────
function logout() {
  removeToken();
  localStorage.removeItem('user');
  localStorage.removeItem('username');
  window.location.href = 'index.html';
}

// ── Role-based Redirect ───────────────────────────────────
function redirectByRole(role) {
  if (role === 'admin') {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'index.html';
  }
}

// ── Protect Admin Page ────────────────────────────────────
function requireAdmin() {
  if (!isLoggedIn() || !isAdmin()) {
    window.location.href = 'login.html';
  }
}

// ── Get Projects (public) ─────────────────────────────────
async function getProjects() {
  const res  = await fetch(`${API_URL}/projects`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.projects;
}

// ── Create Project ────────────────────────────────────────
async function createProject(projectData) {
  const res  = await fetch(`${API_URL}/projects`, {
    method:  'POST',
    headers: authHeaders(),
    body:    JSON.stringify(projectData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.project;
}

// ── Update Project ────────────────────────────────────────
async function updateProject(id, projectData) {
  const res  = await fetch(`${API_URL}/projects/${id}`, {
    method:  'PUT',
    headers: authHeaders(),
    body:    JSON.stringify(projectData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.project;
}

// ── Delete Project ────────────────────────────────────────
async function deleteProject(id) {
  const res  = await fetch(`${API_URL}/projects/${id}`, {
    method:  'DELETE',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

// ── Load Projects on Homepage ─────────────────────────────
async function loadProjectsOnHomepage() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  console.log('🔄 Fetching projects from:', `${API_URL}/projects`);

  try {
    const projects = await getProjects();
    console.log('✅ Projects received:', projects);

    if (projects.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-folder-x" style="font-size:3rem;color:#888"></i>
          <p class="mt-3 text-muted">No projects yet.</p>
        </div>`;
      return;
    }

    grid.innerHTML = projects.map(p => `
      <div class="col-lg-4 col-md-6">
        <div class="project-card">
          <div class="project-image">
            <img src="${p.image || 'images/project1.jpg'}"
                 alt="${p.title}"
                 onerror="this.src='images/project1.jpg'">
            <div class="project-overlay">
              <a href="${p.link || '#'}" target="_blank" class="btn btn-sm btn-light">
                <i class="bi bi-box-arrow-up-right me-1"></i>View Project
              </a>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">
              ${p.title}
              ${p.featured
                ? '<span class="badge bg-warning text-dark ms-2" style="font-size:0.65rem">⭐ Featured</span>'
                : ''}
            </h3>
            <p class="project-description">${p.description}</p>
            <div class="project-tags mt-2">
              ${p.tags.map(t => `<span class="badge bg-secondary me-1">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    console.log(`✅ Rendered ${projects.length} projects on homepage`);

  } catch (err) {
    console.error('❌ Failed to load projects:', err);
    grid.innerHTML = `
      <div class="col-12 text-center py-5 text-danger">
        <i class="bi bi-exclamation-triangle" style="font-size:2rem"></i>
        <p class="mt-2">Failed to load projects: ${err.message}</p>
      </div>`;
  }
}