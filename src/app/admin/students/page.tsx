'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Student {
  id: string;
  name: string;
  class: string;
  nisn: string;
  parentName: string;
  parentPhone: string;
}

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([
    { id: 'student001', name: 'Muhammad Faiz', class: '6A', nisn: '001234567890', parentName: 'Ahmad', parentPhone: '081234567890' },
    { id: 'student002', name: 'Noor Fatimah', class: '6A', nisn: '001234567891', parentName: 'Siti', parentPhone: '081234567891' },
    { id: 'student003', name: 'Hamid Ridho', class: '6B', nisn: '001234567892', parentName: 'Badr', parentPhone: '081234567892' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Student>({
    id: '',
    name: '',
    class: '',
    nisn: '',
    parentName: '',
    parentPhone: '',
  })

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.class && formData.nisn) {
      setStudents([...students, { ...formData, id: `student${Date.now()}` }])
      setFormData({ id: '', name: '', class: '', nisn: '', parentName: '', parentPhone: '' })
      setShowForm(false)
    }
  }

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin - Kelola Siswa</h1>
              <p className="text-green-100">Manajemen Data Siswa</p>
            </div>
            <Link href="/" className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg">
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Add Student Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary bg-green-600 hover:bg-green-700"
          >
            {showForm ? '❌ Batal' : '➕ Tambah Siswa'}
          </button>
        </div>

        {/* Add Student Form */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="section-title">Form Tambah Siswa</h2>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Siswa</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Masukkan nama siswa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kelas</label>
                  <select
                    className="input-field"
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    required
                  >
                    <option value="">Pilih Kelas</option>
                    <option value="6A">6A</option>
                    <option value="6B">6B</option>
                    <option value="7A">7A</option>
                    <option value="7B">7B</option>
                    <option value="8A">8A</option>
                    <option value="8B">8B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">NISN</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.nisn}
                    onChange={(e) => setFormData({...formData, nisn: e.target.value})}
                    placeholder="Nomor Induk Siswa Nasional"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Orang Tua</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    placeholder="Nama orang tua/wali"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon Orang Tua</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                    placeholder="Nomor telepon"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary bg-green-600 hover:bg-green-700">
                  ✓ Simpan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Students List */}
        <div className="card">
          <h2 className="section-title">Daftar Siswa</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700">No</th>
                  <th className="px-4 py-3 text-left text-gray-700">Nama</th>
                  <th className="px-4 py-3 text-center text-gray-700">Kelas</th>
                  <th className="px-4 py-3 text-left text-gray-700">NISN</th>
                  <th className="px-4 py-3 text-left text-gray-700">Orang Tua</th>
                  <th className="px-4 py-3 text-center text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{idx + 1}</td>
                    <td className="px-4 py-3 text-gray-800 font-semibold">{student.name}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{student.nisn}</td>
                    <td className="px-4 py-3 text-gray-600">{student.parentName || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Total: {students.length} siswa
          </div>
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
