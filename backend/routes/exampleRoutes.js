const express = require('express');
const router = express.Router();
const Example = require('../models/exampleModel');

// GET all examples
router.get('/', async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new example
router.post('/', async (req, res) => {
  const example = new Example({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newExample = await example.save();
    res.status(201).json(newExample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;