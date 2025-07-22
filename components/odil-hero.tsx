"use client";

import { useLocale } from "@/context/locale-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const PRODUCT_BUTTONS = [
  { labelKey: "product_daftar", slug: "daftar" },
  { labelKey: "product_fan_daftar", slug: "fan-daftar" },
  { labelKey: "product_albom", slug: "albom" },
  { labelKey: "product_kundalik", slug: "kundalik" },
  { labelKey: "product_qayd_daftari", slug: "qayd-daftari" },
  { labelKey: "product_ish_jurnali", slug: "ish-jurnali" },
  { labelKey: "product_rangli_qogoz", slug: "rangli-qogoz" },
  { labelKey: "product_nota_daftari", slug: "nota-daftari" },
  { labelKey: "product_banner", slug: "banner" },
  { labelKey: "product_office_daftari", slug: "office-daftari" },
];

export default function Odil_Hero() {
  const { t } = useLocale();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{
          backgroundImage: "url('/images/odilpaper.jpg')",
        }}
      />

      {/* Orqa fon gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />

      {/* Logo */}
      <div className="absolute top-16 left-10 w-52 h-auto">
        <img
          src="/images/odil.svg"
          alt="Odil Paper Logo"
          aria-label="Odil Paper Logo"
          className="w-full h-auto drop-shadow-lg"
        />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
          {t("odil_hero_title")}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
          {t("odil_hero_description")}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {PRODUCT_BUTTONS.map((item, i) => (
            <Link key={i} href={`/odil-paper/products/${item.slug}`}>
              <Button
                size="lg"
                type="button"
                className="bg-white/10 backdrop-blur-lg border border-white/30 text-white hover:bg-white/20 transition-all duration-600 rounded-xl shadow-lg px-4"
              >
                {t(item.labelKey)}
              </Button>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
// Ruhsat!
