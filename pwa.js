// PWA Registration and Management - Version 4.2

// Check if Service Workers are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        registerServiceWorker();
        setupInstallPrompt();
        checkForUpdates();
    });
}

// Register Service Worker
async function registerServiceWorker() {
    try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('✅ Service Worker registrado com sucesso:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('🔄 Nova versão do Service Worker encontrada');

            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('📦 Nova versão disponível');
                    showUpdateNotification();
                }
            });
        });
    } catch (error) {
        console.error('❌ Falha ao registrar Service Worker:', error);
    }
}

// Setup install prompt
let deferredPrompt;

function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('📲 PWA pode ser instalado');
        
        // Prevent the default prompt
        e.preventDefault();
        
        // Store the event for later use
        deferredPrompt = e;
        
        // Show install button
        showInstallButton();
    });

    // Detect if app was installed
    window.addEventListener('appinstalled', () => {
        console.log('🎉 PWA instalado com sucesso!');
        deferredPrompt = null;
        hideInstallButton();
        
        // Show success message
        if (typeof showSuccessMessage === 'function') {
            showSuccessMessage('App instalado com sucesso! 🎉');
        }
    });
}

// Show install button
function showInstallButton() {
    // Check if install banner already exists
    let installBanner = document.getElementById('pwa-install-banner');
    
    if (!installBanner) {
        // Create install banner
        installBanner = document.createElement('div');
        installBanner.id = 'pwa-install-banner';
        installBanner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white rounded-lg shadow-2xl p-4 z-50 animate-slide-up';
        installBanner.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <i class="fas fa-mobile-alt text-white text-xl"></i>
                    </div>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-gray-900 mb-1">Instalar App</h3>
                    <p class="text-sm text-gray-600 mb-3">Adicione à tela inicial para acesso rápido e uso offline!</p>
                    <div class="flex gap-2">
                        <button id="pwa-install-btn" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition">
                            <i class="fas fa-download mr-1"></i>Instalar
                        </button>
                        <button id="pwa-dismiss-btn" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition">
                            Agora não
                        </button>
                    </div>
                </div>
                <button id="pwa-close-btn" class="flex-shrink-0 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(installBanner);
        
        // Add event listeners
        document.getElementById('pwa-install-btn').addEventListener('click', installPWA);
        document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
            hideInstallButton();
            // Show again after 7 days
            localStorage.setItem('pwa-dismiss-time', Date.now());
        });
        document.getElementById('pwa-close-btn').addEventListener('click', hideInstallButton);
    }
    
    // Check if user dismissed recently (within 7 days)
    const dismissTime = localStorage.getItem('pwa-dismiss-time');
    if (dismissTime) {
        const daysSinceDismiss = (Date.now() - parseInt(dismissTime)) / (1000 * 60 * 60 * 24);
        if (daysSinceDismiss < 7) {
            return; // Don't show yet
        }
    }
    
    installBanner.style.display = 'block';
}

// Hide install button
function hideInstallButton() {
    const installBanner = document.getElementById('pwa-install-banner');
    if (installBanner) {
        installBanner.style.display = 'none';
    }
}

// Install PWA
async function installPWA() {
    if (!deferredPrompt) {
        console.log('❌ Prompt de instalação não disponível');
        return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`👤 Escolha do usuário: ${outcome}`);

    if (outcome === 'accepted') {
        console.log('✅ Usuário aceitou instalar o PWA');
    } else {
        console.log('❌ Usuário recusou instalar o PWA');
    }

    // Clear the deferred prompt
    deferredPrompt = null;
    hideInstallButton();
}

// Show update notification
function showUpdateNotification() {
    // Check if update banner already exists
    let updateBanner = document.getElementById('pwa-update-banner');
    
    if (!updateBanner) {
        updateBanner = document.createElement('div');
        updateBanner.id = 'pwa-update-banner';
        updateBanner.className = 'fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-blue-600 text-white rounded-lg shadow-2xl p-4 z-50';
        updateBanner.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                    <i class="fas fa-sync-alt text-2xl"></i>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold mb-1">Nova Versão Disponível!</h3>
                    <p class="text-sm mb-3">Uma atualização está pronta para ser instalada.</p>
                    <button id="pwa-update-btn" class="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">
                        <i class="fas fa-redo mr-1"></i>Atualizar Agora
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(updateBanner);
        
        document.getElementById('pwa-update-btn').addEventListener('click', () => {
            // Send message to service worker to skip waiting
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
            }
            // Close notification
            updateBanner.remove();
            // Show success message
            if (window.showSuccess) {
                window.showSuccess('Atualização será aplicada na próxima visita');
            }
        });
    }
}

// Check for updates periodically - DISABLED to prevent reload loops
// Updates will be checked only on page load
function checkForUpdates() {
    // Disabled automatic checks to prevent infinite reload loops
    // Service worker will update naturally on next page load
    console.log('✅ PWA Manager carregado (v4.2) - Auto-update disabled');
}

// Check if running as PWA (standalone mode)
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
}

// Show different UI if running as PWA
if (isPWA()) {
    console.log('📱 Executando como PWA');
    document.body.classList.add('pwa-mode');
} else {
    console.log('🌐 Executando no navegador');
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-up {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .animate-slide-up {
        animation: slide-up 0.3s ease-out;
    }
    
    #pwa-install-banner,
    #pwa-update-banner {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Export functions for external use
window.PWA = {
    isPWA,
    showInstallButton,
    hideInstallButton,
    installPWA
};

console.log('✅ PWA Manager carregado (v4.2)');
