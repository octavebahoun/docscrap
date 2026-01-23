/**
 * Routes API REST pour les cours
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const fetchPage = require('../scraper/fetchPage');

// Import dynamique du service ESM
let markdownService;
const getMarkdownService = async () => {
    if (!markdownService) {
        // En CJS, on utilise import() dynamique pour charger un module ESM
        markdownService = await import('../services/markdown.service.mjs');
    }
    return markdownService;
};

/**
 * GET /api/courses/markdown
 * Récupère le contenu Markdown généré
 */
router.get('/markdown', async (req, res) => {
    try {
        const { CONFIG } = await getMarkdownService();
        const markdownPath = path.join(process.cwd(), CONFIG.OUTPUT_FILE);

        console.log(`🔍 Lecture du Markdown à : ${markdownPath}`);

        if (!fs.existsSync(markdownPath)) {
            console.log('⚠️ Fichier non trouvé, renvoi du message d\'accueil');
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
            return res.send("# Bienvenue sur DocScrap\n\nEntrez une URL pour commencer la génération de votre cours.");
        }

        const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.send(markdownContent);

    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur', message: error.message });
    }
});

/**
 * POST /api/courses/url
 * Reçoit une URL, extrait le HTML et le convertit en Markdown
 */
router.post('/url', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL requise' });
        }

        console.log(`🔗 Traitement de l'URL : ${url}`);

        // 1. Récupérer le HTML
        const html = await fetchPage(url);

        // 2. Charger le service de conversion
        const { htmlToMarkdown } = await getMarkdownService();

        // 3. Convertir en Markdown
        // On attend la fin du processus pour informer le client
        const markdown = await htmlToMarkdown(html);

        res.status(200).json({
            message: 'Conversion réussie',
            url: url
        });

    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({
            error: 'Erreur de conversion',
            message: error.message
        });
    }
});

module.exports = { router };