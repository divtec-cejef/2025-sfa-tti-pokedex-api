# Pokédex API

API REST Express.js pour l'exercice Pokédex Vuetify des apprentis.
Consommée par le site de démo `esig-141-pokedex-vuetify`.

## Stack

- **Runtime** : Node.js (CommonJS)
- **Framework** : Express.js 5.1
- **Auth** : JWT (jsonwebtoken) — actuellement désactivée (middleware commenté)
- **IDs** : UUID v4
- **Déploiement** : Vercel (serverless via `@vercel/node`)
- **Dev** : nodemon

## Commandes

```bash
npm start       # Lancer en production (node index.js)
npm run dev     # Lancer en développement (nodemon)
```

Port par défaut : 3535 (configurable via `PORT`)

## Structure

```
index.js              # Point d'entrée Express + export Vercel
routes/
  pokemons.js         # CRUD Pokémon (GET, POST, PUT, DELETE)
  auth.js             # POST /login (génération JWT)
  types.js            # GET /types
middleware/
  auth.js             # Middleware JWT (désactivé)
utils/
  jwt.js              # Helpers JWT
data/
  pokemons.json       # 10 pokémon officiels + pokémon utilisateurs
  types.json          # 14 types
  users.json          # Utilisateurs de test
images/               # PNG des pokémon
vercel.json           # Config déploiement Vercel
```

## Modèle de données

### Pokémon

```json
{
  "id": "uuid-v4",
  "official": true,
  "name": "Pikachu",
  "types": [1],
  "level": 35,
  "img": "pikachu.png",
  "description": "...",
  "stats": { "hp": 35, "attack": 55, "defense": 40, "speed": 90 }
}
```

- `official` : `true` pour les 10 pokémon de base, absent pour les pokémon créés par les utilisateurs
- `types` : tableau d'IDs numériques (référence `data/types.json`)
- `img` : nom de fichier dans `images/`
- Le GET ajoute dynamiquement `imageUrl` (URL complète)

## Routes

| Méthode | Path | Auth | Description |
|---------|------|------|-------------|
| GET | `/pokemons` | Non | Liste tous les pokémon |
| POST | `/pokemons` | Non* | Créer un pokémon |
| PUT | `/pokemons/:id` | Non* | Modifier un pokémon |
| DELETE | `/pokemons/:id` | Non* | Supprimer un pokémon |
| POST | `/login` | Non | Obtenir un token JWT |
| GET | `/types` | Non | Liste les types |

*Auth JWT désactivée (middleware commenté dans `routes/pokemons.js`)

## Protection des pokémon officiels

En **production Vercel** (`VERCEL_ENV=production`), les pokémon avec `official: true` ne peuvent pas être supprimés (retourne 403).
En local et en preview, tout est supprimable.

## Déploiement Vercel

- URL prod : `https://2025-sfa-pokedex-api.vercel.app`
- Filesystem **read-only** en serverless : les mutations (POST/PUT/DELETE) sont en mémoire uniquement, perdues au cold start
- Déploiement manuel : `npx vercel --prod`
- L'intégration GitHub ne détecte plus les push (repo déplacé vers `divtec-cejef`)

## Conventions

- Code en anglais, commits en français
- Pas de CDN externe
