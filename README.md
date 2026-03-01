# SAMAssignment1
#  Project Title - Freelance portfolio website
## Group Information
* **Student 1:** [Savindi Rathwella] - [ITBIN-2313-0092] - Role: [DevOps/Release Manager/Backend developer]
* **Student 2:** [Malki Rajapaksha] - [ITBIN-2313-0088] - Role: [Frontend Developer1]
* **Student 3:** [Yasith shawinda] - [ITBIN-2313-0107] - Role: [Fronted Developer2]
## Project Description
This project is designed to teach a 3-person development team how to collaborate effectively using Git branching workflows while building a responsive freelance portfolio website. The website includes a navigation system with a mobile hamburger menu, a hero landing section, a services showcase with card layouts, a projects and skills display, and a contact form with validation. Each team member is assigned specific responsibilities: Member 1 handles the navigation and hero section, Member 2 focuses on the services section and overall page layout with responsive styling, and Member 3 builds the projects section and contact form. The team follows a structured Git workflow where everyone branches from the develop branch, works on their features independently, commits their changes with clear messages like "feat: add responsive navigation menu", and then opens pull requests for team review before merging back into develop. This approach teaches important collaboration skills including code reviews, merge conflict resolution (which can be practiced by having Members 2 and 3 intentionally edit the same section), and version control best practices. Once all features are merged into develop, the team performs a final merge to the main branch for production, completing a full professional development cycle that mirrors real-world software engineering workflows.
## Live Deployment
🔗 **Live URL:** 
[https://sam-assignment1.netlify.app/]
## Technologies Used
* HTML5, CSS3, JavaScript
* bootstrap 5
* GitHub Actions
* Netlify
* Node.js
* Express.js
* MongoDB
* JSON Web Tokens (JWT)
* bcryptjs
* Docker
* Docker compose
* dotenv
## Features
* Feature 1- Navigation menu (Home, Services, Projects, Contact) 
• Logo / Brand name 
• Mobile hamburger menu 
• Hero / Landing section 
• Headline 
• Short description 
• Call-to-action button
* Feature 2 - Services section (cards/grid with icons) 
• Layout & spacing, section alignment 
• Container widths 
• Responsive styling (tablet & mobile fixes)
* Feature 3 - Projects / Skills section (cards, skills list/progress bars) 
• Contact form (Name, Email, Message) 
• Basic validation & static success message 
## Branch Strategy
We implemented the following branching strategy:
* `main` - Production branch
* `develop` - Integration branch
* `feature/*` - Feature development branches
## Individual Contributions
### [Savindi Rathwella]
- List specific features developed
• Repository setup and configuration
• GitHub Actions CI/CD pipeline implementation
• Deployment setup and management
• Docker setup
• Navigation and hero section
• Basic validation & static success message 
• Page merging
- List specific commits/contributions
    * chore: add deployment workflow to deploy main branch to Vercel,
    * Merge branch 'develop' into feature_Savindi,chore: add CI workflow for build, lint, and tests,create index,
    * updated hero and nav,
    * Merge pull request #4 from savindirathwella333-create/feature_Savindi,fix format issues,
    * chore: add CI pipeline workflow,updated ci/cd files,edited readme,fix minor errors,
    * Merge branch 'main' of https://github.com/savindirathwella333-create/SAMAssignment1
    * Fixed Deployment version
    * Update API_URL to use production endpoint
    * Refactor CORS handling to allow dynamic origin validation
    * Add explicit permissions for deployment workflow
    * commit updated
### [Malki Rajapaksha]
- List specific features developed
• Layout & spacing, section alignment 
• Container widths 
• Responsive styling (tablet & mobile fixes)

- List specific commits/contributions
    * chore: add deployment workflow to deploy main branch to Vercel,
    * updated servicessection and images,
    * Merge pull request #5 from *savindirathwella333-create/feature_malki1
### [Yasith Shavinda]
- List specific features developed
    • Contact form (Name, Email, Message)
    • Basic validation & static success message 

- List specific commits/contributions
    * chore: add deployment workflow to deploy main branch to Vercel,
    * Merge branch 'develop' into feature_yasith1,
    * updated projects and form,
    * Merge pull request #6 from savindirathwella333-create/feature_yasith1
    

## 🐳 Docker Setup

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running

---

## 🚀 How to Build and Run

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd SAMAssignment1
```

### 2. Build and start the container
```bash
docker-compose up --build
```

### 3. Access the application
Open your browser: [http://localhost:8081](http://localhost:8081)

### 4. Stop the container
```bash
docker-compose down
```

### 5. Rebuild after changes
```bash
docker-compose up --build --force-recreate
```

---

## 📁 Project Structure
```
SAMAssignment1/
├── src/
│   ├── images/        # Image assets
│   ├── scripts/       # JavaScript files
│   ├── styles/        # CSS files
│   └── index.html     # Main HTML file
├── Dockerfile         # Docker image build instructions
├── docker-compose.yml # Service orchestration
├── .dockerignore      # Files excluded from build context
└── README.md          # Project documentation
```

---

## 🔧 Services
| Service | Port | Description |
|---------|------|-------------|
| web     | 8081 | Nginx static web server |