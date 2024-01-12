const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/marioDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Mario Character Schema
const marioSchema = new mongoose.Schema({
  name: String,
  weight: Number,
});

const MarioChar = mongoose.model('mariochar', marioSchema);

// API Endpoints

// GET all Mario Characters
app.get('/mario', async (req, res) => {
  try {
    const characters = await MarioChar.find();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Mario Character by ID
app.get('/mario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const character = await MarioChar.findById(id);

    if (!character) {
      return res.status(400).json({ message: 'Character not found' });
    }

    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST Mario Character
app.post('/mario', async (req, res) => {
  try {
    const { name, weight } = req.body;

    if (!name || !weight) {
      return res.status(400).json({ message: 'Either name or weight is missing' });
    }

    const newCharacter = new MarioChar({ name, weight });
    const savedCharacter = await newCharacter.save();

    res.status(201).json(savedCharacter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH Mario Character by ID
app.patch('/mario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, weight } = req.body;

    const updatedCharacter = await MarioChar.findByIdAndUpdate(
      id,
      { name, weight },
      { new: true }
    );

    if (!updatedCharacter) {
      return res.status(400).json({ message: 'Character not found or invalid changes' });
    }

    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE Mario Character by ID
app.delete('/mario/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCharacter = await MarioChar.findByIdAndDelete(id);

    if (!deletedCharacter) {
      return res.status(400).json({ message: 'Character not found' });
    }

    res.status(200).json({ message: 'Character deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
