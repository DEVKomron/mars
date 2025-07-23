"use client"

import { useEffect, useState } from "react"
import { useLocale } from "@/context/locale-context"
import Link from "next/link"

// Slayd uchun rasm massivini tashqariga chiqaramiz
const IMAGES = [
  "/images/123.jpg",
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
  "/images/bg5.jpg",
]

// Keywords massivini tashqariga chiqaramiz
const KEYWORDS = [
  { href: "/product/ofset-qogoz", textKey: "keyword_ofset" },
  { href: "/product/borlangan-qogoz", textKey: "keyword_borlangan" },
  { href: "/product/laminatsiya", textKey: "keyword_lamination" },
  { href: "/product/a4-qogoz", textKey: "keyword_a4_paper" },
  { href: "/product/borlangan-karton", textKey: "keyword_bcarton" },
]

export default function Hero() {
  const { t } = useLocale()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Har 5 soniyada rasmni almashtirish
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24">
      {/* Background Slideshow */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${IMAGES[currentIndex]})`,
          backgroundSize: "cover",
          filter: "blur(3px)",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-2xl mx-auto space-y-10">
          {/* Logo */}
          <div className="space">
            <div className="flex justify-center">
              <img
                src="/images/mars.svg"
                alt="Mars Paper Logo"
                className="w-[320px] lg:w-[500px] h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.9)] brightness-125"
              />
            </div>

            {/* Subtitle */}
            <ul className="text-2xl lg:text-3xl font-bold tracking-wide max-w-fit mx-auto text-left leading-relaxed">
              {t("hero_subtitle")
                .split("\n")
                .map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-white mr-3">•</span>
                    <span className="text-white">{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-4 font-bold">
            {KEYWORDS.map((item, idx) => (
              <Link href={item.href} key={idx}>
                <button
                  type="button"
                  className="bg-white/20 backdrop-blur-sm px-7 py-3 rounded-full hover:bg-white/30 transition whitespace-nowrap text-lg text-white"
                  style={{ fontFamily: "Times New Roman" }}
                >
                  {t(item.textKey)}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
