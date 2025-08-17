import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Mission from '@/components/sections/Mission';
import KeyFeatures from '@/components/sections/KeyFeatures';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Mission />
      <KeyFeatures />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}