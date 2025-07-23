import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Contact from "@/components/contact"
import Team from "@/components/team"
import Testimonials from "@/components/testimonials"
import Gallery from "@/components/gallery"
import TeamSlideshow from "@/components/team-slideshow"
import GoogleMap from "@/components/google-map"
import Partners from "@/components/partners"
import Head from "next/head";

export const metadata: Metadata = {
  title: "Mars Paper - turli hil qog'oz mahsulotlari | Toshkent",
  description:
    "Mars Paper - Ведущая компания по производству бумажной продукции в Ташкенте",
  keywords:
    "мелованная бумага и самoклейка ,офсетная бумага,газетная бумага,бумага крафт,топ лайнер,крафт лайнер,целлюлозный картон,метталическая гребенка пружина,ламинационная плёнка",
  openGraph: {
    title: "Mars Paper - Print Center va Qog'oz Mahsulotlari",
    description:
      "мелованная бумага и самoклейка ,офсетная бумага,газетная бумага,бумага крафт,топ лайнер,крафт лайнер,целлюлозный картон,метталическая гребенка пружина,ламинационная плёнка. Toshkent bo'ylab yetkazib berish.",
    type: "website",
    locale: "uz_UZ",
  },
  alternates: {
    canonical: "https://marspaper.uz",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Odil Paper – Qog‘oz va daftar mahsulotlari</title>
        <meta
          name="description"
          content="Mелованная бумага, самоклейка, офсетная бумага, газетная бумага, бумага крафт, топ лайнер, крафт лайнер, целлюлозный картон, металлическая гребенка пружина, ламиноционная плёнка, bo‘rlangan qog‘oz, yopishqoq qog‘oz, ofset qog‘oz, gazeta qog‘oz, kraft qog‘oz, top layner, kraft layner, tsellyuloz karton, metall spiral prujina, laminatsion plyonka – Odil Paperda eng sifatli va zamonaviy qog‘oz mahsulotlari."/>
        <meta
          name="keywords"
          content="мелованная бумага, самоклейка, офсетная бумага, газетная бумага, бумага крафт, топ лайнер, крафт лайнер, целлюлозный картон, металлическая гребенка пружина, ламинационная плёнка, bo‘rlangan qog‘oz, yopishqoq qog‘oz, ofset qog‘oz, gazeta qog‘oz, kraft qog‘oz, top layner, kraft layner, tsellyuloz karton, metall spiral prujina, laminatsion plyonka, daftar, albom, kundalik, bloknot, qog‘oz mahsulotlari"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Qog‘oz mahsulotlari",
              "description": "Mелованная бумага, самоклейка, офсетная бумага, bo‘rlangan qog‘oz va boshqa mahsulotlar.",
              "brand": "Odil Paper",
              "keywords": "мелованная бумага, bo‘rlangan qog‘oz, офсетная бумага, ofset qog‘oz, самоклейка, yopishqoq qog‘oz, газетная бумага, gazeta qog‘oz, бумага крафт, kraft qog‘oz, топ лайнер, top layner, крафт лайнер, kraft layner, целлюлозный картон, tsellyuloz karton, металлическая гребенка пружина, metall spiral prujina, ламинационная плёнка, laminatsion plyonka"
            })
          }}
        />
      </Head>
      {/* <Navigation /> */}
      <main className="min-h-screen">
        <Hero />
        <About />
        <TeamSlideshow />
        <Team />
        <Partners/>
        <Testimonials />
        <Gallery />
        <Contact />
        <GoogleMap /> {/* Yandex xaritasi footer tepasida */}
      </main>
      {/* <Footer /> */}
    </>
  )
}
