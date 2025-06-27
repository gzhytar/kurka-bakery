import { Hero } from '@/components/hero';
import { BreadCard } from '@/components/bread-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Award, MapPin, Heart } from 'lucide-react';
import Link from 'next/link';
import { formatDateISO, getNextBakeDays } from '@/lib/utils';

// Mock data - in real app, this would come from Firebase
const mockProducts = [
  {
    id: '1',
    slug: 'chleb-psenicno-zitny',
    name: 'Chléb pšenično-žitný',
    description: 'Tradiční chléb z pšeničné a žitné mouky s příjemnou kyselkavou chutí',
    priceCents: 8500,
    imagePath: '/chleba.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 12
  },
  {
    id: '2',
    slug: 'mikuska-klasicka',
    name: 'Mikuška klasická',
    description: 'Malý kulatý chléb ideální pro menší domácnosti',
    priceCents: 4500,
    imagePath: '/mikuska_1.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 8
  }
];

export default function HomePage() {
  const nextBakeDay = formatDateISO(getNextBakeDays(1)[0]);

  const uspTiles = [
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: 'Kváskový chléb',
      description: 'Všechny naše chleby jsou pečené tradičním způsobem s přírodním kváskem'
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: 'Pečeno v úterý & pátek',
      description: 'Čerstvý chléb každý úterý a pátek ráno připravený k vyzvednutí'
    },
    {
      icon: <MapPin className="h-8 w-8 text-orange-600" />,
      title: 'Brno-Jundrov',
      description: 'Vyzvednutí na adrese Kopretinova 17, Brno-Jundrov'
    },
    {
      icon: <Heart className="h-8 w-8 text-orange-600" />,
      title: 'S láskou pečeno',
      description: 'Každý chléb je pečen s pečlivostí a láskou k tradičnímu řemeslu'
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* USP Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proč si vybrat naše chleby?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specializujeme se na tradiční pečení kváskového chleba s využitím 
              moderních poznatků o fermentaci a kvalitních surovin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {uspTiles.map((tile, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {tile.icon}
                  </div>
                  <CardTitle className="text-lg">{tile.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{tile.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Naše chleby</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prohlédněte si náš výběr tradičních kváskových chlebů pečených 
              podle rodinných receptů.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {mockProducts.map((product) => (
              <BreadCard 
                key={product.id} 
                product={product} 
                selectedBakeDate={nextBakeDay}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/shop">
              <Button size="lg">
                Zobrazit celou nabídku
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Zůstaňte v kontaktu
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Přihlaste se k odběru novinek a dozvíte se jako první o nových druzích chleba
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Váš e-mail"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <Button variant="secondary">
              Přihlásit se
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
