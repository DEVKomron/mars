"use client"
import { createContext, useContext, useState, type ReactNode } from "react"
import uz from "@/app/locales/uz.json"
import ru from "@/app/locales/ru.json"
import en from "@/app/locales/en.json"

type Language = "uz" | "ru" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, unknown>> = {
  uz,
  ru,
  en,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("uz") // Default to Uzbek

  const t = (key: string): string => {
    const value = translations[language][key]
    return typeof value === "string" ? value : key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
