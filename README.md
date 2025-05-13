# Pokédex API

Ce projet fournit une **API RESTful** pour accéder à des données de Pokémon, y compris leurs types, leurs statistiques et leurs images.  
Elle est utilisée dans un cadre pédagogique pour permettre aux apprentis de connecter leur application Vue.js avec une API réaliste.

L'API est développée avec **Express.js** et utilise des fichiers JSON pour stocker les données localement.

## Mise en place
### 🚀 Installation
Après avoir cloné le dépôt lancez l'installation des dépendances :
```bash
npm install
```

### ▶️ Lancer le serveur

```bash
npm start
```
Votre serveur sera accessible à l'adresse : `http://localhost:3535`.

> Vous pouvez changer le port dans le fichier `server.js` si nécessaire.

## 🧪 Tester l'API avec Postman

Le dossier `postman/` contient :
- `pokedex-api.collection.json` 
  - Collection de requêtes Postman
  - Contient toutes les routes de l'API
  - Inclut des exemples de réponses
- `pokedex-api.environment.json` 
  - Environnement Postman
  - Contient la variable `{{HOST}}` pour l'URL de base
  - Contient la variable `{{TOKEN}}` pour le token d'authentification
  

### Étapes :
1. Importer les deux fichiers dans Postman
2. Activer l’environnement `Pokedex API Environment`
3. Exécuter `Login` pour générer automatiquement le token dans `{{TOKEN}}`
4. Utiliser les autres requêtes (protégées ou non)

> N'oubliez pas de changer l'URL, variable d'environnement {{HOST}} si vous 
> utilisez un autre port.

## 📦 Fichiers des données

- `/data/pokemons.json` → liste des Pokémon
- `/data/types.json` → liste des types
- `/data/users.json` → liste des utilisateurs (pour l'authentification)
- `/images/` → dossier contenant les images des Pokémon

## 🔐 Authentification
Les routes pour créer, modifier ou supprimer des Pokémon nécessitent
une authentification par token JWT.

### `POST /login`

**Body :**
```json
{
  "username": "sacha@pokemon.com",
  "password": "pika"
}
```

**Réponse :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

Utiliser ce token dans l’en-tête pour les requêtes protégées :
```
Authorization: Bearer <token>
```

## 📘 Endpoints de l’API

### 🔹 `GET /pokemons`
Liste tous les pokémons avec l'URL de leur image.

**Réponse :**
```json
[
  {
    "id": "uuid",
    "name": "Pikachu",
    "types": [1],
    "level": 35,
    "img": "pikachu.png",
    "imageUrl": "http://localhost:3535/images/pikachu.png",
    "description": "...",
    "stats": {
      "hp": 35,
      "attack": 55,
      "defense": 40,
      "speed": 90
    }
  }
]
```

### 🔹 `POST /pokemons` *(authentification requise)*
Pour créer un Pokémon, en cas d'erreur, il renverra un message d'erreur.

**Réponse succès 201 :**
```json
{
  "id": "abc123",
  "name": "Testmon",
  "types": [1],
  "level": 10,
  "img": "testmon.png",
  "description": "Un Pokémon de test",
  "stats": {
    "hp": 50,
    "attack": 40,
    "defense": 30,
    "speed": 60
  }
}
```
**Réponse d'erreur 404 :**
```json
{
  "message": "Le nom du Pokémon est obligatoire"
}
```

### 🔹 `PUT /pokemons/:id` *(authentification requise)*
Pour modifier un Pokémon, en cas d'erreur, il renverra un message d'erreur.

**Réponse succès 200 :**
```json
{
  "name": "Testmon modifié",
  "types": [
    2,
    3
  ],
  "level": 20,
  "img": "testmon-mod.png",
  "description": "Un Pokémon modifié",
  "stats": {
    "hp": 60,
    "attack": 50,
    "defense": 35,
    "speed": 65
  },
  "id": "c41a528e-5765-490a-bb27-f6d8f33ee5af"
}
```

**Réponse d'erreur 404 :**
```json
{
  "message": "Pokémon non trouvé"
}
```

### 🔹 `DELETE /pokemons/:id` *(authentification requise)*
Pour supprimer un Pokémon, en cas d'erreur, il renverra un message d'erreur.

**Réponse succès 204:**
```
204 No Content
```

**Réponse d'erreur 404**
```json
{
  "message": "Pokémon non trouvé"
}
```

### 🔹 `GET /types`
Liste des types disponibles.

**Réponse :**
```json
[
  {
    "id": 1,
    "name": "Électrique",
    "color": "#FFD700"
  },
]
```

## 🧠 À savoir
- Les images de vos noouveau pokémons doivent être placées manuellement dans 
  le dossier `images/`.
- Les `id` des Pokémon sont des UUID (string).
- Les types ont des ID numériques (`types: [1, 2]`).
