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
  ["Enti certificatori e audience", 45],
  ["Modelli di valutazione", 75],
  ["Performance measurement e CCPM", 55],
  ["ROI, AVE e indicatori economici", 45],
  ["Intangibili e reputazione", 55],
]);

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

const BANNED = /coordinate gps|bonifici bancari|spam|prezzo piu basso|ansia dei dipendenti|licenziamento|licenziare automaticamente|dati bancari|interessi bancari|costo della carta|effetti speciali|font usiamo|logo scegliamo|pausa pranzo|tutti i cittadini|segretezza assoluta|stato italiano|quiz a premi|sbloccare le domande|vietato per legge|illegali da utilizzare|tre parole chiave|email di spam|gps|denaro contante|pesati fisicamente|deprezzamento|umore del valutatore|magazzino|macchinetta|impianti audio|ispezione fiscale|evasioni|cancellare i messaggi|correttezza grammaticale|posizione geografica esatta|acquistare nuovi spazi|contratto annuale|eliminazione di tutti i competitor|incantesimo|oroscopo|lotteria|premio a sorte|bancari personali|giorno di vacanza|arredamento dell'ufficio|sotto il livello dell acqua|spot marini|posizionamento geografico degli uffici|zone rurali|titolo in borsa|quotate in borsa|indici di borsa|azioni in borsa|ogni 24 ore|400|immediatamente statica|segnale radiofonico|direttore creativo|contratto di fornitura|errori trovati nel codice|media tradizionali perche sono morti|mappe geografiche|server|password|caffe|addizioni matematiche|database excel|obbligo di legge|obbligatori per legge|obbligatorio|obbligatoria|legge impone|legge sulla privacy|proibite dalla legge|vietate dai protocolli|legge italiana|virus informatico|indirizzo ip|scaffale del negozio|cancellati e ricaricati|antenne televisive|bozze digitali|premi vinti|algoritmo matematico|orologi|cartine geografiche|dimostrazione matematica assoluta|100% delle vendite|velocita di connessione|connessione wi-fi|cancellazione automatica|post negativi dai motori|rumore bianco|non e piu necessario raccogliere dati|solo l intuizione|solo l'intuizione|mappa geografica|luoghi digitali|cancellazione degli articoli|posizione geografica|controllo fiscale|superiore diretto|giornalisti che hanno scritto male|excel pesanti|luce l'acqua e il gas|spese per la luce|telefono privati|numeri di telefono|bloccare gli utenti|wikipedia come unica fonte|forza fisica|rumore prodotto|confondere i dirigenti|qualsiasi altra analisi|risparmiare energia|spegnendo|produttivita oraria|produttivita richiesto|riduce il costo del lavoro|automatizzando le relazioni|sostituisce la necessita|software gratuiti|qualita sostituisce completamente|ultima pagina alla prima|non comunicare nulla|dare ordini ai propri superiori|azzerare completamente le tasse|acquistare velocemente|monopolio assoluto|settore merceologico|indovinare i risultati|parente stretto|ingegneria meccanica|persone provenienti da nazioni diverse|non deve contenere piu di due domande|tre lingue diverse|stampare i fogli|non esistono piu esperti|non richiedono alcun budget|partecipanti tendono sempre a mentire|poco serio|poco affidabile|capi sono pigri|incolpare qualcuno|lanciare un prodotto a caso|chiedere agli amici|copiare fedelmente|critic.*subordinati|utenti anonimi|profilo linkedin del ceo|sovvenzioni statali|diminuiscono automaticamente|chip nel cervello|robot|microfono durante un focus group|profitti tra i vari soci|criptovalute|guardare lo stesso numero di minuti|pubbliche in italia|spiare i propri collaboratori|fatturare piu ore|rapporto finale molto piu lungo|grammatica italiana|determinare le colpe|toccato fisicamente|grado di resistenza verticale|cronometro|forum generalisti sono vietati|forum generalisti non esiste|metadati da analizzare nella fase|regolamento disciplinare|non conoscono i metodi statistici|budget.*sempre insufficienti|puramente casuali|intervistatori dimenticano|contratto sindacale|ogni singola famiglia|software statistici aggiornati|notaio|minimo di vendite|consegnati al ceo|calcolati automaticamente dai bot|euro non e piu considerato|troppo difficile da calcolare per i comunicatori|troppo difficile da calcolare per il management|nomi e cognomi|nomi e i cognomi|risarcimenti danni|grafici a torta|brevetti tecnologici|calcolo automatico della media|traduzione simultanea|tutti i dipendenti devono|stessa eta e professione|non e mai permesso offrire|listini dei media|suggerite dall algoritmo|e gratuito mentre|elenco degli amici|recensioni positive lasciate dai clienti|siti web possono essere chiusi|smettere di pubblicare|gratuito per tutti|obbligo di usare il computer|fine del commercio elettronico|scrivere in modo ripetitivo|rileggere gli stessi commenti|parlare in pubblico senza leggere|basandosi solo sul numero di like|amministratore delegato|maggioranza del cda|lunghezza fisica degli articoli|software automatico che sostituisce|algoritmo automatico|colpevolizzazione|canali.*pirata|falsificati.*agenzie|falsificati sistematicamente|compiacere|smettere di monitorare|confondere gli analisti|colori usare nel logo|consulenza esterne|costa molto di piu|privacy ne vietano|troppo tempo per essere raccolte|temperatura media|fuori dall'orario di lavoro|incremento automatico|occultamento dei dati|pressione sanguigna|licenziare l'agenzia|spot.*odiato|dieci anni|multinazionali del tabacco|toglie lavoro ai giornalisti|troppo basso rispetto al mercato|valore emotivo di una pubblicita|materie prime|nuovi uffici|scrivere e-mail|ortografia|libri pubblicati dal fondatore|inventario dei vecchi archivi/i;

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
    .replace(/\b([Pp]erché) e\b/g, "$1 è")
    .replace(/\b([Nn]on) e\b/g, "$1 è")
    .replace(/\b(Quale tra i seguenti) e (?=un\b)/g, "$1 è ")
    .replace(/\b(Quale delle seguenti) e (?=una\b)/g, "$1 è ")
    .replace(/\b(Quale metrica) e (?=considerata\b)/g, "$1 è ")
    .replace(/\b(Quale di queste affermazioni sul ROI della comunicazione) e (?=corretta\b)/g, "$1 è ")
    .replace(/\b(L'indicatore ROEM \(Return on Earned Media\)) e (?=un sinonimo\b)/g, "$1 è ")
    .replace(/\b(del '[^']+') e (?=utile\b)/g, "$1 è ")
    .replace(/\b(non sempre) e (?=possibile\b)/g, "$1 è ")
    .replace(/\b(la comunicazione) e (?=centrale\b)/g, "$1 è ")
    .replace(/\bc'e\b/g, "c'è")
    .replace(/\bC'e\b/g, "C'è")
    .replace(/\be([:?!])/g, "è$1")
    .replace(/\bE([:?!])/g, "È$1")
    .replace(/(^|[.!?]\s+)E (?=(?:necessario|utile|corretto|sbagliato|possibile|importante|preferibile|opportuno|rilevante|centrale|misurabile)\b)/g, "$1È ");
}

function cleanText(value) {
  return restoreItalianAccents(String(value || "")
    .normalize("NFKC")
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
  const explicit = cleanSection(question.section);
  if (explicit !== "Altri argomenti dalle fonti") return explicit;
  const hay = normalizeKey(`${question.text} ${Object.values(question.options || {}).join(" ")}`);
  if (/\b(ads|audicom|audiweb|auditel|audiradio|ter|jic|currency|panel|census|sdk|meter|diffusione|tiratura|readership|total audience)\b/i.test(hay)) return "Enti certificatori e audience";
  if (/\b(roi|roo|ave|reav|pqii|cosenza|return on ignorance|silver metric|valore economico)\b/i.test(hay)) return "ROI, AVE e indicatori economici";
  if (/\b(ccpm|balanced scorecard|value link|values|kpi|kri|performance|communication value system|return on communication|lead|lag|variabili ponte)\b/i.test(hay)) return "Performance measurement e CCPM";
  if (/\b(yardstick|pii|macro model|measurement tree|pre model|barcelona|amec|integrated evaluation framework|smart|modello|framework|watson)\b/i.test(hay)) return "Modelli di valutazione";
  if (/\b(reputazione|capitale comunicativo|capitale narrativo|capitale relazionale|identita|immagine|grunig|hon|reptrak|reputation quotient|fortune|wmac|berens|van riel|stakeholder|fiducia|soddisfazione|integrita|skandia)\b/i.test(hay)) return "Intangibili e reputazione";
  if (/\b(social|web|seo|sea|sem|geo|ga4|quality score|zero click|motori di risposta|ai|intelligenza artificiale|analytics|pyramid|compass|owyang|altimeter|peso|zmot|lovett|customer care|crawling|serp|follower|metriche di interazione|tecnologia per la misurazione)\b/i.test(hay)) return "Digitale, social e motori di ricerca";
  if (/\b(listening|monitoring|sentiment|topic|hot topic|mappa semantica|share of voice|media relation|rassegna|lettore medio|ots|analisi semantica|tassonomia|query|influencer|competitor|valutazione dinamica|analisi delle persone|disambiguazione)\b/i.test(hay)) return "Monitoring, listening e sentiment";
  if (/\b(focus group|survey|questionario|cawi|cati|intervista|osservazione|ricerca|campione|campionamento|neuromarketing|eye tracker|eeg|gsr|heat map|pre test|proiettive|qualitativ|quantitativ|causal|controllo)\b/i.test(hay)) return "Ricerca in comunicazione";
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
  if (!o || BANNED.test(normalizeKey(o))) return false;
  if (normalizeKey(o) === normalizeKey(correct)) return false;
  const ow = wordCount(o);
  const cw = wordCount(correct);
  if (cw <= 2) return ow <= 8;
  if (cw <= 5) return ow >= 2 && ow <= 13;
  return ow >= Math.max(5, Math.floor(cw * 0.55)) && ow <= Math.ceil(cw * 1.7) + 3;
}

function tagsFor(question) {
  const hay = normalizeKey(`${question.section} ${question.text} ${Object.values(question.options).join(" ")}`);
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
  if (/yardstick|pii|macro|measurement tree|pre model|barcelona|amec|integrated evaluation|smart|balanced scorecard|ccpm|values|value link|communication value system|social measurement compass|roi pyramid|altimeter|owyang|lovett|peso|zmot|reputation quotient|reptrak|fortune|wmac|berens|grunig|hon|watson|skandia|modello|framework/.test(hay)) tags.add("modelli");
  if (/auditel|audicom|audiweb|audiradio|\bads\b|\bter\b|jic|currency|panel|census|sdk|meter|readership|total audience|diffusione|tiratura/.test(hay)) tags.add("enti_audience");
  if (/social|listening|sentiment|topic|hot topic|analytics|roi|roo|ave|reav|pqii|cosenza|owyang|altimeter|compass|customer care|brand health/.test(hay)) tags.add("social_roi");
  if (/focus group|survey|questionario|cawi|cati|intervista|osservazione|neuromarketing|eye tracker|eeg|gsr|heat map|campione|ricerca|pre test|proiettive/.test(hay)) tags.add("ricerca_metodi");
  if (/seo|sea|sem|geo|ga4|quality score|zero click|motori di risposta|web 1|web 2|web 3|web 4|ai|intelligenza artificiale|api|scraping|rss|crawling|serp/.test(hay)) tags.add("seo_geo_digitale");
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
  if (BANNED.test(normalizeKey(candidate.text)) || BANNED.test(normalizeKey(candidate.correct))) score += 500;
  return score;
}

function buildDistractorPools(candidates) {
  const pools = {};
  for (const section of SECTIONS) {
    pools[section] = {};
    for (const kind of ["short", "term", "name", "list", "definition"]) {
      pools[section][kind] = candidates
        .filter(candidate => candidate.section === section && candidate.kind === kind && !BANNED.test(normalizeKey(candidate.correct)))
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
  if (selected.length !== 500) {
    throw new Error(`Expected 500 questions, selected ${selected.length}`);
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
    if (Object.values(question.options).some(option => BANNED.test(normalizeKey(option)))) errors.push(`Banned option: ${question.id}`);
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
const allCandidates = [...examSeeds, ...studySeeds, ...notebookBank]
  .map(sourceToCandidate)
  .filter(candidate => candidate.text && candidate.correct)
  .filter(candidate => !BANNED.test(normalizeKey(candidate.text)))
  .filter(candidate => wordCount(candidate.text) <= 42);

const selected = selectQuestions(allCandidates);
const pools = buildDistractorPools(allCandidates);
const bank = selected.map((candidate, index) => toQuestion(index + 1, candidate, pools));

const manualReviewOverrides = {
  5: {
    options: {
      A: "Un cambiamento nelle conoscenze, negli atteggiamenti o nei comportamenti dei pubblici.",
      B: "Il numero di comunicati, eventi o contenuti prodotti dalla funzione comunicazione.",
      C: "Le risorse economiche e professionali impiegate per realizzare l'attivita.",
      D: "Il contributo finale della comunicazione alle performance complessive di business.",
    },
  },
  6: {
    options: {
      A: "Raccogliere cio che e facile misurare ma poco utile per decidere.",
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
      A: "Una survey somministrata direttamente a un campione definito per la ricerca.",
      B: "Una tabella statistica gia pubblicata da un ente esterno.",
      C: "Un report storico prodotto da una precedente campagna.",
      D: "Una rassegna di dati amministrativi gia disponibili in azienda.",
    },
  },
  88: {
    options: {
      A: "Il percorso di interazioni e touchpoint che accompagna il cliente dalla conoscenza al post-acquisto.",
      B: "Il solo momento in cui il cliente paga il prodotto nel punto vendita.",
      C: "La sequenza interna con cui l'azienda approva una campagna pubblicitaria.",
      D: "Il calendario editoriale dei contenuti pubblicati sui canali social proprietari.",
    },
  },
  90: {
    options: {
      A: "Possono essere obsolete o poco adattabili agli obiettivi specifici della ricerca.",
      B: "Garantiscono sempre maggiore accuratezza rispetto alle ricerche primarie.",
      C: "Permettono di evitare qualunque interpretazione da parte del ricercatore.",
      D: "Sono utilizzabili solo quando non esistono dati quantitativi disponibili.",
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
      A: "Il ricercatore partecipa al contesto senza dichiarare apertamente il proprio ruolo di osservatore.",
      B: "Il ricercatore osserva il gruppo dichiarando fin dall'inizio obiettivi e metodo.",
      C: "I partecipanti compilano un questionario anonimo senza incontrare il ricercatore.",
      D: "Il moderatore conduce una discussione collettiva con una traccia a imbuto.",
    },
  },
  102: {
    options: {
      A: "Trasformare dati e interpretazioni in indicazioni utili per scegliere o correggere le azioni.",
      B: "Produrre un archivio completo di dati grezzi senza raccomandazioni operative.",
      C: "Sostituire le decisioni manageriali con un unico indicatore automatico.",
      D: "Misurare solo la visibilita media ottenuta nel periodo analizzato.",
    },
  },
  104: {
    options: {
      A: "La costruzione del campione e del questionario, perche condiziona la qualita dei dati raccolti.",
      B: "La scelta del software di impaginazione usato per presentare il report finale.",
      C: "L'archiviazione dei questionari dopo la chiusura dell'analisi.",
      D: "La selezione degli esempi grafici da inserire nelle slide conclusive.",
    },
  },
  118: {
    options: {
      A: "Perche si articola sulla presenza in risposte sintetiche e contestualizzate anziche su link espliciti.",
      B: "Perche coincide con un miglior posizionamento organico nella SERP tradizionale.",
      C: "Perche misura soltanto il traffico diretto generato verso il sito aziendale.",
      D: "Perche dipende esclusivamente dal numero di pagine indicizzate dal motore.",
    },
  },
  136: {
    options: {
      A: "La preparazione delle persone a misurare e comprendere i social media.",
      B: "La scelta di metriche di engagement indipendenti dagli obiettivi aziendali.",
      C: "La separazione tra chi produce contenuti e chi interpreta i risultati.",
      D: "L'acquisto di dashboard senza un processo condiviso di lettura dei dati.",
    },
  },
  144: {
    options: {
      A: "Basarle strettamente sugli obiettivi di business identificati nel social media plan.",
      B: "Formularle a partire dai soli dati gia disponibili negli analytics nativi.",
      C: "Ridurre le domande a metriche standard uguali per ogni settore.",
      D: "Definirle dopo la raccolta, osservando quali conversazioni emergono.",
    },
  },
  145: {
    options: {
      A: "Per scovare i luoghi di discussione specifici e rilevanti nei singoli Paesi in cui si opera.",
      B: "Per sostituire l'analisi semantica con la semplice localizzazione geografica degli utenti.",
      C: "Per confrontare Paesi diversi usando sempre le stesse fonti e le stesse query.",
      D: "Per limitare l'ascolto alle property proprietarie nei mercati principali.",
    },
  },
  146: {
    options: {
      A: "Il social listening parte da domande di business e deve produrre insight e raccomandazioni.",
      B: "Il social listening coincide con il conteggio automatico di like, follower e impression.",
      C: "Il monitoraggio interpreta sempre le conversazioni, mentre il listening le archivia.",
      D: "Il social listening riguarda solo i contenuti pubblicati dall'organizzazione.",
    },
  },
  147: {
    options: {
      A: "La presenza di soggetti terzi indipendenti che sostengono o citano positivamente l'organizzazione.",
      B: "Il volume complessivo delle menzioni generate dai canali proprietari.",
      C: "La quota di copertura ottenuta rispetto ai competitor diretti.",
      D: "La centralita dell'organizzazione all'interno del singolo articolo.",
    },
  },
  156: {
    options: {
      A: "La trasformazione dei canali in ecosistemi digitali integrati.",
      B: "La concentrazione delle piattaforme su una sola funzione editoriale.",
      C: "La riduzione del ruolo dei contenuti video e delle community.",
      D: "Il ritorno a modelli di fruizione prevalentemente unidirezionali.",
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
      A: "L'attivita di customer service svolta pubblicamente e rapidamente sui social.",
      B: "Il monitoraggio passivo delle conversazioni senza risposta agli utenti.",
      C: "La pianificazione dei contenuti editoriali per aumentare la reach.",
      D: "La misurazione del sentiment aggregato in un report periodico.",
    },
  },
  162: {
    options: {
      A: "93,8%.",
      B: "68,7%.",
      C: "45,6%.",
      D: "82,4%.",
    },
  },
  163: {
    options: {
      A: "Il numero di visitatori unici esposti a un contenuto moltiplicato per l'engagement.",
      B: "Il volume assoluto delle menzioni raccolte senza ponderazione.",
      C: "La quota di conversazioni positive rispetto al totale analizzato.",
      D: "Il tempo medio di permanenza degli utenti su una pagina web.",
    },
  },
  165: {
    options: {
      A: "Piattaforme che coprono tutto il funnel, dalla consapevolezza alla fedelta.",
      B: "Canali orientati quasi esclusivamente alla pubblicazione di immagini statiche.",
      C: "Ambienti utili solo per la notorieta, ma non per relazione o conversione.",
      D: "Strumenti separati dal customer journey e dalla misurazione delle performance.",
    },
  },
  166: {
    options: {
      A: "La decisione del CERN di rendere pubblica e gratuita la tecnologia.",
      B: "La nascita delle prime piattaforme social basate su profili personali.",
      C: "L'introduzione dei motori di ricerca commerciali come unico accesso al web.",
      D: "La diffusione degli smartphone come principale dispositivo di navigazione.",
    },
  },
  167: {
    options: {
      A: "Perche l'analisi rischierebbe di essere guidata dai dati disponibili invece che dalle domande di business a cui rispondere.",
      B: "Perche ridurrebbe automaticamente il numero di messaggi raccolti dal tool.",
      C: "Perche impedirebbe di applicare qualsiasi classificazione del sentiment.",
      D: "Perche renderebbe impossibile il confronto tra canali proprietari e earned media.",
    },
  },
  169: {
    options: {
      A: "La variabile tempo e/o il confronto con la numerosita dei messaggi dei competitor.",
      B: "La sola ampiezza potenziale del pubblico raggiungibile dal canale.",
      C: "Il numero di contenuti prodotti dall'organizzazione nello stesso periodo.",
      D: "Il valore economico equivalente degli spazi media occupati.",
    },
  },
  172: {
    options: {
      A: "La valorizzazione monetaria della copertura media ottenuta gratuitamente.",
      B: "Il ritorno sugli obiettivi di relazione definiti con gli stakeholder.",
      C: "Il valore della quota di conversazione rispetto ai competitor.",
      D: "Il rapporto tra contenuti pubblicati e interazioni generate.",
    },
  },
  173: {
    options: {
      A: "Il confronto tra la copertura dell'organizzazione e quella dei concorrenti.",
      B: "Il tono medio della copertura ottenuta nel periodo analizzato.",
      C: "La percentuale di messaggi chiave presenti negli articoli pubblicati.",
      D: "La posizione dell'organizzazione all'interno del singolo contenuto.",
    },
  },
  175: {
    options: {
      A: "Perche i mezzi sono interconnessi (es. TV in streaming, quotidiani sui social).",
      B: "Perche i media tradizionali usano sempre gli stessi KPI del social listening.",
      C: "Perche la distinzione dipende solo dal dispositivo usato dall'utente.",
      D: "Perche la pianificazione media misura ormai solo canali digitali.",
    },
  },
  176: {
    options: {
      A: "Per analizzare la visibilita nei motori di risposta che usano l'IA.",
      B: "Per sostituire completamente il monitoraggio di motori di ricerca e social media.",
      C: "Per misurare soltanto il traffico diretto generato verso il sito aziendale.",
      D: "Per concentrare l'analisi solo sui contenuti pubblicati dai giornalisti.",
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
      A: "Possono generare ambiguita nel dataset, includendo messaggi non attinenti al brand.",
      B: "Riducono drasticamente il volume dei messaggi raccolti dal sistema.",
      C: "Impediscono l'uso di operatori logici come AND e OR nelle query.",
      D: "Rendono inutilizzabili i metadati temporali dei messaggi raccolti.",
    },
  },
  199: {
    options: {
      A: "Collegare le metriche utilizzate ai risultati di business e all'impatto strategico.",
      B: "Sostituire tutte le metriche qualitative con un unico indice monetario.",
      C: "Eliminare le metriche di output dai report di comunicazione.",
      D: "Usare soltanto gli analytics nativi delle piattaforme social.",
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
      A: "La diffusione delle edizioni digitali e dei supplementi opzionali.",
      B: "La readership effettiva stimata dei singoli articoli pubblicati.",
      C: "Il tempo medio trascorso dagli utenti sulle pagine della testata.",
      D: "La performance pubblicitaria degli annunci presenti nel quotidiano.",
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
      A: "Perche deve comprendere anche la valutazione ex ante e quella in itinere.",
      B: "Perche coincide con la sola misurazione degli output immediati.",
      C: "Perche considera irrilevante la definizione preventiva degli obiettivi.",
      D: "Perche misura solo gli outcome finali senza guardare al processo.",
    },
  },
  277: {
    options: {
      A: "È un processo dinamico e flessibile basato su un meccanismo di feedback continuo.",
      B: "È un modello lineare centrato quasi esclusivamente sulla copertura mediatica.",
      C: "È un modello a tre livelli progressivi: output, out-take e outcome.",
      D: "È un modello focalizzato sulle micro-decisioni della fase di input.",
    },
  },
  279: {
    options: {
      A: "Perche rappresentano sforzi e prodotti realizzati, ma non garantiscono alcun cambiamento effettivo nei pubblici.",
      B: "Perche misurano gli effetti cognitivi, affettivi e conativi della comunicazione.",
      C: "Perche coincidono con il contributo della comunicazione agli obiettivi di business.",
      D: "Perche indicano il cambiamento di comportamento osservato nei pubblici.",
    },
  },
  289: {
    options: {
      A: "Le tecniche diventano piu sofisticate e richiedono competenze specifiche per l'interpretazione.",
      B: "Le tecniche diventano piu semplici e richiedono meno tempo di analisi.",
      C: "La valutazione si limita progressivamente al conteggio degli output.",
      D: "Il costo della misurazione diminuisce perche si usano solo dati gia disponibili.",
    },
  },
  291: {
    options: {
      A: "Che gli obiettivi devono essere specifici, misurabili, attuabili, rilevanti e definiti nel tempo.",
      B: "Che gli obiettivi devono coincidere sempre con un risultato economico di breve periodo.",
      C: "Che ogni obiettivo deve essere misurato con lo stesso indicatore standard.",
      D: "Che la misurazione deve iniziare solo al termine della campagna.",
    },
  },
  292: {
    options: {
      A: "Il macro-tema o l'argomento specifico a cui e associato un certo sentiment.",
      B: "La polarita positiva, negativa o neutra attribuita a un contenuto.",
      C: "La fonte in cui viene pubblicato il messaggio analizzato.",
      D: "Il profilo dell'autore che genera piu engagement nel periodo.",
    },
  },
  299: {
    options: {
      A: "Incremento del 200%.",
      B: "Incremento del 100%.",
      C: "Incremento del 50%.",
      D: "Incremento del 120%.",
    },
  },
  308: {
    options: {
      A: "Essere specifico, misurabile, raggiungibile, rilevante e temporizzato.",
      B: "Essere definito in modo ampio per adattarsi a ogni evoluzione della campagna.",
      C: "Essere formulato solo dopo la raccolta dei risultati finali.",
      D: "Essere espresso come elenco di attivita operative da svolgere.",
    },
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
      A: "Outputs, outcomes e l'impatto potenziale.",
      B: "Solo il ritorno economico immediato (ROI).",
      C: "Soltanto il volume di copertura media ottenuta.",
      D: "Esclusivamente il numero di attivita realizzate dalla funzione.",
    },
  },
  318: {
    options: {
      A: "Principio 4.",
      B: "Principio 1.",
      C: "Principio 5.",
      D: "Principio 7.",
    },
  },
  319: {
    options: {
      A: "È una strategia che integra ATL e BTL per accompagnare l'utente lungo l'intero funnel, dalla notorieta alla conversione.",
      B: "È una logica basata solo su media di massa e indicatori di copertura.",
      C: "È un approccio focalizzato solo su promozioni dirette e conversione immediata.",
      D: "È una misurazione separata dei canali senza integrazione tra awareness e azione.",
    },
  },
  320: {
    options: {
      A: "Perche costringono a definire traguardi specifici, misurabili e temporalmente definiti, rendendo possibile il confronto con i risultati.",
      B: "Perche sostituiscono la necessita di scegliere KPI coerenti con gli obiettivi.",
      C: "Perche garantiscono automaticamente il raggiungimento degli outcome attesi.",
      D: "Perche permettono di valutare la comunicazione senza una baseline iniziale.",
    },
  },
  325: {
    options: {
      A: "Efficacia tecnica, economica e sociale.",
      B: "Output, out-take e outcome.",
      C: "Cognitiva, affettiva e conativa.",
      D: "Interna, esterna e istituzionale.",
    },
  },
  327: {
    options: {
      A: "Un modello lineare e one-way focalizzato sul raggiungimento degli output media.",
      B: "Un modello circolare fondato sul feedback continuo degli stakeholder.",
      C: "Un modello a tre livelli progressivi: output, out-take e outcome.",
      D: "Un modello che integra valutazione ongoing e valutazione finale.",
    },
  },
  331: {
    options: {
      A: "50%.",
      B: "10%.",
      C: "200%.",
      D: "5%.",
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
      A: "Raggiungere le persone e renderle consapevoli.",
      B: "Trasformare immediatamente la relazione in risultati economici.",
      C: "Calcolare il ROI totale dell'azienda prima della pianificazione.",
      D: "Raccogliere dati di output senza collegarli agli obiettivi di relazione.",
    },
  },
  378: {
    options: {
      A: "Perche ciascuno ha aspettative e bisogni informativi differenti che guidano l'utilizzo dei risultati.",
      B: "Per produrre un unico report standardizzato identico per tutti.",
      C: "Per separare la valutazione dagli obiettivi decisionali dei destinatari.",
      D: "Per limitare la misurazione alle sole esigenze della funzione comunicazione.",
    },
  },
  380: {
    options: {
      A: "General Elimination Methodology (GEM).",
      B: "Analisi SWOT qualitativa.",
      C: "Focus group esplorativo.",
      D: "Balanced Scorecard applicata.",
    },
  },
  382: {
    options: {
      A: "Le misure che consentono di dimostrare il contributo della comunicazione ai risultati complessivi di business.",
      B: "La fase in cui si contano gli output prodotti dalle singole attivita.",
      C: "Il livello che serve a correggere strumenti e messaggi durante l'implementazione.",
      D: "La valutazione ex ante dell'adeguatezza dei contenuti prima del lancio.",
    },
  },
  383: {
    options: {
      A: "Per assicurarsi che i risultati siano comunicati in modo mirato a chi deve prendere decisioni.",
      B: "Per produrre lo stesso livello di dettaglio informativo per tutti gli stakeholder.",
      C: "Per separare la misurazione dalle aspettative dei soggetti coinvolti.",
      D: "Per limitare l'analisi ai soli indicatori disponibili nelle dashboard.",
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
      A: "Riconoscere che, pur non essendoci certezza assoluta, i dati suggeriscono un legame credibile tra comunicazione ed effetti.",
      B: "Assumere che ogni risultato positivo derivi direttamente dalla comunicazione.",
      C: "Rinunciare a collegare attivita, output e outcome per evitare errori di attribuzione.",
      D: "Usare solo esperimenti di laboratorio per isolare ogni variabile esterna.",
    },
  },
  389: {
    options: {
      A: "Perche le decisioni e le azioni intraprese rialimentano l'analisi del contesto per le valutazioni successive.",
      B: "Perche la stessa misurazione va ripetuta identica senza adattamenti nel tempo.",
      C: "Perche il modello si chiude con la rendicontazione finale al management.",
      D: "Perche ogni ciclo elimina la necessita di ridefinire obiettivi e stakeholder.",
    },
  },
  387: {
    options: {
      A: "Obiettivi realistici rispetto alle risorse e coerenti con il contesto specifico della valutazione.",
      B: "Obiettivi accettati dal mercato perche basati su metriche certificate.",
      C: "Obiettivi analitici perche scomposti in sotto-indicatori di canale.",
      D: "Obiettivi approvati perche gia utilizzati in campagne precedenti.",
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
      A: "Sviluppare una coerenza tra tutte le attivita e promuovere l'innovazione nella comunicazione.",
      B: "Massimizzare la pressione pubblicitaria sui canali a pagamento.",
      C: "Misurare la quota di mercato ottenuta con le campagne di prodotto.",
      D: "Garantire la puntualita dei processi amministrativi interni.",
    },
  },
  393: {
    options: {
      A: "Verificare che gli obiettivi di comunicazione siano sempre coerenti con la strategia aziendale.",
      B: "Uniformare la lunghezza dei comunicati stampa prodotti dalla funzione.",
      C: "Rendere identici i KPI usati da tutte le unita organizzative.",
      D: "Aggiornare con frequenza fissa i contenuti pubblicati sul sito aziendale.",
    },
  },
  400: {
    options: {
      A: "Business Objectives (es. miglioramento delle performance finanziarie).",
      B: "Social Media Metrics (es. numero di retweet).",
      C: "Indicatori di engagement raccolti sulle piattaforme social.",
      D: "Dati operativi sul volume dei contenuti pubblicati.",
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
      A: "Perche rileverebbe troppi messaggi non attinenti agli obiettivi e aumenterebbe inutilmente i costi.",
      B: "Perche ridurrebbe la possibilita di confrontare fonti diverse nello stesso periodo.",
      C: "Perche impedirebbe di distinguere tra canali proprietari, earned e paid.",
      D: "Perche renderebbe impossibile qualunque classificazione automatica del sentiment.",
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
      A: "Perche applica moltiplicatori qualitativi legati alla posizione, al titolo e alle immagini.",
      B: "Perche usa solo il costo dello spazio pubblicitario senza correzioni qualitative.",
      C: "Perche misura direttamente il fatturato generato dalla copertura editoriale.",
      D: "Perche somma al valore media i costi di produzione dell'agenzia di PR.",
    },
  },
  416: {
    options: {
      A: "Un coefficiente che considera quanto l'articolo e centrato sull'azienda o sul prodotto analizzato.",
      B: "Un fattore che aumenta il valore quando il brand e citato solo marginalmente.",
      C: "Il confronto tra la readership certificata e la quota di mercato dell'azienda.",
      D: "Un indicatore di sentiment applicato soltanto agli articoli negativi.",
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
      A: "È un AVE corretto con coefficienti e moltiplicatori qualitativi.",
      B: "È un indicatore di ritorno sugli obiettivi non monetari.",
      C: "È una misura di reach certificata dagli enti di audience.",
      D: "È un indice di soddisfazione espresso dagli stakeholder.",
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
      A: "Il rapporto tra il guadagno finanziario generato dalla comunicazione e il costo sostenuto per realizzarla.",
      B: "Il rapporto tra reach ottenuta e costo per mille contatti lordi della campagna.",
      C: "Il livello di raggiungimento degli obiettivi comunicativi non monetari.",
      D: "L'equivalente in denaro dello spazio pubblicitario ottenuto gratuitamente.",
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
      A: "Perche confondono il costo di uno spazio pubblicitario con il valore relazionale ed editoriale di un contenuto spontaneo.",
      B: "Perche misurano direttamente outcome e impatto, ignorando gli output intermedi.",
      C: "Perche certificano automaticamente la qualita della relazione con gli stakeholder.",
      D: "Perche sono applicabili solo alle campagne paid e non alla copertura editoriale.",
    },
  },
  444: {
    options: {
      A: "Per aumentare la credibilita dei comunicatori agli occhi del top management, spesso abituato a indicatori economico-finanziari.",
      B: "Perche il ROI misura direttamente fiducia, reputazione e soddisfazione degli stakeholder.",
      C: "Perche permette sempre di isolare perfettamente la comunicazione dalle altre leve aziendali.",
      D: "Perche rende secondaria la definizione di obiettivi e KPI prima della campagna.",
    },
  },
  445: {
    options: {
      A: "Non considera variabili qualitative come tono, credibilita della fonte o centralita della citazione.",
      B: "Non puo essere applicato a stampa, radio, televisione o canali online.",
      C: "Richiede sempre dati di vendita certificati dal reparto commerciale.",
      D: "Misura il raggiungimento degli obiettivi strategici meglio del ROO.",
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
      B: "La possibilita di ottenere automaticamente dati rappresentativi dell'intera popolazione.",
      C: "L'assenza di interazione tra partecipanti durante la discussione.",
      D: "La capacita di eliminare completamente il ruolo del moderatore.",
    },
  },
  131: {
    text: "Cosa manca solitamente ai sistemi di Social Media Analytics nativi delle piattaforme?",
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
  },
  267: {
    text: "Nel processo ADS, qual e il tempo medio che porta alla certificazione definitiva dei dati?",
  },
  270: {
    text: "Il sistema ADS e stato costituito nel:",
  },
  300: {
    text: "Quale metrica e considerata troppo ampia e spesso misurata tramite il ROI?",
  },
  404: {
    text: "Quale di queste affermazioni sul ROI della comunicazione e corretta?",
  },
  412: {
    text: "Che cos'e l'AVE (Advertising Value Equivalency)?",
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
      A: "La presenza e il peso delle citazioni attribuite a portavoce o rappresentanti ufficiali.",
      B: "La presenza dei messaggi chiave definiti dall'organizzazione nel contenuto.",
      C: "La centralita del soggetto citato all'interno dell'articolo analizzato.",
      D: "La valutazione del tono favorevole, neutro o sfavorevole della copertura.",
    },
  },
  94: {
    options: {
      A: "Registrare reazioni non verbali e dinamiche di gruppo, supportando il moderatore senza guidare la discussione.",
      B: "Sostituire il moderatore nella conduzione delle domande piu delicate.",
      C: "Valutare economicamente il contributo di ogni partecipante alla ricerca.",
      D: "Trasformare in tempo reale tutte le risposte in un questionario quantitativo.",
    },
  },
  95: {
    options: {
      A: "Funziona da stimolo per il dialogo e fa emergere idee che potrebbero non uscire in un'intervista singola.",
      B: "Elimina ogni influenza reciproca tra partecipanti durante la discussione.",
      C: "Garantisce risultati statisticamente generalizzabili alla popolazione.",
      D: "Permette di dimostrare il nesso causale tra campagna e acquisto.",
    },
  },
  86: {
    options: {
      A: "Sono poco costose ma soffrono di obsolescenza e scarsa adattabilita agli obiettivi specifici.",
      B: "Sono sempre aggiornate e perfettamente coerenti con la domanda di ricerca.",
      C: "Eliminano la necessita di interpretare i dati nel contesto dell'organizzazione.",
      D: "Garantiscono lo stesso livello di profondita delle interviste qualitative primarie.",
    },
  },
  97: {
    options: {
      A: "Su numerosi fattori di rilevanza, autorevolezza e pertinenza rispetto alla query dell'utente.",
      B: "Sulla sola frequenza della parola chiave all'interno della pagina.",
      C: "Sul volume di traffico paid acquistato dall'organizzazione.",
      D: "Sull'ordine cronologico con cui le pagine sono state scoperte dal crawler.",
    },
  },
  103: {
    options: {
      A: "Per evitare che la ricerca sia guidata casualmente dai messaggi trovati, perdendo di vista le esigenze dell'azienda.",
      B: "Per scegliere prima il tool piu completo, indipendentemente dagli obiettivi conoscitivi.",
      C: "Per usare lo stesso set di keyword in ogni mercato senza adattamenti locali.",
      D: "Per sostituire gli obiettivi di business con il volume complessivo dei messaggi raccolti.",
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
      A: "Le informazioni sono dati lavorati e inseriti in un contesto specifico.",
      B: "I dati sono gia interpretati, mentre le informazioni sono unita grezze non contestualizzate.",
      C: "Le informazioni coincidono con raccomandazioni operative gia pronte per l'azione.",
      D: "Non c'e alcuna differenza, sono sinonimi nel processo di analisi.",
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
      A: "Per capire quante richieste o domande degli utenti restano senza risposta.",
      B: "Per misurare quante persone non sono state esposte a una pubblicita.",
      C: "Per stimare il numero di contenuti non pubblicati nel calendario editoriale.",
      D: "Per calcolare la differenza tra follower acquisiti e follower persi.",
    },
  },
  43: {
    options: {
      A: "L'utente puo essere piu vulnerabile a contenuti falsi se coerenti con i propri bias.",
      B: "Le filter bubble riducono sempre la circolazione di contenuti non verificati.",
      C: "La disinformazione riguarda solo contenuti esterni agli ambienti social.",
      D: "Le notizie false perdono efficacia quando sono allineate alle credenze pregresse.",
    },
  },
  44: {
    options: {
      A: "HyperText Markup Language.",
      B: "Hyper Transfer Media Logic.",
      C: "Home Tool Management Link.",
      D: "High Text Marketing Language.",
    },
  },
};

for (const question of bank) {
  const override = manualReviewOverrides[question.id];
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
