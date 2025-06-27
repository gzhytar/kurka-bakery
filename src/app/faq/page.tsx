import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FAQPage() {
  const faqs = [
    {
      question: 'Kdy a kde si můžu vyzvednout objednávku?',
      answer: 'Chleby pečeme každé úterý a pátek. Vyzvednutí je možné na adrese Kopretinova 17, Brno-Jundrov od 16:00 do 19:00 v den pečení.'
    },
    {
      question: 'Jak dlouho dopředu musím objednat?',
      answer: 'Doporučujeme objednat nejpozději den před plánovaným vyzvednutím do 20:00. Pro úterní pečení tedy do pondělí 20:00, pro páteční do čtvrtka 20:00.'
    },
    {
      question: 'Jak dlouho vydrží chléb čerstvý?',
      answer: 'Náš kváskový chléb vydrží čerstvý 5-7 dní při správném skladování. Doporučujeme uložit ho v papírovém sáčku nebo textilním pytlíku na tmavém, suchém místě.'
    },
    {
      question: 'Obsahují vaše chleby konzervační látky?',
      answer: 'Ne, naše chleby neobsahují žádné konzervační látky, umělá barviva ani jiné chemické přísady. Používáme pouze mouku, vodu, sůl a přírodní kvásek.'
    },
    {
      question: 'Můžu si objednat speciální druh chleba?',
      answer: 'Momentálně nabízíme pevnou nabídku chlebů. Pokud máte speciální požadavky, kontaktujte nás a rádi se pokusíme vyhovět.'
    },
    {
      question: 'Jak platím za objednávku?',
      answer: 'Platba probíhá online při objednávce prostřednictvím bezpečné platební brány Stripe. Přijímáme platební karty a některé další platební metody.'
    },
    {
      question: 'Co když si nestihnu vyzvednout objednávku?',
      answer: 'Pokud si nestihnete vyzvednout objednávku v den pečení, kontaktujte nás co nejdříve. Pokusíme se najít řešení, ale chléb má omezenou trvanlivost.'
    },
    {
      question: 'Nabízíte dovoz?',
      answer: 'Momentálně nabízíme pouze osobní vyzvednutí na našem výdejním místě. V budoucnu plánujeme rozšířit služby o možnost dovozu.'
    },
    {
      question: 'Jsou vaše chleby vhodné pro vegetariány/vegany?',
      answer: 'Ano, všechny naše chleby jsou vhodné pro vegetariány i vegany. Nepoužíváme žádné živočišné produkty - jen mouku, vodu, sůl a přírodní kvásek.'
    },
    {
      question: 'Obsahují vaše chleby lepek?',
      answer: 'Ano, naše chleby obsahují lepek, protože používáme pšeničnou a žitnou mouku. Momentálně nenabízíme bezlepkové varianty.'
    },
    {
      question: 'Můžu chléb zmrazit?',
      answer: 'Ano, náš chléb se velmi dobře zmrazuje. Doporučujeme ho nakrájet před zmrazením a pak rozmrazovat pouze potřebné množství.'
    },
    {
      question: 'Jak poznám, že je chléb čerstvý?',
      answer: 'Čerstvý chléb má křupavou kůrku, která při poklepání dutě zní, a měkkou, pružnou střídku. Naše chleby jsou vždy čerstvé v den vyzvednutí.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Často kladené otázky</h1>
          <p className="text-xl text-gray-600">
            Najděte odpovědi na nejčastější otázky o naší pekárně a našich chlebech
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-orange-50">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Nenašli jste odpověď?</h3>
            <p className="text-gray-600 mb-6">
              Pokud máte další otázky, neváhejte se na nás obrátit. Rádi vám pomůžeme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <div>
                <strong>Vyzvednutí:</strong> Kopretinova 17, Brno-Jundrov
              </div>
              <div>
                <strong>Dny pečení:</strong> Úterý & Pátek, 16:00-19:00
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 