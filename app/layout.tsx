import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LocaleProvider } from "@/context/locale-context"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mars Paper - Print Center | Daftar, A4 Qog'oz | Toshkent",
  description:
    "Mars Paper - Toshkentda print xizmatlari, daftar, A4 qog'oz, laminatsiya. Qog'oz mahsulotlari va professional print center.",
  keywords:
    "print center, daftar, A4 qog'oz, laminatsiya, albom, rangli qog'oz, Mars Paper, Toshkent, печать, notebook",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mars Paper - Print Center va Qog'oz Mahsulotlari",
    description:
      "Professional print xizmatlari, daftar, A4 qog'oz, laminatsiya. Toshkent bo'ylab yetkazib berish.",
    url: "https://marspaper.uz",
    siteName: "Mars Paper",
    locale: "uz_UZ",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <link rel="canonical" href="https://marspaper.uz" />
      </head>
      <body className={inter.className}>
        <LocaleProvider>
          {/* ✅ Navbar doimiy */}
          <Navigation />

          <main>{children}</main>

          {/* ✅ Footer doimiy */}
          <Footer />
        </LocaleProvider>
        <Toaster />
      </body>
    </html>
  )
}
