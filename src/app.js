/**
 * Configuration Express
 */

const express = require('express');
const coursesRoutes = require('./routes/courses.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/courses', coursesRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({ message: 'API DocScrap', version: '1.0.0' });
});

module.exports = app;
