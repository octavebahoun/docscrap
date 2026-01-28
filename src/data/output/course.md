# FastAPI : Un Framework Moderne pour les APIs
=====================================================

## 1. Introduction
FastAPI est un framework moderne, rapide et performant pour construire des APIs avec Python. Il est conçu pour être facile à utiliser et à apprendre, tout en offrant des performances élevées.

**Pourquoi utiliser FastAPI ?**

*   **Haute performance** : FastAPI est l'un des frameworks Python les plus rapides, grâce à Starlette et Pydantic.
*   **Facilité de développement** : FastAPI permet de développer des fonctionnalités rapidement, avec environ 200% à 300% de vitesse de développement en plus.
*   **Moins de bugs** : FastAPI réduit les erreurs humaines de 40% grâce à son système de typage statique et à ses fonctionnalités de validation.

## 2. Concepts Fondamentaux

### 2.1. Qu'est-ce que FastAPI ?

FastAPI est un framework Python pour construire des APIs. Il est basé sur les normes ouvertes pour les APIs, telles que OpenAPI et JSON Schema.

**Définition simple** : FastAPI est un framework Python pour construire des APIs rapidement et facilement.

**Analogie du quotidien** : Imaginez que vous construisez une maison. Vous avez besoin d'un plan pour organiser les pièces, les couloirs, etc. FastAPI est comme un plan pour votre API, qui vous aide à organiser les endpoints, les paramètres, etc.

### 2.2. Caractéristiques Clés

*   **Fast** : Performances élevées, comparable à NodeJS et Go.
*   **Fast to code** : Développement rapide des fonctionnalités.
*   **Fewer bugs** : Réduction des erreurs humaines.
*   **Intuitive** : Grande qualité de l'édition, avec auto-complétion partout.
*   **Easy** : Conçu pour être facile à utiliser et à apprendre.

## 3. Mise en Pratique

### 3.1. Premier Exemple

Créons une API simple avec FastAPI :
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```
**Explication ligne par ligne** :

*   On importe FastAPI et on crée une instance de l'application.
*   On définit un endpoint GET `/` avec la fonction `read_root`.
*   La fonction retourne un dictionnaire JSON.

### 3.2. Cas d'Usage Réel

Supposons que nous voulions créer une API pour gérer des livres. Nous pouvons ajouter des endpoints pour créer, lire, mettre à jour et supprimer des livres.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Livre(BaseModel):
    id: int
    titre: str
    auteur: str

livres = []

@app.get("/livres")
def read_livres():
    return livres

@app.post("/livres")
def create_livre(livre: Livre):
    livres.append(livre)
    return livre
```
**Points d'attention** :

*   On utilise Pydantic pour définir le modèle de données `Livre`.
*   On stocke les livres dans une liste en mémoire.

## 4. Exercices Pratiques

### Défi 1 : Modifier un Code Existant

Modifiez l'exemple précédent pour ajouter un endpoint pour supprimer un livre par son ID.

### Défi 2 : Implémenter une Fonctionnalité

Implémentez une fonctionnalité pour rechercher des livres par titre ou auteur.

### Défi 3 : Mini-Projet

Créez une API pour gérer des utilisateurs, avec des endpoints pour créer, lire, mettre à jour et supprimer des utilisateurs.

## 5. Récapitulatif

*   **Points clés** :
    *   FastAPI est un framework Python pour construire des APIs rapidement et facilement.
    *   Il offre des performances élevées et une grande qualité de développement.
    *   Il est conçu pour être facile à utiliser et à apprendre.
*   **Liens avec d'autres concepts** :
    *   FastAPI est lié à d'autres frameworks Python pour les APIs, tels que Flask et Django.
    *   Il utilise des normes ouvertes pour les APIs, telles que OpenAPI et JSON Schema.

> 💡 **Note** : FastAPI est un framework très populaire et largement utilisé dans l'industrie. Il est important de bien comprendre ses concepts et ses fonctionnalités pour construire des APIs efficaces et performantes.