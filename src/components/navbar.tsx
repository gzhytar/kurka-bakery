'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'

const navigation = [
  { name: 'Domů', href: '/' },
  { name: 'Obchod', href: '/shop' },
  { name: 'O nás', href: '/o-nas' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Kontakt', href: '/kontakt' },
]

// Mock auth hook - in production this would use NextAuth
const useAuth = () => {
  // For demo purposes, return admin user
  // In production, this would check actual auth state
  return {
    user: { email: 'admin@vypecenakurka.cz', role: 'admin' },
    isAuthenticated: true
  }
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const { user, isAuthenticated } = useAuth()
  
  // Get total items only after hydration to prevent mismatch
  const totalItems = isHydrated ? getTotalItems() : 0

  // Ensure component is hydrated before showing cart count
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.jpg"
                alt="Vypečená Kůrka"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-orange-600">
                Vypečená Kůrka
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart and admin buttons */}
          <div className="flex items-center space-x-4">
            {/* Admin button - only show for admin users */}
            {isAuthenticated && user?.role === 'admin' && (
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}

            {/* Cart button */}
            <Link href="/objednavka">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {/* Always render badge but control visibility to prevent hydration mismatch */}
                <span 
                  className={`absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-opacity ${
                    isHydrated && totalItems > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {isHydrated ? totalItems : 0}
                </span>
                <span className="ml-2 hidden sm:inline">Košík</span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Admin link in mobile menu */}
              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 