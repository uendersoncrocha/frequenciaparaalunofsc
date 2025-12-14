// Global variables
let allStudents = [];
let allAttendance = [];
let filteredAttendance = [];
let currentPage = 1;
const recordsPerPage = 10;

// Charts
let attendanceChart = null;
let studentChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    updateStatistics();
    renderCharts();
    renderAttendanceTable();
    renderStudentList();
    setupFilters();
});

// Load all data from API
async function loadData() {
    try {
        console.log('📊 Carregando dados do sistema...');
        
        // Load students
        try {
            const studentsResponse = await fetch('tables/students?limit=100');
            if (studentsResponse.ok) {
                const studentsData = await studentsResponse.json();
                allStudents = studentsData.data || [];
                console.log(`✅ ${allStudents.length} alunos carregados`);
            } else {
                console.warn('⚠️ Tabela students não encontrada');
                allStudents = [];
            }
        } catch (e) {
            console.warn('⚠️ Erro ao carregar students:', e.message);
            allStudents = [];
        }

        // Load surgeries (cirurgias)
        try {
            const surgeriesResponse = await fetch('tables/surgeries?limit=1000');
            if (surgeriesResponse.ok) {
                const surgeriesData = await surgeriesResponse.json();
                allAttendance = (surgeriesData.data || []).sort((a, b) => 
                    new Date(b.created_at || b.date) - new Date(a.created_at || a.date)
                );
                console.log(`✅ ${allAttendance.length} cirurgias carregadas`);
            } else {
                console.warn('⚠️ Tabela surgeries não encontrada');
                allAttendance = [];
            }
        } catch (e) {
            console.warn('⚠️ Erro ao carregar surgeries:', e.message);
            allAttendance = [];
        }

        filteredAttendance = [...allAttendance];
        console.log('✅ Dados carregados com sucesso');
        
    } catch (error) {
        console.error('❌ Erro geral ao carregar dados:', error);
        console.log('ℹ️ Sistema funcionando em modo limitado');
        allStudents = [];
        allAttendance = [];
        filteredAttendance = [];
    }
}

// Update statistics
function updateStatistics() {
    // Total students
    document.getElementById('totalStudents').textContent = allStudents.length;

    // Today's attendance
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = allAttendance.filter(a => a.date === today);
    document.getElementById('todayAttendance').textContent = todayAttendance.length;

    // Total records
    document.getElementById('totalRecords').textContent = allAttendance.length;

    // Attendance rate (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentAttendance = allAttendance.filter(a => 
        new Date(a.date) >= thirtyDaysAgo
    );
    
    const expectedDays = 30;
    const expectedTotal = allStudents.length * expectedDays;
    const actualTotal = recentAttendance.length;
    const rate = expectedTotal > 0 ? ((actualTotal / expectedTotal) * 100).toFixed(1) : 0;
    
    document.getElementById('attendanceRate').textContent = `${rate}%`;
}

// Render charts
function renderCharts() {
    renderAttendanceChart();
    renderStudentChart();
}

// Render attendance chart (last 7 days)
function renderAttendanceChart() {
    const canvas = document.getElementById('attendanceChart');
    const ctx = canvas.getContext('2d');

    // Get last 7 days
    const days = [];
    const counts = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
        
        days.push(dayName);
        const count = allAttendance.filter(a => a.date === dateStr).length;
        counts.push(count);
    }

    if (attendanceChart) {
        attendanceChart.destroy();
    }

    attendanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Cirurgias',
                data: counts,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Render student chart
function renderStudentChart() {
    const canvas = document.getElementById('studentChart');
    const ctx = canvas.getContext('2d');

    // Count attendance per student
    const studentCounts = {};
    allStudents.forEach(student => {
        const count = allAttendance.filter(a => a.student_id === student.id).length;
        studentCounts[student.name] = count;
    });

    const labels = Object.keys(studentCounts);
    const data = Object.values(studentCounts);
    const colors = [
        '#667eea', '#764ba2', '#f093fb', '#4facfe',
        '#43e97b', '#fa709a', '#fee140', '#30cfd0'
    ];

    if (studentChart) {
        studentChart.destroy();
    }

    studentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Setup filters
function setupFilters() {
    const filterClassPeriod = document.getElementById('filterClassPeriod');
    const filterStudent = document.getElementById('filterStudent');
    const studentListFilter = document.getElementById('studentListFilter');
    
    // Add event listener for class period filter
    filterClassPeriod.addEventListener('change', function() {
        populateStudentFilter(this.value);
    });
    
    // Add event listener for student list filter
    studentListFilter.addEventListener('change', function() {
        renderStudentList(this.value);
    });
    
    // Populate student filter initially
    populateStudentFilter('');

    // Set default date range (last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    document.getElementById('filterEndDate').valueAsDate = today;
    document.getElementById('filterStartDate').valueAsDate = thirtyDaysAgo;
}

// Populate student filter based on class period
function populateStudentFilter(classPeriod) {
    const filterStudent = document.getElementById('filterStudent');
    filterStudent.innerHTML = '<option value="">Todos os alunos</option>';
    
    const filteredStudents = classPeriod ? 
        allStudents.filter(s => s.class_period === classPeriod) : 
        allStudents;
    
    filteredStudents.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.name} (${student.class_period})`;
        filterStudent.appendChild(option);
    });
}

// Apply filters
function applyFilters() {
    const classPeriod = document.getElementById('filterClassPeriod').value;
    const studentId = document.getElementById('filterStudent').value;
    const startDate = document.getElementById('filterStartDate').value;
    const endDate = document.getElementById('filterEndDate').value;

    filteredAttendance = allAttendance.filter(att => {
        let match = true;
        
        // Filter by class period
        if (classPeriod) {
            const student = allStudents.find(s => s.id === att.student_id);
            if (!student || student.class_period !== classPeriod) {
                match = false;
            }
        }

        if (studentId && att.student_id !== studentId) {
            match = false;
        }

        if (startDate && att.date < startDate) {
            match = false;
        }

        if (endDate && att.date > endDate) {
            match = false;
        }

        return match;
    });

    currentPage = 1;
    renderAttendanceTable();
}

// Clear filters
function clearFilters() {
    document.getElementById('filterClassPeriod').value = '';
    document.getElementById('filterStudent').value = '';
    document.getElementById('filterStartDate').value = '';
    document.getElementById('filterEndDate').value = '';
    
    populateStudentFilter('');
    filteredAttendance = [...allAttendance];
    currentPage = 1;
    renderAttendanceTable();
}

// Render attendance table
function renderAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const pageData = filteredAttendance.slice(start, end);

    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="13" class="text-center py-8 text-gray-500">Nenhum registro encontrado</td></tr>';
        document.getElementById('recordsInfo').textContent = 'Mostrando 0 de 0 registros';
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    tbody.innerHTML = pageData.map(att => {
        const student = allStudents.find(s => s.id === att.student_id);
        const classPeriod = student ? student.class_period : '-';
        
        return `
        <tr class="hover:bg-gray-50 text-sm">
            <td class="px-3 py-3">${formatDate(att.date)}</td>
            <td class="px-3 py-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
                    ${classPeriod}
                </span>
            </td>
            <td class="px-3 py-3">
                <span class="font-semibold text-green-700">${att.perfusionist_main || '-'}</span>
            </td>
            <td class="px-3 py-3">
                <span class="text-gray-600">${att.perfusionist_auxiliary || att.student_name || '-'}</span>
            </td>
            <td class="px-3 py-3">
                <span class="font-semibold text-blue-700">${att.surgeon_name || '-'}</span>
            </td>
            <td class="px-3 py-3 max-w-xs truncate" title="${att.surgery_type || ''}">
                ${att.surgery_type || '<span class="text-gray-400">-</span>'}
            </td>
            <td class="px-3 py-3">
                <span class="inline-flex items-center text-green-700 text-xs">
                    <i class="fas fa-play-circle mr-1"></i>${att.check_in}
                </span>
            </td>
            <td class="px-3 py-3">
                ${att.check_out ? 
                    `<span class="inline-flex items-center text-red-700 text-xs">
                        <i class="fas fa-stop-circle mr-1"></i>${att.check_out}
                    </span>` : 
                    '<span class="text-gray-400">-</span>'
                }
            </td>
            <td class="px-3 py-3">
                ${att.surgery_time || (att.check_out ? calculateHours(att.check_in, att.check_out) : '-')}
            </td>
            <td class="px-3 py-3">
                <span class="inline-flex items-center px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
                    ${att.cec_time || '0'}m
                </span>
            </td>
            <td class="px-3 py-3">
                <span class="inline-flex items-center px-2 py-1 rounded bg-orange-100 text-orange-800 text-xs font-semibold">
                    ${att.clamp_time || '0'}m
                </span>
            </td>
            <td class="px-3 py-3 text-center">
                ${att.cec_attachment ? 
                    `<button onclick="downloadAttachment('${att.id}')" class="text-blue-600 hover:text-blue-800" title="Baixar Ficha CEC">
                        <i class="fas fa-download"></i>
                    </button>` : 
                    '<span class="text-gray-400">-</span>'
                }
            </td>
            <td class="px-3 py-3 text-center">
                <button onclick="deleteAttendance('${att.id}')" class="text-red-600 hover:text-red-800" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `}).join('');

    // Update info
    const total = filteredAttendance.length;
    const showing = Math.min(end, total);
    document.getElementById('recordsInfo').textContent = `Mostrando ${start + 1}-${showing} de ${total} registros`;

    // Render pagination
    renderPagination();
}

// Render pagination
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredAttendance.length / recordsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '';

    // Previous button
    html += `
        <button onclick="changePage(${currentPage - 1})" 
                ${currentPage === 1 ? 'disabled' : ''} 
                class="px-3 py-2 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `
                <button onclick="changePage(${i})" 
                        class="px-4 py-2 rounded ${i === currentPage ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += '<span class="px-2">...</span>';
        }
    }

    // Next button
    html += `
        <button onclick="changePage(${currentPage + 1})" 
                ${currentPage === totalPages ? 'disabled' : ''} 
                class="px-3 py-2 bg-gray-200 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    pagination.innerHTML = html;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredAttendance.length / recordsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderAttendanceTable();
}

// Delete attendance
async function deleteAttendance(id) {
    if (!confirm('Tem certeza que deseja excluir este registro?')) {
        return;
    }

    try {
        const response = await fetch(`tables/attendance/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Registro excluído com sucesso!');
            await loadData();
            updateStatistics();
            renderCharts();
            applyFilters();
        } else {
            alert('Erro ao excluir registro');
        }
    } catch (error) {
        console.error('Erro ao excluir registro:', error);
        alert('Erro ao excluir registro');
    }
}

// Download CEC attachment
async function downloadAttachment(attendanceId) {
    try {
        const response = await fetch(`tables/attendance/${attendanceId}`);
        const attendance = await response.json();
        
        if (!attendance.cec_attachment) {
            alert('Nenhum anexo encontrado para este registro');
            return;
        }
        
        // Parse attachment data
        const attachmentData = JSON.parse(attendance.cec_attachment);
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = attachmentData.data;
        link.download = attachmentData.filename || 'ficha-cec';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Erro ao baixar anexo:', error);
        alert('Erro ao baixar anexo');
    }
}

// Calculate hours
function calculateHours(checkIn, checkOut) {
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    
    const inMinutes = inHour * 60 + inMin;
    const outMinutes = outHour * 60 + outMin;
    const totalMinutes = outMinutes - inMinutes;
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}min`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric'
    });
}

// Export data to CSV
function exportData() {
    let csv = 'Data,Turma,Perfusionista Principal,Perfusionista Auxiliar,Cirurgião,Tipo Cirurgia,Início,Término,Duração,Tempo CEC (min),Tempo Pinça (min),Tem Ficha CEC,Observações\n';
    
    filteredAttendance.forEach(att => {
        const student = allStudents.find(s => s.id === att.student_id);
        const classPeriod = student ? student.class_period : '-';
        const duration = att.surgery_time || (att.check_out ? calculateHours(att.check_in, att.check_out) : '-');
        const notes = (att.notes || '').replace(/,/g, ';');
        const surgeryType = (att.surgery_type || '').replace(/,/g, ';');
        const perfusionistMain = att.perfusionist_main || '-';
        const perfusionistAux = att.perfusionist_auxiliary || att.student_name || '-';
        const hasAttachment = att.cec_attachment ? 'Sim' : 'Não';
        csv += `${att.date},${classPeriod},"${perfusionistMain}","${perfusionistAux}",${att.surgeon_name || '-'},"${surgeryType}",${att.check_in},${att.check_out || '-'},${duration},${att.cec_time || '0'},${att.clamp_time || '0'},${hasAttachment},"${notes}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `presencas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Render student list
function renderStudentList(filterClassPeriod = '') {
    const container = document.getElementById('studentList');
    
    const studentsToShow = filterClassPeriod ? 
        allStudents.filter(s => s.class_period === filterClassPeriod) : 
        allStudents;
    
    // Sort by class_period and then by name
    studentsToShow.sort((a, b) => {
        if (a.class_period !== b.class_period) {
            return a.class_period.localeCompare(b.class_period);
        }
        return a.name.localeCompare(b.name);
    });
    
    container.innerHTML = studentsToShow.map(student => {
        const attendanceCount = allAttendance.filter(a => a.student_id === student.id).length;
        
        return `
            <div class="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h4 class="font-bold text-gray-800">${student.name}</h4>
                        <p class="text-sm text-gray-600">Matrícula: ${student.registration}</p>
                        <p class="text-sm font-semibold text-purple-600">Turma: ${student.class_period}</p>
                        <p class="text-sm text-gray-600">${student.email}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-sm font-semibold ${student.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                        ${student.active ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
                <p class="text-sm text-gray-600 mb-1">${student.course}</p>
                <p class="text-sm text-gray-600 mb-3">${student.email}</p>
                <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold text-purple-600">
                        <i class="fas fa-heartbeat mr-1"></i>${attendanceCount} cirurgias
                    </span>
                    <div class="flex gap-2">
                        <button onclick="resetPassword('${student.id}', '${student.registration}')" 
                                class="text-sm px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
                                title="Resetar senha">
                            <i class="fas fa-key"></i>
                        </button>
                        <button onclick="toggleStudentStatus('${student.id}', ${!student.active})" 
                                class="text-sm px-3 py-1 rounded ${student.active ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white">
                            ${student.active ? 'Desativar' : 'Ativar'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Show add student form
function showAddStudentForm() {
    document.getElementById('addStudentModal').classList.remove('hidden');
}

// Close add student modal
function closeAddStudentModal() {
    document.getElementById('addStudentModal').classList.add('hidden');
    document.getElementById('addStudentForm').reset();
}

// Handle add student form submit
document.getElementById('addStudentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hash function for default password
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
    
    const registration = document.getElementById('newStudentRegistration').value;
    
    const studentData = {
        name: document.getElementById('newStudentName').value,
        registration: registration,
        email: document.getElementById('newStudentEmail').value,
        class_period: document.getElementById('newStudentClassPeriod').value,
        course: 'Estágio',
        password: simpleHash(registration), // Default password is the registration
        active: true
    };

    try {
        const response = await fetch('tables/students', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert('Aluno adicionado com sucesso!');
            closeAddStudentModal();
            await loadData();
            updateStatistics();
            renderStudentList();
            setupFilters();
        } else {
            alert('Erro ao adicionar aluno');
        }
    } catch (error) {
        console.error('Erro ao adicionar aluno:', error);
        alert('Erro ao adicionar aluno');
    }
});

// Reset password to default (registration)
async function resetPassword(studentId, registration) {
    if (!confirm(`Tem certeza que deseja resetar a senha deste perfusionista?\n\nA nova senha será: ${registration}`)) {
        return;
    }

    try {
        // Import hash function from auth.js
        function simpleHash(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return hash.toString();
        }

        const student = allStudents.find(s => s.id === studentId);
        if (!student) return;

        const updatedStudent = {
            ...student,
            password: simpleHash(registration)
        };

        const response = await fetch(`tables/students/${studentId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedStudent)
        });

        if (response.ok) {
            alert(`Senha resetada com sucesso!\n\nNova senha: ${registration}\n\nOriente o perfusionista a alterar a senha no próximo login.`);
            await loadData();
            renderStudentList();
        } else {
            alert('Erro ao resetar senha');
        }
    } catch (error) {
        console.error('Erro ao resetar senha:', error);
        alert('Erro ao resetar senha');
    }
}

// Toggle student status
async function toggleStudentStatus(studentId, newStatus) {
    try {
        const student = allStudents.find(s => s.id === studentId);
        if (!student) return;

        const updatedStudent = {
            ...student,
            active: newStatus
        };

        const response = await fetch(`tables/students/${studentId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedStudent)
        });

        if (response.ok) {
            alert(`Aluno ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
            await loadData();
            renderStudentList();
            setupFilters();
        } else {
            alert('Erro ao atualizar status do aluno');
        }
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        alert('Erro ao atualizar status do aluno');
    }
}
