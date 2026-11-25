// `correct` is de index van het juiste antwoord.
const leesopdrachten = [
  {
    id: 'schat',
    title: 'De mysterieuze schat',
    passage: [
      'Op een regenachtige woensdag vond Lina een sleutel onder de keukentafel. Er hing een briefje aan: ‘Zoek waar de appels slapen.’ Lina dacht aan de appelboom in de tuin, maar daar lag niets. Toen zag ze door het kelderraam de houten kratten waarin opa zijn appels bewaarde.',
      'In de kelder stond achter de kratten een oud kistje. De sleutel paste precies. Lina tilde het deksel op. In het kistje lagen een foto van opa als kind, een zakje appelpitten en een tweede briefje. ‘Plant er eentje,’ stond erop. ‘Dan groeit jouw schat vanzelf.’',
      'Lina riep haar broertje en samen stopten ze een pit in een pot. Ze zetten de pot op de vensterbank. Elke ochtend keek Lina of er al iets te zien was. Na twee weken stak er eindelijk een klein groen blaadje boven de aarde uit.'
    ],
    questions: [
      {
        question: 'Waar vindt Lina de sleutel?',
        options: ['In een houten krat', 'Onder de keukentafel', 'Op de vensterbank', 'Achter het kelderraam'],
        correct: 1,
        explanation: 'Onder de keukentafel lag de sleutel met het briefje eraan.'
      },
      {
        question: 'Waar vindt Lina het oude kistje?',
        options: ['Onder de keukentafel', 'Naast de appelboom', 'Op de vensterbank', 'Achter de kratten in de kelder'],
        correct: 3,
        explanation: 'In de tekst staat dat het kistje achter de kratten in de kelder stond.'
      },
      {
        question: 'Waarom staat er dat de schat vanzelf groeit?',
        options: ['Uit de appelpit kan een appelboom groeien.', 'Opa verstopt elke dag iets in het kistje.', 'De regen maakt het kistje groter.', 'De appels in de kelder worden groter.'],
        correct: 0,
        explanation: 'Op het einde komt er al een groen blaadje uit de pit.'
      }
    ]
  },
  {
    id: 'bos',
    title: 'Dieren in het bos',
    passage: [
      'Milan ging vroeg met zijn klas naar het bos. Boswachter Aïsha vroeg iedereen om even stil te staan. “Veel dieren zie je pas als je rustig kijkt,” zei ze. Eerst hoorden de kinderen alleen de wind. Toen klonk er getik hoog uit een boom. Een specht zocht insecten onder de schors.',
      'Bij een modderpoel wees Aïsha twee afdrukken aan. De grote, gespleten afdrukken waren van een ree. Naast het water liep een rij kleine pootafdrukken naar een struik. “Een vos kan hier geweest zijn,” zei ze. “Aan een afdruk alleen weet je dat niet altijd zeker.”',
      'Op de terugweg zag Milan een eekhoorn een noot begraven. Aïsha vertelde dat eekhoorns voedsel verstoppen voor de winter. Sommige noten vinden ze nooit meer terug. Uit zo’n vergeten noot kan later een boom groeien.'
    ],
    questions: [
      { question: 'Waarom vraagt Aïsha de klas om stil te staan?', options: ['Om op de bus te wachten', 'Om dieren makkelijker op te merken', 'Om een foto te maken'], correct: 1 },
      { question: 'Welk dier maakt het getik?', options: ['Een vos', 'Een ree', 'Een specht'], correct: 2 },
      { question: 'Wat zoekt de specht?', options: ['Insecten onder de schors', 'Nootjes in de modder', 'Takjes op het pad'], correct: 0 },
      { question: 'Van welk dier zijn de grote afdrukken?', options: ['Een eekhoorn', 'Een ree', 'Een specht'], correct: 1 },
      { question: 'Waar gaan de kleine afdrukken naartoe?', options: ['Naar de klas', 'Naar een grote boom', 'Naar een struik'], correct: 2 },
      { question: 'Is Aïsha zeker dat er een vos was?', options: ['Nee, de afdrukken geven geen zekerheid', 'Ja, ze heeft de vos gezien', 'Ja, er zijn vossenveren gevonden'], correct: 0 },
      { question: 'Waarom begraaft de eekhoorn de noot?', options: ['Om de specht te lokken', 'Als voedsel voor de winter', 'Om de modderpoel te vullen'], correct: 1 },
      { question: 'Wat kan uit een vergeten noot groeien?', options: ['Een paddenstoel', 'Een struik met bessen', 'Een boom'], correct: 2 }
    ]
  },
  {
    id: 'kasteel',
    title: 'Het geheim van het verlaten kasteel',
    passage: [
      'Op een regenachtige zaterdag liep Milan met Emma naar het oude kasteel. Tijdens de dorpswandeling was de poort open. In de zaal merkten ze dat één tegel veel schoner was dan de rest. Emma hield haar zaklamp dichterbij en zag een klein teken: een vogel met gespreide vleugels.',
      'Aan de muur hing een schilderij van een vogel met hetzelfde teken. Achter het schilderij zat een brief. “Ga naar de plek waar je de zon het eerst ziet,” stond erop. Milan wilde naar de hoogste toren, maar Emma dacht aan het oosten. Daar komt de zon op.',
      'Aan de oostkant vonden ze een raam met rood glas. Toen het zonlicht na de regen door het glas viel, verscheen er een rode vlek op een smalle houten deur. Ze vroegen de gids of ze de deur mochten openen. Binnen lagen boeken, brieven en tekeningen van de mensen die ooit in het kasteel woonden.',
      'De gids vertelde dat de kamer lang gesloten was geweest. Een van de brieven bleek geschreven door een meisje van Milans leeftijd. Ze had precies beschreven hoe ze als kind door dezelfde zaal rende. Milan keek opnieuw naar de zaal. Opeens kon hij zich voorstellen hoe druk het er vroeger was geweest.'
    ],
    questions: [
      { question: 'Waarom konden Milan en Emma het kasteel in?', options: ['De poort was open voor de dorpswandeling', 'Ze hadden zelf een sleutel', 'Ze kropen door een raam'], correct: 0 },
      { question: 'Wat valt hen op aan de tegel?', options: ['Hij is helemaal gebroken', 'Hij is schoner dan de andere tegels', 'Hij ligt buiten op het pad'], correct: 1 },
      { question: 'Welk teken staat op de tegel?', options: ['Een zon met een gezicht', 'Een tak met rode bladeren', 'Een vogel met gespreide vleugels'], correct: 2 },
      { question: 'Waar vinden ze de brief?', options: ['Achter het schilderij', 'Onder de tegel', 'Naast de ingang'], correct: 0 },
      { question: 'Waarom denkt Emma aan het oosten?', options: ['Daar staat de hoogste toren', 'Daar komt de zon op', 'Daar ligt het dorp'], correct: 1 },
      { question: 'Welke kleur heeft het glas in het raam?', options: ['Blauw', 'Groen', 'Rood'], correct: 2 },
      { question: 'Hoe ontdekken ze de houten deur?', options: ['Zonlicht door het glas valt erop', 'Ze horen iemand kloppen', 'Een vogel vliegt ernaartoe'], correct: 0 },
      { question: 'Aan wie vragen ze of ze de deur mogen openen?', options: ['Aan een buurvrouw', 'Aan de gids', 'Aan de schilder'], correct: 1 },
      { question: 'Wat vinden ze in de kamer?', options: ['Munten en juwelen', 'Nieuwe meubels', 'Boeken, brieven en tekeningen'], correct: 2 },
      { question: 'Waarom ziet Milan de zaal op het einde anders?', options: ['Door de brief kan hij zich het vroegere leven voorstellen', 'De gids heeft de vloer vervangen', 'De zon verlicht ineens de hele zaal'], correct: 0 }
    ]
  }
];

const sjablonen = [
  {
    id: 'begrijpend-lezen',
    title: 'Begrijpend lezen',
    description: 'Laat leerlingen informatie terugvinden en conclusies trekken.',
    questions: ['Welke informatie lees je letterlijk in de tekst?', 'Wat kun je uit de tekst afleiden?', 'Welke zin helpt je om je antwoord te verklaren?']
  },
  {
    id: 'woordenschat',
    title: 'Woordenschat',
    description: 'Laat leerlingen de betekenis van woorden afleiden uit de tekst.',
    questions: ['Wat betekent het onderstreepte woord?', 'Welk woord betekent ongeveer hetzelfde?', 'Welke zin helpt je de betekenis te begrijpen?']
  }
];

const leerlingen = [
  ['Emma', 92], ['Lars', 85], ['Noah', 78], ['Ella', 76], ['Adam', 74], ['Amira', 88], ['Aya', 81],
  ['Finn', 69], ['Hannah', 84], ['Ilias', 72], ['Jules', 77], ['Kato', 83], ['Liam', 66], ['Lotte', 79],
  ['Mila', 86], ['Milan', 80], ['Nora', 75], ['Oscar', 70], ['Sofia', 78], ['Vince', 68], ['Yara', 77]
];
