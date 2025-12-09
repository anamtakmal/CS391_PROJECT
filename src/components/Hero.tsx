import { motion } from 'framer-motion';
import { ArrowRight, Zap, Skull } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import heroImage from '@assets/generated_images/streetwear_model_urban_setting.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Darkwave streetwear"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
        <div className="absolute inset-0 noise" />
        <div className="absolute inset-0 scanlines opacity-30" />
      </div>

      <div className="absolute top-20 left-10 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Skull className="h-32 w-32 text-primary" />
        </motion.div>
      </div>

      <div className="absolute bottom-20 right-10 opacity-10">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Zap className="h-48 w-48 text-primary" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-sm uppercase tracking-[0.4em] text-primary font-medium border border-primary/30 px-4 py-2 rounded-full bg-primary/10">
              Darkwave Design Studio
            </span>
          </motion.div>
          
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight uppercase mb-6 display-text">
            <span className="text-white">VOID</span>
            <br />
            <span className="text-primary neon-text glitch-text" data-text="APPAREL">APPAREL</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 tracking-wide"
        >
          <span className="marker-underline">Upload your own designs</span> or choose from our 
          Ed Hardy-inspired graphics. Watch your creation come to life in <span className="text-primary">real-time</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/studio">
            <Button
              size="lg"
              className="text-base uppercase tracking-wider gap-2 neon-glow punk-button"
              data-testid="button-hero-studio"
            >
              <Zap className="h-5 w-5" />
              Start Creating
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/shop">
            <Button
              variant="outline"
              size="lg"
              className="text-base uppercase tracking-wider bg-white/5 backdrop-blur-sm border-white/20"
              data-testid="button-hero-shop"
            >
              <Skull className="h-5 w-5 mr-2" />
              Browse Drops
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex items-center justify-center gap-8 text-white/40"
        >
          {['Punk', 'Darkwave', 'Cyberpunk', 'Grunge'].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-xs uppercase tracking-[0.3em]"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
