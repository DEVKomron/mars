"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { useLocale } from "@/context/locale-context";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LANGUAGES = [
  { code: "uz", label: "O'zbek" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

const PHONE_NUMBER = "+998 90 034 06 04";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();

  // Agar /odil-paper bo'lsa, faqat home va products linklarini ko'rsatamiz
  const menuItems =
    pathname === "/odil-paper"
      ? [
          { name: t("home"), href: "#home" },
          { name: t("products"), href: "#products" },
        ]
      : [
          { name: t("home"), href: "/#home" },
          { name: t("about"), href: "/#about" },
          { name: t("team"), href: "/#team" },
          { name: t("partners"), href: "/#partners" },
          { name: t("gallery"), href: "/#gallery" },
          { name: t("contact"), href: "/#contact" },
        ];

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as any); // tip moslash uchun
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white text-black shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            {/* Mars Paper Logo */}
            <Link href="/" className="hover:opacity-80 transition">
              <img src="/images/mars.svg" alt="Mars Paper" width={150} height={40} />
            </Link>

            {/* Odil Paper Logo */}
            <Link href="/odil-paper" className="hover:opacity-80 transition">
              <img src="/images/odil.svg" alt="Odil Paper" width={150} height={40} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm hover:text-secondary transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Language & Contact */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                className="text-sm flex items-center gap-1 hover:bg-primary-foreground/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Tilni tanlash"
              >
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-primary rounded-md shadow-lg py-1 z-20">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-primary-foreground/10"
                      onClick={() => handleLocaleChange(lang.code)}
                      aria-label={lang.label}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>{PHONE_NUMBER}</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menyuni ochish/yopish">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm hover:text-secondary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-primary-foreground/20">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Phone className="h-4 w-4" />
                  <span>{PHONE_NUMBER}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-primary-foreground/10"
                      onClick={() => handleLocaleChange(lang.code)}
                      aria-label={lang.label}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
