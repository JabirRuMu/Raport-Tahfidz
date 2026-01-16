'use client'

import Link from 'next/link'
import React from 'react'
import * as XLSX from 'xlsx'
import { useStudent } from '@/context/StudentContext'

// Constants for Headers
const DAYS = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT']
// Keep row mapping for Excel export
const EXCEL_ROWS: Record<string, number> = {
    '1': 8, '2': 9, '3': 10, '4': 11, '5': 12,
    '6': 13, '7': 14, '8': 15, '9': 16, '10': 17
}

export default function RekapPage() {
    const { students } = useStudent()

    const handleExportAll = async () => {
        try {
            // 1. Load Template
            const response = await fetch('/template.xlsx')
            const arrayBuffer = await response.arrayBuffer()
            const workbook = XLSX.read(arrayBuffer, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]

            // 2. Helper to write cell
            const writeCell = (r: number, c: number, val: string | number) => {
                const cellRef = XLSX.utils.encode_cell({ r, c })
                if (!worksheet[cellRef]) worksheet[cellRef] = { t: 's', v: '' }
                worksheet[cellRef].v = val
            }

            // 3. Loop through ALL students and write their data
            students.forEach(student => {
                const rowIndex = EXCEL_ROWS[student.id]
                if (!rowIndex) return // Skip if no row mapping

                const cols = {
                    senin: { start: 2 },
                    selasa: { start: 7 },
                    rabu: { start: 12 },
                    kamis: { start: 17 },
                    jumat: { start: 22 },
                }

                    ; (['senin', 'selasa', 'rabu', 'kamis', 'jumat'] as const).forEach(day => {
                        const startCol = cols[day].start
                        const data = student.weeklyData[day]

                        writeCell(rowIndex, startCol + 0, data.murojaah)
                        writeCell(rowIndex, startCol + 1, data.surah)
                        writeCell(rowIndex, startCol + 2, data.ayat)
                        writeCell(rowIndex, startCol + 3, data.nilai)
                        writeCell(rowIndex, startCol + 4, data.av)
                    })
            })

            // 4. Download single file
            XLSX.writeFile(workbook, `Capaian_Pekanan_LENGKAP.xlsx`)
            alert('Berhasil mengunduh data seluruh siswa!')

        } catch (error) {
            console.error(error)
            alert('Gagal memproses file Excel template.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-auto">
            <header className="bg-indigo-700 text-white shadow-lg sticky top-0 left-0 min-w-max z-10">
                <div className="px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Rekapitulasi Pekanan Tahfidz</h1>
                        <p className="text-indigo-200 text-sm">Data tersimpan otomatis di browser</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleExportAll}
                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-bold shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
                        >
                            📥 Export Seluruh Data (Excel)
                        </button>
                        <Link href="/guru" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded">
                            ← Kembali ke Input
                        </Link>
                        <Link href="/" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded">
                            Menu Utama
                        </Link>
                    </div>
                </div>
            </header>

            <main className="p-6 min-w-max">
                <div className="bg-white rounded-lg shadow border border-gray-200">
                    <table className="w-full text-sm text-center border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-16 z-10 shadow-sm">
                            {/* Row 1: Days */}
                            <tr>
                                <th rowSpan={2} className="border px-4 py-2 w-10">NO</th>
                                <th rowSpan={2} className="border px-4 py-2 w-16">AKSI</th>
                                <th rowSpan={2} className="border px-4 py-2 w-64 text-left">NAMA SISWA</th>
                                {DAYS.map(day => (
                                    <th key={day} colSpan={3} className="border px-2 py-2 font-bold bg-indigo-50 text-indigo-900 border-indigo-200">
                                        {day}
                                    </th>
                                ))}
                                <th rowSpan={2} className="border px-4 py-2 w-24 bg-yellow-50">RATA-RATA</th>
                            </tr>
                            {/* Row 2: Sub-columns */}
                            <tr className="bg-gray-50 text-xs">
                                {DAYS.map((day) => (
                                    <React.Fragment key={day}>
                                        <th className="border px-1 py-1 w-24 font-normal">Surah</th>
                                        <th className="border px-1 py-1 w-16 font-normal">Ayat</th>
                                        <th className="border px-1 py-1 w-12 font-semibold text-gray-600">Nilai</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student, idx) => {
                                // Calculate actual average from Context Data
                                let totalScore = 0
                                let countScore = 0
                                const dayKeys = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'] as const

                                dayKeys.forEach(day => {
                                    const val = parseInt(student.weeklyData[day].nilai)
                                    if (!isNaN(val)) {
                                        totalScore += val
                                        countScore++
                                    }
                                })

                                const avg = countScore > 0 ? Math.round(totalScore / countScore) : '-'

                                return (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors bg-white">
                                        <td className="border px-2 py-2">{idx + 1}</td>
                                        <td className="border px-2 py-2">
                                            <Link
                                                href={`/guru?studentId=${student.id}`}
                                                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs p-1.5 rounded border border-indigo-300 inline-flex items-center"
                                                title="Input/Edit Data"
                                            >
                                                ✏️
                                            </Link>
                                        </td>
                                        <td className="border px-4 py-2 text-left font-medium text-gray-800">{student.name}</td>
                                        {dayKeys.map((day) => {
                                            const dayData = student.weeklyData[day]
                                            const score = parseInt(dayData.nilai)
                                            return (
                                                <React.Fragment key={`${student.id}-${day}`}>
                                                    <td className="border px-2 py-2 text-gray-600 italic text-xs truncate max-w-[100px]" title={dayData.surah}>
                                                        {dayData.surah}
                                                    </td>
                                                    <td className="border px-2 py-2 text-gray-600 text-xs">
                                                        {dayData.ayat}
                                                    </td>
                                                    <td className={`border px-2 py-2 font-bold ${score >= 90 ? 'text-green-600' : (isNaN(score) ? 'text-gray-300' : 'text-blue-600')}`}>
                                                        {dayData.nilai}
                                                    </td>
                                                </React.Fragment>
                                            )
                                        })}
                                        <td className="border px-4 py-2 font-bold text-lg bg-yellow-50 text-yellow-800">
                                            {avg}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
