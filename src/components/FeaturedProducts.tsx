import { motion } from 'framer-motion';
import { ArrowRight, Skull, Flame } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';
import hoodieImage from '@assets/generated_images/black_hoodie_product_shot.png';
import teeImage from '@assets/generated_images/white_tee_product_shot.png';
import pantsImage from '@assets/generated_images/track_pants_product_shot.png';
import jacketImage from '@assets/generated_images/bomber_jacket_product_shot.png';

const featuredProducts = [
  {
    id: '1',
    name: 'Skull Roses Graphic Hoodie',
    price: 175,
    image: hoodieImage,
    category: 'Hoodie',
    isNew: true,
    tags: ['Ed Hardy', 'Limited'],
  },
  {
    id: '2',
    name: 'Flaming Heart Tee',
    price: 85,
    image: teeImage,
    category: 'T-Shirt',
    isNew: true,
    tags: ['Punk'],
  },
  {
    id: '3',
    name: 'Death or Glory Track Pants',
    price: 145,
    image: pantsImage,
    category: 'Track Pants',
    isNew: false,
    tags: ['Darkwave'],
  },
  {
    id: '4',
    name: 'Lightning Strike Bomber',
    price: 225,
    image: jacketImage,
    category: 'Jacket',
    isNew: true,
    tags: ['Grunge', 'Limited'],
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 cross-pattern opacity-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-5 w-5 text-primary" />
              <Badge variant="outline" className="uppercase tracking-wider text-xs">
                Hot Picks
              </Badge>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase mb-2 display-text">
              <span className="text-white">Featured</span>{' '}
              <span className="text-primary neon-text">Drops</span>
            </h2>
            <p className="text-muted-foreground">
              Darkwave essentials for the bold and rebellious
            </p>
          </div>
          <Link href="/shop">
            <Button variant="outline" className="gap-2 uppercase tracking-wider" data-testid="button-view-all">
              <Skull className="h-4 w-4" />
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
