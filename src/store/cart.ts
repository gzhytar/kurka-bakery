import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  selectedBakeDate: string | null;
  addItem: (productId: string, bakeDate: string, qty?: number) => void;
  removeItem: (productId: string, bakeDate: string) => void;
  updateQty: (productId: string, bakeDate: string, qty: number) => void;
  clearCart: () => void;
  setSelectedBakeDate: (date: string) => void;
  getTotalItems: () => number;
  getItemsForBakeDate: (bakeDate: string) => CartItem[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedBakeDate: null,

      addItem: (productId, bakeDate, qty = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === productId && item.bakeDate === bakeDate
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].qty += qty;
            return { items: newItems };
          } else {
            return {
              items: [...state.items, { productId, bakeDate, qty }],
            };
          }
        });
      },

      removeItem: (productId, bakeDate) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.bakeDate === bakeDate)
          ),
        }));
      },

      updateQty: (productId, bakeDate, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, bakeDate);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.productId === productId && item.bakeDate === bakeDate
              ? { ...item, qty }
              : item
          );
          return { items: newItems };
        });
      },

      clearCart: () => {
        set({ items: [], selectedBakeDate: null });
      },

      setSelectedBakeDate: (date) => {
        set({ selectedBakeDate: date });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },

      getItemsForBakeDate: (bakeDate) => {
        return get().items.filter((item) => item.bakeDate === bakeDate);
      },
    }),
    {
      name: 'kurka-cart-storage',
    }
  )
); 