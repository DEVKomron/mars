"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import { useLocale } from "@/context/locale-context"

// Contact information and keywords as constants for maintainability
const CONTACT_INFO = {
  phone: "+998 90 034 06 04",
  email: "marspaper1957@gmail.com",
}

const KEYWORDS = [
  "footer_keyword_paper",
  "footer_keyword_russian_paper",
  "footer_keyword_cardboard",
]

const FOOTER_KEYWORDS = [
  "footer_keyword_1",
  "footer_keyword_2",
  "footer_keyword_3",
]

export default function Footer() {
  const { t } = useLocale()

  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Mars Paper</h3>
            <p className="text-muted-foreground leading-relaxed">{t("footer_description")}</p>
            <div className="flex flex-wrap gap-2">
              {KEYWORDS.map((key) => (
                <span key={key} className="bg-muted/20 px-3 py-1 rounded text-sm">
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t("footer_products_title")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>{t("product_notebook_title")}</li>
              <li>{t("product_a4_paper_title")}</li>
              <li>{t("product_print_service_title")}</li>
              <li>{t("product_lamination_title")}</li>
              <li>{t("product_album_journal_title")}</li>
              <li>{t("product_colored_paper_title")}</li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t("footer_services_title")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>{t("service_wholesale")}</li>
              <li>{t("service_delivery")}</li>
              <li>{t("service_branding")}</li>
              <li>{t("service_consultation")}</li>
              <li>{t("service_technical_support")}</li>
              <li>{t("service_partnership")}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t("footer_contact_title")}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" aria-label="Phone" />
                <span className="text-muted-foreground">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" aria-label="Email" />
                <span className="text-muted-foreground">{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" aria-label="Address" />
                <span className="text-muted-foreground">
                  {t("address_country")}, {t("address_city_district")},
                  <br />
                  {t("address_street")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-muted/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© 2024 Mars Paper. {t("all_rights_reserved")}</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              {FOOTER_KEYWORDS.map((key, idx) => (
                <span key={key}>
                  {idx > 0 && <span aria-hidden="true">•</span>}
                  {t(key)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
