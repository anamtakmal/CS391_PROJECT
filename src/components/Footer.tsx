import { Link } from 'wouter';
import { SiInstagram, SiX, SiTiktok } from 'react-icons/si';
import { Skull, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  shop: [
    { label: 'All Drops', href: '/shop' },
    { label: 'Graphic Hoodies', href: '/shop?category=hoodie' },
    { label: 'Punk Tees', href: '/shop?category=tee' },
    { label: 'Track Suits', href: '/shop?category=trackpants' },
    { label: 'Bombers', href: '/shop?category=jacket' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Design Studio', href: '/studio' },
    { label: 'Contact', href: '/contact' },
    { label: 'Collabs', href: '/collabs' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 cross-pattern opacity-30" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" data-testid="link-footer-logo">
              <div className="flex items-center gap-2">
                <Skull className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold tracking-[0.15em] uppercase display-text neon-text">
                  VOID APPAREL
                </span>
              </div>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Darkwave streetwear for the bold. Create custom punk graphics or choose 
              from our Ed Hardy-inspired collection. Express your void.
            </p>

            <div className="mt-6">
              <p className="text-sm font-medium mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Join the void
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="max-w-xs bg-background/50"
                  data-testid="input-newsletter"
                />
                <Button type="submit" className="neon-glow" data-testid="button-subscribe">
                  Join
                </Button>
              </form>
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="ghost" size="icon" className="hover:text-primary" data-testid="link-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary" data-testid="link-twitter">
                <SiX className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary" data-testid="link-tiktok">
                <SiTiktok className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2024 VOID APPAREL. Made with chaos.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy">
              <span className="hover:text-foreground transition-colors">Privacy</span>
            </Link>
            <Link href="/terms">
              <span className="hover:text-foreground transition-colors">Terms</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
