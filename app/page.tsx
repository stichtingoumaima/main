import Image from "next/image";
import Link from "next/link";
import DemoGif from "@/images/landingPage/tate-dance.gif"
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { Pricing } from "@/components/Pricing";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="">
        <Hero />
      <About />
      <Pricing />

      <FAQ />
      <Footer />
      <ScrollToTop />
    </main >
  )
}
