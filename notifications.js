// Push Notifications and Badges System - Version 1.0
// Handles push notifications, badges, and in-app notifications

console.log('🔔 Notifications Module v1.0 - Loading...');

// ==========================================
// NOTIFICATION PERMISSION MANAGER
// ==========================================

const NotificationManager = {
    // Check if notifications are supported
    isSupported: () => {
        return 'Notification' in window && 'serviceWorker' in navigator;
    },

    // Get current permission status
    getPermission: () => {
        if (!NotificationManager.isSupported()) return 'denied';
        return Notification.permission;
    },

    // Request notification permission
    requestPermission: async () => {
        if (!NotificationManager.isSupported()) {
            console.warn('Notifications not supported');
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        if (Notification.permission === 'denied') {
            return false;
        }

        try {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    },

    // Show browser notification
    show: async (title, options = {}) => {
        if (!NotificationManager.isSupported()) return null;

        // Request permission if needed
        const hasPermission = await NotificationManager.requestPermission();
        if (!hasPermission) return null;

        const defaultOptions = {
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            vibrate: [200, 100, 200],
            tag: 'cirurgias-cec',
            requireInteraction: false,
            ...options
        };

        try {
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                // Use service worker for persistent notifications
                const registration = await navigator.serviceWorker.ready;
                return await registration.showNotification(title, defaultOptions);
            } else {
                // Fallback to regular notification
                return new Notification(title, defaultOptions);
            }
        } catch (error) {
            console.error('Error showing notification:', error);
            return null;
        }
    }
};

// ==========================================
// IN-APP TOAST NOTIFICATIONS
// ==========================================

const Toast = {
    container: null,

    // Initialize toast container
    init: () => {
        if (Toast.container) return;

        Toast.container = document.createElement('div');
        Toast.container.id = 'toast-container';
        Toast.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(Toast.container);
    },

    // Show toast notification
    show: (message, type = 'info', duration = 3000) => {
        Toast.init();

        // CRITICAL FIX: Ensure message is always a string
        let messageText = '';
        if (typeof message === 'string') {
            messageText = message;
        } else if (message && typeof message === 'object') {
            // If it's an object or HTML element, convert to string safely
            messageText = message.toString();
            // If it's still showing "[object Something]", try to extract text
            if (messageText.includes('[object')) {
                if (message.textContent) {
                    messageText = message.textContent;
                } else if (message.message) {
                    messageText = message.message;
                } else {
                    messageText = 'Erro desconhecido';
                }
            }
        } else {
            messageText = String(message || 'Erro desconhecido');
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        const colors = {
            success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            error: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            warning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };

        toast.style.cssText = `
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            max-width: 400px;
            pointer-events: auto;
            animation: slideInRight 0.3s ease-out, fadeOut 0.3s ease-in ${duration - 300}ms forwards;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: 500;
        `;

        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info}" style="font-size: 20px;"></i>
            <span style="flex: 1;">${messageText}</span>
            <button onclick="this.parentElement.remove()" style="
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            ">
                <i class="fas fa-times" style="font-size: 12px;"></i>
            </button>
        `;

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateX(400px);
                }
            }
        `;
        if (!document.getElementById('toast-styles')) {
            style.id = 'toast-styles';
            document.head.appendChild(style);
        }

        Toast.container.appendChild(toast);

        // Haptic feedback
        if (window.HapticFeedback) {
            if (type === 'success') window.HapticFeedback.success();
            else if (type === 'error') window.HapticFeedback.error();
            else if (type === 'warning') window.HapticFeedback.warning();
            else window.HapticFeedback.light();
        }

        // Auto remove
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, duration);

        return toast;
    },

    success: (message, duration) => Toast.show(message, 'success', duration),
    error: (message, duration) => Toast.show(message, 'error', duration),
    warning: (message, duration) => Toast.show(message, 'warning', duration),
    info: (message, duration) => Toast.show(message, 'info', duration)
};

// ==========================================
// BADGE API (for app icon badge count)
// ==========================================

const BadgeManager = {
    // Check if Badge API is supported
    isSupported: () => {
        return 'setAppBadge' in navigator && 'clearAppBadge' in navigator;
    },

    // Set badge count
    set: async (count) => {
        if (!BadgeManager.isSupported()) {
            console.warn('Badge API not supported');
            return false;
        }

        try {
            if (count > 0) {
                await navigator.setAppBadge(count);
            } else {
                await navigator.clearAppBadge();
            }
            return true;
        } catch (error) {
            console.error('Error setting badge:', error);
            return false;
        }
    },

    // Clear badge
    clear: async () => {
        if (!BadgeManager.isSupported()) return false;

        try {
            await navigator.clearAppBadge();
            return true;
        } catch (error) {
            console.error('Error clearing badge:', error);
            return false;
        }
    },

    // Increment badge count
    increment: async () => {
        const current = parseInt(localStorage.getItem('badgeCount') || '0');
        const newCount = current + 1;
        localStorage.setItem('badgeCount', newCount.toString());
        return await BadgeManager.set(newCount);
    },

    // Decrement badge count
    decrement: async () => {
        const current = parseInt(localStorage.getItem('badgeCount') || '0');
        const newCount = Math.max(0, current - 1);
        localStorage.setItem('badgeCount', newCount.toString());
        return await BadgeManager.set(newCount);
    }
};

// ==========================================
// NOTIFICATION TEMPLATES
// ==========================================

const NotificationTemplates = {
    // Surgery validated
    surgeryValidated: (surgeryData) => {
        return {
            title: '✅ Cirurgia Validada!',
            body: `Sua cirurgia foi validada por ${surgeryData.validated_by || 'coordenador'}.`,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            tag: 'surgery-validated',
            data: { type: 'surgery_validated', id: surgeryData.id }
        };
    },

    // Surgery rejected
    surgeryRejected: (surgeryData) => {
        return {
            title: '❌ Cirurgia Rejeitada',
            body: `Sua cirurgia foi rejeitada. Motivo: ${surgeryData.validation_notes || 'Não especificado'}`,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            tag: 'surgery-rejected',
            requireInteraction: true,
            data: { type: 'surgery_rejected', id: surgeryData.id }
        };
    },

    // Module validated
    moduleValidated: (moduleData) => {
        return {
            title: '✅ Módulo Validado!',
            body: `Seu módulo ${moduleData.module_type === 'pratico' ? 'prático' : 'teórico'} foi validado.`,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            tag: 'module-validated',
            data: { type: 'module_validated', id: moduleData.id }
        };
    },

    // Goal achieved
    goalAchieved: (hours) => {
        return {
            title: '🎉 Parabéns!',
            body: `Você completou ${hours} horas! Meta atingida!`,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            tag: 'goal-achieved',
            requireInteraction: true,
            vibrate: [200, 100, 200, 100, 200],
            data: { type: 'goal_achieved', hours }
        };
    }
};

// ==========================================
// AUTO-INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize toast system
    Toast.init();

    // Request notification permission on first visit (if not already set)
    if (NotificationManager.getPermission() === 'default') {
        // Show a friendly prompt first
        const shouldAsk = confirm('Deseja receber notificações sobre validações de cirurgias e módulos?');
        if (shouldAsk) {
            await NotificationManager.requestPermission();
        }
    }

    console.log('✅ Notifications Module - Loaded successfully');
    console.log('🔔 Notification Permission:', NotificationManager.getPermission());
    console.log('🔢 Badge API:', BadgeManager.isSupported() ? 'Supported' : 'Not supported');
});

// Export for use in other modules
window.NotificationManager = NotificationManager;
window.Toast = Toast;
window.BadgeManager = BadgeManager;
window.NotificationTemplates = NotificationTemplates;

// Add global notification shortcuts
window.showSuccess = (message) => Toast.success(message);
window.showError = (message) => Toast.error(message);
window.showWarning = (message) => Toast.warning(message);
window.showInfo = (message) => Toast.info(message);
