export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number; // Price in CZK cents (8500 = 85.00 CZK)
  imagePath: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ProductWithStock extends Product {
  remainingQty: number;
}

export interface StockDay {
  date: string; // ISO date string YYYY-MM-DD
  totalQty: number;
  remainingQty: number;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  qty: number;
  bakeDate: string; // ISO date string
}

export interface Order {
  id: string;
  bakeDate: string; // ISO date string
  email: string;
  phone: string;
  userId?: string; // Optional for guest checkout
  stripeId: string;
  status: OrderStatus;
  createdAt: Date;
}

export interface OrderLineItem {
  id: string;
  orderId: string;
  productId: string;
  qty: number;
  priceCents: number;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'FULFILLED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
}

export type UserRole = 'customer' | 'admin';

// Cart store interface
export interface CartStore {
  items: CartItem[];
  selectedBakeDate: string | null;
  addItem: (productId: string, bakeDate: string, qty?: number) => void;
  removeItem: (productId: string, bakeDate: string) => void;
  updateQty: (productId: string, bakeDate: string, qty: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: (products: Product[]) => number;
  setSelectedBakeDate: (date: string) => void;
}

// API Response types
export interface ProductsResponse {
  products: ProductWithStock[];
  stockData: Record<string, { remainingQty: number; totalQty: number }>;
}

export interface CheckoutSessionRequest {
  cartItems: CartItem[];
  bakeDate: string;
  email?: string;
  phone?: string;
} 