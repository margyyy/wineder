export type AdditiveDetail = {
  code?: string;
  name: string;
  category: string;
  summary: string;
  notes: Array<{ label: string; text: string }>;
  safetyLevel: "safe" | "moderate" | "caution";
};

export const ADDITIVES_KNOWLEDGE: Record<string, AdditiveDetail> = {
  Solfiti: {
    code: "SO₂",
    name: "Solfiti",
    category: "Conservante",
    summary:
      "Conservante fondamentale che protegge il vino dall'ossidazione e da batteri indesiderati. Impedisce fermentazioni dopo l'imbottigliamento mantenendo colore e sapore originali.",
    notes: [
      {
        label: "Funzione",
        text: "Agisce come antiossidante e antisettico, frenando microrganismi che causerebbero cattivi odori.",
      },
      {
        label: "Sensibilità",
        text: "In soggetti sensibili o asmatici può causare reazioni. Per legge la presenza è dichiarata in etichetta oltre 10 mg/L.",
      },
      {
        label: "Dosaggio",
        text: "Usato in piccole dosi regolamentate, ben inferiori ai limiti di legge UE.",
      },
    ],
    safetyLevel: "moderate",
  },
  Bentonite: {
    name: "Bentonite",
    category: "Agente chiarificante",
    summary:
      "Argilla naturale usata per stabilizzare le proteine del vino e garantirne la limpidezza. Viene eliminata per filtrazione prima dell'imbottigliamento.",
    notes: [
      {
        label: "Funzione",
        text: "Rimuove le proteine instabili che causerebbero intorbidimento nel vino finito.",
      },
      {
        label: "Residui",
        text: "Viene filtrata prima dell'imbottigliamento: non è presente nel vino che si beve.",
      },
      { label: "Sicurezza", text: "Completamente inerte per il consumo umano. Nessun rischio noto." },
    ],
    safetyLevel: "safe",
  },
  "Lieviti selezionati": {
    name: "Lieviti selezionati",
    category: "Coadiuvante di fermentazione",
    summary:
      "Ceppi di lieviti selezionati impiegati in fermentazione per garantire regolarità del processo e controllo aromatico. Non sono presenti nel vino finito.",
    notes: [
      {
        label: "Funzione",
        text: "Controllano la fermentazione alcolica trasformando gli zuccheri in alcol in modo preciso e riproducibile.",
      },
      {
        label: "Aromi",
        text: "Diversi ceppi esaltano note fruttate, floreali o strutturali specifiche del vino.",
      },
      {
        label: "Residui",
        text: "I lieviti muoiono e precipitano alla fine della fermentazione. Non sono attivi nel vino finito.",
      },
    ],
    safetyLevel: "safe",
  },
  "Acido metatartarico": {
    code: "E353",
    name: "Acido metatartarico",
    category: "Agente stabilizzante",
    summary:
      "Additivo naturale che mantiene il vino limpido impedendo la formazione di cristalli di tartrato sul fondo della bottiglia. Ideale per bianchi, rosati e spumanti.",
    notes: [
      {
        label: "Sicurezza",
        text: "Completamente sicuro. Una volta ingerito il corpo lo metabolizza come acido tartarico naturale dell'uva.",
      },
      { label: "Tollerabilità", text: "Nessun effetto collaterale o reazione allergica nota alle dosi enologiche." },
      {
        label: "Vantaggio",
        text: "Derivato diretto dell'uva, è tra gli additivi più coerenti con la natura del vino.",
      },
    ],
    safetyLevel: "safe",
  },
  "Carbossimetilcellulosa (CMC)": {
    code: "E466",
    name: "Carbossimetilcellulosa (CMC)",
    category: "Agente stabilizzante",
    summary:
      "Derivato naturale delle piante che blocca la crescita di cristalli di tartrato garantendo limpidezza perfetta. Non altera profumi né gusto del vino.",
    notes: [
      {
        label: "Digestione",
        text: "Fibra non digeribile: attraversa il sistema digestivo senza essere assorbita.",
      },
      {
        label: "Effetti gastrointestinali",
        text: "Alle dosi enologiche è inerte e innocua. Solo in quantità massicce potrebbe avere lieve effetto lassativo.",
      },
      { label: "Allergie", text: "Non è un allergene noto. Nessun rischio di tossicità." },
    ],
    safetyLevel: "safe",
  },
  "Acido fumarico": {
    code: "E297",
    name: "Acido fumarico",
    category: "Agente stabilizzante",
    summary:
      "Acido naturale estratto da frutta e verdura che preserva freschezza e vivacità del vino bloccando i batteri della fermentazione malolattica.",
    notes: [
      {
        label: "Metabolismo",
        text: "Pilastro del ciclo di Krebs: il nostro organismo lo gestisce con facilità e non è tossico.",
      },
      {
        label: "Sensibilità",
        text: "Estremamente ben tollerato nel prodotto finito. Sicuro al consumo.",
      },
      {
        label: "Purezza",
        text: "Molecola pulita che non lascia residui estranei ai cicli biologici umani.",
      },
    ],
    safetyLevel: "safe",
  },
  "Acido citrico": {
    code: "E330",
    name: "Acido citrico",
    category: "Regolatore di acidità",
    summary:
      "Regolatore naturale presente negli agrumi, usato per perfezionare equilibrio e freschezza del vino agendo sul pH prima dell'imbottigliamento.",
    notes: [
      { label: "Sicurezza", text: "Considerato innocuo, viene metabolizzato completamente dal corpo." },
      {
        label: "Salute dentale",
        text: "Come tutti gli acidi, a concentrazioni elevate può intaccare lo smalto, ma nel vino la presenza è bilanciata.",
      },
      {
        label: "Tolleranza",
        text: "In rarissimi casi di estrema sensibilità può causare lievi disturbi gastrici. È tra le sostanze più sicure nel settore alimentare.",
      },
    ],
    safetyLevel: "safe",
  },
  "Acido malico": {
    code: "E296",
    name: "Acido malico",
    category: "Regolatore di acidità",
    summary:
      "Acido tipico della mela e dell'uva che conferisce al vino vivacità e freschezza. Protagonista della fermentazione malolattica che trasforma l'acidità pungente in sensazione morbida.",
    notes: [
      {
        label: "Sicurezza",
        text: "Sostanza naturale prodotta anche dal corpo umano nel ciclo di Krebs. Nessun rischio di tossicità o accumulo.",
      },
      {
        label: "Apparato digerente",
        text: "Un vino ricco di acido malico può risultare più aggressivo per chi soffre di acidità di stomaco o gastrite.",
      },
    ],
    safetyLevel: "safe",
  },
  "Acido lattico": {
    code: "E270",
    name: "Acido lattico",
    category: "Regolatore di acidità",
    summary:
      "Acido naturale che dona al vino morbidezza, rotondità e stabilità. È l'alleato fondamentale per equilibrare il gusto nei grandi rossi e in alcuni bianchi strutturati.",
    notes: [
      {
        label: "Sicurezza",
        text: "Considerato estremamente sicuro. Non ha nulla a che vedere con l'intolleranza al lattosio.",
      },
      {
        label: "Digeribilità",
        text: "I vini ricchi di acido lattico risultano più digeribili e meno aggressivi per lo stomaco rispetto a quelli ricchi di acido malico.",
      },
    ],
    safetyLevel: "safe",
  },
};

const SAFETY_COLORS = {
  safe: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Sicuro" },
  moderate: { bg: "bg-amber-50", text: "text-amber-700", label: "Dichiarato in etichetta" },
  caution: { bg: "bg-red-50", text: "text-red-700", label: "Attenzione" },
} as const;

export function getAdditiveDetail(name: string): AdditiveDetail | undefined {
  return ADDITIVES_KNOWLEDGE[name];
}

export function getSafetyColors(level: AdditiveDetail["safetyLevel"]) {
  return SAFETY_COLORS[level];
}
