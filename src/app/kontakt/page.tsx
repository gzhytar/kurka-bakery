import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Calendar } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Kontakt a vyzvednutí</h1>
          <p className="text-xl text-gray-600">
            Všechny důležité informace o vyzvednutí objednávek a kontaktu na nás
          </p>
        </div>

        {/* Pickup Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-orange-600" />
                Místo vyzvednutí
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Adresa</h3>
                <p className="text-gray-600">
                  Kopretinova 17<br />
                  Brno-Jundrov, 637 00<br />
                  Česká republika
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Instrukce</h3>
                <p className="text-gray-600 text-sm">
                  Vyzvednutí probíhá u rodinného domu na adrese Kopretinova 17. 
                  Prosím zazvoňte na zvonek a počkejte u vchodu. 
                  Při vyzvednutí prosím sdělte jméno z objednávky.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-orange-600" />
                Otevírací doba
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Vyzvednutí objednávek</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Úterý (pečení)</span>
                    <span>16:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pátek (pečení)</span>
                    <span>16:00 - 19:00</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Důležité:</strong> Vyzvednutí je možné pouze v den pečení 
                  v uvedených hodinách. Prosím doražte včas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Baking Schedule */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-orange-600" />
              Plán pečení
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Úterní pečení</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Objednávky do pondělí 20:00</li>
                  <li>• Pečení v úterý ráno</li>
                  <li>• Vyzvednutí úterý 16:00-19:00</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Páteční pečení</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Objednávky do čtvrtka 20:00</li>
                  <li>• Pečení v pátek ráno</li>
                  <li>• Vyzvednutí pátek 16:00-19:00</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-6 w-6 text-orange-600" />
                Telefon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">+420 xxx xxx xxx</p>
              <p className="text-sm text-gray-500">
                Volejte prosím pouze v případě problémů s vyzvednutím
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-orange-600" />
                E-mail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">info@vypecenakurka.cz</p>
              <p className="text-sm text-gray-500">
                Pro obecné dotazy a informace o našich chlebech
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <Card>
          <CardHeader>
            <CardTitle>Mapa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Mapa místa vyzvednutí</p>
                <p className="text-sm">Kopretinova 17, Brno-Jundrov</p>
                <p className="text-xs mt-2">
                  (Mapa bude integrována v produkční verzi)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Důležité informace</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>• Prosím přijďte v uvedených hodinách vyzvednutí</li>
              <li>• Máte-li problém s vyzvednutím, kontaktujte nás předem</li>
              <li>• Při vyzvednutí uveďte jméno z objednávky</li>
              <li>• Nevyzvednuté objednávky nelze vrátit následující den</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 