/**
 * API Configuration - Simplified v2.0
 * Configuração SIMPLES e FUNCIONAL da API
 */

console.log('🔧 API Config carregado');

// API Base URL (relativo)
const API_BASE = '';

// Build API URL
function buildApiUrl(endpoint) {
    return endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
}

// Fetch wrapper with error handling
async function apiFetch(endpoint, options = {}) {
    const url = buildApiUrl(endpoint);
    
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            console.error(`❌ API Error: ${response.status} ${response.statusText}`);
            throw new Error(`API Error: ${response.status}`);
        }
        
        return response;
    } catch (error) {
        console.error('❌ Fetch Error:', error);
        throw error;
    }
}

// Export
window.API_BASE = API_BASE;
window.buildApiUrl = buildApiUrl;
window.apiFetch = apiFetch;

console.log('✅ API Config pronto');
