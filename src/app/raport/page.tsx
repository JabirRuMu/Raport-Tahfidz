'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function RaportPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Raport Siswa</h1>
                            <p className="text-blue-100">Pilih jenis raport yang ingin dilihat</p>
                        </div>
                        <Link href="/" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors">
                            ← Kembali ke Menu Utama
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Tahfidz Card */}
                    <div className="card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-t-blue-600">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
                            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                                <span className="text-4xl">📖</span>
                                <div>
                                    <div>Raport Tahfidz</div>
                                    <div className="text-sm font-normal text-blue-700 mt-1">Hafalan Al-Qur'an</div>
                                </div>
                            </h2>
                        </div>
                        <div className="p-8">
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Lihat perkembangan hafalan siswa, termasuk nilai per surah, murojaah, dan adab selama halaqah.
                            </p>
                            <Link
                                href="/tahfidz"
                                className="block w-full py-4 text-center rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                Buka Raport Tahfidz →
                            </Link>
                        </div>
                    </div>

                    {/* Tilawati Card */}
                    <div className="card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-t-cyan-600">
                        <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-6 border-b border-cyan-200">
                            <h2 className="text-2xl font-bold text-cyan-900 flex items-center gap-2">
                                <span className="text-4xl">🎯</span>
                                <div>
                                    <div>Raport Tilawati</div>
                                    <div className="text-sm font-normal text-cyan-700 mt-1">Metode Tilawati</div>
                                </div>
                            </h2>
                        </div>
                        <div className="p-8">
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Pantau kelancaran membaca Al-Qur'an, fashohah, tajwid, dan nilai munaqosyah siswa.
                            </p>
                            <Link
                                href="/tilawati"
                                className="block w-full py-4 text-center rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                Buka Raport Tilawati →
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 mt-auto">
                <div className="container mx-auto px-4 py-8 text-center">
                    <p>&copy; 2025 Raport Pendidikan Islam. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
