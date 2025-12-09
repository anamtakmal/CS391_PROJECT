# Design Guidelines: Premium Streetwear Design Studio

## Design Approach
**Reference-Based Approach**: Drawing from high-end streetwear brands - Fear of God, Essentials, A-COLD-WALL, and Off-White. This is a visually-driven e-commerce experience where aesthetics are paramount.

## Core Design Principles
- **Premium Minimalism**: Clean layouts with intentional negative space
- **Graphic-Heavy**: Bold imagery, model photography, and product shots take center stage
- **Neon/Urban Energy**: Strategic use of neon accents against dark backgrounds
- **Streetwear Authenticity**: Raw, editorial photography style with contemporary edge

## Typography System
- **Primary Font**: Inter (body text, UI elements)
- **Display Font**: Neue Montreal or Helvetica (headlines, hero text)
- **Hierarchy**:
  - Hero Headlines: 4xl-6xl, bold/black weight, uppercase tracking
  - Section Headers: 2xl-3xl, semibold, tight tracking
  - Body: base-lg, regular weight, relaxed leading
  - Labels/UI: sm-base, medium weight, uppercase for emphasis

## Layout & Spacing
**Tailwind Units**: Consistent use of 4, 6, 8, 12, 16, 24 for rhythm
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Component gaps: gap-6 to gap-8
- Container max-width: max-w-7xl for content areas
- Grid systems: 2-column (tablet), 3-4 column (desktop) for product grids

## Visual Treatment

### Glassmorphism Effects
- Toolbar/panels: backdrop-blur-xl with bg-black/20 or bg-white/10
- Cards: backdrop-blur-md with subtle borders (border-white/10)
- Overlays: backdrop-blur-lg for modals/menus

### Neon Accents
- Primary CTA buttons: Neon green (#00FF00) or electric blue (#00F0FF) glows
- Active states: Subtle neon border/shadow effects
- Hover effects: Neon color shifts on interactive elements
- Strategic placement: Not everywhere - use sparingly on key CTAs and active states

### Dark Foundation
- Primary background: bg-black or bg-neutral-950
- Secondary surfaces: bg-neutral-900
- Elevated surfaces: bg-neutral-800 with glassmorphism

## Component Library

### Navigation
- Fixed header with glassmorphism backdrop
- Logo left, minimal nav links center/right
- Cart icon with item count badge (neon accent)
- Mobile: Hamburger menu with full-screen overlay

### Hero Section (Home)
- Full viewport height (min-h-screen)
- Large hero image/video: Model wearing signature pieces
- Centered headline with neon underline or accent
- Rotating garment mockups: Framer Motion carousel with 3-4 featured products
- CTA button with blurred background, neon border on hover

### Product Cards (Shop Page)
- Image-first with hover zoom effect
- Product name, brief description, price
- Quick-add to cart button appears on hover
- Cards: rounded-lg, subtle border, dark background

### Customization Studio Layout
- **Left Toolbar**: Vertical icon menu (garment types) - fixed, dark with neon active states
- **Center Canvas**: Large preview area showing selected garment with live updates
- **Right Panel**: Scrollable options (colors, fabrics, measurements) - glassmorphism sidebar
- **Bottom/Floating**: AI Preview box - can be toggled/expanded, shows generated preview

### Forms (Auth, Checkout, Contact)
- Minimal input styling: transparent bg, bottom border only, neon focus state
- Labels above inputs, subtle text
- Large, bold submit buttons with neon accents
- Social auth buttons (Google) with brand colors

### Cart
- Slide-in drawer from right (mobile/tablet) or dedicated page (desktop)
- Item cards with thumbnail, customization summary, quantity controls
- Sticky checkout button at bottom
- Save for later option with ghost button style

## Imagery Strategy

### Images Needed
1. **Hero Section**: Full-width editorial model shot wearing brand pieces (urban/street background)
2. **Product Gallery**: High-quality garment flat lays on dark backgrounds
3. **Customization Preview**: AI-generated or placeholder garment renders
4. **About Page**: Studio/workspace shots, design process imagery
5. **Background Textures**: Subtle concrete, asphalt, or urban textures (low opacity overlays)

### Image Treatment
- Sharp contrast, slightly desaturated for moodiness
- Consistent lighting: dramatic shadows, editorial style
- Products on black/dark backgrounds for isolation
- Model shots: street/urban environments, natural poses

## Animations (Framer Motion - Minimal Use)
- Hero carousel: Slow, smooth transitions (3-4s intervals)
- Page transitions: Subtle fade-in
- Product hover: Scale (1.05) and slight lift
- Menu open/close: Slide + fade
- Cart drawer: Slide from right
- NO distracting scroll animations - keep it refined

## Responsive Breakpoints
- Mobile (base): Single column, stacked layout
- Tablet (md: 768px): 2-column grids, simplified customization layout
- Desktop (lg: 1024px): Full 3-4 column grids, side-by-side customization panels
- XL (xl: 1280px): Maximum 1400px container width

## Page-Specific Guidelines

### Home Page
5-6 sections: Hero → Featured Products → Customization CTA → Brand Story Teaser → Instagram Feed/Social Proof → Footer

### Customization Studio
Full-height app interface, no traditional page sections - immersive design tool

### Shop Page
Filter sidebar (left), product grid (right, 3-4 columns), sticky filter toggle on mobile

### About Page
Editorial layout: large images, text overlays, mission statement with neon accents

### Contact
Split layout: Form left, brand info/map right (desktop), stacked (mobile)