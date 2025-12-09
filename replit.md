# VOID Studio - Premium Streetwear Design Website

## Overview
VOID Studio is a premium streetwear design platform that allows users to customize and order high-end streetwear garments. The website features a modern, dark aesthetic with neon accents inspired by brands like Fear of God, A-COLD-WALL, and Off-White.

## Project Architecture

### Frontend (React + TypeScript)
- **Framework**: React with Vite
- **Routing**: wouter
- **Styling**: TailwindCSS with custom dark streetwear theme
- **Animations**: Framer Motion
- **State Management**: Zustand for cart and customization
- **UI Components**: Shadcn/ui

### Pages
- `/` - Home page with hero, featured products, and studio CTA
- `/shop` - Product catalog with filtering and sorting
- `/studio` - Interactive garment customization studio
- `/auth` - Sign in/Sign up authentication
- `/checkout` - Order checkout flow
- `/about` - Brand story page
- `/contact` - Contact form and info

### Key Components
- `Navigation.tsx` - Fixed glassmorphism navbar
- `Hero.tsx` - Full-screen hero with animated content
- `ProductCard.tsx` - Product display cards with hover effects
- `CartDrawer.tsx` - Slide-out shopping cart
- `CustomizationStudio.tsx` - Interactive design tool
- `Footer.tsx` - Site footer with links

### State Management (Zustand)
Located at `client/src/lib/store.ts`:
- Cart items management
- Garment customization state
- UI state (cart open, mobile menu)

### Design System
- **Primary Color**: Neon green (#00FF00)
- **Accent Color**: Electric cyan (#00F0FF)
- **Background**: Near-black (#0a0a0a)
- **Typography**: Inter font family
- **Effects**: Glassmorphism, neon glows

## Generated Assets
All product images are AI-generated:
- `streetwear_model_urban_setting.png` - Hero image
- `black_hoodie_product_shot.png` - Hoodie product
- `white_tee_product_shot.png` - T-shirt product
- `track_pants_product_shot.png` - Track pants product
- `bomber_jacket_product_shot.png` - Jacket product

## Next Steps (Backend Implementation)
1. Firebase Authentication integration
2. Firestore database for user data and designs
3. OpenAI API for AI garment preview generation
4. Order processing and storage
