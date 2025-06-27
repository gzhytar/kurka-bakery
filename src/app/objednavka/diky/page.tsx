import Link from 'next/link'
import { CheckCircle, MapPin, Clock, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function OrderConfirmationPage() {
  // In production, this would get order details from URL params or session
  const mockOrderDetails = {
    orderNumber: 'VP-2024-001',
    customerEmail: 'zakaznik@example.com',
    bakeDate: '2025-07-01',
    items: [
      { name: 'Chléb pšenično-žitný', qty: 2, price: 8500 },
      { name: 'Chléb žitný', qty: 1, price: 9000 }
    ],
    total: 26000,
    paymentMethod: 'online',
    createdAt: new Date()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success header */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Děkujeme za objednávku!
          </h1>
          <p className="text-lg text-gray-600">
            Vaše objednávka byla úspěšně přijata a zpracována.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Detaily objednávky</span>
                  <Badge className="text-sm">{mockOrderDetails.orderNumber}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {mockOrderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.qty} ks</p>
                      </div>
                      <p className="font-medium">{(item.price * item.qty / 100).toFixed(0)} Kč</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Celkem:</span>
                    <span className="text-orange-600">{(mockOrderDetails.total / 100).toFixed(0)} Kč</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      {mockOrderDetails.paymentMethod === 'online' ? 'Platba byla úspěšně zpracována' : 'K platbě dojde při vyzvedávání'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Co bude dál?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Potvrzení e-mailem</h4>
                      <p className="text-sm text-gray-600">Na váš e-mail {mockOrderDetails.customerEmail} jsme zaslali potvrzení objednávky s číslem {mockOrderDetails.orderNumber}.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Pečení</h4>
                      <p className="text-sm text-gray-600">Vaše produkty upečeme čerstvé v úterý ráno od 6:00.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Připraveno k vyzvedávání</h4>
                      <p className="text-sm text-gray-600">Od 15:00 si můžete objednávku vyzvednout v naší pekárně.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pickup information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                  Vyzvedávání objednávky
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Adresa pekárny</h4>
                  <p className="text-gray-600">
                    Vypečená Kůrka<br />
                    Kopretinova 17<br />
                    623 00 Brno-Jundrov
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-orange-600" />
                    Čas vyzvedávání
                  </h4>
                  <div className="space-y-1 text-gray-600">
                    <p><strong>Úterý 1. července 2025</strong></p>
                    <p>15:00 - 18:00</p>
                    <p className="text-sm text-orange-600 mt-2">
                      ⚠️ Prosím, dostavte se včas. Nevyzvednuté objednávky neuchováváme.
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Důležité informace</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Vstup do pekárny je ze dvorku za domem</li>
                    <li>• Mějte připravené číslo objednávky: <strong>{mockOrderDetails.orderNumber}</strong></li>
                    <li>• Parkování zdarma před domem</li>
                    <li>• {mockOrderDetails.paymentMethod === 'cash' ? 'Připravte si prosím přesnou částku hotově' : 'Platba již byla zpracována online'}</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Potřebujete pomoct?</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3" />
                      <span>+420 123 456 789</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3" />
                      <span>info@vypecenakurka.cz</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Děkujeme za důvěru!
                </h3>
                <p className="text-gray-600 mb-6">
                  Jsme rádi, že jste si vybrali naše produkty. Těšíme se na vás v úterý!
                </p>
                <div className="space-y-3">
                  <Link href="/shop">
                    <Button className="w-full">
                      Nakoupit znovu
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Zpět na hlavní stránku
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 