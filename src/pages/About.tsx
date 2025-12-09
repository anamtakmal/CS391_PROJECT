import { motion } from 'framer-motion';
import { Target, Sparkles, Globe, Users } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import heroImage from '@assets/generated_images/streetwear_model_urban_setting.png';

const values = [
  {
    icon: Target,
    title: 'Precision Craft',
    description: 'Every stitch, every seam, every detail is executed with obsessive attention to quality.',
  },
  {
    icon: Sparkles,
    title: 'Innovation First',
    description: 'We push boundaries with AI-powered design tools and cutting-edge manufacturing.',
  },
  {
    icon: Globe,
    title: 'Sustainable Future',
    description: 'Ethical sourcing and eco-conscious materials are at the core of our process.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built by and for the culture. Our community shapes everything we create.',
  },
];

export default function About() {
  return (
    <main className="pt-16">
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Streetwear model"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-6">
              <span className="text-white">The</span>
              <br />
              <span className="text-primary neon-text">VOID Story</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Born from the streets, refined by technology. VOID Studio represents the intersection 
              of authentic streetwear culture and cutting-edge design innovation. We believe 
              everyone deserves custom-fit, premium quality garments that express their unique identity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground">
              The principles that guide everything we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase mb-6">
                Crafted for
                <br />
                <span className="text-primary">Individuality</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At VOID, we reject the one-size-fits-all approach. Our design studio empowers 
                you to create garments that are truly yours. From fabric selection to final 
                stitch, every piece is made to your exact specifications.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We partner with premium mills and ethical manufacturers to source the finest 
                materials. Our AI-powered preview system lets you visualize your creation 
                before it's made, ensuring every piece exceeds expectations.
              </p>
              <Link href="/studio">
                <Button className="uppercase tracking-wider neon-glow" data-testid="button-about-studio">
                  Start Creating
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: '15K+', label: 'Custom Pieces Created' },
                { value: '50+', label: 'Premium Materials' },
                { value: '99%', label: 'Satisfaction Rate' },
                { value: '24hr', label: 'Design Support' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-md bg-background/50 backdrop-blur-sm text-center"
                >
                  <p className="text-3xl font-bold text-primary neon-text mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
