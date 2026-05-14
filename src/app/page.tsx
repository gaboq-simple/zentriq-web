import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Solutions from '@/components/Solutions';
import Process from '@/components/Process';
import Projects from '@/components/Projects';
import CTAFooter from '@/components/CTAFooter';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* dark → cream */}
        <div aria-hidden="true" className="h-16 bg-gradient-to-b from-[#1C1917] to-[#FAF6F1]" />
        <Manifesto />
        <Solutions />
        {/* cream → dark */}
        <div aria-hidden="true" className="h-16 bg-gradient-to-b from-[#FAF6F1] to-[#1C1917]" />
        <Process />
        {/* dark → cream */}
        <div aria-hidden="true" className="h-16 bg-gradient-to-b from-[#1C1917] to-[#FAF6F1]" />
        <Projects />
        {/* cream → dark */}
        <div aria-hidden="true" className="h-16 bg-gradient-to-b from-[#FAF6F1] to-[#1C1917]" />
        <CTAFooter />
      </main>
    </>
  );
}
