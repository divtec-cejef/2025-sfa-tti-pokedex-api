// routes/pokemons.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const POKEMONS_PATH = path.join(__dirname, '../data/pokemons.json');

// Store en mémoire : charge depuis le fichier JSON au démarrage.
// Les mutations (POST/PUT/DELETE) modifient uniquement la mémoire.
// En serverless (Vercel), les données reviennent à l'état initial au prochain cold start.
let pokemonsCache = null;

function readPokemons() {
  if (!pokemonsCache) {
    pokemonsCache = JSON.parse(fs.readFileSync(POKEMONS_PATH));
  }
  return pokemonsCache;
}

function writePokemons(data) {
  pokemonsCache = data;
  // Écriture fichier uniquement en local (pas en serverless)
  try {
    fs.writeFileSync(POKEMONS_PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    // Ignore en serverless (read-only filesystem)
    console.log('⚠️ Écriture fichier ignorée (filesystem read-only en serverless)');
  }
}

function validatePokemonData(data) {
  // Seul name est obligatoire
  if (typeof data.name !== 'string' || data.name.trim() === '') return 'Le nom du Pokémon est obligatoire';
  // Les autres champs peuvent être absents ou nuls
  return null;
}

router.get('/', (req, res) => {
  const pokemons = readPokemons();
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const withImageUrl = pokemons.map(p => ({ ...p, imageUrl: `${baseUrl}/images/${p.img}` }));
  res.json(withImageUrl);
});

// router.post('/', authMiddleware, (req, res) => {
router.post('/', (req, res) => {
  const pokemons = readPokemons();
  const error = validatePokemonData(req.body);
  if (error) return res.status(400).json({ message: error });

  const newPokemon = {
    ...req.body,
    id: uuidv4()
  };
  pokemons.push(newPokemon);
  writePokemons(pokemons);
  res.status(201).json(newPokemon);
});

// router.put('/:id', authMiddleware, (req, res) => {
router.put('/:id', (req, res) => {
  const pokemons = readPokemons();
  const index = pokemons.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Pokémon non trouvé' });

  const error = validatePokemonData(req.body);
  if (error) return res.status(400).json({ message: error });

  pokemons[index] = { ...pokemons[index], ...req.body };
  writePokemons(pokemons);
  res.json(pokemons[index]);
});

// router.delete('/:id', authMiddleware, (req, res) => {
router.delete('/:id', (req, res) => {
  const pokemons = readPokemons();
  const id = req.params.id;
  const pokemon = pokemons.find(p => String(p.id) === id);
  if (!pokemon) {
    return res.status(404).json({ message: 'Pokémon non trouvé' });
  }
  if (process.env.VERCEL_ENV === 'production' && pokemon.official) {
    return res.status(403).json({ message: 'Les Pokémon officiels ne peuvent pas être supprimés en production' });
  }
  const updated = pokemons.filter(p => String(p.id) !== id);
  writePokemons(updated);
  res.status(204).end();
});

module.exports = router;
