const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "notebooklm-real-bank", "notebooklm-bank.json");
const outPath = path.join(root, "questions-data.js");
const courseRoot = path.resolve(root, "..", "..", "metriche della comunicazione");
const courseSourcePaths = [
  path.join(courseRoot, "appunti.md"),
  path.join(courseRoot, "cheat-sheet-metriche-della-comunicazione.md"),
];
const courseSourceText = courseSourcePaths.map(filePath => fs.readFileSync(filePath, "utf8")).join("\n");

const SECTIONS = [
  "Fondamenti della misurazione",
  "Ricerca in comunicazione",
  "Digitale, social e motori di ricerca",
  "Monitoring, listening e sentiment",
  "Enti certificatori e audience",
  "Modelli di valutazione",
  "Performance measurement e CCPM",
  "ROI, AVE e indicatori economici",
  "Intangibili e reputazione",
];

const TARGETS = new Map([
  ["Fondamenti della misurazione", 45],
  ["Ricerca in comunicazione", 60],
  ["Digitale, social e motori di ricerca", 75],
  ["Monitoring, listening e sentiment", 45],
  ["Enti certificatori e audience", 55],
  ["Modelli di valutazione", 125],
  ["Performance measurement e CCPM", 55],
  ["ROI, AVE e indicatori economici", 45],
  ["Intangibili e reputazione", 55],
]);
const EXPECTED_TOTAL = [...TARGETS.values()].reduce((sum, count) => sum + count, 0);

const SPECIAL_QUIZZES = [
  { id: "all", label: "Generale bilanciato", description: "50 domande casuali da tutto il banco" },
  { id: "modelli", label: "Tutti i modelli", tag: "modelli", description: "Framework, modelli valutativi e modelli reputazionali" },
  { id: "enti", label: "Enti e audience", tag: "enti_audience", description: "ADS, Audicom, Auditel, Audiradio, currency e JIC" },
  { id: "social_roi", label: "Social, listening e ROI", tag: "social_roi", description: "Analytics, listening, sentiment, ROI/ROO/AVE e social measurement" },
  { id: "ricerca", label: "Ricerca e metodi", tag: "ricerca_metodi", description: "Qualitativo, quantitativo, survey, focus group e neuromarketing" },
  { id: "performance", label: "CCPM e performance", tag: "performance_ccpm", description: "KPI/KRI, VALUES, BSC, capitale comunicativo e valore" },
  { id: "reputazione", label: "Reputazione e intangibili", tag: "reputazione_intangibili", description: "Identita, immagine, fiducia, capitale narrativo e reputazione" },
  { id: "digitale", label: "SEO/GEO e digitale", tag: "seo_geo_digitale", description: "Web 1.0-4.0, SEO, SEA, GEO, GA4, AI e motori di risposta" },
];

const examSeeds = [
  q("Ricerca in comunicazione", "Lo strumento principale all'interno delle ricerche di tipo quantitativo e:", [
    "Le tecniche proiettive di subconscio",
    "L'osservazione partecipante",
    "La survey",
    "Il focus group",
  ], "C"),
  q("Ricerca in comunicazione", "Cosa e il neuromarketing?", [
    "Una tecnica esclusivamente di marketing digitale online",
    "Una metodologia di calcolo del ROI delle campagne pubblicitarie",
    "Un campo che integra neuroscienze, psicologia cognitiva e marketing",
    "Un sistema certificato di rilevazione delle vendite del periodo",
  ], "C"),
  q("ROI, AVE e indicatori economici", "Cosa misura l'AVE?", [
    "Il valore monetario equivalente della visibilita mediatica ottenuta",
    "Il livello di awareness raggiunto dai pubblici target",
    "La qualita giornalistica delle uscite ottenute",
    "Il sentiment medio della copertura mediatica",
  ], "A"),
  q("ROI, AVE e indicatori economici", "Secondo i critici del ROI integralista, le ragioni principali della sua inadeguatezza sono:", [
    "I dati di vendita non esistono per le attivita di PR",
    "I costi della comunicazione non sono mai documentabili in modo accurato",
    "I risultati significativi sono di lungo periodo, e le attivita sono integrate con altre",
    "Il management aziendale non chiede mai il ROI delle attivita di comunicazione",
  ], "C"),
  q("Fondamenti della misurazione", "Perche la distinzione tra output, outcome e impatto e strategicamente rilevante?", [
    "Perche impatto e outcome di fatto coincidono nei risultati di business",
    "Perche solo l'output e realmente misurabile in modo affidabile",
    "Perche tutti e tre vanno misurati con la stessa frequenza temporale",
    "Perche ciascun livello risponde a obiettivi diversi e si manifesta in tempi diversi",
  ], "D"),
  q("Performance measurement e CCPM", "Quali sono i tre livelli della tassonomia dei KPI di comunicazione proposta da Romenti?", [
    "Interno, esterno, istituzionale",
    "Formativo, sommativo, rendicontativo",
    "Strategico, tattico, operativo",
    "Quantitativo, qualitativo, narrativo",
  ], "B"),
  q("Performance measurement e CCPM", "Cosa rappresenta il Value Link in sintesi?", [
    "Un calcolo di profitto basato sulle vendite e sui margini del periodo aziendale",
    "Una metrica di reach mediatica aggregata sui pubblici target dell'organizzazione",
    "Un indicatore di sentiment automatico sulla copertura mediatica del periodo",
    "Il passaggio dalla conoscenza dell'azienda a misure che dimostrano il coinvolgimento nella relazione",
  ], "D"),
  q("Modelli di valutazione", "Nel Measurement Tree per la valutazione della comunicazione, cosa rappresentano i fiori dell'albero?", [
    "Gli outcome: cambiamenti in opinioni, atteggiamenti, comportamenti",
    "I prodotti finali offerti dall'organizzazione al mercato",
    "Le risorse impiegate dalle attivita relative alla comunicazione",
    "I concorrenti diretti dell'organizzazione nel mercato",
  ], "A"),
  q("Monitoring, listening e sentiment", "Cosa misura l'OTS (Opportunity To See)?", [
    "Il numero di occasioni in cui il pubblico puo essere raggiunto dal messaggio",
    "Il numero di copie effettivamente vendute di un giornale nel periodo",
    "Il livello di awareness raggiunto dal pubblico target della campagna",
    "La percentuale di articoli con citazioni di terzi sull'organizzazione",
  ], "A"),
  q("Ricerca in comunicazione", "Un team vuole esplorare un fenomeno poco noto e formulare le prime ipotesi interpretative. Quale tipo di metodo e piu adatto?", [
    "Survey su grandi campioni statisticamente rappresentativi",
    "Ricerche causali con gruppi sperimentali e di controllo",
    "Analisi del contenuto della rassegna stampa periodica",
    "Metodi qualitativi",
  ], "D"),
  q("Intangibili e reputazione", "Quali benefici tangibili produce, secondo Romenti, una buona reputazione?", [
    "Riduzione delle imposte e degli oneri fiscali sul fatturato annuale dell'organizzazione",
    "Aumento della copertura mediatica spontanea sui media tradizionali generalisti",
    "Capacita di fissare un premium price, attrarre i migliori talenti e ottenere maggiore fedelta",
    "Crescita automatica della quota di mercato e dei volumi di vendita di periodo",
  ], "C"),
  q("Modelli di valutazione", "Watson (2001) ha elaborato due modelli di valutazione, quali?", [
    "Quantitativo e qualitativo",
    "Lineare e circular feedback",
    "Pre-test e post-test",
    "Short model e continuing model",
  ], "D"),
  q("Ricerca in comunicazione", "Le tecniche proiettive vengono utilizzate per:", [
    "Studiare grandi campioni statisticamente rappresentativi della popolazione",
    "Sollecitare l'intervistato a descrivere sensazioni emotive profonde",
    "Misurare oggettivamente i comportamenti d'acquisto del consumatore",
    "Calcolare metriche di output editoriale sulla copertura mediatica",
  ], "B"),
  q("Monitoring, listening e sentiment", "L'utilizzo dell'analisi del contenuto e particolarmente diffuso per:", [
    "Selezionare i partecipanti dei focus group",
    "Calcolare il ROI economico delle campagne",
    "La valutazione della presenza sui media",
    "Definire i pubblici di riferimento di una campagna",
  ], "C"),
  q("Performance measurement e CCPM", "Nella tassonomia dei KPI di comunicazione proposta da Romenti, cosa rientra nella dimensione \"relazionale e sociale\" del livello sommativo?", [
    "La reputazione e la percezione complessiva dei pubblici esterni",
    "Le competenze comunicative e il benessere dei dipendenti interni",
    "Qualita delle relazioni con gli stakeholder, capacita di mantenerle, fiducia",
    "Lo stile manageriale e la cultura comunicativa dell'organizzazione",
  ], "C"),
  q("Fondamenti della misurazione", "Un team di comunicazione vuole apportare aggiustamenti durante la realizzazione di una campagna pubblicitaria in corso. Che tipo di valutazione sta facendo?", [
    "Valutazione ex ante, prima dell'implementazione",
    "Valutazione formativa, finalizzata al miglioramento",
    "Valutazione di responsabilita verso gli stakeholder",
    "Valutazione sommativa, finalizzata al controllo",
  ], "B"),
  q("Modelli di valutazione", "Nel modello logico del processo di valutazione, cosa sono le \"variabili ponte\"?", [
    "Elementi che collegano output e obiettivi su cui il comunicatore esercita potere",
    "Gli effetti finali sulle performance complessive delle organizzazioni",
    "Metriche puramente quantitative di output mediatico di periodo",
    "Le risorse umane ed economiche investite nelle attivita di comunicazione",
  ], "A"),
  q("Monitoring, listening e sentiment", "Le metodologie quanti-qualitative per misurare la visibilita di un soggetto su una testata online rispondono a due domande:", [
    "\"Quanto piaccio?\" e \"Chi mi cita?\"",
    "\"Quanto costa la copertura?\" e \"A quanti arriva?\"",
    "\"Quale media e migliore?\" e \"Quale messaggio recepiscono?\"",
    "\"Quanto si parla di me?\" e \"Come se ne parla?\"",
  ], "D"),
  q("Performance measurement e CCPM", "Nel Communication Value System di Romenti, qual e il punto di partenza?", [
    "Gli obiettivi del piano di comunicazione predisposto dalla funzione",
    "Gli obiettivi di business strategici dell'organizzazione",
    "Le richieste informative degli stakeholder esterni",
    "I KPI gia adottati dalla funzione comunicazione nel periodo",
  ], "B"),
  q("Intangibili e reputazione", "Nel modello del capitale intellettuale proposto da Skandia, cosa comprende la componente del capitale relazionale?", [
    "I sistemi informativi e le infrastrutture tecniche aziendali",
    "Le competenze e qualifiche professionali interne dello staff",
    "Relazioni con clienti e stakeholder, reputazione, fiducia",
    "La cultura organizzativa e i valori condivisi internamente",
  ], "C"),
  q("Digitale, social e motori di ricerca", "La visibilita digitale non e un risultato puntuale ma un processo articolato in piu fasi successive. Attraverso quali di questi tre livelli si articola la visibilita digitale?", [
    "Essere trovati, essere scelti, essere ricordati",
    "Awareness, consideration e fase decisionale di acquisto del cliente",
    "Ottimizzazione tecnica, posizionamento e monetizzazione del traffico",
    "Pubblicazione, condivisione e diffusione virale dei contenuti online",
  ], "A"),
  q("Digitale, social e motori di ricerca", "Quali sono i sei obiettivi cui si ricollegano le outcome metrics secondo quanto riportato da Lovett?", [
    "Fatturato, soddisfazione, market share, retention, lead, conversione",
    "Awareness, consideration, intent, purchase, loyalty, advocacy",
    "Visibilita, dialogo, interazioni, supporto, advocacy, innovazione",
    "Crawling, indexing, ranking, listening, monitoring, analytics",
  ], "B"),
  q("Digitale, social e motori di ricerca", "Tra le tre fasi del processo dei motori di ricerca, si descrive il crawling come la fase in cui programmi automatici entrano in azione. Qual e la sua funzione principale?", [
    "Esplorare il web seguendo i collegamenti per scoprire i contenuti",
    "Sintetizzare le informazioni provenienti da fonti diverse in una risposta",
    "Penalizzare le pagine duplicate o di scarso valore informativo",
    "Mostrare i risultati di ricerca all'utente nella pagina della SERP",
  ], "A"),
  q("Monitoring, listening e sentiment", "Secondo Mottironi (testimonianza Open Fiber), quali elementi deve contenere un mini-report di analisi?", [
    "Definizione obiettivi, scelta strumenti, capire cosa misurare, report, presentazione",
    "Briefing del cliente, executive summary, conclusioni, allegati, fatturazione finale",
    "Slide di copertina, agenda, contesto di mercato, raccomandazioni, follow-up",
    "Obiettivo, KPI selezionati, andamento dati, insight, decisione e raccomandazioni",
  ], "D"),
  q("Digitale, social e motori di ricerca", "Nella direzione \"brand health\" del Social Measurement Compass di Altimeter, le metriche utilizzabili sono:", [
    "Conversioni, ROI delle vendite e ambienti che generano opportunita d'acquisto",
    "Share of voice, sentiment, argomenti di interesse e motivi di insoddisfazione",
    "Tasso di risoluzione dei problemi, recensioni positive e condivisione di esperienze positive",
    "Idee ricevute, ampiezza delle condivisioni e livello di innovazione percepita",
  ], "B"),
  q("Digitale, social e motori di ricerca", "Quali sono le quattro tipologie di metriche del framework di Lovett?", [
    "Reach, engagement, conversion, retention metrics",
    "Counting, business value, foundation, outcome metrics",
    "SEO, SEM, SEA, social media metrics",
    "Vanity, smart, qualitative, quantitative metrics",
  ], "B"),
  q("Digitale, social e motori di ricerca", "Nella piramide dei bisogni di analisi messa a punto da Web Analytics Demystified e ispirata a Maslow, cosa rappresenta il livello \"data\" alla base?", [
    "Consigli puntuali da mettere in pratica per migliorare le attivita",
    "Dati lavorati e collocati in un contesto significativo per l'azienda",
    "Informazioni analizzate alla luce delle conoscenze dell'analista",
    "Unita informative grezze che mostrano un singolo frammento di realta",
  ], "D"),
  q("Digitale, social e motori di ricerca", "Cosa significa l'acronimo SEM (Search Engine Marketing)?", [
    "Insieme di attivita di digital marketing per aumentare la visibilita sui motori di ricerca",
    "Tecnica di analisi dei dati raccolti dai motori di ricerca per il targeting",
    "Acronimo che indica le metriche standard delle campagne sui social network",
    "Sistema di tracciamento degli utenti basato sui cookie pubblicitari di terze parti",
  ], "A"),
  q("Digitale, social e motori di ricerca", "Rispetto al modello SEO tradizionale, nella GEO la visibilita diventa piu selettiva e meno distribuita: il sistema premia pochi contenuti, ma in modo piu intenso. Perche la visibilita e piu selettiva?", [
    "Perche aumenta il numero complessivo di contenuti disponibili",
    "Perche solo alcune fonti vengono selezionate per costruire le risposte",
    "Perche il sistema distribuisce il traffico in modo uniforme",
    "Perche tutte le fonti vengono mostrate agli utenti",
  ], "B"),
  q("Digitale, social e motori di ricerca", "Tra i KPI principali della SEO, cosa misura il \"traffico organico\"?", [
    "Il rapporto tra visualizzazioni di un contenuto e clic naturali ottenuti in SERP",
    "Il numero di link in entrata provenienti da siti esterni",
    "La percentuale di visitatori che lasciano il sito dopo una sola pagina",
    "Il numero di visite al sito provenienti dai motori di ricerca",
  ], "D"),
];

const modelExtraSeeds = [
  q("Modelli di valutazione", "Nel modello Short di Watson, qual è il limite principale della logica one-way?", [
    "Considera la comunicazione come flusso lineare e non integra veri feedback.",
    "Valuta solo le relazioni interne tra collaboratori e superiori.",
    "Trasforma sempre gli outcome in indicatori economici di breve periodo.",
    "Sostituisce la definizione degli obiettivi con la sola analisi dei competitor.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Il modello Short di Watson è più adatto quando l'analisi riguarda:", [
    "Campagne circoscritte, copertura media e output di breve periodo.",
    "La costruzione pluriennale della fiducia con tutti gli stakeholder.",
    "La revisione continua degli obiettivi durante ogni fase del programma.",
    "La misurazione finale delle performance economiche complessive aziendali.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Che cosa distingue il Continuing Model di Watson rispetto allo Short Model?", [
    "Introduce feedback continui e consente di ricalibrare obiettivi e attività.",
    "Misura soltanto la quantità di comunicati prodotti in una campagna.",
    "Elimina la ricerca iniziale perché considera sufficienti gli output.",
    "Riduce la valutazione a una fotografia finale della copertura media.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Continuing Model, a cosa serve la valutazione durante lo svolgimento del programma?", [
    "A verificare l'andamento e correggere la strategia sulla base dei feedback.",
    "A certificare la tiratura dei mezzi usati nel piano media.",
    "A rilevare soltanto la soddisfazione finale con una survey ex post.",
    "A calcolare il valore pubblicitario equivalente delle uscite stampa.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello Yardstick, che cosa rientra nel livello degli output?", [
    "Uscite media, impression, materiali prodotti e pubblici potenzialmente raggiunti.",
    "Cambiamenti stabili negli atteggiamenti e nei comportamenti dei pubblici.",
    "Contributo della comunicazione ai risultati economici e competitivi.",
    "Fiducia, reputazione e qualità della relazione con gli stakeholder.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello Yardstick, che cosa indica il livello degli out-take?", [
    "Ricezione, comprensione, conoscenza e ricordo del messaggio da parte dei pubblici.",
    "Numero di articoli pubblicati e audience potenziale della copertura.",
    "Valore economico finale prodotto dalla comunicazione sul business.",
    "Qualità dei processi interni della funzione comunicazione.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello Yardstick, quando si parla di outcome?", [
    "Quando si osservano cambiamenti in opinioni, atteggiamenti o comportamenti.",
    "Quando si contano comunicati stampa, eventi e contenuti prodotti.",
    "Quando si stabilisce il budget disponibile per la campagna.",
    "Quando si selezionano i giornalisti da inserire nella media list.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Perché nel modello Yardstick la definizione degli obiettivi precede la misurazione?", [
    "Perché consente di scegliere livelli e indicatori coerenti con ciò che si vuole ottenere.",
    "Perché gli obiettivi servono solo a descrivere i risultati già raggiunti.",
    "Perché gli indicatori devono essere identici per tutte le organizzazioni.",
    "Perché la copertura media è sempre sufficiente per valutare ogni effetto.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello di Brioschi, che cosa indica l'efficacia tecnica?", [
    "Il grado di raggiungimento degli obiettivi specifici della comunicazione.",
    "La capacità della comunicazione di ridurre i costi fiscali dell'organizzazione.",
    "La quantità di vendite attribuibile direttamente alla funzione commerciale.",
    "La qualità estetica dei materiali prodotti durante la campagna.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello di Brioschi, che cosa riguarda l'efficacia economica?", [
    "Il contributo della comunicazione agli obiettivi economici dell'organizzazione.",
    "La soddisfazione sociale generata presso i pubblici di riferimento.",
    "La correttezza metodologica della costruzione del questionario.",
    "Il numero di contenuti pubblicati sui media proprietari nel periodo.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello di Brioschi, che cosa riguarda l'efficacia sociale?", [
    "Il benessere prodotto dalla comunicazione nei confronti degli interlocutori sociali.",
    "Il costo complessivo dei canali acquistati per ottenere copertura.",
    "Il ritorno economico immediato generato dalle vendite di periodo.",
    "La pressione pubblicitaria pianificata sui mezzi a pagamento.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Quali livelli di complessità prevede Brioschi per valutare l'efficacia della comunicazione?", [
    "Elementare, intermedio e avanzato.",
    "Output, out-take e outcome.",
    "Strategico, tattico e operativo.",
    "Quantitativo, qualitativo e narrativo.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello PII, che cosa valuta la fase di Preparation?", [
    "L'adeguatezza ex ante di messaggi, contenuti e scelte comunicative.",
    "La quantità di copertura ottenuta dopo la conclusione della campagna.",
    "Gli effetti cognitivi prodotti nel medio periodo sui pubblici.",
    "La relazione finale tra comunicazione e performance di business.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello PII, che cosa misura la fase di Implementation?", [
    "Sforzi, strumenti, persone o media raggiunti durante l'esecuzione del programma.",
    "Il cambiamento profondo delle opinioni dopo un lungo periodo di osservazione.",
    "La reputazione sedimentata dell'organizzazione presso tutti gli stakeholder.",
    "La coerenza degli obiettivi di business definiti dal top management.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello PII, perché la fase di Impact richiede tecniche più sofisticate?", [
    "Perché osserva effetti cognitivi e comportamentali che maturano in tempi più lunghi.",
    "Perché si limita a contare le uscite stampa prodotte nel periodo.",
    "Perché riguarda solo la distribuzione dei materiali ai giornalisti.",
    "Perché sostituisce la ricerca con il giudizio intuitivo del comunicatore.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello PII, perché gli output sono definiti pseudo-effetti?", [
    "Perché mostrano ciò che è stato prodotto, non gli effetti autentici sui pubblici.",
    "Perché sono indicatori economici finali già collegati alle vendite.",
    "Perché descrivono cambiamenti stabili negli atteggiamenti dei pubblici.",
    "Perché misurano direttamente la reputazione complessiva dell'organizzazione.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Il MACRO Model analizza la valutazione della comunicazione su quali livelli?", [
    "Livello individuale dei professionisti e livello dei programmi di comunicazione.",
    "Livello dei media tradizionali e livello dei media digitali acquistati.",
    "Livello economico, livello finanziario e livello contabile della funzione.",
    "Livello della survey, livello del focus group e livello dell'intervista.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel MACRO Model, che cosa sono gli input?", [
    "Microdecisioni professionali su formato, contenuti, immagini e scelte redazionali.",
    "Risultati economici finali generati dalla reputazione aziendale.",
    "Cambiamenti comportamentali dei pubblici osservati dopo la campagna.",
    "Indicatori di fiducia raccolti presso stakeholder esterni.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Qual è la sequenza della piramide del MACRO Model?", [
    "Input, output e outcome.",
    "Ricerca, ascolto e pubblicazione.",
    "Awareness, consideration e purchase.",
    "Crawling, indexing e ranking.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Da cosa dipende, nel MACRO Model, la sofisticazione della valutazione?", [
    "Dalle risorse disponibili e dal livello di sviluppo del processo valutativo.",
    "Dal numero di follower presenti sui canali social proprietari.",
    "Dalla scelta di misurare solo indicatori economici di vendita.",
    "Dalla possibilità di usare sempre lo stesso questionario standard.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Measurement Tree, che cosa rappresenta l'ambiente in cui cresce l'albero?", [
    "Il contesto competitivo e organizzativo in cui si colloca la comunicazione.",
    "Gli outcome finali raggiunti sui pubblici prioritari della campagna.",
    "I materiali visibili prodotti dalla funzione comunicazione.",
    "Le relazioni interne tra collaboratori coinvolti nel progetto.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Measurement Tree, che cosa rappresenta la corteccia dell'albero?", [
    "I prodotti o servizi dell'organizzazione visibili all'esterno.",
    "Gli obiettivi strategici che alimentano l'intero programma.",
    "I pubblici del piano di media relations selezionati per la campagna.",
    "Gli effetti su opinioni, atteggiamenti e comportamenti dei pubblici.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Measurement Tree, che cosa rappresenta la linfa?", [
    "Ciò che è visibile ai collaboratori interni e alimenta il funzionamento dell'organizzazione.",
    "La quota di copertura media ottenuta rispetto ai concorrenti diretti.",
    "Il valore monetario equivalente della visibilità editoriale raggiunta.",
    "La lista degli output prodotti dalla funzione comunicazione nel periodo.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Measurement Tree, quale differenza c'è tra rami e foglie?", [
    "I rami indicano i pubblici della campagna, le foglie i pubblici del piano media relations.",
    "I rami indicano gli output prodotti, le foglie gli obiettivi economici finali.",
    "I rami rappresentano le risorse investite, le foglie i costi dei canali.",
    "I rami rappresentano gli outcome, le foglie le microdecisioni professionali.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Quale passaggio appartiene alle fasi del Measurement Tree?", [
    "Valutare output e outcome rispetto agli obiettivi definiti all'inizio.",
    "Calcolare il ROI pubblicitario partendo dal prezzo degli spazi media.",
    "Definire i pubblici del piano media relations prima degli obiettivi.",
    "Sostituire la valutazione finale con una semplice rassegna stampa.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel PRE Model, che domanda guida la fase di Audit?", [
    "Dove siamo adesso?",
    "Quanto vale economicamente la copertura ottenuta?",
    "Quale share televisivo abbiamo raggiunto?",
    "Quante uscite stampa dobbiamo comprare?",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel PRE Model, che cosa si definisce nella fase degli obiettivi?", [
    "Dove l'organizzazione deve arrivare con il programma di comunicazione.",
    "Il valore pubblicitario equivalente delle uscite media future.",
    "La composizione del panel usato dagli enti certificatori.",
    "Il numero di domande da inserire nel questionario finale.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel PRE Model, che domanda sintetizza la fase strategica?", [
    "Come ci arriviamo?",
    "Quanti articoli sono usciti?",
    "Chi ha certificato la tiratura?",
    "Quanto costa il media buying?",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel PRE Model, a cosa serve la valutazione ongoing?", [
    "A capire se il programma sta procedendo verso gli obiettivi mentre è in corso.",
    "A chiudere il bilancio finale quando ogni attività è già terminata.",
    "A selezionare il campione statistico per una ricerca nazionale.",
    "A stimare solo il valore economico finale della copertura ottenuta.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel PRE Model, quale domanda appartiene alla valutazione finale?", [
    "Com'è andata?",
    "Dove siamo adesso?",
    "Come ci arriviamo?",
    "Quale media compriamo?",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Value Link, qual è il primo passaggio del percorso di valore?", [
    "Raggiungere i pubblici e renderli consapevoli dell'organizzazione.",
    "Collegare la relazione solo al fatturato osservato nel breve periodo.",
    "Considerare solo i pubblici già favorevoli all'organizzazione.",
    "Misurare solo la copertura ottenuta sui media tradizionali.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Value Link, che cosa significa indirizzare i pubblici verso la relazione?", [
    "Favorire un coinvolgimento che avvicini i pubblici all'organizzazione.",
    "Aumentare soltanto la frequenza dei messaggi pubblicitari acquistati.",
    "Sostituire gli obiettivi relazionali con metriche di audience certificata.",
    "Limitarsi a registrare il numero di contenuti pubblicati nel periodo.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Value Link, perché sono importanti trattenere e motivare i pubblici?", [
    "Perché la relazione deve mantenersi nel tempo prima di contribuire ai risultati.",
    "Perché la valutazione termina quando il pubblico vede il primo messaggio.",
    "Perché gli outcome coincidono sempre con le impression generate.",
    "Perché la fiducia non incide sulle performance organizzative.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Value Link, quando la relazione produce valore per l'organizzazione?", [
    "Quando contribuisce positivamente agli obiettivi e ai risultati di business.",
    "Quando viene descritta solo come quantità di uscite stampa ottenute.",
    "Quando sostituisce la definizione degli obiettivi di comunicazione.",
    "Quando resta separata dagli stakeholder prioritari dell'organizzazione.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Communication Value System, qual è il punto di partenza del processo?", [
    "Identificare gli obiettivi di business strategici dell'organizzazione.",
    "Scegliere prima i KPI disponibili nella dashboard della funzione.",
    "Calcolare la copertura media ottenuta nel periodo precedente.",
    "Redigere il report finale prima della pianificazione comunicativa.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Communication Value System, perché gli obiettivi di business vengono collegati agli stakeholder?", [
    "Per capire quali pubblici possono influenzare il raggiungimento degli obiettivi.",
    "Per trasformare ogni stakeholder in un indicatore economico uniforme.",
    "Per evitare di definire obiettivi specifici di comunicazione.",
    "Per sostituire l'analisi dei pubblici con la rassegna stampa.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel Communication Value System, qual è l'esito finale del percorso di misurazione?", [
    "Costruire una Communication Balanced Scorecard con KPI coerenti.",
    "Produrre una lista di comunicati stampa ordinati per data.",
    "Misurare soltanto il numero di interazioni sui canali social.",
    "Calcolare l'AVE come unica metrica di valore comunicativo.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Quali sono le quattro prospettive classiche della Balanced Scorecard di Kaplan e Norton?", [
    "Finanziaria, cliente, processi interni, apprendimento e crescita.",
    "Output, out-take, outcome e impatto.",
    "Preparazione, implementazione, impatto e rendicontazione.",
    "Awareness, consideration, purchase e loyalty.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Quali prospettive aggiunge Parmenter alla Balanced Scorecard?", [
    "Comunità e dipendenti.",
    "SEO e social listening.",
    "Tiratura e diffusione.",
    "AVE e ROI pubblicitario.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nell'adattamento di Vos e Schoemaker, a quale area comunicativa corrisponde la prospettiva cliente?", [
    "Alla comunicazione di marketing.",
    "Alla comunicazione istituzionale.",
    "All'organizzazione della funzione comunicazione.",
    "Alla comunicazione interna sui processi.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nell'adattamento di Vos e Schoemaker, a che cosa corrisponde apprendimento e crescita?", [
    "All'organizzazione della funzione comunicazione.",
    "Alla comunicazione di marketing verso i clienti.",
    "Alla certificazione della diffusione dei mezzi.",
    "Alla misurazione della copertura editoriale.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nella qualità del sistema di comunicazione, che cosa indica la chiarezza?", [
    "Obiettivi e messaggi comprensibili per i pubblici cui sono rivolti.",
    "La sola quantità di uscite pubblicate dai media nel periodo.",
    "Il valore monetario equivalente della copertura editoriale.",
    "La presenza di un unico indicatore uguale per tutte le campagne.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nella qualità del sistema di comunicazione, che cosa indica l'orientamento all'ambiente?", [
    "La capacità di ascoltare contesto, stakeholder e segnali esterni rilevanti.",
    "La decisione di misurare solo attività interne alla funzione.",
    "Il calcolo automatico della copertura ottenuta su un canale.",
    "La scelta di evitare benchmark e confronti con il contesto.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nella qualità del sistema di comunicazione, che cosa indica la coerenza?", [
    "L'allineamento tra obiettivi, messaggi, canali e comportamenti organizzativi.",
    "La quantità complessiva di impression generate nel periodo.",
    "Il costo medio sostenuto per ciascun contenuto pubblicato.",
    "La presenza di indicatori separati dagli obiettivi strategici.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nella qualità del sistema di comunicazione, che cosa indica la reattività?", [
    "La capacità di rispondere ai segnali raccolti e adattare le azioni.",
    "La possibilità di misurare soltanto alla fine del programma.",
    "La stabilità dei messaggi anche quando il contesto cambia.",
    "La coincidenza tra output prodotti e impatto di business.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Su quali tre radici teoriche si fonda il CCPM di Romenti?", [
    "Ricerca valutativa, performance measurement e studio degli intangibili.",
    "SEO, social media listening e pianificazione pubblicitaria.",
    "Tiratura, diffusione e audience certificata.",
    "Survey, focus group e osservazione partecipante.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel CCPM, che cosa sono le performance expectations?", [
    "Le attese informative e valutative che orientano obiettivi, metriche e decisioni.",
    "Le uscite stampa minime fissate come unico criterio di riuscita della campagna.",
    "Le vendite di periodo considerate come unico indicatore del successo comunicativo.",
    "Le preferenze grafiche del management sul formato del report finale.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel CCPM, che cosa indaga l'audit della cultura della misurazione?", [
    "Come l'organizzazione concepisce controllo, miglioramento, KPI e uso dei risultati.",
    "Quale ente certifica la diffusione dei quotidiani e dei periodici.",
    "Quanti contenuti digitali vengono pubblicati ogni settimana dalla funzione.",
    "Quale formato creativo deve essere usato nella campagna successiva.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "Nel modello logico del CCPM, qual è la sequenza corretta?", [
    "Input, attività, output, outcome, variabili ponte e impatto sulle performance.",
    "Awareness, consideration, purchase, loyalty, advocacy e vendita.",
    "Crawling, indexing, ranking, click, conversione e retention.",
    "Preparazione, implementazione, rassegna stampa, fatturato e bilancio.",
  ], "A", "appunti-cheat"),
  q("Modelli di valutazione", "A che cosa servono le mappe narrative nel CCPM?", [
    "A rappresentare interdipendenze e percorsi plausibili di creazione del valore.",
    "A sostituire la raccolta dei dati con una descrizione narrativa non verificata.",
    "A ordinare graficamente le uscite stampa in base alla data di pubblicazione.",
    "A sintetizzare in un unico indice il valore reputazionale complessivo.",
  ], "A", "appunti-cheat"),
];

const entiExtraSeeds = [
  q("Enti certificatori e audience", "Nel mercato della comunicazione, a cosa serve una currency condivisa?", [
    "A fornire una misura riconosciuta dal mercato per regolare la compravendita degli spazi.",
    "A sostituire la ricerca sui pubblici con una stima economica interna dell'editore.",
    "A indicare il budget annuale che l'organizzazione destina alla comunicazione.",
    "A calcolare automaticamente il ROI commerciale di una campagna pubblicitaria.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Perché gli enti certificatori delle audience operano spesso come JIC?", [
    "Per ridurre i conflitti di interesse attraverso il controllo incrociato degli attori del mercato.",
    "Per consentire agli editori di dichiarare autonomamente i dati senza verifiche esterne.",
    "Per trasformare ogni dato di ascolto in un indicatore di gradimento qualitativo.",
    "Per separare completamente investitori, agenzie e concessionarie dalla misurazione.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Che cosa misura ADS nel mercato italiano della stampa?", [
    "Tiratura e diffusione di quotidiani e periodici, cartacei e digitali.",
    "La lettura effettiva dei giornali da parte dei singoli lettori.",
    "Gli ascolti televisivi lineari e on demand rilevati con meter.",
    "L'audience digitale di siti e app misurata tramite panel e SDK.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Nel sistema ADS, qual è la differenza corretta tra tiratura e diffusione?", [
    "La tiratura indica le copie stampate, la diffusione quelle effettivamente portate al mercato.",
    "La tiratura indica i lettori effettivi, la diffusione il numero di abbonamenti digitali.",
    "La tiratura riguarda solo il digitale, la diffusione soltanto le copie cartacee.",
    "La tiratura è rilevata da Audicom, la diffusione è dichiarata dal SuperPanel.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Perché la certificazione ADS è considerata una certificazione di terza parte?", [
    "Perché verifica i dati dichiarati dagli editori per garantire trasparenza e veridicità.",
    "Perché misura direttamente il sentiment dei lettori verso ogni testata.",
    "Perché sostituisce la vendita degli spazi pubblicitari con una metrica reputazionale.",
    "Perché calcola la qualità giornalistica degli articoli pubblicati nel periodo.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Quale cambiamento istituzionale ha portato alla nascita di Audicom nel 2023?", [
    "La fusione tra Audiweb e Audipress per integrare audience digitali e stampa.",
    "La trasformazione di Auditel in ente unico per TV, radio e quotidiani.",
    "La sostituzione di ADS con un sistema censuario basato su tag e SDK.",
    "La nascita del MOC come comitato esclusivo degli investitori pubblicitari.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Come viene costruita la Total Digital Audience secondo Audicom?", [
    "Integrando un campione di persone con rilevazioni censuarie tramite tag e SDK.",
    "Contando solo le copie digitali vendute dalle testate giornalistiche.",
    "Usando esclusivamente interviste qualitative sul gradimento dei siti informativi.",
    "Sommando gli ascolti televisivi e radiofonici rilevati nello stesso giorno.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Quali sono indicatori tipici usati da Audicom per siti e mobile app?", [
    "Unique audience, page views, stream views e time spent.",
    "Tiratura, diffusione, resi e copie distribuite in edicola.",
    "AMR, permanenza, fascia oraria e composizione per target TV.",
    "Premium price, fiducia, commitment e soddisfazione relazionale.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Nel sistema Auditel, a cosa serve la Ricerca di Base?", [
    "A definire l'universo delle famiglie e le dotazioni tecnologiche da cui costruire il campione.",
    "A rilevare minuto per minuto gli ascolti prodotti dai meter domestici.",
    "A certificare la diffusione cartacea e digitale dei quotidiani italiani.",
    "A stimare il sentiment degli spettatori verso programmi e spot televisivi.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Che cosa distingue il sistema campionario Auditel dal sistema censuario?", [
    "Il campionario misura persone con meter, il censuario rileva fruizioni digitali tramite tag e SDK.",
    "Il campionario conta le copie stampate, il censuario certifica le copie vendute.",
    "Il campionario riguarda solo la radio, il censuario riguarda soltanto i quotidiani.",
    "Il campionario raccoglie opinioni qualitative, il censuario misura la reputazione aziendale.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Nel sistema Auditel, cosa sintetizza la formula Everytime-Everywhere-Everydevice?", [
    "La logica della Total Audience televisiva su tempi, luoghi e dispositivi diversi.",
    "La certificazione mensile della tiratura e diffusione dei quotidiani.",
    "La selezione dei partecipanti ai focus group sulla fruizione televisiva.",
    "La misurazione del solo ascolto radiofonico lineare del giorno precedente.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "A cosa serve la Golden Rule nel sistema Auditel?", [
    "A far sì che software diversi restituiscano lo stesso dato finale fino al terzo decimale.",
    "A stabilire che ogni programma televisivo debba essere valutato solo con survey qualitative.",
    "A imporre che la stampa venga misurata con gli stessi meter usati per la televisione.",
    "A calcolare il valore pubblicitario equivalente degli ascolti ottenuti da un canale.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Qual è il ruolo di Audiradio nel mercato italiano?", [
    "Misurare gli ascolti radiofonici lineari e on demand per costruire una currency dell'audio.",
    "Certificare la tiratura e la diffusione delle testate quotidiane e periodiche.",
    "Rilevare la Total Digital Audience di siti e app tramite panel online.",
    "Attribuire un valore economico alle uscite editoriali ottenute dalle PR.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Nel passaggio da TER ad Audiradio, quale ruolo viene attribuito al MOC?", [
    "Costituire il nuovo JIC per la misurazione degli ascolti radiofonici.",
    "Certificare le copie cartacee distribuite dagli editori nel periodo.",
    "Gestire direttamente la vendita degli spazi pubblicitari televisivi.",
    "Sostituire AgCom nel controllo istituzionale della Total Audience TV.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Che cosa indica il Day After Recall nella misurazione radiofonica?", [
    "Un metodo basato sul ricordo dell'ascolto radiofonico del giorno precedente.",
    "La rilevazione minuto per minuto degli ascolti televisivi durante la notte.",
    "La deduplicazione degli utenti che passano da smartphone a televisore.",
    "La certificazione mensile delle copie digitali dichiarate dagli editori.",
  ], "A", "appunti-cheat"),
  q("Enti certificatori e audience", "Perché la deduplicazione è centrale nella Total Audience?", [
    "Per evitare che la stessa persona venga contata più volte quando usa device diversi.",
    "Per aumentare artificialmente il numero di contatti dichiarati agli investitori.",
    "Per eliminare dal campione tutte le famiglie con più televisori domestici.",
    "Per sostituire i dati censuari con interviste qualitative di gradimento.",
  ], "A", "appunti-cheat"),
];

const studySeeds = [
  q("Fondamenti della misurazione", "A cosa servono principalmente le misure rendicontative?", [
    "A correggere una campagna durante la sua realizzazione operativa",
    "A dimostrare impatto e accountability verso management e stakeholder",
    "A selezionare il metodo qualitativo piu adatto alla ricerca esplorativa",
    "A stimare la tiratura e la diffusione certificate della stampa",
  ], "B", "appunti-cheat"),
  q("Fondamenti della misurazione", "Che cosa caratterizza le misure sommative?", [
    "Sono usate per correggere messaggi e canali durante lo svolgimento della campagna",
    "Servono a tirare le somme sui risultati raggiunti e sul valore creato",
    "Certificano tiratura e diffusione dei quotidiani e dei periodici",
    "Riguardano solo la selezione del campione nelle ricerche quantitative",
  ], "B", "appunti-cheat"),
  q("Digitale, social e motori di ricerca", "Cosa indica una zero-click search nel passaggio dalla SEO alla GEO?", [
    "Una ricerca in cui l'utente ottiene la risposta senza visitare un sito esterno",
    "Una campagna SEA in cui l'inserzionista non paga il costo per clic",
    "Una sessione social in cui l'utente visualizza contenuti senza interagire",
    "Un errore tecnico di crawling che impedisce l'indicizzazione della pagina",
  ], "A", "appunti-cheat"),
  q("Intangibili e reputazione", "Nella classificazione di Berens e Van Riel, quali sono i tre filoni dei modelli reputazionali?", [
    "Output, out-take e outcome",
    "Aspettative sociali, corporate character e trust",
    "Capitale umano, capitale relazionale e capitale strutturale",
    "Immagine, identita visiva e customer journey",
  ], "B", "appunti-cheat"),
  q("Intangibili e reputazione", "Qual e il limite principale di un modello reputazionale sintetico rispetto a uno analitico?", [
    "Misura solo dati tecnici di traffico e non puo essere usato sui pubblici",
    "Tende a privilegiare il dato aggregato, mentre l'analitico scompone la reputazione in dimensioni",
    "Coincide sempre con l'AVE e quindi produce solo un valore economico equivalente",
    "Richiede esclusivamente interviste telefoniche CATI e non ammette altre fonti",
  ], "B", "appunti-cheat"),
  q("Intangibili e reputazione", "Nel Reputation Quotient, come viene misurata la reputazione?", [
    "Come somma delle copie diffuse e delle audience certificate nel periodo",
    "Attraverso indicatori affettivi e cognitivi aggregati su piu dimensioni",
    "Come valore monetario equivalente della copertura editoriale ottenuta",
    "Attraverso il solo grado di soddisfazione verso la comunicazione interna",
  ], "B", "appunti-cheat"),
  q("Enti certificatori e audience", "A cosa serve la Golden Rule di Auditel?", [
    "A garantire che software diversi producano lo stesso risultato partendo dagli stessi dati",
    "A trasformare automaticamente lo share televisivo in valore pubblicitario equivalente",
    "A misurare la lettura effettiva dei quotidiani cartacei e digitali",
    "A selezionare i partecipanti del panel radiofonico tramite interviste qualitative",
  ], "A", "appunti-cheat"),
  q("Performance measurement e CCPM", "Che cosa distingue un KRI da un KPI nel performance measurement?", [
    "Il KRI sintetizza risultati passati, mentre il KPI guida driver critici di performance.",
    "Il KRI misura solo output media, mentre il KPI misura esclusivamente audience certificate.",
    "Il KRI è sempre qualitativo, mentre il KPI è sempre espresso in valore economico.",
    "Il KRI sostituisce gli obiettivi, mentre il KPI sostituisce la raccolta dei dati.",
  ], "A", "appunti-cheat"),
];

const COVERAGE_TERMS = [
  "output",
  "out-take",
  "outcome",
  "impatto",
  "formativa",
  "sommative",
  "rendicontative",
  "focus group",
  "survey",
  "osservazione partecipante",
  "tecniche proiettive",
  "ATL",
  "BTL",
  "TTL",
  "crawling",
  "indexing",
  "ranking",
  "SEO",
  "SEA",
  "SEM",
  "GEO",
  "zero click",
  "Lovett",
  "Social Measurement Compass",
  "media monitoring",
  "social media listening",
  "sentiment analysis",
  "topic",
  "hot topic",
  "mappa semantica",
  "ADS",
  "Audicom",
  "Auditel",
  "Audiradio",
  "JIC",
  "currency",
  "Golden Rule",
  "Yardstick",
  "PII",
  "MACRO",
  "Measurement Tree",
  "PRE Model",
  "Value Link",
  "Communication Value System",
  "Balanced Scorecard",
  "CCPM",
  "VALUES",
  "KPI",
  "KRI",
  "ROI",
  "ROO",
  "AVE",
  "REAV",
  "PQII",
  "Skandia",
  "capitale comunicativo",
  "Grunig",
  "Hon",
  "Berens",
  "Van Riel",
  "Reputation Quotient",
  "RepTrak",
];

const BANNED = /coordinate gps|bonifici bancari|spam|prezzo piu basso|ansia dei dipendenti|licenziamento|licenziare automaticamente|dati bancari|interessi bancari|costo della carta|effetti speciali|font usiamo|logo scegliamo|pausa pranzo|tutti i cittadini|segretezza assoluta|stato italiano|quiz a premi|sbloccare le domande|vietato per legge|illegali da utilizzare|tre parole chiave|email di spam|gps|denaro contante|pesati fisicamente|deprezzamento|umore del valutatore|magazzino|macchinetta|impianti audio|ispezione fiscale|evasioni|cancellare i messaggi|correttezza grammaticale|posizione geografica esatta|acquistare nuovi spazi|contratto annuale|eliminazione di tutti i competitor|incantesimo|oroscopo|lotteria|premio a sorte|cosa indica il net promoter score nps e come viene calcolato|secondo manuel castells come comunica e consuma|imbuto fisico|rubino i biscotti|costo del parcheggio|addormentarsi|nuovi gruppi di amici|troppo economici|forma scritta via email|si annoiano|a sorte da un contenitore|contemporaneamente all'inizio|ricette della nonna|voli aerei|critica distruttiva|attacchi degli hacker|tassazione sui servizi digitali|forme di baratto|proteggere i governi|televisione tradizionale|soldi pagati|aumentare lo stipendio|punire chiunque|beni fisici pesanti|frigorifero|ministero dell'economia|dimensioni fisiche|premio solo|scapito della felicita|compenso per gli intervistatori|capo azienda|termini di servizio dei social|scaricare i dati gratuitamente|dipendenti che il management|bancari personali|giorno di vacanza|arredamento dell'ufficio|sotto il livello dell acqua|spot marini|posizionamento geografico degli uffici|zone rurali|titolo in borsa|quotate in borsa|indici di borsa|azioni in borsa|ogni 24 ore|400|immediatamente statica|segnale radiofonico|direttore creativo|contratto di fornitura|errori trovati nel codice|media tradizionali perche sono morti|mappe geografiche|server|password|caffe|addizioni matematiche|database excel|obbligo di legge|obbligatori per legge|obbligatorio|obbligatoria|legge impone|legge sulla privacy|proibite dalla legge|vietate dai protocolli|legge italiana|virus informatico|indirizzo ip|scaffale del negozio|cancellati e ricaricati|antenne televisive|bozze digitali|premi vinti|algoritmo matematico|orologi|cartine geografiche|dimostrazione matematica assoluta|100% delle vendite|velocita di connessione|connessione wi-fi|cancellazione automatica|post negativi dai motori|rumore bianco|non e piu necessario raccogliere dati|solo l intuizione|solo l'intuizione|mappa geografica|luoghi digitali|cancellazione degli articoli|posizione geografica|controllo fiscale|superiore diretto|giornalisti che hanno scritto male|excel pesanti|luce l'acqua e il gas|spese per la luce|telefono privati|numeri di telefono|bloccare gli utenti|wikipedia come unica fonte|forza fisica|rumore prodotto|confondere i dirigenti|qualsiasi altra analisi|risparmiare energia|spegnendo|produttivita oraria|produttivita richiesto|riduce il costo del lavoro|automatizzando le relazioni|sostituisce la necessita|software gratuiti|qualita sostituisce completamente|ultima pagina alla prima|non comunicare nulla|dare ordini ai propri superiori|azzerare completamente le tasse|acquistare velocemente|monopolio assoluto|settore merceologico|indovinare i risultati|parente stretto|ingegneria meccanica|persone provenienti da nazioni diverse|non deve contenere piu di due domande|tre lingue diverse|stampare i fogli|non esistono piu esperti|non richiedono alcun budget|partecipanti tendono sempre a mentire|poco serio|poco affidabile|capi sono pigri|incolpare qualcuno|lanciare un prodotto a caso|chiedere agli amici|copiare fedelmente|critic.*subordinati|utenti anonimi|profilo linkedin del ceo|sovvenzioni statali|diminuiscono automaticamente|chip nel cervello|robot|microfono durante un focus group|profitti tra i vari soci|criptovalute|guardare lo stesso numero di minuti|pubbliche in italia|spiare i propri collaboratori|fatturare piu ore|rapporto finale molto piu lungo|grammatica italiana|determinare le colpe|toccato fisicamente|grado di resistenza verticale|cronometro|forum generalisti sono vietati|forum generalisti non esiste|metadati da analizzare nella fase|regolamento disciplinare|non conoscono i metodi statistici|budget.*sempre insufficienti|puramente casuali|intervistatori dimenticano|contratto sindacale|ogni singola famiglia|software statistici aggiornati|notaio|minimo di vendite|consegnati al ceo|calcolati automaticamente dai bot|euro non e piu considerato|troppo difficile da calcolare per i comunicatori|troppo difficile da calcolare per il management|nomi e cognomi|nomi e i cognomi|risarcimenti danni|grafici a torta|brevetti tecnologici|calcolo automatico della media|traduzione simultanea|tutti i dipendenti devono|stessa eta e professione|non e mai permesso offrire|listini dei media|suggerite dall algoritmo|e gratuito mentre|elenco degli amici|recensioni positive lasciate dai clienti|siti web possono essere chiusi|smettere di pubblicare|gratuito per tutti|obbligo di usare il computer|fine del commercio elettronico|scrivere in modo ripetitivo|rileggere gli stessi commenti|parlare in pubblico senza leggere|basandosi solo sul numero di like|amministratore delegato|maggioranza del cda|lunghezza fisica degli articoli|software automatico che sostituisce|algoritmo automatico|colpevolizzazione|canali.*pirata|falsificati.*agenzie|falsificati sistematicamente|compiacere|smettere di monitorare|confondere gli analisti|colori usare nel logo|consulenza esterne|costa molto di piu|privacy ne vietano|troppo tempo per essere raccolte|temperatura media|fuori dall'orario di lavoro|incremento automatico|occultamento dei dati|pressione sanguigna|licenziare l'agenzia|spot.*odiato|dieci anni|multinazionali del tabacco|toglie lavoro ai giornalisti|troppo basso rispetto al mercato|valore emotivo di una pubblicita|materie prime|nuovi uffici|scrivere e-mail|ortografia|libri pubblicati dal fondatore|inventario dei vecchi archivi/i;
const REVIEW_BANNED = /metodo socratico|ostetrico mentale|we are social 2026|59 14|93 8|lunghezza in centimetri|numero totale di lingue|pixel|bonus|magazzinieri|logo del brand|bug tecnici|banconote false|alto stipendio|tasse che l azienda|lingua latina|computer prodotti dopo|fatture di pagamento|utenti non hanno mai opinioni|volume della voce|dipendenti che parlano bene|fattura a un fornitore|profilo falso|battiti cardiaci|ordine tecnico di sospensione|bilanci degli editori|stagisti|ceo|sempre sbagliato|invidiosi|algoritmo di google|budget spesa in inchiostro|intercettare illegalmente|telefonate dei concorrenti|notizie positive gratis|bianco e nero|nessuno guarda|software di listening piu costoso|soldi rimasti|giornalisti a scrivere bene|sacchetto|prezzo base|bambini sotto|google per vedere|youtube|scaricati illegalmente|siti pirata|software scaricati illegalmente|guardie giurate|si sono sposati|dolci|cioccolatini|animali domestici|tutte le lingue del mondo|velocita del sito|numero di follower su instagram al numero di dipendenti|reclami ricevuti|televisori venduti|radio vendute|fedelta politica|software di analisi.*editori|censurano|ads notizie|just in case|euro dollaro|fake news|effettivamente letto ogni pagina|pagamenti del canone|meter guasto|dirigenti televisivi|palinsesti|mixaggio automatico|ginnastica|colore della cravatta|film visto|velocita del vento|software piu costoso|dipartimento separato|ministero dell economia|yardistic|\bvpl\b|pqll|giga byte|gravita degli errori|guadagno reale delle vendite|giornalisti che scrivono|logo aziendale appare|radio e televisione analogica|rifiutato di leggere|ogni singola parola|contratto senza leggerlo|prestare denaro|patto di non concorrenza|moltiplica il numero di dipendenti|velocita di risposta sui social|software che corregge|colore dei loghi|licenziare lo staff|geni incompresi|dollari|benessere fisico|post pubblicati dagli influencer|partecipanti di analizzare|intelligenza artificiale per scrivere|due ore|spegnere l ia|file excel|post divertenti|registrazione audio|telefoniche del call center|utenti sono intrinsecamente ignoranti|perderanno il 50|premio in denaro|articolo e troppo lungo|errori grammaticali|moda passeggera|agenzia di stampa|hacker|principio 10|piangere|usare i dadi|inventarsi i dati|colore della carta|ore di sonno|tabelline|nessun giornalista|criptovaluta|tre timbri|tre persone|quartieri residenziali|cittadinanza straniera|votare alle elezioni|cartelli stradali|valuta estera|mercato nero|sette anni|crepe fisiche|muri della sede|ultimi 50 anni/i;

const manualDistractors = {
  "Fondamenti della misurazione": [
    "Una misura di output prodotta alla chiusura della campagna",
    "Un indicatore disponibile ma non collegato alla decisione",
    "Un indicatore economico aggregato riferito ai risultati complessivi dell'organizzazione",
    "Una metrica raccolta senza benchmark e senza obiettivo",
  ],
  "Ricerca in comunicazione": [
    "Una rilevazione standardizzata su campioni statisticamente rappresentativi",
    "Una tecnica qualitativa orientata a motivazioni e significati profondi",
    "Un disegno causale con gruppo sperimentale e gruppo di controllo",
    "Una fonte secondaria gia disponibile ma non costruita ad hoc",
  ],
  "Digitale, social e motori di ricerca": [
    "Il posizionamento organico dei contenuti nella pagina dei risultati",
    "L'insieme delle attivita a pagamento sui motori di ricerca",
    "La visibilita nei motori di risposta generativi",
    "Il tracciamento degli eventi e delle conversioni in analytics",
  ],
  "Monitoring, listening e sentiment": [
    "Il volume delle menzioni rilevate nel periodo di osservazione",
    "La classificazione del tono riferita al soggetto analizzato",
    "La lettura dei topic ricorrenti e degli hot topic emergenti",
    "La valutazione della presenza mediatica per quantita e qualita",
  ],
  "Enti certificatori e audience": [
    "La certificazione di tiratura e diffusione della stampa",
    "La misurazione della Total Audience televisiva",
    "La rilevazione integrata di audience digitali e stampa",
    "Una currency condivisa per pianificazione e compravendita degli spazi",
  ],
  "Modelli di valutazione": [
    "Un modello a livelli che distingue output, out-take e outcome",
    "Un framework che accompagna ricerca, pianificazione e azione",
    "Un modello che parte dagli input e dalle micro-decisioni professionali",
    "Un albero che collega obiettivi, pubblici, strategie e risultati",
  ],
  "Performance measurement e CCPM": [
    "Un indicatore lag che sintetizza risultati gia ottenuti",
    "Un indicatore lead collegato ai driver futuri di performance",
    "Un sistema che collega obiettivi di business e valore comunicativo",
    "Una prospettiva relazionale e manageriale della misurazione",
  ],
  "ROI, AVE e indicatori economici": [
    "Il raggiungimento degli obiettivi non necessariamente monetari",
    "Il valore dello spazio editoriale espresso come equivalente pubblicitario",
    "Un indice corretto con moltiplicatori qualitativi della copertura",
    "Il rapporto tra benefici e costi riferito a una specifica attivita",
  ],
  "Intangibili e reputazione": [
    "La percezione esterna sedimentata nel tempo dagli stakeholder",
    "L'autorappresentazione organizzativa e i valori dichiarati",
    "La qualita della relazione fondata su fiducia e soddisfazione",
    "La capacita narrativa di rendere visibili le risorse immateriali",
  ],
};

const manualReasonDistractors = {
  "Fondamenti della misurazione": [
    "Perche misura solo la produzione immediata dei contenuti, non gli effetti sui pubblici",
    "Perche collega direttamente ogni risultato alle vendite senza considerare altri fattori",
    "Perche privilegia il dato disponibile rispetto agli obiettivi informativi",
    "Perche confonde la rendicontazione finale con il miglioramento in itinere",
  ],
  "Ricerca in comunicazione": [
    "Perche privilegia campioni ampi ma non consente di esplorare motivazioni profonde",
    "Perche descrive correlazioni tra variabili senza controllare il nesso causale",
    "Perche usa dati secondari non costruiti per lo specifico problema di ricerca",
    "Perche misura la frequenza delle risposte senza interpretare il contesto",
  ],
  "Digitale, social e motori di ricerca": [
    "Perche si limita a contare interazioni sulle property proprietarie",
    "Perche descrive il traffico organico senza analizzare le conversazioni spontanee",
    "Perche misura solo la pressione pubblicitaria a pagamento",
    "Perche considera la visibilita come semplice pubblicazione del contenuto",
  ],
  "Monitoring, listening e sentiment": [
    "Perche misura il volume delle citazioni senza interpretarne il tono",
    "Perche classifica il sentiment senza considerare topic e contesto",
    "Perche privilegia fonti generaliste invece di selezionare ambienti rilevanti",
    "Perche osserva solo l'andamento quantitativo delle menzioni nel periodo",
  ],
  "Enti certificatori e audience": [
    "Perche misura solo la tiratura dichiarata senza stimare la fruizione effettiva",
    "Perche usa una fonte proprietaria non condivisa dalle componenti del mercato",
    "Perche aggiorna il dato di consumo senza certificare la qualita metodologica",
    "Perche considera equivalenti panel, censuario e currency di mercato",
  ],
  "Modelli di valutazione": [
    "Perche si ferma agli output e non arriva agli outcome",
    "Perche applica lo stesso schema a ogni programma senza adattarlo agli obiettivi",
    "Perche confonde il modello di pianificazione con il sistema di rendicontazione",
    "Perche privilegia indicatori economici immediati rispetto agli effetti sui pubblici",
  ],
  "Performance measurement e CCPM": [
    "Perche misura solo risultati gia avvenuti senza considerare i driver futuri",
    "Perche riduce la performance comunicativa a un unico indicatore finanziario",
    "Perche separa gli obiettivi comunicativi dagli obiettivi strategici dell'organizzazione",
    "Perche considera la valutazione come controllo finale invece che come processo partecipativo",
  ],
  "ROI, AVE e indicatori economici": [
    "Perche attribuisce alla comunicazione effetti economici senza isolare altri fattori",
    "Perche trasforma la copertura editoriale in valore monetario ignorando il contesto",
    "Perche misura solo l'efficienza dei costi e non il raggiungimento degli obiettivi",
    "Perche usa un valore equivalente senza considerare tono, fonte e centralita",
  ],
  "Intangibili e reputazione": [
    "Perche considera la reputazione come un effetto immediato della singola campagna",
    "Perche riduce fiducia e relazioni a semplici indicatori di visibilita",
    "Perche confonde identita dichiarata, immagine percepita e reputazione sedimentata",
    "Perche osserva solo il capitale umano senza considerare stakeholder e relazioni",
  ],
};

function q(section, text, options, answer, source = "exam-photo") {
  return {
    section,
    text,
    options: { A: options[0], B: options[1], C: options[2], D: options[3] },
    answer,
    source,
  };
}

const ITALIAN_ACCENT_WORDS = new Map([
  ["adattabilita", "adattabilità"],
  ["affidabilita", "affidabilità"],
  ["ambiguita", "ambiguità"],
  ["attivita", "attività"],
  ["autorita", "autorità"],
  ["capacita", "capacità"],
  ["causalita", "causalità"],
  ["centralita", "centralità"],
  ["citta", "città"],
  ["cio", "ciò"],
  ["comunita", "comunità"],
  ["cosi", "così"],
  ["contabilita", "contabilità"],
  ["creativita", "creatività"],
  ["credibilita", "credibilità"],
  ["criticita", "criticità"],
  ["disponibilita", "disponibilità"],
  ["difficolta", "difficoltà"],
  ["diversita", "diversità"],
  ["e", "e"],
  ["efficacia", "efficacia"],
  ["eta", "età"],
  ["fedelta", "fedeltà"],
  ["finalita", "finalità"],
  ["gia", "già"],
  ["identita", "identità"],
  ["incapacita", "incapacità"],
  ["impossibilita", "impossibilità"],
  ["integrita", "integrità"],
  ["intensita", "intensità"],
  ["marginalita", "marginalità"],
  ["modalita", "modalità"],
  ["necessita", "necessità"],
  ["neutralita", "neutralità"],
  ["notorieta", "notorietà"],
  ["novita", "novità"],
  ["numerosita", "numerosità"],
  ["opportunita", "opportunità"],
  ["pariteticita", "pariteticità"],
  ["perche", "perché"],
  ["pero", "però"],
  ["piu", "più"],
  ["poiche", "poiché"],
  ["polarita", "polarità"],
  ["possibilita", "possibilità"],
  ["priorita", "priorità"],
  ["produttivita", "produttività"],
  ["profondita", "profondità"],
  ["proprieta", "proprietà"],
  ["pubblicita", "pubblicità"],
  ["puntualita", "puntualità"],
  ["puo", "può"],
  ["qualita", "qualità"],
  ["quantita", "quantità"],
  ["realta", "realtà"],
  ["reciprocita", "reciprocità"],
  ["redditivita", "redditività"],
  ["responsabilita", "responsabilità"],
  ["rilevanza", "rilevanza"],
  ["rappresentativita", "rappresentatività"],
  ["riconoscibilita", "riconoscibilità"],
  ["sensibilita", "sensibilità"],
  ["societa", "società"],
  ["sostenibilita", "sostenibilità"],
  ["specificita", "specificità"],
  ["stabilita", "stabilità"],
  ["tempestivita", "tempestività"],
  ["unita", "unità"],
  ["utilita", "utilità"],
  ["validita", "validità"],
  ["variabilita", "variabilità"],
  ["velocita", "velocità"],
  ["veridicita", "veridicità"],
  ["verita", "verità"],
  ["visibilita", "visibilità"],
]);

function preserveCase(original, replacement) {
  if (original === original.toUpperCase()) return replacement.toUpperCase();
  if (original[0] === original[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
}

function restoreItalianAccents(value) {
  let text = String(value || "");
  for (const [plain, accented] of ITALIAN_ACCENT_WORDS) {
    if (plain === accented) continue;
    text = text.replace(new RegExp(`\\b${plain}\\b`, "gi"), match => preserveCase(match, accented));
  }

  return text
    .replace(/\b([Cc]os')e\b/g, "$1è")
    .replace(/\b([Qq]ual) e\b/g, "$1 è")
    .replace(/\b([Cc]osa) e\b/g, "$1 è")
    .replace(/\b([Cc]he cosa) e\b/g, "$1 è")
    .replace(/\b([Cc]ome) e\b/g, "$1 è")
    .replace(/\b([Qq]uando) e\b/g, "$1 è")
    .replace(/\b([Dd]ove) e\b/g, "$1 è")
    .replace(/\be (?=(?:strategicamente|realmente|particolarmente)\b)/g, "è ")
    .replace(/\bE (?=(?:strategicamente|realmente|particolarmente)\b)/g, "È ")
    .replace(/\b(Quale tipo di metodo) e (?=più adatto\b)/g, "$1 è ")
    .replace(/\b(la visibilità) e (?=più selettiva\b)/g, "$1 è ")
    .replace(/\b(ciò che) e (?=facile\b)/g, "$1 è ")
    .replace(/\b(se) e (?=protagonista\b)/g, "$1 è ")
    .replace(/\b(comportamento) e (?=stato interpretato\b)/g, "$1 è ")
    .replace(/\b(Fino a quando|fino a quando|finche|Finche)\b/g, match => preserveCase(match, "finché"))
    .replace(/\b([Pp]erché) e\b/g, "$1 è")
    .replace(/\b([Nn]on) e\b/g, "$1 è")
    .replace(/\b(l'utilizzo dell'analisi del contenuto) e (?=particolarmente\b)/gi, "$1 è ")
    .replace(/\b(Quale media) e (?=migliore\b)/g, "$1 è ")
    .replace(/\b(La competizione) e (?=interna\b)/g, "$1 è ")
    .replace(/\b(il search advertising) e (?=separato\b)/gi, "$1 è ")
    .replace(/\b(Quale tra i seguenti) e (?=un\b)/g, "$1 è ")
    .replace(/\b(Quale delle seguenti) e (?=una\b)/g, "$1 è ")
    .replace(/\b(Quale metrica) e (?=considerata\b)/g, "$1 è ")
    .replace(/\b(Quale di queste affermazioni sul ROI della comunicazione) e (?=corretta\b)/g, "$1 è ")
    .replace(/\b(L'indicatore ROEM \(Return on Earned Media\)) e (?=un sinonimo\b)/g, "$1 è ")
    .replace(/\b(del '[^']+') e (?=utile\b)/g, "$1 è ")
    .replace(/\b(valutazione) e (?=efficace\b)/g, "$1 è ")
    .replace(/\b(non sempre) e (?=possibile\b)/g, "$1 è ")
    .replace(/\b(la comunicazione) e (?=centrale\b)/g, "$1 è ")
    .replace(/\b(focus group) e (?=già\b)/g, "$1 è ")
    .replace(/\b(l'esposizione) e (?=favorevole\b)/g, "$1 è ")
    .replace(/\b(messaggio chiave) e (?=ripetuto\b)/g, "$1 è ")
    .replace(/\bc'e\b/g, "c'è")
    .replace(/\bC'e\b/g, "C'è")
    .replace(/ciòè/g, "cioè")
    .replace(/Ciòè/g, "Cioè")
    .replace(/\b(ADS) e (?=stato costituito\b)/g, "$1 è ")
    .replace(/\be([:?!])/g, "è$1")
    .replace(/\bE([:?!])/g, "È$1")
    .replace(/(^|[.!?]\s+)E (?=(?:necessario|utile|corretto|sbagliato|possibile|importante|preferibile|opportuno|rilevante|centrale|misurabile)\b)/g, "$1È ");
}

function cleanText(value) {
  return restoreItalianAccents(String(value || "")
    .normalize("NFKC")
    .replace(/\$([0-9]+)\\%\$/g, "$1%")
    .replace(/\$([A-Za-z0-9]+)\$/g, "$1")
    .replace(/[’]/g, "'")
    .replace(/[“”]/g, "\"")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:?!])/g, "$1")
    .trim());
}

function normalizeKey(value) {
  return cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isBannedText(value) {
  const key = normalizeKey(value);
  return BANNED.test(key) || REVIEW_BANNED.test(key);
}

function coverageKey(value) {
  return normalizeKey(value).replace(/\s+/g, " ");
}

function wordCount(value) {
  return cleanText(value).split(/\s+/).filter(Boolean).length;
}

const STOP_WORDS = new Set([
  "che", "cosa", "quale", "quali", "nel", "nella", "nello", "secondo", "perche", "come",
  "sono", "alla", "allo", "alle", "agli", "della", "delle", "degli", "del", "dei", "con",
  "una", "uno", "un", "gli", "per", "tra", "fra", "rispetto", "indica", "intende", "serve",
  "viene", "puo", "essere", "misura", "modello", "framework", "comunicazione", "analisi",
]);

function contentTokens(value) {
  return normalizeKey(value)
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOP_WORDS.has(token));
}

function contentTokenSet(value) {
  return new Set(contentTokens(value));
}

function overlapRatioSets(a, b) {
  if (!a.size || !b.size) return 0;
  let overlap = 0;
  for (const token of a) if (b.has(token)) overlap += 1;
  return overlap / Math.min(a.size, b.size);
}

function candidateSimilarity(base, other) {
  if (base === other) return -100;
  const stemOverlap = overlapRatioSets(base.textTokens, other.textTokens);
  const fullOverlap = overlapRatioSets(base.fullTokens, other.fullTokens);
  const sameSection = base.section === other.section ? 2 : 0;
  const sameKind = base.kind === other.kind ? 1 : 0;
  return sameSection + sameKind + stemOverlap * 4 + fullOverlap * 2;
}

function cleanSection(section) {
  const s = cleanText(section).replace(/^\d+\.\s*/, "");
  if (/fondamenti/i.test(s)) return "Fondamenti della misurazione";
  if (/ricerche|ricerca in comunicazione/i.test(s)) return "Ricerca in comunicazione";
  if (/modelli di comunicazione|digitale|social e motori/i.test(s)) return "Digitale, social e motori di ricerca";
  if (/monitoring|listening|sentiment/i.test(s)) return "Monitoring, listening e sentiment";
  if (/\benti\b|audience/i.test(s)) return "Enti certificatori e audience";
  if (/modelli di valutazione/i.test(s)) return "Modelli di valutazione";
  if (/performance|ccpm/i.test(s)) return "Performance measurement e CCPM";
  if (/roi|ave|indicatori economici/i.test(s)) return "ROI, AVE e indicatori economici";
  if (/intangibili|reputazione/i.test(s)) return "Intangibili e reputazione";
  return "Altri argomenti dalle fonti";
}

function inferSection(question) {
  const answer = question.answer || "A";
  const correct = (question.options || {})[answer] || "";
  const hay = normalizeKey(`${question.text} ${correct}`);
  if (/\b(roi|roo|ave|reav|pqii|cosenza|return on ignorance|silver metric|valore economico)\b/i.test(hay)) return "ROI, AVE e indicatori economici";
  const explicit = cleanSection(question.section);
  const hasAudienceSignal = /\b(ads|audicom|audiweb|auditel|audiradio|ter|jic|currency|panel|census|sdk|meter|total audience)\b|tiratura|diffusione (?:di |dei |della |delle )?(?:quotidiani|periodici|stampa|copie|edizioni)/i.test(hay);
  if (hasAudienceSignal) return "Enti certificatori e audience";
  const hasDigitalSignal = /\b(social|web|seo|sea|sem|geo|ga4|quality score|zero click|motori di risposta|intelligenza artificiale|analytics|pyramid|compass|owyang|altimeter|peso|zmot|lovett|customer care|crawling|indexing|ranking|serp|follower|metriche di interazione|tecnologia per la misurazione)\b/i.test(hay);
  if (hasDigitalSignal) return "Digitale, social e motori di ricerca";
  if (/\b(ccpm|balanced scorecard|value link|values|kpi|kri|performance|communication value system|return on communication|lead|lag|variabili ponte)\b/i.test(hay)) return "Performance measurement e CCPM";
  if (/\b(yardstick|pii|macro model|measurement tree|pre model|barcelona|amec|integrated evaluation framework|smart|modello|framework|watson)\b/i.test(hay)) return "Modelli di valutazione";
  if (/\b(reputazione|intangibili|beni intangibili|asset intangibili|capitale comunicativo|capitale narrativo|capitale relazionale|identita|immagine|grunig|hon|relazioni di scambio|relazioni comunitarie|reptrak|reputation quotient|fortune|wmac|berens|van riel|stakeholder|fiducia|soddisfazione|integrita|skandia)\b/i.test(hay)) return "Intangibili e reputazione";
  if (/\b(listening|monitoring|sentiment|topic|hot topic|mappa semantica|share of voice|media relation|rassegna|lettore medio|ots|analisi semantica|tassonomia|query|influencer|competitor|valutazione dinamica|analisi delle persone|disambiguazione|ascolto globale|selezione delle fonti)\b/i.test(hay)) return "Monitoring, listening e sentiment";
  if (/\b(focus group|survey|questionario|cawi|cati|intervista|osservazione|ricerca|ricerche|indagine|campione|campionamento|neuromarketing|eye tracker|eeg|gsr|heat map|pre test|proiettive|qualitativ|quantitativ|causal|controllo)\b/i.test(hay)) return "Ricerca in comunicazione";
  if (explicit !== "Altri argomenti dalle fonti") return explicit;
  return "Fondamenti della misurazione";
}

function answerKind(value) {
  const text = cleanText(value);
  const words = wordCount(text);
  if (words <= 2) return "short";
  if (/^(Tim|Jeffrey|Vincenzo|James|Grunig|Hon|Berens|Van|Watson|Romenti|Lovett|Owyang)\b/.test(text)) return "name";
  if (/^[A-Z0-9 .\/+-]{2,}$/.test(text) || /\b[A-Z]{2,}\b/.test(text)) return "term";
  if (/,/.test(text) && words <= 12) return "list";
  return "definition";
}

function optionQuality(option, correct) {
  const o = cleanText(option);
  if (!o || isBannedText(o)) return false;
  if (normalizeKey(o) === normalizeKey(correct)) return false;
  const ow = wordCount(o);
  const cw = wordCount(correct);
  if (cw <= 2) return ow <= 8;
  if (cw <= 5) return ow >= 2 && ow <= 13;
  return ow >= Math.max(5, Math.floor(cw * 0.55)) && ow <= Math.ceil(cw * 1.7) + 3;
}

function tagsFor(question) {
  const correct = question.options[question.answer] || "";
  const hay = normalizeKey(`${question.text} ${correct}`);
  const tags = new Set();
  const sectionTags = {
    "Fondamenti della misurazione": "fondamenti",
    "Ricerca in comunicazione": "ricerca_metodi",
    "Digitale, social e motori di ricerca": "seo_geo_digitale",
    "Monitoring, listening e sentiment": "media_monitoring",
    "Enti certificatori e audience": "enti_audience",
    "Modelli di valutazione": "modelli",
    "Performance measurement e CCPM": "performance_ccpm",
    "ROI, AVE e indicatori economici": "roi_ave",
    "Intangibili e reputazione": "reputazione_intangibili",
  };
  tags.add(sectionTags[question.section]);
  const roiMetricSignal = /\b(roi|roo|ave|reav|pqii|cosenza|return on ignorance|silver metric|valore economico)\b/.test(hay);
  if (/yardstick|pii|macro|measurement tree|pre model|barcelona|amec|integrated evaluation|smart|balanced scorecard|ccpm|values|value link|communication value system|social measurement compass|roi pyramid|altimeter|owyang|lovett|peso|zmot|reputation quotient|reptrak|fortune|wmac|berens|grunig|hon|watson|skandia|modello|framework/.test(hay)) tags.add("modelli");
  if (!roiMetricSignal && /\b(auditel|audicom|audiweb|audiradio|ads|ter|jic|currency|panel|census|sdk|meter|meters|total audience)\b|tiratura|diffusione (?:di |dei |della |delle )?(?:quotidiani|periodici|stampa|copie|edizioni)/.test(hay)) tags.add("enti_audience");
  if (/social|listening|sentiment|topic|hot topic|analytics|roi|roo|ave|reav|pqii|cosenza|owyang|altimeter|compass|customer care|brand health/.test(hay)) tags.add("social_roi");
  if (/focus group|survey|questionario|cawi|cati|intervista|osservazione|neuromarketing|eye tracker|eeg|gsr|heat map|campione|ricerca|pre test|proiettive/.test(hay)) tags.add("ricerca_metodi");
  if (/seo|sea|sem|geo|ga4|quality score|zero click|motori di risposta|web 1|web 2|web 3|web 4|intelligenza artificiale|api|scraping|rss|crawling|serp/.test(hay)) tags.add("seo_geo_digitale");
  return [...tags].filter(Boolean).sort();
}

function sourceToCandidate(item, index) {
  const answer = item.answer || "A";
  const options = Object.fromEntries(Object.entries(item.options || {}).map(([key, value]) => [key, cleanText(value)]));
  const correct = options[answer];
  const text = cleanText(item.text);
  const originalWrong = ["A", "B", "C", "D"].filter(letter => letter !== answer).map(letter => options[letter]).filter(Boolean);
  return {
    sourceIndex: index,
    source: item.source || "notebooklm",
    section: inferSection(item),
    text,
    correct: cleanText(correct),
    originalWrong,
    originalGoodCount: originalWrong.filter(option => optionQuality(option, correct)).length,
    kind: answerKind(correct),
    textTokens: contentTokenSet(text),
    fullTokens: contentTokenSet(`${text} ${correct}`),
  };
}

function questionScore(candidate) {
  let score = 0;
  const words = wordCount(candidate.text);
  const correctWords = wordCount(candidate.correct);
  if (candidate.source === "exam-photo") score -= 1000;
  if (candidate.source === "appunti-cheat") score -= 900;
  if (candidate.originalGoodCount < 3) score += 350 + (3 - candidate.originalGoodCount) * 120;
  if (/^(Quale|Quali|Cosa|Che cosa|Perche|Nel|Nella|Secondo|Tra|Rispetto|Un team|La visibilita|L'utilizzo)/.test(candidate.text)) score -= 30;
  if (words > 28) score += (words - 28) * 8;
  if (words < 5) score += 12;
  if (correctWords > 18) score += (correctWords - 18) * 5;
  if (isBannedText(candidate.text) || isBannedText(candidate.correct)) score += 500;
  return score;
}

function buildDistractorPools(candidates) {
  const pools = {};
  for (const section of SECTIONS) {
    pools[section] = {};
    for (const kind of ["short", "term", "name", "list", "definition"]) {
      pools[section][kind] = candidates
        .filter(candidate => candidate.section === section && candidate.kind === kind && !isBannedText(candidate.correct))
        .sort((a, b) => a.sourceIndex - b.sourceIndex);
    }
  }
  return pools;
}

function addUnique(target, value, correct) {
  const option = cleanText(value);
  if (!optionQuality(option, correct)) return false;
  if (target.some(existing => normalizeKey(existing) === normalizeKey(option))) return false;
  target.push(option);
  return true;
}

function chooseDistractors(candidate, pools) {
  const chosen = [];
  const correct = candidate.correct;
  const original = candidate.originalWrong
    .filter(option => optionQuality(option, correct))
    .sort((a, b) => Math.abs(wordCount(a) - wordCount(correct)) - Math.abs(wordCount(b) - wordCount(correct)));
  for (const option of original) addUnique(chosen, option, correct);

  const sectionPool = (pools[candidate.section]?.[candidate.kind] || [])
    .filter(item => item !== candidate)
    .sort((a, b) => candidateSimilarity(candidate, b) - candidateSimilarity(candidate, a))
    .map(item => item.correct);
  const sectionDefinitionPool = (pools[candidate.section]?.definition || [])
    .filter(item => item !== candidate)
    .sort((a, b) => candidateSimilarity(candidate, b) - candidateSimilarity(candidate, a))
    .map(item => item.correct);
  const globalKindPool = SECTIONS.flatMap(section => pools[section]?.[candidate.kind] || [])
    .filter(item => item !== candidate)
    .sort((a, b) => candidateSimilarity(candidate, b) - candidateSimilarity(candidate, a))
    .map(item => item.correct);
  const sectionManualPool = manualDistractors[candidate.section] || [];
  const sectionReasonPool = /^perche\b/i.test(normalizeKey(candidate.text))
    ? manualReasonDistractors[candidate.section] || []
    : [];
  const allManualPool = Object.values(manualDistractors).flat();
  const poolOrder = candidate.kind === "definition" || candidate.kind === "list"
    ? [sectionReasonPool, sectionPool, sectionDefinitionPool, sectionManualPool, globalKindPool, allManualPool]
    : [sectionPool, sectionReasonPool, sectionDefinitionPool, sectionManualPool, globalKindPool, allManualPool];

  for (const pool of poolOrder) {
    const sorted = [...pool]
      .filter(option => normalizeKey(option) !== normalizeKey(correct))
      .sort((a, b) => Math.abs(wordCount(a) - wordCount(correct)) - Math.abs(wordCount(b) - wordCount(correct)));
    for (const option of sorted) {
      addUnique(chosen, option, correct);
      if (chosen.length >= 3) return chosen.slice(0, 3);
    }
  }

  throw new Error(`Not enough distractors for: ${candidate.text}`);
}

function toQuestion(id, candidate, pools) {
  const distractors = chooseDistractors(candidate, pools);
  const question = {
    id,
    section: candidate.section,
    text: candidate.text,
    options: {
      A: candidate.correct,
      B: distractors[0],
      C: distractors[1],
      D: distractors[2],
    },
    answer: "A",
  };
  question.tags = tagsFor(question);
  if (candidate.source === "exam-photo") question.tags = [...new Set([...question.tags, "stile_esame"])].sort();
  return question;
}

function selectQuestions(candidates) {
  const selected = [];
  const selectedText = new Set();
  for (const [section, target] of TARGETS) {
    const pool = candidates
      .filter(candidate => candidate.section === section)
      .sort((a, b) => questionScore(a) - questionScore(b));
    for (const candidate of pool) {
      if (selected.filter(item => item.section === section).length >= target) break;
      const key = normalizeKey(candidate.text);
      if (selectedText.has(key)) continue;
      selected.push(candidate);
      selectedText.add(key);
    }
  }
  if (selected.length !== EXPECTED_TOTAL) {
    throw new Error(`Expected ${EXPECTED_TOTAL} questions, selected ${selected.length}`);
  }
  return selected;
}

function validate(bank) {
  const errors = [];
  const bySection = {};
  const byTag = {};
  const seen = new Set();
  for (const question of bank) {
    bySection[question.section] = (bySection[question.section] || 0) + 1;
    for (const tag of question.tags) byTag[tag] = (byTag[tag] || 0) + 1;
    const key = normalizeKey(question.text);
    if (seen.has(key)) errors.push(`Duplicate text: ${question.text}`);
    seen.add(key);
    const correct = question.options[question.answer];
    const lengths = Object.values(question.options).map(wordCount);
    const min = Math.min(...lengths);
    const max = Math.max(...lengths);
    if (wordCount(question.text) > 38) errors.push(`Stem too long: ${question.id}`);
    if (max > Math.max(8, min * 3 + 5)) {
      errors.push(`Distractor length imbalance: ${question.id} ${JSON.stringify(question.options)} lengths=${lengths.join(",")}`);
    }
    if (Object.values(question.options).some(option => isBannedText(option))) errors.push(`Banned option: ${question.id} ${question.text} ${JSON.stringify(question.options)}`);
    if (!correct || !question.answer) errors.push(`Missing answer: ${question.id}`);
  }
  for (const [section, target] of TARGETS) {
    if (bySection[section] !== target) errors.push(`Section ${section}: ${bySection[section]} !== ${target}`);
  }
  for (const mode of SPECIAL_QUIZZES.filter(item => item.tag)) {
    if ((byTag[mode.tag] || 0) < 50) errors.push(`Special quiz ${mode.id} has only ${byTag[mode.tag] || 0} questions`);
  }
  const normalizedSource = coverageKey(courseSourceText);
  const normalizedBank = coverageKey(bank.map(question => `${question.text} ${Object.values(question.options).join(" ")}`).join("\n"));
  for (const term of COVERAGE_TERMS) {
    const normalizedTerm = coverageKey(term);
    if (!normalizedSource.includes(normalizedTerm)) errors.push(`Coverage term not found in course sources: ${term}`);
    if (!normalizedBank.includes(normalizedTerm)) errors.push(`Coverage term missing from generated bank: ${term}`);
  }
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  return { bySection, byTag };
}

const notebookBank = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const allCandidates = [...examSeeds, ...modelExtraSeeds, ...entiExtraSeeds, ...studySeeds, ...notebookBank]
  .map(sourceToCandidate)
  .filter(candidate => candidate.text && candidate.correct)
  .filter(candidate => !isBannedText(candidate.text))
  .filter(candidate => wordCount(candidate.text) <= 42);

const selected = selectQuestions(allCandidates);
const pools = buildDistractorPools(allCandidates);
const bank = selected.map((candidate, index) => toQuestion(index + 1, candidate, pools));

const manualReviewOverrides = {
  q272: {
    matchText: "Nel modello logico del processo di valutazione, cosa sono le \"variabili ponte\"?",
    options: {
      A: "Intangibili come fiducia, reputazione e relazione che collegano outcome e impatto.",
      B: "Le risorse umane ed economiche investite nelle attività di comunicazione.",
      C: "Metriche quantitative che descrivono soltanto la copertura media ottenuta.",
      D: "Gli effetti finali sulle performance complessive dell'organizzazione.",
    },
  },
  focusFunnel: {
    matchText: "Cosa si intende per tecnica delle domande 'a imbuto' nella conduzione di un focus group?",
    options: {
      A: "Partire da temi generali e arrivare gradualmente a domande più specifiche.",
      B: "Alternare domande aperte e chiuse senza seguire un ordine predefinito.",
      C: "Porre subito domande direttive per ridurre la varietà delle risposte.",
      D: "Distribuire le domande tra i partecipanti in base al loro ruolo aziendale.",
    },
  },
  quantitativeTool: {
    matchText: "Quale di questi strumenti è tipico della ricerca quantitativa?",
    options: {
      A: "La survey su un campione definito.",
      B: "L'intervista in profondità con traccia semi-strutturata.",
      C: "Le tecniche proiettive basate su stimoli ambigui.",
      D: "L'osservazione partecipante in un contesto naturale.",
    },
  },
  preOutcomePhase: {
    matchText: "Quale tra queste è una fase della valutazione degli outcome nel modello PRE?",
    text: "Nel modello PRE, a cosa serve la valutazione finale?",
    options: {
      A: "A capire se gli obiettivi sono stati raggiunti e quali outcome sono emersi.",
      B: "A costruire la media list prima dell'avvio operativo della campagna.",
      C: "A definire il budget disponibile prima della ricerca preliminare.",
      D: "A scegliere gli strumenti creativi senza confrontarli con gli obiettivi.",
    },
  },
  focusObserver: {
    matchText: "Nel contesto della ricerca qualitativa, qual è il ruolo dell''Osservatore' durante un Focus Group?",
    text: "Nel contesto della ricerca qualitativa, qual è il ruolo dell'osservatore durante un focus group?",
    options: {
      A: "Registrare reazioni non verbali, dinamiche di gruppo e passaggi rilevanti della discussione.",
      B: "Guidare la conversazione al posto del moderatore quando emergono opinioni divergenti.",
      C: "Selezionare il campione statistico e calcolare la rappresentatività dei risultati.",
      D: "Trasformare le risposte qualitative in una stima immediata del ROI della campagna.",
    },
  },
  focusInteraction: {
    matchText: "Nella ricerca qualitativa, qual è il vantaggio principale dell''Interazione' tra i partecipanti di un Focus Group?",
    text: "Nella ricerca qualitativa, qual è il vantaggio principale dell'interazione tra i partecipanti di un focus group?",
    options: {
      A: "Stimola confronto e creatività, facendo emergere idee difficili da ottenere in interviste singole.",
      B: "Elimina del tutto il rischio di conformismo tra persone con opinioni diverse.",
      C: "Garantisce automaticamente risultati rappresentativi dell'intera popolazione.",
      D: "Permette di sostituire il moderatore con una traccia completamente standardizzata.",
    },
  },
  focusGroupLimit: {
    matchText: "Quale tra i seguenti è un limite intrinseco dei 'Focus Group' menzionato nel materiale?",
    options: {
      A: "La necessità di confermare spesso gli insight con una successiva indagine quantitativa.",
      B: "La difficoltà di osservare interazioni tra partecipanti con esperienze diverse.",
      C: "L'impossibilità di usare una traccia di discussione preparata dal ricercatore.",
      D: "La produzione esclusiva di dati numerici immediatamente generalizzabili.",
    },
  },
  webMemoryFormula: {
    matchText: "Quale 'formula di memoria' viene suggerita per l'evoluzione del Web da 1.0 a 4.0?",
    options: {
      A: "Web 1.0 legge, Web 2.0 partecipa, Web 3.0 comprende, Web 4.0 agisce.",
      B: "Web 1.0 ascolta, Web 2.0 compra, Web 3.0 recensisce, Web 4.0 archivia.",
      C: "Web 1.0 stampa, Web 2.0 trasmette, Web 3.0 vende, Web 4.0 certifica.",
      D: "Web 1.0 misura output, Web 2.0 outcome, Web 3.0 impatto, Web 4.0 ROI.",
    },
  },
  competitiveTrend: {
    matchText: "Secondo le dispense, perché è utile la 'Valutazione Competitiva' dinamica mese per mese?",
    options: {
      A: "Per individuare variazioni nella copertura dei competitor e decidere azioni proattive.",
      B: "Per sostituire il monitoraggio qualitativo con un unico dato di vendita mensile.",
      C: "Per classificare ogni menzione come positiva senza leggere il contesto.",
      D: "Per confrontare solo i dati interni evitando benchmark esterni.",
    },
  },
  peopleAnalysisAction: {
    matchText: "Quale delle seguenti azioni è un esempio concreto derivante dall'Analisi delle Persone?",
    options: {
      A: "Contattare tempestivamente un influencer rilevante che critica l'organizzazione.",
      B: "Modificare la tassonomia semantica senza considerare il ruolo degli autori.",
      C: "Aumentare la frequenza dei post senza distinguere le community coinvolte.",
      D: "Ignorare gli autori marginali e rilevanti trattandoli come fonti equivalenti.",
    },
  },
  semanticDisambiguation: {
    matchText: "Cosa si intende per 'disambiguazione' effettuata dai moduli di analisi semantica?",
    options: {
      A: "Identificare il significato corretto di una parola basandosi sul contesto della frase.",
      B: "Separare i messaggi duplicati da quelli pubblicati una sola volta.",
      C: "Ordinare le menzioni dalla più recente alla meno recente.",
      D: "Collegare parole chiave e operatori logici per rendere più precisa la query.",
    },
  },
  dynamicEvaluation: {
    matchText: "Cosa si intende per 'Valutazione Dinamica' nell'analisi quantitativa?",
    options: {
      A: "La misurazione dell'andamento dei volumi di discussione nel tempo.",
      B: "La classificazione del sentiment senza considerare serie storiche o baseline.",
      C: "Il confronto statico tra dati raccolti in un solo giorno di osservazione.",
      D: "Il trasferimento tecnico dei dati tra piattaforme senza interpretazione.",
    },
  },
  dictionarySentimentLimit: {
    matchText: "Qual è il rischio principale dell'uso di dizionari 'bag-of-words' nella sentiment analysis automatica?",
    options: {
      A: "La perdita del contesto, che può portare a interpretazioni errate di ironia o negazioni.",
      B: "La necessità di costruire una tassonomia diversa per ogni singola piattaforma social.",
      C: "La riduzione del volume di messaggi analizzabili rispetto alla lettura manuale.",
      D: "L'impossibilità di confrontare il sentiment con altre metriche di media monitoring.",
    },
  },
  atlShareOfVoice: {
    matchText: "Cosa indica l'indice 'Share of Voice' (SOV) in una campagna ATL?",
    options: {
      A: "La quota di pressione pubblicitaria di un brand rispetto al totale del mercato di riferimento.",
      B: "La percentuale di persone che ricordano spontaneamente il messaggio della campagna.",
      C: "Il rapporto tra contatti raggiunti e frequenza media di esposizione.",
      D: "La quota di conversioni generate dai canali below the line.",
    },
  },
  piiPretest: {
    matchText: "Secondo il modello PRE, in quale fase avviene il pre-test dei messaggi su segmenti di destinatari?",
    text: "Nel modello PII, in quale fase può avvenire il pre-test dei messaggi?",
    options: {
      A: "Preparation.",
      B: "Implementation.",
      C: "Impact.",
      D: "Reporting.",
    },
  },
  inputOutputExample: {
    matchText: "Nella formula Input/Output, quale di questi esempi è corretto?",
    options: {
      A: "Numero di ore di lavoro rispetto al numero di comunicati prodotti.",
      B: "Numero di uscite media rispetto ai punti percentuali di conoscenza.",
      C: "Costo dell'evento rispetto all'aumento della notorietà.",
      D: "Sentiment positivo rispetto al livello di fiducia degli stakeholder.",
    },
  },
  5: {
    matchText: "Nel contesto dei livelli di valutazione della comunicazione, quale di questi rappresenta un 'Outcome'?",
    options: {
      A: "Un cambiamento nelle conoscenze, negli atteggiamenti o nei comportamenti dei pubblici.",
      B: "Il numero di comunicati, eventi o contenuti prodotti dalla funzione comunicazione.",
      C: "Le risorse economiche e professionali impiegate per realizzare l'attività.",
      D: "Il contributo finale della comunicazione alle performance complessive di business.",
    },
  },
  6: {
    matchText: "Cosa si intende per 'Trappola della misurazione'?",
    options: {
      A: "Raccogliere ciò che è facile misurare ma poco utile per decidere.",
      B: "Usare solo indicatori qualitativi anche quando servono dati quantitativi.",
      C: "Comunicare i risultati al management prima della raccolta dei dati.",
      D: "Confrontare gli output con gli outcome in momenti temporali diversi.",
    },
  },
  12: {
    text: "Nell'analisi qualitativa della copertura media, cosa misura la centralita del soggetto nel contenuto?",
    options: {
      A: "La centralita o il rilievo dato al soggetto all'interno del pezzo (es. se e protagonista o citato marginalmente).",
      B: "Il numero totale di citazioni del brand all'interno di un dataset.",
      C: "La presenza di messaggi chiave predefiniti dall'ufficio stampa.",
      D: "La percentuale di contenuti favorevoli sul totale della copertura.",
    },
  },
  15: {
    text: "Nella valutazione della comunicazione interna, se l'azienda registra che il 30% dei dipendenti ha compreso i nuovi valori aziendali, ha misurato:",
    options: {
      A: "Un outcome.",
      B: "Un input.",
      C: "Un output.",
      D: "Un riscontro immediato di esposizione.",
    },
  },
  7: {
    options: {
      A: "È un processo circolare con feedback continuo che accompagna tutte le fasi del piano.",
      B: "È un modello lineare focalizzato soprattutto sulla copertura ottenuta nel breve periodo.",
      C: "È una valutazione svolta solo al termine della campagna per rendicontare i risultati.",
      D: "È un approccio centrato sugli output operativi più che sugli aggiustamenti in itinere.",
    },
  },
  16: {
    options: {
      A: "Il numero di uscite media ottenute rispetto ai punti percentuali di aumento della conoscenza.",
      B: "Il budget totale investito nella campagna rispetto al numero di persone nello staff.",
      C: "Il livello di fiducia dichiarato dagli stakeholder dopo un anno.",
      D: "Il numero di comunicati stampa prodotti durante il periodo analizzato.",
    },
  },
  20: {
    options: {
      A: "Il prodotto immediato delle attivita di comunicazione, come contenuti, eventi o uscite media.",
      B: "La comprensione e il ricordo del messaggio da parte del pubblico.",
      C: "Il cambiamento stabile di atteggiamenti o comportamenti nei pubblici.",
      D: "Il contributo della comunicazione alle performance economiche dell'organizzazione.",
    },
  },
  23: {
    text: "Cosa permette di osservare il social media listening rispetto alle azioni dell'organizzazione?",
    options: {
      A: "L'impatto delle azioni aziendali sull'andamento delle conversazioni spontanee.",
      B: "Il costo esatto di ogni singolo like ottenuto.",
      C: "La distribuzione dei post tra canali proprietari e canali a pagamento.",
      D: "Il livello di soddisfazione rilevato solo alla fine della campagna.",
    },
  },
  24: {
    options: {
      A: "Cio che il pubblico riceve, comprende o ricorda subito dopo l'esposizione.",
      B: "Il prodotto operativo realizzato dalla funzione comunicazione.",
      C: "Il cambiamento comportamentale consolidato nel lungo periodo.",
      D: "Il ritorno economico complessivo generato dalla campagna.",
    },
  },
  26: {
    options: {
      A: "L'integrazione di logiche ATL e BTL in una strategia che accompagna awareness e conversione.",
      B: "La misurazione del solo trend temporale dei volumi di conversazione.",
      C: "Il conteggio statico delle menzioni in un singolo momento di osservazione.",
      D: "La separazione netta tra media di massa e canali orientati alla risposta diretta.",
    },
  },
  28: {
    options: {
      A: "Un ambiente informativo personalizzato che tende a rinforzare gusti, credenze e bias dell'utente.",
      B: "Una dashboard che raccoglie automaticamente tutti i dati social dell'organizzazione.",
      C: "Un modello di valutazione che misura solo output e copertura media.",
      D: "Una tecnica di ricerca qualitativa basata su domande a imbuto.",
    },
  },
  33: {
    options: {
      A: "Distribuiscono punti tra alternative che descrivono la cultura attuale e quella desiderata.",
      B: "Indicano il numero di messaggi chiave presenti nella copertura media.",
      C: "Attribuiscono un valore economico a ogni articolo pubblicato.",
      D: "Selezionano automaticamente il campione statistico della survey.",
    },
  },
  34: {
    options: {
      A: "La capacita dei membri o advocate di influenzare altri utenti nella relazione con l'organizzazione.",
      B: "Il numero di contenuti negativi rimossi dai canali social nel periodo.",
      C: "La quota di budget investita in campagne paid rispetto al budget totale.",
      D: "La frequenza con cui il management approva i contenuti editoriali.",
    },
  },
  36: {
    text: "Nel questionario di relazione, quale dimensione misura integrita, affidabilita e competenza percepita dell'organizzazione?",
    options: {
      A: "La fiducia.",
      B: "La soddisfazione.",
      C: "Il commitment.",
      D: "Il controllo reciproco.",
    },
  },
  37: {
    options: {
      A: "Il livello di servizio atteso, ad esempio il tempo massimo entro cui rispondere a una richiesta.",
      B: "Il valore economico equivalente della copertura editoriale ottenuta.",
      C: "Il numero di post pubblicati entro una finestra temporale standard.",
      D: "La capacita di una fonte media di influenzarne altre nel tempo.",
    },
  },
  38: {
    options: {
      A: "La raccomandazione o condivisione positiva dell'esperienza da parte degli utenti.",
      B: "L'elenco cronologico delle uscite media prodotte nel periodo.",
      C: "Il valore economico equivalente della copertura editoriale ottenuta.",
      D: "Il numero complessivo di impression generate da un contenuto.",
    },
  },
  39: {
    options: {
      A: "YouTube.",
      B: "Facebook.",
      C: "Twitter.",
      D: "Wikipedia.",
    },
  },
  54: {
    options: {
      A: "Approfondire vissuti, motivazioni e significati individuali senza la pressione del gruppo.",
      B: "Ottenere stime statisticamente rappresentative dell'intera popolazione.",
      C: "Misurare automaticamente il ROI economico della campagna.",
      D: "Osservare direttamente i comportamenti senza dialogare con il soggetto.",
    },
  },
  56: {
    options: {
      A: "Prima dell'acquisto, quando il consumatore cerca informazioni e confronta alternative online.",
      B: "Dopo l'acquisto, quando il cliente valuta la soddisfazione e il servizio ricevuto.",
      C: "Nel momento fisico della vendita, quando il prodotto viene pagato in negozio.",
      D: "Nella fase di rendicontazione, quando l'azienda calcola i risultati economici.",
    },
  },
  57: {
    options: {
      A: "Per evitare che l'interazione sia condizionata e che i partecipanti non siano liberi di esprimersi.",
      B: "Per assicurare che tutti i partecipanti abbiano lo stesso ruolo formale nell'organizzazione.",
      C: "Per aumentare la rappresentativita statistica del gruppo rispetto alla popolazione.",
      D: "Per facilitare la trasformazione delle risposte qualitative in frequenze numeriche.",
    },
  },
  58: {
    options: {
      A: "L'interazione tra partecipanti fa emergere confronti, accordi, conflitti e significati condivisi.",
      B: "La possibilita di ottenere stime percentuali generalizzabili all'intera popolazione.",
      C: "Il controllo sperimentale delle variabili per dimostrare un nesso causale.",
      D: "L'assenza di influenza reciproca tra partecipanti durante la raccolta delle risposte.",
    },
  },
  65: {
    text: "Nel focus group, perche la composizione del gruppo va progettata prima della sessione?",
    options: {
      A: "Per favorire un confronto utile, coerente con gli obiettivi conoscitivi e non condizionato da squilibri eccessivi.",
      B: "Per rendere il gruppo statisticamente rappresentativo dell'intera popolazione nazionale.",
      C: "Per sostituire la traccia del moderatore con una selezione casuale dei partecipanti.",
      D: "Per garantire che ogni risposta possa essere trasformata direttamente in un dato di vendita.",
    },
  },
  67: {
    options: {
      A: "La survey.",
      B: "Il focus group.",
      C: "L'osservazione partecipante.",
      D: "Le tecniche proiettive.",
    },
  },
  68: {
    options: {
      A: "Ricerca ex ante o diagnostica, utile a orientare obiettivi e strategia prima dell'azione.",
      B: "Valutazione sommativa, usata solo per tirare le somme a fine campagna.",
      C: "Rendicontazione economica, centrata esclusivamente sui KPI di business.",
      D: "Certificazione di audience, necessaria per validare tiratura e ascolti.",
    },
  },
  71: {
    options: {
      A: "Quanto ritiene che l'organizzazione abbia le capacita necessarie per mantenere le promesse?",
      B: "Quanto ricorda il logo dell'organizzazione dopo aver visto la campagna?",
      C: "Quante volte ha letto un articolo sull'organizzazione nell'ultimo mese?",
      D: "Quanto spesso riceve comunicazioni interne dal suo responsabile diretto?",
    },
  },
  72: {
    text: "Nel focus group, cosa prevede la logica dell'imbuto nella sequenza delle domande?",
    options: {
      A: "Partire da temi generali e poco strutturati per arrivare gradualmente a domande specifiche.",
      B: "Iniziare da domande molto specifiche e poi allargare progressivamente il tema.",
      C: "Alternare domande quantitative e domande di controllo causale.",
      D: "Concludere la discussione senza chiedere sintesi ai partecipanti.",
    },
  },
  73: {
    options: {
      A: "La raccolta di dati originali progettati appositamente per il problema di ricerca.",
      B: "L'utilizzo di dati gia raccolti da altri soggetti per finalita differenti.",
      C: "La sola analisi dei report storici gia disponibili in azienda.",
      D: "La rielaborazione di statistiche pubbliche senza contatto con i rispondenti.",
    },
  },
  74: {
    options: {
      A: "L'utilizzo di dati gia esistenti, raccolti in precedenza per altri obiettivi.",
      B: "La raccolta di risposte originali tramite interviste, survey o osservazione.",
      C: "Una tecnica proiettiva basata su immagini e frasi da completare.",
      D: "Un esperimento con gruppo sperimentale e gruppo di controllo.",
    },
  },
  75: {
    options: {
      A: "Le tecniche proiettive.",
      B: "La survey a risposta chiusa.",
      C: "L'analisi dei dati secondari.",
      D: "Il panel Auditel.",
    },
  },
  76: {
    options: {
      A: "Si parte da domande generali per arrivare progressivamente a domande piu specifiche.",
      B: "Si chiede subito al partecipante di scegliere tra alternative numeriche chiuse.",
      C: "Si alternano domande di vendita e domande di certificazione delle audience.",
      D: "Si evitano le domande di apertura per ridurre la durata della sessione.",
    },
  },
  79: {
    options: {
      A: "Suddividere il contenuto in unita di analisi e categorie definite in modo replicabile.",
      B: "Riassumere liberamente il testo senza una griglia condivisa di codifica.",
      C: "Trasformare ogni contenuto in un valore economico equivalente.",
      D: "Selezionare i partecipanti piu adatti a un focus group.",
    },
  },
  80: {
    options: {
      A: "Il prodotto immediato di un'attivita, come comunicati, eventi, contenuti o uscite media.",
      B: "Il cambiamento stabile di opinioni, atteggiamenti o comportamenti dei pubblici.",
      C: "L'impatto finale sulle performance economiche complessive dell'organizzazione.",
      D: "La baseline strategica usata prima dell'avvio della campagna.",
    },
  },
  81: {
    options: {
      A: "A definire obiettivi, target, composizione del gruppo, traccia e condizioni della discussione.",
      B: "A trasformare automaticamente le risposte dei partecipanti in percentuali generalizzabili.",
      C: "A sostituire il ruolo del moderatore con un questionario standardizzato.",
      D: "A calcolare il ROI della campagna prima di raccogliere i dati qualitativi.",
    },
  },
  82: {
    options: {
      A: "La formativa serve a migliorare in corso d'opera, la sommativa a valutare risultati e valore conclusivo.",
      B: "La formativa si usa solo dopo la campagna, la sommativa solo prima dell'implementazione.",
      C: "La formativa riguarda le audience certificate, la sommativa riguarda i dati qualitativi.",
      D: "La formativa misura solo il ROI, la sommativa solo il numero di comunicati prodotti.",
    },
  },
  84: {
    options: {
      A: "Analisi del contenuto della rassegna stampa.",
      B: "Survey su campione statisticamente rappresentativo.",
      C: "Focus group con domande a imbuto.",
      D: "Esperimento con gruppo di controllo e gruppo sperimentale.",
    },
  },
  87: {
    options: {
      A: "Il percorso di interazioni e touchpoint che accompagna il cliente dalla conoscenza al post-acquisto.",
      B: "Il solo momento in cui il cliente paga il prodotto nel punto vendita.",
      C: "La sequenza interna con cui l'azienda approva una campagna pubblicitaria.",
      D: "Il calendario editoriale dei contenuti pubblicati sui canali social proprietari.",
    },
  },
  88: {
    options: {
      A: "La presenza e il peso delle citazioni attribuite a portavoce o rappresentanti ufficiali.",
      B: "La centralità dell'organizzazione all'interno del singolo articolo.",
      C: "La quota di copertura ottenuta rispetto ai competitor nel periodo.",
      D: "Il valore economico equivalente dello spazio editoriale occupato.",
    },
  },
  90: {
    options: {
      A: "Una visione interpretativa e non deterministica, attenta a significati, vissuti e contesto.",
      B: "Una visione puramente deterministica, in cui ogni comportamento è prevedibile con certezza.",
      C: "Una visione esclusivamente numerica, basata solo su campioni statisticamente rappresentativi.",
      D: "Una visione amministrativa, centrata sulla certificazione esterna dei dati di audience.",
    },
  },
  92: {
    text: "Nel focus group, perche e importante evitare dinamiche che inibiscono la parola dei partecipanti?",
    options: {
      A: "Per raccogliere opinioni libere e ridurre il rischio che alcuni soggetti orientino o blocchino gli altri.",
      B: "Per ottenere automaticamente un campione statisticamente rappresentativo.",
      C: "Per trasformare la discussione qualitativa in un esperimento causale.",
      D: "Per evitare che il moderatore debba preparare una traccia di discussione.",
    },
  },
  93: {
    options: {
      A: "Funziona da stimolo per il dialogo e la creatività, facendo emergere idee che non uscirebbero in un'intervista singola.",
      B: "Garantisce risultati statisticamente rappresentativi dell'intera popolazione.",
      C: "Riduce la discussione a una sequenza di risposte chiuse individuali.",
      D: "Permette di dimostrare un nesso causale tra campagna e comportamento d'acquisto.",
    },
  },
  q62: {
    matchText: "Quale delle seguenti affermazioni descrive correttamente la funzione principale della ricerca valutativa nel contesto organizzativo descritto nelle dispense?",
    options: {
      A: "Supportare il processo decisionale comprendendo i fenomeni e definendo azioni correttive.",
      B: "Limitarsi a produrre una rendicontazione numerica dopo la chiusura delle attività.",
      C: "Misurare solo la quantità di contenuti pubblicati sui canali dell'organizzazione.",
      D: "Sostituire la definizione degli obiettivi con dati raccolti a posteriori.",
    },
  },
  q161: {
    matchText: "Quale evento ha portato al successo immediato del Web nel 1993?",
    options: {
      A: "La decisione del CERN di rendere pubblica e gratuita la tecnologia.",
      B: "La disponibilità dei primi browser grafici accessibili a un pubblico più ampio.",
      C: "La standardizzazione dei protocolli che rese più semplice pubblicare e navigare.",
      D: "La crescita dell'interesse accademico e commerciale verso le reti ipertestuali.",
    },
  },
  q270: {
    matchText: "Nel sistema Total Audience di Auditel, cos'è la 'Ripartizione ascolto per fascia oraria' (RSH)?",
    options: {
      A: "L'incidenza di ogni singola fascia oraria rispetto al totale dell'ascolto registrato nell'intera giornata.",
      B: "La composizione sociodemografica degli individui presenti nel panel televisivo.",
      C: "La quota di famiglie dotate di smart TV rispetto all'universo statistico.",
      D: "Il costo medio degli spazi pubblicitari acquistati in una specifica fascia.",
    },
  },
  98: {
    text: "Nel PRE Model, quale fase risponde alla domanda 'ci stiamo arrivando?'",
    options: {
      A: "Valutazione ongoing.",
      B: "Audit iniziale.",
      C: "Definizione degli obiettivi.",
      D: "Valutazione finale.",
    },
  },
  100: {
    options: {
      A: "Trasformare dati e interpretazioni in indicazioni utili per scegliere, correggere o migliorare le azioni.",
      B: "Produrre un archivio completo di dati grezzi senza indicazioni operative.",
      C: "Sostituire le decisioni manageriali con un unico indicatore automatico.",
      D: "Limitarsi a controllare se le attività previste sono state svolte.",
    },
  },
  102: {
    options: {
      A: "La costruzione del campione e del questionario, perché condiziona la qualità dei dati raccolti.",
      B: "La scelta del software di impaginazione usato per presentare il report finale.",
      C: "L'archiviazione dei questionari dopo la chiusura dell'analisi.",
      D: "La selezione degli esempi grafici da inserire nelle slide conclusive.",
    },
  },
  101: {
    options: {
      A: "La necessità di verificare o approfondire i risultati con ulteriori strumenti, spesso quantitativi.",
      B: "La difficoltà di generalizzare i risultati all'intera popolazione di riferimento.",
      C: "La possibile influenza reciproca tra partecipanti durante la discussione.",
      D: "La dipendenza dalla qualità della traccia e dalla conduzione del moderatore.",
    },
  },
  104: {
    options: {
      A: "Integra raccolta dati, interpretazione e supporto alle decisioni, non solo verifica a posteriori.",
      B: "Si limita a contare gli output prodotti senza interpretarli rispetto agli obiettivi.",
      C: "Coincide con la certificazione esterna di tiratura, audience e ascolti.",
      D: "Esclude la fase di pianificazione per concentrarsi solo sul report finale.",
    },
  },
  118: {
    options: {
      A: "Citation frequency.",
      B: "Traffico organico.",
      C: "Bounce rate.",
      D: "Cost per click.",
    },
  },
  136: {
    options: {
      A: "Brand Health.",
      B: "Revenue Generation.",
      C: "Customer Experience.",
      D: "Marketing Optimization.",
    },
  },
  144: {
    options: {
      A: "Web 3.0.",
      B: "Web 1.0.",
      C: "Web 2.0.",
      D: "Web 4.0.",
    },
  },
  145: {
    options: {
      A: "Counting metrics.",
      B: "Outcome metrics.",
      C: "Business value metrics.",
      D: "Foundation metrics.",
    },
  },
  146: {
    options: {
      A: "Insight.",
      B: "Data.",
      C: "Information.",
      D: "Recommendation.",
    },
  },
  147: {
    options: {
      A: "Costo per Engagement.",
      B: "Costo per Impression.",
      C: "Costo per Earned Media.",
      D: "Costo per Email inviata.",
    },
  },
  156: {
    options: {
      A: "Service Level Agreement.",
      B: "Social Listening Audit.",
      C: "Standard Language Analysis.",
      D: "Shared Link Attribution.",
    },
  },
  157: {
    options: {
      A: "59,14%.",
      B: "39,28%.",
      C: "1,55%.",
      D: "93,8%.",
    },
  },
  159: {
    options: {
      A: "Discord.",
      B: "TikTok.",
      C: "X (ex Twitter).",
      D: "Instagram.",
    },
  },
  162: {
    options: {
      A: "Serve a capire chi conta davvero nelle reti, non solo chi ha più reach o follower.",
      B: "Si limita a ordinare gli account in base al numero assoluto di follower.",
      C: "Esclude social, community e forum per concentrarsi solo sui blog.",
      D: "Misura soltanto il volume degli investimenti pubblicitari digitali.",
    },
  },
  163: {
    options: {
      A: "La variabile tempo e/o il confronto con la numerosità dei messaggi dei competitor.",
      B: "Il numero di post pubblicati dall'organizzazione nello stesso periodo.",
      C: "Il valore economico equivalente degli spazi media occupati.",
      D: "La lunghezza media dei messaggi raccolti nei diversi canali.",
    },
  },
  165: {
    options: {
      A: "Si analizza la situazione di partenza: contesto, pubblici, baseline e problemi da affrontare.",
      B: "Si calcola soltanto il ROI finanziario conclusivo della campagna.",
      C: "Si pubblicano i contenuti prima di definire obiettivi e criteri di valutazione.",
      D: "Si raccolgono solo gli output prodotti dalla funzione comunicazione.",
    },
  },
  166: {
    options: {
      A: "La valorizzazione monetaria della copertura media ottenuta gratuitamente.",
      B: "Il raggiungimento di obiettivi relazionali non necessariamente monetari.",
      C: "Il costo medio sostenuto per ogni interazione generata sui social.",
      D: "Il valore della reputazione misurato tramite interviste agli stakeholder.",
    },
  },
  167: {
    options: {
      A: "Il confronto tra la copertura dell'organizzazione e quella dei concorrenti nello stesso periodo.",
      B: "Il tono favorevole, neutro o sfavorevole attribuito alle citazioni raccolte.",
      C: "Il numero di portavoce ufficiali citati negli articoli analizzati.",
      D: "Il valore economico equivalente dello spazio editoriale occupato.",
    },
  },
  169: {
    options: {
      A: "La centralità o prominence del soggetto all'interno del contenuto.",
      B: "La quota di copertura ottenuta rispetto ai competitor diretti.",
      C: "Il tono favorevole, neutro o sfavorevole della copertura.",
      D: "La presenza dei messaggi chiave predefiniti dall'organizzazione.",
    },
  },
  172: {
    options: {
      A: "CPE, cioè costo per engagement.",
      B: "Share of Voice, cioè quota di copertura rispetto ai competitor.",
      C: "Third-party endorsement, cioè presenza di sostegno da soggetti terzi.",
      D: "Prominence, cioè centralità del soggetto nel contenuto.",
    },
  },
  173: {
    options: {
      A: "La definizione della strategia, degli obiettivi e delle metriche di business.",
      B: "L'acquisto della piattaforma di listening più completa disponibile.",
      C: "La raccolta casuale di tutti i messaggi pubblicati online sul brand.",
      D: "La produzione del report finale con grafici e raccomandazioni.",
    },
  },
  175: {
    options: {
      A: "L'information è dato contestualizzato; l'insight è interpretazione del dato alla luce degli obiettivi.",
      B: "L'information coincide con la raccomandazione finale; l'insight è il dato grezzo non lavorato.",
      C: "L'information riguarda solo i social, mentre l'insight riguarda solo media tradizionali.",
      D: "Non c'è differenza: entrambi indicano il numero grezzo di download o visite.",
    },
  },
  176: {
    options: {
      A: "Focalizzarsi sulle counting metrics native della piattaforma senza collegarle agli obiettivi di business.",
      B: "Collegare gli indicatori social a obiettivi strategici e risultati di business.",
      C: "Integrare dati social, CRM e benchmark competitivo in una lettura comune.",
      D: "Usare le metriche di piattaforma come segnali da interpretare nel tempo.",
    },
  },
  189: {
    options: {
      A: "La difficolta nel comprendere correttamente sarcasmo, ironia e ambiguita linguistica senza un intervento umano.",
      B: "La mancanza di piattaforme di crawling in grado di raccogliere dati dai social network.",
      C: "Il costo eccessivamente elevato rispetto all'impiego di analisti umani per ogni singolo post.",
      D: "L'incapacita assoluta di analizzare grandi volumi di dati in tempo reale.",
    },
  },
  197: {
    options: {
      A: "Un equilibrio tra automazione algoritmica e supervisione umana per migliorare l'accuratezza.",
      B: "L'uso esclusivo di dizionari predefiniti senza controllo dell'analista.",
      C: "La lettura manuale di ogni singolo messaggio senza alcun supporto software.",
      D: "La classificazione del sentiment basata solo sul numero di parole positive.",
    },
  },
  199: {
    options: {
      A: "Tokenizzazione, cioè suddivisione del testo in parole o unità elementari.",
      B: "Costruzione di un modello Transformer addestrato su grandi corpus.",
      C: "Interpretazione pragmatica del contesto e dell'ironia del messaggio.",
      D: "Calcolo del ROI economico generato da ogni singola parola chiave.",
    },
  },
  201: {
    options: {
      A: "Non riescono a cogliere le sfumature ironiche o sarcastiche del linguaggio.",
      B: "Richiedono sempre un training set annotato manualmente per ogni analisi.",
      C: "Non possono essere applicati a dataset di dimensioni ridotte.",
      D: "Producono direttamente indicatori di impatto economico della comunicazione.",
    },
  },
  202: {
    options: {
      A: "L'intenzione d'acquisto (Activation).",
      B: "La soddisfazione post-acquisto dichiarata dal consumatore.",
      C: "Il ricordo sollecitato della marca dopo l'esposizione pubblicitaria.",
      D: "La notorieta spontanea del brand nel settore alimentare.",
    },
  },
  204: {
    options: {
      A: "La competizione e interna ai canali digitali (social vs search vs video).",
      B: "La pianificazione digitale si concentra solo sui formati display tradizionali.",
      C: "La misurazione dipende ormai esclusivamente dalle audience televisive.",
      D: "Il search advertising e separato da ogni logica di concorrenza tra canali.",
    },
  },
  208: {
    options: {
      A: "La valutazione se l'esposizione e favorevole, neutra o sfavorevole all'organizzazione.",
      B: "La quantita complessiva di articoli pubblicati in un dato periodo.",
      C: "La presenza dei messaggi chiave nella copertura ottenuta.",
      D: "La centralita del soggetto all'interno del contenuto editoriale.",
    },
  },
  209: {
    options: {
      A: "La presenza di soggetti terzi (esperti, influencer, associazioni) che sostengono o confermano il brand.",
      B: "La pubblicazione del contenuto sui canali proprietari dell'organizzazione.",
      C: "La quota di copertura rispetto ai competitor nello stesso periodo.",
      D: "La frequenza con cui vengono citati i portavoce ufficiali.",
    },
  },
  210: {
    options: {
      A: "La frequenza e il rilievo delle citazioni attribuite ai portavoce ufficiali dell'azienda.",
      B: "La quota di articoli che riportano i messaggi chiave dell'organizzazione.",
      C: "Il peso della copertura dell'organizzazione rispetto ai competitor.",
      D: "Il tono favorevole, neutro o sfavorevole della copertura ottenuta.",
    },
  },
  212: {
    options: {
      A: "L'analisi qualitativa del tono (positivo, negativo, neutro) delle conversazioni e degli articoli.",
      B: "Il conteggio del numero totale di articoli pubblicati nel periodo.",
      C: "La stima delle occasioni potenziali di esposizione al messaggio.",
      D: "La verifica della presenza dei messaggi chiave nella copertura.",
    },
  },
  213: {
    options: {
      A: "Perche sono radicati nella conoscenza, nelle relazioni e nella cultura specifica di quell'organizzazione.",
      B: "Perche coincidono sempre con brevetti registrati e legalmente protetti.",
      C: "Perche possono essere acquistati sul mercato solo da imprese gia leader.",
      D: "Perche derivano esclusivamente dal volume degli investimenti pubblicitari.",
    },
  },
  217: {
    options: {
      A: "La quantitativa conta i volumi (es. numero di articoli), il sentiment valuta il tono e l'atteggiamento verso il soggetto.",
      B: "La quantitativa valuta il tono, mentre il sentiment misura soltanto la reach.",
      C: "La quantitativa riguarda i canali proprietari, il sentiment solo la stampa cartacea.",
      D: "La quantitativa misura gli outcome, il sentiment misura esclusivamente gli input.",
    },
  },
  219: {
    options: {
      A: "Far agire un sistema o prendere decisioni operative direttamente sugli output dell'AI senza supervisione umana.",
      B: "Usare l'AI solo come supporto alla classificazione preliminare dei contenuti.",
      C: "Validare manualmente un campione di risultati generati dal modello.",
      D: "Combinare automazione e lettura qualitativa nei casi ambigui.",
    },
  },
  223: {
    options: {
      A: "Dal punto di vista del lettore medio al primo contatto con il testo.",
      B: "Dal punto di vista dell'organizzazione citata nel contenuto.",
      C: "Dal punto di vista dell'analista che conosce il contesto interno.",
      D: "Dal punto di vista del pubblico gia favorevole al brand.",
    },
  },
  224: {
    options: {
      A: "Modelli linguistici evoluti che colgono meglio sfumature, ironia e contesto rispetto ai vecchi modelli probabilistici.",
      B: "Semplici liste di parole positive e negative con conteggio occorrenze.",
      C: "Algoritmi usati per calcolare il valore economico equivalente della copertura.",
      D: "Strumenti di crawling che raccolgono contenuti senza interpretarli semanticamente.",
    },
  },
  232: {
    options: {
      A: "La somma di tutti i secondi visualizzati da ogni individuo per un singolo canale.",
      B: "Il numero medio di spettatori presenti in ogni minuto di trasmissione.",
      C: "La durata media di ogni stream avviato sui dispositivi digitali.",
      D: "Il numero di utenti unici esposti almeno una volta al contenuto.",
    },
  },
  233: {
    options: {
      A: "La tiratura e la diffusione di quotidiani e periodici, sia cartacei che digitali.",
      B: "La readership effettiva stimata dei quotidiani e dei periodici.",
      C: "Il tempo medio di permanenza sui siti delle testate giornalistiche.",
      D: "La qualita editoriale degli articoli secondo criteri giornalistici.",
    },
  },
  234: {
    options: {
      A: "Gli ascolti lineari e on demand (streaming e podcast) per fornire una currency certificata.",
      B: "La diffusione certificata delle copie cartacee e digitali dei periodici.",
      C: "L'audience televisiva rilevata tramite meter domestici e SDK.",
      D: "La readership della stampa quotidiana e periodica.",
    },
  },
  235: {
    text: "Nella formula del PQII proposta da Glebb e Romoli Venturi, quale funzione svolge il parametro della 'readership'?",
    options: {
      A: "Pesa il REAV in base alla portata effettiva del mezzo, superando il dato della semplice tiratura.",
      B: "Rappresenta il numero di volte che un messaggio chiave e ripetuto nell'articolo.",
      C: "Indica il costo per punto percentuale di conoscenza generato dalla campagna.",
      D: "Serve a monetizzare lo spazio editoriale trasformandolo in valore pubblicitario equivalente.",
    },
  },
  236: {
    options: {
      A: "Organismi composti da tutte le componenti del mercato (editori, agenzie, investitori) per garantire dati trasparenti e condivisi.",
      B: "Societa controllate solo dagli editori per certificare i propri dati di vendita.",
      C: "Comitati pubblici che producono statistiche ufficiali sugli investimenti pubblicitari.",
      D: "Sistemi tecnici che raccolgono dati censuari senza una governance condivisa.",
    },
  },
  238: {
    options: {
      A: "La qualita e l'impatto della copertura media basandosi su REAV e readership, espresso come valore numerico non monetario.",
      B: "Il valore pubblicitario equivalente dello spazio occupato dall'articolo.",
      C: "Il numero di uscite stampa ottenute durante una campagna media.",
      D: "La quota di articoli positivi rispetto al totale della copertura.",
    },
  },
  243: {
    options: {
      A: "Audicom",
      B: "Auditel",
      C: "Audiradio",
      D: "ADS",
    },
  },
  244: {
    options: {
      A: "Joint Industry Committee",
      B: "Joint Investment Committee",
      C: "Journalistic Information Center",
      D: "Joint Index Currency",
    },
  },
  245: {
    options: {
      A: "Un dato riconosciuto e accettato da tutto il mercato come base per le transazioni commerciali.",
      B: "Il budget totale che un'azienda dedica alla comunicazione ogni anno.",
      C: "Un indice interno usato dall'editore per valutare la qualita dei contenuti.",
      D: "Il tasso di aggiornamento dei dati nelle piattaforme di analytics.",
    },
  },
  253: {
    options: {
      A: "Legitimate Stream (LS).",
      B: "Total Time Spent (TTS).",
      C: "Average Stream Duration (ASD).",
      D: "Unique Audience (UA).",
    },
  },
  255: {
    options: {
      A: "Average Stream Duration (ASD).",
      B: "Legitimate Stream (LS).",
      C: "Total Time Spent (TTS).",
      D: "Unique Audience (UA).",
    },
  },
  256: {
    options: {
      A: "Auditel.",
      B: "ADS.",
      C: "Audicom.",
      D: "Audiradio.",
    },
  },
  262: {
    text: "Nella metrica Auditel, come si calcola la 'Permanenza' (PR)?",
    options: {
      A: "La fedelta di visione, calcolata come rapporto tra minuti visti e durata del programma.",
      B: "Il numero totale di individui che hanno visto almeno un minuto di un contenuto.",
      C: "Il rapporto tra ascoltatori di un canale e totale degli ascoltatori televisivi del momento.",
      D: "La capacita di un programma di attrarre nuovi spettatori nel corso della puntata.",
    },
  },
  265: {
    options: {
      A: "Un'indagine continuativa sulle famiglie italiane per descrivere universo tecnologico e dotazioni di consumo.",
      B: "La rilevazione minuto per minuto degli ascolti televisivi prodotti dal SuperPanel.",
      C: "Il sistema censuario basato su SDK e tag inseriti nei player digitali.",
      D: "La certificazione della diffusione delle copie cartacee e digitali della stampa.",
    },
  },
  266: {
    options: {
      A: "Il volume di stream erogati e visti per almeno 300 millisecondi.",
      B: "La somma dei secondi visualizzati dagli utenti su un contenuto o canale.",
      C: "La durata media degli stream calcolata dividendo TTS per LS.",
      D: "Il numero di utenti unici che hanno visto almeno una volta il contenuto.",
    },
  },
  268: {
    options: {
      A: "Auditel.",
      B: "ADS.",
      C: "Audicom.",
      D: "Audiradio.",
    },
  },
  269: {
    text: "Nei dati censuari Auditel, cosa viene conteggiato come 'Legitimate Stream' (LS)?",
    options: {
      A: "Il volume di stream erogati e visti per almeno 300 millisecondi.",
      B: "La somma dei secondi visualizzati da tutti gli utenti di un canale.",
      C: "La durata media degli stream calcolata sul totale degli avvii validi.",
      D: "Il numero di utenti unici che hanno visto almeno un minuto del contenuto.",
    },
  },
  276: {
    options: {
      A: "Un processo dinamico e circolare con feedback continuo lungo tutte le fasi del piano.",
      B: "Un modello lineare centrato solo sulla copertura media di breve periodo.",
      C: "Una valutazione svolta esclusivamente dopo la chiusura della campagna.",
      D: "Un modello che misura soltanto output quantitativi senza correggere il piano.",
    },
  },
  277: {
    options: {
      A: "Output, out-take e outcome.",
      B: "Input, budget e fatturato.",
      C: "Reach, frequency e GRP.",
      D: "Reputazione, identità e immagine.",
    },
  },
  279: {
    options: {
      A: "Reattività.",
      B: "Chiarezza.",
      C: "Coerenza.",
      D: "Efficienza.",
    },
  },
  289: {
    options: {
      A: "Che gli obiettivi devono essere specifici, misurabili, attuabili, rilevanti e definiti nel tempo.",
      B: "Che gli obiettivi devono coincidere sempre con un risultato economico immediato.",
      C: "Che ogni obiettivo deve essere misurato con un unico indicatore standard.",
      D: "Che la misurazione deve iniziare solo al termine della campagna.",
    },
  },
  291: {
    options: {
      A: "Audit iniziale.",
      B: "Definizione degli obiettivi.",
      C: "Valutazione ongoing.",
      D: "Valutazione finale.",
    },
  },
  292: {
    options: {
      A: "Gli outcome, cioè i cambiamenti in opinioni, atteggiamenti o comportamenti.",
      B: "Le radici, cioè gli obiettivi di comunicazione.",
      C: "Il tronco, cioè le strategie e le tattiche operative.",
      D: "Il suolo, cioè l'organizzazione e il contesto competitivo.",
    },
  },
  299: {
    options: {
      A: "VALUES esplicita il collegamento con business, contesto, tempi, pubblici, effetti e benchmark.",
      B: "VALUES elimina la necessità che gli obiettivi siano misurabili e temporalmente definiti.",
      C: "VALUES si applica solo alla pubblicità commerciale, SMART solo alla comunicazione interna.",
      D: "VALUES sostituisce gli obiettivi con metriche di piattaforma già disponibili.",
    },
  },
  308: {
    options: {
      A: "Outcome avanzati, cioè cambiamenti di opinioni, atteggiamenti e comportamenti.",
      B: "Output immediati, come quantità di comunicati e uscite media prodotte.",
      C: "Input economici, come budget e risorse disponibili prima del piano.",
      D: "Benchmark tecnici, come strumenti usati per raccogliere i dati.",
    },
  },
  314: {
    text: "Nel modello Yardstick, il 'Ricordo' rientra in quale livello di valutazione?",
  },
  316: {
    text: "Nel modello Yardstick, a quale livello appartiene la valutazione del 'ricordo'?",
    options: {
      A: "Livello 2, intermedio.",
      B: "Livello 1, output.",
      C: "Livello 3, avanzato.",
      D: "Livello rendicontativo.",
    },
  },
  317: {
    options: {
      A: "Integra ATL e BTL seguendo il percorso dall'awareness alla conversione.",
      B: "Separa rigidamente media di massa e canali orientati alla risposta diretta.",
      C: "Si limita alla copertura televisiva e ai Gross Rating Points.",
      D: "Misura solo promozioni nel punto vendita senza considerare awareness.",
    },
  },
  318: {
    options: {
      A: "L'impatto della comunicazione sul benessere sociale degli interlocutori.",
      B: "Il contenimento dei costi di produzione della campagna.",
      C: "La qualità tecnica del messaggio e della sua esecuzione creativa.",
      D: "Il contributo diretto della comunicazione ai risultati economici.",
    },
  },
  319: {
    options: {
      A: "L'adeguatezza di background, contenuti, messaggi e decisioni prese prima dell'implementazione.",
      B: "Il numero di comunicati diffusi, eventi organizzati e uscite media ottenute.",
      C: "Gli effetti cognitivi, affettivi e conativi generati sui pubblici.",
      D: "Il ritorno economico diretto generato dalla copertura editoriale.",
    },
  },
  320: {
    options: {
      A: "È lineare e concentrato sul breve periodo, quindi offre poco feedback continuo.",
      B: "Richiede troppi cicli di feedback e diventa inutilizzabile nelle campagne brevi.",
      C: "Misura solo gli input prima della pianificazione senza considerare gli output.",
      D: "Si applica soltanto alla comunicazione interna e non alle relazioni media.",
    },
  },
  325: {
    options: {
      A: "Un modello lineare e one-way, focalizzato sul raggiungimento dei giusti interlocutori nel breve periodo.",
      B: "Un modello circolare con feedback continuo e aggiustamenti in itinere.",
      C: "Un modello a tre livelli progressivi: output, out-take e outcome.",
      D: "Un modello centrato sulle micro-decisioni della fase di input.",
    },
  },
  327: {
    options: {
      A: "Debba avvenire in parallelo alla pianificazione e accompagnare tutte le fasi del piano.",
      B: "Debba essere svolta solo dopo la conclusione della campagna.",
      C: "Debba concentrarsi esclusivamente sul ritorno economico monetario.",
      D: "Debba evitare la fase di audit per non rallentare l'azione.",
    },
  },
  331: {
    options: {
      A: "1977.",
      B: "1990.",
      C: "2001.",
      D: "2025.",
    },
  },
  336: {
    options: {
      A: "Le micro-decisioni professionali come il formato di una brochure o le foto scelte.",
      B: "I cambiamenti di atteggiamento del pubblico dopo la campagna.",
      C: "Il numero di articoli pubblicati dalla stampa estera.",
      D: "Gli outcome cognitivi, affettivi e conativi generati sui pubblici.",
    },
  },
  337: {
    options: {
      A: "Il numero di sforzi realizzati, come comunicati diffusi ed eventi organizzati.",
      B: "Il grado di soddisfazione dei dipendenti per il nuovo logo.",
      C: "L'impatto economico diretto sulle vendite dell'azienda.",
      D: "L'adeguatezza delle decisioni prese nella fase di preparazione.",
    },
  },
  339: {
    options: {
      A: "La distinzione tra valutazione a livello individuale (micro-decisioni) e a livello di programma, includendo la valutazione degli input.",
      B: "L'uso esclusivo di ricerche causali con gruppi di controllo per ogni attivita.",
      C: "La metafora dell'albero per descrivere il rapporto tra obiettivi e outcome.",
      D: "La riduzione della valutazione al solo conteggio degli output media.",
    },
  },
  340: {
    options: {
      A: "Le radici sono gli obiettivi di comunicazione; i fiori sono gli outcome.",
      B: "Le radici sono le risorse economiche; i fiori sono i canali utilizzati.",
      C: "Le radici sono i pubblici target; i fiori sono gli output prodotti.",
      D: "Le radici sono gli insight iniziali; i fiori sono le tattiche operative.",
    },
  },
  341: {
    options: {
      A: "La circolazione delle informazioni sui progetti in corso e futuri della funzione.",
      B: "La soddisfazione per lo stile comunicativo dei superiori diretti.",
      C: "La qualita dei feedback personali ricevuti dai dipendenti.",
      D: "La comunicazione informale tra colleghi all'interno dell'organizzazione.",
    },
  },
  342: {
    text: "Perche la metafora del 'Measurement Tree' e utile nella valutazione della comunicazione?",
    options: {
      A: "Perche collega obiettivi, pubblici, tattiche e outcome in una sequenza coerente.",
      B: "Perche trasforma ogni attivita comunicativa in un valore economico unico.",
      C: "Perche separa gli obiettivi di comunicazione dagli effetti sui pubblici.",
      D: "Perche considera solo le uscite media visibili nel breve periodo.",
    },
  },
  343: {
    options: {
      A: "La capacita di influenzare conoscenze e atteggiamenti per sviluppare la corporate identity.",
      B: "Il contenimento dei costi di produzione sotto una soglia prestabilita.",
      C: "La capacita di generare benessere sociale negli interlocutori.",
      D: "Il contributo diretto della comunicazione al risultato economico.",
    },
  },
  344: {
    options: {
      A: "Che l'obiettivo deve essere raggiungibile date le risorse e il contesto a disposizione.",
      B: "Che l'obiettivo deve essere misurabile attraverso un indicatore numerico.",
      C: "Che l'obiettivo deve essere rilevante rispetto alle priorita organizzative.",
      D: "Che l'obiettivo deve avere una scadenza temporale definita.",
    },
  },
  345: {
    options: {
      A: "Per verificare l'adeguatezza delle decisioni prese riguardo a formati, contenuti e immagini.",
      B: "Per misurare i cambiamenti di atteggiamento generati nel pubblico finale.",
      C: "Per contare gli output prodotti durante la fase di implementazione.",
      D: "Per calcolare il ritorno economico complessivo della campagna.",
    },
  },
  352: {
    options: {
      A: "Perche la valutazione e efficace solo se utile per chi deve prendere decisioni.",
      B: "Perche tutti gli stakeholder condividono spontaneamente la stessa idea di successo.",
      C: "Perche consente di sostituire gli obiettivi di business con metriche standard.",
      D: "Perche permette di evitare la scelta dei destinatari del report finale.",
    },
  },
  351: {
    options: {
      A: "Validi: gli obiettivi devono essere rilevanti per il business e per l'organizzazione.",
      B: "Verificabili: gli obiettivi devono essere certificati da soggetti esterni.",
      C: "Valutabili: gli obiettivi devono coincidere con indicatori gia disponibili.",
      D: "Vincolanti: gli obiettivi devono restare identici per tutto il piano.",
    },
  },
  353: {
    options: {
      A: "È utile per chi deve prendere decisioni (management).",
      B: "Produce sempre un indicatore economico unico e confrontabile.",
      C: "Utilizza soltanto dati numerici e oggettivi.",
      D: "Coincide con la certificazione esterna degli output media.",
    },
  },
  355: {
    text: "Nel modello logico del CCPM, qual e la sequenza concettuale piu corretta?",
    options: {
      A: "Input e attivita, output, variabili ponte, outcome e impatto sulle aree di performance.",
      B: "Audit iniziale, scelta dei canali, report finale, ROI e archiviazione dei dati.",
      C: "Focus group, survey, analisi del contenuto, esperimento causale e benchmark.",
      D: "Awareness, engagement, reach, frequenza e costo per contatto lordo.",
    },
  },
  364: {
    options: {
      A: "Che a ciascuna delle prospettive aziendali corrisponda un'attivita specifica di comunicazione.",
      B: "Che il ROI sia l'unico indicatore valido per misurare il successo comunicativo.",
      C: "Che la comunicazione debba essere separata dalle prospettive di business.",
      D: "Che ogni prospettiva aziendale richieda la stessa metrica standard.",
    },
  },
  369: {
    options: {
      A: "Un'attivita integrata che rileva costantemente elementi di miglioramento e risponde agli utenti.",
      B: "Un monitoraggio limitato al periodo di lancio di un prodotto.",
      C: "Una rilevazione finale usata solo per rendicontare i risultati ottenuti.",
      D: "Un controllo tecnico dei canali proprietari senza lettura delle conversazioni.",
    },
  },
  373: {
    options: {
      A: "Prospettiva economico-finanziaria.",
      B: "Prospettiva del cliente.",
      C: "Prospettiva dei processi interni.",
      D: "Prospettiva dell'apprendimento e della crescita.",
    },
  },
  376: {
    options: {
      A: "Perché ciascuno ha aspettative e bisogni informativi differenti che guidano l'utilizzo dei risultati.",
      B: "Perché la misurazione richiede sempre lo stesso report sintetico per tutti i destinatari.",
      C: "Perché gli stakeholder interni devono essere esclusi dalla lettura degli outcome.",
      D: "Perché i soggetti coinvolti servono solo a validare tecnicamente i dati raccolti.",
    },
  },
  378: {
    options: {
      A: "General Elimination Methodology (GEM).",
      B: "Analisi SWOT qualitativa.",
      C: "Focus group esplorativo.",
      D: "Balanced Scorecard applicata.",
    },
  },
  380: {
    options: {
      A: "Il livello che collega la comunicazione alle performance di business complessive.",
      B: "Il livello che corregge strumenti e messaggi durante l'implementazione.",
      C: "Il livello che misura il capitale comunicativo consolidato nel tempo.",
      D: "Il livello che verifica ex ante l'adeguatezza dei contenuti.",
    },
  },
  381: {
    options: {
      A: "Per assicurarsi che i risultati siano comunicati in modo mirato a chi deve prendere decisioni.",
      B: "Per produrre un report unico e indistinto per tutti gli attori coinvolti.",
      C: "Per limitare la misurazione agli indicatori già disponibili nelle dashboard.",
      D: "Per separare i risultati dagli obiettivi decisionali del management.",
    },
  },
  382: {
    options: {
      A: "Si passa dal conteggio dei prodotti realizzati ai cambiamenti generati nei pubblici.",
      B: "Si trasformano automaticamente i comunicati stampa in risultati economici certi.",
      C: "Si misura soltanto l'efficienza operativa delle attività svolte.",
      D: "Si verifica esclusivamente l'adeguatezza dei messaggi prima del lancio.",
    },
  },
  383: {
    text: "Cosa indica il parametro 'Storia' (S) nel sistema di obiettivi VALUES?",
    options: {
      A: "La necessità di avere un termine di confronto, come l'andamento passato o un benchmark dei competitor.",
      B: "La descrizione cronologica delle campagne già realizzate dall'organizzazione.",
      C: "La memoria dei valori fondativi da richiamare nella comunicazione interna.",
      D: "La durata complessiva della relazione tra agenzia e committente.",
    },
  },
  384: {
    options: {
      A: "Riconoscere che, pur non essendoci certezza assoluta, i dati suggeriscono un legame credibile tra comunicazione ed effetti.",
      B: "Dimostrare con certezza sperimentale che la comunicazione è l'unica causa dei risultati.",
      C: "Attribuire i risultati positivi alla comunicazione anche senza una catena di evidenze.",
      D: "Rinunciare a collegare attività, output e outcome quando il contesto è complesso.",
    },
  },
  385: {
    text: "Cosa indica il parametro 'Storia' nel sistema di obiettivi VALUES?",
    options: {
      A: "La necessita di avere un termine di confronto, come l'andamento passato o un benchmark dei competitor.",
      B: "La descrizione cronologica delle campagne gia realizzate dall'organizzazione.",
      C: "La memoria dei valori fondativi da richiamare nella comunicazione interna.",
      D: "La durata complessiva della relazione tra agenzia e committente.",
    },
  },
  386: {
    options: {
      A: "Le attività.",
      B: "Gli outcome.",
      C: "Le variabili ponte.",
      D: "L'impatto.",
    },
  },
  389: {
    options: {
      A: "Sviluppare competenze, apprendimento organizzativo e capacità comunicative interne.",
      B: "Misurare la soddisfazione dei clienti finali verso prodotti e servizi.",
      C: "Valutare la comunicazione istituzionale rivolta agli investitori.",
      D: "Controllare esclusivamente i tempi di produzione dei contenuti.",
    },
  },
  387: {
    options: {
      A: "Prospettiva economico-finanziaria.",
      B: "Prospettiva del cliente.",
      C: "Prospettiva dei processi interni.",
      D: "Prospettiva dell'apprendimento e della crescita.",
    },
  },
  390: {
    text: "Nella Communication Balanced Scorecard, quale prospettiva riguarda piu direttamente l'efficienza dei processi comunicativi interni?",
    options: {
      A: "Prospettiva dei processi interni.",
      B: "Prospettiva economico-finanziaria.",
      C: "Prospettiva del cliente.",
      D: "Prospettiva dell'apprendimento e della crescita.",
    },
  },
  392: {
    options: {
      A: "A valutare singole attività e strumenti durante l'implementazione per correggerli e migliorarli.",
      B: "A dimostrare il contributo finale della comunicazione ai risultati di business.",
      C: "A misurare il capitale reputazionale consolidato nel medio-lungo periodo.",
      D: "A sostituire gli obiettivi di comunicazione con dati economico-finanziari.",
    },
  },
  393: {
    options: {
      A: "Outcome.",
      B: "Input.",
      C: "Output.",
      D: "Attività.",
    },
  },
  397: {
    options: {
      A: "Business Objectives, cioè il miglioramento delle performance finanziarie e strategiche.",
      B: "Social Media Metrics, come numero di retweet, commenti e visualizzazioni.",
      C: "KPI tattici di engagement raccolti sulle piattaforme social.",
      D: "Metriche operative sul volume dei contenuti pubblicati.",
    },
  },
  400: {
    options: {
      A: "Cercare una causalità plausibile e argomentata, non una causalità perfetta e isolata.",
      B: "Attribuire automaticamente ogni risultato di business alla comunicazione.",
      C: "Evitare qualsiasi collegamento tra attività, output e outcome.",
      D: "Usare solo esperimenti di laboratorio per misurare gli effetti comunicativi.",
    },
  },
  403: {
    options: {
      A: "Un'unita indice per esprimere l'impatto qualitativo senza trasformarlo direttamente in euro.",
      B: "Un valore monetario equivalente ottenuto dalle tariffe pubblicitarie degli spazi.",
      C: "Una misura di reach lorda calcolata sui contatti potenziali del mezzo.",
      D: "Un indicatore di sentiment che classifica la copertura come positiva o negativa.",
    },
  },
  398: {
    options: {
      A: "Il rapporto tra partecipanti attivi e membri totali, considerando anche la loro capacità di influenzare altri.",
      B: "Il costo medio sostenuto per ogni contenuto pubblicato dagli influencer coinvolti.",
      C: "La quota di impression ottenute sui canali paid rispetto ai canali earned.",
      D: "Il numero di menzioni complessive prodotte durante il periodo di campagna.",
    },
  },
  406: {
    options: {
      A: "Che non presidiare i social media puo generare costi competitivi e reputazionali.",
      B: "Che i social media vanno valutati solo quando producono vendite immediate.",
      C: "Che l'assenza dai social elimina i rischi di reputazione online.",
      D: "Che la misurazione deve limitarsi ai media tradizionali certificati.",
    },
  },
  410: {
    options: {
      A: "ROE (Return on Expectations).",
      B: "ROEM (Return on Earned Media).",
      C: "ROTI (Return on Target Influence).",
      D: "AVE (Advertising Value Equivalent).",
    },
  },
  408: {
    options: {
      A: "Che molti risultati comunicativi sono intangibili e di lungo periodo, rendendo la monetizzazione forzata e spesso inattendibile.",
      B: "Che il ROI vada usato solo quando e gia disponibile un dato economico attribuibile.",
      C: "Che l'efficacia comunicativa debba essere valutata soltanto con indicatori di copertura.",
      D: "Che la comunicazione non debba mai collegarsi agli obiettivi economici dell'organizzazione.",
    },
  },
  411: {
    text: "Quale indicatore alternativo al ROI richiama i cambiamenti rilevati nei pubblici di riferimento?",
    options: {
      A: "ROTI (Return on Target Influence).",
      B: "ROE (Return on Expectations).",
      C: "ROEM (Return on Earned Media).",
      D: "AVE (Advertising Value Equivalent).",
    },
  },
  415: {
    options: {
      A: "Le informazioni sono dati lavorati e collocati in un contesto significativo.",
      B: "I dati sono già raccomandazioni operative pronte per essere applicate.",
      C: "Le informazioni sono unità grezze non ancora interpretate.",
      D: "Dati e informazioni coincidono sempre nel processo di analisi.",
    },
  },
  414: {
    options: {
      A: "Un coefficiente, pari a 1 quando l'intero articolo è dedicato all'azienda o al prodotto.",
      B: "Un coefficiente che riduce il valore quando l'azienda è citata solo marginalmente.",
      C: "Un moltiplicatore applicato quando il titolo richiama direttamente il brand.",
      D: "Un indicatore usato per pesare la presenza di immagini o box di approfondimento.",
    },
  },
  416: {
    options: {
      A: "Un'unità indice per esprimere l'impatto qualitativo della copertura senza tradurlo direttamente in euro.",
      B: "Il valore monetario dello spazio pubblicitario equivalente acquistato sul mezzo.",
      C: "La readership certificata moltiplicata per il costo medio di una pagina pubblicitaria.",
      D: "Un indicatore di sentiment usato soltanto per classificare gli articoli negativi.",
    },
  },
  417: {
    options: {
      A: "EAV (Advertising Value Equivalent).",
      B: "ROO (Return on Objectives).",
      C: "NPS (Net Promoter Score).",
      D: "GRP (Gross Rating Point).",
    },
  },
  421: {
    text: "Quale indicatore richiama la valorizzazione dell'esposizione ottenuta sui media earned?",
    options: {
      A: "ROEM.",
      B: "ROO.",
      C: "ROTI.",
      D: "NPS.",
    },
  },
  420: {
    text: "Quale misura alternativa confronta iniziative che producono effetti simili scegliendo quella meno costosa o piu efficace?",
    options: {
      A: "Rapporto costo/efficacia.",
      B: "Return on Expectations.",
      C: "Advertising Value Equivalent.",
      D: "Return on Earned Media.",
    },
  },
  423: {
    text: "Secondo la formula generale, come si calcola il ROI di un'attivita di comunicazione?",
    options: {
      A: "(Benefici - costi) / costi x 100.",
      B: "(Costi - benefici) / benefici x 100.",
      C: "Benefici + costi, senza rapporto percentuale.",
      D: "Visualizzazioni / costo per click.",
    },
  },
  424: {
    options: {
      A: "Costo sostenuto per ogni comunicato prodotto o per ogni partecipante effettivo a un evento.",
      B: "Miglioramento della fiducia degli stakeholder dopo una campagna.",
      C: "Quota di mercato ottenuta nel trimestre successivo alla campagna.",
      D: "Reputazione complessiva dell'organizzazione presso i pubblici esterni.",
    },
  },
  425: {
    options: {
      A: "Il rapporto tra il guadagno finanziario generato dalla comunicazione e il costo sostenuto per realizzarla.",
      B: "Il valore pubblicitario equivalente dello spazio editoriale ottenuto gratuitamente.",
      C: "Il grado di raggiungimento degli obiettivi comunicativi prefissati.",
      D: "La propensione dei pubblici a raccomandare l'organizzazione.",
    },
  },
  426: {
    text: "Quale esempio descrive meglio una misura di efficienza basata sul rapporto input/output?",
    options: {
      A: "Costo sostenuto per ogni partecipante effettivamente presente a un evento.",
      B: "Miglioramento della fiducia degli stakeholder dopo una campagna.",
      C: "Qualita percepita della relazione tra organizzazione e pubblici.",
      D: "Quota di conversazioni positive rispetto al totale delle menzioni.",
    },
  },
  427: {
    options: {
      A: "Che lo spazio editoriale ottenuto possa essere valorizzato come spazio pubblicitario equivalente.",
      B: "Che tutti gli outcome comunicativi siano direttamente attribuibili alle vendite.",
      C: "Che la copertura media sia sempre negativa se non è stata acquistata come paid media.",
      D: "Che le relazioni con gli stakeholder possano essere misurate solo con survey qualitative.",
    },
  },
  431: {
    text: "Nella formula del ROI, quale grandezza si trova al denominatore?",
    options: {
      A: "I costi o l'investimento sostenuto per l'attivita.",
      B: "Il totale dei benefici lordi generati dalla campagna.",
      C: "Il numero di contatti raggiunti dal messaggio.",
      D: "Il valore pubblicitario equivalente della copertura.",
    },
  },
  432: {
    text: "Quale limite metodologico va ricordato quando si presenta il ROI della comunicazione?",
    options: {
      A: "La difficolta di attribuire causalmente i benefici alla sola comunicazione.",
      B: "L'assenza di una formula matematica condivisa per il calcolo del ritorno.",
      C: "L'impossibilita di usare dati economici in presenza di obiettivi di business.",
      D: "La necessita di sostituire sempre il ROI con l'AVE.",
    },
  },
  436: {
    options: {
      A: "Confonde il costo di uno spazio pubblicitario con il valore reale della comunicazione editoriale.",
      B: "Si applica solo alla televisione e non puo essere usato per stampa o web.",
      C: "Misura direttamente gli outcome cognitivi, affettivi e comportamentali.",
      D: "Richiede sempre una survey rappresentativa su tutti i lettori esposti.",
    },
  },
  429: {
    options: {
      A: "(Benefici - Costi) / Costi x 100.",
      B: "(Reach x Frequenza) / Costo.",
      C: "(REAV x Readership) / 1.000.000.",
      D: "Costi / Benefici x 100.",
    },
  },
  430: {
    options: {
      A: "(Benefici - costi) / costi x 100; il limite è attribuire causalmente i benefici alla sola comunicazione.",
      B: "Numero di lead / investimento totale; il limite è ignorare la qualità dei contatti generati.",
      C: "Spazio editoriale x costo pubblicità equivalente; il limite è sovrastimare il valore reale.",
      D: "Percentuale promotori - percentuale detrattori; il limite è non essere espresso in euro.",
    },
  },
  434: {
    options: {
      A: "AVE/EAV, cioè il valore pubblicitario equivalente della copertura earned.",
      B: "ROO, cioè il ritorno sugli obiettivi comunicativi prefissati.",
      C: "NPS, cioè la propensione alla raccomandazione del brand.",
      D: "GRP, cioè la pressione pubblicitaria lorda sui pubblici esposti.",
    },
  },
  437: {
    options: {
      A: "Nelle relazioni di scambio si offrono benefici per riceverne altri, in quelle comunitarie per il benessere altrui.",
      B: "Le relazioni di scambio sono basate sulla fiducia, quelle comunitarie solo su contratti.",
      C: "Le relazioni comunitarie misurano la copertura media, quelle di scambio la reputazione.",
      D: "Le relazioni di scambio riguardano gli stakeholder interni, quelle comunitarie gli esterni.",
    },
  },
  439: {
    text: "Quando e piu corretto parlare di ROO invece che di ROI?",
    options: {
      A: "Quando si valuta il grado di raggiungimento di obiettivi comunicativi prefissati.",
      B: "Quando si monetizza lo spazio editoriale ottenuto come pubblicita equivalente.",
      C: "Quando si calcola il rapporto tra benefici economici e costi sostenuti.",
      D: "Quando si certificano audience e readership tramite organismi di mercato.",
    },
  },
  440: {
    options: {
      A: "Il grado di raggiungimento degli obiettivi di comunicazione prefissati.",
      B: "Il calcolo del guadagno monetario netto per ogni euro speso in pubblicita.",
      C: "Il tempo medio di permanenza degli utenti sulla home page del sito web.",
      D: "Il valore economico equivalente della copertura editoriale ottenuta.",
    },
  },
  441: {
    options: {
      A: "Non misura automaticamente tono, qualita, centralita della citazione e credibilita della copertura.",
      B: "Misura solo la copertura lorda e non puo essere convertito in un valore monetario.",
      C: "Si basa esclusivamente su interviste qualitative agli stakeholder interni.",
      D: "Riguarda solo la pianificazione paid e non considera gli earned media.",
    },
  },
  442: {
    options: {
      A: "ROTI (Return on Target Influence).",
      B: "ROE (Return on Expectations).",
      C: "ROEM (Return on Earned Media).",
      D: "ROO (Return on Objectives).",
    },
  },
  443: {
    options: {
      A: "Perché confondono il costo di uno spazio pubblicitario con il valore relazionale ed editoriale di un contenuto spontaneo.",
      B: "Perché misurano direttamente outcome e impatto, ignorando gli output intermedi.",
      C: "Perché certificano automaticamente la qualità della relazione con gli stakeholder.",
      D: "Perché valgono solo per i media paid e non per la copertura editoriale earned.",
    },
  },
  444: {
    options: {
      A: "Confonde il costo dello spazio pubblicitario con il valore reale della copertura editoriale ottenuta.",
      B: "Misura direttamente fiducia, reputazione e soddisfazione degli stakeholder.",
      C: "Permette di isolare perfettamente la comunicazione dalle altre leve aziendali.",
      D: "Rende secondaria la definizione di obiettivi e KPI prima della campagna.",
    },
  },
  445: {
    options: {
      A: "Si fermano al conteggio di dati grezzi senza trasformarli in informazioni, insight e decisioni.",
      B: "Richiedono sempre dati di vendita certificati dal reparto commerciale.",
      C: "Misurano meglio del ROO il raggiungimento degli obiettivi strategici.",
      D: "Possono essere applicate solo alla stampa, ma non ai canali digitali.",
    },
  },
  451: {
    options: {
      A: "Tutto cio che rende possibile la circolazione di valori e significati condivisi.",
      B: "Le procedure operative e i sistemi informativi che strutturano l'organizzazione.",
      C: "Le competenze professionali e relazionali possedute dai dipendenti.",
      D: "Le relazioni commerciali e istituzionali consolidate con gli stakeholder.",
    },
  },
  452: {
    options: {
      A: "Il capitale intellettuale non genera pienamente valore se non viene comunicato e condiviso.",
      B: "Il capitale intellettuale riguarda solo procedure interne e infrastrutture tecniche.",
      C: "La comunicazione serve solo a rendicontare il capitale finanziario gia prodotto.",
      D: "Capitale intellettuale e comunicazione sono ambiti separati senza influenza reciproca.",
    },
  },
  455: {
    options: {
      A: "L'insieme delle storie, del corporate storytelling e delle conversazioni online sull'azienda.",
      B: "Le procedure operative e i manuali interni che regolano il lavoro quotidiano.",
      C: "I sistemi informativi e le infrastrutture tecniche possedute dall'impresa.",
      D: "Le competenze individuali e i titoli professionali del personale.",
    },
  },
  456: {
    options: {
      A: "Intangibili come fiducia e reputazione che collegano gli outcome all'impatto sul business.",
      B: "Gli output immediati prodotti dalla funzione, come comunicati, eventi e post.",
      C: "Gli input economici e professionali impiegati prima dell'avvio del programma.",
      D: "Le metriche di copertura media usate per stimare la visibilita ottenuta.",
    },
  },
  458: {
    options: {
      A: "Competenze, conoscenze, capacita comunicative e livelli di istruzione del personale.",
      B: "Procedure, sistemi informativi, cultura organizzativa e infrastrutture interne.",
      C: "Relazioni con clienti, stakeholder, fornitori e comunita di riferimento.",
      D: "Storie, narrazioni e conversazioni che rendono riconoscibile l'organizzazione.",
    },
  },
  460: {
    text: "Perche la comunicazione e centrale nello sviluppo del capitale intellettuale?",
    options: {
      A: "Perche permette la circolazione delle conoscenze e la creazione di relazioni.",
      B: "Perche trasforma automaticamente ogni risorsa intangibile in valore finanziario.",
      C: "Perche sostituisce il capitale umano con procedure e sistemi informativi.",
      D: "Perche rende superflua la misurazione della reputazione presso gli stakeholder.",
    },
  },
  462: {
    text: "Nella tassonomia dei KPI del CCPM, a cosa corrisponde il 'Livello Sommativo'?",
    options: {
      A: "Alla misurazione delle dimensioni consolidate del capitale comunicativo: organizzativo-umano, relazionale-sociale e reputazionale-narrativo.",
      B: "Alla valutazione ex ante dell'adeguatezza dei messaggi prima del lancio.",
      C: "Alla misurazione delle singole attivita per correggerle durante l'implementazione.",
      D: "Alla dimostrazione del contributo della comunicazione alle performance di business.",
    },
  },
  469: {
    options: {
      A: "A creare un clima di fiducia e avviare la partecipazione rompendo il ghiaccio.",
      B: "A presentare subito gli stimoli principali senza introdurre il tema.",
      C: "A raccogliere solo dati anagrafici prima di chiudere la discussione.",
      D: "A selezionare i partecipanti piu adatti mentre il focus group e gia iniziato.",
    },
  },
  481: {
    options: {
      A: "Le parti offrono benefici per interesse verso il benessere dell'altro, senza attendere una ricompensa immediata.",
      B: "Le parti scambiano benefici aspettandosi reciprocita diretta nel breve periodo.",
      C: "La relazione nasce solo da contratti formali e obblighi commerciali.",
      D: "Il rapporto viene valutato unicamente attraverso indicatori di vendita.",
    },
  },
  484: {
    options: {
      A: "La capacita dell'azienda di raccogliere feedback costruttivi dagli stakeholder.",
      B: "La quota di conversazioni favorevoli rispetto al totale delle menzioni raccolte.",
      C: "Il livello di reach potenziale ottenuto dai contenuti pubblicati.",
      D: "Il valore pubblicitario equivalente attribuito alla copertura media.",
    },
  },
  487: {
    options: {
      A: "Il coordinamento tra persone e processi e la valorizzazione del capitale umano.",
      B: "La visibilita esterna sui media ottenuta attraverso la rassegna stampa.",
      C: "La certificazione delle audience da parte degli organismi di mercato.",
      D: "La monetizzazione degli spazi pubblicitari sui canali proprietari.",
    },
  },
  491: {
    options: {
      A: "Stima, ammirazione, fiducia e sentimenti degli stakeholder verso l'azienda.",
      B: "Performance finanziarie, governance, innovazione e qualita dei prodotti.",
      C: "Reach, frequenza, GRP e costo per mille contatti della campagna.",
      D: "Soddisfazione dei dipendenti verso i flussi di comunicazione interna.",
    },
  },
  492: {
    options: {
      A: "Innovazione, qualita di prodotti/servizi, luogo di lavoro, performance finanziaria, visione, leadership, cittadinanza e governance.",
      B: "Stima, ammirazione, fiducia e sentimenti generali degli stakeholder.",
      C: "Reach, frequenza, impression, click-through rate e costo per contatto.",
      D: "Output media, share of voice, presenza dei messaggi chiave e tono.",
    },
  },
  493: {
    options: {
      A: "Capitale umano, relazionale e organizzativo.",
      B: "Solo capitale relazionale, perche gli altri intangibili sono tecnici.",
      C: "Capitale finanziario, quota di mercato e margine operativo lordo.",
      D: "Solo riduzione dei costi pubblicitari e ritorno economico immediato.",
    },
  },
  494: {
    options: {
      A: "Un punteggio sintetico basato sulla somma delle valutazioni dei vari indicatori reputazionali.",
      B: "Il valore pubblicitario equivalente della copertura editoriale ottenuta.",
      C: "Il numero di contatti lordi certificati dagli enti di audience.",
      D: "La propensione alla raccomandazione calcolata come NPS.",
    },
  },
  495: {
    text: "Perche i vantaggi competitivi basati sulla reputazione sono piu durevoli?",
    options: {
      A: "Perche derivano da percezioni consolidate nel tempo e non solo da tattiche momentanee.",
      B: "Perche dipendono quasi esclusivamente da investimenti pubblicitari di breve periodo.",
      C: "Perche coincidono con brevetti e licenze protetti da norme giuridiche.",
      D: "Perche dipendono soltanto dalla dimensione economica dell'impresa.",
    },
  },
  496: {
    options: {
      A: "Capacita di attirare i migliori talenti.",
      B: "Possibilita di applicare un premium price ai clienti finali.",
      C: "Aumento della copertura mediatica spontanea nel breve periodo.",
      D: "Riduzione automatica degli oneri fiscali sul fatturato.",
    },
  },
  497: {
    options: {
      A: "Una risorsa immateriale fondamentale nel processo di generazione del valore dell'impresa.",
      B: "Un output media misurabile solo attraverso il numero di articoli pubblicati.",
      C: "Un costo pubblicitario da ridurre per aumentare il margine operativo.",
      D: "Una procedura di certificazione tecnica della qualita dei processi.",
    },
  },
  498: {
    options: {
      A: "Rappresenta il giudizio di valore su attributi, azioni passate e performance future dell'azienda.",
      B: "Coincide con la somma dei reclami ricevuti dal servizio clienti nel periodo.",
      C: "Misura soltanto la visibilita media ottenuta nelle fonti giornalistiche.",
      D: "Indica il livello tecnico di riconoscibilita del logo e dei colori aziendali.",
    },
  },
  499: {
    options: {
      A: "L'intensita, la forza e la velocita con cui l'organizzazione agisce.",
      B: "Il sistema dei valori dichiarati nella mission e nel codice etico.",
      C: "Il grado di formalizzazione delle procedure interne e dei ruoli.",
      D: "La competenza tecnica dei dipendenti nella gestione dei media digitali.",
    },
  },
  500: {
    options: {
      A: "Cultura organizzativa e valori.",
      B: "Livello di istruzione e competenze dei singoli dipendenti.",
      C: "Relazioni con clienti, fornitori e stakeholder esterni.",
      D: "Reputazione, fiducia e immagine percepita dai pubblici.",
    },
  },
  10: {
    text: "Quale errore riguarda l'utilizzo delle 'Impression' nelle relazioni media?",
  },
  59: {
    text: "Cosa si intende per 'ZMOT' nel percorso decisionale del consumatore?",
  },
  62: {
    text: "Quale funzione svolge principalmente la ricerca valutativa nel contesto organizzativo?",
  },
  69: {
    text: "Nel focus group su Poste Italiane, quale comportamento e stato interpretato come segnale di percezione di marginalita organizzativa?",
  },
  83: {
    text: "Nella ricerca qualitativa, qual e il principale limite metodologico?",
  },
  101: {
    text: "Quale tra i seguenti e un limite intrinseco dei focus group?",
    options: {
      A: "La necessita di verificare o approfondire i risultati con ulteriori strumenti, spesso quantitativi.",
      B: "La capacita di far emergere significati condivisi attraverso l'interazione.",
      C: "La possibilita di esplorare temi poco noti prima di una survey.",
      D: "La ricchezza interpretativa delle risposte e delle dinamiche osservate.",
    },
  },
  131: {
    text: "Cosa manca solitamente ai sistemi di Social Media Analytics nativi delle piattaforme?",
    options: {
      A: "Il collegamento diretto con gli obiettivi strategici e il benchmark di settore.",
      B: "La possibilità di contare follower, like e visualizzazioni dei contenuti.",
      C: "La disponibilità di grafici sulle performance dei post pubblicati.",
      D: "L'aggiornamento operativo dei dati prodotti dalla piattaforma stessa.",
    },
  },
  152: {
    text: "Quale delle seguenti e una caratteristica del Web 4.0?",
    options: {
      A: "Sistemi predittivi, AI conversazionale, agenti autonomi e automazione decisionale.",
      B: "Siti statici consultati in modo prevalentemente unidirezionale dagli utenti.",
      C: "Piattaforme social basate soprattutto su profili, commenti e condivisioni.",
      D: "Pagine semanticamente collegate ma senza capacita di azione autonoma.",
    },
  },
  158: {
    text: "Quale di questi NON rientra tra i grandi vettori del cambiamento digitale?",
    options: {
      A: "L'aumento della tassazione sui servizi digitali.",
      B: "La Rete come infrastruttura reticolare di relazioni.",
      C: "L'affermarsi di nuovi spazi di relazione.",
      D: "Il peso dei motori di ricerca e di risposta.",
    },
  },
  267: {
    text: "Nel processo ADS, qual e il tempo medio che porta alla certificazione definitiva dei dati?",
    options: {
      A: "Quasi due anni.",
      B: "Circa sei mesi.",
      C: "Ogni mese, subito dopo la raccolta dei dati.",
      D: "Sette giorni dalla chiusura del periodo di rilevazione.",
    },
  },
  270: {
    text: "Il sistema ADS e stato costituito nel:",
    options: {
      A: "1975, dalle associazioni UPA, FIEG e dalle federazioni pubblicitarie.",
      B: "2023, con la nascita del sistema Audicom digitale.",
      C: "2018, dopo l'avvio della Total Audience televisiva.",
      D: "2025, con la riforma delle rilevazioni JIC italiane.",
    },
  },
  300: {
    text: "Quale metrica e considerata troppo ampia e spesso misurata tramite il ROI?",
    options: {
      A: "Impatto.",
      B: "Reach.",
      C: "Share of Voice.",
      D: "Advocacy.",
    },
  },
  404: {
    text: "Quale di queste affermazioni sul ROI della comunicazione e corretta?",
  },
  412: {
    text: "Che cos'e l'AVE (Advertising Value Equivalency)?",
    options: {
      A: "Il valore monetario equivalente dello spazio pubblicitario corrispondente alla copertura ottenuta.",
      B: "Il livello di raggiungimento degli obiettivi comunicativi prefissati.",
      C: "La propensione dei pubblici a raccomandare l'organizzazione.",
      D: "Il rapporto tra benefici economici generati e costi sostenuti.",
    },
  },
  433: {
    text: "Qual e la differenza tra ROI e ROO?",
    options: {
      A: "Il ROI misura il ritorno economico, il ROO il grado di raggiungimento degli obiettivi.",
      B: "Il ROI riguarda solo gli obiettivi qualitativi, il ROO solo il valore monetario.",
      C: "Il ROI si usa per le audience certificate, il ROO per calcolare tiratura e diffusione.",
      D: "Il ROI misura soltanto i social media, il ROO soltanto la copertura stampa.",
    },
  },
  434: {
    text: "L'indicatore ROEM (Return on Earned Media) e un sinonimo di:",
    options: {
      A: "AVE/EAV, cioè il valore pubblicitario equivalente della copertura earned.",
      B: "ROO, cioè il ritorno sugli obiettivi comunicativi prefissati.",
      C: "NPS, cioè la propensione alla raccomandazione del brand.",
      D: "GRP, cioè la pressione pubblicitaria lorda sui pubblici esposti.",
    },
  },
  468: {
    text: "Perche non si deve trattare la reputazione come una misura diretta con standard unico?",
  },
  471: {
    text: "Quali sono i due pilastri necessari per monitorare la reputazione online di un brand?",
  },
  64: {
    options: {
      A: "Partire da temi generali e poco strutturati per arrivare gradualmente a domande specifiche.",
      B: "Ripetere la stessa domanda in modo identico finche tutti non danno la stessa risposta.",
      C: "Alternare domande statistiche e domande sperimentali con gruppo di controllo.",
      D: "Iniziare dalla conclusione del moderatore e chiedere ai partecipanti di confermarla.",
    },
  },
  78: {
    options: {
      A: "La valutazione finale del cambiamento prodotto sui pubblici rispetto agli obiettivi.",
      B: "Il monitoraggio operativo delle uscite stampa durante l'implementazione.",
      C: "La raccolta di dati secondari prima della definizione del brief.",
      D: "La costruzione del database dei contatti giornalistici.",
    },
  },
  89: {
    options: {
      A: "Possono essere obsolete o poco adattabili agli obiettivi specifici della ricerca.",
      B: "Sono sempre aggiornate e perfettamente coerenti con la domanda di ricerca.",
      C: "Eliminano la necessità di interpretare i dati nel contesto dell'organizzazione.",
      D: "Garantiscono lo stesso livello di profondità delle interviste qualitative primarie.",
    },
  },
  94: {
    options: {
      A: "Un monitoraggio sistematico e ripetuto nel tempo di un fenomeno in evoluzione.",
      B: "Una singola intervista esplorativa svolta prima della campagna.",
      C: "Un esperimento causale con gruppo di controllo e gruppo sperimentale.",
      D: "Una rilevazione una tantum usata solo per chiudere il report finale.",
    },
  },
  95: {
    options: {
      A: "Su fattori di rilevanza, autorevolezza e pertinenza rispetto alla query dell'utente.",
      B: "Sulla sola frequenza della parola chiave all'interno della pagina.",
      C: "Sul volume di traffico paid acquistato dall'organizzazione.",
      D: "Sull'ordine cronologico con cui le pagine sono state scoperte dal crawler.",
    },
  },
  86: {
    options: {
      A: "Una survey somministrata direttamente a un campione definito per la ricerca.",
      B: "Una tabella statistica già pubblicata da un ente esterno.",
      C: "Un report storico prodotto da una precedente campagna.",
      D: "Una rassegna di dati amministrativi già disponibili in azienda.",
    },
  },
  97: {
    options: {
      A: "Permette di confrontare l'effetto dello stimolo con una situazione simile non esposta allo stimolo.",
      B: "Serve a rendere il focus group statisticamente rappresentativo dell'intera popolazione.",
      C: "Sostituisce la definizione degli obiettivi con un benchmark esterno.",
      D: "Misura automaticamente il valore economico della copertura mediatica.",
    },
  },
  103: {
    options: {
      A: "Una descrizione obiettiva, sistematica e replicabile del contenuto della comunicazione.",
      B: "Una discussione qualitativa guidata tra partecipanti selezionati.",
      C: "Un esperimento causale basato su gruppo sperimentale e gruppo di controllo.",
      D: "Una raccolta di dati secondari senza griglia di codifica.",
    },
  },
  13: {
    options: {
      A: "Elementi che collegano gli output agli obiettivi desiderati, su cui il comunicatore ha potere.",
      B: "Indicatori economici utilizzati per stimare direttamente il valore finanziario del brand.",
      C: "Fattori esterni non controllabili che agiscono sul contesto della comunicazione.",
      D: "Misure di copertura media usate per descrivere solo la visibilita ottenuta.",
    },
  },
  198: {
    options: {
      A: "Collegare le metriche utilizzate ai risultati di business e all'impatto strategico.",
      B: "Limitarsi alla rendicontazione degli output media prodotti nel periodo.",
      C: "Sostituire i KPI collegati agli obiettivi con metriche di volume facilmente disponibili.",
      D: "Separare la misurazione della comunicazione dagli obiettivi decisionali del management.",
    },
  },
  377: {
    options: {
      A: "Ricerca valutativa, performance measurement e teoria degli intangibili.",
      B: "Media buying, creativita pubblicitaria e pianificazione degli spazi.",
      C: "Certificazione delle audience, contabilita industriale e normativa privacy.",
      D: "SEO tecnico, social advertising e customer service operativo.",
    },
  },
  417: {
    options: {
      A: "EAV (Advertising Value Equivalent).",
      B: "ROO (Return on Objectives).",
      C: "NPS (Net Promoter Score).",
      D: "GRP (Gross Rating Point).",
    },
  },
  18: {
    options: {
      A: "Commenti, condivisioni o risposte generate dai contenuti pubblicati.",
      B: "Budget investito in campagne ADV.",
      C: "Numero di post prodotti a settimana.",
      D: "Numero di dipendenti assegnati al social media listening.",
    },
  },
  30: {
    options: {
      A: "OCIPO.",
      B: "OCAI.",
      C: "ROIT.",
      D: "Laddering.",
    },
  },
  32: {
    options: {
      A: "Domande chiave.",
      B: "Domande di apertura.",
      C: "Domande di introduzione.",
      D: "Domande finali.",
    },
  },
  40: {
    options: {
      A: "Attraverso processi reticolari che diffondono rapidamente simboli, conoscenze e contenuti.",
      B: "Attraverso una comunicazione prevalentemente unidirezionale controllata dai media di massa.",
      C: "Attraverso canali separati in cui produzione e consumo restano rigidamente distinti.",
      D: "Attraverso processi locali che limitano lo scambio di informazioni tra comunita.",
    },
  },
  41: {
    options: {
      A: "Strategia multi-device reale, considerando anche il ruolo ancora rilevante del desktop.",
      B: "Strategia mobile-only, ignorando gli altri dispositivi di accesso.",
      C: "Strategia centrata solo su smartwatch e dispositivi indossabili.",
      D: "Strategia offline, sostituendo i touchpoint digitali con materiali cartacei.",
    },
  },
  42: {
    options: {
      A: "L'utente può essere più vulnerabile a contenuti falsi se coerenti con i propri bias.",
      B: "Le filter bubble dipendono solo dalla scelta casuale delle fonti informative.",
      C: "La disinformazione riguarda esclusivamente i media tradizionali generalisti.",
      D: "Le notizie false perdono efficacia quando confermano convinzioni pregresse.",
    },
  },
  q13: {
    matchText: "Che cosa si intende per 'variabili ponte' all'interno del processo di valutazione della comunicazione?",
    options: {
      A: "Intangibili come fiducia, reputazione e relazione che collegano outcome e impatto.",
      B: "Le risorse operative impiegate per produrre contenuti, eventi e uscite media.",
      C: "Gli indicatori di copertura usati per descrivere soltanto la visibilità ottenuta.",
      D: "I risultati economici finali già osservati nelle aree di performance.",
    },
  },
  q41: {
    matchText: "Nel 2026, qual è la strategia suggerita per gestire la varietà di dispositivi?",
    text: "Nella gestione dei touchpoint digitali, quale approccio è coerente con una strategia multi-device?",
    options: {
      A: "Considerare dispositivi diversi e contesti d'uso, senza trascurare il desktop.",
      B: "Limitare la progettazione ai soli dispositivi mobili più usati dal pubblico.",
      C: "Separare completamente i touchpoint digitali dalla misurazione del percorso utente.",
      D: "Sostituire i touchpoint digitali con materiali offline non tracciabili.",
    },
  },
  q85: {
    matchText: "Nella ricerca valutativa, perché è fondamentale definire dei 'Benchmark'?",
    options: {
      A: "Per avere parametri di confronto rispetto ai quali valutare scostamenti e risultati.",
      B: "Per sostituire gli obiettivi della campagna con valori medi di settore.",
      C: "Per evitare la costruzione di baseline prima dell'avvio del programma.",
      D: "Per limitare il confronto ai soli dati disponibili nei report interni.",
    },
  },
  q142: {
    matchText: "Nel monitoraggio dei media, cosa distingue il 'Social Listening' dal semplice monitoraggio?",
    options: {
      A: "Il social listening parte da domande di business e deve produrre insight e raccomandazioni.",
      B: "Il social listening si limita a contare interazioni native sulle piattaforme social.",
      C: "Il monitoraggio interpreta sempre gli insight, mentre il listening raccoglie solo dati grezzi.",
      D: "Il social listening riguarda solo i canali televisivi e radiofonici certificati.",
    },
  },
  q264: {
    matchText: "Secondo il materiale, qual è il tempo medio di durata del processo che porta alla certificazione definitiva dei dati ADS?",
    options: {
      A: "Quasi due anni.",
      B: "Pochi giorni dopo la dichiarazione iniziale comunicata dagli editori.",
      C: "Circa sei mesi dopo la chiusura dell'anno fiscale dell'editore.",
      D: "Ogni mese, contestualmente alla pubblicazione dei dati dichiarati.",
    },
  },
  43: {
    options: {
      A: "HyperText Markup Language.",
      B: "Hyper Transfer Media Logic.",
      C: "Home Tool Management Link.",
      D: "High Text Marketing Language.",
    },
  },
  44: {
    options: {
      A: "La centralità o il rilievo attribuito al soggetto nel contenuto analizzato.",
      B: "Il numero complessivo di articoli pubblicati in un determinato periodo.",
      C: "Il tono favorevole, neutro o sfavorevole della copertura ottenuta.",
      D: "La presenza di messaggi chiave diffusi dall'organizzazione.",
    },
  },
  2: {
    text: "Perché la distinzione tra output, outcome e impatto è strategicamente rilevante?",
    options: {
      A: "Perché ciascun livello risponde a obiettivi diversi e si manifesta in tempi diversi.",
      B: "Perché impatto e outcome coincidono sempre nei risultati di business.",
      C: "Perché tutti e tre vanno misurati con la stessa frequenza temporale.",
      D: "Perché solo l'output è realmente misurabile in modo affidabile.",
    },
  },
  15: {
    options: {
      A: "Un out-take.",
      B: "Un input.",
      C: "Un output.",
      D: "Un impatto di business.",
    },
  },
  35: {
    options: {
      A: "Si parte da uno schema generale per arrivare a temi molto specifici e strutturati.",
      B: "Si apre con domande specifiche e si chiude con una discussione più generale.",
      C: "Si alternano domande esplorative e domande di controllo causale.",
      D: "Si usa una sequenza fissa di domande chiuse a risposta numerica.",
    },
  },
  70: {
    options: {
      A: "L'interazione tra i partecipanti genera idee e approfondimenti impossibili in un'intervista singola.",
      B: "La possibilità di ottenere stime statisticamente rappresentative dell'intera popolazione.",
      C: "La maggiore velocità di elaborazione dei dati numerici tramite sistemi CAPI.",
      D: "Il controllo sperimentale delle variabili attraverso gruppi di trattamento e controllo.",
    },
  },
  93: {
    text: "Nella ricerca qualitativa, qual è il vantaggio principale dell'interazione tra i partecipanti di un Focus Group?",
    options: {
      A: "Funziona da stimolo per il dialogo e la creatività, facendo emergere idee che non uscirebbero in un'intervista singola.",
      B: "Garantisce risultati statisticamente rappresentativi dell'intera popolazione di riferimento.",
      C: "Riduce la discussione a una sequenza di risposte chiuse individuali.",
      D: "Permette di dimostrare un nesso causale tra campagna e comportamento d'acquisto.",
    },
  },
  99: {
    options: {
      A: "La necessità di testare o approfondire i risultati con un'indagine quantitativa successiva.",
      B: "La possibilità di osservare interazioni e conflitti tra partecipanti.",
      C: "La ricchezza delle motivazioni emerse durante la discussione.",
      D: "La flessibilità della traccia rispetto a un questionario standardizzato.",
    },
  },
  102: {
    options: {
      A: "La costruzione del campione e del questionario, perché condiziona la qualità dei dati raccolti.",
      B: "La scelta del canale di somministrazione, perché incide su tassi di risposta e copertura.",
      C: "La definizione delle scale di risposta, perché può influenzare comparabilità e interpretazione.",
      D: "La fase di pulizia dei dati, perché può modificare la numerosità effettiva del campione.",
    },
  },
  134: {
    text: "Secondo il framework di misurazione semplificato, qual è il fattore critico di successo rappresentato dall'Organizzazione?",
    options: {
      A: "La preparazione delle persone a misurare e comprendere i social media.",
      B: "La scelta di una piattaforma tecnologica coerente con obiettivi e risorse.",
      C: "La definizione di processi condivisi per raccogliere, leggere e usare i dati.",
      D: "L'allineamento tra reporting operativo e decisioni del management.",
    },
  },
  143: {
    options: {
      A: "La presenza di soggetti terzi indipendenti che sostengono o citano positivamente l'organizzazione.",
      B: "La quota di messaggi chiave ripresi nei contenuti pubblicati dai media.",
      C: "La frequenza con cui i portavoce ufficiali compaiono nella copertura.",
      D: "La centralità dell'organizzazione all'interno del singolo articolo.",
    },
  },
  154: {
    options: {
      A: "L'attività di customer service svolta pubblicamente e rapidamente sui social.",
      B: "La sola analisi periodica del sentiment senza presa in carico delle richieste.",
      C: "La pianificazione editoriale dei contenuti social orientati all'awareness.",
      D: "La misurazione della reach ottenuta dalle campagne paid sui social network.",
    },
  },
  160: {
    options: {
      A: "Piattaforme che coprono tutto il funnel, dalla consapevolezza alla fedeltà.",
      B: "Canali centrati solo sulla pubblicazione di contenuti fotografici personali.",
      C: "Ambienti usati esclusivamente per attività di awareness senza conversione.",
      D: "Piattaforme separate dai processi di customer care e social commerce.",
    },
  },
  161: {
    options: {
      A: "La decisione del CERN di rendere pubblica e gratuita la tecnologia.",
      B: "La disponibilità dei primi browser grafici accessibili a un pubblico più ampio.",
      C: "La standardizzazione dei protocolli che rese più semplice pubblicare e navigare.",
      D: "La crescita dell'interesse accademico e commerciale verso le reti ipertestuali.",
    },
  },
  177: {
    options: {
      A: "È la somma dei visitatori unici più le condivisioni pesate sui vari social network.",
      B: "È il numero di utenti che hanno visualizzato almeno una volta il contenuto.",
      C: "È la quota di utenti esposti che hanno interagito con il post.",
      D: "È il rapporto tra impression ottenute e costo sostenuto per la pubblicazione.",
    },
  },
  178: {
    options: {
      A: "Riduzione del traffico al call center tradizionale grazie al supporto social.",
      B: "Numero di visualizzazioni complessive ottenute dai post pubblicati.",
      C: "Tasso medio di engagement sui contenuti organici della pagina.",
      D: "Crescita netta dei follower nel periodo di osservazione.",
    },
  },
  179: {
    options: {
      A: "La quota di richieste di supporto o reclami risolti con successo attraverso i canali social.",
      B: "Il tempo medio necessario per prendere in carico una richiesta ricevuta sui social.",
      C: "Il numero di conversazioni assegnate correttamente al team di customer care.",
      D: "La percentuale di richieste classificate per tema o livello di priorità.",
    },
  },
  180: {
    options: {
      A: "L'utilizzo dei social per influenzare direttamente o indirettamente l'aumento del fatturato e delle vendite.",
      B: "La misurazione dello stato di salute del brand attraverso sentiment e share of voice.",
      C: "Il miglioramento del servizio clienti attraverso tempi di risposta e risoluzione.",
      D: "La raccolta di idee e suggerimenti per sviluppare nuovi prodotti o servizi.",
    },
  },
  195: {
    text: "Nel processo di analisi semantica, cos'è l'Estrattore di funzioni semantiche?",
  },
  215: {
    options: {
      A: "Il contributo della comunicazione ai risultati di business nel medio-lungo periodo, come vendite o fidelizzazione.",
      B: "Il cambiamento immediato di conoscenze, atteggiamenti o comportamenti dei pubblici.",
      C: "Il prodotto operativo generato dalla funzione, come contenuti o uscite media.",
      D: "La ricezione e comprensione del messaggio subito dopo l'esposizione.",
    },
  },
  219: {
    text: "Qual è il rischio principale dell'automazione cieca nell'uso dell'AI per la misurazione social?",
    options: {
      A: "Far agire un sistema o prendere decisioni operative direttamente sugli output dell'AI senza supervisione umana.",
      B: "Aumentare i tempi di configurazione iniziale dei dizionari e delle tassonomie.",
      C: "Ridurre il numero di fonti monitorabili quando le piattaforme chiudono le API.",
      D: "Rendere più costoso il salvataggio storico dei dataset di conversazioni.",
    },
  },
  469: {
    options: {
      A: "A creare un clima di fiducia e avviare la partecipazione rompendo il ghiaccio.",
      B: "A presentare subito gli stimoli principali senza introdurre gradualmente il tema.",
      C: "A raccogliere dati anagrafici e informazioni di profilo prima della discussione.",
      D: "A selezionare i partecipanti più adatti prima dell'inizio del focus group.",
    },
  },
  306: {
    options: {
      A: "Essere specifico, misurabile, raggiungibile, rilevante e temporizzato.",
      B: "Essere formulato in modo ampio per adattarsi a qualsiasi risultato ottenuto.",
      C: "Essere definito solo dopo la raccolta dei dati conclusivi della campagna.",
      D: "Essere espresso come elenco di attività operative da completare.",
    },
  },
  368: {
    matchText: "Che cosa si intende per 'KPI di Business' nel contesto del livello rendicontativo?",
    options: {
      A: "Misure derivate dal marketing e management, come vendite, quota di mercato e fidelizzazione.",
      B: "Indicatori di visibilità e copertura media ottenuta nel periodo.",
      C: "Metriche di efficienza operativa, come costi per output prodotto.",
      D: "Indicatori relazionali, come fiducia e qualità della relazione con gli stakeholder.",
    },
  },
  449: {
    matchText: "Qual e il limite principale di un modello reputazionale sintetico rispetto a uno analitico?",
    options: {
      A: "Tende a privilegiare il dato aggregato, mentre l'analitico scompone la reputazione in dimensioni.",
      B: "Misura soltanto la reputazione finanziaria e trascura le percezioni degli stakeholder.",
      C: "Coincide con la valorizzazione monetaria della copertura media ottenuta.",
      D: "Descrive in dettaglio le singole cause del giudizio reputazionale.",
    },
  },
  463: {
    matchText: "Secondo Grunig e Hon, quali sono i due tipi principali di relazione che un'organizzazione può avere con i suoi stakeholder?",
    options: {
      A: "Relazioni di scambio, basate su benefici attesi, e relazioni comunitarie, basate sul bene dell'altro.",
      B: "Relazioni digitali, mediate dai social media, e relazioni fisiche, gestite in presenza.",
      C: "Relazioni verticali, basate sulla gerarchia, e relazioni orizzontali, basate sul pari grado.",
      D: "Relazioni contrattuali, regolate da accordi formali, e relazioni reputazionali, fondate sull'immagine.",
    },
  },
  486: {
    matchText: "Nel monitoraggio della reputazione, la differenza tra 'Immagine' e 'Reputazione' risiede principalmente nel fatto che:",
    options: {
      A: "L'immagine è una percezione istantanea, mentre la reputazione è un giudizio sedimentato nel tempo.",
      B: "L'immagine è il giudizio sedimentato nel tempo, mentre la reputazione è una percezione immediata.",
      C: "L'immagine riguarda la comunicazione di prodotto, mentre la reputazione riguarda solo la comunicazione interna.",
      D: "Immagine e reputazione sono sinonimi perché entrambe derivano dalla percezione dei pubblici.",
    },
  },
  q328: {
    matchText: "Nel modello PII (Preparation, Implementation, Impact), perché gli output sono definiti come 'pseudo-effetti'?",
    options: {
      A: "Perché rappresentano sforzi e prodotti realizzati, ma non garantiscono cambiamenti effettivi nei pubblici.",
      B: "Perché sono misure economiche finali attribuite direttamente ai risultati di business.",
      C: "Perché appartengono alla fase di pre-test e non alla fase di implementazione.",
      D: "Perché descrivono opinioni e comportamenti già modificati dal programma.",
    },
  },
  q326: {
    matchText: "Cosa caratterizza il 'Continuing Model' di valutazione?",
    options: {
      A: "È un processo dinamico e flessibile basato su un meccanismo di feedback continuo.",
      B: "È un modello lineare usato soprattutto per campagne circoscritte di breve periodo.",
      C: "È un modello concentrato sulla distinzione tra output, out-take e outcome.",
      D: "È una matrice che valuta efficacia tecnica, economica e sociale.",
    },
  },
  q337: {
    matchText: "Nella piramide delle tecniche di valutazione (Macro Model), cosa accade salendo verso il vertice?",
    options: {
      A: "Le tecniche diventano più sofisticate e richiedono competenze specifiche per l'interpretazione.",
      B: "Le misure si concentrano progressivamente sugli output più immediati della campagna.",
      C: "La valutazione si riduce alla sola analisi della copertura media ottenuta.",
      D: "Gli indicatori diventano più semplici e meno collegati agli obiettivi strategici.",
    },
  },
  q339: {
    matchText: "Cosa afferma il principio degli obiettivi 'SMART'?",
    options: {
      A: "Che gli obiettivi devono essere specifici, misurabili, attuabili, rilevanti e definiti nel tempo.",
      B: "Che gli obiettivi devono essere sempre espressi come indicatori finanziari.",
      C: "Che gli obiettivi vanno definiti solo dopo la chiusura della campagna.",
      D: "Che gli obiettivi devono coincidere con le attività operative previste.",
    },
  },
  q340: {
    matchText: "Nell'ambito della sentiment analysis, cosa s'intende per 'Topic'?",
    text: "Nel Social Measurement Compass di Altimeter, a che cosa serve il framework?",
    options: {
      A: "A orientare la scelta delle metriche social in base alla direzione strategica da valutare.",
      B: "A certificare audience e diffusione dei mezzi usati nella pianificazione media.",
      C: "A calcolare il valore pubblicitario equivalente della copertura editoriale.",
      D: "A distinguere le tre fasi tecniche dei motori di ricerca: crawling, indexing e ranking.",
    },
  },
  q347: {
    matchText: "Nel Modello Glebb, qual è l'effetto di una 'Prima pagina dedicata' sul valore di partenza dell'articolo?",
    text: "A che cosa è associato il riferimento Glebb / Romoli Venturi negli appunti?",
    options: {
      A: "All'AVE corretto e alla valorizzazione qualitativa dell'impatto stampa.",
      B: "Alla misurazione della soddisfazione verso la comunicazione interna.",
      C: "Alla distinzione tra output, out-take e outcome nel modello Yardstick.",
      D: "Alla costruzione della Balanced Scorecard per la funzione comunicazione.",
    },
  },
  q356: {
    matchText: "Cosa caratterizza un obiettivo SMART nella Fase 2 del modello PRE?",
    options: {
      A: "Essere specifico, misurabile, raggiungibile, rilevante e temporizzato.",
      B: "Essere formulato in modo ampio per adattarsi a qualsiasi risultato ottenuto.",
      C: "Essere definito solo dopo la raccolta dei dati conclusivi della campagna.",
      D: "Essere espresso come elenco di attività operative da completare.",
    },
  },
  q357: {
    matchText: "Secondo l'acronimo SMART, cosa si intende con il requisito 'Achievable' per un obiettivo di comunicazione?",
    options: {
      A: "Che sia realistico e raggiungibile date le risorse e il contesto a disposizione.",
      B: "Che sia espresso in termini puramente economici per calcolare il ROI.",
      C: "Che sia collegato temporalmente a una data di scadenza precisa.",
      D: "Che sia rilevante per gli obiettivi strategici dell'organizzazione.",
    },
  },
  q364: {
    matchText: "Nel modello Yardistic, a quale livello appartiene la valutazione del 'Ricordo'?",
    text: "Nel modello Yardstick, la misurazione del 'ricordo' appartiene a quale livello?",
    options: {
      A: "Livello 2: out-take.",
      B: "Livello 1: output.",
      C: "Livello 3: outcome.",
      D: "Livello di impatto sulle performance di business.",
    },
  },
  q365: {
    matchText: "Nel contesto dei Barcelona Principles, il principio 2 afferma che la valutazione dovrebbe identificare:",
    options: {
      A: "Output, outcome e impatto potenziale della comunicazione.",
      B: "Soltanto il ritorno economico immediato attribuibile alla campagna.",
      C: "La sola quantità di contenuti pubblicati sui media proprietari.",
      D: "La spesa pubblicitaria equivalente alla copertura editoriale ottenuta.",
    },
  },
  q367: {
    matchText: "Quale delle seguenti affermazioni descrive correttamente la logica 'Through The Line' (TTL)?",
    text: "Nel Measurement Tree, che cosa rappresenta il tronco dell'albero?",
    options: {
      A: "Le strategie e le tattiche scelte per raggiungere gli obiettivi di comunicazione.",
      B: "Gli outcome finali prodotti sui pubblici prioritari della campagna.",
      C: "I pubblici del piano di media relations selezionati dalla funzione comunicazione.",
      D: "Il contesto competitivo in cui l'organizzazione svolge le proprie attività.",
    },
  },
  q371: {
    matchText: "Perché nel 'Measurement Tree' il processo di valutazione non può essere limitato solo alla fase ex post?",
    options: {
      A: "Perché deve comprendere anche la valutazione ex ante e quella in itinere.",
      B: "Perché riguarda solo la rendicontazione finale verso il management.",
      C: "Perché considera sufficienti le metriche di copertura media.",
      D: "Perché sostituisce la pianificazione con il monitoraggio degli output.",
    },
  },
  q372: {
    matchText: "Il 'PRE Model' suggerisce che la pianificazione e la valutazione debbano essere:",
    options: {
      A: "Processi paralleli che procedono insieme lungo tutto il piano.",
      B: "Fasi separate, con la valutazione concentrata soltanto alla chiusura.",
      C: "Attività indipendenti dagli obiettivi definiti nella fase iniziale.",
      D: "Procedure dedicate esclusivamente alla rendicontazione economica finale.",
    },
  },
  q373: {
    matchText: "Il 'Brioschi Model' propone di valutare ogni attività di comunicazione su tre dimensioni:",
    options: {
      A: "Efficacia tecnica, economica e sociale.",
      B: "Output, out-take e outcome.",
      C: "Preparazione, implementazione e impatto.",
      D: "Livello interno, esterno e istituzionale.",
    },
  },
  q375: {
    matchText: "Cos'è il 'Short Model' nella classificazione dei modelli di valutazione?",
    options: {
      A: "Un modello lineare e one-way focalizzato sul raggiungimento degli output media.",
      B: "Un modello circolare basato su feedback continui e correzioni in itinere.",
      C: "Un modello fondato su audit iniziale, pianificazione e valutazione parallela.",
      D: "Un modello che valuta efficacia tecnica, economica e sociale della comunicazione.",
    },
  },
  q380: {
    matchText: "Qual è il valore di partenza incrementato dal moltiplicatore 'Titolo' nel modello Glebb?",
    text: "Nel riferimento Glebb / Romoli Venturi, perché si parla di AVE corretto?",
    options: {
      A: "Perché il valore della copertura viene ponderato con elementi qualitativi dell'uscita.",
      B: "Perché l'AVE viene sostituito da una survey sul ricordo del messaggio.",
      C: "Perché il modello misura solo le relazioni interne tra dipendenti e superiori.",
      D: "Perché la valutazione si limita a contare il numero di comunicati diffusi.",
    },
  },
  q384: {
    matchText: "Perché gli obiettivi SMART sono considerati un requisito per una misurazione efficace?",
    options: {
      A: "Perché rendono possibile confrontare risultati e traguardi definiti in modo chiaro.",
      B: "Perché trasformano ogni obiettivo di comunicazione in un indicatore finanziario.",
      C: "Perché permettono di evitare la scelta di pubblici e stakeholder prioritari.",
      D: "Perché coincidono con l'elenco delle attività operative da realizzare.",
    },
  },
  q386: {
    matchText: "Nel 'MACRO Model', cosa rappresentano gli INPUT della comunicazione?",
    options: {
      A: "Le micro-decisioni professionali come formato, contenuti, immagini e scelte redazionali.",
      B: "Gli output prodotti dalla campagna, come articoli e materiali diffusi.",
      C: "Gli outcome osservati sui pubblici dopo l'esposizione al messaggio.",
      D: "Le variabili ponte che collegano relazione e performance organizzativa.",
    },
  },
  q387: {
    matchText: "Nella fase di 'Implementation' del PII Model, cosa viene monitorato principalmente?",
    options: {
      A: "Gli sforzi realizzati, gli strumenti attivati e la copertura raggiunta.",
      B: "L'adeguatezza dei messaggi valutata prima del lancio del programma.",
      C: "Gli effetti cognitivi e comportamentali osservati nel medio periodo.",
      D: "Il contributo finale della comunicazione agli obiettivi di business.",
    },
  },
  q388: {
    matchText: "Quale delle seguenti è una caratteristica distintiva del 'Yardstick Model' di valutazione?",
    options: {
      A: "Propone tre livelli progressivi di valutazione: output, out-take e outcome.",
      B: "Misura esclusivamente la dimensione economica e sociale della comunicazione.",
      C: "Valuta solo la preparazione dei messaggi prima della loro diffusione.",
      D: "Accompagna la pianificazione con audit, strategia e valutazione continua.",
    },
  },
  q389: {
    matchText: "Cosa introduce il 'MACRO Model of PR Evaluation' rispetto ai modelli più semplici?",
    options: {
      A: "La distinzione tra livello individuale e livello di programma, includendo la valutazione degli input.",
      B: "La metafora dell'albero per collegare radici, rami, foglie e fiori.",
      C: "La misurazione del solo ritorno economico prodotto dalle attività di comunicazione.",
      D: "La distinzione tra efficacia tecnica, economica e sociale della comunicazione.",
    },
  },
  q390: {
    matchText: "Nel 'Measurement Tree', cosa rappresentano le 'radici' e cosa i 'fiori'?",
    options: {
      A: "Le radici sono gli obiettivi di comunicazione; i fiori sono gli outcome.",
      B: "Le radici sono le strategie operative; i fiori sono i canali media attivati.",
      C: "Le radici sono i pubblici del piano; i fiori sono gli output prodotti.",
      D: "Le radici sono il contesto competitivo; i fiori sono i prodotti visibili all'esterno.",
    },
  },
  q391: {
    matchText: "Che cosa indica la dimensione 'Integrazione Organizzativa' nel modello CSQ?",
    text: "Che cosa misura il Communication Satisfaction Questionnaire (CSQ) di Downs e Hazen?",
    options: {
      A: "La soddisfazione verso la comunicazione interna attraverso otto dimensioni.",
      B: "La reputazione esterna dell'organizzazione attraverso indicatori finanziari.",
      C: "Il valore pubblicitario equivalente della copertura editoriale ottenuta.",
      D: "La sequenza output, out-take e outcome di una campagna media.",
    },
  },
  q393: {
    matchText: "Cosa si intende per 'Efficacia Tecnica' secondo la matrice di Brioschi?",
    options: {
      A: "Il grado di raggiungimento degli obiettivi specifici della comunicazione.",
      B: "Il contributo della comunicazione agli obiettivi economici dell'organizzazione.",
      C: "Il benessere sociale prodotto dalla comunicazione sugli interlocutori.",
      D: "La quantità di output media generati durante la fase di implementazione.",
    },
  },
  q394: {
    matchText: "Nel contesto degli obiettivi SMART, cosa indica la lettera 'A' (Achievable)?",
    options: {
      A: "Che l'obiettivo deve essere raggiungibile date le risorse e il contesto a disposizione.",
      B: "Che l'obiettivo deve essere definito in modo specifico per pubblici e risultati.",
      C: "Che l'obiettivo deve essere misurabile attraverso indicatori osservabili.",
      D: "Che l'obiettivo deve avere una scadenza temporale esplicita.",
    },
  },
  q395: {
    matchText: "Nel 'MACRO Model', perché è importante valutare la fase di 'Input'?",
    options: {
      A: "Per verificare l'adeguatezza delle decisioni prese su formati, contenuti e immagini.",
      B: "Per misurare gli effetti finali su opinioni, atteggiamenti e comportamenti.",
      C: "Per stimare il valore monetario equivalente della copertura media.",
      D: "Per collegare direttamente la relazione con i risultati economici finali.",
    },
  },
  q403: {
    matchText: "Nel modello CCPM, perché è importante mappare le 'Performance Expectations'?",
    options: {
      A: "Perché la valutazione è efficace solo se utile per chi deve prendere decisioni.",
      B: "Perché consente di usare lo stesso report sintetico per tutti i destinatari.",
      C: "Perché permette di sostituire gli obiettivi con gli indicatori disponibili.",
      D: "Perché riduce la valutazione alla rendicontazione finale degli output.",
    },
  },
  q404: {
    matchText: "Secondo il modello di Romenti, la valutazione è efficace solo se:",
    options: {
      A: "È utile per chi deve prendere decisioni.",
      B: "Raccoglie il maggior numero possibile di metriche disponibili.",
      C: "Misura soprattutto gli output prodotti dalla funzione comunicazione.",
      D: "È sintetizzata in un unico indice economico finale.",
    },
  },
  q406: {
    matchText: "Quale delle seguenti opzioni descrive correttamente il 'Modello Logico' nel CCPM?",
    options: {
      A: "Input, attività, output, outcome, variabili ponte e impatto sulle performance.",
      B: "Audit, obiettivi, strategia, valutazione ongoing e valutazione finale.",
      C: "Focus group, survey, analisi del contenuto ed esperimento causale.",
      D: "Reach, engagement, conversione, retention e advocacy.",
    },
  },
  q415: {
    matchText: "Secondo Romenti, qual è il presupposto fondamentale della 'Communication Balanced Scorecard' (BSC) di Vos e Shoemaker?",
    options: {
      A: "A ciascuna prospettiva aziendale può corrispondere un'attività specifica di comunicazione.",
      B: "Le quattro prospettive devono essere misurate con lo stesso KPI di output.",
      C: "La comunicazione istituzionale sostituisce tutte le altre aree comunicative.",
      D: "La Balanced Scorecard serve solo a calcolare il ritorno economico della campagna.",
    },
  },
  q423: {
    matchText: "Nel modello 'Value Link', qual è il primo passaggio fondamentale?",
    options: {
      A: "Raggiungere le persone e renderle consapevoli.",
      B: "Indirizzare i pubblici verso una relazione con l'organizzazione.",
      C: "Trattenere e motivare i pubblici nel tempo.",
      D: "Tradurre la relazione in contributo agli obiettivi di business.",
    },
  },
  q424: {
    matchText: "Secondo il modello delle 4 prospettive di Vos e Schoemaker (derivato dalla Balanced Scorecard), a quale area corrisponde la 'comunicazione istituzionale'?",
    text: "Nella Balanced Scorecard adattata da Vos e Schoemaker, a cosa corrisponde la prospettiva dei processi interni?",
    options: {
      A: "Alla comunicazione interna.",
      B: "Alla comunicazione istituzionale.",
      C: "Alla comunicazione di marketing.",
      D: "All'organizzazione della funzione comunicazione.",
    },
  },
  q427: {
    matchText: "Nel modello CCPM, perché è importante identificare i soggetti coinvolti prima della misurazione?",
    options: {
      A: "Perché ciascuno ha aspettative e bisogni informativi differenti che guidano l'uso dei risultati.",
      B: "Per applicare a tutti i destinatari lo stesso set di indicatori standard.",
      C: "Per scegliere i canali media prima di definire gli obiettivi di business.",
      D: "Per limitare la misurazione alle richieste informative della funzione comunicazione.",
    },
  },
  q429: {
    matchText: "Quale metodologia suggerisce il CCPM per identificare e analizzare le possibili cause degli effetti, superando il limite dei metodi sperimentali?",
    options: {
      A: "General Elimination Methodology (GEM).",
      B: "Most Significant Change (MSC).",
      C: "Success Case Method (SCM).",
      D: "Communication Balanced Scorecard.",
    },
  },
  q431: {
    matchText: "Nella Fase 2 del CCPM, cosa si intende per 'Livello Rendicontativo'?",
    options: {
      A: "Misure che dimostrano il contributo della comunicazione ai risultati complessivi di business.",
      B: "Misure usate per correggere attività e strumenti durante l'implementazione.",
      C: "Misure che valutano il capitale comunicativo e relazionale nel medio-lungo periodo.",
      D: "Misure che descrivono la produzione immediata di output e contenuti.",
    },
  },
  q432: {
    matchText: "Secondo il modello CCPM, perché è cruciale definire i soggetti interessati a ciascuna misura nel piano di misurazione?",
    options: {
      A: "Per comunicare i risultati in modo mirato a chi deve prendere decisioni.",
      B: "Per evitare che il piano di misurazione debba contenere KPI rendicontativi.",
      C: "Per sostituire la raccolta dati con una distribuzione più efficace del report.",
      D: "Per separare gli stakeholder dagli obiettivi strategici dell'organizzazione.",
    },
  },
  q434: {
    matchText: "Cosa indica il parametro 'Storia' (\\$S\\$) nel sistema di obiettivi VALUES?",
    text: "Cosa indica il parametro 'Storia' nel sistema di obiettivi VALUES?",
    options: {
      A: "La necessità di avere un termine di confronto, come andamento passato o benchmark.",
      B: "La ricostruzione narrativa della storia dell'organizzazione nel report finale.",
      C: "La sequenza cronologica delle attività svolte durante la campagna.",
      D: "La descrizione dei casi di successo da inserire nella presentazione.",
    },
  },
  q436: {
    matchText: "Nel sistema VALUES, la 'A' di 'Adeguati' si riferisce a:",
    options: {
      A: "Obiettivi realistici rispetto alle risorse e coerenti con il contesto specifico della valutazione.",
      B: "Obiettivi definiti dopo la raccolta dei dati per adattarsi ai risultati ottenuti.",
      C: "Obiettivi uguali per tutte le campagne, indipendentemente dal contesto.",
      D: "Obiettivi espressi solo come indicatori finanziari di breve periodo.",
    },
  },
  q440: {
    matchText: "Nella Communication BSC, l'obiettivo della prospettiva 'apprendimento e crescita' è:",
    options: {
      A: "Sviluppare organizzazione, competenze e capacità di innovazione della funzione comunicazione.",
      B: "Misurare la comunicazione di marketing rivolta ai clienti finali.",
      C: "Valutare la comunicazione istituzionale verso investitori e contesto economico.",
      D: "Controllare soprattutto l'efficienza dei processi interni già stabilizzati.",
    },
  },
  q441: {
    matchText: "Nella misurazione delle performance, cosa si intende per 'allineamento costante'?",
    options: {
      A: "Verificare che gli obiettivi di comunicazione siano coerenti con la strategia aziendale.",
      B: "Mantenere invariato lo stesso set di KPI in ogni campagna.",
      C: "Aggiornare i dati in tempo reale anche quando non servono alle decisioni.",
      D: "Confrontare gli output prodotti senza collegarli agli obiettivi strategici.",
    },
  },
  q442: {
    matchText: "Cosa si intende per 'Variabili Ponte' all'interno di un modello logico di valutazione?",
    options: {
      A: "Intangibili come fiducia, reputazione e relazione che collegano outcome e impatto.",
      B: "Indicatori di output che descrivono la quantità di contenuti prodotti.",
      C: "Risorse operative usate per trasformare input in attività di comunicazione.",
      D: "Risultati economici finali già osservati nelle aree di performance.",
    },
  },
  q445: {
    matchText: "Nella tassonomia di Romenti, cosa misurano le 'misure di adeguatezza'?",
    options: {
      A: "Se le attività sono progettate correttamente per raggiungere l'effetto desiderato.",
      B: "Il contributo finale della comunicazione ai risultati complessivi di business.",
      C: "La quantità di output prodotti durante l'implementazione del programma.",
      D: "Il cambiamento di opinioni e comportamenti osservato nei pubblici.",
    },
  },
  q447: {
    matchText: "Cosa caratterizza principalmente l'approccio Through The Line (TTL)?",
    options: {
      A: "L'integrazione di leve ATL e BTL in un'unica strategia omnicanale.",
      B: "La separazione netta tra comunicazione di massa e canali a risposta diretta.",
      C: "Il focus esclusivo sulla notorietà del brand attraverso media paid.",
      D: "La misurazione del solo ROI diretto generato nel punto vendita.",
    },
  },
  q449: {
    matchText: "Cosa indica l'indice di 'Advocacy' nel calcolo delle performance di un programma di influencer marketing?",
    options: {
      A: "Il rapporto tra partecipanti attivi e membri totali, insieme alla capacità di influenzare altri.",
      B: "La quota di copertura media ottenuta rispetto ai competitor diretti.",
      C: "Il costo sostenuto per ogni menzione prodotta dagli influencer.",
      D: "Il sentiment medio dei commenti raccolti durante la campagna.",
    },
  },
  q435: {
    matchText: "Cosa si intende per 'causalità plausibile' nel modello CCPM?",
    options: {
      A: "Riconoscere che i dati suggeriscono un legame credibile tra comunicazione ed effetti, anche senza certezza assoluta.",
      B: "Attribuire ogni risultato positivo alla comunicazione senza considerare fattori esterni.",
      C: "Evitare qualsiasi collegamento tra attività, outcome e impatto sulle performance.",
      D: "Usare solo esperimenti controllati per dimostrare effetti in contesti organizzativi reali.",
    },
  },
  q491: {
    matchText: "Qual è il limite principale dell'utilizzo dell'AVE (Advertising Value Equivalent) come metrica di valutazione delle PR?",
    options: {
      A: "Non misura il valore reale della comunicazione, né gli outcome prodotti sui pubblici.",
      B: "Misura solo il ricordo del messaggio dopo l'esposizione alla campagna.",
      C: "Può essere usato esclusivamente per stimare l'audience televisiva certificata.",
      D: "Richiede sempre dati di vendita individuali raccolti presso i clienti.",
    },
  },
  q494: {
    matchText: "Qual è il principale limite metodologico dell'AVE (Advertising Value Equivalent) segnalato nel corso?",
    options: {
      A: "Non considera variabili qualitative come tono, credibilità della fonte e centralità della citazione.",
      B: "Non può essere applicato ad alcun contenuto pubblicato sui media digitali.",
      C: "Richiede sempre una survey sul ricordo del messaggio presso il pubblico.",
      D: "Misura direttamente gli outcome relazionali prodotti dalla comunicazione.",
    },
  },
  q483: {
    matchText: "Perché un 'ascolto globale' senza selezione delle fonti è considerato rischioso e poco efficace?",
    options: {
      A: "Perché rileverebbe troppi messaggi non attinenti agli obiettivi e aumenterebbe inutilmente i costi.",
      B: "Perché ridurrebbe eccessivamente il numero di messaggi disponibili per l'analisi.",
      C: "Perché impedirebbe di applicare qualunque classificazione del sentiment.",
      D: "Perché trasformerebbe il listening in una misurazione certificata di audience.",
    },
  },
  q537: {
    matchText: "Nel contesto del capitale comunicativo, la dimensione della 'Comunicazione Interna' favorisce principalmente:",
    options: {
      A: "Il coordinamento tra persone e processi e la valorizzazione del capitale umano.",
      B: "La copertura editoriale positiva presso stakeholder esterni all'organizzazione.",
      C: "La valorizzazione finanziaria della visibilità ottenuta sui media.",
      D: "La classificazione di topic e hot topic nelle conversazioni social.",
    },
  },
  q541: {
    matchText: "Nel modello RepTrak Pulse, a cosa si riferiscono le 'Componenti Emotive'?",
    options: {
      A: "A stima, ammirazione, fiducia e sentimenti degli stakeholder verso l'organizzazione.",
      B: "A innovazione, qualità dei prodotti, governance e performance finanziaria.",
      C: "A output, out-take, outcome e impatto potenziale della comunicazione.",
      D: "A tiratura, diffusione, readership e total audience dei mezzi pianificati.",
    },
  },
  q542: {
    matchText: "Quali elementi costituiscono le 'Componenti Razionali' del modello RepTrak Pulse?",
    options: {
      A: "Innovazione, qualità di prodotti e servizi, luogo di lavoro, performance, leadership, cittadinanza e governance.",
      B: "Stima, ammirazione, fiducia e sentimenti degli stakeholder verso l'organizzazione.",
      C: "Output, out-take, outcome e impatto potenziale della comunicazione.",
      D: "Tiratura, diffusione, readership e total audience dei mezzi pianificati.",
    },
  },
  q501: {
    matchText: "Cosa si intende per 'Flussi simbolici' nel capitale comunicativo?",
    options: {
      A: "Ciò che rende possibile la circolazione di valori e significati condivisi.",
      B: "I flussi informativi operativi che collegano reparti e procedure interne.",
      C: "Il trasferimento tecnico dei dati tra sistemi informativi aziendali.",
      D: "La visibilità media generata dalle uscite stampa nel periodo.",
    },
  },
  q504: {
    matchText: "Nel modello CCPM, la fase di 'Assessment del contesto comunicativo' serve a:",
    options: {
      A: "Mappare stakeholder, aspettative e audit della cultura della misurazione.",
      B: "Misurare soltanto gli output conclusivi prodotti dalla funzione comunicazione.",
      C: "Calcolare il ROI economico finale prima di definire gli obiettivi.",
      D: "Certificare audience, tiratura e ascolti attraverso gli enti di settore.",
    },
  },
  q505: {
    matchText: "Quale tra questi è un esempio di 'Capitale Narrativo'?",
    options: {
      A: "L'insieme di storie, corporate storytelling e conversazioni sull'organizzazione.",
      B: "Le competenze tecniche e comunicative possedute dal personale interno.",
      C: "Le procedure, le infrastrutture e i sistemi informativi aziendali.",
      D: "Le relazioni commerciali e fiduciarie costruite con gli stakeholder.",
    },
  },
  q506: {
    matchText: "Cosa rappresentano le 'Variabili Ponte' nel modello logico del CCPM?",
    options: {
      A: "Intangibili come fiducia e reputazione che collegano outcome e impatto sul business.",
      B: "Le risorse economiche e professionali usate come input del programma.",
      C: "Gli output prodotti, come contenuti, eventi e uscite media.",
      D: "I risultati economici finali già osservati nelle aree di performance.",
    },
  },
  q507: {
    matchText: "Quale tra i seguenti è un principio chiave del modello CCPM?",
    options: {
      A: "Orientare la misurazione al contesto, agli stakeholder e alle decisioni organizzative.",
      B: "Usare il ROI economico come unica metrica valida per ogni attività.",
      C: "Limitare la valutazione alla quantità di output prodotti nel periodo.",
      D: "Applicare uno standard identico a tutte le organizzazioni e campagne.",
    },
  },
  q508: {
    matchText: "Nel contesto del capitale intellettuale, cosa comprende il 'Capitale Umano'?",
    options: {
      A: "Competenze, conoscenze, capacità comunicative e livelli di istruzione del personale.",
      B: "Procedure, sistemi informativi e infrastrutture organizzative interne.",
      C: "Relazioni con stakeholder, reputazione, immagine e fiducia.",
      D: "Storie, simboli e narrazioni generate intorno all'organizzazione.",
    },
  },
  q510: {
    matchText: "Secondo il materiale, perché la comunicazione è centrale nello sviluppo del capitale intellettuale?",
    options: {
      A: "Perché permette la circolazione delle conoscenze e la creazione di relazioni.",
      B: "Perché coincide con la sola visibilità ottenuta sui media tradizionali.",
      C: "Perché produce documenti formali separati dagli intangibili organizzativi.",
      D: "Perché sostituisce la misurazione della reputazione presso gli stakeholder.",
    },
  },
  q512: {
    matchText: "Nella tassonomia dei KPI del CCPM (Lezione 5), a cosa corrisponde il 'Livello Sommativo'?",
    options: {
      A: "Alla misurazione delle dimensioni consolidate del capitale comunicativo.",
      B: "Alla valutazione ex ante dell'adeguatezza di messaggi e strumenti.",
      C: "Al conteggio degli output prodotti durante l'implementazione.",
      D: "Alla dimostrazione dell'impatto economico finale sulle performance.",
    },
  },
  q518: {
    matchText: "Nelle 'Trappole d'esame', perché non si deve dire che la reputazione si misura direttamente con uno standard unico?",
    options: {
      A: "Perché è un giudizio multidimensionale che richiede diversi indicatori e prospettive.",
      B: "Perché coincide con il valore pubblicitario equivalente della copertura media.",
      C: "Perché può essere descritta solo attraverso dati certificati di audience.",
      D: "Perché riguarda esclusivamente gli output prodotti dall'ufficio stampa.",
    },
  },
  q519: {
    matchText: "Nel contesto del focus group, a cosa serve la fase di 'Warm up'?",
    text: "Secondo Grunig e Hon, cosa indica il commitment nella relazione organizzazione-stakeholder?",
    options: {
      A: "Il desiderio di mantenere nel tempo una relazione considerata importante.",
      B: "Il bilanciamento del potere decisionale tra organizzazione e stakeholder.",
      C: "Il giudizio su integrità, affidabilità e competenza dell'organizzazione.",
      D: "La valutazione dei benefici ricevuti rispetto alle aspettative iniziali.",
    },
  },
  q531: {
    matchText: "Nelle relazioni 'Comunitarie' tra organizzazione e stakeholder, qual è il principio guida?",
    options: {
      A: "Offrire benefici per interesse verso il benessere dell'altro senza ricompensa immediata.",
      B: "Mantenere la relazione solo quando è previsto uno scambio equivalente.",
      C: "Formalizzare la relazione attraverso un accordo contrattuale di breve periodo.",
      D: "Gestire la relazione secondo ruoli gerarchici interni all'organizzazione.",
    },
  },
  q533: {
    matchText: "Cosa si intende per 'Vetrina Prodotto' nel calcolo dei moltiplicatori Glebb?",
    text: "Nel Reputation Quotient, quale dimensione è considerata affettiva?",
    options: {
      A: "Attrattività emotiva.",
      B: "Prodotti e servizi.",
      C: "Performance finanziaria.",
      D: "Responsabilità sociale.",
    },
  },
  q534: {
    matchText: "Cosa indica l'indice delle 'idee più condivise o votate' in un programma di ascolto?",
    text: "Nel capitale comunicativo, quale dimensione riguarda la qualità delle relazioni con gli stakeholder?",
    options: {
      A: "Capitale relazionale.",
      B: "Capitale umano.",
      C: "Capitale narrativo.",
      D: "Capitale organizzativo.",
    },
  },
  q543: {
    matchText: "Secondo l'International Association of Business Communication (2003), la comunicazione è centrale nello sviluppo di:",
    options: {
      A: "Capitale umano, relazionale e organizzativo.",
      B: "Soli sistemi informativi e infrastrutture tecniche.",
      C: "Soli indicatori economici di breve periodo.",
      D: "Soli output media prodotti dalla funzione comunicazione.",
    },
  },
  q544: {
    matchText: "Cosa valuta il 'Reputation Quotient' (RQ) nell'ambito dell'analisi aziendale?",
    options: {
      A: "Un punteggio reputazionale basato su indicatori affettivi e cognitivi.",
      B: "Il valore pubblicitario equivalente della copertura editoriale ottenuta.",
      C: "La soddisfazione verso la comunicazione interna su otto dimensioni.",
      D: "La tiratura e la diffusione certificate dei mezzi pianificati.",
    },
  },
  q545: {
    matchText: "Secondo il materiale, perché i vantaggi competitivi basati sulla reputazione sono 'più durevoli'?",
    options: {
      A: "Perché derivano da percezioni consolidate nel tempo e difficili da imitare.",
      B: "Perché dipendono solo dall'intensità della copertura media del periodo.",
      C: "Perché nascono da promozioni tattiche facilmente replicabili dai competitor.",
      D: "Perché possono essere ottenuti senza investimenti comunicativi continuativi.",
    },
  },
  q546: {
    matchText: "Quale tra questi è un beneficio tangibile della reputazione nel mercato del lavoro?",
    options: {
      A: "Capacità di attirare i migliori talenti.",
      B: "Riduzione della necessità di comunicazione interna.",
      C: "Maggiore quantità di output media prodotti nel breve periodo.",
      D: "Sostituzione dei processi di selezione con la sola notorietà del brand.",
    },
  },
  q548: {
    matchText: "Cosa significa che la reputazione 'riassume le percezioni degli stakeholder'?",
    options: {
      A: "Rappresenta un giudizio su attributi, azioni passate e attese future dell'azienda.",
      B: "Indica una percezione istantanea limitata a un singolo touchpoint comunicativo.",
      C: "Riguarda soltanto il giudizio degli analisti finanziari e degli investitori.",
      D: "Coincide con il numero di menzioni ottenute sui media in un dato periodo.",
    },
  },
  q549: {
    matchText: "Nella misurazione dell'identità organizzativa, cosa si intende per 'Temperamento'?",
    options: {
      A: "L'intensità, la forza e la velocità con cui l'organizzazione agisce.",
      B: "Il clima comunicazionale percepito dai dipendenti interni.",
      C: "Il livello di fiducia attribuito dagli stakeholder esterni.",
      D: "L'insieme dei segni visivi che rendono riconoscibile l'organizzazione.",
    },
  },
  q550: {
    matchText: "Quale tra questi è un elemento del 'Capitale Organizzativo' (componente strutturale)?",
    options: {
      A: "Cultura organizzativa e valori.",
      B: "Competenze e qualifiche professionali dei dipendenti.",
      C: "Relazioni con stakeholder, reputazione e fiducia.",
      D: "Storie e narrazioni condivise sull'organizzazione.",
    },
  },
  q547: {
    matchText: "Nella visione degli economisti aziendali, cos'è la reputazione?",
    options: {
      A: "Una risorsa immateriale fondamentale nel processo di generazione del valore dell'impresa.",
      B: "Un costo di marketing separato dai processi di creazione del valore.",
      C: "Un indicatore di sola copertura media ottenuta nel periodo.",
      D: "Un attributo estetico collegato principalmente all'identità visiva.",
    },
  },
  q502: {
    matchText: "Quale di queste affermazioni descrive correttamente la relazione tra capitale intellettuale e comunicazione?",
    options: {
      A: "Il capitale intellettuale genera valore quando conoscenze, relazioni e risorse immateriali vengono comunicate e condivise.",
      B: "Il capitale intellettuale coincide soltanto con la dotazione tecnologica dell'organizzazione.",
      C: "Capitale intellettuale e comunicazione restano due dimensioni indipendenti.",
      D: "La comunicazione riguarda solo gli output media e non incide sugli intangibili.",
    },
  },
  socialEcosystems: {
    matchText: "Quale ruolo hanno oggi TikTok e Instagram secondo la definizione di 'ecosistemi complessi'?",
    options: {
      A: "Piattaforme che coprono tutto il funnel, dalla consapevolezza alla fedeltà.",
      B: "Canali orientati soprattutto a community verticali persistenti e spazi tematici chiusi.",
      C: "Piattaforme pensate principalmente per networking professionale e lead B2B.",
      D: "Motori di ricerca generalisti basati su query testuali e indicizzazione web.",
    },
  },
  csqChannelQuality: {
    matchText: "Cosa valuta la dimensione 'Qualità dei canali di comunicazione' nel CSQ?",
    options: {
      A: "Le modalità di funzionamento dei principali strumenti di comunicazione interna.",
      B: "La soddisfazione dei dipendenti rispetto al feedback ricevuto dai superiori.",
      C: "La qualità del clima comunicativo nelle relazioni orizzontali tra colleghi.",
      D: "L'adeguatezza delle informazioni ricevute sui cambiamenti organizzativi.",
    },
  },
  organizationalEffectiveness: {
    matchText: "Nella comunicazione, l'efficacia organizzativa complessiva dipende da:",
    options: {
      A: "La coerenza e il collegamento degli obiettivi di comunicazione con quelli dell'azienda.",
      B: "L'autonomia della funzione comunicazione rispetto agli obiettivi strategici aziendali.",
      C: "La quantità di output prodotti indipendentemente dagli outcome ottenuti sui pubblici.",
      D: "La separazione tra comunicazione interna e processi decisionali dell'organizzazione.",
    },
  },
  plausibleCausalityMayne: {
    matchText: "Secondo il principio della 'Causalità Plausibile' di Mayne, cosa deve fare un valutatore se non può usare un gruppo di controllo?",
    options: {
      A: "Analizzare ed eliminare logicamente altre possibili cause degli effetti osservati (General Elimination Methodology).",
      B: "Aumentare la numerosità del campione e trattarla come prova sufficiente del nesso causale.",
      C: "Limitarsi al confronto prima/dopo senza discutere altri fattori che possono aver inciso.",
      D: "Sostituire la valutazione causale con il giudizio qualitativo del responsabile del progetto.",
    },
  },
  focusGroupSize: {
    matchText: "Qual è il numero di partecipanti consigliato per un focus group efficace?",
    options: {
      A: "Tra 6 e 12 persone.",
      B: "Tra 3 e 4 persone, per evitare qualunque interazione laterale.",
      C: "Tra 20 e 25 persone, per avvicinarsi a un piccolo campione statistico.",
      D: "Oltre 30 persone, per aumentare la varietà delle opinioni raccolte.",
    },
  },
  surveyQuestionnairePhase: {
    matchText: "In una survey (indagine su campioni), qual è considerata la fase più delicata?",
    options: {
      A: "La creazione del questionario.",
      B: "La presentazione dei risultati al management.",
      C: "La scelta del software per l'elaborazione dei dati.",
      D: "La definizione del formato grafico del report conclusivo.",
    },
  },
  hamelPowerShift: {
    matchText: "Quale affermazione di Gary Hamel è riportata per descrivere il cambio di potere nella comunicazione?",
    options: {
      A: "I manager non sono più ai comandi della conversazione.",
      B: "Le conversazioni restano controllabili dalla marca se pianificate in anticipo.",
      C: "I clienti dialogano solo attraverso canali proprietari gestiti dall'organizzazione.",
      D: "Il successo comunicativo dipende soprattutto dalla pressione pubblicitaria acquistata.",
    },
  },
  socialAdvocacyMeaning: {
    matchText: "Cosa si intende per 'Advocacy' nel framework delle metriche social?",
    options: {
      A: "La capacità di attivare sostenitori o promotori spontanei del brand tra gli utenti.",
      B: "La capacità di aumentare la reach paid attraverso annunci mirati a pubblici simili.",
      C: "Il numero di interazioni generate dai contenuti proprietari nel breve periodo.",
      D: "La riduzione dei costi di customer care ottenuta attraverso i canali social.",
    },
  },
  businessValueAltimeter: {
    matchText: "Quale di questi è un indicatore di 'Business Value' nel framework Altimeter?",
    options: {
      A: "Riduzione del traffico al call center tradizionale grazie al supporto social.",
      B: "Aumento dei follower totali sulla pagina proprietaria nel periodo osservato.",
      C: "Frequenza di pubblicazione dei contenuti programmati nel piano editoriale.",
      D: "Sentiment medio delle conversazioni spontanee relative al brand.",
    },
  },
  shareOfAnswerGeo: {
    matchText: "Cosa indica il parametro 'Share of Answer' nel contesto della GEO?",
    options: {
      A: "La quota di contenuto di un brand utilizzata dal motore generativo per comporre la risposta finale all'utente.",
      B: "La quota di risultati organici occupata dal sito nella SERP tradizionale.",
      C: "La percentuale di impression acquistate sulle keyword a pagamento.",
      D: "Il rapporto tra risposte del customer care e richieste ricevute dagli utenti.",
    },
  },
  bowNeutralPoste: {
    matchText: "Nel metodo BoW per la Sentiment Analysis di Poste Italiane (caso studio), come viene classificato un articolo 'descrittivo o neutro'?",
    options: {
      A: "Positivo, se non contiene elementi critici o negativi.",
      B: "Negativo solo quando contiene valutazioni sfavorevoli esplicite.",
      C: "Neutro e separato dal conteggio dei contenuti positivi.",
      D: "Non classificato se riguarda servizi pubblici o comunicazioni istituzionali.",
    },
  },
  editorialTone: {
    matchText: "Cosa si intende per 'Tono editoriale' (o Sentiment) nel monitoraggio dei media?",
    options: {
      A: "La valutazione se l'esposizione è favorevole, neutra o sfavorevole all'organizzazione.",
      B: "La percentuale di articoli che riportano i messaggi chiave dell'organizzazione.",
      C: "La centralità del brand nel titolo, nel lead o nelle parti più visibili del contenuto.",
      D: "La stima della reach potenziale generata dalla testata che pubblica il contenuto.",
    },
  },
  sentimentDefinition: {
    matchText: "Nel monitoraggio dei media, cos'è la 'Sentiment Analysis'?",
    options: {
      A: "L'analisi qualitativa del tono (positivo, negativo, neutro) delle conversazioni e degli articoli.",
      B: "Il conteggio quantitativo delle uscite media e delle impression generate.",
      C: "La mappatura delle fonti in base ad autorevolezza, reach e rilevanza.",
      D: "L'identificazione della presenza dei messaggi chiave nel coverage ottenuto.",
    },
  },
  onlineNewsCounting: {
    matchText: "Qual è il limite metodologico segnalato riguardo al conteggio delle news online nel media monitoring?",
    options: {
      A: "Quando una news viene aggiornata più volte, conviene solitamente considerare solo la versione finale più stabile.",
      B: "Ogni aggiornamento della stessa news va sempre contato come uscita autonoma.",
      C: "La prima versione pubblicata deve sostituire sempre tutte le versioni successive.",
      D: "Le news online vanno escluse perché non hanno una periodicità cartacea certificata.",
    },
  },
  automaticSentimentRisk: {
    matchText: "Qual è il rischio principale dell'attribuzione automatica del sentiment tramite algoritmi?",
    options: {
      A: "L'attribuzione di un giudizio 'neutro' alla stragrande maggioranza dei casi.",
      B: "La maggiore precisione rispetto alla lettura manuale dei singoli contenuti.",
      C: "La classificazione sempre positiva dei contenuti puramente descrittivi.",
      D: "L'impossibilità tecnica di elaborare dataset ampi in tempi rapidi.",
    },
  },
  mixedSentimentAdvantage: {
    matchText: "Qual è il principale vantaggio del Sentiment 'Misto'?",
    options: {
      A: "Permette di correggere manualmente un campione significativo di dati automatici.",
      B: "Sostituisce completamente la supervisione umana con un dizionario automatico.",
      C: "Classifica ogni contenuto manualmente senza alcun supporto algoritmico.",
      D: "Limita l'analisi ai soli contenuti positivi per ridurre il margine di errore.",
    },
  },
  mediaMonitoringPurpose: {
    matchText: "Qual è lo scopo principale del 'Media Monitoring' come attività continuativa?",
    options: {
      A: "Raccogliere sistematicamente i dati nel tempo per osservare l'evoluzione della presenza mediatica e gestire eventuali crisi.",
      B: "Misurare una singola campagna solo a posteriori senza costruire serie storiche.",
      C: "Produrre una rassegna stampa priva di analisi, insight o confronto nel tempo.",
      D: "Sostituire l'analisi qualitativa con il solo conteggio delle uscite pubblicate.",
    },
  },
  auditelTts: {
    matchText: "Cosa indica l'indicatore 'Total Time Spent' (TTS) nel sistema Auditel?",
    options: {
      A: "La somma di tutti i secondi visualizzati da ogni individuo per un singolo canale.",
      B: "La durata media di ciascuno stream effettivamente avviato dagli utenti.",
      C: "Il volume totale di stream validi prodotti dai player digitali rilevati.",
      D: "L'ascolto medio per minuto rilevato sui dispositivi digitali censiti.",
    },
  },
  adsCertification: {
    matchText: "Che cosa certifica ADS (Accertamenti Diffusione Stampa)?",
    options: {
      A: "La tiratura e la diffusione di quotidiani e periodici, sia cartacei che digitali.",
      B: "L'audience internet di siti e app tramite panel e rilevazioni censuarie.",
      C: "Gli ascolti televisivi lineari e on demand prodotti dai diversi device.",
      D: "Gli ascolti radiofonici lineari e digitali utilizzati come currency audio.",
    },
  },
  adsThirdParty: {
    matchText: "Nel sistema ADS, cosa garantisce la 'Certificazione Terza'?",
    options: {
      A: "L'assoluta indipendenza del controllo, garantendo che i dati dichiarati dagli editori corrispondano alla realtà.",
      B: "La pubblicazione dei dati dichiarati dagli editori senza ulteriori verifiche esterne.",
      C: "La misurazione del gradimento qualitativo dei lettori verso le singole testate.",
      D: "La certificazione affidata direttamente alla concessionaria che vende gli spazi.",
    },
  },
  adsMeasuresSpecifically: {
    matchText: "Cosa misura nello specifico ADS (Accertamenti Diffusione Stampa)?",
    options: {
      A: "La tiratura e la diffusione di quotidiani e periodici, sia cartacei che digitali.",
      B: "La Total Digital Audience di siti e app editoriali tramite panel e SDK.",
      C: "L'ascolto televisivo lineare e on demand prodotto dal SuperPanel.",
      D: "La currency radiofonica basata su ascolto lineare e fruizione digitale.",
    },
  },
  auditelHybridResearch: {
    matchText: "Nel sistema Auditel, cosa si intende per ricerca 'ibrida'?",
    options: {
      A: "Un sistema che combina dati campionari (da panel di famiglie) e dati censuari (da dispositivi connessi).",
      B: "Una ricerca che somma ascolti televisivi e radiofonici in un unico dato audio-video.",
      C: "Un'indagine qualitativa sul gradimento degli spettatori integrata da interviste in profondità.",
      D: "Un sistema fondato solo su dati censuari digitali senza alcun panel rappresentativo.",
    },
  },
  audicomCurrency: {
    matchText: "Cosa si intende per 'Currency' digitale nel contesto di Audicom?",
    options: {
      A: "Il dato ufficiale di audience internet riconosciuto dal mercato per pianificare gli investimenti pubblicitari online.",
      B: "La tariffa media di acquisto di un clic pubblicitario sulle testate digitali rilevate.",
      C: "Un indicatore interno di gradimento degli utenti verso i contenuti editoriali online.",
      D: "Il valore pubblicitario equivalente delle uscite web ottenute dall'ufficio stampa.",
    },
  },
  csqMeaning: {
    matchText: "Cosa indaga il modello 'Communication Satisfaction Questionnaire' (CSQ) di Downs e Hazen del 1977?",
    options: {
      A: "Otto dimensioni della soddisfazione dei dipendenti nei confronti della comunicazione interna.",
      B: "Il grado di soddisfazione dei clienti dopo l'acquisto di un prodotto.",
      C: "La qualità percepita della reputazione esterna presso gli stakeholder finanziari.",
      D: "La sequenza output, out-take e outcome di una campagna media.",
    },
  },
  reavMeaning: {
    matchText: "Cosa rappresenta il 'Valore REAV' rispetto all'AVE tradizionale?",
    options: {
      A: "È un AVE corretto con coefficienti e moltiplicatori qualitativi.",
      B: "È un indice non monetario che affianca REAV e readership nel PQII.",
      C: "È un indicatore di ROI social calcolato su engagement e conversioni.",
      D: "È una stima della reach netta prodotta dagli enti certificatori di audience.",
    },
  },
  communicationRoiStrict: {
    matchText: "Nel calcolo del valore della comunicazione, cosa si intende per 'ROI della comunicazione' in senso stretto?",
    options: {
      A: "Il rapporto tra il guadagno finanziario generato dalla comunicazione e il costo sostenuto per realizzarla.",
      B: "Il grado di raggiungimento degli obiettivi prefissati senza monetizzare il ritorno.",
      C: "Il valore pubblicitario equivalente dello spazio editoriale ottenuto gratuitamente.",
      D: "La quota di pressione pubblicitaria ottenuta rispetto al totale del mercato.",
    },
  },
  avePremise: {
    matchText: "Qual è il presupposto per applicare la tecnica dell'AVE (Advertising Value Equivalent)?",
    options: {
      A: "Attribuire alla copertura editoriale il costo di uno spazio pubblicitario equivalente.",
      B: "Misurare gli outcome della campagna tramite una survey sul pubblico raggiunto.",
      C: "Correggere la copertura con indicatori di tono, centralità e messaggi chiave.",
      D: "Collegare direttamente la comunicazione alle vendite isolate del periodo.",
    },
  },
  aveBaseLimit: {
    matchText: "Qual è il limite principale del metodo di valutazione AVE (Advertising Value Equivalent)?",
    options: {
      A: "Confonde il costo di uno spazio pubblicitario con il valore reale della comunicazione editoriale.",
      B: "Misura direttamente gli outcome relazionali prodotti dalla copertura ottenuta.",
      C: "Certifica l'audience dei mezzi attraverso panel e rilevazioni censuarie.",
      D: "Stima la soddisfazione degli stakeholder verso la comunicazione interna.",
    },
  },
  pqiiMeasure: {
    matchText: "Cosa misura l'indice 'PQII' nel modello di valutazione della stampa di GRV?",
    options: {
      A: "La qualità e l'impatto della copertura media basandosi su REAV e readership, espresso come valore numerico non monetario.",
      B: "Il costo per ogni singola interazione ottenuta dai contenuti social collegati alla campagna.",
      C: "Il livello di ricordo del messaggio rilevato tramite una survey post-campagna.",
      D: "La quota di copertura ottenuta dall'organizzazione rispetto ai competitor diretti.",
    },
  },
  roiFormulaCommunication: {
    matchText: "Quale formula deve essere utilizzata per calcolare correttamente il ROI (Return On Investment) applicato a una specifica attività di comunicazione?",
    options: {
      A: "$ROI = \\frac{benefici - costi}{costi} \\times 100$",
      B: "$ROI = \\frac{costi - benefici}{benefici} \\times 100$",
      C: "$ROI = \\frac{ricavi}{costi} \\times 100$",
      D: "$PQII = \\frac{REAV \\times readership}{1.000.000}$",
    },
  },
  rooMeaning: {
    matchText: "Quale tra queste affermazioni descrive la metrica ROO (Return On Objectives)?",
    options: {
      A: "Il grado di raggiungimento degli obiettivi di comunicazione prefissati.",
      B: "Il calcolo del guadagno monetario netto per ogni euro investito.",
      C: "Il tempo medio di permanenza degli utenti sulla home page del sito web.",
      D: "Il valore pubblicitario equivalente della copertura editoriale ottenuta.",
    },
  },
  pqiiFormula: {
    matchText: "Qual è la formula corretta per calcolare il Press Quality Impact Index (PQII) espresso in unità GRV?",
    options: {
      A: "$\\frac{REAV \\times Readership}{1.000.000}$",
      B: "$REAV + Readership$",
      C: "$\\frac{Benefici - Costi}{Costi} \\times 100$",
      D: "$\\%Promotori - \\%Detrattori$",
    },
  },
  pqiiCalculation: {
    matchText: "Come viene calcolato l'indice PQII (Press Quality Impact Index) secondo il modello Glebb/Romoli Venturi?",
    options: {
      A: "Affiancando il valore REAV (AVE corretto) alla readership certificata del mezzo.",
      B: "Moltiplicando il solo EAV per coefficienti qualitativi senza considerare la readership.",
      C: "Sommando numero di uscite media e sentiment positivo del periodo.",
      D: "Dividendo il costo della campagna per il numero di articoli pubblicati.",
    },
  },
  returnOnIgnorance: {
    matchText: "Cosa afferma il principio di Hayzlett sul 'Return on Ignorance'?",
    options: {
      A: "Che ignorare i social media comporta un costo competitivo e reputazionale misurabile.",
      B: "Che il valore va misurato come grado di raggiungimento degli obiettivi non monetari.",
      C: "Che la copertura editoriale può essere trasformata in costo pubblicitario equivalente.",
      D: "Che il ritorno finanziario si calcola sempre come rapporto tra benefici e costi.",
    },
  },
  focusDemultiplier: {
    matchText: "Nel calcolo del REAV, cosa si intende per 'Demoltiplicatore focus dedicato'?",
    options: {
      A: "Un coefficiente (solitamente pari a 1) usato quando l'intero articolo parla esclusivamente dell'azienda/prodotto.",
      B: "Un coefficiente che riduce il valore quando la citazione è marginale o condivisa con altri soggetti.",
      C: "Il moltiplicatore applicato quando il brand compare nel titolo o nel sottotitolo.",
      D: "Il parametro di readership usato per ponderare il valore finale della copertura.",
    },
  },
  aveConceptTrap: {
    matchText: "Perché gli AVE (Advertising Value Equivalent) sono considerati una 'trappola' concettuale?",
    options: {
      A: "Perché confondono il costo di uno spazio pubblicitario con il valore relazionale ed editoriale di un contenuto spontaneo.",
      B: "Perché misurano direttamente outcome cognitivi, affettivi e comportamentali dei pubblici.",
      C: "Perché sostituiscono l'analisi qualitativa con un indice sintetico di reputazione.",
      D: "Perché richiedono sempre dati di vendita individuali raccolti presso i clienti.",
    },
  },
  narrativeCapitalDefinition: {
    matchText: "Cosa si intende per 'capitale narrativo' all'interno del capitale comunicativo?",
    options: {
      A: "La capacità dell'organizzazione di raccontarsi in modo coerente e di generare storie che creano senso per gli stakeholder.",
      B: "L'insieme di procedure, sistemi informativi e infrastrutture che sostengono l'organizzazione.",
      C: "Le competenze tecniche e comunicative possedute dal personale interno.",
      D: "La qualità delle relazioni fiduciarie costruite con clienti e stakeholder.",
    },
  },
  microEconomistsReputation: {
    matchText: "Quale componente dello studio della reputazione si occupa di vederla come un 'segnale informativo indiretto' della qualità?",
    options: {
      A: "I micro-economisti.",
      B: "Gli studiosi dell'identità organizzativa.",
      C: "Gli approcci psicologici alla percezione dei pubblici.",
      D: "I modelli di corporate character e personalità aziendale.",
    },
  },
  reptrakCitizenship: {
    matchText: "Cosa si intende per 'Cittadinanza Sociale' tra le componenti razionali del RepTrak?",
    options: {
      A: "L'impegno dell'azienda verso la società e l'ambiente.",
      B: "La solidità finanziaria e la redditività dell'organizzazione.",
      C: "La stima, l'ammirazione e la fiducia provate dagli stakeholder.",
      D: "La qualità percepita dei prodotti e dei servizi offerti.",
    },
  },
  symbolicFlows: {
    matchText: "Nel contesto del capitale intellettuale, cosa sono i 'Flussi Simbolici'?",
    options: {
      A: "La circolazione di valori e significati che rendono l'identità riconoscibile.",
      B: "I flussi informativi operativi che collegano reparti e procedure interne.",
      C: "Le transazioni economiche registrate tra organizzazione e stakeholder.",
      D: "I dati tecnici trasferiti tra sistemi informativi aziendali.",
    },
  },
  narrativeCapitalIntangibles: {
    matchText: "Cosa si intende per 'capitale narrativo' nell'ambito degli intangibili aziendali?",
    options: {
      A: "L'insieme delle storie, dei racconti e delle conversazioni che rendono visibili le risorse dell'azienda.",
      B: "Le procedure, le infrastrutture e i sistemi informativi che sostengono l'organizzazione.",
      C: "Le competenze professionali e comunicative del personale interno.",
      D: "La qualità delle relazioni commerciali e fiduciarie con gli stakeholder.",
    },
  },
  rqEmotiveComponents: {
    matchText: "Nella valutazione della reputazione tramite il Reputation Quotient (RQ), cosa rappresentano le componenti emotive?",
    options: {
      A: "La stima, l'ammirazione e la fiducia che gli stakeholder provano verso l'azienda.",
      B: "Performance finanziaria, governance e cittadinanza sociale dell'organizzazione.",
      C: "Prodotti, servizi, leadership e ambiente di lavoro percepiti dagli stakeholder.",
      D: "Notorietà, tiratura, diffusione e audience certificata dei mezzi.",
    },
  },
  reputationSample: {
    matchText: "Nello schema di misurazione della reputazione, chi costituisce solitamente il campione degli intervistati?",
    options: {
      A: "Manager, investitori, dipendenti e consumatori con un minimo livello di familiarità con l'organizzazione.",
      B: "Solo clienti recenti che hanno acquistato un prodotto nell'ultimo mese.",
      C: "Solo componenti del management interno coinvolti nella comunicazione.",
      D: "Pubblici senza alcuna familiarità con l'organizzazione valutata.",
    },
  },
  rqSevenPointScale: {
    matchText: "Cosa indica l'attribuzione di un punteggio da 1 a 7 nel calcolo del Reputation Quotient?",
    options: {
      A: "Il grado di accordo dell'intervistato tra le sue aspettative e i comportamenti dell'organizzazione.",
      B: "Il peso economico attribuito alle uscite media ottenute dall'organizzazione.",
      C: "La frequenza di esposizione del pubblico ai contenuti della campagna.",
      D: "Il punteggio tecnico di bilancio assegnato dagli analisti finanziari.",
    },
  },
  identityVsImage: {
    matchText: "Secondo le definizioni, cosa differenzia l'Identità Organizzativa dall'Immagine Aziendale?",
    options: {
      A: "L'identità è ciò che l'azienda realmente è e mostra, l'immagine è ciò che gli altri percepiscono.",
      B: "L'identità è il giudizio esterno consolidato, l'immagine riguarda solo i tratti interni.",
      C: "L'identità coincide con il logo, mentre l'immagine riguarda solo la reputazione finanziaria.",
      D: "Identità e immagine sono sinonimi utilizzati per indicare la stessa percezione.",
    },
  },
  relationalIntegrity: {
    matchText: "Cosa si intende per 'Integrità' nel contesto della qualità relazionale?",
    options: {
      A: "La percezione che l'organizzazione agisca secondo principi etici e corretti.",
      B: "La percezione che l'organizzazione possieda competenze tecniche adeguate.",
      C: "La soddisfazione dello stakeholder rispetto ai benefici ricevuti dalla relazione.",
      D: "Il desiderio di mantenere nel tempo una relazione considerata importante.",
    },
  },
  humanCapitalActivation: {
    matchText: "Cosa accade al Capitale Umano quando viene attivato dalla comunicazione efficace?",
    options: {
      A: "Viene valorizzato, poiché le competenze individuali vengono messe in rete e rese produttive per l'organizzazione.",
      B: "Viene trasformato in procedure e brevetti senza passare dalle relazioni interne.",
      C: "Viene ridotto a semplice costo del personale da contenere nel breve periodo.",
      D: "Viene sostituito dagli asset fisici usati nei processi produttivi dell'organizzazione.",
    },
  },
  causalControlGroupFunction: {
    matchText: "Nella ricerca causale, qual è la funzione principale del 'gruppo di controllo'?",
    options: {
      A: "Servire da termine di paragone non venendo sottoposto agli stimoli comunicativi.",
      B: "Verificare la chiarezza del questionario prima della somministrazione sul campo.",
      C: "Raccogliere dati secondari utili a formulare ipotesi interpretative.",
      D: "Osservare l'interazione tra partecipanti in una situazione qualitativa.",
    },
  },
  evaluativeResearchVsControl: {
    matchText: "Qual è una caratteristica distintiva della ricerca valutativa rispetto al semplice controllo?",
    options: {
      A: "Essere basata su metodi scientifici che garantiscono rigore e replicabilità.",
      B: "Limitarsi alla verifica amministrativa degli scostamenti rispetto al budget.",
      C: "Concentrarsi solo sull'analisi dei costi fissi e variabili del progetto.",
      D: "Produrre una rendicontazione finale senza interpretare le cause dei risultati.",
    },
  },
  controlGroupsRole: {
    matchText: "Qual è il ruolo dei 'Gruppi di Controllo' nelle ricerche causali?",
    options: {
      A: "Sono persone che non vengono sottoposte agli stimoli della comunicazione.",
      B: "Sono partecipanti usati per pre-testare la traccia di un focus group.",
      C: "Sono ricercatori incaricati di verificare la coerenza del questionario.",
      D: "Sono pubblici osservati solo nella fase esplorativa qualitativa.",
    },
  },
  interviewVsFocusGroup: {
    matchText: "Qual è il principale vantaggio di un'intervista rispetto a un focus group?",
    options: {
      A: "Evita la tendenza degli intervistati a conformare le proprie risposte a quelle del gruppo.",
      B: "Permette di osservare direttamente le dinamiche di interazione tra partecipanti.",
      C: "Garantisce risultati statisticamente rappresentativi della popolazione.",
      D: "Riduce la raccolta dati a una sequenza di risposte chiuse standardizzate.",
    },
  },
  focusOpeningQuestions: {
    matchText: "Qual è lo scopo delle domande di 'Apertura' in un Focus Group?",
    options: {
      A: "Permettere la creazione del gruppo e mettere a proprio agio i partecipanti.",
      B: "Entrare subito nel nucleo decisionale del problema di ricerca.",
      C: "Raccogliere dati quantitativi confrontabili tra tutti i partecipanti.",
      D: "Verificare sperimentalmente il nesso tra stimolo ed effetto osservato.",
    },
  },
  web1993TurningPoint: {
    matchText: "Quale evento storico del 1993 ha favorito la diffusione globale del Web?",
    options: {
      A: "Il rilascio della tecnologia del Web nel pubblico dominio da parte del CERN.",
      B: "La nascita dei primi social network basati su profili personali e community.",
      C: "La formalizzazione del concetto di Web 2.0 e contenuto generato dagli utenti.",
      D: "L'introduzione degli smartphone come dispositivo centrale della navigazione.",
    },
  },
  socialMedia2020sTrend: {
    matchText: "Quale trend caratterizza l'evoluzione dei social media negli anni 2020?",
    options: {
      A: "La trasformazione dei canali in ecosistemi digitali integrati.",
      B: "La riduzione dei social a semplici spazi di pubblicazione testuale.",
      C: "La separazione netta tra contenuti, community, commerce e customer care.",
      D: "Il ritorno a piattaforme prive di algoritmi di raccomandazione e creator economy.",
    },
  },
  socialCaringMeaning: {
    matchText: "Cosa si intende per 'Social Caring' in ambito aziendale?",
    options: {
      A: "L'attività di customer service svolta pubblicamente e rapidamente sui social.",
      B: "La pianificazione di contenuti promozionali per aumentare la reach organica.",
      C: "Il monitoraggio della brand reputation senza risposta diretta agli utenti.",
      D: "La gestione dei programmi di advocacy rivolti a sostenitori del brand.",
    },
  },
  web4Characteristic: {
    matchText: "Quale caratteristica distingue principalmente il Web 4.0 dalle fasi precedenti?",
    options: {
      A: "L'uso di agenti autonomi e sistemi predittivi capaci di anticipare i bisogni degli utenti.",
      B: "L'affermazione di contenuti generati dagli utenti e piattaforme partecipative.",
      C: "La pubblicazione di siti statici consultabili attraverso pagine ipertestuali.",
      D: "L'organizzazione semantica dei dati per renderli leggibili dalle macchine.",
    },
  },
  webEvolutionFormula: {
    matchText: "Quale formula sintetizza l'evoluzione del Web dal 1.0 al 4.0 secondo gli appunti?",
    options: {
      A: "Leggi -> Partecipa -> Capisce -> Agisce.",
      B: "Pubblica -> Condivide -> Classifica -> Certifica.",
      C: "Output -> Out-take -> Outcome -> Impatto.",
      D: "Crawling -> Indexing -> Ranking -> Risposta.",
    },
  },
  homonymsQueryProblem: {
    matchText: "Quale problema pongono i termini omonimi durante la definizione della tassonomia e delle query?",
    options: {
      A: "Possono generare ambiguità nel dataset, includendo messaggi non attinenti al brand.",
      B: "Riducono il volume delle menzioni perché escludono automaticamente i sinonimi.",
      C: "Impediscono di usare operatori logici per combinare parole chiave e filtri.",
      D: "Richiedono una verifica del contesto per distinguere significati diversi.",
    },
  },
  intangibleImitation: {
    matchText: "Secondo le lezioni, perché i beni intangibili sono spesso 'più difficili da imitare' rispetto ai beni fisici?",
    options: {
      A: "Perché sono radicati nella conoscenza, nelle relazioni e nella cultura specifica di quell'organizzazione.",
      B: "Perché derivano solo dalla quantità di copertura media ottenuta nel periodo.",
      C: "Perché coincidono con asset fisici protetti da proprietà e brevetti industriali.",
      D: "Perché possono essere trasferiti integralmente attraverso un singolo atto contabile.",
    },
  },
  peopleAnalysisRole: {
    matchText: "In un'analisi delle persone, perché è fondamentale distinguere il ruolo degli autori (es. amministratore vs utente occasionale)?",
    options: {
      A: "Per valutarne la rilevanza e l'impatto potenziale all'interno di quella specifica community.",
      B: "Per escludere automaticamente gli utenti occasionali dal volume totale delle conversazioni.",
      C: "Per attribuire lo stesso peso a ogni autore indipendentemente dalla posizione nella rete.",
      D: "Per trasformare l'analisi delle persone in un conteggio puramente quantitativo.",
    },
  },
  sharedSoleImportance: {
    matchText: "Perché è importante distinguere tra 'Shared' e 'Sole' mentions?",
    options: {
      A: "Per capire se l'azienda è la protagonista assoluta dell'articolo o se appare insieme ai competitor.",
      B: "Per distinguere la quota di copertura ottenuta da quella dei concorrenti nello stesso periodo.",
      C: "Per misurare il tono editoriale favorevole, neutro o sfavorevole della menzione.",
      D: "Per verificare se l'articolo contiene i messaggi chiave definiti dall'organizzazione.",
    },
  },
  economicPrIndicatorValue: {
    matchText: "Qual è il valore aggiunto di utilizzare un indicatore economico (come il valore dello spazio pubblicitario equivalente) per misurare le PR?",
    options: {
      A: "Aumentare la credibilità delle attività di comunicazione agli occhi del top management (spesso orientato ai numeri).",
      B: "Sostituire la valutazione qualitativa degli articoli con una prova di outcome comportamentale.",
      C: "Dimostrare automaticamente che la copertura editoriale produce vendite immediate.",
      D: "Misurare la soddisfazione degli stakeholder attraverso un indicatore di costo.",
    },
  },
  statePrMeasurementChallenge: {
    matchText: "Secondo il report 'State of PR Measurement', qual è la sfida attuale per i professionisti?",
    options: {
      A: "Collegare le metriche utilizzate ai risultati di business e all'impatto strategico.",
      B: "Abbandonare del tutto le metriche qualitative per usare soltanto dati certificati.",
      C: "Sostituire ogni report interpretativo con una rassegna stampa non commentata.",
      D: "Affidare la misurazione delle PR agli stessi enti che certificano tiratura e ascolti.",
    },
  },
  concessionarieJic: {
    matchText: "Nel contesto dei JIC, chi sono le 'Concessionarie'?",
    options: {
      A: "Soggetti che vendono gli spazi pubblicitari per conto degli editori.",
      B: "Centri media che pianificano gli investimenti per conto degli inserzionisti.",
      C: "Associazioni di editori che partecipano alla governance della misurazione.",
      D: "Aziende investitrici che acquistano spazi per comunicare al mercato.",
    },
  },
  measurementTreeRoots: {
    matchText: "Secondo il modello del 'Measurement Tree', cosa rappresentano metaforicamente le RADICI?",
    options: {
      A: "Gli obiettivi di comunicazione chiari e precisi.",
      B: "Il contesto competitivo e organizzativo in cui opera l'organizzazione.",
      C: "I pubblici prioritari cui sono rivolte le attività di comunicazione.",
      D: "Gli outcome generati dalla comunicazione sui pubblici di riferimento.",
    },
  },
  measurementTreeSap: {
    matchText: "Nel 'Measurement Tree', la metafora della 'LINFA' è utilizzata per indicare:",
    options: {
      A: "Ciò che è visibile internamente esclusivamente ai collaboratori e dipendenti.",
      B: "Gli obiettivi di comunicazione che sostengono l'intero processo valutativo.",
      C: "I prodotti e servizi visibili all'esterno dell'organizzazione.",
      D: "Gli outcome finali osservabili nei pubblici dopo il programma.",
    },
  },
  intangibleAssetsHardToImitate: {
    matchText: "Secondo i materiali, perché gli asset intangibili sono 'difficili da imitare'?",
    options: {
      A: "Perché sono radicati nella cultura, nelle relazioni e nel capitale umano specifico di quell'azienda.",
      B: "Perché sono iscritti a bilancio con un valore contabile certo e stabile.",
      C: "Perché dipendono esclusivamente da brevetti legali facilmente verificabili.",
      D: "Perché possono essere acquistati già pronti sul mercato da fornitori esterni.",
    },
  },
  symbolicComponentIntangibles: {
    matchText: "Cosa si intende per 'Componente Simbolica' della comunicazione nell'alveo degli intangibili?",
    options: {
      A: "La capacità della comunicazione di dare senso all'identità aziendale e costruire una reputazione solida.",
      B: "La quota di copertura media generata da comunicati stampa e articoli ottenuti.",
      C: "La componente finanziaria che collega comunicazione e vendite di breve periodo.",
      D: "La parte tecnica del sistema informativo usata per archiviare i dati interni.",
    },
  },
  auditelEntityQuestion: {
    matchText: "Quale ente in Italia si occupa di misurare gli ascolti della TV?",
    text: "Nel sistema italiano degli enti certificatori, quale funzione svolge Auditel?",
    options: {
      A: "Rileva l'audience televisiva integrando panel, meter e dati censuari per la Total Audience.",
      B: "Certifica tiratura e diffusione delle testate quotidiane e periodiche.",
      C: "Misura l'audience digitale di siti e app attraverso la ricerca integrata Audicom.",
      D: "Costruisce la currency dell'audio per radio lineare e fruizione on demand.",
    },
  },
  barcelonaPrincipleFour: {
    matchText: "Quale principio dei Barcelona Principles 3.0 afferma che la misurazione deve includere analisi sia qualitative che quantitative?",
    options: {
      A: "Principio 4.",
      B: "Principio 2.",
      C: "Principio 5.",
      D: "Principio 7.",
    },
  },
  cpmSummativeCapital: {
    matchText: "Nel modello CCPM, la 'valutazione complessiva del capitale' avviene a quale livello?",
    options: {
      A: "Livello Sommativo.",
      B: "Livello Formativo.",
      C: "Livello Rendicontativo.",
      D: "Livello di monitoraggio degli output.",
    },
  },
  rooRoeDifference: {
    matchText: "Quale tra questi è un indicatore alternativo al ROI che misura il raggiungimento delle aspettative dei pubblici?",
    text: "Quale distinzione tra ROO e ROE è corretta nel materiale sul ROI della comunicazione?",
    options: {
      A: "Il ROO valuta il raggiungimento degli obiettivi, il ROE il raggiungimento delle aspettative.",
      B: "Il ROO monetizza l'esposizione earned, il ROE calcola il valore pubblicitario equivalente.",
      C: "Il ROO misura solo le impression digitali, il ROE misura la tiratura certificata.",
      D: "Il ROO coincide con l'AVE corretto, il ROE coincide con il PQII espresso in GRV.",
    },
  },
  roemAveRelation: {
    matchText: "Quale di questi indicatori è considerato un 'sinonimo dell'AVE'?",
    text: "Perché il ROEM viene avvicinato all'AVE nelle dispense?",
    options: {
      A: "Perché valorizza l'esposizione earned attribuendole un equivalente economico.",
      B: "Perché misura il raggiungimento degli obiettivi non monetari della campagna.",
      C: "Perché stima le aspettative degli stakeholder prima dell'avvio della comunicazione.",
      D: "Perché valuta il ricordo del messaggio attraverso una survey post-campagna.",
    },
  },
  cosenzaCountingMetricsLimit: {
    matchText: "Qual è il limite principale delle 'Counting Metrics' secondo Vincenzo Cosenza?",
    options: {
      A: "Hanno valore solo se lette dinamicamente e collegate ad altre metriche e obiettivi.",
      B: "Misurano direttamente il contributo economico delle conversazioni social al fatturato.",
      C: "Sostituiscono le metriche di business quando l'obiettivo è aumentare la visibilità.",
      D: "Sono sufficienti da sole per valutare advocacy, loyalty e impatto relazionale.",
    },
  },
  communicationRoiImportance: {
    matchText: "Perché è importante misurare il ROI della comunicazione nonostante le difficoltà metodologiche?",
    options: {
      A: "Per aumentare la credibilità dei comunicatori agli occhi del top management, che ha spesso un background economico-finanziario.",
      B: "Perché il ROI è l'unico indicatore capace di misurare sentimenti, fiducia e qualità relazionale.",
      C: "Perché misura soltanto l'efficienza dei costi e non il raggiungimento degli obiettivi.",
      D: "Perché trasforma la copertura editoriale in valore monetario ignorando il contesto.",
    },
  },
  grvUnitMeaning: {
    matchText: "Cosa indica l'unità di misura 'GRV' nel modello PQII?",
    options: {
      A: "Un'unità indice di impatto qualitativo, non un valore economico in euro.",
      B: "Il valore pubblicitario equivalente calcolato applicando soltanto il listino media.",
      C: "Il rapporto tra benefici e costi di una specifica attività di comunicazione.",
      D: "La readership certificata usata come base per stimare la portata del mezzo.",
    },
  },
  interviewDepthAdvantage: {
    matchText: "Nelle indagini qualitative, l'intervista in profondità ha il vantaggio di:",
    options: {
      A: "Evitare la tendenza degli intervistati a conformarsi alle risposte del gruppo.",
      B: "Osservare direttamente le interazioni e le dinamiche collettive tra partecipanti.",
      C: "Produrre dati statisticamente generalizzabili a una popolazione ampia.",
      D: "Standardizzare completamente le risposte attraverso domande chiuse.",
    },
  },
  qualitativeGeneralizationLimit: {
    matchText: "Nelle ricerche qualitative, perché i risultati non sono considerati 'generalizzabili'?",
    options: {
      A: "Perché mirano a esplorare la soggettività e le esperienze uniche dei partecipanti.",
      B: "Perché privilegiano campioni numericamente ampi e statisticamente rappresentativi.",
      C: "Perché eliminano l'interpretazione del ricercatore a favore di soli indicatori numerici.",
      D: "Perché hanno come obiettivo principale la stima causale degli effetti di una campagna.",
    },
  },
  socialSourcesNoise: {
    matchText: "Quale elemento critico rende difficile la selezione delle fonti sui social network rispetto ai forum?",
    options: {
      A: "L'alto tasso di 'rumore' e il fluire dei messaggi in tempo reale.",
      B: "Il fatto che i forum producano sempre un volume di messaggi superiore ai social network.",
      C: "La completa assenza di metadati utili come autore, data e canale.",
      D: "La necessità di usare solo fonti già incluse nel monitoraggio dei media tradizionali.",
    },
  },
  listeningQuestionsRationalization: {
    matchText: "Cosa deve fare l'analista per 'razionalizzare' le domande dell'ascolto nella Fase 1?",
    options: {
      A: "Basarle strettamente sugli obiettivi di business identificati nel social media plan.",
      B: "Formularle partendo solo dagli indicatori già disponibili nella piattaforma nativa.",
      C: "Sostituirle con una lista generale di keyword prima di chiarire il bisogno informativo.",
      D: "Ridurre l'analisi alle domande che producono risposte numeriche immediate.",
    },
  },
  socialReachMetric: {
    matchText: "Quale di queste affermazioni descrive correttamente la 'Reach di un post' secondo la formula proposta nel materiale?",
    text: "Nel framework di Lovett, quale obiettivo viene misurato da metriche come reach e share of voice?",
    options: {
      A: "Incrementare la visibilità e la possibilità che il contenuto venga visto dai pubblici.",
      B: "Misurare la riduzione dei costi operativi del customer care attraverso i social.",
      C: "Valutare il livello di fedeltà e advocacy generato dagli utenti più coinvolti.",
      D: "Stimare il valore economico diretto della singola conversione attribuita al canale.",
    },
  },
  modernSnaOpinionLeaders: {
    matchText: "Nel contesto della Social Network Analysis (SNA) moderna, cosa è cambiato rispetto al passato nell'identificazione degli opinion leader?",
    options: {
      A: "L'influenza non è più concentrata solo sui blogger, ma distribuita su creator, media verticali e community.",
      B: "Gli opinion leader vengono individuati esclusivamente attraverso i link in entrata verso i blog.",
      C: "La dimensione della community è sempre sufficiente per misurare l'influenza di un autore.",
      D: "Le relazioni tra attori non sono più rilevanti perché contano solo le piattaforme usate.",
    },
  },
  seoIndexingMeaning: {
    matchText: "Cosa si intende per 'Indexing' (Indicizzazione) nel contesto della SEO?",
    options: {
      A: "L'organizzazione e l'archiviazione dei contenuti analizzati in un database interrogabile.",
      B: "L'acquisto di parole chiave a pagamento per apparire in cima ai risultati.",
      C: "La selezione finale dei risultati da ordinare in base alla pertinenza della query.",
      D: "La scansione iniziale delle pagine web seguendo collegamenti e sitemap.",
    },
  },
  sharedSoleMediaMonitoring: {
    matchText: "Cosa indica l'indicatore 'Shared vs Sole mentions' nel media monitoring?",
    options: {
      A: "La distinzione tra articoli in cui l'azienda è protagonista unica e articoli in cui compare insieme a competitor o altri soggetti.",
      B: "La quota di copertura ottenuta dall'organizzazione rispetto ai competitor nello stesso periodo.",
      C: "Il tono favorevole, neutro o sfavorevole attribuito alla citazione nel contenuto.",
      D: "La presenza dei messaggi chiave definiti dall'organizzazione all'interno dell'articolo.",
    },
  },
  jicStructuralFeature: {
    matchText: "Quale caratteristica definisce strutturalmente un Joint Industry Committee (JIC) nel mercato italiano della comunicazione?",
    options: {
      A: "La partecipazione paritetica di investitori, agenzie e centri media, ed editori.",
      B: "La presenza di un solo soggetto proprietario responsabile della misurazione.",
      C: "La separazione completa tra investitori, agenzie ed editori nella governance.",
      D: "La gestione esclusiva da parte degli editori per controllare i dati di vendita.",
    },
  },
};

const manualReviewOverrideByText = new Map(
  Object.values(manualReviewOverrides)
    .filter(override => override.matchText)
    .map(override => [normalizeKey(override.matchText), override])
);

for (const question of bank) {
  const override = manualReviewOverrideByText.get(normalizeKey(question.text));
  if (!override) continue;
  if (override.text) question.text = cleanText(override.text);
  if (override.options) {
    question.options = Object.fromEntries(
      Object.entries(override.options).map(([letter, option]) => [letter, cleanText(option)])
    );
  }
  question.answer = "A";
  question.tags = [...new Set(tagsFor(question).concat(question.tags.includes("stile_esame") ? ["stile_esame"] : []))].sort();
}

const report = validate(bank);
const specialQuizzes = SPECIAL_QUIZZES.map(quiz => ({
  ...quiz,
  label: cleanText(quiz.label),
  description: cleanText(quiz.description),
}));

const contents = `// Banco quiz esame per Metriche della Comunicazione.
// Generato da scripts/build-exam-bank.js usando le domande reali del compito come calibrazione di stile.
(() => {
  window.METRICHE_SPECIAL_QUIZZES = ${JSON.stringify(specialQuizzes, null, 2)};

  window.METRICHE_QUIZ_BANK = ${JSON.stringify(bank, null, 2)};
})();
`;

fs.writeFileSync(outPath, contents);
console.log(JSON.stringify({ count: bank.length, ...report }, null, 2));
