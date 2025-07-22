"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Printer, Scissors, Truck } from "lucide-react"
import { useLocale } from "@/context/locale-context"

// Xizmatlar massiv ko‘rinishida
const SERVICES = [
  {
    icon: CheckCircle,
    iconLabel: "Qog'oz mahsulotlari",
    titleKey: "service_paper_products_title",
    descKey: "service_paper_products_description",
  },
  {
    icon: Printer,
    iconLabel: "Chop etish xizmati",
    titleKey: "service_print_title",
    descKey: "service_print_description",
  },
  {
    icon: Scissors,
    iconLabel: "Laminatsiya xizmati",
    titleKey: "service_lamination_title",
    descKey: "service_lamination_description",
  },
  {
    icon: Truck,
    iconLabel: "Yetkazib berish",
    titleKey: "service_delivery_title",
    descKey: "service_delivery_description",
  },
]

// Afzalliklar massiv ko‘rinishida
const ADVANTAGES = [
  {
    icon: <Printer className="h-8 w-8 text-primary" aria-label="Zamonaviy uskunalar" />,
    bg: "bg-primary/10",
    titleKey: "advantage_equipment_title",
    descKey: "advantage_equipment_description",
  },
  {
    icon: <span role="img" aria-label="Keng assortiment">📚</span>,
    bg: "bg-secondary/10",
    titleKey: "advantage_assortment_title",
    descKey: "advantage_assortment_description",
  },
  {
    icon: <span role="img" aria-label="Tez xizmat">⚡</span>,
    bg: "bg-accent/10",
    titleKey: "advantage_fast_service_title",
    descKey: "advantage_fast_service_description",
  },
]

export default function About() {
  const { t } = useLocale()

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("about_us_title")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("about_us_description_short")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">{t("our_activity_title")}</h3>
            <p className="text-gray-600 leading-relaxed">{t("our_activity_description_1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("our_activity_description_2")}</p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-foreground mb-6">{t("our_services_title")}</h4>
            <div className="space-y-4">
              {SERVICES.map(({ icon: Icon, iconLabel, titleKey, descKey }, idx) => (
                <div className="flex items-start gap-3" key={titleKey}>
                  <Icon className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-label={iconLabel} />
                  <div>
                    <div className="font-semibold">{t(titleKey)}</div>
                    <div className="text-sm text-muted-foreground">{t(descKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{t("our_advantages_title")}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {ADVANTAGES.map(({ icon, bg, titleKey, descKey }, idx) => (
              <Card key={titleKey}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {icon}
                  </div>
                  <h4 className="font-semibold mb-2">{t(titleKey)}</h4>
                  <p className="text-sm text-muted-foreground">{t(descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
