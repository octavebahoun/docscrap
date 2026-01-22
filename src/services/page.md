# Votre Premier Composant React
=====================================

## 1. Introduction
Bienvenue dans ce cours sur les composants React ! Les composants sont l'un des concepts fondamentaux de React et servent de briques de base pour construire les interfaces utilisateur (UI). Dans ce cours, nous allons explorer ce qu'est un composant, son rôle dans une application React et comment écrire votre premier composant React.

## 2. Concepts Fondamentaux
### Définition d'un Composant
Un **composant** est une petite partie réutilisable d'une interface utilisateur. Il peut s'agir d'un bouton, d'un champ de texte, d'une liste, etc.

**Analogie du quotidien :** Un composant est comme un LEGO. Chaque pièce est conçue pour s'emboîter avec d'autres pièces pour créer quelque chose de plus grand.

### Rôle des Composants dans une Application React
Les composants sont les briques de base d'une application React. Ils permettent de diviser l'interface utilisateur en petites parties réutilisables et faciles à maintenir.

### Écriture d'un Premier Composant React
```javascript
// Définition d'un composant fonctionnel
function Bonjour() {
  // Retourne le JSX qui sera affiché
  return <h1>Bonjour, monde !</h1>;
}
```
**Explication ligne par ligne :**

* `function Bonjour() {` définit une fonction appelée `Bonjour` qui sera notre composant.
* `return <h1>Bonjour, monde !</h1>;` retourne un élément JSX qui sera affiché à l'écran.

## 3. Mise en Pratique
### Cas d'Usage Réel
Supposons que nous voulions créer un composant qui affiche un message de bienvenue personnalisé.

```javascript
// Composant avec une props
function Bonjour({ nom }) {
  return <h1>Bonjour, {nom} !</h1>;
}
```
**Points d'attention :**

*   Nous utilisons des **props** pour passer des données du parent vers l'enfant.
*   Les props sont des objets qui contiennent les attributs passés à un composant.

### Pièges Courants à Éviter
> ⚠️ **Attention :** N'oubliez pas de respecter la syntaxe JSX et de fermer vos balises.

## 4. Exercices Pratiques
### Défi 1 : Modification d'un Code Existants
Écrivez un composant `AuRevoir` qui affiche un message d'au revoir.

```javascript
// Code de base
function AuRevoir() {
  return <h1>A bientôt !</h1>;
}

// Modifiez-le pour accepter un nom en prop
```

<details>
  <summary>Solution</summary>

```javascript
function AuRevoir({ nom }) {
  return <h1>A bientôt, {nom} !</h1>;
}
```
</details>

### Défi 2 : Implémentation d'une Fonctionnalité
Créez un composant `Liste` qui affiche une liste de fruits.

```javascript
// Liste de fruits
const fruits = ['Pomme', 'Banane', 'Mangue'];

// Écrivez le composant Liste
```

<details>
  <summary>Solution</summary>

```javascript
function Liste() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
```
</details>

### Défi 3 : Mini-Projet
Créez un composant `Profil` qui affiche le nom et l'âge d'une personne.

```javascript
// Données de profil
const profil = {
  nom: 'Jean',
  age: 30,
};

// Écrivez le composant Profil
```

<details>
  <summary>Solution</summary>

```javascript
function Profil({ profil }) {
  return (
    <div>
      <h1>{profil.nom}</h1>
      <p>Âge : {profil.age}</p>
    </div>
  );
}
```
</details>

## 5. Récapitulatif
*   Les composants sont les briques de base d'une application React.
*   Ils permettent de diviser l'interface utilisateur en petites parties réutilisables.
*   Les composants peuvent accepter des props pour personnaliser leur comportement.

Vous avez maintenant une bonne compréhension des composants React. Continuez à pratiquer et à explorer les autres concepts de React pour devenir un développeur React compétent !