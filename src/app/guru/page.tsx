'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useStudent, WeeklyData, DayData, TahfidzData, TilawatiData, TilawatiWeeklyData, TilawatiDayData } from '@/context/StudentContext'

// --- Helper: Get Week Range ---
function getWeekRange(dateString: string) {
    if (!dateString) return { start: '', end: '', display: '' }

    const date = new Date(dateString)
    const day = date.getDay()

    // Calculate Monday (if day is 0/Sunday, go back 6 days, else go back day-1)
    const diffToMon = date.getDate() - day + (day === 0 ? -6 : 1)

    const monday = new Date(date)
    monday.setDate(diffToMon)

    const friday = new Date(monday)
    friday.setDate(monday.getDate() + 4)

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }
    const startStr = monday.toLocaleDateString('id-ID', options)
    const endStr = friday.toLocaleDateString('id-ID', { ...options, year: 'numeric' })

    return {
        start: monday.toISOString().split('T')[0],
        end: friday.toISOString().split('T')[0],
        display: `${startStr} - ${endStr}`
    }
}

export default function GuruPage() {
    const searchParams = useSearchParams()
    const urlStudentId = searchParams.get('studentId')

    const {
        students,
        getStudentData,
        updateStudentData,
        updateTahfidzData,
        updateTilawatiData,
        updateTilawatiWeeklyData,
        getTahfidzData,
        getTilawatiData,
        getTilawatiWeeklyData
    } = useStudent()
    const [weeklyStudentId, setWeeklyStudentId] = useState('')

    // Initialize with empty structure strictly
    // --- State: Week Selection ---
    const [selectedDate, setSelectedDate] = useState('')
    const [weekDisplay, setWeekDisplay] = useState('')

    // --- State: Input Type ---
    const [inputType, setInputType] = useState<'weekly' | 'tahfidz' | 'tilawati' | 'tilawati-weekly'>('weekly')

    const [weeklyData, setWeeklyData] = useState<WeeklyData>({
        senin: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
        selasa: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
        rabu: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
        kamis: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
        jumat: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
    })

    // Temporary state for Tahfidz Input (Single Entry focus)
    const [tahfidzForm, setTahfidzForm] = useState({
        surah: '',
        score: '',
        adab: '',
        murojaah: '',
        notes: '',
        sakit: '',
        izin: '',
        alpha: ''
    })

    // Temporary state for Tilawati Input
    const [tilawatiForm, setTilawatiForm] = useState({
        kelancaran: '',
        fashohah: '',
        tajwid: '',
        notes: '',
        adab: '',
        sakit: '',
        izin: '',
        alpha: ''
    })

    // Temporary state for Tilawati Weekly Input
    const [tilawatiWeeklyData, setTilawatiWeeklyData] = useState<TilawatiWeeklyData>({
        senin: { surah: '', ayat: '', nilai: '' },
        selasa: { surah: '', ayat: '', nilai: '' },
        rabu: { surah: '', ayat: '', nilai: '' },
        kamis: { surah: '', ayat: '', nilai: '' },
        jumat: { surah: '', ayat: '', nilai: '' },
    })

    const [isUpdateMode, setIsUpdateMode] = useState(false)

    // --- Handler: Date Change ---
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value
        setSelectedDate(date)
        const { display } = getWeekRange(date)
        setWeekDisplay(display)
    }

    // Load Student when selected
    useEffect(() => {
        if (urlStudentId) {
            setWeeklyStudentId(urlStudentId)
        }
    }, [urlStudentId])

    useEffect(() => {
        if (weeklyStudentId) {
            const currentData = getStudentData(weeklyStudentId)
            if (currentData) {
                // Check if has any data to determine if it is "Update" mode or fresh "Input"
                const hasData = Object.values(currentData).some(day =>
                    day.surah || day.nilai || day.murojaah
                )

                setWeeklyData(JSON.parse(JSON.stringify(currentData))) // Deep copy to avoid direct mutation
                setIsUpdateMode(hasData)
            }

            const currentTilawatiWeekly = getTilawatiWeeklyData(weeklyStudentId)
            if (currentTilawatiWeekly) {
                const hasTilawatiData = Object.values(currentTilawatiWeekly).some(day =>
                    day.surah || day.ayat || day.nilai
                )
                setTilawatiWeeklyData(JSON.parse(JSON.stringify(currentTilawatiWeekly)))
                setIsUpdateMode(hasTilawatiData)
            }
        } else {
            // Reset if no student selected
            setWeeklyData({
                senin: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
                selasa: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
                rabu: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
                kamis: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
                jumat: { murojaah: '', surah: '', ayat: '', nilai: '', av: '' },
            })
            setTilawatiWeeklyData({
                senin: { surah: '', ayat: '', nilai: '' },
                selasa: { surah: '', ayat: '', nilai: '' },
                rabu: { surah: '', ayat: '', nilai: '' },
                kamis: { surah: '', ayat: '', nilai: '' },
                jumat: { surah: '', ayat: '', nilai: '' },
            })
            setIsUpdateMode(false)
        }
    }, [weeklyStudentId, getStudentData, getTilawatiWeeklyData])


    // Set default date for tahfidz and tilawati
    useEffect(() => {
        if (inputType !== 'weekly' && !selectedDate) {
            const today = new Date().toISOString().split('T')[0]
            setSelectedDate(today)
            const { display } = getWeekRange(today)
            setWeekDisplay(display)
        }
    }, [inputType, selectedDate])

    const handleWeeklyChange = (day: keyof WeeklyData, field: keyof DayData, value: string) => {
        setWeeklyData(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value
            }
        }))
    }

    const handleTilawatiWeeklyChange = (day: keyof TilawatiWeeklyData, field: keyof TilawatiDayData, value: string) => {
        setTilawatiWeeklyData(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value
            }
        }))
    }



    // ... (helper functions omitted for brevity in response, but assume I am updating logic here)

    const handleSave = () => {
        if (!weeklyStudentId) return

        if (inputType === 'weekly') {
            updateStudentData(weeklyStudentId, weeklyData)
        } else if (inputType === 'tahfidz') {
            const currentTahfidz = getTahfidzData(weeklyStudentId)
            if (!currentTahfidz) return // Should not happen given initialization

            // Create new entry
            const newScoreEntry = {
                surah: tahfidzForm.surah,
                score: parseInt(tahfidzForm.score) || 0,
                date: selectedDate
            }

            const newData: TahfidzData = {
                ...currentTahfidz,
                surahScores: [...currentTahfidz.surahScores, newScoreEntry],
                adabScore: parseInt(tahfidzForm.adab) || currentTahfidz.adabScore,
                murojaahScore: parseInt(tahfidzForm.murojaah) || currentTahfidz.murojaahScore,
                notes: tahfidzForm.notes || currentTahfidz.notes,
                attendance: {
                    sakit: (currentTahfidz.attendance.sakit || 0) + (parseInt(tahfidzForm.sakit) || 0),
                    izin: (currentTahfidz.attendance.izin || 0) + (parseInt(tahfidzForm.izin) || 0),
                    tanpaKeterangan: (currentTahfidz.attendance.tanpaKeterangan || 0) + (parseInt(tahfidzForm.alpha) || 0),
                }
            }
            updateTahfidzData(weeklyStudentId, newData)
        } else if (inputType === 'tilawati') {
            const currentTilawati = getTilawatiData(weeklyStudentId)
            if (!currentTilawati) return

            const newEntry = {
                date: selectedDate,
                kelancaran: parseInt(tilawatiForm.kelancaran) || 0,
                fashohah: parseInt(tilawatiForm.fashohah) || 0,
                tajwid: parseInt(tilawatiForm.tajwid) || 0,
                notes: tilawatiForm.notes
            }

            const newData: TilawatiData = {
                ...currentTilawati,
                munaqosyah: [...currentTilawati.munaqosyah, newEntry],
                adabScore: parseInt(tilawatiForm.adab) || currentTilawati.adabScore,
                attendance: {
                    sakit: (currentTilawati.attendance.sakit || 0) + (parseInt(tilawatiForm.sakit) || 0),
                    izin: (currentTilawati.attendance.izin || 0) + (parseInt(tilawatiForm.izin) || 0),
                    tanpaKeterangan: (currentTilawati.attendance.tanpaKeterangan || 0) + (parseInt(tilawatiForm.alpha) || 0),
                }
            }
            updateTilawatiData(weeklyStudentId, newData)
        } else if (inputType === 'tilawati-weekly') {
            updateTilawatiWeeklyData(weeklyStudentId, tilawatiWeeklyData)
        }

        setIsUpdateMode(true)
        alert('Data berhasil disimpan!')
    }

    const handleExport = () => {
        if (!weeklyStudentId) {
            alert('Silakan pilih siswa terlebih dahulu!')
            return
        }

        const student = students.find(s => s.id === weeklyStudentId)

        if (inputType === 'tilawati-weekly') {
            // For tilawati-weekly, download the template Excel file
            const link = document.createElement('a')
            link.href = '/template-tilawati.xlsx'
            link.download = 'template-tilawati.xlsx'
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            return
        }

        // Headers matching the table columns
        const headers = ['NO', 'HARI', 'SURAH', 'AYAT', 'NILAI']

        const rows = (['senin', 'selasa', 'rabu', 'kamis', 'jumat'] as const).map((day, index) => [
            (index + 1).toString(),
            day.toUpperCase(),
            weeklyData[day].surah,
            weeklyData[day].ayat,
            weeklyData[day].nilai
        ])

        // Construct CSV String
        let csvContent = `CAPAIAN PEKANAN TAHFIDZ & TILAWATI\n`
        csvContent += `Nama Siswa:,${student?.name || ''}\n`
        csvContent += `Pekan:,${weekDisplay || getWeekRange(selectedDate).display || 'Periode Belum Dipilih'}\n\n`
        csvContent += headers.join(',') + '\n'

        rows.forEach(row => {
            // Escape commas and quotes
            const processedRow = row.map(cell => {
                if (cell.includes(',') || cell.includes('"')) {
                    return `"${cell.replace(/"/g, '""')}"`
                }
                return cell
            })
            csvContent += processedRow.join(',') + '\n'
        })

        // Create Download Link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', `Capaian_Pekanan_${student?.name.replace(/\s+/g, '_')}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Portal Guru</h1>
                            <p className="text-purple-100">Input Data Capaian Pekanan</p>
                        </div>
                        <Link href="/" className="bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg">
                            ← Kembali
                        </Link>
                    </div>
                </div>
            </header>

            {/* Input Type Selection */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex bg-gray-100 p-1 rounded-lg max-w-lg">
                        <button
                            onClick={() => setInputType('weekly')}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${inputType === 'weekly' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            📋 Hafalan Pekanan
                        </button>
                        <button
                            onClick={() => setInputType('tilawati-weekly')}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${inputType === 'tilawati-weekly' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            🎯 Tilawati Pekanan
                        </button>
                        <button
                            onClick={() => setInputType('tahfidz')}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${inputType === 'tahfidz' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            📖 Tahfidz
                        </button>
                        <button
                            onClick={() => setInputType('tilawati')}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${inputType === 'tilawati' ? 'bg-white text-cyan-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            🎤 Tilawati
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">

                <div className="flex justify-end mb-6">
                    <Link
                        href="/rekap"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md font-bold flex items-center gap-2"
                    >
                        📊 Lihat Rekapitulasi Pekanan
                    </Link>
                </div>

                <div className="card animate-fade-in space-y-8">

                    {/* Step 1: Date Selection - Only for Weekly and Tilawati Weekly */}
                    {(inputType === 'weekly' || inputType === 'tilawati-weekly') && (
                        <div className={`p-4 rounded-xl border-2 transition-colors ${selectedDate ? 'border-green-500 bg-green-50' : 'border-purple-200 bg-purple-50'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${selectedDate ? 'bg-green-500' : 'bg-purple-600'}`}>1</div>
                                <h2 className="text-lg font-bold text-gray-800">Pilih Tanggal Laporan</h2>
                            </div>

                            <div className="md:flex items-center gap-6">
                                <input
                                    type="date"
                                    className="input-field max-w-xs"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                                {weekDisplay && (
                                    <div className="text-sm text-purple-700 font-medium bg-white/50 px-3 py-2 rounded-lg border border-purple-100">
                                        <span className="mr-2">🗓️</span>
                                        Periode Pekan: <strong>{weekDisplay}</strong>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Student Selection */}
                    <div className={`p-4 rounded-xl border-2 transition-colors ${!selectedDate ? 'opacity-50 grayscale' : weeklyStudentId ? 'border-green-500 bg-green-50' : 'border-purple-200 bg-white'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${weeklyStudentId ? 'bg-green-500' : 'bg-gray-400'}`}>{(inputType === 'weekly' || inputType === 'tilawati-weekly') ? '2' : '1'}</div>
                            <h2 className="text-lg font-bold text-gray-800">Pilih Siswa</h2>
                        </div>

                        <select
                            className="input-field max-w-md w-full"
                            value={weeklyStudentId}
                            onChange={(e) => setWeeklyStudentId(e.target.value)}
                            disabled={!selectedDate}
                        >
                            <option value="">{selectedDate ? '-- Pilih Siswa --' : '-- Pilih Tanggal Terlebih Dahulu --'}</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Step 3: Data Input */}
                    {weeklyStudentId && selectedDate && (
                        <div className="border-t pt-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div className="text-sm text-gray-600">
                                    <strong>Jenis Input:</strong> {inputType === 'weekly' ? 'Hafalan Pekanan' : inputType === 'tilawati-weekly' ? 'Tilawati Pekanan' : inputType === 'tahfidz' ? 'Tahfidz' : 'Tilawati'}
                                </div>

                                <div className="flex gap-2 w-full md:w-auto">
                                    <button
                                        onClick={handleExport}
                                        className="btn-secondary text-sm flex-1 md:flex-none"
                                    >
                                        📥 Export Excel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className={`btn-primary flex items-center justify-center gap-2 flex-1 md:flex-none ${isUpdateMode ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    >
                                        {isUpdateMode ? '💾 Update Data' : '💾 Simpan Data'}
                                    </button>
                                </div>
                            </div>

                            {/* --- INPUT FORMS --- */}
                            <div className="mt-6">
                                {(inputType === 'weekly' || inputType === 'tilawati-weekly') && (
                                    <div className="overflow-x-auto border rounded-xl shadow-sm">
                                        <table className="w-full">
                                            <thead className="bg-purple-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left font-bold text-gray-700 w-24">Hari</th>
                                                    {inputType === 'weekly' ? (
                                                        <>
                                                            <th className="px-4 py-3 text-left font-bold text-gray-700">Surah</th>
                                                            <th className="px-4 py-3 text-left font-bold text-gray-700 w-32">Ayat</th>
                                                            <th className="px-4 py-3 text-left font-bold text-gray-700 w-24">Nilai</th>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <th className="px-4 py-3 text-left font-bold text-gray-700">Surah</th>
                                                            <th className="px-4 py-3 text-left font-bold text-gray-700 w-32">Ayat</th>
                                                            <th className="px-4 py-3 text-left font-bold text-gray-700 w-24">Nilai</th>
                                                        </>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 bg-white">
                                                {(['senin', 'selasa', 'rabu', 'kamis', 'jumat'] as const).map((day) => (
                                                    <tr key={day} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-4 py-3 font-bold text-gray-600 capitalize">{day}</td>
                                                        {inputType === 'weekly' ? (
                                                            <>
                                                                <td className="px-2 py-3"><input type="text" className="input-field w-full text-sm" value={weeklyData[day].surah} onChange={(e) => handleWeeklyChange(day, 'surah', e.target.value)} /></td>
                                                                <td className="px-2 py-3"><input type="text" className="input-field w-full text-sm" value={weeklyData[day].ayat} onChange={(e) => handleWeeklyChange(day, 'ayat', e.target.value)} /></td>
                                                                <td className="px-2 py-3"><input type="text" className="input-field w-full text-sm" value={weeklyData[day].nilai} onChange={(e) => handleWeeklyChange(day, 'nilai', e.target.value)} /></td>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td className="px-2 py-3"><input type="text" className="input-field w-full text-sm" value={tilawatiWeeklyData[day].surah} onChange={(e) => handleTilawatiWeeklyChange(day, 'surah', e.target.value)} /></td>
                                                                <td className="px-2 py-3"><input type="text" className="input-field w-full text-sm" value={tilawatiWeeklyData[day].ayat} onChange={(e) => handleTilawatiWeeklyChange(day, 'ayat', e.target.value)} /></td>
                                                                <td className="px-2 py-3"><input type="text" className="input-field w-full text-sm" value={tilawatiWeeklyData[day].nilai} onChange={(e) => handleTilawatiWeeklyChange(day, 'nilai', e.target.value)} /></td>
                                                            </>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {inputType === 'tahfidz' && (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-700 border-b pb-2">Hafalan Baru (Ziyadah)</h3>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nama Surah</label>
                                                <input type="text" className="input-field w-full" placeholder="Contoh: Al-Mul" value={tahfidzForm.surah} onChange={e => setTahfidzForm({ ...tahfidzForm, surah: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nilai Hafalan (0-100)</label>
                                                <input type="number" className="input-field w-full" placeholder="0" value={tahfidzForm.score} onChange={e => setTahfidzForm({ ...tahfidzForm, score: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-700 border-b pb-2">Penilaian Umum</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nilai Adab</label>
                                                    <input type="number" className="input-field w-full" value={tahfidzForm.adab} onChange={e => setTahfidzForm({ ...tahfidzForm, adab: e.target.value })} />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nilai Murojaah</label>
                                                    <input type="number" className="input-field w-full" value={tahfidzForm.murojaah} onChange={e => setTahfidzForm({ ...tahfidzForm, murojaah: e.target.value })} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Absensi (Hari)</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <input type="number" placeholder="Sakit" className="input-field text-center" value={tahfidzForm.sakit} onChange={e => setTahfidzForm({ ...tahfidzForm, sakit: e.target.value })} />
                                                    <input type="number" placeholder="Izin" className="input-field text-center" value={tahfidzForm.izin} onChange={e => setTahfidzForm({ ...tahfidzForm, izin: e.target.value })} />
                                                    <input type="number" placeholder="Alpha" className="input-field text-center" value={tahfidzForm.alpha} onChange={e => setTahfidzForm({ ...tahfidzForm, alpha: e.target.value })} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Catatan Guru</label>
                                                <textarea className="input-field w-full h-24" value={tahfidzForm.notes} onChange={e => setTahfidzForm({ ...tahfidzForm, notes: e.target.value })}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {inputType === 'tilawati' && (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-700 border-b pb-2">Nilai Munaqosyah / Harian</h3>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Kelancaran</label>
                                                <input type="number" className="input-field w-full" value={tilawatiForm.kelancaran} onChange={e => setTilawatiForm({ ...tilawatiForm, kelancaran: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Fashohah</label>
                                                <input type="number" className="input-field w-full" value={tilawatiForm.fashohah} onChange={e => setTilawatiForm({ ...tilawatiForm, fashohah: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Tajwid</label>
                                                <input type="number" className="input-field w-full" value={tilawatiForm.tajwid} onChange={e => setTilawatiForm({ ...tilawatiForm, tajwid: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-700 border-b pb-2">Lainnya</h3>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nilai Adab</label>
                                                <input type="number" className="input-field w-full" value={tilawatiForm.adab} onChange={e => setTilawatiForm({ ...tilawatiForm, adab: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Catatan</label>
                                                <textarea className="input-field w-full h-24" value={tilawatiForm.notes} onChange={e => setTilawatiForm({ ...tilawatiForm, notes: e.target.value })}></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Absensi (Tambahan)</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <input type="number" placeholder="Sakit" className="input-field text-center" value={tilawatiForm.sakit} onChange={e => setTilawatiForm({ ...tilawatiForm, sakit: e.target.value })} />
                                                    <input type="number" placeholder="Izin" className="input-field text-center" value={tilawatiForm.izin} onChange={e => setTilawatiForm({ ...tilawatiForm, izin: e.target.value })} />
                                                    <input type="number" placeholder="Alpha" className="input-field text-center" value={tilawatiForm.alpha} onChange={e => setTilawatiForm({ ...tilawatiForm, alpha: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {!weeklyStudentId && !selectedDate && (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
                            Silakan ikuti instruksi langkah demi langkah di atas.
                        </div>
                    )}
                </div>
            </main >
        </div >
    )
}
