const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const TYPES_PATH = path.join(__dirname, '../data/types.json');

router.get('/', (req, res) => {
  const types = JSON.parse(fs.readFileSync(TYPES_PATH));
  res.json(types);
});

module.exports = router;
