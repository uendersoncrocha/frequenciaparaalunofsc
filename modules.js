// ============================================
// MODULES MANAGEMENT - Version 1.0
// Gerenciamento de módulos de aula (teórico/prático)
// ============================================

console.log('📚 Carregando módulo de gerenciamento de aulas...');

// ============================================
// FORM TOGGLE FUNCTIONS
// ============================================

/**
 * Mostra formulário de cirurgia
 */
function showSurgeryForm() {
    const surgeryBtn = document.getElementById('btnSurgery');
    const moduleBtn = document.getElementById('btnModule');
    const surgeryFields = document.getElementById('surgeryFormFields');
    const moduleFields = document.getElementById('moduleFormFields');
    const todayStatus = document.getElementById('todayStatus');
    
    // Update button styles
    surgeryBtn.className = 'p-6 bg-white border-3 border-blue-500 rounded-xl hover:shadow-lg transition';
    moduleBtn.className = 'p-6 bg-white border-2 border-gray-300 rounded-xl hover:shadow-lg transition hover:border-green-500';
    
    // Show/hide forms
    if (surgeryFields) surgeryFields.classList.remove('hidden');
    if (moduleFields) moduleFields.classList.add('hidden');
    if (todayStatus) todayStatus.classList.remove('hidden');
    
    console.log('✅ Formulário de cirurgia exibido');
}

/**
 * Mostra formulário de módulo
 */
function showModuleForm() {
    const surgeryBtn = document.getElementById('btnSurgery');
    const moduleBtn = document.getElementById('btnModule');
    const surgeryFields = document.getElementById('surgeryFormFields');
    const moduleFields = document.getElementById('moduleFormFields');
    const todayStatus = document.getElementById('todayStatus');
    
    // Update button styles
    surgeryBtn.className = 'p-6 bg-white border-2 border-gray-300 rounded-xl hover:shadow-lg transition hover:border-blue-500';
    moduleBtn.className = 'p-6 bg-white border-3 border-green-500 rounded-xl hover:shadow-lg transition';
    
    // Show/hide forms
    if (surgeryFields) surgeryFields.classList.add('hidden');
    if (moduleFields) moduleFields.classList.remove('hidden');
    if (todayStatus) todayStatus.classList.add('hidden');
    
    console.log('✅ Formulário de módulo exibido');
}

// ============================================
// MODULE REGISTRATION
// ============================================

/**
 * Registra novo módulo de aula
 */
async function registerModule() {
    if (!currentStudent) {
        showError('Erro: Nenhum aluno selecionado');
        return;
    }
    
    // Get form values
    const moduleType = document.getElementById('moduleType').value;
    const moduleName = document.getElementById('moduleName').value.trim();
    const moduleDuration = parseFloat(document.getElementById('moduleDuration').value);
    const moduleInstructor = document.getElementById('moduleInstructor').value.trim();
    const moduleNotes = document.getElementById('moduleNotes').value.trim();
    
    // Validate required fields
    if (!moduleType || !moduleName || !moduleDuration || !moduleInstructor) {
        showError('Por favor, preencha todos os campos obrigatórios');
        return;
    }
    
    // Validate duration
    if (moduleDuration <= 0 || moduleDuration > 24) {
        showError('A duração deve ser entre 0.5 e 24 horas');
        return;
    }
    
    try {
        const now = new Date();
        
        // Get selected date or use today
        const moduleDateInput = document.getElementById('moduleDate');
        const date = moduleDateInput && moduleDateInput.value ? moduleDateInput.value : now.toISOString().split('T')[0];
        
        const moduleData = {
            student_id: currentStudent.id,
            student_name: currentStudent.name,
            class_period: currentStudent.class_period,
            date: date,
            module_type: moduleType,
            module_name: moduleName,
            duration_hours: moduleDuration,
            instructor: moduleInstructor,
            notes: moduleNotes,
            validated: false, // Precisa ser validado pelo coordenador
            validated_by: null,
            validated_at: null
        };
        
        console.log('📤 Enviando módulo:', moduleData);
        
        const response = await fetch('tables/modules', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(moduleData)
        });
        
        if (response.ok) {
            const typeLabel = moduleType === 'pratico' ? 'Prático' : 'Teórico';
            const impactMessage = moduleType === 'pratico' 
                ? `\n\nEste módulo reduzirá sua meta de 800h em ${moduleDuration}h após validação.`
                : '';
            
            showSuccess(
                'Módulo Registrado!',
                `Módulo ${typeLabel} "${moduleName}" registrado com sucesso.\n` +
                `Duração: ${moduleDuration}h com ${moduleInstructor}.\n\n` +
                `⏳ Aguardando validação do coordenador.${impactMessage}`
            );
            
            // Clear form
            clearModuleForm();
            
            // Refresh statistics
            await refreshStudentStatistics(currentStudent.id);
            
            // Reload recent records
            await loadRecentRecords();
        } else {
            showError('Erro ao registrar módulo. Tente novamente.');
        }
    } catch (error) {
        console.error('❌ Erro ao registrar módulo:', error);
        showError('Erro ao registrar módulo: ' + error.message);
    }
}

/**
 * Limpa formulário de módulo
 */
function clearModuleForm() {
    document.getElementById('moduleType').value = '';
    document.getElementById('moduleName').value = '';
    document.getElementById('moduleDuration').value = '';
    document.getElementById('moduleInstructor').value = '';
    document.getElementById('moduleNotes').value = '';
    
    // Reset date to today
    const today = new Date().toISOString().split('T')[0];
    const moduleDateInput = document.getElementById('moduleDate');
    if (moduleDateInput) moduleDateInput.value = today;
    
    console.log('🧹 Formulário de módulo limpo');
}

// ============================================
// LOAD RECENT RECORDS (SURGERIES + MODULES)
// ============================================

/**
 * Carrega registros recentes (cirurgias e módulos)
 */
async function loadRecentRecords() {
    if (!currentStudent) return;
    
    try {
        // Fetch surgeries
        const surgeryResponse = await fetch(`tables/attendance?limit=1000`);
        const surgeryData = await surgeryResponse.json();
        const studentSurgeries = surgeryData.data
            .filter(s => s.student_id === currentStudent.id && s.check_out)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        // Fetch modules
        const moduleResponse = await fetch(`tables/modules?limit=1000`);
        const moduleData = await moduleResponse.json();
        const studentModules = moduleData.data
            .filter(m => m.student_id === currentStudent.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        // Combine and sort by date
        const allRecords = [
            ...studentSurgeries.map(s => ({ ...s, type: 'surgery' })),
            ...studentModules.map(m => ({ ...m, type: 'module' }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
        
        // Display records
        displayRecentRecords(allRecords);
        
    } catch (error) {
        console.error('❌ Erro ao carregar registros:', error);
    }
}

/**
 * Exibe registros recentes na interface
 */
function displayRecentRecords(records) {
    const container = document.getElementById('recentAttendance');
    if (!container) return;
    
    if (records.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-inbox text-4xl mb-3"></i>
                <p>Nenhum registro encontrado</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = records.map(record => {
        if (record.type === 'surgery') {
            return createSurgeryCard(record);
        } else {
            return createModuleCard(record);
        }
    }).join('');
}

/**
 * Cria card de cirurgia
 */
function createSurgeryCard(surgery) {
    // Validation status with coordinator name
    let validationBadge = '';
    let validationInfo = '';
    
    if (surgery.validated === false || surgery.validated === 'false') {
        // Rejected
        validationBadge = `<span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
            <i class="fas fa-times-circle mr-1"></i>Rejeitado
          </span>`;
        validationInfo = surgery.validated_by 
            ? `<p class="col-span-2 text-xs text-red-600"><strong>Rejeitado por:</strong> ${surgery.validated_by}</p>
               ${surgery.validation_notes ? `<p class="col-span-2 text-xs text-red-600"><strong>Motivo:</strong> ${surgery.validation_notes}</p>` : ''}`
            : '';
    } else if (surgery.validated === true || surgery.validated === 'true') {
        // Validated
        validationBadge = `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            <i class="fas fa-check-circle mr-1"></i>Validado
          </span>`;
        validationInfo = surgery.validated_by 
            ? `<p class="col-span-2 text-xs text-green-700"><strong>✓ Validado por:</strong> ${surgery.validated_by}</p>`
            : '';
    } else {
        // Pending
        validationBadge = `<span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            <i class="fas fa-clock mr-1"></i>Pendente
          </span>`;
    }
    
    const responsibleBadge = surgery.was_responsible
        ? `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            <i class="fas fa-star mr-1"></i>Responsável
          </span>`
        : '';
    
    const hours = ((surgery.total_surgery_time || 0) / 60).toFixed(1);
    
    return `
        <div class="bg-white rounded-lg p-4 shadow hover:shadow-md transition border-l-4 border-blue-500">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                    <i class="fas fa-heartbeat text-blue-600 text-xl"></i>
                    <span class="font-bold text-gray-800">Cirurgia</span>
                </div>
                <div class="flex gap-2">
                    ${validationBadge}
                    ${responsibleBadge}
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p><strong>Data:</strong> ${formatDate(surgery.date)}</p>
                <p><strong>Tipo:</strong> ${surgery.surgery_type || '-'}</p>
                <p><strong>Cirurgião:</strong> ${surgery.surgeon_name || '-'}</p>
                <p><strong>Duração:</strong> ${hours}h</p>
                ${validationInfo}
            </div>
        </div>
    `;
}

/**
 * Cria card de módulo
 */
function createModuleCard(module) {
    // Validation status with coordinator name
    let validationBadge = '';
    let validationInfo = '';
    
    if (module.validated === false || module.validated === 'false') {
        // Rejected
        validationBadge = `<span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
            <i class="fas fa-times-circle mr-1"></i>Rejeitado
          </span>`;
        validationInfo = module.validated_by 
            ? `<p class="col-span-2 text-xs text-red-600"><strong>Rejeitado por:</strong> ${module.validated_by}</p>
               ${module.validation_notes ? `<p class="col-span-2 text-xs text-red-600"><strong>Motivo:</strong> ${module.validation_notes}</p>` : ''}`
            : '';
    } else if (module.validated === true || module.validated === 'true') {
        // Validated
        validationBadge = `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            <i class="fas fa-check-circle mr-1"></i>Validado
          </span>`;
        validationInfo = module.validated_by 
            ? `<p class="col-span-2 text-xs text-green-700"><strong>✓ Validado por:</strong> ${module.validated_by}</p>`
            : '';
    } else {
        // Pending
        validationBadge = `<span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            <i class="fas fa-clock mr-1"></i>Pendente
          </span>`;
    }
    
    const typeIcon = module.module_type === 'pratico' 
        ? '<i class="fas fa-flask text-green-600"></i>'
        : '<i class="fas fa-book text-purple-600"></i>';
    
    const typeLabel = module.module_type === 'pratico' ? 'Prático' : 'Teórico';
    const borderColor = module.module_type === 'pratico' ? 'border-green-500' : 'border-purple-500';
    
    return `
        <div class="bg-white rounded-lg p-4 shadow hover:shadow-md transition border-l-4 ${borderColor}">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                    ${typeIcon}
                    <span class="font-bold text-gray-800">Módulo ${typeLabel}</span>
                </div>
                ${validationBadge}
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p><strong>Data:</strong> ${formatDate(module.date)}</p>
                <p><strong>Duração:</strong> ${module.duration_hours}h</p>
                <p class="col-span-2"><strong>Módulo:</strong> ${module.module_name}</p>
                <p class="col-span-2"><strong>Instrutor:</strong> ${module.instructor}</p>
                ${validationInfo}
            </div>
        </div>
    `;
}

/**
 * Formata data para exibição
 */
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
}

// ============================================
// INITIALIZATION
// ============================================

// Set default form view to surgery
document.addEventListener('DOMContentLoaded', () => {
    if (typeof showSurgeryForm === 'function') {
        setTimeout(() => {
            showSurgeryForm();
        }, 100);
    }
});

console.log('✅ Módulo de gerenciamento de aulas carregado!');
