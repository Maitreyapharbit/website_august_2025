import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Stats />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}