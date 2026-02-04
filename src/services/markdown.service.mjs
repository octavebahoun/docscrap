/**
 * Service de Conversion HTML vers Markdown Pédagogique
 * 
 * Ce service utilise l'API Groq pour transformer du contenu HTML brut
 * en documentation Markdown structurée et pédagogique.
 * 
 * @module markdown.service
 * @requires dotenv - Gestion des variables d'environnement (GROQ_API_KEY)
 * @requires @ai-sdk/groq - SDK pour l'API Groq
 * @requires ai - Générateur de texte IA
 * @requires cheerio - Parser HTML (comme jQuery côté serveur)
 */

// ============================================================================
// IMPORTS
// ============================================================================

import 'dotenv/config'; // Charge automatiquement les variables d'environnement depuis .env
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

// TEMP: Hardcoding key for test removed
// process.env.GROQ_API_KEY = "YOUR_API_KEY_HERE";

import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';


// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Configuration du service de conversion
 * Ces constantes permettent d'ajuster le comportement sans modifier le code
 */
const CONFIG = {
  // Limite de caractères pour l'input HTML (contrainte de l'API IA)
  MAX_HTML_LENGTH: 12000,

  // Modèle IA à utiliser
  AI_MODEL: 'llama-3.3-70b-versatile',

  // Fichiers d'entrée/sortie dynamiques
  name: 'fichier${Date.now()}.html',
  INPUT_FILE: 'data/raw/{name}',
  OUTPUT_DIR: 'data/processed',

  // Sélecteurs CSS pour nettoyer le HTML (éléments à supprimer)
  NOISE_SELECTORS: [
    'script',      // Scripts JavaScript
    'style',       // Styles CSS inline
    'nav',         // Menus de navigation
    'footer',      // Pieds de page
    'header',      // En-têtes de site
    'noscript',    // Contenu pour navigateurs sans JS
    'iframe',      // Frames embarquées
    'svg',         // Icônes et graphiques SVG
    '.ads',        // Publicités (classe commune)
    '.sidebar',    // Barres latérales
    '#menu',       // Menus (ID commun)
    '.cookie',     // Bannières de cookies
    '.newsletter', // Formulaires d'inscription
    'a[aria-label]', // Liens de navigation avec aria-label
    'button[aria-label]', // Boutons de navigation
    '.breadcrumb', // Fils d'Ariane
    '.pagination', // Pagination
  ],

  // Sélecteurs pour extraire le contenu principal (par ordre de priorité)
  CONTENT_SELECTORS: ['article', 'main', 'body'],
};

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Nettoie le HTML en supprimant les éléments parasites
 * 
 * @param {string} htmlContent - Contenu HTML brut
 * @returns {string} HTML nettoyé contenant uniquement le contenu principal
 * 
 * @example
 * const cleanHtml = cleanHtmlContent('<html><nav>Menu</nav><article>Contenu</article></html>');
 * // Retourne: '<article>Contenu</article>'
 */
function cleanHtmlContent(htmlContent) {
  // Charger le HTML avec Cheerio (permet de manipuler le DOM comme avec jQuery)
  const $ = cheerio.load(htmlContent);

  // Supprimer tous les éléments parasites définis dans la config
  $(CONFIG.NOISE_SELECTORS.join(', ')).remove();

  // Extraire le contenu principal en testant les sélecteurs par ordre de priorité
  // L'opérateur || permet de tester plusieurs sélecteurs jusqu'à trouver du contenu
  let cleanHtml = null;
  for (const selector of CONFIG.CONTENT_SELECTORS) {
    cleanHtml = $(selector).html();
    if (cleanHtml) break; // Arrêter dès qu'on trouve du contenu
  }

  // Si aucun sélecteur n'a fonctionné, retourner le HTML complet (fallback)
  return cleanHtml || htmlContent;
}

/**
 * Tronque le HTML à une longueur maximale pour respecter les limites de l'API
 * 
 * @param {string} html - HTML à tronquer
 * @param {number} maxLength - Longueur maximale en caractères
 * @returns {string} HTML tronqué
 */
function truncateHtml(html, maxLength = CONFIG.MAX_HTML_LENGTH) {
  if (html.length <= maxLength) {
    return html;
  }

  console.warn(`⚠️  HTML tronqué de ${html.length} à ${maxLength} caractères`);
  return html.slice(0, maxLength);
}

/**
 * Génère le prompt optimisé pour l'IA avec les instructions pédagogiques
 * 
 * @param {string} htmlContent - Contenu HTML à convertir
 * @returns {string} Prompt formaté pour l'IA
 */
function generatePrompt(htmlContent) {
  return `# RÔLE
Tu es un Expert en Ingénierie Pédagogique et en structuration de données.

# MISSION
Transforme cette documentation technique HTML en un objet JSON structuré contenant le cours, un résumé et une table des matières.

# FORMAT DE SORTIE ATTENDU (JSON UNIQUEMENT)
Tu dois répondre UNIQUEMENT avec un objet JSON valide suivant cette structure, sans texte avant ni après :
{
  "title": "Titre du cours (court et précis)",
  "summary": "Une méta-description engageante de 150-160 caractères max, optimisée pour le SEO et donnant envie de lire.",
  "toc": [
    { "level": 1, "title": "Titre section 1", "anchor": "#titre-section-1" },
    { "level": 2, "title": "Sous-titre 1.1", "anchor": "#sous-titre-1-1" }
  ],
  "content": "Le contenu du cours au format Markdown stringifié..."
}

# STRUCTURE DU CONTENU MARKDOWN ("content")

## 1. Introduction (obligatoire)
- Explique le "Pourquoi" : À quoi sert ce concept ?
... (reste des instructions inchangé)

# CONTENU HTML À TRAITER
${htmlContent}

# INSTRUCTIONS FINALES
1. Ignore tout le bruit HTML.
2. Génère une "toc" (table des matières) cohérente avec les titres du Markdown.
3. Rédige un "summary" accrocheur.
4. Produis un JSON valide.
`;
}

// ============================================================================
// FONCTION PRINCIPALE
// ============================================================================

/**
 * Convertit du HTML en Markdown pédagogique via l'API Groq
 * 
 * @param {string} htmlContent - Contenu HTML brut à convertir
 * @returns {Promise<string>} Markdown généré
 * @throws {Error} Si l'API Groq échoue ou si le HTML est invalide
 * 
 * @example
 * const markdown = await htmlToMarkdown('<h1>Titre</h1><p>Contenu</p>');
 */
async function htmlToMarkdown(htmlContent) {
  console.log('🧹 Nettoyage du HTML...');

  // Étape 1 : Nettoyer le HTML (supprimer les éléments parasites)
  const cleanHtml = cleanHtmlContent(htmlContent);

  // Étape 2 : Tronquer si nécessaire (limite de l'API)
  const truncatedHtml = truncateHtml(cleanHtml);

  // Afficher un aperçu du HTML nettoyé (utile pour le debug)
  console.log('📄 Aperçu du HTML nettoyé:');
  console.log(truncatedHtml.slice(0, 500) + '...\n');

  console.log('🤖 Génération du JSON (Cours + Méta) avec l\'IA...');

  // Étape 3 : Générer le prompt et appeler l'API Groq
  const prompt = generatePrompt(truncatedHtml);

  try {
    const { text } = await generateText({
      model: groq(CONFIG.AI_MODEL),
      prompt: prompt,
    });

    // Extraction du JSON (au cas où l'IA bavarde autour)
    let jsonResponse;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Pas de JSON valide trouvé");
      }
    } catch (e) {
      console.warn("⚠️ Echec du parsing JSON direct. Tentative de fallback ou sauvegarde brute.");
      // Fallback: Si le JSON est cassé, on sauvegarde quand même le texte brut dans content
      jsonResponse = {
        title: "Cours généré (Erreur Parsing)",
        summary: "Erreur lors de la génération des métadonnées.",
        toc: [],
        content: text
      };
    }

    // Génération d'un nom de fichier propre
    const safeTitle = jsonResponse.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `course-${Date.now()}`;

    // Étape 4 : Sauvegarder le résultat dans data/processed
    const outputDir = path.join(process.cwd(), CONFIG.OUTPUT_DIR);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${safeTitle}.json`);

    // Ajout de métadonnées système
    const finalData = {
      id: `${safeTitle}.json`,
      createdAt: new Date().toISOString(),
      ...jsonResponse
    };

    fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2), 'utf-8');

    console.log(`✅ Conversion terminée ! Fichier sauvegardé : ${outputPath}`);
    return finalData;

  } catch (apiError) {
    // Gestion spécifique des erreurs de l'API
    console.error('❌ Erreur lors de l\'appel à l\'API Groq:', apiError);
    throw new Error(`API Groq: ${apiError.message}`);
  }
}

export { htmlToMarkdown, CONFIG };



//Test API
