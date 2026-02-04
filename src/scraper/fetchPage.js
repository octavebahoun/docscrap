/**
 * Récupère le HTML brut d'une page web
 */

// src/scraper/fetchPage.js

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

/**
 * Récupère le chemin de l'exécutable Chrome selon l'environnement
 * @returns {string|undefined} Chemin de Chrome ou undefined pour utiliser le défaut
 */
const getChromePath = () => {
  // En production sur Render, utiliser le chemin installé par puppeteer
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  // Sur Render sans variable d'env explicite, chercher dans le cache
  if (process.env.RENDER) {
    const possiblePaths = [
      '/opt/render/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome',
      '/opt/render/.cache/puppeteer/chrome/linux-130.0.6723.116/chrome-linux64/chrome',
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) return p;
    }
  }

  // En développement, laisser Puppeteer trouver Chrome automatiquement
  return undefined;
};

const fetchPage = async (url) => {
  let browser = null;
  try {
    const executablePath = getChromePath();
    console.log(`🌐 Utilisation de Chrome: ${executablePath || 'auto-détection'}`);

    // Lancement du navigateur avec configuration adaptée à Render
    browser = await puppeteer.launch({
      headless: "new",
      executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',  // Important pour Render (mémoire partagée limitée)
        '--disable-gpu',
        '--single-process',  // Réduit la consommation mémoire
        '--no-zygote'
      ]
    });

    const page = await browser.newPage();

    // User-Agent standard pour éviter certains blocages
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log(`Navigation vers ${url}...`);

    // Navigation plus souple : on attend le chargement du DOM + un délai de sécurité
    // 'networkidle2' est souvent trop strict pour les sites modernes chargés en trackers
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // Petite pause pour laisser le temps aux frameworks JS (React/Next) d'hydrater la page
    await new Promise(r => setTimeout(r, 5000));

    // Récupération du HTML complet apres execution du JS
    const html = await page.content();

    await browser.close();
    browser = null;

    // Optionnel: sauvegarder une copie locale pour le cache/debug
    const outputPath = path.join(
      process.cwd(),
      "data",
      "raw",
      "last-fetched.html"
    );

    // S'assurer que le dossier existe
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, html, "utf-8");

    console.log("HTML brut (DOM complet) récupéré avec succès");
    return html;
  } catch (error) {
    if (browser) await browser.close();
    console.error("Erreur scraping Puppeteer : ", error.message);
    throw error;
  }
};


module.exports = fetchPage;