// ========================================
// Auth UI Handler
// ========================================

function showAlert(elementId, message, type = 'danger') {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.className = `alert alert-${type}`;
    el.textContent = message;
    el.classList.remove('d-none');
}

function hideAlert(elementId) {
    document.getElementById(elementId)?.classList.add('d-none');
}

// ── Update Navbar ─────────────────────────────────────────
function updateNavbar() {
    const user     = getUser();
    const loginBtn = document.getElementById('navLoginBtn');
    const userInfo = document.getElementById('navUserInfo');
    const userSpan = document.getElementById('navUsername');
    const adminBtn = document.getElementById('navAdminBtn');

    if (!loginBtn || !userInfo) return;

    if (user && isLoggedIn()) {
        loginBtn.classList.add('d-none');
        userInfo.classList.remove('d-none');
        if (userSpan) userSpan.textContent = user.username || 'User';
        // Show admin button only for admins
        if (adminBtn) {
            user.role === 'admin'
                ? adminBtn.classList.remove('d-none')
                : adminBtn.classList.add('d-none');
        }
    } else {
        loginBtn.classList.remove('d-none');
        userInfo.classList.add('d-none');
        if (adminBtn) adminBtn.classList.add('d-none');
    }
}

// ── Logout ────────────────────────────────────────────────
function handleLogout() {
    logout();
}

// ── Login Form ────────────────────────────────────────────
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideAlert('loginAlert');

        const btn      = document.getElementById('loginBtn');
        const email    = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        btn.disabled  = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Logging in...';

        try {
            const data = await login(email, password);
            localStorage.setItem('username', data.user.username);
            showAlert('loginAlert', `Welcome, ${data.user.username}! Redirecting...`, 'success');

            // ── Redirect based on role ──
            setTimeout(() => redirectByRole(data.user.role), 1000);

        } catch (err) {
            showAlert('loginAlert', err.message || 'Login failed.');
            btn.disabled  = false;
            btn.innerHTML = '<i class="bi bi-box-arrow-in-right me-1"></i>Login';
        }
    });
}

// ── Register Form ─────────────────────────────────────────
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideAlert('registerAlert');

        const btn      = document.getElementById('registerBtn');
        const username = document.getElementById('regUsername').value.trim();
        const email    = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;

        if (password.length < 6) {
            showAlert('registerAlert', 'Password must be at least 6 characters.');
            return;
        }

        btn.disabled  = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Creating...';

        try {
            const data = await register(username, email, password);
            localStorage.setItem('username', data.user.username);
            showAlert('registerAlert', `Account created! Welcome, ${data.user.username}!`, 'success');
            setTimeout(() => redirectByRole(data.user.role), 1000);

        } catch (err) {
            showAlert('registerAlert', err.message || 'Registration failed.');
            btn.disabled  = false;
            btn.innerHTML = '<i class="bi bi-person-plus me-1"></i>Create Account';
        }
    });
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});