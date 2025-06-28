'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, ShoppingBag, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Mock authentication - in real app this would use NextAuth
const useAuth = () => {
  // For demo purposes, always return admin user
  // In production, this would check actual auth state
  return {
    user: { email: 'admin@vypecenakurka.cz', role: 'admin' },
    logout: () => {
      // Handle logout
      console.log('Logout clicked')
    }
  }
}

const adminNavigation = [
  { name: 'Správa zásob', href: '/admin/stock', icon: Package },
  { name: 'Objednávky', href: '/admin/orders', icon: ShoppingBag },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // In production, redirect to login if not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Admin přístup</h1>
            <p className="text-gray-600 text-center mb-6">
              Pro přístup k administraci se musíte přihlásit jako administrátor.
            </p>
            <Button asChild className="w-full">
              <Link href="/">Zpět na hlavní stránku</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm">
          <div className="flex h-16 shrink-0 items-center border-b">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">VK</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Admin Panel
              </span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {adminNavigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                            isActive
                              ? 'bg-orange-50 text-orange-600'
                              : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                          }`}
                        >
                          <item.icon
                            className={`h-6 w-6 shrink-0 ${
                              isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-600'
                            }`}
                          />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
              <li className="mt-auto">
                <div className="p-2 border-t">
                  <div className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-gray-900">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Settings className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="sr-only">Váš profil</span>
                    <span aria-hidden="true">{user.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="w-full justify-start text-gray-700 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Odhlásit se
                  </Button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-4 shadow-sm">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">VK</span>
            </div>
            <span className="font-semibold text-gray-900">Admin</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Package className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile menu */}
        {sidebarOpen && (
          <div className="bg-white border-b shadow-sm">
            <nav className="px-4 py-2 space-y-1">
              {adminNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
} 