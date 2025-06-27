import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Clock, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Náš příběh</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jsme malá rodinná pekárna, která se specializuje na tradiční pečení 
            kváskového chleba v srdci Brna.
          </p>
        </div>

        {/* Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Jak to všechno začalo</h2>
            <p className="text-gray-600 leading-relaxed">
              Vypečená Kůrka vznikla z lásky k tradičnímu pečení a touhy přinést 
              do domácností kvalitní kváskový chléb. Vše začalo jako koníček – 
              experimentováním s přírodním kváskem a tradičními receptami.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Po měsících ladění receptur a perfektování techniky jsme se rozhodli 
              sdílet naše chleby s ostatními. To, co začalo v domácí kuchyni, 
              se postupně rozrostlo v malou pekárnu v Brně-Jundrově.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Dnes pečeme každé úterý a pátek čerstvý kváskový chléb pouze 
              z kvalitních surovin bez chemických přísad a konzervantů.
            </p>
          </div>
          
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/mikuska_2.jpg"
              alt="Náš příběh"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Naše hodnoty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Award className="h-10 w-10 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Kvalita</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Používáme pouze nejkvalitnější suroviny a dodržujeme tradiční postupy
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Heart className="h-10 w-10 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Láska k řemeslu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Každý chléb pečeme s pečlivostí a respektem k tradici
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Users className="h-10 w-10 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Komunita</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Jsme součástí místní komunity a rádi budujeme vztahy se zákazníky
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Clock className="h-10 w-10 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Tradice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Respektujeme tradiční postupy pečení a fermentace
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Jak pečeme</h2>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    Příprava kvásku
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Náš kvásek je živý organismus, o který se staráme každý den. 
                    Je základem chuti a kvality našich chlebů.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Fermentace
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Těsto fermentuje pomalu, často přes noc, což umožňuje 
                    plný rozvoj chuti a zlepšuje stravitelnost.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Pečení
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Pečeme při vysoké teplotě s párou, což vytváří charakteristickou 
                    křupavou kůrku a měkkou střídku.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <Card className="text-center bg-orange-50">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold mb-4">Kontaktujte nás</h3>
            <p className="text-gray-600 mb-4">
              Máte otázky o našich chlebech nebo by vás zajímalo něco více o našem procesu?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-sm">
                <strong>Vyzvednutí:</strong> Kopretinova 17, Brno-Jundrov
              </div>
              <div className="text-sm">
                <strong>Dny pečení:</strong> Úterý & Pátek
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 