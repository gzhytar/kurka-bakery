import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
  }).format(cents / 100);
}

export function getNextBakeDays(count: number = 4): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  
  for (let i = 0; i < 30 && dates.length < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Tuesday = 2, Friday = 5
    if (date.getDay() === 2 || date.getDay() === 5) {
      dates.push(date);
    }
  }
  
  return dates;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('cs-CZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
} 