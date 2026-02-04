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

/**
 * GET /api/courses
 * Liste les cours disponibles dans data/processed
 */
router.get('/', (req, res) => {
    const processedDir = path.join(process.cwd(), 'data', 'processed');

    if (!fs.existsSync(processedDir)) {
        return res.json([]);
    }

    const files = fs.readdirSync(processedDir)
        .filter(file => file.endsWith('.json') || file.endsWith('.md'))
        .map(file => {
            const filePath = path.join(processedDir, file);
            const stats = fs.statSync(filePath);
            let metadata = {
                title: file.replace('.json', '').replace('.md', '').replace(/-/g, ' ').toUpperCase(),
                summary: "Pas de résumé disponible."
            };

            // Si c'est un fichier JSON généré par la nouvelle version, on lit les métadonnées
            if (file.endsWith('.json')) {
                try {
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    if (content.title) metadata.title = content.title;
                    if (content.summary) metadata.summary = content.summary;
                } catch (e) {
                    console.error(`Erreur lecture metadata ${file}`, e);
                }
            }

            return {
                id: file,
                title: metadata.title,
                summary: metadata.summary,
                type: file.endsWith('.json') ? 'json' : 'markdown',
                updatedAt: stats.mtime
            };
        });

    res.json(files);
});

/**
 * GET /api/courses/:id
 * Récupère le contenu d'un cours spécifique
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const filePath = path.join(process.cwd(), 'data', 'processed', id);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Cours non trouvé' });
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    if (id.endsWith('.json')) {
        res.json(JSON.parse(content));
    } else {
        res.send(content);
    }
});

module.exports = { router };