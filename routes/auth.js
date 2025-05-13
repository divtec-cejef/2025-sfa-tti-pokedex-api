const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { generateToken } = require('../utils/jwt');

const USERS_PATH = path.join(__dirname, '../data/users.json');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_PATH));

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

  const token = generateToken({ username });
  res.json({ token });
});

module.exports = router;// Auth route
