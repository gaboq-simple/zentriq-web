import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Solutions from '@/components/Solutions';
import Process from '@/components/Process';
import Projects from '@/components/Projects';
import ConnectionSection from '@/components/ConnectionSection';
import FAQ from '@/components/FAQ';
import CTAFooter from '@/components/CTAFooter';
import SectionDivider from '@/components/ui/SectionDivider';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <SectionDivider />
        <Solutions />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <ConnectionSection />
        <SectionDivider />
        <FAQ />
        <CTAFooter />
      </main>
    </>
  );
}
