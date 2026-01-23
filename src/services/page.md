## 1. Introduction
Bienvenue dans ce cours sur les composants React ! Les composants sont l'un des concepts fondamentaux de React et servent de briques de construction pour les interfaces utilisateur (UI). Dans ce cours, nous allons explorer ce que sont les composants, leur rôle dans une application React et comment écrire votre premier composant React.

## 2. Concepts Fondamentaux
### Définition d'un Composant
Un **composant** est une partie réutilisable de l'interface utilisateur qui encapsule une logique et une structure de données. C'est une fonction qui retourne des éléments HTML.

### Analogie du Quotidien
Imaginez que vous construisez une maison avec des briques. Chaque brique est un composant qui peut être réutilisé pour construire différentes parties de la maison. De même, en React, les composants sont les briques de construction de votre interface utilisateur.

### Exemple de Code Minimal
```javascript
// Un composant simple qui affiche un message
function Bonjour() {
  // Retourne un élément HTML
  return <h1>Bonjour, monde !</h1>;
}
```
### Explication Ligne par Ligne
- `function Bonjour()`: Déclaration d'une fonction nommée `Bonjour` qui sera notre composant.
- `return <h1>Bonjour, monde !</h1>;`: La fonction retourne un élément HTML `<h1>` qui affiche le message "Bonjour, monde !".

## 3. Mise en Pratique
### Cas d'Usage Réel
Supposons que vous voulez créer une application qui affiche une liste de produits. Vous pouvez créer un composant `Produit` qui sera réutilisé pour afficher chaque produit de la liste.

### Code Commenté
```javascript
// Composant Produit
function Produit(props) {
  // props est un objet qui contient les propriétés passées au composant
  return (
    <div>
      <h2>{props.nom}</h2>
      <p>Prix : {props.prix} €</p>
    </div>
  );
}

// Utilisation du composant Produit
function ListeProduits() {
  return (
    <div>
      <Produit nom="Ordinateur" prix="800" />
      <Produit nom="Tablette" prix="400" />
    </div>
  );
}
```
### Points d'Attention
> 💡 **Note :** Les composants peuvent recevoir des propriétés (props) qui permettent de personnaliser leur contenu.

### Pièges Courants à Éviter
> ⚠️ **Attention :** Oubliez pas de capitaliser le nom de votre composant (par exemple, `Bonjour` au lieu de `bonjour`).

## 4. Exercices Pratiques
### Défi 1 : Fondamentaux
Modifiez le composant `Bonjour` pour qu'il accepte un nom en paramètre et affiche "Bonjour, [nom] !".

```javascript
// Début de votre code
function Bonjour(props) {
  // À compléter
}
```
### Solution
```markdown
> 
## Solution Défi 1
```javascript
function Bonjour(props) {
  return <h1>Bonjour, {props.nom} !</h1>;
}
```

### Défi 2 : Logique
Implémentez un composant `Compteur` qui affiche un compteur et deux boutons pour augmenter et diminuer le compteur.

### Contraintes Techniques
N'utilisez pas de variables globales.

### Solution
```markdown
> 
## Solution Défi 2
```javascript
function Compteur() {
  const [compteur, setCompteur] = useState(0);

  return (
    <div>
      <p>Compteur : {compteur}</p>
      <button onClick={() => setCompteur(compteur + 1)}>Augmenter</button>
      <button onClick={() => setCompteur(compteur - 1)}>Diminuer</button>
    </div>
  );
}
```

### Défi 3 : Mini-projet
Créez un composant `Liste` qui affiche une liste de produits et permet de filtrer les produits par nom.

### Contraintes Techniques
Utilisez un tableau de produits et gérez l'état du filtre avec `useState`.

## 5. Récapitulatif
- Les composants sont des fonctions qui retournent des éléments HTML.
- Les composants peuvent recevoir des propriétés (props) pour personnaliser leur contenu.
- Les composants peuvent gérer leur propre état avec `useState`.

## Liens avec D'autres Concepts
Les composants sont liés à d'autres concepts React tels que les Hooks (`useState`, `useEffect`), les props et l'état des composants.