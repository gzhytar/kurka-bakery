import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Phone, Mail, Calendar } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kontakt
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Najdete nás v Brně-Jundrově. Vyzvedávání objednávek každé úterý a pátek.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Address & Pickup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                  Adresa a vyzvedávání
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Vypečená Kůrka</h4>
                  <p className="text-gray-600">
                    Kopretinova 17<br />
                    623 00 Brno-Jundrov<br />
                    Česká republika
                  </p>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-orange-600" />
                    Výdejní doba
                  </h4>
                  <div className="space-y-1 text-gray-600">
                    <p><strong>Úterý:</strong> 15:00 - 18:00</p>
                    <p><strong>Pátek:</strong> 15:00 - 18:00</p>
                    <p className="text-sm text-orange-600 mt-2">
                      ⚠️ Vyzvedávání pouze v den pečení
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Parkování</h4>
                  <p className="text-gray-600 text-sm">
                    Zdarma před domem nebo v přilehlých ulicích. 
                    Vstup je ze dvorku za domem.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Phone className="w-5 h-5 mr-2 text-orange-600" />
                  Kontaktní údaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">+420 123 456 789</p>
                    <p className="text-sm text-gray-600">Volejte v pracovní dny 9:00-17:00</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">info@vypecenakurka.cz</p>
                    <p className="text-sm text-gray-600">Odpovídáme do 24 hodin</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button asChild className="w-full">
                    <a href="mailto:info@vypecenakurka.cz">
                      Napsat email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Baking Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                  Harmonogram pečení
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-600 mb-2">ÚTERÝ</h4>
                    <p className="text-sm text-gray-600 mb-2">Pečení: 6:00 - 14:00</p>
                    <p className="text-sm text-gray-600">Výdej: 15:00 - 18:00</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-600 mb-2">PÁTEK</h4>
                    <p className="text-sm text-gray-600 mb-2">Pečení: 6:00 - 14:00</p>
                    <p className="text-sm text-gray-600">Výdej: 15:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Tip:</strong> Objednávky uzavíráme vždy v 20:00 předchozího dne. 
                    Pro úterní pečení do pondělí, pro páteční do čtvrtka.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Jak se k nám dostanete</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Google Maps Embed */}
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.6804902577273!2d16.55894791255111!3d49.201781371261426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47129682b7ff2323%3A0xcb5b35ca34e39583!2sKopretinov%C3%A1%2017%2C%20637%2000%20Brno-Jundrov!5e1!3m2!1sen!2scz!4v1751066345402!5m2!1sen!2scz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa - Vypečená Kůrka"
                  />
                </div>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <p><strong>🚗 Autem:</strong> Z centra Brna směr Jundrov, Kopretinova je vedlejší ulice od Jihlavské.</p>
                  <p><strong>🚌 MHD:</strong> Autobus č. 67, zastávka "Jundrov, Kopretinova" (2 min chůze)</p>
                  <p><strong>🚲 Na kole:</strong> Cyklostezka podél řeky Svratky, odbočka u Jundrova</p>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Důležité informace</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <p>Vstup do pekárny je ze dvorku za domem, ne z hlavní ulice</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <p>Prosím, dostavte se včas - nevyzvednuté objednávky neuchováváme</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <p>Při vyzvedávání mějte připravené číslo objednávky</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <p>Hotovost prosím připravte přesně nebo v malých bankovkách</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 