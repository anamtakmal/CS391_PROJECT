import { motion } from 'framer-motion';
import { Skull, Zap, Sparkles } from 'lucide-react';
import CustomizationStudio from '@/components/CustomizationStudio';
import Footer from '@/components/Footer';

export default function Studio() {
  return (
    <main className="pt-16 min-h-screen relative">
      <div className="absolute inset-0 cross-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-32 right-10 opacity-10 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <Skull className="h-40 w-40 text-primary" />
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight uppercase display-text">
              <span className="text-white">Design</span>{' '}
              <span className="text-primary neon-text">Studio</span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Create your custom darkwave masterpiece. Upload your own graphics or choose from 
            our Ed Hardy-inspired collection. Watch your design come to life in real-time.
          </p>
        </motion.div>

        <CustomizationStudio />
      </div>
      <Footer />
    </main>
  );
}
