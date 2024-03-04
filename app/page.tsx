
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { Pricing } from "@/components/Pricing";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

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
