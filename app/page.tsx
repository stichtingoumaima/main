
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/subscription/Pricing";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { Footer } from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

export default function Home() {
  return (
    <main className="cursor-custom hover:cursor-custom">
      <Header />
      <Hero />
      <Pricing />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
