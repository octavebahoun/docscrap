/**
 * Configuration Express
 */

const express = require('express');
const cors = require('cors');
const coursesRoutes = require('./src/routes/courses.routes');
const app = express();


// ============================================================================
// MIDDLEWARE
// ============================================================================


app.use(cors({
  // "origin: true" permet d'accepter toutes les origines tout en supportant les credentials
  // C'est utile si on ne connait pas l'URL Vercel à l'avance ou pour éviter les erreurs CORS 'strict'
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Parse JSON et URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging des requêtes (développement)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// ROUTES
// ============================================================================

app.use('/api/courses', coursesRoutes.router);

// Route racine - Health check
app.get('/', (req, res) => {
  res.json({
    message: 'API DocScrap',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      markdown: '/api/courses/markdown',
      convert: '/api/courses/convert'
    }
  });
});

// ============================================================================
// GESTION D'ERREURS
// ============================================================================

// 404 - Route non trouvée
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    message: `La route ${req.method} ${req.path} n'existe pas.`,
    availableRoutes: ['/', '/api/courses/markdown']
  });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('❌ Erreur non gérée:', err);

  res.status(err.status || 500).json({
    error: err.name || 'Erreur serveur',
    message: err.message || 'Une erreur interne est survenue.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;
