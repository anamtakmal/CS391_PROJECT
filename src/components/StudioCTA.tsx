import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Upload, Palette, Zap, Skull } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function StudioCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 cross-pattern opacity-20" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">AI-Powered Design</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-6 display-text">
            Create Your
            <br />
            <span className="text-primary neon-text glitch-text" data-text="Darkwave Piece">Darkwave Piece</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Upload your own custom graphics or choose from our Ed Hardy-inspired collection. 
            Watch your design come to life with <span className="text-primary">real-time AI previews</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/studio">
              <Button
                size="lg"
                className="text-base uppercase tracking-wider gap-2 neon-glow punk-button"
                data-testid="button-cta-studio"
              >
                <Zap className="h-5 w-5" />
                Open Design Studio
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                variant="outline"
                size="lg"
                className="text-base uppercase tracking-wider gap-2"
              >
                <Skull className="h-5 w-5" />
                Browse Ready-Made
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {[
            { label: 'Upload Graphics', value: <Upload className="h-8 w-8" />, desc: 'Your own art' },
            { label: 'Preset Designs', value: '9+', desc: 'Ed Hardy style' },
            { label: 'Base Colors', value: '6', desc: 'Darkwave palette' },
            { label: 'AI Previews', value: <Palette className="h-8 w-8" />, desc: 'Real-time' },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold text-primary neon-text mb-1 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                {stat.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
