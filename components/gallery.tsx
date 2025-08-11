"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Factory, Truck, Users, Award, Leaf } from "lucide-react"
import { useLocale } from "@/context/locale-context"
import Image from "next/image"

// Achievements massiv ko‘rinishida
const ACHIEVEMENTS = [
  { icon: Award, iconLabel: "ISO", textKey: "achievement_iso_full" },
  { icon: Leaf, iconLabel: "Ekologik", textKey: "achievement_eco_standards" },
  { icon: Factory, iconLabel: "Zamonaviy texnologiya", textKey: "achievement_modern_tech" },
  { icon: Users, iconLabel: "Eng yaxshi ish beruvchi", textKey: "achievement_best_employer" },
]

// Statistics massiv ko‘rinishida
const STATISTICS = [
  { value: "2022", labelKey: "founded_year" },
  { value: "50+", labelKey: "employee_count" },
  { value: "1000+", labelKey: "daily_production" },
  { value: "100+", labelKey: "permanent_customers" },
]

export default function Gallery() {
  const { t } = useLocale()

  const galleryItems = [
    {
      image: "/images/flaterazka.jpg",
      title: t("gallery_production_line_title"),
      description: t("gallery_production_line_description"),
      category: t("category_production"),
      icon: <Factory className="h-5 w-5" aria-label={t("category_production")} />,
    },
    {
      image: "/images/jamoaviy.jpg",
      title: t("gallery_team_work_title"),
      description: t("gallery_team_work_description"),
      category: t("category_team"),
      icon: <Users className="h-5 w-5" aria-label={t("category_team")} />,
    },
    {
      image: "/images/yetkazish.jpg",
      title: t("gallery_delivery_service_title"),
      description: t("gallery_delivery_service_description"),
      category: t("category_logistics"),
      icon: <Truck className="h-5 w-5" aria-label={t("category_logistics")} />,
    },
    
  ]

  return (
    <section id="gallery" className="py-20 px-4 bg-accent/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-8 w-8 text-primary" aria-label={t("gallery_icon_label")} />
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{t("company_life_title")}</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("company_life_description")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
                    <span className="flex items-center gap-1">
                      {item.icon}
                      {item.category}
                    </span>
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">{t("our_achievements_title")}</h3>
              <div className="space-y-4">
                {ACHIEVEMENTS.map(({ icon: Icon, iconLabel, textKey }, idx) => (
                  <div className="flex items-center gap-3" key={textKey}>
                    <Icon className="h-6 w-6" aria-label={iconLabel} />
                    <span>{t(textKey)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">{t("statistics_title")}</h3>
              <div className="grid grid-cols-2 gap-4">
                {STATISTICS.map(({ value, labelKey }) => (
                  <div className="text-center" key={labelKey}>
                    <div className="text-3xl font-bold">{value}</div>
                    <div className="text-sm opacity-90">{t(labelKey)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
