// Portfolio Data Storage
let portfolioData = {
    profile: {
        name: "John Doe",
        role: "Software Engineer",
        email: "john.doe@example.com",
        phone: "+1234567890",
        location: "San Francisco, CA",
        photo: "https://via.placeholder.com/250"
    },
    skills: [
        { name: "JavaScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "React", level: 88 },
        { name: "Node.js", level: 82 },
        { name: "SQL", level: 80 },
        { name: "Git", level: 92 }
    ],
    education: [
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "Tech University",
            year: "2018-2022",
            description: "Graduated with honors. Focus on software engineering and algorithms."
        }
    ],
    experience: [
        {
            title: "Senior Software Engineer",
            company: "Tech Corp",
            period: "Jan 2023 - Present",
            description: "Leading development of microservices architecture. Managing team of 5 developers. Implementing CI/CD pipelines and improving code quality."
        },
        {
            title: "Software Engineer",
            company: "StartUp Inc",
            period: "Jun 2022 - Dec 2022",
            description: "Developed full-stack web applications using React and Node.js. Collaborated with designers to implement responsive UI components."
        }
    ],
    projects: [
        {
            title: "E-Commerce Platform",
            description: "Built a scalable e-commerce platform with real-time inventory management and payment integration.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            liveLink: "#",
            githubLink: "#",
            file: null
        }
    ],
    certificates: [
        {
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "December 2023",
            link: "#"
        },
        {
            name: "Advanced JavaScript",
            issuer: "Coursera",
            date: "August 2023",
            link: "#"
        }
    ]
};

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        portfolioData = JSON.parse(savedData);
    }
    renderAll();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeEventListeners();
    startTypingAnimation();
});

// Typing Animation
function startTypingAnimation() {
    const roles = [
        "Software Engineer",
        "Full Stack Developer",
        "Problem Solver",
        "Code Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById('typedText');

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

// Mobile Menu Toggle
function initializeEventListeners() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Profile Photo Upload
    document.getElementById('profileUpload').addEventListener('change', handleProfileUpload);

    // Modal handlers
    setupModalHandlers();

    // Form handlers
    setupFormHandlers();
}

// Profile Photo Upload
function handleProfileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        // Check file size (limit to 2MB to avoid localStorage issues)
        if (file.size > 2 * 1024 * 1024) {
            showNotification('Image size should be less than 2MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoUrl = e.target.result;
            portfolioData.profile.photo = photoUrl;
            document.getElementById('profilePhoto').src = photoUrl;
            saveData();
            showNotification('Profile photo updated successfully!');
        };
        reader.readAsDataURL(file);
    }
}

// Modal Setup
function setupModalHandlers() {
    const modals = {
        editAbout: document.getElementById('editAboutModal'),
        education: document.getElementById('educationModal'),
        experience: document.getElementById('experienceModal'),
        project: document.getElementById('projectModal'),
        certificate: document.getElementById('certificateModal')
    };

    // Open modal buttons
    document.getElementById('editAbout').addEventListener('click', () => openModal('editAbout'));
    document.getElementById('addEducation').addEventListener('click', () => openModal('education'));
    document.getElementById('addExperience').addEventListener('click', () => openModal('experience'));
    document.getElementById('addProject').addEventListener('click', () => openModal('project'));
    document.getElementById('addCertificate').addEventListener('click', () => openModal('certificate'));

    // Close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function openModal(modalType) {
    const modals = {
        editAbout: 'editAboutModal',
        education: 'educationModal',
        experience: 'experienceModal',
        project: 'projectModal',
        certificate: 'certificateModal'
    };

    const modalId = modals[modalType];
    const modal = document.getElementById(modalId);
    
    if (modalType === 'editAbout') {
        document.getElementById('editEmail').value = portfolioData.profile.email;
        document.getElementById('editPhone').value = portfolioData.profile.phone;
        document.getElementById('editLocation').value = portfolioData.profile.location;
    }

    modal.style.display = 'block';
}

// Form Handlers
function setupFormHandlers() {
    // Edit About Form
    document.getElementById('editAboutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        portfolioData.profile.email = document.getElementById('editEmail').value;
        portfolioData.profile.phone = document.getElementById('editPhone').value;
        portfolioData.profile.location = document.getElementById('editLocation').value;
        saveData();
        renderContactInfo();
        document.getElementById('editAboutModal').style.display = 'none';
        showNotification('Contact information updated successfully!');
    });

    // Education Form
    document.getElementById('educationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const education = {
            degree: document.getElementById('eduDegree').value,
            institution: document.getElementById('eduInstitution').value,
            year: document.getElementById('eduYear').value,
            description: document.getElementById('eduDescription').value
        };
        portfolioData.education.push(education);
        saveData();
        renderEducation();
        this.reset();
        document.getElementById('educationModal').style.display = 'none';
        showNotification('Education added successfully!');
    });

    // Experience Form
    document.getElementById('experienceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const experience = {
            title: document.getElementById('expTitle').value,
            company: document.getElementById('expCompany').value,
            period: document.getElementById('expPeriod').value,
            description: document.getElementById('expDescription').value
        };
        portfolioData.experience.push(experience);
        saveData();
        renderExperience();
        this.reset();
        document.getElementById('experienceModal').style.display = 'none';
        showNotification('Experience added successfully!');
    });

    // Project Form
    document.getElementById('projectForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const fileInput = document.getElementById('projectFile');
        
        const project = {
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            technologies: document.getElementById('projectTech').value.split(',').map(t => t.trim()),
            liveLink: document.getElementById('projectLink').value,
            githubLink: document.getElementById('projectGithub').value,
            file: null
        };

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                project.file = {
                    name: file.name,
                    data: e.target.result,
                    type: file.type
                };
                portfolioData.projects.push(project);
                saveData();
                renderProjects();
                showNotification('Project added successfully!');
            };
            reader.readAsDataURL(file);
        } else {
            portfolioData.projects.push(project);
            saveData();
            renderProjects();
            showNotification('Project added successfully!');
        }

        this.reset();
        document.getElementById('projectModal').style.display = 'none';
    });

    // Certificate Form
    document.getElementById('certificateForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const certificate = {
            name: document.getElementById('certName').value,
            issuer: document.getElementById('certIssuer').value,
            date: document.getElementById('certDate').value,
            link: document.getElementById('certLink').value
        };
        portfolioData.certificates.push(certificate);
        saveData();
        renderCertificates();
        this.reset();
        document.getElementById('certificateModal').style.display = 'none';
        showNotification('Certificate added successfully!');
    });

    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Message sent successfully! (Demo mode)');
        this.reset();
    });
}

// Render Functions
function renderAll() {
    renderProfilePhoto();
    renderSkills();
    renderContactInfo();
    renderEducation();
    renderExperience();
    renderProjects();
    renderCertificates();
}

function renderProfilePhoto() {
    if (portfolioData.profile.photo) {
        document.getElementById('profilePhoto').src = portfolioData.profile.photo;
    }
}

function renderSkills() {
    const skillBars = document.getElementById('skillBars');
    skillBars.innerHTML = portfolioData.skills.map(skill => `
        <div class="skill-bar">
            <label>${skill.name}</label>
            <div class="skill-progress">
                <div class="skill-fill" style="width: ${skill.level}%"></div>
            </div>
        </div>
    `).join('');
}

function renderContactInfo() {
    // Update About section
    document.getElementById('emailDisplay').textContent = `"${portfolioData.profile.email}"`;
    document.getElementById('phoneDisplay').textContent = `"${portfolioData.profile.phone}"`;
    document.getElementById('locationDisplay').textContent = `"${portfolioData.profile.location}"`;

    // Update Contact section
    document.getElementById('contactEmail').textContent = portfolioData.profile.email;
    document.getElementById('contactPhone').textContent = portfolioData.profile.phone;
    document.getElementById('contactLocation').textContent = portfolioData.profile.location;
}

function renderEducation() {
    const timeline = document.getElementById('educationTimeline');
    timeline.innerHTML = portfolioData.education.map((edu, index) => `
        <div class="timeline-item">
            <h3>${edu.degree}</h3>
            <p class="institution">${edu.institution}</p>
            <p class="year">${edu.year}</p>
            <p>${edu.description}</p>
            <button class="btn btn-secondary" onclick="deleteEducation(${index})" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem;">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `).join('');
}

function renderExperience() {
    const timeline = document.getElementById('experienceTimeline');
    timeline.innerHTML = portfolioData.experience.map((exp, index) => `
        <div class="timeline-item">
            <h3>${exp.title}</h3>
            <p class="company">${exp.company}</p>
            <p class="period">${exp.period}</p>
            <p>${exp.description}</p>
            <button class="btn btn-secondary" onclick="deleteExperience(${index})" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem;">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `).join('');
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = portfolioData.projects.map((project, index) => `
        <div class="project-card">
            <div class="project-header">
                <h3>${project.title}</h3>
            </div>
            <div class="project-body">
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.liveLink ? `<a href="${project.liveLink}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    ${project.githubLink ? `<a href="${project.githubLink}" class="project-link" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    ${project.file ? `<a href="#" class="project-link" onclick="downloadProjectFile(${index})"><i class="fas fa-download"></i> Download ${project.file.name}</a>` : ''}
                </div>
                <button class="btn btn-secondary" onclick="deleteProject(${index})" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem; width: 100%;">
                    <i class="fas fa-trash"></i> Delete Project
                </button>
            </div>
        </div>
    `).join('');
}

function renderCertificates() {
    const grid = document.getElementById('certificatesGrid');
    grid.innerHTML = portfolioData.certificates.map((cert, index) => `
        <div class="certificate-card">
            <h3>${cert.name}</h3>
            <p class="certificate-issuer">${cert.issuer}</p>
            <p class="certificate-date">${cert.date}</p>
            ${cert.link ? `<a href="${cert.link}" class="certificate-link" target="_blank"><i class="fas fa-external-link-alt"></i> View Certificate</a>` : ''}
            <button class="btn btn-secondary" onclick="deleteCertificate(${index})" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem; width: 100%;">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `).join('');
}

// Delete Functions
function deleteEducation(index) {
    if (confirm('Are you sure you want to delete this education entry?')) {
        portfolioData.education.splice(index, 1);
        saveData();
        renderEducation();
        showNotification('Education deleted successfully!');
    }
}

function deleteExperience(index) {
    if (confirm('Are you sure you want to delete this experience entry?')) {
        portfolioData.experience.splice(index, 1);
        saveData();
        renderExperience();
        showNotification('Experience deleted successfully!');
    }
}

function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        portfolioData.projects.splice(index, 1);
        saveData();
        renderProjects();
        showNotification('Project deleted successfully!');
    }
}

function deleteCertificate(index) {
    if (confirm('Are you sure you want to delete this certificate?')) {
        portfolioData.certificates.splice(index, 1);
        saveData();
        renderCertificates();
        showNotification('Certificate deleted successfully!');
    }
}

// Download Project File
function downloadProjectFile(index) {
    const project = portfolioData.projects[index];
    if (project.file) {
        const link = document.createElement('a');
        link.href = project.file.data;
        link.download = project.file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #00d9ff, #7000ff);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
