
import { About } from "@/components/landing/About";
import { Hero } from "@/components/landing/Hero";
import { FAQ } from "@/components/landing/FAQ";
import { Pricing } from "@/components/subscription/Pricing";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { Footer } from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

export default function Home() {
  return (
    <main className="cursor-custom">
           <Header />
        <Hero />
      <About />
      <Pricing />

      <FAQ />
      <Footer />
      <ScrollToTop />
    </main >
  )
}
