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
  title: "Mars Paper - Paper Center | Qog'oz Mahsulotlari | Toshkent",
  description:
    "Mars Paper - Ведущая компания по производству бумажной продукции в Ташкенте",
  keywords:
    "мелованная бумага и самoклейка ,офсетная бумага,газетная бумага,бумага крафт,топ лайнер,крафт лайнер,целлюлозный картон,метталическая гребенка пружина,ламинационная плёнка",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mars Paper - Qog'oz Mahsulotlari",
    description:
      "мелованная бумага и самoклейка ,офсетная бумага,газетная бумага,бумага крафт,топ лайнер,крафт лайнер,целлюлозный картон,метталическая гребенка пружина,ламинационная плёнка. Toshkent bo'ylab yetkazib berish.",
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
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
        <Toaster />
      </body>
    </html>
  )
}
