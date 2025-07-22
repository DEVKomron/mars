"use client"

import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/context/locale-context"
import { useActionState } from "react"
import { sendProductOrderTelegramMessage } from "@/actions/send-product-order-telegram-message"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import React from "react";

// Mock product data
const mockProducts = [
  {
    slug: "daftar",
    titleKey: "product_notebook_title",
    descriptionKey: "product_notebook_description",
    pricePerUnit: 1500,
    unitType: "dona",
    image: "/placeholder.svg?height=400&width=600&text=Daftar+va+Tetrat",
  },
  {
    slug: "a4-qogoz",
    titleKey: "product_a4_paper_title",
    descriptionKey: "product_a4_paper_description",
    pricePerUnit: 8000,
    unitType: "kg",
    image: "/images/a4paper.jpg",
  },
  {
    slug: "print-xizmatlari",
    titleKey: "product_print_service_title",
    descriptionKey: "product_print_service_description",
    pricePerUnit: 500,
    unitType: "varaq",
    image: "/placeholder.svg?height=400&width=600&text=Print+Xizmatlari",
  },
]

export default function ProductOrderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params); // ✅ Promise unwrap qilindi
  const { t } = useLocale();
    const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound()
  }

  const [quantity, setQuantity] = useState(1)
  const totalPrice = product.pricePerUnit * quantity

  const [state, formAction] = useActionState(sendProductOrderTelegramMessage, {
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
    <section className="py-20 px-4 bg-background min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-4">{t(product.slug)}</CardTitle>
            <p className="text-muted-foreground text-center">{t(product.descriptionKey)}</p>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={t(product.titleKey)}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-lg">
                  {t("quantity")} (
                  {product.unitType === "dona"
                    ? t("per_piece")
                    : product.unitType === "kg"
                    ? t("per_kg")
                    : t("per_unit")}
                  )
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  className="w-full"
                />
              </div>

              <div className="text-2xl font-bold text-foreground">
                {t("total_price")}: {totalPrice.toLocaleString()} {t("sum")}
              </div>

              {/* Form */}
              <form action={formAction} className="space-y-4">
                <input type="hidden" name="productId" value={product.slug} />
                <input type="hidden" name="productTitle" value={t(product.titleKey)} />
                <input type="hidden" name="quantity" value={quantity} />
                <input type="hidden" name="unitType" value={product.unitType} />
                <input type="hidden" name="totalPrice" value={totalPrice} />

                {/* Majburiy: First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("first_name")}</Label>
                  <Input id="firstName" name="firstName" placeholder={t("your_first_name")} required />
                  {state.errors?.firstName && <p className="text-destructive text-xs">{state.errors.firstName}</p>}
                </div>

                {/* Majburiy: Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone_number")}</Label>
                  <Input id="phone" name="phone" placeholder="+998 90 123 45 67" required />
                  {state.errors?.phone && <p className="text-destructive text-xs">{state.errors.phone}</p>}
                </div>

                {/* Ixtiyoriy: Izoh */}
                <div className="space-y-2">
                  <Label htmlFor="message">{t("additional_notes")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t("your_additional_notes")}
                    className="min-h-[80px]"
                  />
                  {state.errors?.message && <p className="text-destructive text-xs">{state.errors.message}</p>}
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                  {t("place_order_button")}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
