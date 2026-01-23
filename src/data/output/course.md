# 1. Introduction
Le Hook `useState` est un élément fondamental de React qui permet d'ajouter un état à vos composants. Il est utilisé pour stocker et gérer des données qui peuvent changer au fil du temps.

**Pourquoi utiliser `useState` ?**

*   Pour ajouter un état à vos composants et les rendre interactifs
*   Pour stocker et gérer des données qui peuvent changer au fil du temps

**Contexte d'utilisation réel**

*   Dans une application de e-commerce, vous pouvez utiliser `useState` pour stocker le panier d'achat d'un utilisateur
*   Dans un jeu, vous pouvez utiliser `useState` pour stocker le score et les vies du joueur

**Bénéfices concrets pour le développeur**

*   Permet de créer des composants interactifs et dynamiques
*   Facilite la gestion des données et de l'état des composants

## 2. Concepts Fondamentaux

### Définition de `useState`

`useState` est un Hook de React qui permet de déclarer un état dans un composant fonctionnel.

**Définition simple :** `useState` est un Hook qui permet de stocker et de gérer un état dans un composant.

**Analogie du quotidien :** Imaginez que vous avez un thermostat dans votre maison. Vous pouvez régler la température et le thermostat la maintiendra à cette valeur. De même, `useState` vous permet de stocker et de gérer une valeur (l'état) dans votre composant.

### Exemple de code minimal

```javascript
import { useState } from 'react';

function MonComposant() {
  // Déclaration de l'état 'count' avec la valeur initiale 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Le compteur est à : {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrémenter</button>
    </div>
  );
}
```

### Explication ligne par ligne

*   `import { useState } from 'react';` : Importation du Hook `useState` depuis React
*   `const [count, setCount] = useState(0);` : Déclaration de l'état `count` avec la valeur initiale 0 et de la fonction `setCount` pour la mettre à jour
*   `<p>Le compteur est à : {count}</p>` : Affichage de la valeur actuelle de `count`
*   `<button onClick={() => setCount(count + 1)}>Incrémenter</button>` : Bouton qui incrémente la valeur de `count` lorsqu'il est cliqué

## 3. Mise en Pratique

### Cas d'usage réels et progressifs

*   **Exemple 1 :** Création d'un compteur simple

```javascript
import { useState } from 'react';

function Compteur() {
  const [compte, setCompte] = useState(0);

  return (
    <div>
      <p>Le compteur est à : {compte}</p>
      <button onClick={() => setCompte(compte + 1)}>Incrémenter</button>
    </div>
  );
}
```

*   **Exemple 2 :** Gestion d'un formulaire

```javascript
import { useState } from 'react';

function Formulaire() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  const handleSoumission = (e) => {
    e.preventDefault();
    console.log(`Nom : ${nom}, Prénom : ${prenom}`);
  };

  return (
    <form onSubmit={handleSoumission}>
      <label>
        Nom :
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      </label>
      <br />
      <label>
        Prénom :
        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
      </label>
      <button type="submit">Soumettre</button>
    </form>
  );
}
```

### Points d'attention

> 💡 **Note :** Il est important de toujours fournir une valeur initiale à l'état déclaré avec `useState`.

> ⚠️ **Attention :** Il ne faut pas oublier de mettre à jour l'état en utilisant la fonction correspondante (`setCount` dans l'exemple).

## 4. Exercices Pratiques

### Défi 1 (Fondamentaux)

Modifier le code du compteur simple pour qu'il affiche un message différent selon la valeur du compteur.

*   Énoncé : Le compteur est à 0, afficher "Début" ; si le compteur est entre 1 et 10, afficher "En cours" ; si le compteur est supérieur à 10, afficher "Terminé".
*   Contraintes techniques : Utiliser `useState` pour stocker la valeur du compteur.

### Défi 2 (Logique)

Implémenter une fonctionnalité de "like" pour une publication sur un réseau social.

*   Énoncé : Créer un bouton "Like" qui incrémente le nombre de likes lorsqu'il est cliqué.
*   Contraintes techniques : Utiliser `useState` pour stocker le nombre de likes.

### Défi 3 (Mini-projet)

Créer un jeu de devinette où l'utilisateur doit trouver un nombre mystère.

*   Énoncé : Le jeu affiche un nombre mystère et l'utilisateur doit le deviner en proposant des nombres. Après chaque proposition, le jeu indique si le nombre est trop grand ou trop petit.
*   Contraintes techniques : Utiliser `useState` pour stocker le nombre mystère et les propositions de l'utilisateur.

## 5. Récapitulatif

*   `useState` est un Hook de React qui permet de déclarer un état dans un composant fonctionnel.
*   Il permet de stocker et de gérer des données qui peuvent changer au fil du temps.
*   La fonction `setSomething` permet de mettre à jour l'état.

Liste à puces des points clés à retenir :

*   Déclarer un état avec `useState`
*   Mettre à jour l'état avec la fonction correspondante
*   Utiliser l'état dans le composant

> 🎯 **Objectif :** Maîtriser l'utilisation de `useState` pour créer des composants interactifs et dynamiques avec React.