/**
 * API Service Layer (Decoupled Data Provider)
 * Mengelola pemanggilan data asinkron dari JSON provider & sanitasi input XSS
 */
class ApiService {
    static async fetchProfile() {
        try {
            const response = await fetch('./data/profile.json');
            if (!response.ok) throw new Error(`HTTP Error (${response.status}): Gagal memuat profil`);
            return await response.json();
        } catch (error) {
            console.error('[API Error - Profile]:', error);
            throw error;
        }
    }

    static async fetchProjects() {
        try {
            const response = await fetch('./data/projects.json');
            if (!response.ok) throw new Error(`HTTP Error (${response.status}): Gagal memuat proyek`);
            return await response.json();
        } catch (error) {
            console.error('[API Error - Projects]:', error);
            throw error;
        }
    }

    static async fetchServices() {
        try {
            const response = await fetch('./data/services.json');
            if (!response.ok) throw new Error(`HTTP Error (${response.status}): Gagal memuat layanan`);
            return await response.json();
        } catch (error) {
            console.error('[API Error - Services]:', error);
            throw error;
        }
    }

    static async submitServiceOrder(payload) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!payload.nama || !payload.email || !payload.pesan) {
            return {
                success: false,
                message: 'Field bertanda bintang wajib diisi lengkap.'
            };
        }

        return {
            success: true,
            orderId: `ORD-${Date.now()}`,
            message: 'Permintaan layanan berhasil dikirim dan dicatat oleh API Service.'
        };
    }

    // Mencegah XSS
    static sanitizeHTML(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
}