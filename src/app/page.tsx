'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Sistem Informasi Raport</h1>
                <p className="text-xs text-gray-500">Tahfidz & Tilawati</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Tahun Ajaran 2024/2025
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">

        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Selamat Datang</h2>
          <p className="text-lg text-gray-600">
            Platform manajemen penilaian dan pelaporan hasil belajar siswa secara digital, terintegrasi dan mudah digunakan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Guru Section */}
          <Link href="/guru" className="group">
            <div className="card h-full hover:shadow-2xl transition-all duration-300 border-t-8 border-t-purple-600 transform group-hover:-translate-y-2">
              <div className="p-8 text-center">
                <div className="bg-purple-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <span className="text-5xl">👨‍🏫</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">Halaman Guru</h3>
                <p className="text-gray-600 mb-6">
                  Input nilai siswa sesuai template Excel dan export data.
                </p>
                <div className="space-y-3">
                  <span className="block px-6 py-2 bg-purple-50 text-purple-700 font-semibold rounded-full group-hover:bg-purple-600 group-hover:text-white transition-all">
                    Masuk sebagai Guru →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Recap Section */}
          <Link href="/rekap" className="group">
            <div className="card h-full hover:shadow-2xl transition-all duration-300 border-t-8 border-t-indigo-600 transform group-hover:-translate-y-2">
              <div className="p-8 text-center">
                <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-colors">
                  <span className="text-5xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">Rekap Pekanan</h3>
                <p className="text-gray-600 mb-6">
                  Lihat rekapitulasi nilai harian (Surah, Ayat, Nilai) dalam satu pekan.
                </p>
                <span className="inline-block px-6 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  Lihat Tabel Rekap →
                </span>
              </div>
            </div>
          </Link>

          {/* Wali Murid / Raport Section */}
          <Link href="/raport" className="group">
            <div className="card h-full hover:shadow-2xl transition-all duration-300 border-t-8 border-t-green-600 transform group-hover:-translate-y-2">
              <div className="p-8 text-center">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <span className="text-5xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">Lihat Raport</h3>
                <p className="text-gray-600 mb-6">
                  Pantau perkembangan hasil belajar siswa, download raport digital, dan lihat grafik perkembangan.
                </p>
                <span className="inline-block px-6 py-2 bg-green-50 text-green-700 font-semibold rounded-full group-hover:bg-green-600 group-hover:text-white transition-all">
                  Lihat Raport Siswa →
                </span>
              </div>
            </div>
          </Link>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-auto py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Islamic School Report System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
