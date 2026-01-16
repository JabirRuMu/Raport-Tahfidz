import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Raport Pendidikan Islam",
  description: "Sistem Raport Tahfidz dan Tilawati",
}

import { StudentProvider } from '@/context/StudentContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50">
        <StudentProvider>
          {children}
        </StudentProvider>
      </body>
    </html>
  )
}
