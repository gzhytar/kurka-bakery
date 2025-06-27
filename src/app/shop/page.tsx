'use client';

import { useState } from 'react';
import { BreadCard } from '@/components/bread-card';
import { DateRadioGroup } from '@/components/date-radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateISO, getNextBakeDays } from '@/lib/utils';

// Mock data - in real app, this would come from Firebase
const mockProducts = [
  {
    id: '1',
    slug: 'chleb-psenicno-zitny',
    name: 'Chléb pšenično-žitný',
    description: 'Tradiční chléb z pšeničné a žitné mouky s příjemnou kyselkavou chutí. Pečen z kvalitní bio mouky.',
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
    description: 'Malý kulatý chléb ideální pro menší domácnosti. Křupavá kůrka, měkká střídka.',
    priceCents: 4500,
    imagePath: '/mikuska_1.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 8
  },
  {
    id: '3',
    slug: 'mikuska-velka',
    name: 'Mikuška velká',
    description: 'Větší varianta naší oblíbené mikušky pro větší rodiny.',
    priceCents: 6500,
    imagePath: '/mikuska_2.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 6
  },
  {
    id: '4',
    slug: 'chleb-zitny',
    name: 'Chléb žitný',
    description: '100% žitný chléb s intenzivní chutí a dlouhou trvanlivostí.',
    priceCents: 9000,
    imagePath: '/bread_2.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 4
  }
];

const mockStockData = {
  [formatDateISO(getNextBakeDays(1)[0])]: { remainingQty: 50, totalQty: 60 },
  [formatDateISO(getNextBakeDays(2)[0])]: { remainingQty: 60, totalQty: 60 },
  [formatDateISO(getNextBakeDays(3)[0])]: { remainingQty: 55, totalQty: 60 },
  [formatDateISO(getNextBakeDays(4)[0])]: { remainingQty: 60, totalQty: 60 },
};

export default function ShopPage() {
  const [selectedBakeDate, setSelectedBakeDate] = useState<string>(
    formatDateISO(getNextBakeDays(1)[0])
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Náš obchod</h1>
        <p className="text-gray-600 max-w-2xl">
          Vyberte si z naší nabídky tradičních kváskových chlebů. 
          Všechny chleby jsou pečené jen z kvalitních surovin a přírodního kvásku.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with date selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filtry</CardTitle>
            </CardHeader>
            <CardContent>
              <DateRadioGroup
                selectedDate={selectedBakeDate}
                onDateChange={setSelectedBakeDate}
                stockData={mockStockData}
              />
            </CardContent>
          </Card>
        </div>

        {/* Products grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <BreadCard 
                key={product.id} 
                product={product} 
                selectedBakeDate={selectedBakeDate}
              />
            ))}
          </div>
          
          {mockProducts.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500">
                  Pro vybraný den zatím nemáme žádné chleby k dispozici.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 