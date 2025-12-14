// Authentication Management - Version 4.3 (Optimized & Enhanced)

// ============================================
// CONFIGURATION
// ============================================
const AUTH_CONFIG = {
    storageKeys: {
        user: 'loggedInUser',
        remember: 'rememberedRegistration',
        dismissTime: 'pwa-dismiss-time'
    },
    api: {
        students: 'tables/students',
        limit: 100
    },
    validation: {
        minPasswordLength: 6,
        maxLoginAttempts: 5,
        lockoutDuration: 300000 // 5 minutes
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Enhanced hash function for passwords
function simpleHash(str) {
    if (!str) return '';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

// Show loading state
function showLoading(button, originalText) {
    if (!button) return null;
    const original = originalText || button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processando...';
    button.classList.add('opacity-75', 'cursor-not-allowed');
    return original;
}

// Hide loading state
function hideLoading(button, originalText) {
    if (!button) return;
    button.disabled = false;
    button.innerHTML = originalText;
    button.classList.remove('opacity-75', 'cursor-not-allowed');
}

// Show error message with animation
function showError(errorDiv, errorTextDiv, message) {
    if (!errorDiv || !errorTextDiv) return;
    errorTextDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    errorDiv.classList.add('animate-shake');
    setTimeout(() => errorDiv.classList.remove('animate-shake'), 500);
}

// Hide error message
function hideError(errorDiv) {
    if (errorDiv) {
        errorDiv.classList.add('hidden');
    }
}

// ============================================
// AUTHENTICATION CORE FUNCTIONS
// ============================================

// Check if user is logged in
function isLoggedIn() {
    const user = localStorage.getItem(AUTH_CONFIG.storageKeys.user);
    return user !== null && user !== 'undefined';
}

// Get logged in user
function getLoggedInUser() {
    try {
        const userStr = localStorage.getItem(AUTH_CONFIG.storageKeys.user);
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('❌ Erro ao recuperar usuário:', error);
        localStorage.removeItem(AUTH_CONFIG.storageKeys.user);
        return null;
    }
}

// Set logged in user
function setLoggedInUser(user) {
    try {
        localStorage.setItem(AUTH_CONFIG.storageKeys.user, JSON.stringify(user));
        console.log('✅ Usuário salvo no localStorage');
    } catch (error) {
        console.error('❌ Erro ao salvar usuário:', error);
    }
}

// Logout
function logout() {
    localStorage.removeItem(AUTH_CONFIG.storageKeys.user);
    console.log('👋 Logout realizado');
    window.location.href = 'login.html';
}

// Protect page (redirect to login if not logged in)
function protectPage() {
    if (!isLoggedIn()) {
        console.log('🔒 Página protegida - redirecionando para login');
        window.location.href = 'login.html';
    }
}

// ============================================
// PASSWORD CHANGE MODAL
// ============================================

function showChangePasswordModal(student) {
    const modal = document.getElementById('changePasswordModal');
    if (!modal) {
        console.error('❌ Modal de mudança de senha não encontrado');
        return;
    }
    
    modal.classList.remove('hidden');
    console.log('🔔 Modal de mudança de senha exibido');
    
    // Setup toggle password visibility for new password
    setupPasswordToggle('toggleNewPassword', 'newPassword', 'eyeIconNew');
    setupPasswordToggle('toggleConfirmPassword', 'confirmPassword', 'eyeIconConfirm');
    
    // Handle password change form (only once)
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm && !changePasswordForm.dataset.listenerAttached) {
        changePasswordForm.dataset.listenerAttached = 'true';
        
        changePasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handlePasswordChange(student);
        });
    }
}

function setupPasswordToggle(buttonId, inputId, iconId) {
    const toggleBtn = document.getElementById(buttonId);
    if (toggleBtn && !toggleBtn.dataset.listenerAttached) {
        toggleBtn.dataset.listenerAttached = 'true';
        toggleBtn.addEventListener('click', function() {
            const passwordInput = document.getElementById(inputId);
            const eyeIcon = document.getElementById(iconId);
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });
    }
}

async function handlePasswordChange(student) {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('changePasswordError');
    const errorText = document.getElementById('changePasswordErrorText');
    const submitBtn = document.querySelector('#changePasswordForm button[type="submit"]');
    
    // Hide previous errors
    hideError(errorDiv);
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
        showError(errorDiv, errorText, 'As senhas não coincidem. Por favor, digite novamente.');
        return;
    }
    
    // Validate password length
    if (newPassword.length < AUTH_CONFIG.validation.minPasswordLength) {
        showError(errorDiv, errorText, `A senha deve ter pelo menos ${AUTH_CONFIG.validation.minPasswordLength} caracteres.`);
        return;
    }
    
    // Validate password is not the same as registration
    if (newPassword === student.registration) {
        showError(errorDiv, errorText, 'Por segurança, não use sua matrícula como senha.');
        return;
    }
    
    // Show loading
    const originalText = showLoading(submitBtn);
    
    try {
        // Update password in database
        const hashedPassword = simpleHash(newPassword);
        
        const updateData = {
            password: hashedPassword,
            first_login: false
        };
        
        const response = await fetch(`${AUTH_CONFIG.api.students}/${student.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao atualizar senha');
        }
        
        console.log('✅ Senha alterada com sucesso!');
        
        // Login user with new credentials
        const userData = {
            id: student.id,
            name: student.name,
            registration: student.registration,
            email: student.email,
            class_period: student.class_period,
            course: student.course
        };
        
        setLoggedInUser(userData);
        
        // Show success message briefly
        errorDiv.classList.remove('hidden', 'bg-red-100', 'border-red-400');
        errorDiv.classList.add('bg-green-100', 'border-green-400');
        errorText.classList.remove('text-red-800');
        errorText.classList.add('text-green-800');
        errorText.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Senha alterada com sucesso! Redirecionando...';
        
        // Redirect to main page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    } catch (error) {
        console.error('❌ Erro ao alterar senha:', error);
        showError(errorDiv, errorText, 'Erro ao alterar senha. Tente novamente.');
        hideLoading(submitBtn, originalText);
    }
}

// ============================================
// LOGIN PAGE LOGIC
// ============================================

if (window.location.pathname.includes('login.html') || window.location.pathname === '/' || window.location.pathname === '') {
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🔐 Inicializando sistema de login...');
        
        // Redirect if already logged in
        if (isLoggedIn()) {
            console.log('✅ Usuário já está logado, redirecionando...');
            window.location.href = 'index.html';
            return;
        }

        // Load remembered registration
        const rememberedReg = localStorage.getItem(AUTH_CONFIG.storageKeys.remember);
        if (rememberedReg) {
            const regInput = document.getElementById('registration');
            const rememberCheckbox = document.getElementById('rememberMe');
            if (regInput) regInput.value = rememberedReg;
            if (rememberCheckbox) rememberCheckbox.checked = true;
            console.log('💾 Matrícula lembrada carregada');
        }

        // Toggle password visibility
        const toggleBtn = document.getElementById('togglePassword');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                const passwordInput = document.getElementById('password');
                const eyeIcon = document.getElementById('eyeIcon');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    eyeIcon.classList.remove('fa-eye');
                    eyeIcon.classList.add('fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    eyeIcon.classList.remove('fa-eye-slash');
                    eyeIcon.classList.add('fa-eye');
                }
            });
        }

        // Handle login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await handleLogin();
            });
        }
        
        console.log('✅ Sistema de login inicializado');
    });
}

// ============================================
// LOGIN HANDLER
// ============================================

async function handleLogin() {
    const registration = document.getElementById('registration')?.value.trim();
    const password = document.getElementById('password')?.value;
    const rememberMe = document.getElementById('rememberMe')?.checked;
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');

    console.log('🔐 Tentativa de login:', registration);
    console.log('📊 Elementos encontrados:', {
        registration: !!document.getElementById('registration'),
        password: !!document.getElementById('password'),
        errorMessage: !!errorMessage,
        errorText: !!errorText,
        submitBtn: !!submitBtn
    });

    // Hide previous errors
    hideError(errorMessage);

    // Validate inputs
    if (!registration || !password) {
        showError(errorMessage, errorText, 'Por favor, preencha todos os campos.');
        console.error('❌ Campos vazios');
        return;
    }

    // Show loading
    const originalText = showLoading(submitBtn, '<i class="fas fa-sign-in-alt mr-2"></i>Entrar');

    try {
        console.log('📡 Buscando usuários no banco de dados...');
        
        // Fetch all students
        const response = await fetch(`${AUTH_CONFIG.api.students}?limit=${AUTH_CONFIG.api.limit}`);
        
        if (!response.ok) {
            throw new Error('Erro ao conectar com o banco de dados');
        }
        
        const data = await response.json();
        console.log('📦 Resposta da API:', { 
            hasData: !!data.data, 
            total: data.total,
            page: data.page,
            limit: data.limit
        });
        const students = data.data || [];

        console.log(`📊 ${students.length} usuários encontrados no banco`);

        // Find student by registration
        const student = students.find(s => 
            s.registration && 
            s.registration.toString().trim() === registration.toString().trim()
        );

        if (!student) {
            console.error('❌ Matrícula não encontrada:', registration);
            showError(errorMessage, errorText, `Matrícula "${registration}" não encontrada. Verifique se digitou corretamente.`);
            
            // Show toast notification
            if (window.showError && typeof window.showError === 'function') {
                window.showError(`Matrícula "${registration}" não encontrada.`);
            }
            
            hideLoading(submitBtn, originalText);
            return;
        }

        console.log('✓ Usuário encontrado:', student.name);

        // Check if student is active
        if (student.active === false || student.active === 'false') {
            console.error('❌ Usuário inativo:', student.name);
            showError(errorMessage, errorText, 'Sua conta está desativada. Contate o administrador.');
            hideLoading(submitBtn, originalText);
            return;
        }

        console.log('✓ Usuário ativo');

        // Check password
        let storedPassword = student.password;
        
        // If no password set, use registration as default password
        if (!storedPassword || storedPassword === '' || storedPassword === 'null') {
            console.warn('⚠️ Usuário sem senha definida, usando matrícula como padrão');
            storedPassword = simpleHash(registration);
        }

        const inputPasswordHash = simpleHash(password);

        console.log('🔐 Verificando senha...');

        if (inputPasswordHash !== storedPassword) {
            console.error('❌ Senha incorreta');
            showError(errorMessage, errorText, 'Senha incorreta. Use sua matrícula como senha no primeiro acesso.');
            
            // Show toast notification
            if (window.Toast && typeof window.Toast.error === 'function') {
                window.Toast.error('Senha incorreta. Use sua matrícula no primeiro acesso.');
            }
            
            hideLoading(submitBtn, originalText);
            return;
        }

        console.log('✓ Senha correta!');

        // Check if it's first login
        if (student.first_login === true || student.first_login === 'true') {
            console.log('🔔 Primeiro login detectado! Solicitando mudança de senha...');
            hideLoading(submitBtn, originalText);
            showChangePasswordModal(student);
            return;
        }

        // Remember registration if checked
        if (rememberMe) {
            localStorage.setItem(AUTH_CONFIG.storageKeys.remember, registration);
            console.log('💾 Matrícula salva para próximo login');
        } else {
            localStorage.removeItem(AUTH_CONFIG.storageKeys.remember);
        }

        // Login successful
        const userData = {
            id: student.id,
            name: student.name,
            registration: student.registration,
            email: student.email,
            class_period: student.class_period,
            course: student.course
        };

        setLoggedInUser(userData);
        console.log('✅ Login bem-sucedido!', student.name);
        
        // Haptic feedback on success
        if (window.HapticFeedback) {
            window.HapticFeedback.success();
        }
        
        // Toast notification
        if (window.showSuccess) {
            window.showSuccess(`Bem-vindo, ${student.name}!`);
        }
        
        // Show success message
        errorMessage.classList.remove('hidden', 'bg-red-100', 'border-red-400');
        errorMessage.classList.add('bg-green-100', 'border-green-400');
        errorText.classList.remove('text-red-800');
        errorText.classList.add('text-green-800');
        errorText.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Login realizado! Redirecionando...';
        
        console.log('🔄 Redirecionando para index.html...');

        // Redirect to main page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

    } catch (error) {
        console.error('💥 Erro no login:', error);
        const errorMsg = `Erro ao processar login: ${error.message}. Verifique sua conexão e tente novamente.`;
        showError(errorMessage, errorText, errorMsg);
        
        // Show toast notification
        if (window.Toast && typeof window.Toast.error === 'function') {
            window.Toast.error('Erro ao processar login. Verifique sua conexão.');
        }
        
        hideLoading(submitBtn, originalText);
    }
}

// ============================================
// ANIMATIONS CSS
// ============================================

// Add shake animation
if (!document.querySelector('style[data-auth-animations]')) {
    const authStyle = document.createElement('style');
    authStyle.setAttribute('data-auth-animations', 'true');
    authStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-shake {
            animation: shake 0.5s;
        }
    `;
    document.head.appendChild(authStyle);
}

console.log('✅ Sistema de autenticação carregado (v4.3 - Optimized)');
