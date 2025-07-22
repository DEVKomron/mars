"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useLocale } from "@/context/locale-context";
import "keen-slider/keen-slider.min.css";

const PARTNERS = [
  { src: "/images/partners/ps.png", alt: "PS Service" },
  { src: "/images/partners/ASNOVA.png", alt: "Print.uz" },
  { src: "/images/partners/APP.png", alt: "Credo Print" },
  { src: "/images/partners/svet.png", alt: "Euro Print" },
  { src: "/images/partners/hi-kote.png", alt: "Lion Print" },
  { src: "/images/partners/ilim.png", alt: "Flex" },
  { src: "/images/partners/kama.png", alt: "Green 1" },
  { src: "/images/partners/sylvamo.png", alt: "Green 2" },
  { src: "/images/partners/volga.png", alt: "Green 3" },
  { src: "/images/partners/HolmenPaper.png", alt: "Green 4" },
  { src: "/images/partners/soliskam.png", alt: "Green 5" },
  { src: "/images/partners/xitay.png", alt: "Green 6" },
  { src: "/images/partners/belarus.png", alt: "Green 7" },
];

function AutoplayPlugin(slider: any) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 1000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

export default function Partners() {
  const { t } = useLocale();

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
      renderMode: "precision",
      slides: {
        perView: 5,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 768px)": {
          slides: { perView: 2, spacing: 15 },
        },
        "(max-width: 480px)": {
          slides: { perView: 1, spacing: 10 },
        },
      },
    },
    [AutoplayPlugin]
  );

  return (
    <section id="partners" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-10">{t("partners_title")}</h2>
        <div ref={sliderRef} className="keen-slider">
          {PARTNERS.map((partner, i) => (
            <div key={i} className="keen-slider__slide flex justify-center items-center">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={200}
                height={120}
                className="opacity-40 hover:opacity-100 transition duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}