import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Mission from '@/components/sections/Mission';
import Timeline from '@/components/sections/Timeline';
import Blogs from '@/components/sections/Blogs';
import Contact from '@/components/sections/Contact';
import Branding from '@/components/sections/Branding';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Mission />
      <Timeline />
      <Blogs />
      <Contact />
      <Branding />
    </Layout>
  );
}