import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useStore } from '@/lib/store';

const garmentImages: Record<string, string> = {
  hoodie: '/attached_assets/generated_images/black_hoodie_product_shot.png',
  tee: '/attached_assets/generated_images/white_tee_product_shot.png',
  trackpants: '/attached_assets/generated_images/track_pants_product_shot.png',
  jacket: '/attached_assets/generated_images/bomber_jacket_product_shot.png',
};

export default function Checkout() {
  const { cartItems } = useStore();
  const [shippingMethod, setShippingMethod] = useState('standard');

  const activeItems = cartItems.filter((item) => !item.savedForLater);
  const subtotal = activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = shippingMethod === 'express' ? 25 : shippingMethod === 'overnight' ? 45 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted');
    // todo: remove mock functionality - replace with actual payment processing
  };

  return (
    <main className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/shop">
            <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back-shop">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase mb-8">
            Checkout
          </h1>

          {activeItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Link href="/shop">
                <Button data-testid="button-shop-empty">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="uppercase tracking-wider text-lg">
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" data-testid="input-first-name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" data-testid="input-last-name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" data-testid="input-email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" data-testid="input-phone" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="uppercase tracking-wider text-lg">
                        Shipping Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Street Name" data-testid="input-address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                        <Input id="apartment" placeholder="Apt 4B" data-testid="input-apartment" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" data-testid="input-city" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="NY" data-testid="input-state" />
                        </div>
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" placeholder="10001" data-testid="input-zip" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="uppercase tracking-wider text-lg flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Shipping Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="space-y-3">
                          <Label
                            htmlFor="standard"
                            className={`flex items-center justify-between p-4 rounded-md cursor-pointer transition-all ${
                              shippingMethod === 'standard' ? 'bg-primary/10 ring-1 ring-primary' : 'bg-card hover-elevate'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="standard" id="standard" data-testid="shipping-standard" />
                              <div>
                                <p className="font-medium">Standard Shipping</p>
                                <p className="text-sm text-muted-foreground">5-7 business days</p>
                              </div>
                            </div>
                            <span className="font-semibold text-primary">Free</span>
                          </Label>

                          <Label
                            htmlFor="express"
                            className={`flex items-center justify-between p-4 rounded-md cursor-pointer transition-all ${
                              shippingMethod === 'express' ? 'bg-primary/10 ring-1 ring-primary' : 'bg-card hover-elevate'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="express" id="express" data-testid="shipping-express" />
                              <div>
                                <p className="font-medium">Express Shipping</p>
                                <p className="text-sm text-muted-foreground">2-3 business days</p>
                              </div>
                            </div>
                            <span className="font-semibold">$25.00</span>
                          </Label>

                          <Label
                            htmlFor="overnight"
                            className={`flex items-center justify-between p-4 rounded-md cursor-pointer transition-all ${
                              shippingMethod === 'overnight' ? 'bg-primary/10 ring-1 ring-primary' : 'bg-card hover-elevate'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="overnight" id="overnight" data-testid="shipping-overnight" />
                              <div>
                                <p className="font-medium">Overnight Shipping</p>
                                <p className="text-sm text-muted-foreground">Next business day</p>
                              </div>
                            </div>
                            <span className="font-semibold">$45.00</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="uppercase tracking-wider text-lg flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" data-testid="input-card-number" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" data-testid="input-expiry" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" data-testid="input-cvv" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4" />
                        Your payment information is secure
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <Card>
                      <CardHeader>
                        <CardTitle className="uppercase tracking-wider text-lg">
                          Order Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {activeItems.map((item) => (
                          <div key={item.id} className="flex gap-4" data-testid={`order-item-${item.id}`}>
                            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                              <img
                                src={garmentImages[item.customization.garmentType]}
                                alt={item.customization.garmentType}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium capitalize text-sm">
                                {item.customization.style} {item.customization.garmentType}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold text-sm">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total</span>
                          <span className="text-primary">${total.toFixed(2)}</span>
                        </div>

                        <Button
                          type="submit"
                          className="w-full uppercase tracking-wider neon-glow"
                          size="lg"
                          data-testid="button-place-order"
                        >
                          Place Order
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
