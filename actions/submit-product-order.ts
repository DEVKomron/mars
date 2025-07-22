"use server"

import { z } from "zod"
import dbConnect from "@/lib/mongodb"
import ProductOrder from "@/models/product-order"

// ✅ Faqat majburiy maydonlar: firstName, phone
const productOrderSchema = z.object({
  productId: z.string(),
  productTitle: z.string(),
  quantity: z.coerce.number().min(1, "Miqdor kamida 1 bo'lishi kerak."),
  unitType: z.string(),
  totalPrice: z.coerce.number().min(0, "Narx manfiy bo'lishi mumkin emas."),
  firstName: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak."),
  phone: z
    .string()
    .regex(/^\+998\d{9}$/, "Telefon raqami to'g'ri formatda bo'lishi kerak. (+998 bilan boshlanishi shart)"),
  lastName: z.string().optional().or(z.literal("")), // ✅ Ixtiyoriy
  email: z.string().email("Email manzili noto'g'ri.").optional().or(z.literal("")), // ✅ Ixtiyoriy
  company: z.string().optional().or(z.literal("")), // ✅ Ixtiyoriy
  message: z.string().optional().or(z.literal("")), // ✅ Ixtiyoriy
})

export async function submitProductOrder(prevState: any, formData: FormData) {
  // ✅ Formdan kelgan ma'lumotlarni olish
  const data = {
    productId: formData.get("productId"),
    productTitle: formData.get("productTitle"),
    quantity: formData.get("quantity"),
    unitType: formData.get("unitType"),
    totalPrice: formData.get("totalPrice"),
    firstName: formData.get("firstName"),
    phone: formData.get("phone"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
  }

  // ✅ Validatsiya
  const validatedFields = productOrderSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Ma'lumotlarni to'g'ri kiriting.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { productId, productTitle, quantity, unitType, totalPrice, firstName, phone, lastName, email, company, message } =
    validatedFields.data

  try {
    // ✅ MongoDB bilan ulanish
    await dbConnect()

    // ✅ Buyurtmani DB ga saqlash
    await ProductOrder.create({
      productId,
      productTitle,
      quantity,
      unitType,
      totalPrice,
      firstName,
      phone,
      lastName: lastName || undefined,
      email: email || undefined,
      company: company || undefined,
      message: message || undefined,
    })

    return {
      success: true,
      message: "✅ Buyurtmangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",
    }
  } catch (error) {
    console.error("Ma'lumotlar bazasiga saqlashda xato:", error)
    return {
      success: false,
      message: "❌ Buyurtma yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
    }
  }
}
