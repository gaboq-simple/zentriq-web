import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Solutions from '@/components/Solutions';
import Process from '@/components/Process';
import Projects from '@/components/Projects';
import CTAFooter from '@/components/CTAFooter';
import SectionTransition from '@/components/ui/SectionTransition';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionTransition from="dark" to="cream" />
        <Manifesto />
        <Solutions />
        <SectionTransition from="cream" to="dark" />
        <Process />
        <SectionTransition from="dark" to="cream" />
        <Projects />
        <SectionTransition from="cream" to="dark" />
        <CTAFooter />
      </main>
    </>
  );
}
