import axios from 'axios';

/**
 * Configuration de l'API
 * 
 * En développement: les requêtes /api passent par le proxy Vite (localhost:3000)
 * En production: on utilise l'URL du backend définie dans VITE_API_URL ou par défaut Render
 */
const API_BASE_URL = import.meta.env.PROD
    ? (import.meta.env.VITE_API_URL || 'https://docscrap.onrender.com')
    : ''; // En dev, les requêtes /api passent par le proxy Vite

console.log('🔗 API Base URL:', API_BASE_URL || 'proxy local');

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 120000, // 2 minutes pour les requêtes de scraping
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('❌ API Error:', error.message);
        if (error.code === 'ERR_NETWORK') {
            console.error('⚠️ Le backend est peut-être hors ligne. Vérifiez que le serveur est démarré.');
        }
        return Promise.reject(error);
    }
);

export default api;
