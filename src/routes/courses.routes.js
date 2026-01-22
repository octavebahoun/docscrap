/**
 * Routes API REST pour les cours
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * GET /api/courses/markdown
 * Récupère le contenu Markdown généré
 */
router.get('/markdown', async (req, res) => {
    try {
        // Chemin vers le fichier Markdown généré
        const markdownPath = path.join(process.cwd(),'services', 'page.md');

        // Vérifier si le fichier existe
        if (!fs.existsSync(markdownPath)) {
            return res.status(404).json({
                error: 'Fichier Markdown non trouvé',
                message: 'Le fichier page.md n\'existe pas. Veuillez d\'abord exécuter la conversion HTML → Markdown.'
            });
        }

        // Lire le contenu du fichier
        const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

        // Retourner le contenu avec le bon Content-Type
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.send(markdownContent);

    } catch (error) {
        console.error('❌ Erreur lors de la lecture du fichier Markdown:', error);
        res.status(500).json({
            error: 'Erreur serveur',
            message: 'Une erreur est survenue lors de la récupération du Markdown.',
            details: error.message
        });
    }
});

/**
 * POST /api/courses/convert
 * Convertit du HTML en Markdown (future fonctionnalité)
 */
router.post('/convert', async (req, res) => {
    try {
        const { htmlContent } = req.body;

        // Validation
        if (!htmlContent) {
            return res.status(400).json({
                error: 'Paramètre manquant',
                message: 'Le paramètre htmlContent est requis.'
            });
        }

        res.status(501).json({
            error: 'Non implémenté',
            message: 'Cette fonctionnalité sera bientôt disponible.'
        });

    } catch (error) {
        console.error('❌ Erreur lors de la conversion:', error);
        res.status(500).json({
            error: 'Erreur serveur',
            message: 'Une erreur est survenue lors de la conversion.',
            details: error.message
        });
    }
});

// Export du router
module.exports = router;