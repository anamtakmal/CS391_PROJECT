import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/studio', label: 'Create' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [location] = useLocation();
  const { cartItems, setCartOpen, isMobileMenuOpen, setMobileMenuOpen } = useStore();
  const cartCount = cartItems.filter(item => !item.savedForLater).length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" data-testid="link-logo">
              <div className="flex items-center gap-2">
                <Skull className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold tracking-[0.15em] uppercase display-text neon-text">
                  VOID APPAREL
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm uppercase tracking-wider font-medium ${
                      location === link.href ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link href="/auth">
                <Button variant="ghost" size="icon" data-testid="button-auth">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
                data-testid="button-cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-16 bg-background/98 backdrop-blur-xl md:hidden cross-pattern"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-3xl font-bold uppercase tracking-[0.2em] transition-colors display-text ${
                        location === link.href ? 'text-primary neon-text' : 'text-foreground'
                      }`}
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
