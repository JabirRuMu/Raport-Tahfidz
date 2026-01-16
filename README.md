# Raport Pendidikan Islam - Sistem Raport Tahfidz & Tilawati

Aplikasi web berbasis Next.js untuk mengelola raport elektronik pendidikan Islam, khususnya untuk program Tahfidz (menghafal Al-Qur'an) dan Tilawati (membaca Al-Qur'an dengan metode Tilawati).

## 🌟 Fitur Utama

### Raport Tahfidz
- 📖 Nilai Hafalan Per Surah
- 🎓 Nilai Adab di Halaqah
- 🔄 Nilai Murojaah (Pengulangan)
- 📊 Rata-rata Nilai Harian
- 📋 Rekapitulasi Absensi (Sakit, Izin, Tanpa Keterangan)
- 📝 Catatan Guru untuk Siswa

### Raport Tilawati
- 🎯 Nilai Munaqosyah dengan Detail:
  - Kelancaran (Fluency)
  - Fashohah (Correct Pronunciation)
  - Tajwid (Quranic Elocution)
- 🎓 Nilai Adab di Halaqah
- 📊 Rata-rata Nilai Harian
- 📋 Rekapitulasi Absensi
- 📝 Catatan Guru untuk Siswa

### Area Admin
- 👥 Kelola Data Siswa (Tambah, Edit, Hapus)
- 📝 Input Nilai Siswa untuk Tahfidz & Tilawati
- 📅 Manajemen Absensi Siswa
- 📊 Rekapitulasi Kehadiran Siswa

## 🛠️ Stack Teknologi

- **Frontend**: React 18 + TypeScript
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3
- **Tools**: ESLint, TypeScript

## 📋 Persyaratan

- Node.js >= 18.0.0
- npm atau yarn

## 🚀 Cara Menggunakan

### 1. Instalasi Dependencies

```bash
npm install
```

### 2. Menjalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### 3. Build untuk Production

```bash
npm run build
npm start
```

## 📁 Struktur Project

```
src/
├── app/
│   ├── page.tsx              # Halaman Utama / Dashboard
│   ├── layout.tsx            # Layout Global
│   ├── globals.css           # CSS Global
│   ├── tahfidz/
│   │   └── page.tsx          # Halaman Raport Tahfidz
│   ├── tilawati/
│   │   └── page.tsx          # Halaman Raport Tilawati
│   └── admin/
│       ├── students/
│       │   └── page.tsx      # Manajemen Siswa
│       ├── grades/
│       │   └── page.tsx      # Input Nilai
│       └── attendance/
│           └── page.tsx      # Manajemen Absensi
├── components/               # Reusable Components
└── utils/                    # Utility Functions
```

## 🎯 Halaman Utama

### Dashboard (/)
- Navigasi ke Raport Tahfidz
- Navigasi ke Raport Tilawati
- Akses Area Admin

### Raport Tahfidz (/tahfidz)
- Pilih Siswa
- Lihat nilai hafalan per surah
- Lihat ringkasan nilai (Adab, Murojaah, Rata-rata Harian)
- Lihat rekapitulasi absensi
- Lihat catatan guru
- Fitur print raport

### Raport Tilawati (/tilawati)
- Pilih Siswa
- Lihat nilai munaqosyah (Kelancaran, Fashohah, Tajwid)
- Lihat ringkasan nilai (Adab, Rata-rata Harian)
- Lihat rekapitulasi absensi
- Lihat catatan guru
- Fitur print raport

### Admin - Kelola Siswa (/admin/students)
- Daftar semua siswa
- Tambah siswa baru
- Hapus data siswa

### Admin - Input Nilai (/admin/grades)
- Input nilai Tahfidz (Hafalan, Adab, Murojaah, dll)
- Input nilai Tilawati (Kelancaran, Fashohah, Tajwid, Adab, dll)
- Lihat riwayat nilai
- Hapus catatan nilai

### Admin - Kelola Absensi (/admin/attendance)
- Catat kehadiran siswa (Hadir, Sakit, Izin, Tanpa Keterangan)
- Lihat riwayat absensi
- Rekapitulasi kehadiran per siswa
- Hapus catatan absensi

## 🎨 Desain UI

- Modern dan responsif (mobile-friendly)
- Gradien warna yang menarik
- Menggunakan Tailwind CSS untuk styling
- Ikon emoji untuk visual yang lebih baik
- Tabel interaktif dengan hover effect

## 📱 Responsive Design

Aplikasi dirancang untuk bekerja dengan baik di:
- Desktop
- Tablet
- Mobile Phone

## 🔄 Data Management

Saat ini, aplikasi menggunakan sample data yang disimpan di state React. Untuk production, Anda perlu:

1. Integrasi dengan Database (MongoDB, PostgreSQL, MySQL, dll)
2. Buat API endpoints untuk CRUD operations
3. Implementasi autentikasi dan otorisasi
4. Tambah validasi form yang lebih ketat
5. Implementasi error handling yang lebih baik

## 🖨️ Print Raport

Setiap halaman raport memiliki tombol "Cetak Raport" yang memungkinkan:
- Cetak langsung ke printer
- Export sebagai PDF
- Disesuaikan dengan print styles

## 💡 Tips Penggunaan

1. **Untuk Guru**:
   - Buka halaman admin untuk input nilai dan kehadiran
   - Berikan catatan yang detail untuk setiap siswa

2. **Untuk Orang Tua/Wali**:
   - Buka halaman Tahfidz atau Tilawati
   - Pilih siswa dari dropdown
   - Lihat pencapaian dan catatan guru
   - Print raport jika diperlukan

## 🚀 Pengembangan Lebih Lanjut

Fitur yang bisa ditambahkan di masa depan:
- Dashboard dengan statistik lengkap
- Grafik perkembangan siswa
- Export ke Excel/PDF
- Multi-user authentication
- Role-based access control
- Email notifikasi untuk orang tua
- Mobile app version
- Real-time synchronization dengan database

## 📞 Support

Untuk pertanyaan atau masalah, silakan hubungi developer.

## 📄 Lisensi

Proyek ini adalah proprietary software. Hak cipta dilindungi.

---

**Versi**: 1.0.0  
**Dibuat**: 2025  
**Bahasa**: Bahasa Indonesia + English
