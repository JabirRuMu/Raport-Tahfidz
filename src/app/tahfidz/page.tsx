'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useStudent, TahfidzData } from '@/context/StudentContext'

interface SurahScore {
  surah: string;
  score: number;
  date: string;
}

interface AttendanceRecord {
  sakit: number;
  izin: number;
  tanpaKeterangan: number;
}

export default function TahfidzReport() {
  const [selectedStudent, setSelectedStudent] = useState<string>('student001')

  const { getTahfidzData, students } = useStudent()

  const currentStudent = students.find(s => s.id === selectedStudent)
  const tahfidzData = getTahfidzData(selectedStudent)
  const certRef = useRef<HTMLDivElement | null>(null)
  const averageSurahScore = currentStudent?.surahScores
    ? Math.round(currentStudent.surahScores.reduce((a: number, b: SurahScore) => a + b.score, 0) / currentStudent.surahScores.length)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <span>📖</span> Raport Tahfidz
              </h1>
              <p className="text-blue-100">Sistem Penilaian Menghafal Al-Qur'an</p>
            </div>
            <Link href="/" className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg">
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Student Selection */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pilih Siswa</h2>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="input-field"
          >
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} - {student.class}
              </option>
            ))}
          </select>
        </div>

        {currentStudent && tahfidzData && (
          <>
            {/* Student Info */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="card">
                <p className="text-gray-600 text-sm">Nama Siswa</p>
                <p className="text-2xl font-bold text-gray-800">{currentStudent.name}</p>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm">Kelas</p>
                <p className="text-2xl font-bold text-gray-800">{tahfidzData.class}</p>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm">Semester / Tahun</p>
                <p className="text-2xl font-bold text-gray-800">{tahfidzData.semester} / {tahfidzData.year}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Surah Scores */}
                <section className="card">
                  <h2 className="section-title">Nilai Hafalan Per Surah</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-700">Surah</th>
                          <th className="px-4 py-2 text-center text-gray-700">Nilai</th>
                          <th className="px-4 py-2 text-center text-gray-700">Tanggal</th>
                          <th className="px-4 py-2 text-center text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tahfidzData.surahScores.map((item, idx: number) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-800">{item.surah}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-bold ${item.score >= 85 ? 'text-green-600' : 'text-orange-600'}`}>
                                {item.score}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-gray-600">{new Date(item.date).toLocaleDateString('id-ID')}</td>
                            <td className="px-4 py-3 text-center">
                              {item.score >= 85 ? (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                  Lulus
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                  Perlu Perbaikan
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={async () => {
                                  // prepare certificate content in a hidden div
                                  if (!certRef.current) return
                                  const el = document.createElement('div')
                                  el.style.width = '800px'
                                  el.style.padding = '32px'
                                  el.style.background = 'white'
                                  el.style.border = '8px solid #1e40af'
                                  el.style.borderRadius = '12px'
                                  el.style.fontFamily = 'Arial, Helvetica, sans-serif'
                                  el.innerHTML = `
                                      <div style="text-align:center;">
                                        <h2 style="margin-bottom:8px; color:#1e40af">SERTIFIKAT PENCAPAIAN HAFALAN</h2>
                                        <h3 style="margin:0 0 12px 0;">Nama: ${currentStudent.name}</h3>
                                        <p style="margin:0 0 12px 0;">Kelas: ${currentStudent.class} — Semester ${currentStudent.semester}/${currentStudent.year}</p>
                                        <div style="margin:24px 0; padding:16px; border-radius:8px; background:#f3f4f6; display:inline-block; text-align:left;">
                                          <p style="margin:4px 0"><strong>Surah:</strong> ${item.surah}</p>
                                          <p style="margin:4px 0"><strong>Nilai:</strong> ${item.score}</p>
                                          <p style="margin:4px 0"><strong>Tanggal:</strong> ${new Date(item.date).toLocaleDateString('id-ID')}</p>
                                        </div>
                                        <p style="margin-top:18px;">Dinyatakan: <strong>${item.score >= 85 ? 'LULUS' : 'PERLU PERBAIKAN'}</strong></p>
                                        <p style="margin-top:36px">Pengajar: ____________________</p>
                                      </div>
                                    `
                                  // attach to body temporarily
                                  el.style.position = 'fixed'
                                  el.style.left = '-9999px'
                                  el.style.top = '0'
                                  document.body.appendChild(el)
                                  try {
                                    const canvas = await html2canvas(el, { scale: 2 })
                                    const imgData = canvas.toDataURL('image/png')
                                    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [canvas.width, canvas.height] })
                                    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
                                    pdf.save(`${currentStudent.name.replace(/\s+/g, '_')}_${item.surah.replace(/[^a-z0-9]/gi, '_')}_sertifikat.pdf`)
                                  } catch (e) {
                                    console.error('Error generating PDF', e)
                                    alert('Gagal membuat sertifikat. Coba lagi.')
                                  } finally {
                                    document.body.removeChild(el)
                                  }
                                }}
                                className="btn-secondary text-sm"
                              >
                                📄 Unduh Sertifikat
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Rata-rata Nilai Hafalan:</strong> <span className="text-lg font-bold text-blue-600">{averageSurahScore}</span>
                    </p>
                  </div>
                </section>

                {/* Score Summary */}
                <section className="card">
                  <h2 className="section-title">Ringkasan Nilai</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-600">
                      <p className="text-gray-600 text-sm font-semibold">ADAB DI HALAQAH</p>
                      <p className="text-3xl font-bold text-blue-600 mt-2">{currentStudent.adabScore}</p>
                      <p className="text-xs text-gray-600 mt-1">Kelakuan dan Sikap</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-l-4 border-green-600">
                      <p className="text-gray-600 text-sm font-semibold">MUROJAAH</p>
                      <p className="text-3xl font-bold text-green-600 mt-2">{currentStudent.murojaahScore}</p>
                      <p className="text-xs text-gray-600 mt-1">Pengulangan Hafalan</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-600">
                      <p className="text-gray-600 text-sm font-semibold">RATA-RATA HARIAN</p>
                      <p className="text-3xl font-bold text-purple-600 mt-2">{currentStudent.dailyAverage}</p>
                      <p className="text-xs text-gray-600 mt-1">Nilai Setiap Hari</p>
                    </div>
                  </div>
                </section>

                {/* Attendance */}
                <section className="card">
                  <h2 className="section-title">Rekapitulasi Absensi</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg text-center border border-yellow-200">
                      <p className="text-gray-600 text-sm">Sakit</p>
                      <p className="text-4xl font-bold text-yellow-600 mt-2">{currentStudent.attendance.sakit}</p>
                      <p className="text-xs text-gray-600 mt-1">Hari</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border border-blue-200">
                      <p className="text-gray-600 text-sm">Izin</p>
                      <p className="text-4xl font-bold text-blue-600 mt-2">{currentStudent.attendance.izin}</p>
                      <p className="text-xs text-gray-600 mt-1">Hari</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg text-center border border-red-200">
                      <p className="text-gray-600 text-sm">Tanpa Keterangan</p>
                      <p className="text-4xl font-bold text-red-600 mt-2">{currentStudent.attendance.tanpaKeterangan}</p>
                      <p className="text-xs text-gray-600 mt-1">Hari</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Score Card */}
                <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-600">
                  <div className="text-center">
                    <p className="text-gray-600 font-semibold text-sm">NILAI AKHIR TAHFIDZ</p>
                    <div className="mt-4">
                      <div className="text-6xl font-bold text-blue-600">{averageSurahScore}</div>
                      <div className="mt-2 w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min(averageSurahScore, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="card">
                  <h3 className="font-bold text-gray-800 mb-3">Status Pencapaian</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm text-gray-700">Nilai Hafalan: {averageSurahScore} (Target: ≥85)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm text-gray-700">Adab: {currentStudent.adabScore} (Target: ≥80)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-sm text-gray-700">Murojaah: {currentStudent.murojaahScore} (Target: ≥80)</span>
                    </div>
                  </div>
                </div>

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className="btn-primary w-full"
                >
                  🖨️ Cetak Raport
                </button>
              </div>
            </div>

            {/* Teacher Notes */}
            <section className="card mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-600">
              <h2 className="section-title text-indigo-900">Catatan Guru</h2>
              <div className="p-4 bg-white rounded-lg border-l-4 border-indigo-500">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {tahfidzData.notes || 'Belum ada catatan.'}
                </p>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p>&copy; 2025 Raport Tahfidz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
