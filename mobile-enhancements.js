// Mobile Enhancements - Version 1.0
// Advanced mobile features: connection detection, shake gestures, FAB, optimizations

console.log('📱 Mobile Enhancements v1.0 - Loading...');

// ==========================================
// CONNECTION STATUS DETECTOR
// ==========================================

class ConnectionStatus {
    constructor() {
        this.isOnline = navigator.onLine;
        this.indicator = null;
        this.init();
    }

    init() {
        // Create status indicator
        this.createIndicator();
        
        // Listen to connection changes
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
        
        // Check initial status
        if (!this.isOnline) {
            this.showOffline();
        }
        
        console.log('🌐 Connection detector initialized');
    }

    createIndicator() {
        this.indicator = document.createElement('div');
        this.indicator.id = 'connectionIndicator';
        this.indicator.style.cssText = `
            position: fixed;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 0 0 12px 12px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: top 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        document.body.appendChild(this.indicator);
    }

    showOffline() {
        this.indicator.style.background = 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)';
        this.indicator.innerHTML = '<i class="fas fa-wifi-slash"></i> Você está offline';
        this.indicator.style.top = '0';
        
        if (window.HapticFeedback) {
            window.HapticFeedback.warning();
        }
        
        if (window.Toast) {
            window.Toast.warning('Você está offline. Algumas funcionalidades podem não estar disponíveis.');
        }
    }

    showOnline() {
        this.indicator.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
        this.indicator.innerHTML = '<i class="fas fa-wifi"></i> Conexão restabelecida';
        this.indicator.style.top = '0';
        
        if (window.HapticFeedback) {
            window.HapticFeedback.success();
        }
        
        if (window.Toast) {
            window.Toast.success('Conexão restabelecida!');
        }
        
        // Hide after 3 seconds
        setTimeout(() => {
            this.indicator.style.top = '-50px';
        }, 3000);
    }

    handleOffline() {
        this.isOnline = false;
        this.showOffline();
        console.log('📴 Conexão perdida');
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('connectionchange', { 
            detail: { online: false } 
        }));
    }

    handleOnline() {
        this.isOnline = true;
        this.showOnline();
        console.log('📶 Conexão restabelecida');
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('connectionchange', { 
            detail: { online: true } 
        }));
    }

    getStatus() {
        return this.isOnline;
    }
}

// ==========================================
// SHAKE GESTURE DETECTOR
// ==========================================

class ShakeDetector {
    constructor(options = {}) {
        this.threshold = options.threshold || 15;
        this.timeout = options.timeout || 1000;
        this.onShake = options.onShake || null;
        
        this.lastX = 0;
        this.lastY = 0;
        this.lastZ = 0;
        this.lastTime = Date.now();
        this.shakeTimeout = null;
        
        this.init();
    }

    init() {
        if ('DeviceMotionEvent' in window) {
            window.addEventListener('devicemotion', (e) => this.handleMotion(e), false);
            console.log('📳 Shake detector initialized');
        } else {
            console.warn('⚠️ DeviceMotionEvent not supported');
        }
    }

    handleMotion(event) {
        const current = Date.now();
        
        if ((current - this.lastTime) > 100) {
            const diffTime = current - this.lastTime;
            this.lastTime = current;
            
            const acceleration = event.accelerationIncludingGravity;
            if (!acceleration) return;
            
            const x = acceleration.x || 0;
            const y = acceleration.y || 0;
            const z = acceleration.z || 0;
            
            const speed = Math.abs(x + y + z - this.lastX - this.lastY - this.lastZ) / diffTime * 10000;
            
            if (speed > this.threshold) {
                this.triggerShake();
            }
            
            this.lastX = x;
            this.lastY = y;
            this.lastZ = z;
        }
    }

    triggerShake() {
        // Debounce
        if (this.shakeTimeout) return;
        
        console.log('📳 Shake detected!');
        
        if (window.HapticFeedback) {
            window.HapticFeedback.heavy();
        }
        
        if (this.onShake) {
            this.onShake();
        }
        
        // Prevent rapid triggers
        this.shakeTimeout = setTimeout(() => {
            this.shakeTimeout = null;
        }, this.timeout);
    }
}

// ==========================================
// FLOATING ACTION BUTTON (FAB)
// ==========================================

class FloatingActionButton {
    constructor(options = {}) {
        this.icon = options.icon || 'fa-plus';
        this.position = options.position || 'bottom-right';
        this.actions = options.actions || [];
        this.color = options.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        
        this.fab = null;
        this.menu = null;
        this.isOpen = false;
        
        this.init();
    }

    init() {
        this.createFAB();
        this.createMenu();
        this.attachEvents();
        console.log('🎯 FAB initialized');
    }

    createFAB() {
        this.fab = document.createElement('button');
        this.fab.id = 'fab';
        this.fab.innerHTML = `<i class="fas ${this.icon}"></i>`;
        
        const positions = {
            'bottom-right': 'bottom: 20px; right: 20px;',
            'bottom-left': 'bottom: 20px; left: 20px;',
            'top-right': 'top: 80px; right: 20px;',
            'top-left': 'top: 80px; left: 20px;'
        };
        
        this.fab.style.cssText = `
            position: fixed;
            ${positions[this.position]}
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: ${this.color};
            border: none;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 9999;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(this.fab);
    }

    createMenu() {
        this.menu = document.createElement('div');
        this.menu.id = 'fabMenu';
        this.menu.style.cssText = `
            position: fixed;
            ${this.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
            bottom: 90px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 9998;
        `;
        
        this.actions.forEach((action, index) => {
            const button = document.createElement('button');
            button.className = 'fab-action';
            button.innerHTML = `<i class="fas ${action.icon}"></i>`;
            button.style.cssText = `
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: white;
                border: none;
                box-shadow: 0 2px 12px rgba(0,0,0,0.2);
                color: #667eea;
                font-size: 18px;
                cursor: pointer;
                transition: all 0.2s;
                transform: scale(0);
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            button.addEventListener('click', () => {
                if (window.HapticFeedback) {
                    window.HapticFeedback.light();
                }
                action.onClick();
                this.close();
            });
            
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
            
            this.menu.appendChild(button);
        });
        
        document.body.appendChild(this.menu);
    }

    attachEvents() {
        this.fab.addEventListener('click', () => {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        });
        
        // Close on backdrop click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.fab.contains(e.target) && !this.menu.contains(e.target)) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.fab.style.transform = 'rotate(45deg)';
        this.menu.style.opacity = '1';
        this.menu.style.pointerEvents = 'auto';
        
        if (window.HapticFeedback) {
            window.HapticFeedback.light();
        }
        
        // Animate menu items
        const items = this.menu.querySelectorAll('.fab-action');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, index * 50);
        });
    }

    close() {
        this.isOpen = false;
        this.fab.style.transform = 'rotate(0deg)';
        
        // Animate menu items out
        const items = this.menu.querySelectorAll('.fab-action');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(0)';
            }, index * 30);
        });
        
        setTimeout(() => {
            this.menu.style.opacity = '0';
            this.menu.style.pointerEvents = 'none';
        }, items.length * 30 + 100);
    }
}

// ==========================================
// TOUCH TARGET OPTIMIZER
// ==========================================

class TouchTargetOptimizer {
    constructor() {
        this.minSize = 48; // 48x48px minimum
        this.init();
    }

    init() {
        // Add touch optimization on load
        document.addEventListener('DOMContentLoaded', () => {
            this.optimizeTargets();
            console.log('👆 Touch targets optimized');
        });
    }

    optimizeTargets() {
        // Find all interactive elements
        const interactiveElements = document.querySelectorAll(
            'button, a, input[type="button"], input[type="submit"], [role="button"], .btn'
        );
        
        interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            // Check if element is too small
            if (rect.width < this.minSize || rect.height < this.minSize) {
                // Add padding to increase touch area
                const style = window.getComputedStyle(element);
                const currentPadding = parseInt(style.padding) || 0;
                
                if (rect.height < this.minSize) {
                    const extraPadding = Math.ceil((this.minSize - rect.height) / 2);
                    element.style.paddingTop = `${currentPadding + extraPadding}px`;
                    element.style.paddingBottom = `${currentPadding + extraPadding}px`;
                }
                
                if (rect.width < this.minSize) {
                    const extraPadding = Math.ceil((this.minSize - rect.width) / 2);
                    element.style.paddingLeft = `${currentPadding + extraPadding}px`;
                    element.style.paddingRight = `${currentPadding + extraPadding}px`;
                }
            }
        });
    }
}

// ==========================================
// KEYBOARD OPTIMIZER FOR MOBILE
// ==========================================

function optimizeMobileKeyboards() {
    // Registration/matricula inputs
    document.querySelectorAll('input[name="registration"], input[id*="registration"], input[id*="matricula"]').forEach(input => {
        input.setAttribute('inputmode', 'numeric');
        input.setAttribute('pattern', '[0-9]*');
        input.setAttribute('autocomplete', 'username');
    });
    
    // Password inputs
    document.querySelectorAll('input[type="password"]').forEach(input => {
        input.setAttribute('autocomplete', 'current-password');
    });
    
    // Email inputs
    document.querySelectorAll('input[type="email"], input[name="email"]').forEach(input => {
        input.setAttribute('inputmode', 'email');
        input.setAttribute('autocomplete', 'email');
    });
    
    // Name inputs
    document.querySelectorAll('input[name="name"], input[name="nome"]').forEach(input => {
        input.setAttribute('autocomplete', 'name');
        input.setAttribute('autocapitalize', 'words');
    });
    
    // Phone inputs
    document.querySelectorAll('input[type="tel"], input[name="phone"], input[name="telefone"]').forEach(input => {
        input.setAttribute('inputmode', 'tel');
        input.setAttribute('autocomplete', 'tel');
    });
    
    console.log('⌨️ Mobile keyboards optimized');
}

// ==========================================
// AUTO-INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize connection status
    window.connectionStatus = new ConnectionStatus();
    
    // Initialize touch target optimizer
    new TouchTargetOptimizer();
    
    // Optimize keyboards
    optimizeMobileKeyboards();
    
    // Shake detector disabled to prevent accidental refreshes
    // Can be re-enabled manually if needed
    /*
    window.shakeDetector = new ShakeDetector({
        threshold: 15,
        timeout: 2000,
        onShake: () => {
            if (window.Toast) {
                window.Toast.info('Agite novamente para atualizar');
            }
            setTimeout(() => {
                window.shakeToRefresh = new ShakeDetector({
                    threshold: 15,
                    timeout: 1000,
                    onShake: () => {
                        if (window.Toast) {
                            window.Toast.success('Atualizando...');
                        }
                        setTimeout(() => window.location.reload(), 500);
                    }
                });
            }, 500);
        }
    });
    */
    
    console.log('✅ Mobile Enhancements - Loaded successfully');
});

// Export for global use
window.ConnectionStatus = ConnectionStatus;
window.ShakeDetector = ShakeDetector;
window.FloatingActionButton = FloatingActionButton;
window.TouchTargetOptimizer = TouchTargetOptimizer;
window.optimizeMobileKeyboards = optimizeMobileKeyboards;
