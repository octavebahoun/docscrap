/**
 * Récupère le HTML brut d'une page web
 */

// src/scraper/fetchPage.js

const axios = require('axios')
const fs = require('fs')
const path = require('path')

const fetchPage = async () => {
  const url = "https://fr.react.dev/reference/react";

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Erreur lors de la récupération de la page");
    }

    const html = response.data;

    const outputPath = path.join(
      process.cwd(),
      "data",
      "raw",
      "react-hooks.html"
    );

    fs.writeFileSync(outputPath, html, "utf-8");

    console.log("HTML brut sauvegardé avec succès ✅");
  } catch (error) {
    console.error("Erreur scraping ❌", error.message);
  }
};

fetchPage();
