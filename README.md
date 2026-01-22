# 📚 DocScrap

**DocScrap** est un projet de **web scraping pédagogique** dont l’objectif est de transformer des documentations techniques officielles (React, Node.js, Laravel, etc.) en **contenu structuré, traduit et exploitable** sous forme de **cours en Markdown**, exposés via une **API JSON** et affichés sur un site web.

Le projet vise à faciliter l’apprentissage **par la documentation**, en la rendant plus accessible, organisée et lisible.

---

## 🎯 Objectifs du projet

- Scraper des **documentations officielles** (React, Node, Laravel, etc.)
- Extraire et structurer le contenu par :
  - langage
  - concepts
  - chapitres / sections

- Convertir les données en **JSON propre**
- Traduire le contenu (ex : EN → FR)
- Afficher les cours sous forme **Markdown** sur un site web
- Offrir une base exploitable pour :
  - apprentissage
  - révision
  - génération de cours personnalisés

---

## 🧠 Concept général

```
Documentation officielle
        ↓
   Web Scraping
        ↓
 Nettoyage & Parsing
        ↓
  JSON structuré
        ↓
Traduction (optionnelle)
        ↓
 Rendu Markdown
        ↓
 Interface Web
```

---

## 🧩 Stack technique (Phase 1)

### Backend / Scraping

- **Node.js**
- **Cheerio** (parsing HTML)
- **Axios / Fetch** (requêtes HTTP)
- **fs** (stockage local des données)
- **Markdown-it** (ou équivalent pour le rendu)

### Format de données

- **JSON** (structure des cours)
- **Markdown** (affichage final)

### Frontend (plus tard)

- interface implémenté https://docscrap.vercel.app/ [https://docscrap.vercel.app/]
- Framework JS (React / Vue / autre)
- Rendu Markdown dynamique
- Navigation par langage → cours → sections

---

## 📁 Arborescence prévue (Phase 1)

```
docscrap/
│
├── scraper/
│   ├── sources/
│   │   ├── react.js
│   │   ├── node.js
│   │   └── laravel.js
│   │
│   ├── utils/
│   │   ├── fetchPage.js
│   │   ├── parseHtml.js
│   │   └── cleanText.js
│   │
│   └── index.js
│
├── data/
│   ├── react/
│   │   └── hooks.json
│   ├── node/
│   └── laravel/
│
├── api/
│   └── server.js
│
├── frontend/
│   └── (à venir)
│
├── README.md
└── package.json
```

---

## 📌 Phase actuelle

### ✅ Phase 1 — Initialisation (EN COURS)

- Définition du concept
- Choix du stack
- Définition de l’arborescence
- Installation des dépendances

🛑 **Le développement fonctionnel commence après cette phase**

---

## 🚧 Phases futures (aperçu)

### Phase 2 – Scraping fonctionnel

- Scraper une documentation cible
- Extraire titres, paragraphes, blocs de code
- Structuration JSON cohérente

### Phase 3 – Traduction

- Intégration d’un système de traduction
- Cache des traductions

### Phase 4 – API

- Endpoints par langage / cours
- Pagination et recherche

### Phase 5 – Frontend

- Interface simple
- Rendu Markdown
- Navigation intuitive

---

## ⚠️ Avertissement légal

Ce projet est à **but éducatif**.
Le scraping doit :

- respecter les **conditions d’utilisation** des sites sources
- éviter toute surcharge de requêtes
- citer clairement les sources originales

---

## 🤝 Contribution

Le projet est en phase exploratoire.
Les idées, améliorations et retours sont bienvenus.

```
Démarrez l'interface front avec
cd front
```

```
---

## ✨ Vision long terme

* Génération de parcours d’apprentissage
* Comparaison entre frameworks
* Mode offline
* IA pour résumé et reformulation
* Plateforme d’apprentissage basée sur la documentation

---


```





























































































































# Référence React
## Introduction
Cette référence couvre les différentes fonctions et concepts de React, y compris les fonctions côté client, les fonctions côté serveur, les règles de React et les composants serveur.

## Fonctions côté client
### createRoot
La fonction `createRoot` est utilisée pour créer un nouveau conteneur de racine dans l'arbre de composants React.

### hydrateRoot
La fonction `hydrateRoot` est utilisée pour créer un nouveau conteneur de racine dans l'arbre de composants React, en hydratant un DOM existant.

## Fonctions côté serveur
### renderToNodeStream
La fonction `renderToNodeStream` est utilisée pour render une application React sur un serveur, en utilisant un stream de nœuds.

### renderToPipeableStream
La fonction `renderToPipeableStream` est utilisée pour render une application React sur un serveur, en utilisant un stream de pipeables.

### renderToReadableStream
La fonction `renderToReadableStream` est utilisée pour render une application React sur un serveur, en utilisant un stream lisible.

### renderToStaticMarkup
La fonction `renderToStaticMarkup` est utilisée pour render une application React sur un serveur, en générant une balise statique.

### renderToStaticNodeStream
La fonction `renderToStaticNodeStream` est utilisée pour render une application React sur un serveur, en générant un stream de nœuds statiques.

### renderToString
La fonction `renderToString` est utilisée pour render une application React sur un serveur, en générant une chaîne de caractères.

## Règles de React
### Les composants et les Hooks doivent être des fonctions pures
Les composants et les Hooks doivent être des fonctions pures, c'est-à-dire qu'ils ne doivent pas avoir d'effets secondaires et doivent toujours retourner le même résultat pour un ensemble d'entrées données.

### React appelle les composants et les Hooks
React appelle les composants et les Hooks, en les passant en tant que propriétés, en les utilisant comme enfants, ou en les appelant directement.

### Les règles des Hooks
Les Hooks ont des règles spécifiques, telles que l'utilisation de `useState` pour déclarer des variables d'état, et l'utilisation de `useEffect` pour gérer les effets secondaires.

## React Server Components
### Composants Serveur
Les composants serveur sont des composants qui s'exécutent sur le serveur, et qui peuvent être utilisés pour render des pages web.

### Actions Serveur
Les actions serveur sont des fonctions qui s'exécutent sur le serveur, et qui peuvent être utilisées pour gérer les interactions avec les composants serveur.

### Exemple d'utilisation des composants serveur
```jsx
import { createServerComponent } from 'react-server-dom';

const MonComposantServeur = createServerComponent(() => {
  return <div>Bonjour, monde !</div>;
});
```
### Exemple d'utilisation des actions serveur
```jsx
import { createServerAction } from 'react-server-dom';

const monActionServeur = createServerAction(() => {
  // Code à exécuter sur le serveur
});
```
Note : Les exemples de code ci-dessus sont fictifs et ne sont pas fonctionnels. Ils sont utilisés uniquement pour illustrer les concepts.