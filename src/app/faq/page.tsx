'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface FAQItem {
  question: string
  answer: string
  category: 'objednavky' | 'produkty' | 'vyzvedavani' | 'platby'
}

const faqData: FAQItem[] = [
  {
    question: 'Jak funguje objednávání?',
    answer: 'Objednávky přijímáme online přes náš e-shop. Vyberte si den pečení (úterý nebo pátek), přidejte produkty do košíku a dokončete objednávku. Platbu můžete provést online kartou nebo hotově při vyzvedávání.',
    category: 'objednavky'
  },
  {
    question: 'Do kdy mohu objednat?',
    answer: 'Objednávky přijímáme do 20:00 předchozího dne. Pro úterní pečení tedy do pondělí 20:00, pro páteční pečení do čtvrtka 20:00.',
    category: 'objednavky'
  },
  {
    question: 'Mohu objednávku zrušit nebo změnit?',
    answer: 'Objednávku můžete zrušit nebo upravit nejpozději do 20:00 předchozího dne. Kontaktujte nás na emailu nebo telefonu. Po tomto termínu již změny nejsou možné.',
    category: 'objednavky'
  },
  {
    question: 'Jaký je rozdíl mezi jednotlivými druhy chleba?',
    answer: 'Pšenično-žitný chléb je náš klasik s vyváženou chutí. Žitný chléb má výraznější, kyselkavou chuť. Vícezrnný je obohacený o semínka. Bezlepkový je vyroben z alternativních mouk pro osoby s celiakií.',
    category: 'produkty'
  },
  {
    question: 'Jak dlouho vydrží chléb čerstvý?',
    answer: 'Náš chléb vydrží čerstvý 3-5 dní při pokojové teplotě v látkové tašce nebo papíru. Nedoporučujeme skladování v plastových sáčcích. Můžete ho také nakrájet a zmrazit.',
    category: 'produkty'
  },
  {
    question: 'Obsahují produkty alergeny?',
    answer: 'Všechny naše produkty obsahují lepek. Některé mohou obsahovat stopy mléka a vajec. Bezlepkový chléb je vyráběn v oddělené části pekárny, ale nemůžeme zaručit 100% bezlepkovost kvůli možné křížové kontaminaci.',
    category: 'produkty'
  },
  {
    question: 'Kde a kdy mohu vyzvednout objednávku?',
    answer: 'Objednávky vyzvedávejte na adrese Kopretinova 17, Brno-Jundrov. Výdej je v den pečení od 15:00 do 18:00. Prosím, dostavte se včas, nevyzvednuté objednávky neuchováváme do dalšího dne.',
    category: 'vyzvedavani'
  },
  {
    question: 'Můžu si objednat rozvoz?',
    answer: 'Momentálně nabízíme pouze osobní vyzvedávání v naší pekárně. Rozvoz plánujeme zavést v budoucnu, zatím ale není dostupný.',
    category: 'vyzvedavani'
  },
  {
    question: 'Co když se nedostavím pro objednávku?',
    answer: 'Nevyzvednuté objednávky bohužel nemůžeme uchovat do dalšího dne. Pokud se nemůžete dostavit, můžete poslat někoho jiného s číslem objednávky. Platbu vracíme pouze v odůvodněných případech.',
    category: 'vyzvedavani'
  },
  {
    question: 'Jaké platební možnosti máte?',
    answer: 'Přijímáme platby online kartou přes Stripe nebo hotově při vyzvedávání. Online platba je rychlejší a bezpečnější. Faktury a účtenky vystavujeme na požádání.',
    category: 'platby'
  },
  {
    question: 'Můžu dostat fakturu?',
    answer: 'Ano, fakturu můžeme vystavit na požádání. Při objednávce uveďte v poznámce vaše fakturační údaje (název firmy, IČO, DIČ, adresu). Fakturu zašleme emailem.',
    category: 'platby'
  },
  {
    question: 'Vracíte peníze za zrušené objednávky?',
    answer: 'U online plateb vracíme peníze automaticky při zrušení objednávky do stanoveného termínu. Vrácení trvá 3-5 pracovních dní. U hotovostních plateb peníze vracíme při vyzvedávání.',
    category: 'platby'
  }
]

const categories = [
  { key: 'all', label: 'Všechny otázky' },
  { key: 'objednavky', label: 'Objednávání' },
  { key: 'produkty', label: 'Produkty' },
  { key: 'vyzvedavani', label: 'Vyzvedávání' },
  { key: 'platby', label: 'Platby' }
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [openItems, setOpenItems] = useState<number[]>([])

  const filteredFAQ = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Často kladené otázky
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Odpovědi na nejčastější dotazy ohledně objednávání, produktů a vyzvedávání
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <Card key={index} className="border shadow-sm">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </CardTitle>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </CardHeader>
              
              {openItems.includes(index) && (
                <CardContent className="pt-0">
                  <div className="border-t pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <Card className="mt-12 bg-orange-50 border-orange-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Nenašli jste odpověď na svou otázku?
            </h3>
            <p className="text-gray-600 mb-6">
              Neváhejte nás kontaktovat. Rádi vám odpovíme a pomůžeme s čímkoli potřebujete.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="mailto:info@vypecenakurka.cz">
                  Napsat email
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:+420123456789">
                  Zavolat: +420 123 456 789
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 