# ppw-2026-week4-12S24012
# 🌐 Decoupled Multi-Tier Architecture & Client-Side Rendering (CSR) Portfolio Dashboard

Repositori ini berisi berkas kode sumber untuk **Tugas Mandiri Minggu 04: Refactoring Arsitektur ke Decoupled Multi-Tier Architecture & Dynamic Client-Side Rendering (CSR) berbasis JSON Data Provider, Vanilla JavaScript (ES6+), dan Bootstrap 5.3** pada mata kuliah **Pemrograman dan Pengujian Aplikasi Web (12S3101)** — **Institut Teknologi Del**.

Proyek ini merefaktor basis kode Tugas Minggu 03 menjadi sistem berarsitektur **Decoupled Tier**, di mana dokumen `index.html` murni berfungsi sebagai *Shell Container* tanpa konten *hardcoded*, sementara seluruh data disinkronkan secara asinkron (`async/await fetch`) dari berkas JSON dan disanitasi dari ancaman **DOM XSS**.

---

## 📌 Informasi Pemilik & Deployment Live

* **Nama Pengembang:** Choqy Pananda Sirait
* **NIM / Program Studi:** 12S24012 — S1 Sistem Informasi
* **Institusi:** Institut Teknologi Del
* **Profil GitHub:** [@ChoqySirait](https://github.com/ChoqySirait)
* **Live Demo (GitHub Pages):** [https://choqysirait.github.io/ppw-2026-week2-12S24012/]

---

## 📊 Tabel Komparasi Peningkatan (Minggu 03 vs Minggu 04)

| Area Evaluasi | Minggu 03 (Framework Integration) | Minggu 04 (Decoupled Multi-Tier CSR) |
| :--- | :--- | :--- |
| **Arsitektur Data & DOM** | Konten proyek & profil di-*hardcode* secara statis di dalam file `index.html` | **Decoupled Multi-Tier**: Konten dipisah ke berkas JSON (`data/*.json`) & disuntik dinamis via CSR |
| **Pengambilan Data (Data Ingestion)** | Tidak ada pemanggilan API / Fetching | **Async Fetch API Engine** menggunakan `async/await` dan `Promise.all()` pada Service Tier |
| **Keamanan Antarmuka (XSS Protection)** | Belum ada sanitasi variabel konten | **DOM XSS Sanitizer Engine** (`ApiService.sanitizeHTML()`) untuk mencegah serangan *script injection* |
| **Katalog Proyek & Grid** | Kartu proyek statis 2-kolom dengan Search Bar | **Interactive Grid 3-Kolom** dengan *Category Filter Pills* instan tanpa *page reload* |
| **Penyajian Keahlian (Tech Stack)** | Label *tech pill* biasa | **Hover Bubble Glow Effect**: Animasi pendaran biru menyala dan mengembang saat kursor diarahkan |
| **Formulir Layanan** | Formulir berbasis paket & estimasi harga (*e-commerce style*) | **Formulir Kontak Kolaborasi Semantik** dengan pembungkus `<fieldset>` & `<legend>` sesuai WCAG 2.2 |
| **Tata Letak Dashboard** | Sidebar profil statis | **Collapsible Floating Sidebar**: Sidebar dapat dilipat mulus dengan tombol pemicu *floating pill* |

---

## 🧩 Diagram Arsitektur Multi-Tier

```text
+-----------------------------------------------------------------------+
|                       PRESENTATION / UI TIER                          |
|  - index.html (Clean Shell Container tanpa konten hardcoded)          |
|  - style.css (Glassmorphic UI, Grid 3-Kolom, Bubble Glow Effects)     |
+-----------------------------------------------------------------------+
                                   ▲
                                   │  Dynamic DOM Injection & Event Handling
                                   ▼
+-----------------------------------------------------------------------+
|                          PRESENTER ENGINE                             |
|  - js/app.js (CSR State Manager, Category Filtering, UI States)       |
+-----------------------------------------------------------------------+
                                   ▲
                                   │  Async Fetch API & Sanitized Data
                                   ▼
+-----------------------------------------------------------------------+
|                            SERVICE TIER                               |
|  - js/api-service.js (Async Data Ingestion & DOM XSS Sanitizer)       |
+-----------------------------------------------------------------------+
                                   ▲
                                   │  HTTP / Local File Ingestion
                                   ▼
+-----------------------------------------------------------------------+
|                             DATA TIER                                 |
|  - data/profile.json  |  data/projects.json  |  data/services.json    |
+-----------------------------------------------------------------------+
```

---

## 🛠️ Fitur Utama & Keunggulan Teknis
1. Decoupled Multi-Tier & Client-Side Rendering (CSR)
- Data Tier (data/): Menyimpan data mentah JSON (profile.json, projects.json, services.json).
- Service Tier (js/api-service.js): Menangani data retrieval asinkron dan sanitasi input.
- Presenter/UI Tier (js/app.js & index.html): Mengatur logika antarmuka, event listeners, serta merender komponen DOM secara dinamis.

2. Penanganan State Antarmuka (UI States Handling)
- Loading State: Menampilkan spinner loader Bootstrap saat data JSON sedang di-fetch.
- Success State: Merender grid 3-kolom proyek, lini masa proyek, dan kartu layanan secara mulus.
- Error State: Menampilkan pesan peringatan visual jika file JSON gagal dimuat atau server mengalami gangguan.

3. Keamanan DOM XSS Sanitization
- Setiap data teks dari JSON diproses melalui fungsi ApiService.sanitizeHTML() untuk memastikan tidak ada karakter HTML berbahaya yang dapat mengeksekusi script jahat di browser pengguna.

4. Interactive Grid Showcase & Filter Pills
- Penyajian katalog proyek dalam Grid 3-Kolom yang bersih dan responsif.
- Filter Pills: Pengguna dapat memfilter proyek berdasarkan kategori secara instan tanpa perlu memuat ulang halaman.

5. Hover Bubble Glow Effect pada Tech Pills
- Seluruh badge teknologi (Tech Stack Pills) memiliki efek Bubble Glow—ketika kursor diarahkan, badge akan mengembang (scale), memancar warna biru menyala, dan memberikan respon visual yang interaktif.

6. Form Kolaborasi Semantik & WCAG 2.2 AA Compliance
- Formulir kontak dibungkus menggunakan tag semantik <fieldset> dan <legend> untuk memenuhi standar keterbacaan screen reader.
- Dilengkapi validasi Bootstrap bawaan (.was-validated) dan notifikasi Toast asinkron.

---

## 📸 Dokumentasi Antarmuka (Screenshots)

* **Tampilan Git Commit & History**
<img width="959" height="530" alt="image" src="https://github.com/user-attachments/assets/9a69e305-d8ea-46e7-a4e4-b639358d9f4d" />


* **Tampilan Desktop**

<img width="959" height="533" alt="image" src="https://github.com/user-attachments/assets/8d63560e-b652-4a3b-9e34-21bec183cae8" />

<img width="959" height="533" alt="image" src="https://github.com/user-attachments/assets/09dcdc79-94bb-49dc-808b-f73e4f52908b" />

<img width="959" height="532" alt="image" src="https://github.com/user-attachments/assets/8b8fa1e6-d13a-4c52-a108-3d16b07e52c4" />

<img width="959" height="536" alt="image" src="https://github.com/user-attachments/assets/d24454d3-279c-423d-a4d2-e1c12e9489c8" />

<img width="959" height="535" alt="image" src="https://github.com/user-attachments/assets/dd396b04-dfe2-431a-a372-e81ab25f17cb" />



* **Tampilan Mobile Responsive & Collapsible Profile**

<img width="165" height="356" alt="image" src="https://github.com/user-attachments/assets/f66d3dfd-5655-485a-b294-f0a6ece151a3" /> <img width="164" height="357" alt="image" src="https://github.com/user-attachments/assets/80cde941-6e91-48cc-aba3-aad9e8d2a2f4" /> <img width="164" height="358" alt="image" src="https://github.com/user-attachments/assets/d3668aab-7809-4213-8e0d-a2036ed76d0c" /> <img width="164" height="359" alt="image" src="https://github.com/user-attachments/assets/42661df6-aab1-41bf-87fa-0393e6079b16" /> <img width="159" height="356" alt="image" src="https://github.com/user-attachments/assets/6bfb26fb-5f57-4bb8-932f-83b48be917d5" /> <img width="164" height="356" alt="image" src="https://github.com/user-attachments/assets/6aa7d7a2-d6e7-4c74-b3f1-3e4398338083" />




 
---

## 📂 Struktur Repositori
```
.
├── css/
│   └── style.css          # Stylesheet kustom (Glassmorphism, CSS Variables, & Bubble Glow)
├── data/
│   ├── profile.json       # Mock API Data Profil & Bio
│   ├── projects.json      # Mock API Data Katalog Proyek
│   └── services.json      # Mock API Data Layanan & Keahlian
├── js/
│   ├── api-service.js     # Service Layer (Fetch API Provider & DOM XSS Sanitizer)
│   └── app.js             # Presenter Layer (CSR Engine, State Handling, & Events)
├── foto-profile.jpg       # Berkas foto profil pengembang
├── index.html             # Shell Document HTML5 Semantik (Clean Container)
└── README.md              # Dokumentasi resmi repositori & spesifikasi arsitektur
```
