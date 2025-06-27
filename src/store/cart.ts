import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartStore, CartItem, Product } from '@/types'

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedBakeDate: null,

      addItem: (productId: string, bakeDate: string, qty = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === productId && item.bakeDate === bakeDate
          )

          if (existingItemIndex >= 0) {
            // Update existing item quantity
            const updatedItems = [...state.items]
            updatedItems[existingItemIndex].qty += qty
            return { ...state, items: updatedItems }
          } else {
            // Add new item
            return {
              ...state,
              items: [...state.items, { productId, qty, bakeDate }],
              selectedBakeDate: state.selectedBakeDate || bakeDate,
            }
          }
        })
      },

      removeItem: (productId: string, bakeDate: string) => {
        set((state) => ({
          ...state,
          items: state.items.filter(
            (item) => !(item.productId === productId && item.bakeDate === bakeDate)
          ),
        }))
      },

      updateQty: (productId: string, bakeDate: string, qty: number) => {
        if (qty <= 0) {
          get().removeItem(productId, bakeDate)
          return
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.productId === productId && item.bakeDate === bakeDate
              ? { ...item, qty }
              : item
          )
          return { ...state, items: updatedItems }
        })
      },

      clearCart: () => {
        set({ items: [], selectedBakeDate: null })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.qty, 0)
      },

      getTotalPrice: (products: Product[]) => {
        const items = get().items
        return items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId)
          return total + (product?.priceCents || 0) * item.qty
        }, 0)
      },

      setSelectedBakeDate: (date: string) => {
        set({ selectedBakeDate: date })
      },
    }),
    {
      name: 'vypecena-kurka-cart',
      partialize: (state) => ({
        items: state.items,
        selectedBakeDate: state.selectedBakeDate,
      }),
    }
  )
) 