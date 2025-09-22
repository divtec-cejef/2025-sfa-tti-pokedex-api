// routes/pokemons.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const POKEMONS_PATH = path.join(__dirname, '../data/pokemons.json');

function readPokemons() {
  return JSON.parse(fs.readFileSync(POKEMONS_PATH));
}
function writePokemons(data) {
  fs.writeFileSync(POKEMONS_PATH, JSON.stringify(data, null, 2));
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
  const updated = pokemons.filter(p => String(p.id) !== id);
  if (updated.length === pokemons.length) {
    return res.status(404).json({ message: 'Pokémon non trouvé' });
  }
  writePokemons(updated);
  res.status(204).end();
});

module.exports = router;
