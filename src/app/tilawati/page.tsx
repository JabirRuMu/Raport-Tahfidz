'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useStudent, TilawatiData } from '@/context/StudentContext'

interface MunaqosyahScore {
  date: string;
  kelancaran: number;
  fashohah: number;
  tajwid: number;
  notes: string;
}

interface AttendanceRecord {
  sakit: number;
  izin: number;
  tanpaKeterangan: number;
}

export default function TilawatiReport() {
  const [selectedStudent, setSelectedStudent] = useState<string>('student001')
  const { students, getTilawatiData } = useStudent()

  const currentStudent = students.find(s => s.id === selectedStudent)
  const tilawatiData = getTilawatiData(selectedStudent)

  // Calculate averages
  const avgKelancaran = tilawatiData?.munaqosyah
    ? Math.round(tilawatiData.munaqosyah.reduce((a: number, b: any) => a + b.kelancaran, 0) / tilawatiData.munaqosyah.length)
    : 0
  const avgFashohah = tilawatiData?.munaqosyah
    ? Math.round(tilawatiData.munaqosyah.reduce((a: number, b: any) => a + b.fashohah, 0) / tilawatiData.munaqosyah.length)
    : 0
  const avgTajwid = tilawatiData?.munaqosyah
    ? Math.round(tilawatiData.munaqosyah.reduce((a: number, b: any) => a + b.tajwid, 0) / tilawatiData.munaqosyah.length)
    : 0
  const overallMunaqosyah = Math.round((avgKelancaran + avgFashohah + avgTajwid) / 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <span>🎯</span> Raport Tilawati
              </h1>
              <p className="text-cyan-100">Sistem Penilaian Membaca Al-Qur'an Metode Tilawati</p>
            </div>
            <Link href="/" className="bg-cyan-500 hover:bg-cyan-700 px-4 py-2 rounded-lg">
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

        {currentStudent && tilawatiData && (
          <>
            {/* Student Info */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="card">
                <p className="text-gray-600 text-sm">Nama Siswa</p>
                <p className="text-2xl font-bold text-gray-800">{currentStudent.name}</p>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm">Kelas</p>
                <p className="text-2xl font-bold text-gray-800">{tilawatiData.class}</p>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm">Semester / Tahun</p>
                <p className="text-2xl font-bold text-gray-800">{tilawatiData.semester} / {tilawatiData.year}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Munaqosyah Scores */}
                <section className="card">
                  <h2 className="section-title">Nilai Munaqosyah</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-cyan-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-700">Tanggal</th>
                          <th className="px-4 py-2 text-center text-gray-700">Kelancaran</th>
                          <th className="px-4 py-2 text-center text-gray-700">Fashohah</th>
                          <th className="px-4 py-2 text-center text-gray-700">Tajwid</th>
                          <th className="px-4 py-2 text-center text-gray-700">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tilawatiData.munaqosyah.map((item: MunaqosyahScore, idx: number) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-800">{new Date(item.date).toLocaleDateString('id-ID')}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-bold px-3 py-1 rounded-full text-sm ${item.kelancaran >= 85 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {item.kelancaran}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-bold px-3 py-1 rounded-full text-sm ${item.fashohah >= 85 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {item.fashohah}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-bold px-3 py-1 rounded-full text-sm ${item.tajwid >= 85 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {item.tajwid}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-gray-600 text-xs">{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Score Breakdown */}
                <section className="card">
                  <h2 className="section-title">Rincian Nilai Munaqosyah</h2>
                  <div className="space-y-4">
                    {/* Kelancaran */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">Kelancaran (Fluency)</span>
                        <span className="text-2xl font-bold text-blue-600">{avgKelancaran || 0}</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${avgKelancaran}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Seberapa lancar siswa membaca Al-Qur'an tanpa tergesa-gesa atau terputus</p>
                    </div>

                    {/* Fashohah */}
                    <div className="p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">Fashohah (Correct Pronunciation)</span>
                        <span className="text-2xl font-bold text-cyan-600">{avgFashohah || 0}</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-cyan-600 h-2 rounded-full"
                          style={{ width: `${avgFashohah}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Kebenaran pelafalan dan ketepatan cara membaca setiap huruf</p>
                    </div>

                    {/* Tajwid */}
                    <div className="p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">Tajwid (Quranic Elocution)</span>
                        <span className="text-2xl font-bold text-teal-600">{avgTajwid || 0}</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full"
                          style={{ width: `${avgTajwid}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Penerapan aturan-aturan tajwid dalam membaca Al-Qur'an</p>
                    </div>
                  </div>
                </section>

                {/* Summary */}
                <section className="card">
                  <h2 className="section-title">Ringkasan Nilai</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-600">
                      <p className="text-gray-600 text-sm font-semibold">ADAB DI HALAQAH</p>
                      <p className="text-3xl font-bold text-purple-600 mt-2">{tilawatiData.adabScore}</p>
                      <p className="text-xs text-gray-600 mt-1">Kelakuan dan Sikap</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-l-4 border-green-600">
                      <p className="text-gray-600 text-sm font-semibold">RATA-RATA HARIAN</p>
                      <p className="text-3xl font-bold text-green-600 mt-2">{tilawatiData.dailyAverage}</p>
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
                      <p className="text-4xl font-bold text-yellow-600 mt-2">{tilawatiData.attendance.sakit}</p>
                      <p className="text-xs text-gray-600 mt-1">Hari</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border border-blue-200">
                      <p className="text-gray-600 text-sm">Izin</p>
                      <p className="text-4xl font-bold text-blue-600 mt-2">{tilawatiData.attendance.izin}</p>
                      <p className="text-xs text-gray-600 mt-1">Hari</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg text-center border border-red-200">
                      <p className="text-gray-600 text-sm">Tanpa Keterangan</p>
                      <p className="text-4xl font-bold text-red-600 mt-2">{tilawatiData.attendance.tanpaKeterangan}</p>
                      <p className="text-xs text-gray-600 mt-1">Hari</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="card bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-600">
                  <div className="text-center">
                    <p className="text-gray-600 font-semibold text-sm">NILAI AKHIR TILAWATI</p>
                    <div className="mt-4">
                      <div className="text-6xl font-bold text-cyan-600">{overallMunaqosyah || 0}</div>
                      <div className="mt-2 w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-cyan-600 h-2 rounded-full"
                          style={{ width: `${Math.min(overallMunaqosyah, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="card">
                  <h3 className="font-bold text-gray-800 mb-3">Pencapaian</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={avgKelancaran >= 85 ? "text-green-600" : "text-orange-600"}>
                        {avgKelancaran >= 85 ? "✓" : "◆"}
                      </span>
                      <span className="text-sm text-gray-700">Kelancaran: {avgKelancaran} (Target: ≥85)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={avgFashohah >= 85 ? "text-green-600" : "text-orange-600"}>
                        {avgFashohah >= 85 ? "✓" : "◆"}
                      </span>
                      <span className="text-sm text-gray-700">Fashohah: {avgFashohah} (Target: ≥85)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={avgTajwid >= 80 ? "text-green-600" : "text-orange-600"}>
                        {avgTajwid >= 80 ? "✓" : "◆"}
                      </span>
                      <span className="text-sm text-gray-700">Tajwid: {avgTajwid} (Target: ≥80)</span>
                    </div>
                  </div>
                </div>

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className="btn-primary w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  🖨️ Cetak Raport
                </button>
              </div>
            </div>

            {/* Teacher Notes */}
            <section className="card mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-600">
              <h2 className="section-title text-teal-900">Catatan Guru</h2>
              <div className="p-4 bg-white rounded-lg border-l-4 border-teal-500">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {tilawatiData.notes || 'Belum ada catatan.'}
                </p>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p>&copy; 2025 Raport Tilawati. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
