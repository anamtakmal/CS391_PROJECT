import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Bookmark, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/lib/store';
import { Link } from 'wouter';

const garmentImages: Record<string, string> = {
  hoodie: '/attached_assets/generated_images/black_hoodie_product_shot.png',
  tee: '/attached_assets/generated_images/white_tee_product_shot.png',
  trackpants: '/attached_assets/generated_images/track_pants_product_shot.png',
  jacket: '/attached_assets/generated_images/bomber_jacket_product_shot.png',
};

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    toggleSaveForLater,
  } = useStore();

  const activeItems = cartItems.filter((item) => !item.savedForLater);
  const savedItems = cartItems.filter((item) => item.savedForLater);
  const subtotal = activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold uppercase tracking-wider">
                  Cart ({activeItems.length})
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCartOpen(false)}
                  data-testid="button-close-cart"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                {activeItems.length === 0 ? (
                  <div className="text-center text-muted-foreground py-12">
                    <p>Your cart is empty</p>
                    <Link href="/shop">
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setCartOpen(false)}
                        data-testid="button-shop-now"
                      >
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 rounded-md bg-card"
                        data-testid={`cart-item-${item.id}`}
                      >
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-muted">
                          <img
                            src={garmentImages[item.customization.garmentType]}
                            alt={item.customization.garmentType}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium capitalize">
                            {item.customization.style} {item.customization.garmentType}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.customization.fabric} / {item.customization.size}
                          </p>
                          <p className="text-primary font-semibold mt-1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              data-testid={`button-decrease-${item.id}`}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              data-testid={`button-increase-${item.id}`}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => toggleSaveForLater(item.id)}
                              data-testid={`button-save-${item.id}`}
                            >
                              <Bookmark className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => removeFromCart(item.id)}
                              data-testid={`button-remove-${item.id}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {savedItems.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
                      Saved for Later ({savedItems.length})
                    </h3>
                    <div className="space-y-4">
                      {savedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3 rounded-md bg-card/50"
                          data-testid={`saved-item-${item.id}`}
                        >
                          <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                            <img
                              src={garmentImages[item.customization.garmentType]}
                              alt={item.customization.garmentType}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium capitalize text-sm">
                              {item.customization.style} {item.customization.garmentType}
                            </h4>
                            <p className="text-primary font-semibold text-sm">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSaveForLater(item.id)}
                            data-testid={`button-move-to-cart-${item.id}`}
                          >
                            Move to Cart
                          </Button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </ScrollArea>

              {activeItems.length > 0 && (
                <div className="p-4 border-t border-border space-y-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Subtotal</span>
                    <span className="text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                  <Link href="/checkout">
                    <Button
                      className="w-full uppercase tracking-wider neon-glow"
                      size="lg"
                      onClick={() => setCartOpen(false)}
                      data-testid="button-checkout"
                    >
                      Checkout
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
