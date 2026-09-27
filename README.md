# ppw-2026-week3-12S24012
# 🌐 Refactored Accessible Portfolio & Service Dashboard (Bootstrap 5.3)

Repositori ini berisi berkas kode sumber untuk **Tugas Mandiri Minggu 03: Modernisasi & Refactoring Personal Portfolio & Service Portal Berbasis CSS Framework Kontemporer (Bootstrap 5) dan Advanced Custom CSS** pada mata kuliah **Pemrograman dan Pengujian Aplikasi Web (12S3101)** — **Institut Teknologi Del**.

Proyek ini direfaktor dari basis kode Tugas Minggu 02 menjadi antarmuka berstandar **Bootstrap 5.3+**, CSS Custom Properties (`:root`), serta komponen interaktif modern yang sepenuhnya responsif dan memenuhi standar **WCAG 2.2 Level AA**.

---

## 📌 Informasi Pemilik & Deployment Live

* **Nama Pengembang:** Choqy Pananda Sirait
* **NIM / Program Studi:** 12S24012 — S1 Sistem Informasi
* **Institusi:** Institut Teknologi Del
* **Profil GitHub:** [@ChoqySirait](https://github.com/ChoqySirait)
* **Live Demo (GitHub Pages):** [https://choqysirait.github.io/ppw-2026-week2-12S24012/]

---

## 📊 Tabel Komparasi (Sebelum vs Sesudah Integrasi Framework)

| Area Evaluasi | Minggu 02 (Sebelum Refactoring) | Minggu 03 (Sesudah Integrasi Bootstrap 5) |
| :--- | :--- | :--- |
| **Sistem Grid & Layout** | CSS Grid & Flexbox murni kustom | Bootstrap 12-Column Responsive Grid (`row`, `col-md-6`) dipadukan dengan Bento Box Dashboard |
| **Navigasi** | Header navigasi statis sederhana | Sticky Navbar (`sticky-top`) dengan Hamburger Toggle Collapse yang responsif di ponsel |
| **Komponen Interaktif** | Kartu statis tanpa dialog | Bootstrap Cards interaktif yang terhubung ke **Modal Dialog Detail Proyek** |
| **Formulir Layanan** | Kontrol input HTML5 bawaan | Modern Floating Labels (`.form-floating`), Input Groups berikon, & Validasi Visual |
| **Arsitektur CSS** | CSS murni terpisah | Custom CSS Overrides dengan CSS Variables (`:root`) & Micro-interactions (`::before`) |

---
Git
<img width="959" height="599" alt="Screenshot 2026-09-27 102320" src="https://github.com/user-attachments/assets/c1d1aa6c-bd0d-4fb3-807d-28bbf7aabb69" />
---
Web
<img width="959" height="535" alt="Screenshot 2026-09-27 103643" src="https://github.com/user-attachments/assets/b885e67f-1425-4013-a3cc-eeabe8842993" />

<img width="959" height="534" alt="Screenshot 2026-09-27 103658" src="https://github.com/user-attachments/assets/106d8a85-0d62-455a-a765-8e6170cc3e16" />
---
Mobile
<img width="959" height="537" alt="Screenshot 2026-09-27 103708" src="https://github.com/user-attachments/assets/a23a76a6-70c9-40ff-9b61-4faf9a3e022f" />

<img width="959" height="532" alt="Screenshot 2026-09-27 103724" src="https://github.com/user-attachments/assets/1fee0f0f-d8ac-4680-80ee-23e3861e8dc1" />
---
---
## 🛠️ Fitur Utama & Keunggulan Teknis

### 1. Integrasi Framework & Semantik HTML5
- **Bootstrap 5.3.3 & Icons CDN**: Memanfaatkan pustaka visual kontemporer dan ikonografi tanpa merusak struktur semantik murni HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).

### 2. Responsivitas Grid & Multi-Device
- **12-Column Grid System**: Tampilan fleksibel multi-perangkat (ponsel, tablet, laptop) tanpa eror *horizontal overflow*.
- **Touch-Responsive Data Table**: Pembungkus tabel dengan `overflow-x: auto` dan `min-width` khusus sehingga data tabular dapat digeser (*swipe*) dengan mulus di layar seluler.

### 3. Komponen UI Interaktif & Floating Labels Form
- **Bootstrap Modal Dialog**: Kartu proyek terhubung langsung dengan jendela pop-up detail karya.
- **Form Floating Labels & Validasi Visual**: Pengalaman pengisian form modern dilengkapi indikator `.invalid-feedback` visual.

### 4. Custom Overrides & CSS Variables (`:root`)
- **Aturan `:root`**: Mendefinisikan lebih dari 6 variabel CSS global untuk konsistensi warna brand, sudut membulat, dan bayangan.
- **Micro-Interactions**: Penataan gaya garis aksen mengembang pada kartu menggunakan pseudo-element `::before` tanpa penggunaan `!important` secara tidak terstruktur.

---

## 📂 Struktur Repositori

```text
.
├── index.html         # Berkas dokumen utama HTML5 Semantik & Bootstrap 5
├── style.css          # Stylesheet kustom eksternal (Overrides, Variables & Fixes)
├── foto-profile.jpg   # Berkas foto profil pengembang
└── README.md          # Dokumentasi resmi repositori & tabel komparasi
