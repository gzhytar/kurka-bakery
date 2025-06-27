import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { addDays, format, isToday, isTomorrow, nextTuesday, nextFriday, startOfDay } from 'date-fns'
import { cs } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(priceCents: number): string {
  const price = priceCents / 100
  return `${price.toFixed(0)} Kč`
}

export function formatPriceDecimal(priceCents: number): string {
  const price = priceCents / 100
  return `${price.toFixed(2)} Kč`
}

export function getNextBakeDays(): string[] {
  const bakeDays: string[] = []
  const today = new Date()
  
  // Get next 4 bake days (Tuesdays and Fridays)
  let currentDate = startOfDay(today)
  
  while (bakeDays.length < 4) {
    // Check if current date is Tuesday (2) or Friday (5)
    const dayOfWeek = currentDate.getDay()
    
    if (dayOfWeek === 2 || dayOfWeek === 5) {
      // Only include future dates or today if it's early enough
      if (currentDate >= startOfDay(today)) {
        bakeDays.push(format(currentDate, 'yyyy-MM-dd'))
      }
    }
    
    currentDate = addDays(currentDate, 1)
  }
  
  // If we don't have enough days, calculate next Tuesdays and Fridays explicitly
  if (bakeDays.length < 4) {
    const nextTue = nextTuesday(today)
    const nextFri = nextFriday(today)
    
    const futureDates = [nextTue, nextFri, addDays(nextTue, 7), addDays(nextFri, 7)]
      .sort((a, b) => a.getTime() - b.getTime())
      .slice(0, 4)
    
    return futureDates.map(date => format(date, 'yyyy-MM-dd'))
  }
  
  return bakeDays
}

export function formatBakeDate(dateString: string): string {
  const date = new Date(dateString)
  
  if (isToday(date)) {
    return 'Dnes'
  }
  
  if (isTomorrow(date)) {
    return 'Zítra'
  }
  
  return format(date, 'd. MMMM', { locale: cs })
}

export function formatBakeDateFull(dateString: string): string {
  const date = new Date(dateString)
  return format(date, 'EEEE d. MMMM yyyy', { locale: cs })
}

export function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString)
  return format(date, 'EEEE', { locale: cs })
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Czech phone number validation
  const phoneRegex = /^(\+420)?[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function formatPhone(phone: string): string {
  // Format phone number for display
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 9) {
    return `+420 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }
  return phone
} 