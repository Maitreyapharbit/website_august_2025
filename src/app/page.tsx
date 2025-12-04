import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import SupplyChainTimeline from '@/components/sections/SupplyChainTimeline';
import Mission from '@/components/sections/Mission';
import ProblemWeSolve from '@/components/sections/ProblemWeSolve';
import KeyFeatures from '@/components/sections/KeyFeatures';
import TechnologyStack from '@/components/sections/TechnologyStack';
import TargetCustomers from '@/components/sections/TargetCustomers';
import Benefits from '@/components/sections/Benefits';
import Pricing from '@/components/sections/Pricing';
import Timeline from '@/components/sections/Timeline';
import Stats from '@/components/sections/Stats';
import InteractiveInfographic from '@/components/sections/InteractiveInfographic';
import Blogs from '@/components/sections/Blogs';
import DrugJourneyTimeline from '@/components/sections/DrugJourneyTimeline';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      {/*<SupplyChainTimeline />*/}
      <Mission />
      <InteractiveInfographic />
      <ProblemWeSolve />
      <KeyFeatures />
      <TechnologyStack />
      <TargetCustomers />
      <Benefits />
      <Pricing />
      <Timeline />
      <DrugJourneyTimeline />
      <Stats />
      <Blogs />
      <Contact />
      <Footer />
    </>
  );
}