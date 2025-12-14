// ============================================
// NAVIGATION COMPONENT - Version 1.0
// Sistema de navegação consistente e reutilizável
// ============================================

console.log('🧭 Carregando componente de navegação...');

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

/**
 * Função de logout com confirmação
 */
function confirmLogout() {
    if (confirm('Tem certeza que deseja sair do sistema?\n\nVocê precisará fazer login novamente para acessar.')) {
        console.log('👋 Usuário confirmou logout');
        logout();
    } else {
        console.log('❌ Logout cancelado pelo usuário');
    }
}

/**
 * Função de voltar com lógica inteligente
 */
function goBack() {
    // Se há histórico, volta uma página
    if (window.history.length > 1) {
        console.log('⬅️ Voltando para página anterior');
        window.history.back();
    } else {
        // Se não há histórico, vai para index.html
        console.log('🏠 Redirecionando para página inicial');
        window.location.href = 'index.html';
    }
}

// ============================================
// NAVIGATION BAR GENERATOR
// ============================================

/**
 * Gera barra de navegação consistente
 * @param {Object} options - Configurações da barra
 * @returns {string} HTML da barra de navegação
 */
function generateNavigationBar(options = {}) {
    const defaults = {
        showBackButton: true,
        showRegisterButton: true,
        showAdminButton: true,
        showUserInfo: true,
        showLogoutButton: true,
        currentPage: '',
        adminMode: false
    };
    
    const config = { ...defaults, ...options };
    
    let html = `
        <div class="glass-effect rounded-xl p-4 mb-6">
            <div class="flex flex-wrap gap-3 justify-between items-center">
                <div class="flex flex-wrap gap-3">`;
    
    // Botão Voltar
    if (config.showBackButton) {
        html += `
                    <button onclick="goBack()" class="bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition flex items-center gap-2">
                        <i class="fas fa-arrow-left"></i>
                        <span>Voltar</span>
                    </button>`;
    }
    
    // Botão Registrar Cirurgia
    if (config.showRegisterButton) {
        const isActive = config.currentPage === 'register';
        html += `
                    <a href="${config.adminMode ? 'index.html' : 'index.html'}" class="${isActive ? 'btn-primary' : 'bg-gray-700 hover:bg-gray-800'} text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                        <i class="fas fa-plus-circle"></i>
                        <span class="hidden sm:inline">Registrar Cirurgia</span>
                        <span class="sm:hidden">Registrar</span>
                    </a>`;
    }
    
    // Botão Administração
    if (config.showAdminButton) {
        const isActive = config.currentPage === 'admin';
        const adminUrl = config.adminMode ? 'admin.html' : 'admin-login.html';
        html += `
                    <a href="${adminUrl}" class="${isActive ? 'btn-primary' : 'bg-gray-700 hover:bg-gray-800'} text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                        <i class="fas fa-chart-bar"></i>
                        <span class="hidden sm:inline">Administração</span>
                        <span class="sm:hidden">Admin</span>
                    </a>`;
    }
    
    html += `
                </div>
                <div class="flex items-center gap-3 flex-wrap">`;
    
    // Informações do usuário
    if (config.showUserInfo) {
        html += `
                    <span id="userInfo" class="text-gray-700 font-semibold bg-white px-3 py-2 rounded-lg shadow-sm flex items-center gap-2">
                        <i class="fas fa-user-circle"></i>
                        <span id="userName" class="hidden sm:inline"></span>
                    </span>`;
    }
    
    // Botão Logout
    if (config.showLogoutButton) {
        const logoutFunction = config.adminMode ? 'logoutAdmin()' : 'confirmLogout()';
        const logoutText = config.adminMode ? 'Sair do Admin' : 'Sair';
        html += `
                    <button onclick="${logoutFunction}" class="bg-red-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-600 transition shadow-md hover:shadow-lg flex items-center gap-2">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>${logoutText}</span>
                    </button>`;
    }
    
    html += `
                </div>
            </div>
        </div>`;
    
    return html;
}

/**
 * Injeta a barra de navegação no elemento especificado
 */
function injectNavigationBar(elementId, options = {}) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = generateNavigationBar(options);
        console.log('✅ Barra de navegação injetada em:', elementId);
    } else {
        console.warn('⚠️ Elemento não encontrado:', elementId);
    }
}

/**
 * Atualiza informações do usuário na barra de navegação
 */
function updateUserInfo() {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        const loggedUser = getLoggedInUser ? getLoggedInUser() : null;
        if (loggedUser) {
            userNameElement.textContent = loggedUser.name;
            console.log('✅ Informações do usuário atualizadas:', loggedUser.name);
        }
    }
}

// ============================================
// MOBILE NAVIGATION ENHANCEMENT
// ============================================

/**
 * Adiciona comportamento de navegação mobile-friendly
 */
function enhanceMobileNavigation() {
    // Detectar se está em dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        console.log('📱 Dispositivo móvel detectado - aplicando melhorias');
        
        // Adicionar classe especial ao body
        document.body.classList.add('mobile-device');
        
        // Melhorar toque em botões
        document.querySelectorAll('button, a').forEach(element => {
            element.style.minHeight = '44px'; // Tamanho mínimo recomendado para toque
        });
    }
}

// ============================================
// ADMIN LOGOUT FUNCTION
// ============================================

/**
 * Função de logout administrativa com confirmação
 */
function logoutAdmin() {
    if (confirm('Tem certeza que deseja sair do painel administrativo?\n\nVocê precisará fazer login novamente para acessar.')) {
        console.log('👋 Admin confirmou logout');
        localStorage.removeItem('adminSession');
        window.location.href = 'admin-login.html';
    } else {
        console.log('❌ Logout admin cancelado pelo usuário');
    }
}

// ============================================
// BREADCRUMB SYSTEM
// ============================================

/**
 * Gera breadcrumb de navegação
 */
function generateBreadcrumb(pages) {
    let html = '<nav class="text-sm mb-4"><ol class="flex flex-wrap items-center gap-2">';
    
    pages.forEach((page, index) => {
        const isLast = index === pages.length - 1;
        
        if (isLast) {
            html += `
                <li class="text-gray-600 font-semibold">
                    <i class="fas fa-${page.icon} mr-1"></i>${page.name}
                </li>`;
        } else {
            html += `
                <li>
                    <a href="${page.url}" class="text-purple-600 hover:text-purple-800 hover:underline">
                        <i class="fas fa-${page.icon} mr-1"></i>${page.name}
                    </a>
                    <i class="fas fa-chevron-right mx-2 text-gray-400"></i>
                </li>`;
        }
    });
    
    html += '</ol></nav>';
    return html;
}

// ============================================
// AUTO-INITIALIZATION
// ============================================

// Executar melhorias quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        enhanceMobileNavigation();
        console.log('✅ Navegação mobile aprimorada');
    });
} else {
    enhanceMobileNavigation();
    console.log('✅ Navegação mobile aprimorada');
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(e) {
    // Alt + B = Voltar
    if (e.altKey && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        goBack();
        console.log('⌨️ Atalho de teclado: Voltar (Alt+B)');
        return;
    }
    
    // Alt + L = Logout
    if (e.altKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        if (typeof confirmLogout === 'function') {
            confirmLogout();
        } else if (typeof logoutAdmin === 'function') {
            logoutAdmin();
        }
        console.log('⌨️ Atalho de teclado: Logout (Alt+L)');
        return;
    }
    
    // Alt + S = Salvar Registro (na página de cirurgias)
    if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        const saveRecordBtn = document.getElementById('saveRecordBtn');
        if (saveRecordBtn && !saveRecordBtn.disabled) {
            if (typeof saveSurgeryRecord === 'function') {
                saveSurgeryRecord();
                console.log('⌨️ Atalho de teclado: Salvar Registro (Alt+S)');
            }
        }
        return;
    }
    
    // Alt + P = Perfil do aluno
    if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            window.location.href = 'student-profile.html';
            console.log('⌨️ Atalho de teclado: Perfil (Alt+P)');
        }
        return;
    }
    
    // Alt + R = Registrar Cirurgia (ir para página principal)
    if (e.altKey && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        window.location.href = 'index.html';
        console.log('⌨️ Atalho de teclado: Registrar Cirurgia (Alt+R)');
        return;
    }
});

console.log('✅ Componente de navegação carregado com sucesso!');
console.log('📌 Atalhos disponíveis:');
console.log('   • Alt+B = Voltar');
console.log('   • Alt+L = Logout');
console.log('   • Alt+S = Salvar Registro');
console.log('   • Alt+P = Perfil');
console.log('   • Alt+R = Registrar Cirurgia');
