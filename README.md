# ppw-2026-week2-12S24012
# 🌐 Modern Accessible Portfolio & Service Dashboard

Repositori ini berisi berkas kode sumber untuk **Tugas Mandiri Minggu 02: HTML5 Semantik, CSS3 Modern, & Aksesibilitas Antarmuka Web** pada mata kuliah **Pemrograman dan Pengujian Aplikasi Web (1253101)** — **Institut Teknologi Del**.

Proyek ini dirancang menggunakan arsitektur **Dashboard Layout 2-Kolom** yang bersih, responsif, dan fungsional, tanpa bantuan pustaka (framework) eksternal maupun JavaScript, dengan fokus utama pada pemenuhan standar **WCAG 2.2 Level AA**.

---

## 📌 Informasi Pemilik & Deployment Live

* **Nama Pengembang:** Choqy Pananda Sirait
* **NIM / Program Studi:** 12S24012 — S1 Sistem Informasi
* **Institusi:** Institut Teknologi Del
* **Profil GitHub:** [@ChoqySirait](https://github.com/ChoqySirait)
* **Live Demo (GitHub Pages):** [https://choqysirait.github.io/ppw-2026-week2-12S24012/]

---

Web: 

<img width="959" height="566" alt="image" src="https://github.com/user-attachments/assets/2eac88e8-f53a-4534-858c-b207e53d5abb" />


<img width="959" height="535" alt="image" src="https://github.com/user-attachments/assets/e0bf4066-9b82-4088-a9ed-0bec9c2bb93b" />


Mobile:

<img width="532" height="530" alt="image" src="https://github.com/user-attachments/assets/3fe6d3a6-a40c-4605-a6bc-3f6a9219123d" />


## 🛠️ Fitur Utama & Keunggulan Teknis

Dokumen web ini dibangun murni menggunakan **HTML5 & CSS3** dengan memperhatikan standar *UI/UX Engineering* serta rubrik penilaian praktikum:

### 1. Arsitektur Semantik HTML5 Penuh
- **Struktur Logis**: Memanfaatkan elemen semantik murni (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) tanpa *div-soup*.
- **Hierarki Konten**: Penggunaan tingkat judul (`<h1>`, `<h2>`, `<h3>`) yang terurut dan konsisten di seluruh seksi.

### 2. Penyajian Data Terstruktur & Accessible
- **Kombinasi Elemen List**: Menggunakan Unordered List (`<ul>`) untuk daftar keahlian dan Ordered List (`<ol>`) untuk alur kerja sistematis.
- **Tabel Semantik Kompleks**: Dilengkapi `<caption>` untuk judul tabel, `<thead>`, `<tbody>`, `<tfoot>`, atribut `scope="col/row"` pada header tabel, serta tag `<time datetime="...">` untuk format penanggalan yang terbaca oleh mesin.

### 3. Formulir Layanan Interaktif (WCAG 2.2 AA Standard)
- **Pengelompokan Kontrol**: Dibagi menjadi 3 kelompok `<fieldset>` dan `<legend>` yang terstruktur.
- **Variasi Kontrol Input (8+ Jenis)**: Terdiri dari `text`, `email`, `tel`, `number`, `select`, `radio`, `checkbox`, `textarea`, dan `date`.
- **Aksesibilitas & Validasi**: Menghubungkan label eksplisit (`for="..."`), validasi native (`required`), serta indikator fokus visual (*Focus Ring*) yang rapi bagi pengguna keyboard.

### 4. Layout CSS Modern & Harmonisasi Warna (Aturan 60-30-10)
- **Universal Box Sizing Reset**: Menggunakan `box-sizing: border-box` untuk kalkulasi tata letak yang presisi.
- **Skema Warna Corporate**: 
  - **60% Dominan Netral**: Soft Slate & Pure White (`#f8fafc`, `#ffffff`)
  - **30% Teks & Struktur**: Dark Slate (`#0f172a`, `#334155`)
  - **10% Aksen & Interaksi**: Sky Blue (`#0284c7`)
- **Dashboard Grid System**: Menggunakan **CSS Grid 2-Kolom** (`320px 1fr`) dengan fitur *Sticky Sidebar* pada layar desktop, dan otomatis berubah menjadi 1 kolom responsif pada layar perangkat bergerak (`@media (max-width: 992px)`).

---

## 📂 Struktur Repositori

```text
.
├── index.html        # Berkas dokumen utama HTML5 Semantik
├── style.css         # Stylesheet eksternal (Dashboard Grid, CSS Variables, & Responsive)
├── foto-profile.jpg  # Berkas foto profil pengembang
└── README.md         # Dokumentasi resmi repositori & spesifikasi teknis

```

                                                                        ``` ##End ```
