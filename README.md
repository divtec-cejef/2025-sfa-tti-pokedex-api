# Pokédex API

Dépôt GitHub pour le projet **Pokédex API**  
https://github.com/fallinov/2025-sfa-pokedex-api

Ce projet fournit une **API RESTful** pour accéder à des données de Pokémon, y compris leurs types, leurs statistiques et leurs images.  
Elle est utilisée dans un cadre pédagogique pour permettre aux apprentis de connecter leur application Vue.js avec une API réaliste.

L'API est développée avec **Express.js** et utilise des fichiers JSON pour stocker les données localement.

---

## 🚀 Installation

```bash
# Cloner le dépôt en local
git clone https://github.com/fallinov/2025-sfa-pokedex-api
cd 2025-sfa-pokedex-api

# Installer les dépendances
npm install
```

---

## ▶️ Lancer le serveur

```bash
npm start
```

L'API est ensuite accessible à l'adresse suivante :  
**http://localhost:3000**

---

## 📦 Données disponibles

- `/data/pokemons.json` → liste des Pokémon
- `/data/types.json` → liste des types de Pokémon
- `/images/` → dossier contenant les images accessibles via `/images/<nom>.png`

---

## 🔐 Authentification

Avant d’accéder à certaines routes (ajout/suppression de Pokémon), vous devez vous connecter.

### `POST /login`

- **Body (JSON)** :
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Réponse** :
  ```json
  {
    "token": "<JWT>"
  }
  ```

Utilisez ce token dans les routes protégées via le header HTTP :

```
Authorization: Bearer <token>
```

---

## 📘 Endpoints de l’API

### 🔹 `GET /pokemons`
Retourne la liste de tous les Pokémon, avec l’URL complète de l’image.

- Réponse :
  ```json
  [
    {
      "id": "...",
      "name": "Pikachu",
      "types": [1],
      "level": 35,
      "img": "pikachu.png",
      "imageUrl": "http://localhost:3000/images/pikachu.png",
      "description": "...",
      "stats": {
        "hp": 35,
        "attack": 55,
        "defense": 40,
        "speed": 90
      }
    },
    ...
  ]
  ```

---

### 🔹 `POST /pokemons` *(auth requis)*
Ajoute un nouveau Pokémon.

- **Headers** :
  ```
  Authorization: Bearer <token>
  ```
- **Body (exemple)** :
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

---

### 🔹 `DELETE /pokemons/:id` *(auth requis)*
Supprime un Pokémon selon son identifiant.

---

### 🔹 `GET /types`
Retourne la liste complète des types disponibles avec leurs couleurs.

- Réponse :
  ```json
  [
    { "id": 1, "name": "Électrique", "color": "#FFD700" },
    ...
  ]
  ```

---

## 🧪 Test avec Postman

Vous pouvez importer la collection suivante pour tester tous les endpoints :  
👉 [Télécharger la collection Postman](postman/pokedex-api.postman_collection.json)

---

## 🧠 À savoir
- Les images doivent être placées dans le dossier `/images`.
- Tous les identifiants sont des UUID (`string`), pas des entiers.
- Les types sont référencés par leur ID numérique dans les pokémons.

---

## 📄 Licence
Ce projet est distribué sous licence MIT.
