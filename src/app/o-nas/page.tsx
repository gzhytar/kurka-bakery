import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Wheat, Clock, Users } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Láska k řemeslu',
    description: 'Pečení je pro nás více než jen práce - je to vášeň, kterou vkládáme do každého bochánku.'
  },
  {
    icon: Wheat,
    title: 'Kvalitní suroviny',
    description: 'Používáme pouze ty nejlepší mouky a přírodní ingredience od ověřených dodavatelů.'
  },
  {
    icon: Clock,
    title: 'Tradiční postupy',
    description: 'Respektujeme časem ověřené postupy a necháváme těstu dostatek času pro správné vyzrání.'
  },
  {
    icon: Users,
    title: 'Komunitní přístup',
    description: 'Jsme součástí místní komunity a rádi vytváříme osobní vztahy s našimi zákazníky.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="relative h-[400px] bg-orange-600">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Náš příběh
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Pekárna založená na tradici, vášni a lásce k dobrému chlebu
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Jak to všechno začalo
            </h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                Vypečená Kůrka vznikla v roce 2020 z lásky ke kvalitnímu chlebu a tradičním recepturám. 
                Vše začalo v naší domácí kuchyni, kde jsme experimentovali s různými druhy kvásků a mouk.
              </p>
              <p>
                Postupně jsme si uvědomili, že v našem okolí chybí pekárna, která by se soustředila 
                na ruční výrobu podle tradičních postupů. Rozhodli jsme se tento problém vyřešit a 
                založili jsme malou pekárnu v Brně-Jundrově.
              </p>
              <p>
                Dnes pečeme dva dny v týdnu - v úterý a v pátek. Tento rytmus nám umožňuje věnovat 
                dostatek času každé šarži a zachovat vysokou kvalitu všech našich produktů.
              </p>
              <p>
                Naší misí je přinášet lidem čerstvý, chutný a zdravý chléb, který je vyroben 
                s respektem k tradici a s použitím pouze kvalitních přírodních surovin.
              </p>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/mikuska_2.jpg"
              alt="Naše pekařka při práci"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-[400px]"
            />
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900">
                Míša při práci s kváskem
              </p>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Naše hodnoty
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tyto principy nás vedou každý den a jsou základem všeho, co děláme
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Jak pečeme
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Náš proces pečení kombinuje tradiční techniky s moderní hygienou
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Příprava kvasu</h3>
                <p className="text-gray-600 text-sm">
                  Kvas připravujeme několik dní předem. Krmíme ho každý den, 
                  aby získal správnou sílu a chuť.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Hnětení těsta</h3>
                <p className="text-gray-600 text-sm">
                  Těsto hněteme pomalu a šetrně, aby se vytvořila správná 
                  struktura lepkové sítě.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Dlouhé kvašení</h3>
                <p className="text-gray-600 text-sm">
                  Necháváme těsto kvasit 12-24 hodin pro rozvoj chuti a 
                  lepší stravitelnost.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Náš tým
          </h2>
          
          <div className="max-w-md mx-auto">
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 text-center">
                <Image
                  src="/mikuska_1.jpg"
                  alt="Míša - hlavní pekařka"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-xl mb-2">Míša</h3>
                <p className="text-orange-600 font-medium mb-3">Hlavní pekařka a zakladatelka</p>
                <p className="text-gray-600 text-sm">
                  "Pečení je moje vášeň už od dětství. Věřím, že dobrý chléb může 
                  udělat den krásným a spojit lidi u stolu."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 