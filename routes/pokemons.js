
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const POKEMONS_PATH = path.join(__dirname, '../data/pokemons.json');

// Helper pour lire/écrire
function readPokemons() {
  return JSON.parse(fs.readFileSync(POKEMONS_PATH));
}
function writePokemons(data) {
  fs.writeFileSync(POKEMONS_PATH, JSON.stringify(data, null, 2));
}

router.get('/', (req, res) => {
  const pokemons = readPokemons();

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const withImageUrl = pokemons.map(p => ({
    ...p,
    imageUrl: `${baseUrl}/images/${p.img}`
  }));

  res.json(withImageUrl);
});


router.post('/', authMiddleware, (req, res) => {
  const pokemons = readPokemons();
  const newPokemon = req.body;
  pokemons.push(newPokemon);
  writePokemons(pokemons);
  res.status(201).json(newPokemon);
});

router.delete('/:id', authMiddleware, (req, res) => {
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
