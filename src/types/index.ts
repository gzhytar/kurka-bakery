export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  imagePath: string;
  isActive: boolean;
  createdAt: Date;
}

export interface StockDay {
  date: string; // ISO date YYYY-MM-DD
  totalQty: number;
  remainingQty: number;
  updatedAt: Date;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'FULFILLED' | 'CANCELLED';

export interface Order {
  id: string;
  bakeDate: string;
  email: string;
  phone: string;
  userId?: string;
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

export interface CartItem {
  productId: string;
  qty: number;
  bakeDate: string;
}

export interface ProductWithStock extends Product {
  remainingQty: number;
} 