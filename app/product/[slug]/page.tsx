"use client";

import { useLocale } from "@/context/locale-context";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductPage() {
  const { locale, t } = useLocale();
  const { slug } = useParams();
  const router = useRouter();

  const products = [
    {
      slug: "ofset-qogoz",
      title: t("keyword_ofset"),
      description: t("desc_ofset"),
      image: "/images/a4.jpg",
    },
    {
      slug: "borlangan-qogoz",
      title: t("keyword_borlangan"),
      description: t("desc_borlangan"),
      image: "/images/borlangan.jpg",
    },
    {
      slug: "a4-qogoz",
      title: t("keyword_a4_paper"),
      description: t("desc_a4"),
      image: "/images/a4paper.jpg",
    },
    {
      slug: "borlangan-karton",
      title: t("keyword_bcarton"),
      description: t("desc_bcarton"),
      image: "/images/karton.jpg",
    },
    {
      slug: "laminatsiya",
      title: t("keyword_lamination"),
      description: t("desc_lamination"),
      image: "/images/laminatsiya.jpg",
    },
  ];

  const initialIndex = products.findIndex((item) => item.slug === slug);
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex !== -1 ? initialIndex : 0
  );

  const product = products[currentIndex];

  const nextProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-xl font-bold">
        {t("product_not_found") || "Mahsulot topilmadi"}
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Chap tarafda rasm */}
        <div className="relative flex justify-center">
          <div className="w-[500px] h-[500px] relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
          {/* Oldingi tugma */}
          <button
            onClick={prevProduct}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          {/* Keyingi tugma */}
          <button
            onClick={nextProduct}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* O'ng tarafda matn */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4 pt-6">
            <Button
              variant="outline"
              className="bg-black text-white px-8 py-3 hover:bg-gray-800"
              onClick={() => router.push(`/#contact`)}
            >
              {t("buy_now")}
            </Button>
            <Button
              variant="outline"
              className="border-black text-black px-8 py-3 hover:bg-black hover:text-white"
              onClick={() => router.push("/")}
            >
              {t("back_to_home")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
