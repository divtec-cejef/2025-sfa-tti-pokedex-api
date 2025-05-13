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

### 🔹 `POST /pokemons` *(auth requis)*
Ajoute un nouveau Pokémon.

### 🔹 `DELETE /pokemons/:id` *(auth requis)*
Supprime un Pokémon selon son identifiant.

### 🔹 `GET /types`
Retourne la liste complète des types disponibles avec leurs couleurs.

---

## 🧪 Tester l'API avec Postman

Un dossier `postman/` est fourni dans le dépôt, contenant deux fichiers :
- `pokedex-api.collection.json` → contient les requêtes configurées
- `pokedex-api.environment.json` → contient les variables `HOST` et `TOKEN`

### Étapes :
1. Ouvrir Postman
2. Aller dans **Import**
3. Sélectionner **les deux fichiers** du dossier `postman/`
4. Dans Postman, **activer l’environnement `Pokedex API Environment`**
5. Lancer la requête `Login` pour générer automatiquement un token dans la variable `{{TOKEN}}`
6. Utiliser les autres requêtes, protégées ou non, selon les besoins

---

## 🧠 À savoir
- Les images doivent être placées dans le dossier `/images`.
- Tous les identifiants de pokémons sont des UUID (`string`).
- Les types sont référencés par leur ID numérique dans les pokémons.

---

## 📄 Licence
Ce projet est distribué sous licence MIT.
