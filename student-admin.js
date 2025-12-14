// ===============================================
// STUDENT ADMINISTRATION - Version 1.0
// ===============================================

console.log('📊 Carregando administração do aluno...');

let currentStudent = null;
let currentAttendanceId = null;

// ===============================================
// INITIALIZATION
// ===============================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Inicializando administração...');
    
    const loggedUser = getLoggedInUser();
    if (!loggedUser) {
        console.log('⚠️ Nenhum usuário logado');
        return;
    }
    
    try {
        const response = await fetch('tables/students?limit=100');
        const data = await response.json();
        currentStudent = data.data.find(s => s.id === loggedUser.id);
        
        if (currentStudent) {
            console.log('✅ Aluno atual:', currentStudent.name);
            
            // Set today's date
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('attendanceDate').value = today;
            
            // Load initial data
            await checkTodayAttendance();
            await loadRecentAttendance();
            await loadSurgeries();
            await loadModules();
        }
    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
    }
});

// ===============================================
// TAB MANAGEMENT
// ===============================================

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Reset all tab buttons
    document.querySelectorAll('[id^="tab"]').forEach(btn => {
        btn.className = 'px-6 py-3 rounded-t-lg font-semibold transition bg-gray-200 text-gray-700 hover:bg-gray-300';
    });
    
    // Show selected tab
    document.getElementById('content' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.remove('hidden');
    
    // Highlight selected button
    const colors = {
        attendance: 'bg-green-500 text-white',
        surgeries: 'bg-blue-500 text-white',
        modules: 'bg-purple-500 text-white'
    };
    
    document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).className = 
        'px-6 py-3 rounded-t-lg font-semibold transition ' + colors[tabName];
}

// ===============================================
// ATTENDANCE MANAGEMENT
// ===============================================

async function checkTodayAttendance() {
    if (!currentStudent) return;
    
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch('tables/attendance?limit=100');
        const data = await response.json();
        
        const todayAttendance = data.data.find(a => 
            a.student_id === currentStudent.id && a.date === today
        );
        
        const statusDiv = document.getElementById('attendanceStatus');
        const checkInBtn = document.getElementById('checkInBtn');
        const checkOutBtn = document.getElementById('checkOutBtn');
        
        if (todayAttendance) {
            currentAttendanceId = todayAttendance.id;
            
            if (todayAttendance.check_out) {
                // Already checked out
                statusDiv.innerHTML = `
                    <div class="bg-blue-100 border-2 border-blue-400 rounded-lg p-4">
                        <p class="font-bold text-blue-900 text-lg mb-2">
                            <i class="fas fa-check-circle mr-2"></i>Presença já registrada hoje!
                        </p>
                        <div class="text-blue-800 grid md:grid-cols-2 gap-2">
                            <p><strong>Entrada:</strong> ${todayAttendance.check_in}</p>
                            <p><strong>Saída:</strong> ${todayAttendance.check_out}</p>
                            <p><strong>Local:</strong> ${todayAttendance.location || '-'}</p>
                            <p><strong>Duração:</strong> ${calculateDuration(todayAttendance.check_in, todayAttendance.check_out)}</p>
                        </div>
                    </div>
                `;
                checkInBtn.disabled = true;
                checkOutBtn.disabled = true;
            } else {
                // Checked in, waiting for check out
                statusDiv.innerHTML = `
                    <div class="bg-green-100 border-2 border-green-400 rounded-lg p-4">
                        <p class="font-bold text-green-900 text-lg mb-2">
                            <i class="fas fa-clock mr-2"></i>Você está presente!
                        </p>
                        <div class="text-green-800">
                            <p><strong>Entrada:</strong> ${todayAttendance.check_in}</p>
                            <p><strong>Local:</strong> ${todayAttendance.location || '-'}</p>
                            <p class="mt-2 text-sm">Não esqueça de registrar a saída ao final do dia.</p>
                        </div>
                    </div>
                `;
                checkInBtn.disabled = true;
                checkOutBtn.disabled = false;
            }
        } else {
            // No attendance today
            statusDiv.innerHTML = `
                <div class="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
                    <p class="font-bold text-yellow-900 text-lg">
                        <i class="fas fa-exclamation-triangle mr-2"></i>Presença não registrada hoje!
                    </p>
                    <p class="text-yellow-800">Clique em "Registrar Entrada" para marcar sua presença.</p>
                </div>
            `;
            checkInBtn.disabled = false;
            checkOutBtn.disabled = true;
            currentAttendanceId = null;
        }
    } catch (error) {
        console.error('❌ Erro ao verificar presença:', error);
    }
}

async function checkIn() {
    if (!currentStudent) return;
    
    const date = document.getElementById('attendanceDate').value;
    const location = document.getElementById('attendanceLocation').value;
    const notes = document.getElementById('attendanceNotes').value.trim();
    
    if (!date) {
        showError('Por favor, selecione a data');
        return;
    }
    
    try {
        const now = new Date();
        const time = now.toTimeString().split(' ')[0].substring(0, 5);
        
        const attendanceData = {
            student_id: currentStudent.id,
            student_name: currentStudent.name,
            class_period: currentStudent.class_period,
            date: date,
            check_in: time,
            check_out: '',
            location: location,
            notes: notes,
            validated: false
        };
        
        const response = await fetch('tables/attendance', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(attendanceData)
        });
        
        if (response.ok) {
            showSuccess('Entrada Registrada!', `Entrada registrada às ${time}`);
            await checkTodayAttendance();
            await loadRecentAttendance();
        } else {
            showError('Erro ao registrar entrada');
        }
    } catch (error) {
        console.error('❌ Erro ao registrar entrada:', error);
        showError('Erro ao registrar entrada');
    }
}

async function checkOut() {
    if (!currentStudent || !currentAttendanceId) return;
    
    try {
        const now = new Date();
        const time = now.toTimeString().split(' ')[0].substring(0, 5);
        
        const getResponse = await fetch(`tables/attendance/${currentAttendanceId}`);
        const currentData = await getResponse.json();
        
        const updatedData = {
            ...currentData,
            check_out: time
        };
        
        const response = await fetch(`tables/attendance/${currentAttendanceId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        });
        
        if (response.ok) {
            const duration = calculateDuration(currentData.check_in, time);
            showSuccess('Saída Registrada!', `Saída registrada às ${time}. Duração: ${duration}`);
            await checkTodayAttendance();
            await loadRecentAttendance();
        } else {
            showError('Erro ao registrar saída');
        }
    } catch (error) {
        console.error('❌ Erro ao registrar saída:', error);
        showError('Erro ao registrar saída');
    }
}

async function loadRecentAttendance() {
    if (!currentStudent) return;
    
    try {
        const response = await fetch('tables/attendance?limit=1000');
        const data = await response.json();
        
        // Filter all attendance for this student
        const allStudentAttendance = data.data.filter(a => a.student_id === currentStudent.id);
        
        // Calculate statistics
        const completedAttendance = allStudentAttendance.filter(a => a.check_out);
        const totalDays = completedAttendance.length;
        
        // Calculate total hours
        let totalMinutes = 0;
        completedAttendance.forEach(att => {
            if (att.check_in && att.check_out) {
                const [inHour, inMin] = att.check_in.split(':').map(Number);
                const [outHour, outMin] = att.check_out.split(':').map(Number);
                const inMinutes = inHour * 60 + inMin;
                const outMinutes = outHour * 60 + outMin;
                totalMinutes += (outMinutes - inMinutes);
            }
        });
        const totalHours = (totalMinutes / 60).toFixed(1);
        
        // Display statistics
        displayAttendanceStats(totalDays, totalHours);
        
        // Get recent 10 for display
        const studentAttendance = allStudentAttendance
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10);
        
        const container = document.getElementById('recentAttendance');
        
        if (studentAttendance.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-4">Nenhuma presença registrada</p>';
            return;
        }
        
        container.innerHTML = studentAttendance.map(att => {
            const statusBadge = att.check_out ? 
                '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Completa</span>' : 
                '<span class="text-orange-600"><i class="fas fa-clock mr-1"></i>Em andamento</span>';
            
            return `
                <div class="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <span class="font-bold text-gray-800">${formatDate(att.date)}</span>
                            <p class="text-sm text-gray-600">${att.location || 'Local não informado'}</p>
                        </div>
                        ${statusBadge}
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-2">
                        <p><strong>Entrada:</strong> ${att.check_in}</p>
                        <p><strong>Saída:</strong> ${att.check_out || '-'}</p>
                        ${att.check_out ? `<p><strong>Duração:</strong> ${calculateDuration(att.check_in, att.check_out)}</p>` : ''}
                        ${att.notes ? `<p class="col-span-2"><strong>Obs:</strong> ${att.notes}</p>` : ''}
                    </div>
                    ${att.check_out ? `
                        <button onclick="deleteAttendance('${att.id}')" class="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition shadow-md hover:shadow-lg mt-3 transform hover:scale-105">
                            <i class="fas fa-trash-alt mr-2"></i>EXCLUIR PRESENÇA
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('❌ Erro ao carregar presenças:', error);
    }
}

// ===============================================
// SURGERIES MANAGEMENT
// ===============================================

async function loadSurgeries() {
    if (!currentStudent) return;
    
    try {
        const response = await fetch('tables/surgeries?limit=1000');
        const data = await response.json();
        
        let surgeries = data.data.filter(s => s.student_id === currentStudent.id);
        
        // Apply filters
        const statusFilter = document.getElementById('filterStatus').value;
        const responsibleFilter = document.getElementById('filterResponsible').value;
        const searchTerm = document.getElementById('searchSurgery').value.toLowerCase();
        
        if (statusFilter) {
            surgeries = surgeries.filter(s => s.status === statusFilter);
        }
        
        if (responsibleFilter) {
            const isResponsible = responsibleFilter === 'true';
            surgeries = surgeries.filter(s => s.was_responsible === isResponsible);
        }
        
        if (searchTerm) {
            surgeries = surgeries.filter(s => 
                (s.surgery_type || '').toLowerCase().includes(searchTerm)
            );
        }
        
        surgeries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const container = document.getElementById('surgeriesList');
        
        if (surgeries.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhuma cirurgia encontrada</p>';
            return;
        }
        
        container.innerHTML = surgeries.map(surgery => {
            const hours = (surgery.total_surgery_time / 60).toFixed(1);
            const statusColors = {
                completed: 'bg-blue-100 text-blue-800',
                validated: 'bg-green-100 text-green-800',
                rejected: 'bg-red-100 text-red-800'
            };
            const statusLabels = {
                completed: 'Completa',
                validated: 'Validada',
                rejected: 'Rejeitada'
            };
            
            return `
                <div class="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-blue-300 transition">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">${surgery.surgery_type}</h3>
                            <p class="text-sm text-gray-600">${formatDate(surgery.date)}</p>
                        </div>
                        <div class="flex flex-col items-end gap-2">
                            <span class="px-3 py-1 rounded-full text-sm font-semibold ${statusColors[surgery.status] || 'bg-gray-100 text-gray-800'}">
                                ${statusLabels[surgery.status] || surgery.status}
                            </span>
                            ${surgery.was_responsible ? '<span class="text-yellow-600"><i class="fas fa-trophy mr-1"></i>Responsável</span>' : '<span class="text-gray-600">Auxiliar</span>'}
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                        <p><strong>Cirurgião:</strong> ${surgery.surgeon_name}</p>
                        <p><strong>Perfusionista Principal:</strong> ${surgery.perfusionist_main}</p>
                        <p><strong>Tempo CEC:</strong> ${surgery.cec_time || 0} min</p>
                        <p><strong>Tempo Pinça:</strong> ${surgery.clamp_time || 0} min</p>
                        <p><strong>Tempo Total:</strong> ${surgery.total_surgery_time} min (${hours}h)</p>
                        <p><strong>Horário:</strong> ${surgery.start_time} - ${surgery.end_time}</p>
                    </div>
                    
                    ${surgery.notes ? `<p class="text-sm text-gray-600 mb-3"><strong>Observações:</strong> ${surgery.notes}</p>` : ''}
                    
                    <div class="flex gap-2 flex-wrap items-center mb-3">
                        ${surgery.cec_sheet_url ? '<button onclick="viewFile(\'' + surgery.cec_sheet_url + '\', \'' + surgery.cec_sheet_name + '\')" class="text-blue-600 hover:text-blue-800 text-sm font-semibold"><i class="fas fa-file-medical mr-1"></i>Ver Ficha CEC</button>' : ''}
                        ${surgery.attachment_url ? '<button onclick="viewFile(\'' + surgery.attachment_url + '\', \'' + surgery.attachment_name + '\')" class="text-purple-600 hover:text-purple-800 text-sm font-semibold"><i class="fas fa-paperclip mr-1"></i>Ver Relatório</button>' : ''}
                    </div>
                    
                    ${surgery.validation_notes ? `
                        <div class="mt-3 mb-3 p-3 bg-gray-50 rounded-lg">
                            <p class="text-sm font-semibold text-gray-700">Nota de Validação:</p>
                            <p class="text-sm text-gray-600">${surgery.validation_notes}</p>
                        </div>
                    ` : ''}
                    
                    ${surgery.status === 'completed' || surgery.status === 'rejected' ? `
                        <div class="flex gap-2 pt-4 mt-4 border-t-2 border-gray-200">
                            <button onclick="deleteSurgery('${surgery.id}')" class="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition shadow-lg hover:shadow-xl transform hover:scale-105">
                                <i class="fas fa-trash-alt mr-2"></i>EXCLUIR CIRURGIA
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('❌ Erro ao carregar cirurgias:', error);
    }
}

// ===============================================
// MODULES MANAGEMENT
// ===============================================

async function loadModules() {
    if (!currentStudent) return;
    
    try {
        const response = await fetch('tables/modules?limit=1000');
        const data = await response.json();
        
        const modules = data.data
            .filter(m => m.student_id === currentStudent.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const container = document.getElementById('modulesList');
        
        if (modules.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhuma aula registrada</p>';
            return;
        }
        
        container.innerHTML = modules.map(module => {
            const typeColors = {
                teorico: 'bg-blue-100 text-blue-800',
                pratico: 'bg-green-100 text-green-800'
            };
            const typeLabels = {
                teorico: '🎓 Teórico',
                pratico: '⚗️ Prático'
            };
            
            const isValidated = module.validated === true || module.validated === 'true';
            
            return `
                <div class="bg-white rounded-lg p-6 border-2 border-gray-200">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">${module.module_name}</h3>
                            <p class="text-sm text-gray-600">${formatDate(module.date)}</p>
                        </div>
                        <div class="flex flex-col items-end gap-2">
                            <span class="px-3 py-1 rounded-full text-sm font-semibold ${typeColors[module.module_type] || 'bg-gray-100 text-gray-800'}">
                                ${typeLabels[module.module_type] || module.module_type}
                            </span>
                            ${isValidated ? '<span class="text-green-600 text-xs"><i class="fas fa-check-circle mr-1"></i>Validado</span>' : '<span class="text-orange-600 text-xs"><i class="fas fa-clock mr-1"></i>Pendente</span>'}
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-3 text-sm text-gray-700 mb-3">
                        <p><strong>Instrutor:</strong> ${module.instructor}</p>
                        <p><strong>Duração:</strong> ${module.duration_hours}h</p>
                        ${module.notes ? `<p class="col-span-2"><strong>Observações:</strong> ${module.notes}</p>` : ''}
                    </div>
                    
                    ${!isValidated ? `
                        <button onclick="deleteModule('${module.id}')" class="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition shadow-lg hover:shadow-xl mt-4 transform hover:scale-105">
                            <i class="fas fa-trash-alt mr-2"></i>EXCLUIR MÓDULO
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('❌ Erro ao carregar módulos:', error);
    }
}

// ===============================================
// ATTENDANCE STATISTICS
// ===============================================

/**
 * Exibe estatísticas de presença
 */
function displayAttendanceStats(totalDays, totalHours) {
    const statusDiv = document.getElementById('attendanceStatus');
    if (!statusDiv) return;
    
    // Check if stats already exist
    let statsDiv = document.getElementById('attendanceStatsCard');
    
    if (!statsDiv) {
        // Create stats card
        statsDiv = document.createElement('div');
        statsDiv.id = 'attendanceStatsCard';
        statusDiv.parentNode.insertBefore(statsDiv, statusDiv.nextSibling);
    }
    
    statsDiv.innerHTML = `
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mt-4">
            <h3 class="text-lg font-bold text-green-900 mb-4">
                <i class="fas fa-chart-line mr-2"></i>Estatísticas de Presença
            </h3>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-1">${totalDays}</div>
                    <div class="text-sm text-gray-600">Dias de Presença</div>
                </div>
                <div class="bg-white rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-1">${totalHours}h</div>
                    <div class="text-sm text-gray-600">Horas Totais</div>
                </div>
                <div class="bg-white rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-1">${(totalHours / totalDays || 0).toFixed(1)}h</div>
                    <div class="text-sm text-gray-600">Média por Dia</div>
                </div>
            </div>
        </div>
    `;
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function calculateDuration(checkIn, checkOut) {
    if (!checkIn || !checkOut) return '-';
    
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    
    const inMinutes = inHour * 60 + inMin;
    const outMinutes = outHour * 60 + outMin;
    
    const totalMinutes = outMinutes - inMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}min`;
}

function viewFile(fileUrl, fileName) {
    if (!fileUrl) {
        showError('Arquivo não disponível');
        return;
    }
    
    // Open in new tab
    const newWindow = window.open();
    newWindow.document.write(`
        <html>
            <head>
                <title>${fileName}</title>
                <style>
                    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                    iframe { width: 100%; height: 90vh; border: none; }
                    img { max-width: 100%; height: auto; }
                </style>
            </head>
            <body>
                <h2>${fileName}</h2>
                ${fileUrl.includes('application/pdf') || fileName.endsWith('.pdf') ? 
                    `<iframe src="${fileUrl}"></iframe>` : 
                    `<img src="${fileUrl}" alt="${fileName}">`
                }
            </body>
        </html>
    `);
}

// ===============================================
// DELETE FUNCTIONS
// ===============================================

/**
 * Exclui uma cirurgia - ALUNO
 */
async function deleteSurgery(surgeryId) {
    if (!confirm('⚠️ ATENÇÃO!\n\nVocê está prestes a EXCLUIR PERMANENTEMENTE esta cirurgia.\n\nEsta ação NÃO pode ser desfeita!\n\nDeseja continuar?')) {
        return;
    }
    
    try {
        const response = await fetch(`tables/surgeries/${surgeryId}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            showSuccess('Cirurgia Excluída!', 'A cirurgia foi excluída permanentemente.');
            // Reload surgeries list
            await loadSurgeries();
        } else {
            showError('Erro ao excluir cirurgia. Tente novamente.');
        }
    } catch (error) {
        console.error('❌ Erro ao excluir cirurgia:', error);
        showError('Erro ao excluir cirurgia: ' + error.message);
    }
}

/**
 * Exclui uma presença - ALUNO
 */
async function deleteAttendance(attendanceId) {
    if (!confirm('⚠️ ATENÇÃO!\n\nVocê está prestes a EXCLUIR PERMANENTEMENTE este registro de presença.\n\nEsta ação NÃO pode ser desfeita!\n\nDeseja continuar?')) {
        return;
    }
    
    try {
        const response = await fetch(`tables/attendance/${attendanceId}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            showSuccess('Presença Excluída!', 'O registro de presença foi excluído permanentemente.');
            // Reload attendance list
            await loadRecentAttendance();
            await checkTodayAttendance();
        } else {
            showError('Erro ao excluir presença. Tente novamente.');
        }
    } catch (error) {
        console.error('❌ Erro ao excluir presença:', error);
        showError('Erro ao excluir presença: ' + error.message);
    }
}

/**
 * Exclui um módulo - ALUNO
 */
async function deleteModule(moduleId) {
    if (!confirm('⚠️ ATENÇÃO!\n\nVocê está prestes a EXCLUIR PERMANENTEMENTE este módulo/aula.\n\nEsta ação NÃO pode ser desfeita!\n\nDeseja continuar?')) {
        return;
    }
    
    try {
        const response = await fetch(`tables/modules/${moduleId}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            showSuccess('Módulo Excluído!', 'O módulo foi excluído permanentemente.');
            // Reload modules list
            await loadModules();
        } else {
            showError('Erro ao excluir módulo. Tente novamente.');
        }
    } catch (error) {
        console.error('❌ Erro ao excluir módulo:', error);
        showError('Erro ao excluir módulo: ' + error.message);
    }
}

function showSuccess(title, message) {
    alert(`✅ ${title}\n\n${message}`);
}

function showError(message) {
    alert(`❌ Erro\n\n${message}`);
}

console.log('✅ Administração do aluno carregada');
