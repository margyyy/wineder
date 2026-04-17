import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedWine = {
  name: string;
  slug: string;
  color: "red" | "white" | "rose";
  alcoholPercent: number;
  vintage: number;
  bodyScore: number;
  aromaTags: string;
  priceRangeMin: number;
  priceRangeMax: number;
  imageUrl: string;
  productionDescription: string;
  dolcezza: number;
  acidita: number;
  tannini: number;
  corpo: number;
  alcol: number;
  effervescenza: number;
  fruttato: number;
  floreale: number;
  speziato: number;
  terroso: number;
  legnoso: number;
  minerale: number;
};

type SeedWinery = {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  category: "winery";
  website: string;
  wines: SeedWine[];
};

const IMG = {
  redBold: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
  redMed: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=600&q=80",
  redLight: "https://images.unsplash.com/photo-1474722883778-792e7b5dcd3c?auto=format&fit=crop&w=600&q=80",
  white: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
  whiteCrisp: "https://images.unsplash.com/photo-1506377247-bfe430b0f4de?auto=format&fit=crop&w=600&q=80",
};

const wineries: SeedWinery[] = [
  {
    name: "Pasqua Wine",
    slug: "pasqua-wine",
    lat: 45.4384,
    lng: 10.9916,
    category: "winery",
    website: "https://www.pasquawines.com",
    wines: [
      {
        name: "11 Minutes Rose",
        slug: "pasqua-11-minutes-rose",
        color: "red",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "rose,floral,red-fruit,citrus",
        priceRangeMin: 11,
        priceRangeMax: 15,
        imageUrl: IMG.redLight,
        productionDescription:
          "Undici minuti: tanto dura il tramonto sul lago di Garda quando il cielo si tinge di rosa fragola. Da quel momento magico nasce questo vino, vendemmiato a mano nelle prime ore del mattino per preservare la freschezza dei frutti rossi. Le uve corvina e rondinella, coltivate secondo principi di viticoltura sostenibile con riduzione drastica dei trattamenti chimici, vengono pigiate delicatamente e fermentate a temperatura controllata in acciaio inox. Nessun legno: solo la purezza del frutto, la vivacità dell'acidità naturale e un colore che ricorda petali di peonia al tramonto. Un vino nato per essere bevuto giovane, con la stessa leggerezza di una sera d'estate.",
        dolcezza: 0.2,
        acidita: 0.7,
        tannini: 0.1,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.7,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.1,
        minerale: 0.4,
      },
      {
        name: "Hey French You Could Have Made This But You Did Not",
        slug: "pasqua-hey-french",
        color: "red",
        alcoholPercent: 14,
        vintage: 2021,
        bodyScore: 4,
        aromaTags: "cherry,spice,oak,blackberry",
        priceRangeMin: 32,
        priceRangeMax: 45,
        imageUrl: IMG.redBold,
        productionDescription:
          "Un vino nato da una provocazione gentile — la dimostrazione che la Valpolicella sa fare ciò che la Francia insegna da secoli, con un'anima tutta italiana. Le uve corvina veronese vengono selezionate clonalmente nei vigneti più vecchi della tenuta, poi fermentate con lieviti indigeni che raccontano il terroir senza filtri. L'affinamento avviene per 18 mesi in barrique di rovere francese e per ulteriori 6 mesi in bottiglia, dove il vino impara il silenzio. In cantina si evitano interventi correttivi: nessuna acidificazione, nessuna concentrazione forzata. Solo pazienza. Il risultato è un rosso di carattere, con la struttura del grande Veneto e l'eleganza di chi non ha nulla da dimostrare, ma lo fa comunque.",
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.7,
        corpo: 0.8,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.2,
        speziato: 0.6,
        terroso: 0.4,
        legnoso: 0.7,
        minerale: 0.3,
      },
      {
        name: "PassioneSentimento Rosso",
        slug: "pasqua-passionesentimento-rosso",
        color: "red",
        alcoholPercent: 14,
        vintage: 2022,
        bodyScore: 4,
        aromaTags: "ripe-fruit,plum,vanilla,spice",
        priceRangeMin: 9,
        priceRangeMax: 14,
        imageUrl: IMG.redMed,
        productionDescription:
          "Ogni bottiglia di PassioneSentimento porta con sé una storia familiare: quella di una cantina che da tre generazioni sceglie di lavorare la terra con rispetto, senza fretta. Le uve — corvina, corvinone e merlot — crescono su colline argillose dove la biodiversità è considerata un valore produttivo: tra i filari si coltivano piante aromatiche che attraggono insetti utili e riducono la necessità di trattamenti. La vendemmia è rigorosamente manuale a fine settembre. Fermentazione in grandi vasche di cemento vetrificato — un materiale antico che mantiene il vino in contatto con le sue radici — e affinamento di 8 mesi in botti di rovere di Slavonia da 25 ettolitri. Un rosso caldo, generoso, che sa di domenica in campagna.",
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.6,
        corpo: 0.7,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.2,
        speziato: 0.5,
        terroso: 0.3,
        legnoso: 0.5,
        minerale: 0.2,
      },
    ],
  },
  {
    name: "Farina",
    slug: "farina",
    lat: 45.5145,
    lng: 10.8462,
    category: "winery",
    website: "https://www.farinawines.it",
    wines: [
      {
        name: "Amarone della Valpolicella Classico",
        slug: "farina-amarone-classico",
        color: "red",
        alcoholPercent: 15,
        vintage: 2019,
        bodyScore: 5,
        aromaTags: "dark-cherry,cocoa,tobacco,spice",
        priceRangeMin: 34,
        priceRangeMax: 50,
        imageUrl: IMG.redBold,
        productionDescription:
          "L'Amarone non si produce: si aspetta. Nella Valpolicella Classica, tra i colli di Fumane e Marano, le uve corvina, corvinone e oseleta vengono raccolte a mano in piccole cassette forate nella seconda settimana di ottobre. Poi inizia il silenzio dei fruttai: i grappoli vengono distesi su graticci di bambù in locali ventilati naturalmente, dove trascorrono 90 giorni ad appassire lentamente, perdendo quasi il 40% del loro peso. È un processo antichissimo, citato già dai Romani come «Rheticum» — il vino nobile della Rezia. La fermentazione che segue è lunga e difficile, perché i lieviti faticano nello zucchero concentrato. L'affinamento dura 3 anni: prima in botti grandi di rovere di Slavonia, poi in cemento, poi ancora in bottiglia. Farina ha abbracciato la viticoltura biologica certificata dal 2018: niente erbicidi, concimazione solo organica, rispetto del ciclo naturale della vigna.",
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.8,
        corpo: 0.9,
        alcol: 0.8,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.1,
        speziato: 0.6,
        terroso: 0.6,
        legnoso: 0.7,
        minerale: 0.3,
      },
      {
        name: "Valpolicella Ripasso Classico Superiore",
        slug: "farina-ripasso-classico-superiore",
        color: "red",
        alcoholPercent: 14,
        vintage: 2021,
        bodyScore: 4,
        aromaTags: "red-fruit,herbs,spice",
        priceRangeMin: 14,
        priceRangeMax: 22,
        imageUrl: IMG.redMed,
        productionDescription:
          "Il Ripasso è il vino del secondo atto: una tecnica tipicamente veronese, nata per non sprecare nulla. Dopo la produzione dell'Amarone, le vinacce ancora ricche di lieviti e sostanze aromatiche vengono conservate nelle vasche. Su di esse viene fatto ripassare — «ripasso», appunto — il Valpolicella fresco di fermentazione, che rimane a contatto per 15 giorni in una seconda fermentazione spontanea. Ne risulta un vino più complesso del Valpolicella base, ma più accessibile dell'Amarone: un ponte tra due mondi. Farina raccoglie le uve biologicamente certificate a 350 metri di altitudine, dove le escursioni termiche notturne preservano l'acidità e i profumi. Un vino onesto, nel senso più bello del termine: non nasconde niente, racconta tutto.",
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.6,
        corpo: 0.7,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.2,
        speziato: 0.6,
        terroso: 0.4,
        legnoso: 0.5,
        minerale: 0.3,
      },
      {
        name: "Lugana",
        slug: "farina-lugana",
        color: "white",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "citrus,white-flowers,mineral",
        priceRangeMin: 10,
        priceRangeMax: 16,
        imageUrl: IMG.white,
        productionDescription:
          "Sulle rive meridionali del Lago di Garda, dove l'acqua riflette il cielo e l'aria porta il profumo di oleandri e glicini, cresce il Trebbiano di Lugana — un'uva autoctona che non si trova in nessun altro posto al mondo. Le radici affondano in argille bianche e compatte che filtrano l'acqua e trattengono minerali preziosi: è da qui che nasce quel carattere saline e pietroso che distingue il Lugana da qualsiasi altro bianco italiano. La vendemmia avviene di notte, per preservare i profumi delicati dall'ossidazione del calore. La pressatura è soffice, la fermentazione lenta e a bassa temperatura in acciaio inox. Nessun passaggio in legno: solo acciaio e freddo, per raccontare il lago esattamente come natura lo ha immaginato.",
        dolcezza: 0.2,
        acidita: 0.7,
        tannini: 0,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.5,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.1,
        minerale: 0.7,
      },
    ],
  },
  {
    name: "Albino Armani",
    slug: "albino-armani",
    lat: 45.5608,
    lng: 11.1549,
    category: "winery",
    website: "https://www.albinoarmani.com",
    wines: [
      {
        name: "Pinot Grigio Colle Ara",
        slug: "albino-armani-pinot-grigio-colle-ara",
        color: "white",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "pear,white-peach,floral",
        priceRangeMin: 12,
        priceRangeMax: 18,
        imageUrl: IMG.whiteCrisp,
        productionDescription:
          "Il Colle Ara è un anfiteatro naturale di roccia e vento, a 400 metri di quota tra le Dolomiti e il Lago di Garda: un luogo dove il Pinot Grigio impara la disciplina. Albino Armani — cantina fondata nel 1607, tra le più antiche del Veneto — ha scelto da sempre di coltivare questa collina secondo i cicli della natura, rifiutando la comodità degli erbicidi. La potatura è corta, resa bassa: ogni pianta produce pochi grappoli, ma intensi. La raccolta avviene a mano, all'alba di settembre, quando i riflessi della rugiada ancora brillano sulle bucce grigio-rosa. In cantina, pressatura soffice e fermentazione a 16°C per tre settimane. Il vino riposa poi sur lies per quattro mesi, a contatto con i propri lieviti, acquistando quella rotondità morbida che nessun'altra tecnica sa dare.",
        dolcezza: 0.2,
        acidita: 0.6,
        tannini: 0,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.6,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.1,
        minerale: 0.5,
      },
      {
        name: "Amarone della Valpolicella Cuslanus",
        slug: "albino-armani-amarone-cuslanus",
        color: "red",
        alcoholPercent: 15,
        vintage: 2018,
        bodyScore: 5,
        aromaTags: "black-fruit,cocoa,balsamic,spice",
        priceRangeMin: 38,
        priceRangeMax: 58,
        imageUrl: IMG.redBold,
        productionDescription:
          "Cuslanus è il nome medievale del paese di Custoza: un omaggio alla terra, alla storia, alle radici profonde di una famiglia che fa vino da quattro secoli. Le uve per questo Amarone provengono dai vigneti più vecchi della tenuta, alcuni con oltre 50 anni di vita, dove le radici scavano fino a tre metri nel basalto vulcanico. Dopo la vendemmia manuale a metà ottobre, i grappoli riposano in fruttaio fino a gennaio: 90 giorni di appassimento su graticci di canna, sorvegliati ogni giorno come bambini. La fermentazione naturale dura 40 giorni. Poi il vino entra in botti da 2000 litri di rovere di Slavonia per tre anni, dove si addormenta e si risveglia più volte con le stagioni. Quattro anni dopo la vendemmia, il Cuslanus è pronto: profondo, complesso, con una longevità che sfida i decenni.",
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.8,
        corpo: 0.9,
        alcol: 0.8,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.1,
        speziato: 0.7,
        terroso: 0.6,
        legnoso: 0.8,
        minerale: 0.3,
      },
      {
        name: "Foja Tonda",
        slug: "albino-armani-foja-tonda",
        color: "red",
        alcoholPercent: 13.5,
        vintage: 2022,
        bodyScore: 3,
        aromaTags: "cherry,pepper,violet",
        priceRangeMin: 13,
        priceRangeMax: 20,
        imageUrl: IMG.redLight,
        productionDescription:
          "Foja Tonda — letteralmente «foglia rotonda» nel dialetto veronese — è un'uva quasi scomparsa: una varietà autoctona recuperata pazientemente da Albino Armani attraverso un progetto di ricerca genetica in collaborazione con l'Università di Verona. Negli anni '90, durante un inventario dei vigneti storici, fu ritrovata in un vecchio campo abbandonato: nessuno la coltivava più da decenni. Reimpiantata, studiata, amata. Oggi cresce su terrazze a 450 metri di quota, sostenuta da muretti a secco in pietra che la cantina restaura e mantiene come patrimonio paesaggistico. La vinificazione è minimale: fermentazione spontanea con lieviti indigeni, 12 mesi in botti grandi. Un vino raro che sa di memoria e di futuro, di biodiversità difesa con ostinazione.",
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.5,
        corpo: 0.5,
        alcol: 0.6,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.4,
        speziato: 0.5,
        terroso: 0.3,
        legnoso: 0.3,
        minerale: 0.3,
      },
    ],
  },
  {
    name: "Ca' Rugate",
    slug: "ca-rugate",
    lat: 45.4389,
    lng: 11.2257,
    category: "winery",
    website: "https://www.carugate.it",
    wines: [
      {
        name: "Soave Classico Monte Fiorentine",
        slug: "ca-rugate-soave-classico-monte-fiorentine",
        color: "white",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "citrus,almond,white-flowers",
        priceRangeMin: 13,
        priceRangeMax: 20,
        imageUrl: IMG.white,
        productionDescription:
          "C'è un colle a Montecchia di Crosara dove la terra sa di vulcano: basalto nero sotto un sottile strato di tufo bianco, suolo formatosi milioni di anni fa quando questo angolo di Veneto era fondo marino. È qui, sul Monte Fiorentine, che Ca' Rugate coltiva la Garganega che diventa il suo Soave più noto. La famiglia Tessari lavora queste vigne secondo agricoltura biologica certificata dal 2010: concime solo verde e animale, trattamenti solo a base di rame e zolfo, copertina erbosa tra i filari che protegge dal dilavamento e nutre le api selvatiche. La vendemmia è manuale in piccole cassette da 15 kg, eseguita in due passaggi selettivi. La fermentazione avviene a temperatura controllata in acciaio; il vino riposa poi quattro mesi sur lies prima dell'imbottigliamento senza filtrazione grossolana. Minerale, teso, verticale: il ritratto esatto del vulcano da cui nasce.",
        dolcezza: 0.2,
        acidita: 0.7,
        tannini: 0,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.6,
        floreale: 0.5,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.2,
        minerale: 0.7,
      },
      {
        name: "Amarone Punta 470",
        slug: "ca-rugate-amarone-punta-470",
        color: "red",
        alcoholPercent: 15,
        vintage: 2019,
        bodyScore: 5,
        aromaTags: "blackberry,spice,cocoa,dried-fruit",
        priceRangeMin: 42,
        priceRangeMax: 62,
        imageUrl: IMG.redBold,
        productionDescription:
          "470 è la quota in metri sul mare del vigneto da cui nasce questo Amarone: un appezzamento stretto e ripido nel cuore della Valpolicella Classica, dove la corvina fatica e per questo dà il meglio. A quell'altitudine le notti sono fresche anche in agosto, le uve maturano lentamente e i polifenoli si formano con pazienza. Vendemmia manuale la prima settimana di ottobre, selezione grappolo per grappolo. L'appassimento dura 120 giorni nei fruttai ventilati della cantina: due mesi in più rispetto alla media, una scelta coraggiosa che concentra gli aromi senza perdere freschezza. Fermentazione spontanea per 50 giorni, poi quattro anni in botti grandi di rovere di Slavonia. Ca' Rugate certifica la sostenibilità ambientale della propria filiera dal 2015 e ha eliminato completamente i diserbanti dal 2019. Il Punta 470 è il vino che li rappresenta meglio: alto, complesso, austero quanto basta per essere memorabile.",
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.8,
        corpo: 0.9,
        alcol: 0.8,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.1,
        speziato: 0.7,
        terroso: 0.5,
        legnoso: 0.8,
        minerale: 0.2,
      },
      {
        name: "Campo Lavei Valpolicella Superiore",
        slug: "ca-rugate-campo-lavei",
        color: "red",
        alcoholPercent: 14,
        vintage: 2021,
        bodyScore: 4,
        aromaTags: "red-cherry,herbs,spice",
        priceRangeMin: 18,
        priceRangeMax: 28,
        imageUrl: IMG.redMed,
        productionDescription:
          "«Campo Lavei» significa campo delle pietre nel dialetto locale: un riferimento diretto al terreno ciottoloso e povero dove questo Valpolicella Superiore affonda le radici. La povertà del suolo è una virtù — costringe la vite a scavare in profondità, a faticare, a concentrare nelle poche bacche tutto il sapore che riesce a estrarre. Le uve corvina, corvinone e rondinella vengono sottoposte a un breve appassimento di 20 giorni, tecnica intermedia tra il Valpolicella classico e il Ripasso: un metodo che la famiglia Tessari ha perfezionato in anni di sperimentazione silenziosa. Fermentazione in acciaio per 18 giorni con frequenti délestage, poi 18 mesi in botti grandi di rovere. Il risultato è un vino rosso di struttura media ma di grande bevibilità, capace di accompagnare una tavola dall'antipasto al formaggio.",
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.6,
        corpo: 0.7,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.2,
        speziato: 0.5,
        terroso: 0.4,
        legnoso: 0.5,
        minerale: 0.3,
      },
    ],
  },
  {
    name: "Zyme",
    slug: "zyme",
    lat: 45.5133,
    lng: 10.8208,
    category: "winery",
    website: "https://www.zyme.it",
    wines: [
      {
        name: "Kairos",
        slug: "zyme-kairos",
        color: "red",
        alcoholPercent: 15,
        vintage: 2020,
        bodyScore: 5,
        aromaTags: "black-fruit,balsamic,cocoa,spice",
        priceRangeMin: 70,
        priceRangeMax: 95,
        imageUrl: IMG.redBold,
        productionDescription:
          "Kairos è il tempo giusto, in greco antico: non il tempo che scorre, ma quello che si coglie. Celestino Gaspari — fondatore di Zyme dopo decenni di lavoro come enologo in grandi cantine — ha scelto questo nome per il suo vino più ambizioso, perché tutta la sua filosofia ruota attorno all'attesa del momento perfetto. Le uve sono un ensemble di 15 varietà autoctone veronesi, alcune quasi dimenticate, raccolte in vendemmie separate tra settembre e ottobre avanzato. L'appassimento è selettivo: ogni varietà ha il suo ritmo, la sua curva di perdita d'acqua, il suo momento di maturità ottimale. La fermentazione avviene in anfore di terracotta e piccole vasche aperte di cemento, senza controllo di temperatura, lasciando che il vino trovi il proprio equilibrio naturale. Affinamento di 36 mesi in barrique di diversa tostatura, poi 18 mesi in bottiglia. Zyme ha abbracciato la biodinamica: calendario lunare per le potature, preparati steineriani per il suolo, assoluto rispetto del ciclo vitale della vigna come ecosistema vivente.",
        dolcezza: 0.4,
        acidita: 0.4,
        tannini: 0.8,
        corpo: 0.9,
        alcol: 0.8,
        effervescenza: 0,
        fruttato: 0.8,
        floreale: 0.1,
        speziato: 0.8,
        terroso: 0.6,
        legnoso: 0.8,
        minerale: 0.3,
      },
      {
        name: "From Black to White",
        slug: "zyme-from-black-to-white",
        color: "white",
        alcoholPercent: 12.5,
        vintage: 2023,
        bodyScore: 2,
        aromaTags: "citrus,floral,mineral",
        priceRangeMin: 16,
        priceRangeMax: 24,
        imageUrl: IMG.whiteCrisp,
        productionDescription:
          "Il nome è un manifesto: da una terra di grandi rossi, Celestino Gaspari sceglie di raccontare il bianco. From Black to White nasce da Garganega e Trebbiano di Soave coltivati su suolo basaltico scuro — «nero» come la roccia vulcanica — e si trasforma in un vino di cristallina luminosità. Le uve crescono tra i filari dove Zyme pratica l'agricoltura biologica certificata: nessun pesticida di sintesi, copertura vegetale spontanea tutto l'anno, uso di insetti utili come antagonisti naturali. La raccolta notturna con selezione manuale preserva i terpeni volatili responsabili dei profumi floreali. In cantina, pressatura con pressa pneumatica a bassa pressione, decantazione statica a freddo e fermentazione con lieviti indigeni per 20 giorni. Quattro mesi sur lies con batonnage settimanale, poi imbottigliamento senza filtrazione. Un bianco minerale, dritto, che sa dove vuole andare.",
        dolcezza: 0.2,
        acidita: 0.7,
        tannini: 0,
        corpo: 0.3,
        alcol: 0.4,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.6,
        speziato: 0.1,
        terroso: 0.1,
        legnoso: 0.1,
        minerale: 0.8,
      },
      {
        name: "Oseleta",
        slug: "zyme-oseleta",
        color: "red",
        alcoholPercent: 14.5,
        vintage: 2021,
        bodyScore: 4,
        aromaTags: "dark-fruit,pepper,earth",
        priceRangeMin: 36,
        priceRangeMax: 52,
        imageUrl: IMG.redMed,
        productionDescription:
          "L'Oseleta è un'uva selvaggia: piccole bacche nere dure come pietra, pelle spessa, tannini decisi. Per secoli è stata usata solo in blend per dare colore e struttura, poi quasi abbandonata perché difficile da coltivare e vinificare. Zyme ha scelto di farne un vino in purezza — una scelta coraggiosa che pochi hanno osato. I vigneti sono impiantati su terreni morenici a 300 metri sul livello del mare, dove l'Oseleta ha trovato il suo habitat ideale: terreno povero e drenante, esposizione sud-ovest, vento costante che asciuga l'umidità e riduce le malattie. La gestione è biodinamica: potature eseguite con il calendario lunare, nessun input chimico di sintesi, letame bovino come unico fertilizzante. Fermentazione lunga in vasche aperte con follature manuali due volte al giorno — un lavoro fisico, quotidiano, antico. Poi 20 mesi in botti grandi. Il risultato è un vino austero e vivo, con tannini fini come seta e una persistenza che dura minuti.",
        dolcezza: 0.3,
        acidita: 0.5,
        tannini: 0.7,
        corpo: 0.7,
        alcol: 0.7,
        effervescenza: 0,
        fruttato: 0.7,
        floreale: 0.1,
        speziato: 0.6,
        terroso: 0.6,
        legnoso: 0.4,
        minerale: 0.2,
      },
    ],
  },
  {
    name: "Nomora",
    slug: "nomora",
    lat: 44.7004,
    lng: 8.0359,
    category: "winery",
    website: "https://www.nomora.it",
    wines: [
      {
        name: "Nomora Cuvée Rosé 0.0",
        slug: "nomora-cuvee-rose",
        color: "rose",
        alcoholPercent: 0,
        vintage: 2024,
        bodyScore: 1,
        aromaTags: "strawberry,raspberry,peach,citrus",
        priceRangeMin: 12,
        priceRangeMax: 18,
        imageUrl: IMG.redLight,
        productionDescription:
          "Nomora nasce ad Alba, nel cuore delle Langhe, con una missione chiara: portare il piacere del vino a chi sceglie di non bere alcol, senza compromessi sul gusto. La Cuvée Rosé 0.0 è prodotta da uve Pinot Nero e Merlot coltivate biologicamente sulle colline piemontesi. La vinificazione segue i metodi tradizionali fino alla fine — poi interviene la tecnologia della membrana osmotica, che rimuove l'alcol a freddo preservando intatti tutti gli aromi, i polifenoli e la complessità del vino. Il risultato è una bollicina rosata di straordinaria vivacità: fragole fresche, lampone, pesca matura e una nota di agrumi che rinfrescano il palato. Zero alcol, zero compromessi.",
        dolcezza: 0.3,
        acidita: 0.6,
        tannini: 0.05,
        corpo: 0.2,
        alcol: 0,
        effervescenza: 0.8,
        fruttato: 0.9,
        floreale: 0.6,
        speziato: 0.05,
        terroso: 0,
        legnoso: 0,
        minerale: 0.3,
      },
      {
        name: "Nomora Bianco 0.0",
        slug: "nomora-bianco",
        color: "white",
        alcoholPercent: 0,
        vintage: 2024,
        bodyScore: 1,
        aromaTags: "citrus,white-flowers,peach,mineral",
        priceRangeMin: 11,
        priceRangeMax: 16,
        imageUrl: IMG.white,
        productionDescription:
          "Il Bianco 0.0 di Nomora è la dimostrazione che un vino senza alcol può avere tensione, mineralità e carattere. Uve Garganega e Trebbiano piemontese, coltivate senza pesticidi di sintesi sui colli albesi, vengono vinificate a bassa temperatura per preservare i profumi delicati. La dealcolizzazione avviene tramite membrana osmotica — un processo fisico che non altera la struttura aromatica del vino. In bottiglia si percepiscono fiori bianchi, pesca bianca, un tocco di bergamotto e una mineralità quasi salina. Ideale per chi guida, per le donne in gravidanza, per chi ha scelto uno stile di vita senza alcol ma non vuole rinunciare alla cultura del vino.",
        dolcezza: 0.2,
        acidita: 0.65,
        tannini: 0,
        corpo: 0.2,
        alcol: 0,
        effervescenza: 0.3,
        fruttato: 0.7,
        floreale: 0.7,
        speziato: 0.05,
        terroso: 0.05,
        legnoso: 0,
        minerale: 0.6,
      },
    ],
  },
  {
    name: "Cantine Bosca",
    slug: "cantine-bosca",
    lat: 44.7136,
    lng: 8.2894,
    category: "winery",
    website: "https://www.cantinebosca.com",
    wines: [
      {
        name: "Bosca Toselli Bollicine Bianche 0.0",
        slug: "bosca-toselli-bianco",
        color: "white",
        alcoholPercent: 0,
        vintage: 2024,
        bodyScore: 1,
        aromaTags: "acacia,honey,peach,white-flowers",
        priceRangeMin: 7,
        priceRangeMax: 11,
        imageUrl: IMG.whiteCrisp,
        productionDescription:
          "Fondata nel 1831 a Canelli — la capitale piemontese dello spumante, oggi Patrimonio UNESCO — Cantine Bosca porta avanti una tradizione di oltre un secolo con lo sguardo al futuro. Le Bollicine Bianche Toselli 0.0 nascono da una spremitura soffice delle uve bianche piemontesi: il mosto viene raffreddato rapidamente a 0°C, impedendo qualsiasi fermentazione alcolica. Filtrazione a membrana e leggera dolcificazione naturale completano il processo. In bicchiere si apre un bouquet delicato di fiori d'acacia, miele, pesca e spezie lievi — un vino festoso e accessibile, perfetto per brindare senza alcol. Le Cattedrali Sotterranee di Bosca, scavate nel tufo sotto Canelli, testimoniano la profondità storica di questa cantina unica.",
        dolcezza: 0.4,
        acidita: 0.5,
        tannini: 0,
        corpo: 0.15,
        alcol: 0,
        effervescenza: 0.85,
        fruttato: 0.6,
        floreale: 0.7,
        speziato: 0.1,
        terroso: 0,
        legnoso: 0,
        minerale: 0.2,
      },
      {
        name: "Bosca Toselli Bollicine Rosse 0.0",
        slug: "bosca-toselli-rosso",
        color: "rose",
        alcoholPercent: 0,
        vintage: 2024,
        bodyScore: 1,
        aromaTags: "rose,peach,red-fruit,floral",
        priceRangeMin: 7,
        priceRangeMax: 11,
        imageUrl: IMG.redLight,
        productionDescription:
          "Le Bollicine Rosse Toselli di Bosca sono il brindisi senza alcol che profuma di petali di rosa e frutti rossi maturi. Prodotte con uve Brachetto e Barbera piemontesi attraverso il metodo a freddo senza fermentazione, mantengono tutta la fragranza e la dolcezza naturale del frutto. Il colore è un rubino rosato luminoso, le bollicine fini e persistenti. Al palato: ribes, fragolina di bosco, geranio e un finale pulito e rinfrescante. Bosca — con i suoi tunnel sotterranei scavati a mano nel XVIII secolo — ha trasformato la necessità di conservare il vino al fresco in un patrimonio culturale riconosciuto dall'UNESCO. Le Bollicine Rosse sono la versione moderna e accessibile di questa grande tradizione piemontese.",
        dolcezza: 0.5,
        acidita: 0.45,
        tannini: 0.05,
        corpo: 0.15,
        alcol: 0,
        effervescenza: 0.85,
        fruttato: 0.8,
        floreale: 0.75,
        speziato: 0.05,
        terroso: 0,
        legnoso: 0,
        minerale: 0.1,
      },
    ],
  },
];

async function seedWinery(wineryData: SeedWinery) {
  const winery = await prisma.winery.upsert({
    where: { slug: wineryData.slug },
    create: {
      name: wineryData.name,
      slug: wineryData.slug,
      lat: wineryData.lat,
      lng: wineryData.lng,
      category: wineryData.category,
      website: wineryData.website,
    },
    update: {
      name: wineryData.name,
      lat: wineryData.lat,
      lng: wineryData.lng,
      category: wineryData.category,
      website: wineryData.website,
    },
  });

  for (const wineData of wineryData.wines.slice(0, 3)) {
    await prisma.wine.upsert({
      where: { slug: wineData.slug },
      create: {
        ...wineData,
        wineryId: winery.id,
      },
      update: {
        ...wineData,
        wineryId: winery.id,
      },
    });
  }
}

const additives = [
  {
    name: "Solfiti",
    description: "Conservante usato per stabilita microbiologica e ossidativa del vino.",
  },
  {
    name: "Lieviti selezionati",
    description: "Lieviti impiegati in fermentazione per controllo aromatico e regolarita del processo.",
  },
  {
    name: "Bentonite",
    description: "Agente chiarificante minerale usato per stabilizzare proteine e limpidezza.",
  },
] as const;

const workshops = [
  {
    name: "Enoteca Arena",
    slug: "enoteca-arena",
    category: "bar",
    lat: 45.4402,
    lng: 10.9956,
    profileText: "Wine bar nel centro storico con degustazioni serali.",
    historyText: "Aperto nel 2016 con focus su produttori locali.",
    winerySlug: null,
    wineSlugs: ["pasqua-11-minutes-rose", "farina-lugana"],
  },
  {
    name: "Pasqua Wine",
    slug: "pasqua-wine-workshop",
    category: "winery",
    lat: 45.4384,
    lng: 10.9916,
    profileText: "Profilo pubblico cantina Pasqua.",
    historyText: "Cantina storica veronese.",
    winerySlug: "pasqua-wine",
    wineSlugs: ["pasqua-11-minutes-rose", "pasqua-hey-french", "pasqua-passionesentimento-rosso"],
  },
  {
    name: "Esselunga Verona",
    slug: "esselunga-verona",
    category: "supermarket",
    lat: 45.406,
    lng: 10.979,
    profileText: "Supermercato Esselunga con reparto vini curato, viale del Lavoro 15, Verona.",
    historyText: "Punto vendita Esselunga con selezione di vini locali e nazionali.",
    winerySlug: null,
    wineSlugs: [
      "pasqua-11-minutes-rose",
      "pasqua-passionesentimento-rosso",
      "farina-lugana",
      "bosca-toselli-bianco",
      "bosca-toselli-rosso",
    ],
  },
] as const;

async function seedAdditives() {
  for (const additive of additives) {
    await prisma.additive.upsert({
      where: { name: additive.name },
      create: additive,
      update: additive,
    });
  }
}

async function attachInitialAdditives() {
  const additiveByName = Object.fromEntries(
    (await prisma.additive.findMany()).map((item) => [item.name, item.id]),
  ) as Record<string, number>;

  const mapping: Array<{ wineSlug: string; additiveNames: string[] }> = [
    {
      wineSlug: "pasqua-hey-french",
      additiveNames: ["Solfiti", "Lieviti selezionati"],
    },
    {
      wineSlug: "farina-amarone-classico",
      additiveNames: ["Solfiti", "Bentonite"],
    },
    {
      wineSlug: "pasqua-11-minutes-rose",
      additiveNames: ["Solfiti", "Lieviti selezionati"],
    },
    {
      wineSlug: "farina-ripasso-classico-superiore",
      additiveNames: ["Solfiti", "Bentonite"],
    },
    {
      wineSlug: "ca-rugate-soave-classico-monte-fiorentine",
      additiveNames: ["Solfiti", "Lieviti selezionati", "Bentonite"],
    },
    {
      wineSlug: "zyme-from-black-to-white",
      additiveNames: ["Solfiti", "Bentonite"],
    },
  ];

  for (const row of mapping) {
    const wine = await prisma.wine.findUnique({ where: { slug: row.wineSlug } });
    if (!wine) continue;

    await prisma.wineAdditive.deleteMany({ where: { wineId: wine.id } });
    await prisma.wineAdditive.createMany({
      data: row.additiveNames
        .map((name) => additiveByName[name])
        .filter((id): id is number => typeof id === "number")
        .map((additiveId) => ({ wineId: wine.id, additiveId })),
    });

    await prisma.wine.update({
      where: { id: wine.id },
      data: { isVerified: true },
    });
  }
}

async function seedWorkshops() {
  for (const workshop of workshops) {
    const winery = workshop.winerySlug
      ? await prisma.winery.findUnique({ where: { slug: workshop.winerySlug } })
      : null;

    const record = await prisma.workshop.upsert({
      where: { slug: workshop.slug },
      create: {
        name: workshop.name,
        slug: workshop.slug,
        category: workshop.category,
        lat: workshop.lat,
        lng: workshop.lng,
        profileText: workshop.profileText,
        historyText: workshop.historyText,
        wineryId: winery?.id,
      },
      update: {
        name: workshop.name,
        category: workshop.category,
        lat: workshop.lat,
        lng: workshop.lng,
        profileText: workshop.profileText,
        historyText: workshop.historyText,
        wineryId: winery?.id,
      },
    });

    await prisma.workshopWine.deleteMany({ where: { workshopId: record.id } });

    const wines = await prisma.wine.findMany({
      where: { slug: { in: [...workshop.wineSlugs] } },
      select: { id: true },
    });

    if (wines.length > 0) {
      await prisma.workshopWine.createMany({
        data: wines.map((wine) => ({ workshopId: record.id, wineId: wine.id })),
      });
    }
  }
}

async function main() {
  for (const winery of wineries) {
    await seedWinery(winery);
  }

  await seedAdditives();
  await attachInitialAdditives();
  await seedWorkshops();

  const additiveCount = await prisma.additive.count();
  const workshopCount = await prisma.workshop.count();
  console.log(`Seed complete. Wineries: ${wineries.length}, additives: ${additiveCount}, workshops: ${workshopCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
