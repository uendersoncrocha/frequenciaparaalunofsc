// Student Profile Management - Version 1.0

console.log('👤 Student Profile v1.0 - Loading...');

let currentStudent = null;

// Check authentication
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
if (!loggedInUser) {
    window.location.href = 'login.html';
}

// Hash function
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

// Load student data
async function loadStudentData() {
    try {
        const response = await fetch(`tables/students/${loggedInUser.id}`);
        if (!response.ok) throw new Error('Failed to load student data');
        
        currentStudent = await response.json();
        console.log('✅ Student data loaded:', currentStudent);
        
        // Update UI
        updateProfileDisplay();
        
    } catch (error) {
        console.error('❌ Error loading student data:', error);
        if (window.Toast) window.Toast.error('Erro ao carregar dados do perfil');
    }
}

// Update profile display
function updateProfileDisplay() {
    document.getElementById('profileName').textContent = currentStudent.name;
    document.getElementById('profileEmail').textContent = currentStudent.email || 'Sem e-mail';
    document.getElementById('profileRegistration').textContent = currentStudent.registration;
    
    // Update photo
    const photoContainer = document.getElementById('profilePhotoContainer');
    if (currentStudent.photo_url) {
        photoContainer.innerHTML = `<img src="${currentStudent.photo_url}" alt="${currentStudent.name}" class="w-full h-full object-cover">`;
    } else {
        document.getElementById('photoInitial').textContent = currentStudent.name.charAt(0).toUpperCase();
    }
    
    // Update form fields
    document.getElementById('name').value = currentStudent.name;
    document.getElementById('email').value = currentStudent.email || '';
    document.getElementById('phone').value = currentStudent.phone || '';
}

// Tab switching
function showTab(tabName) {
    // Update buttons
    document.querySelectorAll('[id^="tab-"]').forEach(btn => {
        btn.classList.remove('border-indigo-600', 'text-indigo-600');
        btn.classList.add('text-gray-600', 'border-transparent');
    });
    document.getElementById(`tab-${tabName}`).classList.add('border-indigo-600', 'text-indigo-600');
    document.getElementById(`tab-${tabName}`).classList.remove('text-gray-600', 'border-transparent');
    
    // Update content
    document.querySelectorAll('[id^="content-"]').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`content-${tabName}`).classList.remove('hidden');
}

// Personal data form
document.getElementById('personalDataForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const updateData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim()
    };
    
    try {
        const response = await fetch(`tables/students/${currentStudent.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });
        
        if (!response.ok) throw new Error('Failed to update profile');
        
        const updated = await response.json();
        currentStudent = updated;
        
        // Update localStorage
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        user.name = updated.name;
        user.email = updated.email;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        
        console.log('✅ Profile updated');
        if (window.Toast) window.Toast.success('Dados atualizados com sucesso!');
        if (window.HapticFeedback) window.HapticFeedback.success();
        
        updateProfileDisplay();
        
    } catch (error) {
        console.error('❌ Error updating profile:', error);
        if (window.Toast) window.Toast.error('Erro ao atualizar dados');
    }
});

// Change password form
document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate new passwords match
    if (newPassword !== confirmPassword) {
        if (window.Toast) window.Toast.error('As senhas não coincidem');
        return;
    }
    
    // Validate new password length
    if (newPassword.length < 6) {
        if (window.Toast) window.Toast.error('A senha deve ter no mínimo 6 caracteres');
        return;
    }
    
    // Verify current password
    const currentPasswordHash = simpleHash(currentPassword);
    if (currentPasswordHash !== currentStudent.password) {
        if (window.Toast) window.Toast.error('Senha atual incorreta');
        return;
    }
    
    try {
        const newPasswordHash = simpleHash(newPassword);
        
        const response = await fetch(`tables/students/${currentStudent.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: newPasswordHash,
                first_login: false
            })
        });
        
        if (!response.ok) throw new Error('Failed to update password');
        
        console.log('✅ Password updated');
        if (window.Toast) window.Toast.success('Senha alterada com sucesso!');
        if (window.HapticFeedback) window.HapticFeedback.success();
        
        // Clear form
        document.getElementById('changePasswordForm').reset();
        
    } catch (error) {
        console.error('❌ Error updating password:', error);
        if (window.Toast) window.Toast.error('Erro ao alterar senha');
    }
});

// Toggle password visibility
function togglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Handle photo upload
async function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        if (window.Toast) window.Toast.error('Por favor, selecione uma imagem');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        if (window.Toast) window.Toast.error('A imagem deve ter no máximo 5MB');
        return;
    }
    
    try {
        // Convert to base64
        const reader = new FileReader();
        reader.onload = async (e) => {
            const photoData = e.target.result;
            
            // Update in database
            const response = await fetch(`tables/students/${currentStudent.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    photo_url: photoData
                })
            });
            
            if (!response.ok) throw new Error('Failed to update photo');
            
            currentStudent.photo_url = photoData;
            
            // Update display
            document.getElementById('profilePhotoContainer').innerHTML = 
                `<img src="${photoData}" alt="${currentStudent.name}" class="w-full h-full object-cover">`;
            
            console.log('✅ Photo updated');
            if (window.Toast) window.Toast.success('Foto atualizada com sucesso!');
            if (window.HapticFeedback) window.HapticFeedback.success();
        };
        
        reader.readAsDataURL(file);
        
    } catch (error) {
        console.error('❌ Error uploading photo:', error);
        if (window.Toast) window.Toast.error('Erro ao atualizar foto');
    }
}

// Navigation
function goBack() {
    window.location.href = 'index.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStudentData();
});

console.log('✅ Student Profile - Loaded');
