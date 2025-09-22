const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const pokemonRoutes = require('./routes/pokemons');
const typeRoutes = require('./routes/types');
const cors = require('cors');

const app = express();
const PORT = 3535;

// Middleware pour lire le JSON dans les requêtes
app.use(express.json());
app.use(cors()); // autorise toutes les origines, toutes les méthodes
app.options('*', cors());

// Servir les images depuis le dossier /images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes de l'API
app.use('/login', authRoutes);
app.use('/pokemons', pokemonRoutes);
app.use('/types', typeRoutes);

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ API Pokédex disponible sur http://localhost:${PORT}`);
});
