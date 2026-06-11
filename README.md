# 🌱 VegFinder

Applicazione web Single Page Application (SPA) reattiva, tipizzata e performante, dedicata alla ricerca ed esplorazione di ricette esclusivamente vegetariane. Il sistema si integra direttamente con le **Spoonacular Food API** per la scomposizione e l'estrazione delle schede tecniche dei piatti.

---

## 🚀 Funzionalità Principali

* **Filtro Rigido Nativo (Sicurezza Alimentare):** Chiamate API configurate per intercettare a monte ed elaborare esclusivamente risultati idonei al regime vegetariano (`diet=vegetarian`), escludendo filtri ridondanti lato client.
* **Persistenza dello Stato (Cache di Ricerca):** Implementazione di **React Context API** per memorizzare lo storico dei dati estratti e la query testuale. Navigando all'indietro dalla pagina di dettaglio, l'utente ritrova la Home intatta, azzerando le chiamate API ripetute.
* **Routing Dinamico:** Gestione delle transizioni e delle viste mediante **React Router v6** con parametri d'URL dinamici (`/recipe/:id`), garantendo l'isolamento strutturale della scheda tecnica.
* **Layout Reattivo Full-Width:** Interfaccia grafica moderna sviluppata a tutto schermo tramite **CSS Grid Layout** nativo. La disposizione sfrutta logiche fluide adattive (`repeat(auto-fill, minmax(280px, 1fr))`), eliminando l'uso di librerie pesanti esterne.
* **UX Curata ed Elegante:** * Barra di ricerca compatta con disposizione verticale (bottone di invio posizionato sotto l'input di testo).
  * Logo principale `🌱 VegFinder` interattivo e cliccabile posizionato in Navbar per il ritorno istantaneo alla schermata principale.
  * Allineamento geometrico automatico delle card tramite troncamento multilinea controllato dei titoli delle ricette.

---

## 🛠️ Stack Tecnologico

* **Core Framework:** React 18 (Componenti funzionali basati su Hooks: `useState`, `useEffect`, `useContext`, `useParams`).
* **Linguaggio:** TypeScript (Configurazione rigida integrata con il supporto a `verbatimModuleSyntax` per l'ottimizzazione e pulizia dei tipi nel bundle).
* **Build Tool & Server Locale:** Vite (Compilazione ultra-rapida guidata da moduli ES nativi).
* **HTTP Client:** Axios (Richieste asincrone assecondate dal monitoraggio visivo degli stati di `loading` ed `error`).
* **Navigazione:** React Router (`BrowserRouter`, `Routes`, `Route`, `Link`).

---

## 📦 Struttura del Progetto

```text
vegetarian-recipe/
├── public/
│   └── _redirects          # Configurazione delle rotte per prevenire l'errore 404 al refresh su Netlify
├── src/
│   ├── components/
│   │   └── Navbar.tsx      # Barra di navigazione superiore con Logo cliccabile
│   ├── context/
│   │   └── RecipeContext.tsx # Centralizzazione dello stato globale e della cache dei dati
│   ├── pages/
│   │   ├── Home.tsx         # Schermata principale: form verticale e griglia fluida
│   │   └── RecipeDetail.tsx # Schermata di dettaglio: analisi ingredienti e istruzioni HTML
│   ├── types/
│   │   └── index.ts        # Dichiarazione formale delle Interfacce e dei Modelli dati TypeScript
│   ├── App.tsx             # Root Component: configurazione del Router e del Context Provider
│   ├── App.css             # Foglio di stile globale, variabili CSS e ottimizzazioni responsive
│   └── main.tsx            # Entry-point dell'applicazione
├── index.html              # Template HTML di base (configurato con il titolo VegFinder)
├── tsconfig.json           # File di configurazione del compilatore TypeScript
└── package.json            # Gestione delle dipendenze e degli script npm
