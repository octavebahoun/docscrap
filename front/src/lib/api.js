import axios from 'axios';

// En production (Vercel), on utilise l'URL HTTPS du backend Render
// En développement, on reste sur localhost
const API_BASE_URL = import.meta.env.PROD
    ? 'https://docscrap.onrender.com'
    : 'http://localhost:3000'; // Fallback local

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
