# ProvinceItalia

Sito per consultare i dati demografici e territoriali di regioni, province e comuni italiani, con mappa vettoriale interattiva, dati ufficiali ISTAT e una sezione dedicata ai quiz geografici.

Sito: https://provinceitalia.it  
Quiz: https://quiz.provinceitalia.it

## Cosa contiene

**Home e mappa interattiva.** La pagina principale mostra una mappa SVG dell'Italia: cliccando su una regione si aggiorna il pannello laterale con i dati principali e l'elenco delle sue province con sigla e abitanti, senza ricaricare la pagina.

**Pagine di regioni, province e comuni.** Dalla mappa o dagli elenchi si naviga nelle pagine delle 20 regioni (`regioni/`), che mostrano il riepilogo demografico e la tabella delle province del territorio. Da ogni provincia si accede alla relativa pagina (`province/`, 107 in totale) con tutti i comuni che ne fanno parte. La pagina `comuni.html` raccoglie invece in un'unica tabella tutti i comuni italiani con popolazione residente e indicazione dei capoluoghi.

**Quiz.** Su https://quiz.provinceitalia.it (cartella `quiz/`) ci sono i giochi interattivi dedicati alle province italiane: *Indovina la regione*, *Indovina dalla sigla* e *L'Intruso regionale*.

Le tabelle di regioni, province e comuni hanno ricerca testuale e ordinamento per colonna (nome, sigla, popolazione).

## Come funziona

È un sito statico: niente backend, niente framework. Le pagine di regioni, province e comuni sono generate da script Python a partire da file JSON e committate nel repository. Tabelle ed elenchi sono già nell'HTML, quindi i motori di ricerca li indicizzano direttamente; JavaScript gestisce l'interattività della mappa SVG nella home, la ricerca, l'ordinamento delle tabelle e i quiz.

```text
CSV (ISTAT)  →  data/  →  scripts/genera_*  →  pagine HTML
```

## Struttura del repository

```text
.
├── index.html, comuni.html,
│   about.html, privacy.html, 404.html
│   sitemap.xml, robots.txt
├── data/        JSON organizzati per regione e provincia
├── scripts/     script Python (JSON → HTML)
├── regioni/     una pagina per regione (generate)
├── province/    una pagina per provincia con i comuni (generate)
├── quiz/        quiz interattivi (quiz.provinceitalia.it)
└── assets/
    ├── css/
    ├── js/
    ├── fonts/
    └── img/
```

**`data/`**
- File JSON organizzati gerarchicamente per regione e provincia, con l'elenco dei comuni, la popolazione residente, le sigle automobilistiche e l'indicazione dei capoluoghi.

**`scripts/`**
- `genera_regioni.py`: genera `regioni/`
- `genera_province.py`: genera `province/`
- `genera_comuni.py`: genera `comuni.html`

**`assets/js/`**
- `scriptprovince.js`: interattività della mappa SVG nella home e aggiornamento dinamico del pannello laterale
- `ordinamentoprovince.js`: ricerca e ordinamento nelle tabelle di regioni, province e comuni

## Aggiornare i dati

Serve Python 3. Gli script vanno lanciati dalla radice del repository, perché usano percorsi relativi.

1. **Dati demografici.** Scarica i dati aggiornati della popolazione residente dall'ISTAT e aggiorna i file JSON nella cartella `data/`.
2. **Pagine.** Rigenera l'HTML:

```bash
python scripts/genera_regioni.py
python scripts/genera_province.py
python scripts/genera_comuni.py
```

## Fonti e limiti dei dati

- Popolazione residente e ripartizioni territoriali: dati ufficiali ISTAT.
- Il periodo di riferimento della popolazione è indicato nelle pagine del sito.
- I dati sono elaborati automaticamente: eventuali errori o discrepanze possono dipendere dalla fonte o da variazioni amministrative recenti (fusioni o istituzione di nuovi comuni).

## Segnalazioni

Per errori nei dati o suggerimenti apri una issue nel repository.

## Licenza

Tutti i diritti riservati. Il codice è visibile ma non open source: senza permesso scritto non si può copiare, modificare o distribuire. Vedi `LICENSE`. I dati ISTAT restano soggetti ai rispettivi termini d'uso.