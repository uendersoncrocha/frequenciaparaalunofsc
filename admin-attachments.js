// ============================================
// ADMIN ATTACHMENTS MODULE - Version 1.0
// Gerenciamento de relatórios/anexos de cirurgias
// ============================================

console.log('📎 [ATTACHMENTS v1.0] Carregando módulo de anexos administrativos...');

// Global variables
let allAttachments = [];
let filteredAttachments = [];

// ============================================
// LOAD ATTACHMENTS
// ============================================

/**
 * Carrega todos os anexos de cirurgias
 */
async function loadAttachments() {
    try {
        console.log('📥 Carregando anexos...');
        
        // Fetch all surgeries with attachments
        const response = await fetch('tables/attendance?limit=1000');
        const data = await response.json();
        
        // Filter only records with attachments
        allAttachments = data.data.filter(record => 
            record.cec_attachment && record.cec_attachment !== ''
        );
        
        console.log(`📊 ${allAttachments.length} anexos carregados`);
        
        // Update statistics
        updateAttachmentStatistics();
        
        // Populate student filter
        populateStudentFilter();
        
        // Display attachments
        filterAttachments();
        
        // Update badge
        const badge = document.getElementById('attachmentsBadge');
        if (badge) {
            badge.textContent = allAttachments.length;
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar anexos:', error);
    }
}

/**
 * Atualiza estatísticas de anexos
 */
function updateAttachmentStatistics() {
    const total = allAttachments.length;
    const validated = allAttachments.filter(a => a.validated === true || a.validated === 'true').length;
    const pending = allAttachments.filter(a => !a.validated || a.validated === null || a.validated === '').length;
    const rejected = allAttachments.filter(a => a.validated === false || a.validated === 'false').length;
    
    document.getElementById('totalAttachments').textContent = total;
    document.getElementById('validatedAttachments').textContent = validated;
    document.getElementById('pendingAttachments').textContent = pending;
    document.getElementById('rejectedAttachments').textContent = rejected;
}

/**
 * Popula filtro de alunos
 */
function populateStudentFilter() {
    const studentFilter = document.getElementById('attachmentStudentFilter');
    if (!studentFilter) return;
    
    // Get unique students
    const students = [...new Set(allAttachments.map(a => ({
        id: a.student_id,
        name: a.student_name,
        class_period: a.class_period
    })).map(s => JSON.stringify(s)))].map(s => JSON.parse(s));
    
    // Sort by name
    students.sort((a, b) => a.name.localeCompare(b.name));
    
    // Clear and repopulate
    studentFilter.innerHTML = '<option value="">Todos os alunos</option>';
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.name} (${student.class_period})`;
        studentFilter.appendChild(option);
    });
}

// ============================================
// FILTER ATTACHMENTS
// ============================================

/**
 * Filtra anexos com base nos filtros selecionados
 */
function filterAttachments() {
    const classFilter = document.getElementById('attachmentClassFilter').value;
    const studentFilter = document.getElementById('attachmentStudentFilter').value;
    const statusFilter = document.getElementById('attachmentStatusFilter').value;
    const searchInput = document.getElementById('attachmentSearchInput').value.toLowerCase();
    
    filteredAttachments = allAttachments.filter(attachment => {
        // Class filter
        if (classFilter && attachment.class_period !== classFilter) return false;
        
        // Student filter
        if (studentFilter && attachment.student_id !== studentFilter) return false;
        
        // Status filter
        if (statusFilter === 'validated' && !(attachment.validated === true || attachment.validated === 'true')) return false;
        if (statusFilter === 'pending' && (attachment.validated === true || attachment.validated === 'true' || attachment.validated === false || attachment.validated === 'false')) return false;
        if (statusFilter === 'rejected' && !(attachment.validated === false || attachment.validated === 'false')) return false;
        
        // Search filter
        if (searchInput) {
            const searchFields = [
                attachment.student_name,
                attachment.surgery_type,
                attachment.surgeon_name,
                attachment.date
            ].join(' ').toLowerCase();
            
            if (!searchFields.includes(searchInput)) return false;
        }
        
        return true;
    });
    
    displayAttachments();
}

/**
 * Exibe anexos na interface
 */
function displayAttachments() {
    const container = document.getElementById('attachmentsList');
    const emptyState = document.getElementById('emptyAttachments');
    
    if (!container) return;
    
    if (filteredAttachments.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    // Sort by date (newest first)
    filteredAttachments.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = filteredAttachments.map(attachment => createAttachmentCard(attachment)).join('');
}

/**
 * Cria card de anexo
 */
function createAttachmentCard(attachment) {
    const statusBadge = getStatusBadge(attachment.validated);
    const fileIcon = getFileIcon(attachment.cec_attachment_name);
    const date = formatDate(attachment.date);
    
    return `
        <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 ${getStatusBorderColor(attachment.validated)}">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-800 mb-1">${attachment.student_name}</h4>
                    <p class="text-sm text-gray-600">${attachment.class_period} • ${date}</p>
                </div>
                ${statusBadge}
            </div>
            
            <div class="space-y-2 mb-4 text-sm">
                <div class="flex items-center gap-2">
                    <i class="fas fa-user-md text-gray-500 w-4"></i>
                    <span class="text-gray-700">${attachment.surgeon_name || '-'}</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-heartbeat text-gray-500 w-4"></i>
                    <span class="text-gray-700">${attachment.surgery_type || '-'}</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-clock text-gray-500 w-4"></i>
                    <span class="text-gray-700">${attachment.check_in || '-'} - ${attachment.check_out || '-'}</span>
                </div>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <div class="flex items-center gap-3">
                    <div class="text-4xl">${fileIcon}</div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800 truncate">${attachment.cec_attachment_name || 'Relatório'}</p>
                        <p class="text-xs text-gray-500">Anexo da cirurgia</p>
                    </div>
                </div>
            </div>
            
            <div class="flex gap-2">
                <button onclick='viewAttachment("${attachment.id}")' class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                    <i class="fas fa-eye mr-2"></i>Visualizar
                </button>
                <button onclick='downloadAttachment("${attachment.id}")' class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm">
                    <i class="fas fa-download mr-2"></i>Baixar
                </button>
            </div>
            
            ${attachment.validation_notes ? `
                <div class="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p class="text-xs text-yellow-800"><strong>Obs:</strong> ${attachment.validation_notes}</p>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Retorna badge de status
 */
function getStatusBadge(validated) {
    if (validated === true || validated === 'true') {
        return '<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"><i class="fas fa-check-circle mr-1"></i>Validado</span>';
    } else if (validated === false || validated === 'false') {
        return '<span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold"><i class="fas fa-times-circle mr-1"></i>Rejeitado</span>';
    } else {
        return '<span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold"><i class="fas fa-clock mr-1"></i>Pendente</span>';
    }
}

/**
 * Retorna cor da borda baseada no status
 */
function getStatusBorderColor(validated) {
    if (validated === true || validated === 'true') {
        return 'border-green-500';
    } else if (validated === false || validated === 'false') {
        return 'border-red-500';
    } else {
        return 'border-yellow-500';
    }
}

/**
 * Retorna ícone do arquivo baseado na extensão
 */
function getFileIcon(filename) {
    if (!filename) return '📄';
    
    const ext = filename.split('.').pop().toLowerCase();
    
    if (ext === 'pdf') return '📕';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return '🖼️';
    return '📄';
}

// ============================================
// VIEW AND DOWNLOAD ATTACHMENTS
// ============================================

/**
 * Visualiza anexo em modal
 */
async function viewAttachment(attachmentId) {
    try {
        const response = await fetch(`tables/attendance/${attachmentId}`);
        const attachment = await response.json();
        
        if (!attachment.cec_attachment) {
            alert('❌ Anexo não encontrado');
            return;
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        const ext = (attachment.cec_attachment_name || '').split('.').pop().toLowerCase();
        
        let content = '';
        if (ext === 'pdf') {
            content = `
                <div class="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold text-gray-800">
                            <i class="fas fa-file-pdf mr-2 text-red-600"></i>${attachment.cec_attachment_name}
                        </h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                    <p class="text-gray-600 mb-4">Aluno: ${attachment.student_name} • Data: ${formatDate(attachment.date)}</p>
                    <iframe src="${attachment.cec_attachment}" class="w-full h-[70vh] border-2 border-gray-300 rounded-lg"></iframe>
                    <div class="mt-4 flex gap-3">
                        <button onclick='downloadAttachment("${attachmentId}")' class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                            <i class="fas fa-download mr-2"></i>Baixar PDF
                        </button>
                        <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">
                            <i class="fas fa-times mr-2"></i>Fechar
                        </button>
                    </div>
                </div>
            `;
        } else {
            content = `
                <div class="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold text-gray-800">
                            <i class="fas fa-image mr-2 text-blue-600"></i>${attachment.cec_attachment_name}
                        </h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                    <p class="text-gray-600 mb-4">Aluno: ${attachment.student_name} • Data: ${formatDate(attachment.date)}</p>
                    <img src="${attachment.cec_attachment}" class="w-full rounded-lg border-2 border-gray-300" alt="Anexo">
                    <div class="mt-4 flex gap-3">
                        <button onclick='downloadAttachment("${attachmentId}")' class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                            <i class="fas fa-download mr-2"></i>Baixar Imagem
                        </button>
                        <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">
                            <i class="fas fa-times mr-2"></i>Fechar
                        </button>
                    </div>
                </div>
            `;
        }
        
        modal.innerHTML = content;
        document.body.appendChild(modal);
        
    } catch (error) {
        console.error('❌ Erro ao visualizar anexo:', error);
        alert('❌ Erro ao carregar anexo');
    }
}

/**
 * Faz download do anexo
 */
async function downloadAttachment(attachmentId) {
    try {
        const response = await fetch(`tables/attendance/${attachmentId}`);
        const attachment = await response.json();
        
        if (!attachment.cec_attachment) {
            alert('❌ Anexo não encontrado');
            return;
        }
        
        // Create download link
        const link = document.createElement('a');
        link.href = attachment.cec_attachment;
        link.download = attachment.cec_attachment_name || `relatorio_${attachment.student_name}_${attachment.date}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Download iniciado:', link.download);
        
    } catch (error) {
        console.error('❌ Erro ao baixar anexo:', error);
        alert('❌ Erro ao baixar anexo');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
}

// ============================================
// INITIALIZATION
// ============================================

// Load attachments when tab is shown
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to tab button
    const tabButton = document.getElementById('tabAttachments');
    if (tabButton) {
        tabButton.addEventListener('click', loadAttachments);
    }
});

console.log('✅ Módulo de anexos administrativos carregado!');
