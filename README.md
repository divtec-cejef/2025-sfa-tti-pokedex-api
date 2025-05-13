# Pokédex API

Ce projet fournit une **API RESTful** pour accéder à des données de Pokémon, y compris leurs types, leurs statistiques et leurs images.  
Elle est utilisée dans un cadre pédagogique pour permettre aux apprentis de connecter leur application Vue.js avec une API réaliste.

L'API est développée avec **Express.js** et utilise des fichiers JSON pour stocker les données localement.

## 🚀 Installation
Après avoir cloné le dépôt lancez l'installation des dépendances :
```bash
npm install
```

## ▶️ Lancer le serveur

```bash
npm start
```
Votre serveur sera accessible à l'adresse : `http://localhost:3535`.

> Vous pouvez changer le port dans le fichier `server.js` si nécessaire.

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
  "username": "admin",
  "password": "admin123"
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

### 🔹 `POST /pokemons` *(auth requis)*

**Body :**
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

**Réponse :**
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

### 🔹 `DELETE /pokemons/:id` *(auth requis)*

**Réponse :**
```
204 No Content
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

## 🧪 Tester l'API avec Postman

Le dossier `postman/` contient :
- `pokedex-api.collection.json`
- `pokedex-api.environment.json`

### Étapes :
1. Importer les deux fichiers dans Postman
2. Activer l’environnement `Pokedex API Environment`
3. Exécuter `Login` pour générer automatiquement le token dans `{{TOKEN}}`
4. Utiliser les autres requêtes (protégées ou non)

## 🧠 À savoir
- Les images doivent être placées dans `/images/`.
- Les `id` des Pokémon sont des UUID (string).
- Les types sont des références numériques (`types: [1, 2]`).

## 📄 Licence
Ce projet est distribué sous licence MIT.
