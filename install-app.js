// ============================================
// PWA INSTALL MODULE - Version 1.0
// Gerenciamento de instalação do aplicativo
// ============================================

console.log('📱 Carregando módulo de instalação PWA...');

// Global variables
let installPrompt = null;
let installButton = null;
let installButtonNav = null;

// ============================================
// CREATE INSTALL BUTTON
// ============================================

/**
 * Cria botão de instalação flutuante
 */
function createInstallButton() {
    // Check if button already exists
    if (document.getElementById('pwaInstallBtn')) return;
    
    const button = document.createElement('button');
    button.id = 'pwaInstallBtn';
    button.className = 'pwa-install-button hidden';
    button.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-download text-2xl"></i>
            <div class="text-left">
                <div class="font-bold text-sm">Instalar App</div>
                <div class="text-xs opacity-90">Acesso rápido</div>
            </div>
        </div>
    `;
    
    button.onclick = installApp;
    document.body.appendChild(button);
    installButton = button;
    
    console.log('✅ Botão de instalação criado');
}

/**
 * Adiciona estilos do botão de instalação
 */
function addInstallButtonStyles() {
    if (document.getElementById('pwaInstallStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'pwaInstallStyles';
    style.textContent = `
        .pwa-install-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 16px;
            padding: 16px 20px;
            cursor: pointer;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            animation: slideInUp 0.5s ease, pulse 2s infinite;
        }
        
        .pwa-install-button:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);
        }
        
        .pwa-install-button:active {
            transform: translateY(-2px) scale(1.02);
        }
        
        .pwa-install-button.hidden {
            display: none;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(100px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
            }
            50% {
                box-shadow: 0 8px 32px rgba(102, 126, 234, 0.8);
            }
        }
        
        /* Mobile adjustments */
        @media (max-width: 768px) {
            .pwa-install-button {
                bottom: 80px;
                right: 10px;
                padding: 12px 16px;
            }
            
            .pwa-install-button i {
                font-size: 1.25rem;
            }
            
            .pwa-install-button .font-bold {
                font-size: 0.75rem;
            }
            
            .pwa-install-button .text-xs {
                font-size: 0.625rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ============================================
// INSTALL PROMPT HANDLING
// ============================================

/**
 * Captura evento de instalação
 */
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('📲 Evento beforeinstallprompt capturado');
    
    // Prevent default browser install prompt
    e.preventDefault();
    
    // Store the event
    installPrompt = e;
    
    // Show install button
    showInstallButton();
});

/**
 * Exibe botão de instalação
 */
function showInstallButton() {
    if (!installButton) {
        createInstallButton();
    }
    
    if (installButton) {
        installButton.classList.remove('hidden');
        console.log('👁️ Botão de instalação flutuante exibido');
    }
    
    // Show navigation install button if exists
    if (!installButtonNav) {
        installButtonNav = document.getElementById('installButtonNav');
    }
    
    if (installButtonNav) {
        installButtonNav.classList.remove('hidden');
        installButtonNav.onclick = installApp;
        console.log('👁️ Botão de instalação na navegação exibido');
    }
}

/**
 * Oculta botão de instalação
 */
function hideInstallButton() {
    if (installButton) {
        installButton.classList.add('hidden');
        console.log('🙈 Botão de instalação flutuante ocultado');
    }
    
    // Hide navigation install button if exists
    if (installButtonNav) {
        installButtonNav.classList.add('hidden');
        console.log('🙈 Botão de instalação na navegação ocultado');
    }
}

// ============================================
// INSTALL APP
// ============================================

/**
 * Instala o aplicativo
 */
async function installApp() {
    if (!installPrompt) {
        console.log('⚠️ Prompt de instalação não disponível');
        showInstallInstructions();
        return;
    }
    
    console.log('🚀 Iniciando instalação...');
    
    // Show native install prompt
    installPrompt.prompt();
    
    // Wait for user choice
    const { outcome } = await installPrompt.userChoice;
    
    console.log(`👤 Escolha do usuário: ${outcome}`);
    
    if (outcome === 'accepted') {
        console.log('✅ Usuário aceitou a instalação');
        showSuccessMessage();
    } else {
        console.log('❌ Usuário recusou a instalação');
        showInstallInstructions();
    }
    
    // Clear the prompt
    installPrompt = null;
    hideInstallButton();
}

// ============================================
// APP INSTALLED
// ============================================

/**
 * Detecta quando app é instalado
 */
window.addEventListener('appinstalled', (e) => {
    console.log('🎉 App instalado com sucesso!');
    hideInstallButton();
    showSuccessMessage();
});

// ============================================
// MESSAGES AND INSTRUCTIONS
// ============================================

/**
 * Exibe mensagem de sucesso
 */
function showSuccessMessage() {
    const modal = createModal(
        '🎉 App Instalado!',
        `
        <p class="text-gray-700 mb-4">
            <strong>Parabéns!</strong> O aplicativo foi instalado com sucesso.
        </p>
        <div class="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
            <p class="text-green-800 text-sm">
                <i class="fas fa-check-circle mr-2"></i>
                <strong>Acesso Rápido:</strong> Agora você pode acessar o sistema direto da tela inicial do seu dispositivo!
            </p>
        </div>
        <ul class="text-sm text-gray-600 space-y-2 mb-4">
            <li><i class="fas fa-rocket text-purple-600 mr-2"></i>Carregamento mais rápido</li>
            <li><i class="fas fa-mobile-alt text-purple-600 mr-2"></i>Funciona como app nativo</li>
            <li><i class="fas fa-wifi text-purple-600 mr-2"></i>Acesso offline</li>
        </ul>
        `,
        [
            {
                text: 'Entendi',
                class: 'btn-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition',
                onclick: () => modal.remove()
            }
        ]
    );
    
    document.body.appendChild(modal);
}

/**
 * Exibe instruções de instalação manual
 */
function showInstallInstructions() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let instructions = '';
    
    if (isIOS) {
        instructions = `
            <h4 class="font-bold text-gray-800 mb-3"><i class="fab fa-apple mr-2"></i>Instalação no iPhone/iPad:</h4>
            <ol class="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Toque no botão <strong>Compartilhar</strong> <i class="fas fa-share text-blue-600"></i> (na barra inferior)</li>
                <li>Role para baixo e toque em <strong>"Adicionar à Tela Inicial"</strong> <i class="fas fa-plus-square text-blue-600"></i></li>
                <li>Toque em <strong>"Adicionar"</strong> no canto superior direito</li>
                <li>Pronto! O app aparecerá na sua tela inicial</li>
            </ol>
        `;
    } else if (isAndroid) {
        instructions = `
            <h4 class="font-bold text-gray-800 mb-3"><i class="fab fa-android mr-2"></i>Instalação no Android:</h4>
            <ol class="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Toque no menu <strong>⋮</strong> (três pontos) no canto superior</li>
                <li>Toque em <strong>"Instalar app"</strong> ou <strong>"Adicionar à tela inicial"</strong></li>
                <li>Confirme tocando em <strong>"Instalar"</strong></li>
                <li>Pronto! O app aparecerá na sua tela inicial</li>
            </ol>
        `;
    } else {
        instructions = `
            <h4 class="font-bold text-gray-800 mb-3"><i class="fas fa-desktop mr-2"></i>Instalação no Computador:</h4>
            <ol class="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Clique no ícone <strong>⊕</strong> ou <strong>⬇</strong> na barra de endereço</li>
                <li>Clique em <strong>"Instalar"</strong></li>
                <li>Pronto! O app aparecerá nos seus aplicativos</li>
            </ol>
            <p class="text-xs text-gray-500 mt-3">
                <i class="fas fa-info-circle mr-1"></i>
                Funciona no Chrome, Edge, e outros navegadores modernos
            </p>
        `;
    }
    
    const modal = createModal(
        '📱 Como Instalar o App',
        `
        <div class="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <p class="text-blue-800 text-sm">
                <i class="fas fa-info-circle mr-2"></i>
                <strong>Dica:</strong> Instalando o app, você terá acesso mais rápido e uma experiência melhor!
            </p>
        </div>
        ${instructions}
        <div class="mt-4 p-4 bg-purple-50 rounded-lg">
            <p class="text-sm text-purple-800">
                <i class="fas fa-star mr-2"></i>
                <strong>Benefícios:</strong> Carregamento rápido, funciona offline, notificações push
            </p>
        </div>
        `,
        [
            {
                text: 'Entendi',
                class: 'btn-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition w-full',
                onclick: () => modal.remove()
            }
        ]
    );
    
    document.body.appendChild(modal);
}

/**
 * Cria modal genérico
 */
function createModal(title, content, buttons) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    const buttonsHtml = buttons.map(btn => 
        `<button class="${btn.class}" onclick="this.closest('.fixed').remove(); ${btn.onclick ? '(' + btn.onclick.toString() + ')()' : ''}">${btn.text}</button>`
    ).join('');
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">${title}</h3>
            <div class="mb-6">${content}</div>
            <div class="flex gap-3">${buttonsHtml}</div>
        </div>
    `;
    
    // Fix button onclick
    buttons.forEach((btn, index) => {
        if (btn.onclick) {
            const buttonElement = modal.querySelectorAll('button')[index];
            buttonElement.onclick = () => {
                btn.onclick();
            };
        }
    });
    
    return modal;
}

// ============================================
// CHECK IF ALREADY INSTALLED
// ============================================

/**
 * Verifica se app já está instalado
 */
function checkIfInstalled() {
    // Check if running in standalone mode (installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('✅ App já está instalado e rodando em modo standalone');
        return true;
    }
    
    // Check iOS standalone
    if (window.navigator.standalone === true) {
        console.log('✅ App já está instalado (iOS)');
        return true;
    }
    
    console.log('ℹ️ App não está instalado');
    return false;
}

// ============================================
// SHOW INSTALL BANNER
// ============================================

/**
 * Exibe banner de instalação após delay
 */
function showInstallBanner() {
    // Don't show if already installed
    if (checkIfInstalled()) {
        console.log('⏭️ Pulando banner - app já instalado');
        return;
    }
    
    // Don't show if already dismissed recently
    const dismissed = localStorage.getItem('installBannerDismissed');
    if (dismissed) {
        const dismissedTime = parseInt(dismissed);
        const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
        
        if (daysSinceDismissed < 7) {
            console.log(`⏭️ Banner foi dispensado há ${daysSinceDismissed.toFixed(0)} dias`);
            return;
        }
    }
    
    // Show banner after 10 seconds
    setTimeout(() => {
        if (installPrompt) {
            console.log('📢 Exibindo banner de instalação');
            showInstallInstructions();
        }
    }, 10000); // 10 seconds
}

/**
 * Marca banner como dispensado
 */
function dismissInstallBanner() {
    localStorage.setItem('installBannerDismissed', Date.now().toString());
    console.log('✅ Banner de instalação marcado como dispensado');
}

// ============================================
// ADD INSTALL MENU ITEM
// ============================================

/**
 * Adiciona item "Instalar App" no menu de navegação
 */
function addInstallMenuItem() {
    // Only add on login page or index page
    const isLoginPage = window.location.pathname.includes('login.html') || window.location.pathname === '/';
    const isIndexPage = window.location.pathname.includes('index.html');
    
    if (!isLoginPage && !isIndexPage) return;
    
    // Check if already installed
    if (checkIfInstalled()) return;
    
    // Look for navigation container
    const nav = document.querySelector('.glass-effect .flex.flex-wrap.gap-3');
    if (!nav) return;
    
    // Check if button already exists
    if (document.getElementById('installMenuItem')) return;
    
    const installBtn = document.createElement('button');
    installBtn.id = 'installMenuItem';
    installBtn.className = 'bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition';
    installBtn.innerHTML = '<i class="fas fa-mobile-alt mr-2"></i>Instalar App';
    installBtn.onclick = () => {
        if (installPrompt) {
            installApp();
        } else {
            showInstallInstructions();
        }
    };
    
    nav.appendChild(installBtn);
    console.log('✅ Item "Instalar App" adicionado ao menu');
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    console.log('🚀 Inicializando módulo de instalação PWA...');
    
    // Add styles
    addInstallButtonStyles();
    
    // Create install button
    createInstallButton();
    
    // Add install menu item
    setTimeout(addInstallMenuItem, 1000);
    
    // Show install banner after delay (only if not installed)
    // showInstallBanner(); // Uncomment to enable banner
    
    console.log('✅ Módulo de instalação PWA carregado!');
}

console.log('✅ Script de instalação PWA carregado!');
