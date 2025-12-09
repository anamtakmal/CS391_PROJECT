import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid3X3, LayoutGrid, Skull, Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import pantImage from '@assets/generated_images/cargoppants.jpg';
import teeImage from '@assets/generated_images/edhardytee.jpg';
import jacketImage from '@assets/generated_images/jacket.jpg';
import sweatshirtImage from '@assets/generated_images/sweatshirt.jpg';
import hoodieImage from '@assets/generated_images/alleye.jpg';
import grungehoodieImage from '@assets/generated_images/winterfit.jpg';
import gothichoodieImage from '@assets/generated_images/gothic.jpg';
import trackpantImage from '@assets/generated_images/track.jpg';
import traditionalhoodieImage from '@assets/generated_images/thoodie.jpg';
import jacket1Image from '@assets/generated_images/jacket.jpg';
import hoodie2Image from '@assets/generated_images/hoodie1.jpg';
import rebelImage from '@assets/generated_images/rebel.jpg';

const punkProducts = [
  { 
    id: '1', 
    name: 'Chaos Theory Cargo Pants', 
    price: 175, 
    image: pantImage, 
    category: 'pants', 
    isNew: true,
    tags: ['Punk'] 
  },
  { 
    id: '2', 
    name: 'The Hardy Grunge Top', 
    price: 85, 
    image: teeImage, 
    category: 'T-Shirt', 
    isNew: true,
    tags: ['Ed Hardy', 'Limited'] 
  },
  { 
    id: '3', 
    name: 'Anchor Soul Graphic Hoodie', 
    price: 145, 
    image: traditionalhoodieImage, 
    category: 'hoodie', 
    isNew: false,
    tags: ['Hoodie','Traditional'] 
  },
  { 
    id: '4', 
    name: 'Bandana Breaker Jacket', 
    price: 225, 
    image: jacket1Image, 
    category: 'Jacket', 
    isNew: true,
    tags: ['Premium', 'Limited'] 
  },
  { 
    id: '5', 
    name: 'All Seeing Eye Hoodie', 
    price: 165, 
    image: hoodieImage, 
    category: 'Hoodie', 
    isNew: false,
    tags: ['Occult'] 
  },
  { 
    id: '6', 
    name: 'Thunderstrike Core', 
    price: 95, 
    image: hoodie2Image, 
    category: 'Hoodie', 
    isNew: true,
    tags: ['Power you can feel'] 
  },
  { 
    id: '7', 
    name: 'Chaos Theory Cargo Pants', 
    price: 155, 
    image: trackpantImage, 
    category: 'Pants', 
    isNew: true,
    tags: ['Punk'] 
  },
  { 
    id: '8', 
    name: 'Void Walker Jacket', 
    price: 295, 
    image: jacketImage, 
    category: 'Jacket', 
    isNew: false,
    tags: ['Premium', 'Limited'] 
  },
  { 
    id: '9', 
    name: 'Waves of Honor Bomber', 
    price: 75, 
    image: sweatshirtImage, 
    category: 'Shirt', 
    isNew: true,
    tags: ['Japanese'] 
  },
  { 
    id: '10', 
    name: 'Chain Requiem Jacket', 
    price: 185, 
    image: gothichoodieImage, 
    category: 'Jacket', 
    isNew: false,
    tags: ['Gothic'] 
  },
  { 
    id: '11', 
    name: 'Neon Venom Ravers', 
    price: 210, 
    image: trackpantImage, 
    category: 'Track Pants', 
    isNew: true,
    tags: ['Cyberpunk'] 
  },
  { 
    id: '12', 
    name: 'Rebel Spirit Distressed Hoodie', 
    price: 89, 
    image: rebelImage, 
    category: 'Shirt', 
    isNew: false,
    tags: ['Grunge'] 
  },
];

const categories = ['All', 'Hoodie', 'T-Shirt', 'Track Pants', 'Jacket'];
const styleFilters = ['Ed Hardy', 'Punk', 'Darkwave', 'Grunge', 'Occult', 'Japanese', 'Limited'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const filteredProducts = punkProducts.filter((product) => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const styleMatch = selectedStyles.length === 0 || 
      selectedStyles.some(style => product.tags?.includes(style));
    return categoryMatch && styleMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return a.isNew ? -1 : 1;
    return 0;
  });

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h4 className="font-medium mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
          <Skull className="h-4 w-4 text-primary" />
          Categories
        </h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <Label key={category} className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
              <Checkbox
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
                data-testid={`filter-${category.toLowerCase().replace(' ', '-')}`}
              />
              <span className="text-sm">{category}</span>
            </Label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
          <Flame className="h-4 w-4 text-primary" />
          Style
        </h4>
        <div className="flex flex-wrap gap-2">
          {styleFilters.map((style) => (
            <Badge
              key={style}
              variant={selectedStyles.includes(style) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleStyle(style)}
              data-testid={`filter-style-${style.toLowerCase()}`}
            >
              {style}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <main className="pt-16 min-h-screen relative">
      <div className="absolute inset-0 cross-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-xs uppercase tracking-wider">
              New Drops
            </Badge>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight uppercase mb-4 display-text">
            <span className="text-white">Browse</span>{' '}
            <span className="text-primary neon-text">Drops</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Darkwave streetwear for the rebellious soul. Each piece tells a story of chaos and beauty.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 glass-light rounded-lg p-6">
              <FilterContent />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2" data-testid="button-filter-mobile">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="bg-background/95 backdrop-blur-xl">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Skull className="h-5 w-5 text-primary" />
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-muted-foreground">
                  {sortedProducts.length} pieces
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest Drops</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center gap-1">
                  <Button
                    variant={gridCols === 3 ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setGridCols(3)}
                    data-testid="button-grid-3"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridCols === 4 ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setGridCols(4)}
                    data-testid="button-grid-4"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className={`grid gap-6 ${
              gridCols === 3 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Skull className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">No pieces match your vibe</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedStyles([]);
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
