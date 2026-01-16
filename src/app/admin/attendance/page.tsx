'use client'

import Link from 'next/link'
import { useState } from 'react'

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'hadir' | 'sakit' | 'izin' | 'tanpaKeterangan';
}

export default function AdminAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([
    { id: '1', studentId: 'student001', studentName: 'Muhammad Faiz', date: '2024-01-15', status: 'hadir' },
    { id: '2', studentId: 'student002', studentName: 'Noor Fatimah', date: '2024-01-15', status: 'hadir' },
    { id: '3', studentId: 'student003', studentName: 'Hamid Ridho', date: '2024-01-15', status: 'sakit' },
    { id: '4', studentId: 'student001', studentName: 'Muhammad Faiz', date: '2024-01-16', status: 'hadir' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'hadir' as 'hadir' | 'sakit' | 'izin' | 'tanpaKeterangan',
  })

  const students = [
    { id: 'student001', name: 'Muhammad Faiz' },
    { id: 'student002', name: 'Noor Fatimah' },
    { id: 'student003', name: 'Hamid Ridho' },
  ]

  const handleAddAttendance = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.studentId) {
      const student = students.find(s => s.id === formData.studentId)
      setRecords([...records, {
        id: `att${Date.now()}`,
        studentId: formData.studentId,
        studentName: student?.name || '',
        date: formData.date,
        status: formData.status,
      }])
      setFormData({
        studentId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'hadir',
      })
      setShowForm(false)
    }
  }

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id))
  }

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { bg: string; text: string; label: string } } = {
      hadir: { bg: 'bg-green-100', text: 'text-green-700', label: 'Hadir' },
      sakit: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Sakit' },
      izin: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Izin' },
      tanpaKeterangan: { bg: 'bg-red-100', text: 'text-red-700', label: 'Tanpa Keterangan' },
    }
    const badge = badges[status]
    return { ...badge }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin - Kelola Absensi</h1>
              <p className="text-orange-100">Manajemen Kehadiran Siswa</p>
            </div>
            <Link href="/" className="bg-orange-500 hover:bg-orange-700 px-4 py-2 rounded-lg">
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Add Attendance Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary bg-orange-600 hover:bg-orange-700"
          >
            {showForm ? '❌ Batal' : '➕ Catat Absensi'}
          </button>
        </div>

        {/* Add Attendance Form */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="section-title">Form Input Absensi</h2>
            <form onSubmit={handleAddAttendance} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Siswa</label>
                  <select
                    className="input-field"
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    required
                  >
                    <option value="">Pilih Siswa</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal</label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status Kehadiran</label>
                  <select
                    className="input-field"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    required
                  >
                    <option value="hadir">✓ Hadir</option>
                    <option value="sakit">🏥 Sakit</option>
                    <option value="izin">📋 Izin</option>
                    <option value="tanpaKeterangan">✗ Tanpa Keterangan</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary bg-orange-600 hover:bg-orange-700">
                  ✓ Simpan Absensi
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Attendance Records */}
        <div className="card">
          <h2 className="section-title">Daftar Absensi</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700">Nama Siswa</th>
                  <th className="px-4 py-3 text-center text-gray-700">Tanggal</th>
                  <th className="px-4 py-3 text-center text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => {
                  const badge = getStatusBadge(record.status)
                  return (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800 font-semibold">{record.studentName}</td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        {new Date(record.date).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteRecord(record.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Total: {records.length} catatan absensi
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {students.map(student => {
            const studentRecords = records.filter(r => r.studentId === student.id)
            const hadir = studentRecords.filter(r => r.status === 'hadir').length
            const sakit = studentRecords.filter(r => r.status === 'sakit').length
            const izin = studentRecords.filter(r => r.status === 'izin').length
            const tanpaKeterangan = studentRecords.filter(r => r.status === 'tanpaKeterangan').length

            return (
              <div key={student.id} className="card">
                <h3 className="font-bold text-gray-800 mb-3">{student.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hadir:</span>
                    <span className="font-bold text-green-600">{hadir}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sakit:</span>
                    <span className="font-bold text-yellow-600">{sakit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Izin:</span>
                    <span className="font-bold text-blue-600">{izin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanpa Ket:</span>
                    <span className="font-bold text-red-600">{tanpaKeterangan}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p>&copy; 2025 Admin Raport. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
