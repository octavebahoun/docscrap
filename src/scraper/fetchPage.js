/**
 * Récupère le HTML brut d'une page web
 */

// src/scraper/fetchPage.js

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const fetchPage = async (url) => {
  let browser = null;
  try {
    // Lancement du navigateur
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
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