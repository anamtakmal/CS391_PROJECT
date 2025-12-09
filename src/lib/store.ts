import { create } from 'zustand';

export interface DesignGraphic {
  id: string;
  name: string;
  type: 'preset' | 'upload';
  url: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

export interface GarmentCustomization {
  garmentType: 'hoodie' | 'tee' | 'trackpants' | 'jacket' | 'longsleeve' | 'croptop';
  baseColor: string;
  fabric: string;
  style: string;
  size: string;
  graphics: DesignGraphic[];
}

export interface CartItem {
  id: string;
  name: string;
  customization: GarmentCustomization;
  quantity: number;
  price: number;
  savedForLater?: boolean;
  previewUrl?: string;
}

interface StoreState {
  cartItems: CartItem[];
  customization: GarmentCustomization;
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  currentPage: string;
  isGeneratingPreview: boolean;
  previewUrl: string | null;
  setCustomization: (customization: Partial<GarmentCustomization>) => void;
  addGraphic: (graphic: DesignGraphic) => void;
  removeGraphic: (id: string) => void;
  updateGraphic: (id: string, updates: Partial<DesignGraphic>) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleSaveForLater: (id: string) => void;
  setCartOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setCurrentPage: (page: string) => void;
  setIsGeneratingPreview: (generating: boolean) => void;
  setPreviewUrl: (url: string | null) => void;
  clearCart: () => void;
  resetCustomization: () => void;
}

const defaultCustomization: GarmentCustomization = {
  garmentType: 'hoodie',
  baseColor: '#0a0a0a',
  fabric: 'Heavy Cotton',
  style: 'Oversized',
  size: 'L',
  graphics: [],
};

export const useStore = create<StoreState>((set) => ({
  cartItems: [],
  customization: defaultCustomization,
  isCartOpen: false,
  isMobileMenuOpen: false,
  currentPage: 'home',
  isGeneratingPreview: false,
  previewUrl: null,

  setCustomization: (customization) =>
    set((state) => ({
      customization: { ...state.customization, ...customization },
    })),

  addGraphic: (graphic) =>
    set((state) => ({
      customization: {
        ...state.customization,
        graphics: [...state.customization.graphics, graphic],
      },
    })),

  removeGraphic: (id) =>
    set((state) => ({
      customization: {
        ...state.customization,
        graphics: state.customization.graphics.filter((g) => g.id !== id),
      },
    })),

  updateGraphic: (id, updates) =>
    set((state) => ({
      customization: {
        ...state.customization,
        graphics: state.customization.graphics.map((g) =>
          g.id === id ? { ...g, ...updates } : g
        ),
      },
    })),

  addToCart: (item) =>
    set((state) => ({
      cartItems: [
        ...state.cartItems,
        { ...item, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` },
      ],
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),

  toggleSaveForLater: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, savedForLater: !item.savedForLater } : item
      ),
    })),

  setCartOpen: (open) => set({ isCartOpen: open }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setIsGeneratingPreview: (generating) => set({ isGeneratingPreview: generating }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
  clearCart: () => set({ cartItems: [] }),
  resetCustomization: () => set({ customization: defaultCustomization, previewUrl: null }),
}));
