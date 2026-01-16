'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface DayData {
    murojaah: string;
    surah: string;
    ayat: string;
    nilai: string;
    av: string;
}

export interface TilawatiDayData {
    surah: string;
    ayat: string;
    nilai: string;
}

export interface WeeklyData {
    senin: DayData;
    selasa: DayData;
    rabu: DayData;
    kamis: DayData;
    jumat: DayData;
}

export interface TilawatiWeeklyData {
    senin: TilawatiDayData;
    selasa: TilawatiDayData;
    rabu: TilawatiDayData;
    kamis: TilawatiDayData;
    jumat: TilawatiDayData;
}

export interface TahfidzData {
    surahScores: { surah: string; score: number; date: string }[];
    adabScore: number;
    murojaahScore: number;
    dailyAverage: number;
    attendance: { sakit: number; izin: number; tanpaKeterangan: number };
    notes: string;
    semester: number;
    year: number;
    class: string;
}

export interface TilawatiData {
    munaqosyah: { date: string; kelancaran: number; fashohah: number; tajwid: number; notes: string }[];
    adabScore: number;
    dailyAverage: number;
    attendance: { sakit: number; izin: number; tanpaKeterangan: number };
    notes: string;
    semester: number;
    year: number;
    class: string;
}

export type StudentId = string;

interface StudentData {
    id: StudentId;
    name: string;
    weeklyData: WeeklyData;
    tahfidzData?: TahfidzData;
    tilawatiData?: TilawatiData;
    tilawatiWeeklyData?: TilawatiWeeklyData;
}

interface StudentContextType {
    students: StudentData[];
    updateStudentData: (id: StudentId, data: WeeklyData) => void;
    updateTahfidzData: (id: StudentId, data: TahfidzData) => void;
    updateTilawatiData: (id: StudentId, data: TilawatiData) => void;
    updateTilawatiWeeklyData: (id: StudentId, data: TilawatiWeeklyData) => void;
    getStudentData: (id: StudentId) => WeeklyData | undefined;
    getTahfidzData: (id: StudentId) => TahfidzData | undefined;
    getTilawatiData: (id: StudentId) => TilawatiData | undefined;
    getTilawatiWeeklyData: (id: StudentId) => TilawatiWeeklyData | undefined;
}

// --- Initial Data Helper ---
const INITIAL_DAY_DATA: DayData = { murojaah: '', surah: '', ayat: '', nilai: '', av: '' }
const INITIAL_WEEKLY_DATA: WeeklyData = {
    senin: { ...INITIAL_DAY_DATA },
    selasa: { ...INITIAL_DAY_DATA },
    rabu: { ...INITIAL_DAY_DATA },
    kamis: { ...INITIAL_DAY_DATA },
    jumat: { ...INITIAL_DAY_DATA },
}

const INITIAL_TILAWATI_DAY_DATA: TilawatiDayData = { surah: '', ayat: '', nilai: '' }
const INITIAL_TILAWATI_WEEKLY_DATA: TilawatiWeeklyData = {
    senin: { ...INITIAL_TILAWATI_DAY_DATA },
    selasa: { ...INITIAL_TILAWATI_DAY_DATA },
    rabu: { ...INITIAL_TILAWATI_DAY_DATA },
    kamis: { ...INITIAL_TILAWATI_DAY_DATA },
    jumat: { ...INITIAL_TILAWATI_DAY_DATA },
}

// Pre-populate with student names but empty data
const PREDEFINED_STUDENTS = [
    { id: '1', name: 'ACHMAD DANISH AZFAR KASYAFANI' },
    { id: '2', name: 'AFNAN YUSUF FIRDAUS' },
    { id: '3', name: 'HAMIZAN AZZAM AL FAQIH' },
    { id: '4', name: 'MOCHAMAD ZAYAN ALFATIH' },
    { id: '5', name: "MU'ADZ 'ATHIF" },
    { id: '6', name: 'SAIFUDDIN MUZAFFAR' },
    { id: '7', name: 'MUHAMMAD YARDAN DAYANA EL YUSUF' },
    { id: '8', name: 'MUHAMMAD ZAID AL KHAIR IKHLAS' },
    { id: '9', name: "NU'MAN ABDIL HAYYI" },
    { id: '10', name: 'QAISER MUHAMMAD NAUFAL' },
].map(s => ({
    ...s,
    weeklyData: JSON.parse(JSON.stringify(INITIAL_WEEKLY_DATA)), // Deep copy
    tahfidzData: {
        surahScores: [],
        adabScore: 0,
        murojaahScore: 0,
        dailyAverage: 0,
        attendance: { sakit: 0, izin: 0, tanpaKeterangan: 0 },
        notes: '',
        semester: 1,
        year: 2024,
        class: '1A'
    },
    tilawatiData: {
        munaqosyah: [],
        adabScore: 0,
        dailyAverage: 0,
        attendance: { sakit: 0, izin: 0, tanpaKeterangan: 0 },
        notes: '',
        semester: 1,
        year: 2024,
        class: '1A'
    },
    tilawatiWeeklyData: JSON.parse(JSON.stringify(INITIAL_TILAWATI_WEEKLY_DATA)) // Deep copy
}))

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: ReactNode }) {
    const [students, setStudents] = useState<StudentData[]>(() => {
        // Try to load from localStorage on client side initialization
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('student_data')
            if (saved) {
                try {
                    return JSON.parse(saved)
                } catch (e) {
                    console.error('Failed to parse student data', e)
                }
            }
        }
        return PREDEFINED_STUDENTS
    })

    // Save to localStorage whenever students change
    React.useEffect(() => {
        localStorage.setItem('student_data', JSON.stringify(students))
    }, [students])

    const updateStudentData = (id: StudentId, data: WeeklyData) => {
        setStudents(prev => prev.map(s =>
            s.id === id ? { ...s, weeklyData: data } : s
        ))
    }

    const updateTahfidzData = (id: StudentId, data: TahfidzData) => {
        setStudents(prev => prev.map(s =>
            s.id === id ? { ...s, tahfidzData: data } : s
        ))
    }

    const updateTilawatiData = (id: StudentId, data: TilawatiData) => {
        setStudents(prev => prev.map(s =>
            s.id === id ? { ...s, tilawatiData: data } : s
        ))
    }

    const updateTilawatiWeeklyData = (id: StudentId, data: TilawatiWeeklyData) => {
        setStudents(prev => prev.map(s =>
            s.id === id ? { ...s, tilawatiWeeklyData: data } : s
        ))
    }

    const getStudentData = (id: StudentId) => {
        return students.find(s => s.id === id)?.weeklyData
    }

    const getTahfidzData = (id: StudentId) => {
        return students.find(s => s.id === id)?.tahfidzData
    }

    const getTilawatiData = (id: StudentId) => {
        return students.find(s => s.id === id)?.tilawatiData
    }

    const getTilawatiWeeklyData = (id: StudentId) => {
        return students.find(s => s.id === id)?.tilawatiWeeklyData
    }

    return (
        <StudentContext.Provider value={{
            students,
            updateStudentData,
            updateTahfidzData,
            updateTilawatiData,
            updateTilawatiWeeklyData,
            getStudentData,
            getTahfidzData,
            getTilawatiData,
            getTilawatiWeeklyData
        }}>
            {children}
        </StudentContext.Provider>
    )
}

export function useStudent() {
    const context = useContext(StudentContext)
    if (context === undefined) {
        throw new Error('useStudent must be used within a StudentProvider')
    }
    return context
}
