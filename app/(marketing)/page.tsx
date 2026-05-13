import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { TestimonialSlider } from "@/components/sections/testimonial-slider";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Las Vegas Luxury Real Estate",
  description:
    "Boutique luxury real estate in Las Vegas. Darrel represents buyers and sellers in The Ridges, MacDonald Highlands, Ascaya, and Lake Las Vegas — off-market access and cinematic marketing.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutTeaser />
      <TestimonialSlider />
      <CtaSection />
    </>
  );
}
