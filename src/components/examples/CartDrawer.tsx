import { useEffect } from 'react';
import CartDrawer from '../CartDrawer';
import { useStore } from '@/lib/store';

export default function CartDrawerExample() {
  const { addToCart, setCartOpen } = useStore();
  
  useEffect(() => {
    // todo: remove mock functionality
    addToCart({
      customization: {
        garmentType: 'hoodie',
        color: '#0a0a0a',
        fabric: 'Premium Cotton',
        style: 'Oversized',
        size: 'L',
      },
      quantity: 1,
      price: 189,
    });
    addToCart({
      customization: {
        garmentType: 'tee',
        color: '#ffffff',
        fabric: 'Organic Cotton',
        style: 'Relaxed',
        size: 'M',
      },
      quantity: 2,
      price: 79,
    });
    setCartOpen(true);
  }, []);

  return <CartDrawer />;
}
