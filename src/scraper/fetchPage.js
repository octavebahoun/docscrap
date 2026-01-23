/**
 * Récupère le HTML brut d'une page web
 */

// src/scraper/fetchPage.js

const axios = require('axios')
const fs = require('fs')
const path = require('path')

const fetchPage = async (url) => {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Erreur lors de la récupération de la page");
    }

    const html = response.data;

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

    console.log("HTML brut récupéré avec succès");
    return html;
  } catch (error) {
    console.error("Erreur scraping ", error.message);
    throw error;
  }
};


module.exports = fetchPage;