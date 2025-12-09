import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  tags?: string[];
}

export default function ProductCard({ id, name, price, image, category, isNew, tags }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useStore();
  const { toast } = useToast();

  const garmentTypeMap: Record<string, 'hoodie' | 'tee' | 'trackpants' | 'jacket' | 'longsleeve' | 'croptop'> = {
    'Hoodie': 'hoodie',
    'T-Shirt': 'tee',
    'Track Pants': 'trackpants',
    'Jacket': 'jacket',
  };

  const handleAddToCart = () => {
    addToCart({
      name,
      customization: {
        garmentType: garmentTypeMap[category] || 'tee',
        baseColor: '#0a0a0a',
        fabric: 'Heavy Cotton',
        style: 'Oversized',
        size: 'L',
        graphics: [],
      },
      quantity: 1,
      price,
    });
    
    toast({
      title: 'Added to cart!',
      description: `${name} has been added to your cart`,
    });
  };

  const isLimited = tags?.includes('Limited');

  return (
    <Card
      className="group relative overflow-visible bg-card/80 backdrop-blur-sm border-card-border hover:border-primary/30 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${id}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-md">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground">
              New
            </Badge>
          )}
          {isLimited && (
            <Badge variant="outline" className="bg-black/60 backdrop-blur-sm border-primary/50">
              <Flame className="h-3 w-3 mr-1" />
              Limited
            </Badge>
          )}
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-4 gap-2 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="gap-2 neon-glow"
            data-testid={`button-add-${id}`}
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button size="icon" variant="secondary" data-testid={`button-view-${id}`}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {tags?.filter(t => t !== 'Limited').slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {category}
        </p>
        <h3 className="font-medium text-foreground mb-2 line-clamp-2" data-testid={`text-name-${id}`}>
          {name}
        </h3>
        <p className="text-primary font-bold text-lg" data-testid={`text-price-${id}`}>
          ${price}
        </p>
      </div>
    </Card>
  );
}
