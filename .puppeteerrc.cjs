/**
 * Configuration Puppeteer pour Render et environnements de production
 * Ce fichier configure le chemin du cache Chrome pour Puppeteer
 */

const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    // Chemin du cache où Chrome sera installé
    cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
};
