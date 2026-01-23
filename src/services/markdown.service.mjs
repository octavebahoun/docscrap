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
  AI_MODEL: 'meta-llama/llama-4-scout-17b-16e-instruct',

  // Fichiers d'entrée/sortie par défaut
  INPUT_FILE: 'data/raw/last-fetched.html',
  OUTPUT_FILE: 'data/output/course.md',

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
Tu es un Expert en Ingénierie Pédagogique spécialisé dans le développement logiciel.

# MISSION
Transforme cette documentation technique HTML en un cours Markdown structuré, progressif et accessible pour des étudiants débutants/intermédiaires.

# STRUCTURE DU COURS (À RESPECTER STRICTEMENT)

## 1. Introduction (obligatoire)
- Explique le "Pourquoi" : À quoi sert ce concept ?
- Contexte d'utilisation réel
- Bénéfices concrets pour le développeur

## 2. Concepts Fondamentaux
Pour chaque concept :
- **Définition simple** (1-2 phrases)
- **Analogie du quotidien** (rendre le concept tangible)
- **Exemple de code minimal** avec commentaires en français
- **Explication ligne par ligne** du code

## 3. Mise en Pratique
- Cas d'usage réels et progressifs (du simple au complexe)
- Code commenté avec explications détaillées
- Points d'attention (> 💡 **Note :** ...)
- Pièges courants à éviter (> ⚠️ **Attention :** ...)

## 4. Exercices Pratiques (obligatoire)
Crée 3 exercices progressifs :
- **Défi 1 (Fondamentaux)** : Modifier un code existant pour changer un comportement simple.
- **Défi 2 (Logique)** : Implémenter une petite fonctionnalité de zéro en combinant deux notions vues plus haut.
- **Défi 3 (Mini-projet)** : Résoudre un problème concret (ex: filtrage de liste, gestion d'état complexe).

**Format des exercices :**
1. Énoncé avec contexte "métier" (ex: "Tu travailles sur une app de e-commerce...").
2. Contraintes techniques (ex: "N'utilise pas la méthode .map()").
3. Solution cachée sous une balise Markdown : 

## 5. Récapitulatif (obligatoire)
- Liste à puces des points clés à retenir
- Liens avec d'autres concepts (si pertinent)

# RÈGLES DE FORMATAGE MARKDOWN

## Titres
- H1 (#) : Titre principal du module
- H2 (##) : Grandes sections
- H3 (###) : Sous-sections techniques

## Code
\`\`\`javascript
// Toujours indiquer le langage
// Commenter les lignes importantes en français
function exemple() {
  // Explication de ce que fait cette ligne
  return "résultat";
}
\`\`\`

## Mise en Évidence
- **Gras** : Termes techniques importants (définis à la première occurrence)
- *Italique* : Emphase légère
- \`code inline\` : Noms de variables, fonctions, propriétés

## Blocs Spéciaux
- \`> 💡 **Note :**\` pour les astuces
- \`> ⚠️ **Attention :**\` pour les pièges
- \`> 🎯 **Objectif :**\` pour les objectifs d'apprentissage

# RÈGLES DE RÉDACTION

## Langue et Ton
- ✅ Français pédagogique, encourageant et professionnel
- ✅ Tutoiement ("tu") pour créer la proximité
- ✅ Phrases courtes et claires (max 20 mots)
- ✅ Vocabulaire accessible avec explications des termes techniques

## Termes Techniques
- Garde en anglais : Hook, Promise, Middleware, Component, Props, State
- Traduis : fonction, variable, tableau, objet, boucle
- **Définis en gras** à la première occurrence : **Hook** (crochet permettant...)

## À Éviter Absolument
- ❌ Répétitions inutiles
- ❌ Digressions hors sujet
- ❌ Jargon non expliqué
- ❌ Exemples trop complexes sans progression
- ❌ Code sans commentaires

## Progression Pédagogique
1. Partir du connu vers l'inconnu
2. Un concept à la fois
3. Exemples avant théorie complexe
4. Validation par exercices

# CONTENU HTML À TRAITER
${htmlContent}

# INSTRUCTIONS FINALES
1. Ignore tout le bruit HTML (menus, footers, publicités)
2. Extrait uniquement le contenu pédagogique pertinent
3. Réorganise logiquement si nécessaire
4. Produis un cours **complet, autonome et prêt à l'emploi**
5. Assure-toi que chaque section apporte de la valeur

Commence maintenant la conversion en Markdown.`;
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

  console.log('🤖 Génération du Markdown avec l\'IA...');

  // Étape 3 : Générer le prompt et appeler l'API Groq
  const prompt = generatePrompt(truncatedHtml);

  try {
    const { text } = await generateText({
      model: groq(CONFIG.AI_MODEL),
      prompt: prompt,
    });

    // Étape 4 : Sauvegarder le résultat
    const outputPath = path.join(process.cwd(), CONFIG.OUTPUT_FILE);
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, text, 'utf-8');

    console.log(`✅ Conversion terminée ! Fichier sauvegardé : ${outputPath}`);
    return text;

  } catch (apiError) {
    // Gestion spécifique des erreurs de l'API
    console.error('❌ Erreur lors de l\'appel à l\'API Groq:');
    throw new Error(`API Groq: ${apiError.message}`);
  }
}

export { htmlToMarkdown, CONFIG };



//Test API





