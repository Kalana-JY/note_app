require('dotenv').config({ override: true });
const express = require('express');
const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

// Health check - for Kubernetes liveness/readiness probe
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/notes', notesRouter);

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Notes API listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

start();
