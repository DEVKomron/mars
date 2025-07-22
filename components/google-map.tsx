"use client"

import { MapPin } from "lucide-react"
import { useLocale } from "@/context/locale-context"

export default function GoogleMap() {
  const { t } = useLocale()
  const latitude = 41.233886
  const longitude = 69.183062
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12001.697776655307!2d${longitude}!3d${latitude}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE0JzAxLjUiTiA2OcKwMTAnNTMuNCJF!5e0!3m2!1sen!2s!4v0000000000000`

  return (
    <section id="google-map" className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{t("our_location_title")}</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("find_us_on_google_map")}</p>
        </div>
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-border">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("google_map_aria_label")}
          ></iframe>
        </div>
      </div>
    </section>
  )
}
