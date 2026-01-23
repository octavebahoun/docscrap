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

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Auteur:** Octave BAHOUN-HOUTOUKPE
**Repository:** [github.com/octavebahoun/docscrap](https://github.com/octavebahoun/docscrap)
