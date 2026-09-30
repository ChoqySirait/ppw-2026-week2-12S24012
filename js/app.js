/**
 * App Presenter Engine (Dynamic Client-Side Rendering & UI State Manager)
 */
class App {
    constructor() {
        this.state = {
            profile: null,
            projects: [],
            services: [],
            activeCategory: 'all',
            isLoading: true
        };

        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.updateOrderBadgeCounter();
        await this.loadAllData();
    }

    // 1. Memuat Seluruh Data Asinkron & Mengelola UI States
    async loadAllData() {
        this.renderSkeletons();

        try {
            const [profile, projects, services] = await Promise.all([
                ApiService.fetchProfile(),
                ApiService.fetchProjects(),
                ApiService.fetchServices()
            ]);

            this.state.profile = profile;
            this.state.projects = projects;
            this.state.services = services;
            this.state.isLoading = false;

            // Success Render State
            this.renderProfile();
            this.renderCategoryFilters();
            this.renderProjects();
            this.renderServices();

        } catch (error) {
            console.error('[App Init Error]:', error);
            this.renderErrorState('Gagal memuat data dari server JSON. Pastikan berkas data tersedia.');
        }
    }

    // 2. Loading State: Tampilan Skeleton Screen berpendar saat fetching
    renderSkeletons() {
        const projectsContainer = document.getElementById('projectsContainer');
        const servicesContainer = document.getElementById('servicesContainer');

        if (projectsContainer) {
            projectsContainer.innerHTML = Array(4).fill(0).map(() => `
                <div class="col-md-6 mb-4">
                    <div class="glass-card p-4 border skeleton-card">
                        <div class="skeleton-box skeleton-title mb-3"></div>
                        <div class="skeleton-box skeleton-text mb-2"></div>
                        <div class="skeleton-box skeleton-text mb-4" style="width: 70%;"></div>
                        <div class="skeleton-box skeleton-btn"></div>
                    </div>
                </div>
            `).join('');
        }

        if (servicesContainer) {
            servicesContainer.innerHTML = Array(3).fill(0).map(() => `
                <div class="col-md-4 mb-4">
                    <div class="glass-card p-4 border skeleton-card text-center">
                        <div class="skeleton-box skeleton-avatar mx-auto mb-3"></div>
                        <div class="skeleton-box skeleton-title mx-auto mb-2"></div>
                        <div class="skeleton-box skeleton-text mx-auto" style="width: 80%;"></div>
                    </div>
                </div>
            `).join('');
        }
    }

    // 3. Render Data Profil Mahasiswa
    renderProfile() {
        const p = this.state.profile;
        if (!p) return;

        const profileName = document.getElementById('profileName');
        const profileBio = document.getElementById('profileBio');
        const profileSkills = document.getElementById('profileSkills');

        if (profileName) profileName.textContent = p.name;
        if (profileBio) profileBio.textContent = p.bio;

        if (profileSkills) {
            profileSkills.innerHTML = p.skills.map(skill => `
                <span class="tech-pill">${ApiService.sanitizeHTML(skill)}</span>
            `).join('');
        }
    }

    // 4. Render Tombol Filter Kategori Proyek
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

    // 5. Success State & Empty State: Render Kartu Proyek
    renderProjects() {
        const container = document.getElementById('projectsContainer');
        if (!container) return;

        const filtered = this.state.activeCategory === 'all' 
            ? this.state.projects 
            : this.state.projects.filter(p => p.category === this.state.activeCategory);

        // Empty State: Jika filter tidak menemukan proyek
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="empty-state-icon mb-3"><i class="bi bi-folder-x fs-1 text-muted"></i></div>
                    <h5 class="fw-bold text-dark">Tidak Ada Proyek Ditemukan</h5>
                    <p class="text-muted small">Belum ada proyek dalam kategori "${ApiService.sanitizeHTML(this.state.activeCategory)}".</p>
                </div>
            `;
            return;
        }

        // Success Render State
        container.innerHTML = filtered.map(proj => `
            <div class="col-md-6 mb-4">
                <article class="glass-card project-card h-100 p-4 border d-flex flex-column">
                    <span class="project-category">${ApiService.sanitizeHTML(proj.category)}</span>
                    <h3 class="fw-bold mt-2 mb-2 text-dark h5">${ApiService.sanitizeHTML(proj.title)}</h3>
                    <p class="text-muted small mb-3 flex-grow-1">${ApiService.sanitizeHTML(proj.description)}</p>

                    <div class="d-flex flex-wrap gap-1 mb-4">
                        ${proj.technologies.map(tech => `<span class="tech-pill small">${ApiService.sanitizeHTML(tech)}</span>`).join('')}
                    </div>

                    <div class="d-flex gap-2 mt-auto">
                        <button class="btn btn-sm btn-outline-premium flex-grow-1 py-2 fw-bold btn-view-detail" data-id="${proj.id}">
                            <i class="bi bi-eye me-1"></i> Detail
                        </button>
                        ${proj.links.github ? `
                            <a href="${proj.links.github}" target="_blank" class="btn btn-sm btn-dark px-3 py-2 fw-bold" title="GitHub">
                                <i class="bi bi-github"></i>
                            </a>
                        ` : ''}
                    </div>
                </article>
            </div>
        `).join('');
    }

    // 6. Render Kartu Paket Layanan
    renderServices() {
        const container = document.getElementById('servicesContainer');
        if (!container) return;

        container.innerHTML = this.state.services.map(srv => `
            <div class="col-md-4 mb-4">
                <div class="glass-card skill-card h-100 p-4 border d-flex flex-column">
                    <div class="card-icon-small mb-3"><i class="bi ${srv.icon} text-primary fs-5"></i></div>
                    <h3 class="h6 fw-bold text-dark mb-2">${ApiService.sanitizeHTML(srv.title)}</h3>
                    <p class="text-muted small mb-3 flex-grow-1">${ApiService.sanitizeHTML(srv.description)}</p>
                    <div class="fw-black text-primary mb-3">${ApiService.sanitizeHTML(srv.price)}</div>
                    <ul class="styled-list small text-muted ps-3 mb-0">
                        ${srv.features.map(f => `<li>${ApiService.sanitizeHTML(f)}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    // 7. Universal Dynamic Modal (Injeksi Data Dinamis Berdasarkan ID)
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

            <h6 class="fw-bold mb-2 text-dark">Metrik Kinerja Proyek:</h6>
            <div class="row g-2 mb-4">
                ${Object.entries(proj.metrics).map(([key, val]) => `
                    <div class="col-4">
                        <div class="p-2 border rounded text-center bg-light">
                            <span class="d-block small text-muted text-uppercase fw-bold">${key}</span>
                            <span class="fw-bold text-dark">${ApiService.sanitizeHTML(val)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        const modalEl = document.getElementById('universalProjectModal');
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }

    // 8. Error State: Alert Penanganan Kesalahan
    renderErrorState(message) {
        const projectsContainer = document.getElementById('projectsContainer');
        if (projectsContainer) {
            projectsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger d-flex align-items-center rounded-4 shadow-sm" role="alert">
                        <i class="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                        <div>
                            <strong class="d-block">Gagal Memuat Data (Error State)</strong>
                            <span class="small">${ApiService.sanitizeHTML(message)}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // 9. Handlers & Event Listeners
    setupEventListeners() {
        // Filter Kategori Proyek
        document.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.filter-pill');
            if (filterBtn) {
                this.state.activeCategory = filterBtn.dataset.category;
                this.renderCategoryFilters();
                this.renderProjects();
            }

            // Universal Modal Trigger
            const detailBtn = e.target.closest('.btn-view-detail');
            if (detailBtn) {
                this.openProjectModal(detailBtn.dataset.id);
            }
        });

        // Decoupled Form Submit Handler
        const form = document.getElementById('serviceForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    // 10. Process REST Form Dispatching & LocalStorage Persistence
    async handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Memproses...`;

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            const result = await ApiService.submitServiceOrder(payload);

            if (result.success) {
                this.saveOrderToLocalStorage(payload);
                this.showToastNotification('Sukses!', result.message, 'success');
                form.reset();
                form.classList.remove('was-validated');
                this.updateOrderBadgeCounter();
            } else {
                this.showToastNotification('Gagal!', result.message, 'danger');
            }
        } catch (err) {
            this.showToastNotification('Error Network!', 'Gagal menghubungi API Service.', 'danger');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    saveOrderToLocalStorage(orderData) {
        const existing = JSON.parse(localStorage.getItem('service_orders') || '[]');
        existing.push({
            id: `ORD-${Date.now()}`,
            timestamp: new Date().toISOString(),
            ...orderData
        });
        localStorage.setItem('service_orders', JSON.stringify(existing));
    }

    updateOrderBadgeCounter() {
        const orders = JSON.parse(localStorage.getItem('service_orders') || '[]');
        const badge = document.getElementById('orderCountBadge');
        if (badge) {
            badge.textContent = `${orders.length} Pesanan Active`;
        }
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

// Inisialisasi Aplikasi saat DOM Siap
document.addEventListener('DOMContentLoaded', () => {
    window.appInstance = new App();
});