"use client";

import uz from "@/app/locales/uz.json";
import ru from "@/app/locales/ru.json";
import en from "@/app/locales/en.json";
import { useLocale } from "@/context/locale-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Head from "next/head";

const LOCALES = { uz, ru, en };

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { locale } = useLocale();
  const t = LOCALES[locale] || uz;

  // Mahsulotni slug orqali topamiz
  const product = t.products_data?.find((p: any) => p.slug === params.slug);

  if (!product) return <div>Mahsulot topilmadi</div>;

  return (
    <>
      <Head>
        <title>Odil Paper – Qog‘oz va daftar mahsulotlari</title>
        <meta
          name="description"
          content="Mелованная бумага, самоклейка, офсетная бумага, газетная бумага, бумага крафт, топ лайнер, крафт лайнер, целлюлозный картон, металлическая гребенка пружина, ламиноционная плёнка, bo‘rlangan qog‘oz, yopishqoq qog‘oz, ofset qog‘oz, gazeta qog‘oz, kraft qog‘oz, top layner, kraft layner, tsellyuloz karton, metall spiral prujina, laminatsion plyonka – Odil Paperda eng sifatli va zamonaviy qog‘oz mahsulotlari."
        />
        <meta
          name="keywords"
          content="мелованная бумага, самоклейка, офсетная бумага, газетная бумага, бумага крафт, топ лайнер, крафт лайнер, целлюлозный картон, металлическая гребенка пружина, ламинационная плёнка, bo‘rlangan qog‘oz, yopishqoq qog‘oz, ofset qog‘oz, gazeta qog‘oz, kraft qog‘oz, top layner, kraft layner, tsellyuloz karton, metall spiral prujina, laminatsion plyonka, daftar, albom, kundalik, bloknot, qog‘oz mahsulotlari"
        />
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
      <div className="max-w-2xl mx-auto py-10 px-4 mt-24">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}
        <p className="text-lg mb-2">{product.description}</p>
        <ul className="mb-4">
          {product.material && (
            <li><b>Nimadan tayyorlangan:</b> {product.material}</li>
          )}
          {product.grammage && (
            <li><b>Grammi:</b> {product.grammage}</li>
          )}
          {product.pages && (
            <li><b>Varaqlari:</b> {product.pages}</li>
          )}
        </ul>
        <div className="flex gap-4 pt-6">
          <Link href="/#contact">
            <Button variant="outline" className="bg-black text-white px-8 py-3 hover:bg-gray-800">
              {t.buy_now || "Buyurtma berish"}
            </Button>
          </Link>
          <Link href="/odil-paper">
            <Button variant="outline" className="border-black text-black px-8 py-3 hover:bg-black hover:text-white">
              {t.back_to_home || "Ortga qaytish"}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
} 