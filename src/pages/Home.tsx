import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import StudioCTA from '@/components/StudioCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <StudioCTA />
      <Footer />
    </main>
  );
}
