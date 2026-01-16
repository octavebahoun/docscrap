# Référence API React

## React

Les fonctionnalités programmatiques de React :

- Hooks - Pour utiliser diverses fonctionnalités de React au sein de vos composants.
- Composants - Détaille les composants fournis par React que vous pouvez utiliser dans votre JSX.
- Fonctions - Fonctions de l’API utiles pour définir vos composants.
- Directives - Fournit des instructions aux bundlers compatibles avec React Server Components.

## React DOM

React-DOM comprend les fonctionnalités qui ne sont prises en charge que pour les applications web (celles qui tournent dans un environnement DOM navigateur).  Cette section comprend les parties suivantes :

- Hooks - Les Hooks dédiés aux applications web s’exécutant dans un environnement DOM navigateur.
- Composants - React prend en charge tous les composants natifs du navigateur pour HTML et SVG.
- Fonctions - Le module react-dom fournit les fonctions dédiées aux applications web.
- Fonctions côté client - L’API dans react-dom/client vous permet d’effectuer le rendu de composants React côté client (dans le navigateur).
- Fonctions côté serveur - L’API dans react-dom/server vous permet d’effectuer le rendu de composants React côté serveur, vers du HTML.

## Les règles de React

React repose sur des idiomes — ou règles — visant à exprimer vos approches de façon facile à comprendre, et à même de produire des applications de grande qualité :

- Les composants et les Hooks doivent être purs – Cette pureté facilite la compréhension de votre code ainsi que son débogage, et permet à React d’optimiser automatiquement et correctement vos composants et Hooks.
- React appelle les composants et les Hooks – React est responsable du rendu des composants et des Hooks de façon à optimiser l’expérience utilisateur.
- Les règles des Hooks – Les Hooks reposent sur de simples fonctions JavaScript, mais ils représentent un type spécifique de logique UI réutilisable, et ne peuvent être appelés que dans des circonstances bien précises.

## API React historique

- API React historique - Ces fonctions sont présentes dans le module react, mais leur utilisation est découragée pour tout nouveau code.

