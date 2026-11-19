// De eerste optie is telkens het juiste antwoord. De app wisselt de volgorde af.
const leesopdrachten = [
  {
    id: 'schat',
    title: 'De mysterieuze schat',
    passage: [
      'Op woensdag ruimde Noor samen met haar opa de zolder op. Achter een stapel oude kranten vond ze een blikken doos. In de doos zat geen goud, maar een getekende kaart van hun tuin. Op de kaart stond een kruis bij de appelboom.',
      'Noor ging meteen naar buiten met een schop. Bij de appelboom zag ze dat er pas gras was gezaaid. Opa vroeg haar om nog eens naar de kaart te kijken. Naast het kruis stond een klein pijltje. Het wees naar de stenen bank, niet naar de grond.',
      'Onder de bank zat een houten kistje vast met een touw. Er lagen foto’s in van de tuin, lang voordat Noor geboren was. Op één foto zat haar opa als kind op dezelfde bank. Op de achterkant had hij geschreven: “Bewaar wat je later nog eens wilt zien.”',
      'Noor vond het eerst jammer dat er geen munten in het kistje lagen. Toen opa vertelde hoe klein de appelboom vroeger was, kreeg ze een idee. Ze maakte een foto van hen samen op de bank. Die zou ze bij de andere foto’s leggen.'
    ],
    questions: [
      ['Waar vindt Noor de blikken doos?', 'Op zolder', 'Onder de bank', 'Bij de appelboom'],
      ['Wat zit er in de blikken doos?', 'Een getekende kaart', 'Een gouden munt', 'Een stuk touw'],
      ['Waarom graaft Noor uiteindelijk niet bij de appelboom?', 'Het pijltje wijst naar de bank', 'Ze heeft geen schop', 'Ze kan de boom niet vinden'],
      ['Wat wijst naar de stenen bank?', 'Een klein pijltje', 'Een touw', 'Een oude foto'],
      ['Hoe hangt het kistje onder de bank?', 'Met een touw', 'Met een ketting', 'Met een lint'],
      ['Wat zit in het houten kistje?', 'Oude foto’s van de tuin', 'Appelpitten', 'Kranten van zolder'],
      ['Wie zit er op de oude foto op de bank?', 'Opa als kind', 'Noor als peuter', 'Een buurman'],
      ['Waarom is Noor eerst teleurgesteld?', 'Ze verwachtte munten', 'De kaart is gescheurd', 'De bank is verdwenen'],
      ['Wat doet Noor aan het einde?', 'Ze maakt samen met opa een nieuwe foto', 'Ze verplaatst de bank', 'Ze plant een nieuwe boom'],
      ['Wat is in dit verhaal de echte schat?', 'Herinneringen aan de tuin', 'Het pas gezaaide gras', 'De schop van Noor']
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
      ['Waarom vraagt Aïsha de klas om stil te staan?', 'Om dieren makkelijker op te merken', 'Om op de bus te wachten', 'Om een foto te maken'],
      ['Welk dier maakt het getik?', 'Een specht', 'Een vos', 'Een ree'],
      ['Wat zoekt de specht?', 'Insecten onder de schors', 'Nootjes in de modder', 'Takjes op het pad'],
      ['Van welk dier zijn de grote afdrukken?', 'Een ree', 'Een eekhoorn', 'Een specht'],
      ['Waar gaan de kleine afdrukken naartoe?', 'Naar een struik', 'Naar de klas', 'Naar een grote boom'],
      ['Is Aïsha zeker dat er een vos was?', 'Nee, de afdrukken geven geen zekerheid', 'Ja, ze heeft de vos gezien', 'Ja, er zijn vossenveren gevonden'],
      ['Waarom begraaft de eekhoorn de noot?', 'Als voedsel voor de winter', 'Om de specht te lokken', 'Om de modderpoel te vullen'],
      ['Wat kan uit een vergeten noot groeien?', 'Een boom', 'Een paddenstoel', 'Een struik met bessen']
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
      ['Waarom konden Milan en Emma het kasteel in?', 'De poort was open voor de dorpswandeling', 'Ze hadden zelf een sleutel', 'Ze kropen door een raam'],
      ['Wat valt hen op aan de tegel?', 'Hij is schoner dan de andere tegels', 'Hij is helemaal gebroken', 'Hij ligt buiten op het pad'],
      ['Welk teken staat op de tegel?', 'Een vogel met gespreide vleugels', 'Een zon met een gezicht', 'Een tak met rode bladeren'],
      ['Waar vinden ze de brief?', 'Achter het schilderij', 'Onder de tegel', 'Naast de ingang'],
      ['Waarom denkt Emma aan het oosten?', 'Daar komt de zon op', 'Daar staat de hoogste toren', 'Daar ligt het dorp'],
      ['Welke kleur heeft het glas in het raam?', 'Rood', 'Blauw', 'Groen'],
      ['Hoe ontdekken ze de houten deur?', 'Zonlicht door het glas valt erop', 'Ze horen iemand kloppen', 'Een vogel vliegt ernaartoe'],
      ['Aan wie vragen ze of ze de deur mogen openen?', 'Aan de gids', 'Aan een buurvrouw', 'Aan de schilder'],
      ['Wat vinden ze in de kamer?', 'Boeken, brieven en tekeningen', 'Munten en juwelen', 'Nieuwe meubels'],
      ['Waarom ziet Milan de zaal op het einde anders?', 'Door de brief kan hij zich het vroegere leven voorstellen', 'De gids heeft de vloer vervangen', 'De zon verlicht ineens de hele zaal']
    ]
  }
];
