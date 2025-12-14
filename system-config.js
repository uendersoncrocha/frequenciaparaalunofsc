/**
 * CONFIGURAÇÃO DO SISTEMA
 * Sistema de Controle de Cirurgias Cardiovasculares
 * Versão: 1.0
 */

const SYSTEM_CONFIG = {
    // Informações do Sistema
    app: {
        name: 'Sistema de Controle de Cirurgias',
        shortName: 'SCC',
        version: '1.0.0',
        description: 'Controle de Cirurgias Cardiovasculares',
    },

    // Metas e Objetivos
    goals: {
        totalHours: 800,
        requiredSurgeries: 0, // Sem limite mínimo
    },

    // URLs do Sistema
    urls: {
        login: '/login.html',
        index: '/index.html',
        adminLogin: '/admin-login.html',
        admin: '/admin.html',
    },

    // Configurações de Sessão
    session: {
        duration: 7 * 24 * 60 * 60 * 1000, // 7 dias em milissegundos
        cookieName: 'surgerySystemSession',
    },

    // Configurações de Upload
    upload: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
        allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
    },

    // Configurações de Validação
    validation: {
        minPasswordLength: 6,
        passwordChangeRequired: true,
    },

    // Administradores
    admins: [
        {
            username: 'Uenderson',
            name: 'Uenderson',
            role: 'Coordenador',
        },
        {
            username: 'Daize Santa Rosa',
            name: 'Daize Santa Rosa',
            role: 'Coordenadora',
        },
    ],

    // Turmas Disponíveis
    classes: ['2024.1', '2024.2', '2025.1', '2025.2'],

    // Tipos de Cirurgia
    surgeryTypes: [
        'Revascularização do Miocárdio',
        'Troca Valvar',
        'Aneurisma',
        'Correção de Cardiopatia Congênita',
        'Transplante Cardíaco',
        'Cirurgia de Aorta',
        'Outros',
    ],

    // Tipos de Módulo
    moduleTypes: {
        teorico: 'Teórico',
        pratico: 'Prático',
    },

    // Status de Validação
    validationStatus: {
        pending: null,
        approved: true,
        rejected: false,
    },

    // Configurações de PWA
    pwa: {
        enabled: true,
        themeColor: '#667eea',
        backgroundColor: '#764ba2',
    },
};

// Exportar configuração (se usando módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SYSTEM_CONFIG;
}
