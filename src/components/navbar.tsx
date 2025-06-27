'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cart';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  const navItems = [
    { href: '/', label: 'Domů' },
    { href: '/shop', label: 'Obchod' },
    { href: '/o-nas', label: 'O nás' },
    { href: '/faq', label: 'FAQ' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-orange-600"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Link href="/objednavka">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 