import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Award, Users } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Mock product data - in real app, this would come from Firebase
const getProductBySlug = (slug: string) => {
  const products = {
    'chleb-psenicno-zitny': {
      id: '1',
      slug: 'chleb-psenicno-zitny',
      name: 'Chléb pšenično-žitný',
      description: 'Náš nejoblíbenější chléb kombinující chuť pšeničné a žitné mouky. Pečen tradičním způsobem s přírodním kváskem, má příjemnou kyselkavou chuť a dlouhou trvanlivost.',
      priceCents: 8500,
      imagePath: '/chleba.jpg',
      isActive: true,
      createdAt: new Date(),
      details: {
        weight: '800g',
        ingredients: 'Pšeničná mouka typu 650, žitná mouka typu 1150, voda, sůl, přírodní kvásek',
        nutritionPer100g: {
          energy: '245 kcal',
          protein: '8.2g',
          carbs: '48.5g',
          fat: '1.8g',
          fiber: '5.2g'
        },
        allergens: 'Obsahuje lepek',
        storage: 'Skladujte v suchu při pokojové teplotě. Spotřebujte do 5 dnů.',
        servingSize: '4-6 osob'
      }
    }
  };
  
  return products[slug as keyof typeof products] || null;
};

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Produkt nenalezen</h1>
            <p className="text-gray-600 mb-6">
              Omlouváme se, ale tento produkt neexistuje.
            </p>
            <Link href="/shop">
              <Button>Zpět do obchodu</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/shop" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zpět do obchodu
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-orange-600">
              {formatPrice(product.priceCents)}
            </span>
            <Badge variant="secondary" className="text-sm">
              {product.details.weight}
            </Badge>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <div className="text-sm font-medium">{product.details.servingSize}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Award className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <div className="text-sm font-medium">Kváskový</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <div className="text-sm font-medium">Čerstvý</div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Přidat do košíku</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Vyberte den pečení na stránce obchodu a přidejte tento produkt do košíku.
              </p>
              <Link href="/shop">
                <Button className="w-full">
                  Přejít do obchodu
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Složení</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              {product.details.ingredients}
            </p>
            <p className="text-xs text-gray-500">
              <strong>Alergeny:</strong> {product.details.allergens}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Výživové hodnoty (na 100g)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Energetická hodnota:</span>
                <span>{product.details.nutritionPer100g.energy}</span>
              </div>
              <div className="flex justify-between">
                <span>Bílkoviny:</span>
                <span>{product.details.nutritionPer100g.protein}</span>
              </div>
              <div className="flex justify-between">
                <span>Sacharidy:</span>
                <span>{product.details.nutritionPer100g.carbs}</span>
              </div>
              <div className="flex justify-between">
                <span>Tuky:</span>
                <span>{product.details.nutritionPer100g.fat}</span>
              </div>
              <div className="flex justify-between">
                <span>Vláknina:</span>
                <span>{product.details.nutritionPer100g.fiber}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Skladování a spotřeba</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              {product.details.storage}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 