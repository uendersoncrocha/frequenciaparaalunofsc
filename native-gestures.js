// Native-like Gestures and Haptic Feedback - Version 1.0
// Adds swipe gestures, pull-to-refresh, and haptic feedback for native app feel

console.log('🎯 Native Gestures Module v1.0 - Loading...');

// ==========================================
// HAPTIC FEEDBACK SYSTEM
// ==========================================

const HapticFeedback = {
    // Check if vibration is supported
    isSupported: () => {
        return 'vibrate' in navigator;
    },

    // Light tap feedback (button press)
    light: () => {
        if (HapticFeedback.isSupported()) {
            navigator.vibrate(10);
        }
    },

    // Medium feedback (selection, toggle)
    medium: () => {
        if (HapticFeedback.isSupported()) {
            navigator.vibrate(20);
        }
    },

    // Heavy feedback (important action, error)
    heavy: () => {
        if (HapticFeedback.isSupported()) {
            navigator.vibrate(50);
        }
    },

    // Success pattern
    success: () => {
        if (HapticFeedback.isSupported()) {
            navigator.vibrate([30, 50, 30]);
        }
    },

    // Error pattern
    error: () => {
        if (HapticFeedback.isSupported()) {
            navigator.vibrate([50, 100, 50, 100, 50]);
        }
    },

    // Warning pattern
    warning: () => {
        if (HapticFeedback.isSupported()) {
            navigator.vibrate([40, 80, 40]);
        }
    },

    // Notification pattern
    notification: () => {
        if (HapticFeedback.isSupported()) {
            navigator.vibrate([20, 50, 20]);
        }
    }
};

// ==========================================
// PULL TO REFRESH
// ==========================================

class PullToRefresh {
    constructor(options = {}) {
        this.element = options.element || document.body;
        this.threshold = options.threshold || 80;
        this.onRefresh = options.onRefresh || (() => window.location.reload());
        this.enabled = options.enabled !== false;
        
        this.startY = 0;
        this.currentY = 0;
        this.dragging = false;
        this.refreshing = false;
        
        this.createUI();
        this.attachEvents();
    }

    createUI() {
        // Create refresh indicator
        this.indicator = document.createElement('div');
        this.indicator.id = 'pullToRefreshIndicator';
        this.indicator.innerHTML = `
            <div class="ptr-icon">
                <i class="fas fa-arrow-down"></i>
            </div>
            <div class="ptr-text">Puxe para atualizar</div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #pullToRefreshIndicator {
                position: fixed;
                top: -80px;
                left: 0;
                right: 0;
                height: 80px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                z-index: 9999;
                transition: transform 0.2s;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            #pullToRefreshIndicator.pulling {
                transform: translateY(var(--pull-distance, 0));
            }
            
            #pullToRefreshIndicator.refreshing {
                transform: translateY(80px);
            }
            
            .ptr-icon {
                font-size: 24px;
                margin-bottom: 8px;
                transition: transform 0.3s;
            }
            
            #pullToRefreshIndicator.ready .ptr-icon {
                transform: rotate(180deg);
            }
            
            #pullToRefreshIndicator.refreshing .ptr-icon {
                animation: spin 1s linear infinite;
            }
            
            .ptr-text {
                font-size: 14px;
                font-weight: 500;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(this.indicator);
    }

    attachEvents() {
        this.element.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
        this.element.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
        this.element.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: false });
    }

    onTouchStart(e) {
        if (this.refreshing || !this.enabled) return;
        
        // Only activate if at top of page
        if (window.scrollY === 0) {
            this.startY = e.touches[0].pageY;
            this.dragging = true;
        }
    }

    onTouchMove(e) {
        if (!this.dragging || this.refreshing) return;
        
        this.currentY = e.touches[0].pageY;
        const pullDistance = this.currentY - this.startY;
        
        if (pullDistance > 0) {
            e.preventDefault();
            
            // Apply elastic resistance
            const resistedDistance = Math.min(pullDistance * 0.5, this.threshold * 1.5);
            
            this.indicator.style.setProperty('--pull-distance', `${resistedDistance}px`);
            this.indicator.classList.add('pulling');
            
            if (resistedDistance >= this.threshold) {
                this.indicator.classList.add('ready');
                this.indicator.querySelector('.ptr-text').textContent = 'Solte para atualizar';
                HapticFeedback.light();
            } else {
                this.indicator.classList.remove('ready');
                this.indicator.querySelector('.ptr-text').textContent = 'Puxe para atualizar';
            }
        }
    }

    async onTouchEnd() {
        if (!this.dragging) return;
        
        this.dragging = false;
        const pullDistance = Math.min((this.currentY - this.startY) * 0.5, this.threshold * 1.5);
        
        if (pullDistance >= this.threshold && !this.refreshing) {
            this.refreshing = true;
            this.indicator.classList.add('refreshing');
            this.indicator.querySelector('.ptr-icon i').className = 'fas fa-sync-alt';
            this.indicator.querySelector('.ptr-text').textContent = 'Atualizando...';
            
            HapticFeedback.success();
            
            try {
                await this.onRefresh();
            } catch (error) {
                console.error('Refresh error:', error);
                HapticFeedback.error();
            }
            
            // Reset after delay
            setTimeout(() => {
                this.reset();
            }, 1000);
        } else {
            this.reset();
        }
    }

    reset() {
        this.indicator.classList.remove('pulling', 'ready', 'refreshing');
        this.indicator.style.setProperty('--pull-distance', '0px');
        this.indicator.querySelector('.ptr-icon i').className = 'fas fa-arrow-down';
        this.indicator.querySelector('.ptr-text').textContent = 'Puxe para atualizar';
        this.refreshing = false;
    }

    destroy() {
        this.enabled = false;
        if (this.indicator) {
            this.indicator.remove();
        }
    }
}

// ==========================================
// SWIPE GESTURES
// ==========================================

class SwipeGesture {
    constructor(element, options = {}) {
        this.element = element;
        this.threshold = options.threshold || 50;
        this.onSwipeLeft = options.onSwipeLeft || null;
        this.onSwipeRight = options.onSwipeRight || null;
        this.onSwipeUp = options.onSwipeUp || null;
        this.onSwipeDown = options.onSwipeDown || null;
        
        this.startX = 0;
        this.startY = 0;
        this.startTime = 0;
        
        this.attachEvents();
    }

    attachEvents() {
        this.element.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
        this.element.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: true });
    }

    onTouchStart(e) {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
        this.startTime = Date.now();
    }

    onTouchEnd(e) {
        const endX = e.changedTouches[0].pageX;
        const endY = e.changedTouches[0].pageY;
        const endTime = Date.now();
        
        const deltaX = endX - this.startX;
        const deltaY = endY - this.startY;
        const deltaTime = endTime - this.startTime;
        
        // Must be a quick gesture (< 300ms)
        if (deltaTime > 300) return;
        
        // Determine primary direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (Math.abs(deltaX) > this.threshold) {
                if (deltaX > 0) {
                    // Swipe right
                    if (this.onSwipeRight) {
                        HapticFeedback.light();
                        this.onSwipeRight();
                    }
                } else {
                    // Swipe left
                    if (this.onSwipeLeft) {
                        HapticFeedback.light();
                        this.onSwipeLeft();
                    }
                }
            }
        } else {
            // Vertical swipe
            if (Math.abs(deltaY) > this.threshold) {
                if (deltaY > 0) {
                    // Swipe down
                    if (this.onSwipeDown) {
                        HapticFeedback.light();
                        this.onSwipeDown();
                    }
                } else {
                    // Swipe up
                    if (this.onSwipeUp) {
                        HapticFeedback.light();
                        this.onSwipeUp();
                    }
                }
            }
        }
    }
}

// ==========================================
// AUTO-INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add haptic feedback to all buttons
    document.querySelectorAll('button, .btn, [role="button"]').forEach(button => {
        button.addEventListener('click', () => HapticFeedback.light(), { passive: true });
    });
    
    // Add haptic feedback to links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => HapticFeedback.light(), { passive: true });
    });
    
    // Pull-to-refresh disabled to prevent infinite loops
    // Can be re-enabled manually if needed
    /*
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname.includes('admin.html')) {
        window.pullToRefresh = new PullToRefresh({
            onRefresh: async () => {
                if (typeof loadStudentStatistics === 'function') {
                    const userId = localStorage.getItem('loggedInUser');
                    if (userId) await loadStudentStatistics(userId);
                }
                if (typeof loadAttendanceHistory === 'function') {
                    await loadAttendanceHistory();
                }
            }
        });
    }
    */
    
    console.log('✅ Native Gestures Module - Loaded successfully');
    console.log('📱 Haptic Feedback:', HapticFeedback.isSupported() ? 'Enabled' : 'Not supported');
});

// Export for use in other modules
window.HapticFeedback = HapticFeedback;
window.PullToRefresh = PullToRefresh;
window.SwipeGesture = SwipeGesture;
