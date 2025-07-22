"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useActionState } from "react"
import { sendContactTelegramMessage } from "@/actions/send-contact-telegram-message"
import { toast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { useLocale } from "@/context/locale-context"

// Kontakt kartalari massiv ko‘rinishida
const CONTACT_CARDS = [
  {
    icon: Phone,
    iconLabel: "Telefon raqami",
    titleKey: "phone_number_title",
    content: (
      <>
        <p className="text-2xl font-bold text-primary">+998 90 034 06 04</p>
        <p className="text-muted-foreground mt-2">phone_number_hours</p>
      </>
    ),
  },
  {
    icon: Mail,
    iconLabel: "Email manzili",
    titleKey: "email_address_title",
    content: (
      <>
        <p className="text-xl font-semibold">marspaper1957@gmail.com</p>
        <p className="text-muted-foreground mt-2">email_response_time</p>
      </>
    ),
  },
  {
    icon: MapPin,
    iconLabel: "Manzil",
    titleKey: "our_address_title",
    content: (
      <>
        <p className="font-semibold">address_country</p>
        <p>address_city_district</p>
        <p>address_street</p>
      </>
    ),
  },
  {
    icon: Clock,
    iconLabel: "Ish vaqti",
    titleKey: "working_hours_title",
    content: (
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>monday_friday:</span>
          <span className="font-semibold">9:00 - 18:00</span>
        </div>
        <div className="flex justify-between">
          <span>saturday:</span>
          <span className="font-semibold">9:00 - 15:00</span>
        </div>
        <div className="flex justify-between">
          <span>sunday:</span>
          <span className="text-destructive">day_off</span>
        </div>
      </div>
    ),
  },
]

export default function Contact() {
  const { t } = useLocale()
  const [state, formAction] = useActionState(sendContactTelegramMessage, {
    success: false,
    message: "",
    errors: {},
  })

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? t("toast_success_title") : t("toast_error_title"),
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state, t])

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("contact_us_title")}</h2>
          <p className="text-xl text-muted-foreground">{t("contact_us_description")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Chap tarafdagi ma'lumotlar */}
          <div className="space-y-8">
            {CONTACT_CARDS.map(({ icon: Icon, iconLabel, titleKey, content }, idx) => (
              <Card key={titleKey}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" aria-label={iconLabel} />
                    {t(titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Dinamik tarjima uchun content ichidagi matnlarni t() bilan o'zgartiramiz */}
                  {typeof content === "string"
                    ? t(content)
                    : React.cloneElement(content, {},
                        React.Children.map(content.props.children, child =>
                          typeof child === "string" && t(child) || child
                        )
                      )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t("send_message_title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form action={formAction}>
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("first_name")}</Label>
                  <Input id="firstName" name="firstName" placeholder={t("your_first_name")}
                    required aria-label={t("first_name")} />
                  {state.errors?.firstName && <p className="text-destructive text-xs">{state.errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone_number")}</Label>
                  <Input id="phone" name="phone" placeholder="+998 90 123 45 67" required aria-label={t("phone_number")} />
                  {state.errors?.phone && <p className="text-destructive text-xs">{state.errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("message")}</Label>
                  <Textarea id="message" name="message" placeholder={t("your_message")} className="min-h-[120px]" aria-label={t("message")} />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                  {t("send_message_button")}
                </Button>

                <p className="text-sm text-muted-foreground text-center">{t("message_sent_info")}</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
