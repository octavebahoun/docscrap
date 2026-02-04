import axios from 'axios';

// En production (Vercel), on utilise l'URL HTTPS du backend Render
// En développement, on utilise le proxy Vite (pas de baseURL, les requêtes /api passent par le proxy)
const API_BASE_URL = import.meta.env.PROD
    ? 'https://docscrap.onrender.com'
    : ''; // En dev, les requêtes /api passent par le proxy Vite

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
