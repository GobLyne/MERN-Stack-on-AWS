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

// GET single example by ID
router.get('/:id', async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);
    if (!example) {
      return res.status(404).json({ message: 'Example not found' });
    }
    res.json(example);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update example
router.put('/:id', async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);
    if (!example) {
      return res.status(404).json({ message: 'Example not found' });
    }

    example.name = req.body.name || example.name;
    example.description = req.body.description || example.description;

    const updatedExample = await example.save();
    res.json(updatedExample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE example
router.delete('/:id', async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);
    if (!example) {
      return res.status(404).json({ message: 'Example not found' });
    }

    await Example.findByIdAndDelete(req.params.id);
    res.json({ message: 'Example deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;