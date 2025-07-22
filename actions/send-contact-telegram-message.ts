"use server"

import { z } from "zod"
import { createServerClient } from "@/lib/supabase"

// ✅ Zod schema
const contactFormSchema = z.object({
  firstName: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak."),
  phone: z.string().regex(/^\+?\d{9,15}$/, "Telefon raqami to'g'ri formatda bo'lishi kerak."),
  message: z.string().optional().default("Xabar kiritilmagan"), // ixtiyoriy
})

export async function sendContactTelegramMessage(prevState: any, formData: FormData) {
  const supabase = createServerClient()

  const data = {
    firstName: formData.get("firstName"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  }

  // ✅ Validate
  const validatedFields = contactFormSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Ma'lumotlarni to'g'ri kiriting.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { firstName, phone, message } = validatedFields.data

  // ✅ Supabase'ga saqlash
  try {
    const { error: dbError } = await supabase.from("contact_messages").insert({
      first_name: firstName,
      phone: phone,
      message: message,
    })

    if (dbError) {
      console.error("Supabase'ga xabar saqlashda xato:", dbError)
    }
  } catch (e) {
    console.error("Supabase'ga xabar saqlashda kutilmagan xato:", e)
  }

  // ✅ Telegram konfiguratsiyasi
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram konfiguratsiyasi xato.")
    return {
      success: false,
      message: "Server konfiguratsiyasi xatosi. Iltimos, keyinroq urinib ko'ring.",
    }
  }

  // ✅ Telegramga yuboriladigan matn
  const text = `
<b>📩 Yangi Aloqa Xabari (Mars Paper Saytidan)</b>

<b>Ism:</b> ${firstName}
<b>Telefon:</b> ${phone}
<b>Xabar:</b>
${message || "Xabar kiritilmagan"}
  `

  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  try {
    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }),
    })

    const result = await response.json()

    if (response.ok && result.ok) {
      return {
        success: true,
        message: "Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",
      }
    } else {
      console.error("Telegramga xabar yuborishda xato:", result)
      return {
        success: false,
        message: "Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      }
    }
  } catch (error) {
    console.error("Telegramga xabar yuborishda tarmoq xatosi:", error)
    return {
      success: false,
      message: "Tarmoq xatosi. Iltimos, internet aloqangizni tekshiring va qayta urinib ko'ring.",
    }
  }
}
