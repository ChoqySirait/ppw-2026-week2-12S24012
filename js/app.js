/**
 * Clean Portfolio App Presenter Engine
 */
class App {
    constructor() {
        this.state = {
            profile: null,
            projects: [],
            services: [],
            activeCategory: 'all',
            isSidebarCollapsed: false
        };

        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.setupCollapsibleSidebarEngine();
        this.setupNavScrollspy();
        await this.loadAllData();
    }

    setupCollapsibleSidebarEngine() {
        const dashboardWrapper = document.getElementById('dashboardWrapper');
        const btnCollapseSidebar = document.getElementById('btnCollapseSidebar');
        const btnFloatingProfile = document.getElementById('btnFloatingProfile');

        const toggleSidebar = (forceState = null) => {
            this.state.isSidebarCollapsed = forceState !== null ? forceState : !this.state.isSidebarCollapsed;

            if (this.state.isSidebarCollapsed) {
                dashboardWrapper.classList.add('sidebar-collapsed');
                if (btnFloatingProfile) btnFloatingProfile.style.display = 'flex';
            } else {
                dashboardWrapper.classList.remove('sidebar-collapsed');
                if (btnFloatingProfile) btnFloatingProfile.style.display = 'none';
            }
        };

        if (btnCollapseSidebar) btnCollapseSidebar.addEventListener('click', () => toggleSidebar(true));
        if (btnFloatingProfile) btnFloatingProfile.addEventListener('click', () => {
            toggleSidebar(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    async loadAllData() {
        try {
            const [profile, projects, services] = await Promise.all([
                ApiService.fetchProfile(),
                ApiService.fetchProjects(),
                ApiService.fetchServices()
            ]);

            this.state.profile = profile;
            this.state.projects = projects;
            this.state.services = services;

            this.renderProfile();
            this.renderCategoryFilters();
            this.renderProjects();
            this.renderServices();

        } catch (error) {
            console.error('[App Init Error]:', error);
        }
    }

    setupNavScrollspy() {
        const sections = document.querySelectorAll('.section-offset');
        const navLinks = document.querySelectorAll('.nav-scroll-link');

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));
    }

    renderProfile() {
        const p = this.state.profile;
        if (!p) return;

        const profileName = document.getElementById('profileName');
        const profileBio = document.getElementById('profileBio');

        if (profileName) profileName.textContent = p.name;
        if (profileBio) profileBio.textContent = p.bio;
    }

    renderCategoryFilters() {
        const filterContainer = document.getElementById('categoryFilters');
        if (!filterContainer) return;

        const categories = ['all', ...new Set(this.state.projects.map(p => p.category))];

        filterContainer.innerHTML = categories.map(cat => `
            <button class="btn btn-sm filter-pill ${cat === this.state.activeCategory ? 'active' : ''}" 
                    data-category="${cat}">
                ${cat === 'all' ? 'Semua Proyek' : ApiService.sanitizeHTML(cat)}
            </button>
        `).join('');
    }

    // Render Proyek dalam Grid 3-Kolom (Atau 2-kolom pada layar medium)
    renderProjects() {
        const container = document.getElementById('projectsContainer');
        if (!container) return;

        let filtered = this.state.projects;

        if (this.state.activeCategory !== 'all') {
            filtered = filtered.filter(p => p.category === this.state.activeCategory);
        }

        container.innerHTML = filtered.map(proj => `
            <div class="col-md-6 col-lg-4">
                <article class="glass-card project-card h-100 p-4 border d-flex flex-column">
                    <span class="project-category">${ApiService.sanitizeHTML(proj.category)}</span>
                    <h3 class="fw-bold mt-2 mb-2 text-dark h6">${ApiService.sanitizeHTML(proj.title)}</h3>
                    <p class="text-muted small mb-3 flex-grow-1" style="font-size: 0.85rem;">${ApiService.sanitizeHTML(proj.description)}</p>

                    <div class="d-flex flex-wrap gap-1 mb-4">
                        ${proj.technologies.map(tech => `<span class="tech-pill small">${ApiService.sanitizeHTML(tech)}</span>`).join('')}
                    </div>

                    <button class="btn btn-sm btn-outline-premium w-100 py-2 fw-bold btn-view-detail mt-auto" data-id="${proj.id}">
                        <i class="bi bi-eye me-1"></i> Rincian Proyek
                    </button>
                </article>
            </div>
        `).join('');
    }

    // Render Spesialisasi Layanan tanpa Harga dan tanpa Tombol Pesan
    renderServices() {
        const container = document.getElementById('servicesContainer');
        if (!container) return;

        container.innerHTML = this.state.services.map(srv => `
            <div class="col-md-4">
                <div class="glass-card skill-card h-100 p-4 border d-flex flex-column">
                    <div class="card-icon-small mb-3"><i class="bi ${srv.icon} text-primary fs-5"></i></div>
                    <h3 class="h6 fw-bold text-dark mb-2">${ApiService.sanitizeHTML(srv.title)}</h3>
                    <p class="text-muted small mb-3 flex-grow-1" style="font-size: 0.85rem;">${ApiService.sanitizeHTML(srv.description)}</p>
                    
                    <ul class="styled-list small text-muted ps-3 mb-0">
                        ${srv.features.map(f => `<li>${ApiService.sanitizeHTML(f)}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    openProjectModal(projectId) {
        const proj = this.state.projects.find(p => p.id === projectId);
        if (!proj) return;

        document.getElementById('projectModalTitle').textContent = proj.title;
        document.getElementById('projectModalBody').innerHTML = `
            <img src="${proj.thumbnail}" class="img-fluid rounded-3 mb-3 w-100 shadow-sm" alt="${ApiService.sanitizeHTML(proj.title)}">
            <div class="d-flex align-items-center gap-2 mb-3">
                <span class="badge bg-primary px-3 py-2">${ApiService.sanitizeHTML(proj.category)}</span>
                <span class="text-muted small"><i class="bi bi-calendar3 me-1"></i>${proj.formattedDate}</span>
            </div>
            <p class="text-secondary mb-4">${ApiService.sanitizeHTML(proj.description)}</p>
        `;

        const modalEl = document.getElementById('universalProjectModal');
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.filter-pill');
            if (filterBtn) {
                this.state.activeCategory = filterBtn.dataset.category;
                this.renderCategoryFilters();
                this.renderProjects();
            }

            const detailBtn = e.target.closest('.btn-view-detail');
            if (detailBtn) {
                this.openProjectModal(detailBtn.dataset.id);
            }
        });

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        const form = e.target;

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...`;

        setTimeout(() => {
            this.showToastNotification('Pesan Terkirim!', 'Terima kasih, pesan diskusi Anda berhasil dikirim.', 'success');
            form.reset();
            form.classList.remove('was-validated');
            submitBtn.disabled = false;
            submitBtn.innerHTML = `Kirim Pesan Diskusi <i class="bi bi-send-fill ms-2"></i>`;
        }, 1000);
    }

    showToastNotification(title, message, type = 'success') {
        const toastEl = document.getElementById('appToast');
        const toastTitle = document.getElementById('toastTitle');
        const toastBody = document.getElementById('toastBody');

        if (toastEl && toastTitle && toastBody) {
            toastTitle.textContent = title;
            toastBody.textContent = message;
            toastEl.className = `toast align-items-center text-white bg-${type} border-0 shadow-lg`;
            bootstrap.Toast.getOrCreateInstance(toastEl).show();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.appInstance = new App();
});