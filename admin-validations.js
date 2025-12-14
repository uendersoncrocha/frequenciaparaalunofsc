// ============================================
// ADMIN VALIDATIONS MODULE - Version 1.1
// Gerenciamento de validações pelo coordenador
// ============================================

console.log('🔄 Iniciando carregamento do módulo de validações...');

// Global variables
let currentFilter = 'all';
let currentValidationItem = null;
let currentValidationType = null; // 'surgery' or 'module'

// Get logged admin name
function getLoggedAdminName() {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
        const session = JSON.parse(adminSession);
        return session.name || 'Administrador';
    }
    return 'Administrador';
}

// ============================================
// TAB MANAGEMENT
// ============================================

/**
 * Mostra aba específica
 */
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('[id^="tab"]').forEach(btn => {
        btn.className = 'px-6 py-3 font-semibold rounded-t-lg bg-gray-200 text-gray-700 hover:bg-gray-300';
    });
    
    // Show selected tab
    const tabElement = document.getElementById(tabName + 'Tab');
    if (tabElement) {
        tabElement.classList.remove('hidden');
    }
    
    // Set active button
    const btnElement = document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
    if (btnElement) {
        btnElement.className = 'px-6 py-3 font-semibold rounded-t-lg bg-purple-600 text-white';
    }
    
    // Load data if validations tab
    if (tabName === 'validations') {
        loadPendingValidations();
    }
    
    console.log('📑 Aba exibida:', tabName);
}

// ============================================
// LOAD PENDING VALIDATIONS
// ============================================

/**
 * Carrega todos os registros pendentes de validação
 */
async function loadPendingValidations() {
    try {
        console.log('📥 Carregando validações pendentes...');
        
        // Fetch pending surgeries from surgeries table
        const surgeryResponse = await fetch('tables/surgeries?limit=1000');
        const surgeryData = await surgeryResponse.json();
        const pendingSurgeries = surgeryData.data.filter(s => 
            s.status === 'completed' && (!s.validated_at || s.status !== 'validated')
        );
        
        // Fetch pending modules
        const moduleResponse = await fetch('tables/modules?limit=1000');
        const moduleData = await moduleResponse.json();
        const pendingModules = moduleData.data.filter(m => 
            !m.validated && m.validated !== 'true'
        );
        
        console.log(`📊 ${pendingSurgeries.length} cirurgias e ${pendingModules.length} módulos pendentes`);
        
        // Update badge
        const totalPending = pendingSurgeries.length + pendingModules.length;
        const badge = document.getElementById('pendingBadge');
        if (badge) {
            badge.textContent = totalPending;
            badge.className = totalPending > 0 
                ? 'ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs'
                : 'ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs';
        }
        
        // Display items
        displayPendingItems(pendingSurgeries, pendingModules);
        
    } catch (error) {
        console.error('❌ Erro ao carregar validações:', error);
    }
}

/**
 * Exibe itens pendentes na interface
 */
function displayPendingItems(surgeries, modules) {
    const container = document.getElementById('pendingValidationsList');
    const emptyState = document.getElementById('emptyValidations');
    
    if (!container) return;
    
    // Combine and sort by date
    let items = [];
    
    if (currentFilter === 'all' || currentFilter === 'surgeries') {
        items = items.concat(surgeries.map(s => ({ ...s, type: 'surgery' })));
    }
    
    if (currentFilter === 'all' || currentFilter === 'modules') {
        items = items.concat(modules.map(m => ({ ...m, type: 'module' })));
    }
    
    items.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (items.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    container.innerHTML = items.map(item => {
        if (item.type === 'surgery') {
            return createSurgeryValidationCard(item);
        } else {
            return createModuleValidationCard(item);
        }
    }).join('');
}

/**
 * Cria card de validação de cirurgia
 */
function createSurgeryValidationCard(surgery) {
    const hours = ((surgery.total_surgery_time || 0) / 60).toFixed(1);
    const responsibleBadge = surgery.was_responsible
        ? '<span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"><i class="fas fa-star mr-1"></i>Responsável</span>'
        : '';
    
    return `
        <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <i class="fas fa-heartbeat text-blue-600 text-2xl"></i>
                        <div>
                            <h4 class="text-lg font-bold text-gray-800">${surgery.student_name}</h4>
                            <p class="text-sm text-gray-600">Turma ${surgery.class_period} • Matrícula: ${surgery.student_id}</p>
                        </div>
                    </div>
                    ${responsibleBadge}
                </div>
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Cirurgia
                </span>
            </div>
            
            <div class="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-gray-600 text-xs mb-1">Data</p>
                    <p class="font-semibold text-gray-800">${formatDate(surgery.date)}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-gray-600 text-xs mb-1">Tipo</p>
                    <p class="font-semibold text-gray-800">${surgery.surgery_type || '-'}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-gray-600 text-xs mb-1">Duração</p>
                    <p class="font-semibold text-gray-800">${hours}h</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-gray-600 text-xs mb-1">Cirurgião</p>
                    <p class="font-semibold text-gray-800">${surgery.surgeon_name || '-'}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-gray-600 text-xs mb-1">Perfusionista Principal</p>
                    <p class="font-semibold text-gray-800">${surgery.perfusionist_main || '-'}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-gray-600 text-xs mb-1">Horário</p>
                    <p class="font-semibold text-gray-800">${surgery.check_in} - ${surgery.check_out}</p>
                </div>
            </div>
            
            ${surgery.notes ? `<div class="mb-4 p-3 bg-blue-50 rounded-lg"><p class="text-sm text-gray-700"><strong>Obs:</strong> ${surgery.notes}</p></div>` : ''}
            
            <div class="grid grid-cols-2 gap-2 mb-2">
                <button onclick='validateItem("${surgery.id}", "surgery")' class="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition shadow-md hover:shadow-lg">
                    <i class="fas fa-check-circle mr-2"></i>Validar
                </button>
                <button onclick='rejectItem("${surgery.id}", "surgery")' class="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-3 rounded-lg font-bold hover:from-orange-700 hover:to-orange-800 transition shadow-md hover:shadow-lg">
                    <i class="fas fa-times-circle mr-2"></i>Rejeitar
                </button>
            </div>
            <button onclick='deleteItemAdmin("${surgery.id}", "surgery")' class="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition shadow-lg hover:shadow-xl transform hover:scale-105" title="Excluir permanentemente">
                <i class="fas fa-trash-alt mr-2"></i>EXCLUIR PERMANENTEMENTE
            </button>
        </div>
    `;
}

/**
 * Cria card de validação de módulo
 */
function createModuleValidationCard(module) {
    const typeIcon = module.module_type === 'pratico' || module.module_type === 'prático'
        ? '<i class="fas fa-flask text-green-600 text-2xl"></i>'
        : '<i class="fas fa-book text-purple-600 text-2xl"></i>';
    
    const typeLabel = module.module_type === 'pratico' || module.module_type === 'prático' ? 'Prático' : 'Teórico';
    const borderColor = module.module_type === 'pratico' || module.module_type === 'prático' ? 'border-green-500' : 'border-purple-500';
    const impactBadge = module.module_type === 'pratico' || module.module_type === 'prático'
        ? '<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"><i class="fas fa-minus-circle mr-1"></i>Abate 800h</span>'
        : '';
    
    return `
        <div class="bg-white rounded-xl p-6 shadow-md border-l-4 ${borderColor} hover:shadow-lg transition">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        ${typeIcon}
                        <div>
                            <h4 class="text-lg font-bold text-gray-800">${module.student_name}</h4>
                            <p class="text-sm text-gray-600">Turma ${module.class_period}</p>
                        </div>
                    </div>
                    ${impactBadge}
                </div>
                <span class="bg-${module.module_type === 'pratico' || module.module_type === 'prático' ? 'green' : 'purple'}-100 text-${module.module_type === 'pratico' || module.module_type === 'prático' ? 'green' : 'purple'}-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Módulo ${typeLabel}
                </span>
            </div>
            
            <div class="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-gray-600 text-xs mb-1">Data</p>
                    <p class="font-semibold text-gray-800">${formatDate(module.date)}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-gray-600 text-xs mb-1">Duração</p>
                    <p class="font-semibold text-gray-800">${module.duration_hours}h</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-gray-600 text-xs mb-1">Instrutor</p>
                    <p class="font-semibold text-gray-800">${module.instructor}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg col-span-3">
                    <p class="text-gray-600 text-xs mb-1">Módulo</p>
                    <p class="font-semibold text-gray-800">${module.module_name}</p>
                </div>
            </div>
            
            ${module.notes ? `<div class="mb-4 p-3 bg-${module.module_type === 'pratico' || module.module_type === 'prático' ? 'green' : 'purple'}-50 rounded-lg"><p class="text-sm text-gray-700"><strong>Obs:</strong> ${module.notes}</p></div>` : ''}
            
            <div class="grid grid-cols-2 gap-2 mb-2">
                ${module.module_type === 'pratico' || module.module_type === 'prático' ?
                    `<button onclick='validateModuleWithHours("${module.id}")' class="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition shadow-md hover:shadow-lg">
                        <i class="fas fa-clock mr-2"></i>Validar Horas
                    </button>` :
                    `<button onclick='validateItem("${module.id}", "module")' class="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition shadow-md hover:shadow-lg">
                        <i class="fas fa-check-circle mr-2"></i>Validar
                    </button>`
                }
                <button onclick='rejectItem("${module.id}", "module")' class="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-3 rounded-lg font-bold hover:from-orange-700 hover:to-orange-800 transition shadow-md hover:shadow-lg">
                    <i class="fas fa-times-circle mr-2"></i>Rejeitar
                </button>
            </div>
            <button onclick='deleteItemAdmin("${module.id}", "module")' class="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition shadow-lg hover:shadow-xl transform hover:scale-105" title="Excluir permanentemente">
                <i class="fas fa-trash-alt mr-2"></i>EXCLUIR PERMANENTEMENTE
            </button>
        </div>
    `;
}

// ============================================
// VALIDATION ACTIONS
// ============================================

/**
 * Valida um item (cirurgia ou módulo teórico)
 */
async function validateItem(itemId, type) {
    if (!confirm(`Confirma a validação deste ${type === 'surgery' ? 'cirurgia' : 'módulo'}?`)) {
        return;
    }
    
    try {
        const table = type === 'surgery' ? 'surgeries' : 'modules';
        const now = new Date().toISOString();
        
        // Get current item
        const getResponse = await fetch(`tables/${table}/${itemId}`);
        const currentData = await getResponse.json();
        
        // Update with validation
        const updatedData = {
            ...currentData,
            status: type === 'surgery' ? 'validated' : currentData.status,
            validated: true,
            validated_by: getLoggedAdminName(),
            validated_at: now,
            validation_notes: 'Aprovado'
        };
        
        const response = await fetch(`tables/${table}/${itemId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        });
        
        if (response.ok) {
            showSuccess('Validado!', `${type === 'surgery' ? 'Cirurgia' : 'Módulo'} validado com sucesso.`);
            loadPendingValidations(); // Reload list
        } else {
            showError('Erro ao validar. Tente novamente.');
        }
    } catch (error) {
        console.error('❌ Erro ao validar:', error);
        showError('Erro ao validar: ' + error.message);
    }
}

/**
 * Abre modal para validar módulo prático com horas
 */
async function validateModuleWithHours(moduleId) {
    try {
        // Get module data
        const response = await fetch(`tables/modules/${moduleId}`);
        const module = await response.json();
        
        currentValidationItem = module;
        currentValidationType = 'module';
        
        // Populate modal
        const infoDiv = document.getElementById('editHoursModuleInfo');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div class="space-y-2">
                    <p><strong>Aluno:</strong> ${module.student_name}</p>
                    <p><strong>Módulo:</strong> ${module.module_name}</p>
                    <p><strong>Duração Original:</strong> ${module.duration_hours}h</p>
                </div>
            `;
        }
        
        // Set default value
        const hoursInput = document.getElementById('validatedHours');
        if (hoursInput) {
            hoursInput.value = module.duration_hours;
        }
        
        // Show modal
        const modal = document.getElementById('editHoursModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar módulo:', error);
        showError('Erro ao carregar dados do módulo');
    }
}

/**
 * Confirma validação de módulo prático com horas ajustadas
 */
async function confirmModuleValidation() {
    const hoursInput = document.getElementById('validatedHours');
    const notesInput = document.getElementById('validationNotes');
    
    if (!hoursInput || !hoursInput.value) {
        showError('Por favor, informe as horas do módulo');
        return;
    }
    
    const hours = parseFloat(hoursInput.value);
    if (hours <= 0 || hours > 24) {
        showError('As horas devem estar entre 0.5 e 24');
        return;
    }
    
    try {
        const now = new Date().toISOString();
        const notes = notesInput ? notesInput.value : '';
        
        // Update module
        const updatedData = {
            ...currentValidationItem,
            duration_hours: hours,
            validated: true,
            validated_by: getLoggedAdminName(),
            validated_at: now,
            validation_notes: notes || `Aprovado com ${hours}h`
        };
        
        const response = await fetch(`tables/modules/${currentValidationItem.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        });
        
        if (response.ok) {
            showSuccess('Módulo Validado!', `Módulo validado com ${hours}h que serão abatidas da meta de 800h.`);
            closeEditHoursModal();
            loadPendingValidations();
        } else {
            showError('Erro ao validar módulo');
        }
    } catch (error) {
        console.error('❌ Erro ao validar módulo:', error);
        showError('Erro ao validar módulo: ' + error.message);
    }
}

/**
 * Rejeita um item
 */
async function rejectItem(itemId, type) {
    try {
        const table = type === 'surgery' ? 'surgeries' : 'modules';
        
        // Get current item
        const getResponse = await fetch(`tables/${table}/${itemId}`);
        const currentData = await getResponse.json();
        
        currentValidationItem = currentData;
        currentValidationType = type;
        
        // Populate modal with item info
        const infoDiv = document.getElementById('rejectionRecordInfo');
        if (infoDiv) {
            if (type === 'surgery') {
                const hours = ((currentData.total_surgery_time || 0) / 60).toFixed(1);
                infoDiv.innerHTML = `
                    <h4 class="font-bold text-gray-800 mb-2">Cirurgia</h4>
                    <div class="space-y-1 text-sm">
                        <p><strong>Aluno:</strong> ${currentData.student_name}</p>
                        <p><strong>Data:</strong> ${formatDate(currentData.date)}</p>
                        <p><strong>Tipo:</strong> ${currentData.surgery_type}</p>
                        <p><strong>Duração:</strong> ${hours}h</p>
                    </div>
                `;
            } else {
                infoDiv.innerHTML = `
                    <h4 class="font-bold text-gray-800 mb-2">Módulo</h4>
                    <div class="space-y-1 text-sm">
                        <p><strong>Aluno:</strong> ${currentData.student_name}</p>
                        <p><strong>Data:</strong> ${formatDate(currentData.date)}</p>
                        <p><strong>Módulo:</strong> ${currentData.module_name}</p>
                        <p><strong>Duração:</strong> ${currentData.duration_hours}h</p>
                    </div>
                `;
            }
        }
        
        // Clear reason
        const reasonInput = document.getElementById('rejectionReason');
        if (reasonInput) {
            reasonInput.value = '';
        }
        
        // Show modal
        const modal = document.getElementById('rejectionModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
        
    } catch (error) {
        console.error('❌ Erro ao preparar rejeição:', error);
        showError('Erro ao carregar dados');
    }
}

/**
 * Confirma rejeição com motivo
 */
async function confirmRejection() {
    const reasonInput = document.getElementById('rejectionReason');
    
    if (!reasonInput || !reasonInput.value.trim()) {
        showError('Por favor, informe o motivo da rejeição');
        return;
    }
    
    const reason = reasonInput.value.trim();
    
    try {
        const table = currentValidationType === 'surgery' ? 'surgeries' : 'modules';
        const now = new Date().toISOString();
        
        // Update with rejection
        const updatedData = {
            ...currentValidationItem,
            status: currentValidationType === 'surgery' ? 'rejected' : updatedData.status,
            validated: false, // Explicitly false (rejected)
            validated_by: getLoggedAdminName(),
            validated_at: now,
            validation_notes: `REJEITADO: ${reason}`
        };
        
        const response = await fetch(`tables/${table}/${currentValidationItem.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        });
        
        if (response.ok) {
            showSuccess('Rejeitado', `${currentValidationType === 'surgery' ? 'Cirurgia' : 'Módulo'} rejeitado. O aluno será notificado.`);
            closeRejectionModal();
            loadPendingValidations();
        } else {
            showError('Erro ao rejeitar');
        }
    } catch (error) {
        console.error('❌ Erro ao rejeitar:', error);
        showError('Erro ao rejeitar: ' + error.message);
    }
}

// ============================================
// MODAL MANAGEMENT
// ============================================

function closeRejectionModal() {
    const modal = document.getElementById('rejectionModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    currentValidationItem = null;
    currentValidationType = null;
}

function closeEditHoursModal() {
    const modal = document.getElementById('editHoursModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    currentValidationItem = null;
    currentValidationType = null;
}

// ============================================
// FILTER MANAGEMENT
// ============================================

function filterValidations(filter) {
    currentFilter = filter;
    
    // Update button styles
    document.querySelectorAll('[id^="filter"]').forEach(btn => {
        btn.className = 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300';
    });
    
    const activeBtn = document.getElementById('filter' + filter.charAt(0).toUpperCase() + filter.slice(1));
    if (activeBtn) {
        activeBtn.className = 'px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold';
    }
    
    loadPendingValidations();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
}

function showSuccess(title, message) {
    alert(`✅ ${title}\n\n${message}`);
}

function showError(message) {
    alert(`❌ Erro\n\n${message}`);
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initValidationsModule);
} else {
    initValidationsModule();
}

function initValidationsModule() {
    console.log('✅ Módulo de validações administrativas carregado!');
    
    // Load pending validations count on page load
    loadPendingValidations();
}

// ============================================
// DELETE FUNCTIONS
// ============================================

/**
 * Exclui um item (cirurgia ou módulo) - ADMIN
 */
async function deleteItemAdmin(itemId, type) {
    const itemName = type === 'surgery' ? 'cirurgia' : 'módulo';
    
    if (!confirm(`⚠️ ATENÇÃO!\n\nVocê está prestes a EXCLUIR PERMANENTEMENTE este ${itemName}.\n\nEsta ação NÃO pode ser desfeita!\n\nDeseja continuar?`)) {
        return;
    }
    
    try {
        const table = type === 'surgery' ? 'surgeries' : 'modules';
        
        const response = await fetch(`tables/${table}/${itemId}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            showSuccess('Excluído!', `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} excluído permanentemente.`);
            loadPendingValidations();
        } else {
            showError('Erro ao excluir. Tente novamente.');
        }
    } catch (error) {
        console.error('❌ Erro ao excluir:', error);
        showError('Erro ao excluir: ' + error.message);
    }
}
