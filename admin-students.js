// Admin Students Management - Version 1.0
// Full CRUD for student management by coordinators

console.log('👥 Admin Students Management v1.0 - Loading...');

// ==========================================
// GLOBAL STATE
// ==========================================

let allStudents = [];
let allClasses = [];
let currentEditingStudent = null;

// ==========================================
// LOAD DATA
// ==========================================

async function loadClasses() {
    try {
        console.log('📚 Loading classes...');
        const response = await fetch('tables/classes?limit=100');
        
        if (!response.ok) {
            throw new Error('Failed to load classes');
        }
        
        const data = await response.json();
        allClasses = data.data || [];
        
        console.log(`✅ Loaded ${allClasses.length} classes`);
        
        // Update class filter
        updateClassFilter();
        
        // Update class select in form
        updateClassSelect();
        
        // Update statistics
        updateStatistics();
        
    } catch (error) {
        console.error('❌ Error loading classes:', error);
        if (window.Toast) {
            window.Toast.error('Erro ao carregar turmas');
        }
    }
}

async function loadStudents() {
    try {
        console.log('👥 Loading students...');
        const response = await fetch('tables/students?limit=200');
        
        if (!response.ok) {
            throw new Error('Failed to load students');
        }
        
        const data = await response.json();
        allStudents = data.data || [];
        
        console.log(`✅ Loaded ${allStudents.length} students`);
        
        // Display students
        displayStudents(allStudents);
        
        // Update statistics
        updateStatistics();
        
    } catch (error) {
        console.error('❌ Error loading students:', error);
        const tbody = document.getElementById('studentsTableBody');
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-12 text-center text-red-500">
                    <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                    <p class="text-lg font-semibold">Erro ao carregar alunos</p>
                    <p class="text-sm">${error.message}</p>
                    <button onclick="loadStudents()" class="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        <i class="fas fa-redo mr-2"></i>Tentar Novamente
                    </button>
                </td>
            </tr>
        `;
        
        if (window.Toast) {
            window.Toast.error('Erro ao carregar alunos');
        }
    }
}

// ==========================================
// DISPLAY FUNCTIONS
// ==========================================

function displayStudents(students) {
    const tbody = document.getElementById('studentsTableBody');
    
    if (!students || students.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-users-slash text-6xl mb-4 opacity-50"></i>
                    <p class="text-xl font-semibold">Nenhum aluno encontrado</p>
                    <p class="text-sm mt-2">Clique em "Novo Aluno" para cadastrar</p>
                    <button onclick="showCreateStudentModal()" class="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
                        <i class="fas fa-user-plus mr-2"></i>Cadastrar Primeiro Aluno
                    </button>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = students.map(student => {
        const classInfo = allClasses.find(c => c.id === student.class_id);
        const className = classInfo ? classInfo.name : student.class_period || 'Sem turma';
        const isActive = student.active !== false && student.active !== 'false';
        const isFirstLogin = student.first_login === true || student.first_login === 'true';
        
        return `
            <tr class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                        ${student.photo_url ? 
                            `<img src="${student.photo_url}" alt="${student.name}" class="w-full h-full object-cover">` : 
                            student.name.charAt(0).toUpperCase()
                        }
                    </div>
                </td>
                <td class="px-6 py-4">
                    <div class="font-semibold text-gray-800">${student.name}</div>
                    <div class="text-sm text-gray-500">${student.course || 'Sem curso'}</div>
                </td>
                <td class="px-6 py-4">
                    <code class="px-3 py-1 bg-gray-100 rounded-lg text-sm font-mono">${student.registration}</code>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm text-gray-700">${student.email || 'Sem e-mail'}</div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                        ${className}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <div class="flex flex-col gap-1">
                        <span class="px-3 py-1 ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-lg text-xs font-medium inline-flex items-center gap-1 w-fit">
                            <i class="fas ${isActive ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                            ${isActive ? 'Ativo' : 'Inativo'}
                        </span>
                        ${isFirstLogin ? 
                            '<span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium inline-flex items-center gap-1 w-fit"><i class="fas fa-clock"></i>1º Acesso</span>' : 
                            ''
                        }
                    </div>
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="viewStudent('${student.id}')" 
                                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Ver detalhes">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="editStudent('${student.id}')" 
                                class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="resetPassword('${student.id}')" 
                                class="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                                title="Resetar senha">
                            <i class="fas fa-key"></i>
                        </button>
                        <button onclick="deleteStudent('${student.id}', '${student.name}')" 
                                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function updateClassFilter() {
    const select = document.getElementById('classFilter');
    select.innerHTML = '<option value="">Todas as turmas</option>';
    
    allClasses.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.id;
        option.textContent = cls.name;
        select.appendChild(option);
    });
}

function updateClassSelect() {
    const select = document.getElementById('studentClass');
    select.innerHTML = '<option value="">Selecione uma turma</option>';
    
    allClasses.filter(cls => cls.active !== false).forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.id;
        option.textContent = cls.name;
        option.dataset.period = cls.period;
        option.dataset.course = cls.course;
        select.appendChild(option);
    });
}

function updateStatistics() {
    // Total students
    document.getElementById('totalStudents').textContent = allStudents.length;
    
    // Active students
    const activeCount = allStudents.filter(s => s.active !== false && s.active !== 'false').length;
    document.getElementById('activeStudents').textContent = activeCount;
    
    // First login students
    const firstLoginCount = allStudents.filter(s => s.first_login === true || s.first_login === 'true').length;
    document.getElementById('firstLoginStudents').textContent = firstLoginCount;
    
    // Total classes
    document.getElementById('totalClasses').textContent = allClasses.length;
}

// ==========================================
// FILTER FUNCTIONS
// ==========================================

function filterStudents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const classFilter = document.getElementById('classFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filtered = allStudents;
    
    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(student => 
            student.name.toLowerCase().includes(searchTerm) ||
            student.registration.toLowerCase().includes(searchTerm) ||
            (student.email && student.email.toLowerCase().includes(searchTerm))
        );
    }
    
    // Class filter
    if (classFilter) {
        filtered = filtered.filter(student => student.class_id === classFilter);
    }
    
    // Status filter
    if (statusFilter === 'active') {
        filtered = filtered.filter(student => student.active !== false && student.active !== 'false');
    } else if (statusFilter === 'inactive') {
        filtered = filtered.filter(student => student.active === false || student.active === 'false');
    }
    
    displayStudents(filtered);
}

// ==========================================
// MODAL FUNCTIONS
// ==========================================

function showCreateStudentModal() {
    currentEditingStudent = null;
    
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-user-plus mr-2"></i>Novo Aluno';
    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
    document.getElementById('studentActive').checked = true;
    document.getElementById('studentRegistration').value = 'Será gerada automaticamente';
    
    // Set default date
    document.getElementById('studentEnrollmentDate').value = new Date().toISOString().split('T')[0];
    
    document.getElementById('studentModal').classList.remove('hidden');
}

function closeStudentModal() {
    document.getElementById('studentModal').classList.add('hidden');
    currentEditingStudent = null;
}

function closeViewStudentModal() {
    document.getElementById('viewStudentModal').classList.add('hidden');
}

// ==========================================
// CRUD OPERATIONS
// ==========================================

function generateRegistration() {
    // Generate registration: YEAR + 4 random digits
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${year}${random}`;
}

document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const isEditing = !!studentId;
    
    // Get selected class
    const classSelect = document.getElementById('studentClass');
    const selectedOption = classSelect.options[classSelect.selectedIndex];
    
    const studentData = {
        name: document.getElementById('studentName').value.trim(),
        email: document.getElementById('studentEmail').value.trim(),
        phone: document.getElementById('studentPhone').value.trim(),
        cpf: document.getElementById('studentCPF').value.trim(),
        birth_date: document.getElementById('studentBirthDate').value || null,
        class_id: document.getElementById('studentClass').value,
        class_period: selectedOption.dataset.period || '',
        course: document.getElementById('studentCourse').value.trim() || selectedOption.dataset.course || '',
        enrollment_date: document.getElementById('studentEnrollmentDate').value || new Date().toISOString().split('T')[0],
        active: document.getElementById('studentActive').checked,
        notes: document.getElementById('studentNotes').value.trim(),
        first_login: true
    };
    
    // Generate registration if creating new student
    if (!isEditing) {
        studentData.registration = generateRegistration();
        studentData.password = simpleHash(studentData.registration); // Password = registration
        
        const adminSession = JSON.parse(localStorage.getItem('adminSession'));
        studentData.created_by = adminSession.id;
    } else {
        // Keep existing registration when editing
        studentData.registration = currentEditingStudent.registration;
    }
    
    try {
        console.log(isEditing ? '✏️ Updating student...' : '➕ Creating student...');
        
        const url = isEditing ? `tables/students/${studentId}` : 'tables/students';
        const method = isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to save student');
        }
        
        const savedStudent = await response.json();
        
        console.log('✅ Student saved:', savedStudent);
        
        if (window.Toast) {
            window.Toast.success(isEditing ? 'Aluno atualizado com sucesso!' : 'Aluno criado com sucesso!');
        }
        
        if (window.HapticFeedback) {
            window.HapticFeedback.success();
        }
        
        // Show registration info for new students
        if (!isEditing) {
            alert(`✅ Aluno criado com sucesso!\n\n📝 Matrícula: ${studentData.registration}\n🔑 Senha inicial: ${studentData.registration}\n\n⚠️ O aluno deverá alterar a senha no primeiro acesso.`);
        }
        
        closeStudentModal();
        await loadStudents();
        
    } catch (error) {
        console.error('❌ Error saving student:', error);
        if (window.Toast) {
            window.Toast.error('Erro ao salvar aluno: ' + error.message);
        }
    }
});

// Simple hash function (same as in auth.js)
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

async function editStudent(studentId) {
    const student = allStudents.find(s => s.id === studentId);
    if (!student) {
        if (window.Toast) {
            window.Toast.error('Aluno não encontrado');
        }
        return;
    }
    
    currentEditingStudent = student;
    
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit mr-2"></i>Editar Aluno';
    document.getElementById('studentId').value = student.id;
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentEmail').value = student.email || '';
    document.getElementById('studentPhone').value = student.phone || '';
    document.getElementById('studentCPF').value = student.cpf || '';
    document.getElementById('studentBirthDate').value = student.birth_date ? student.birth_date.split('T')[0] : '';
    document.getElementById('studentRegistration').value = student.registration;
    document.getElementById('studentClass').value = student.class_id || '';
    document.getElementById('studentCourse').value = student.course || '';
    document.getElementById('studentEnrollmentDate').value = student.enrollment_date ? student.enrollment_date.split('T')[0] : '';
    document.getElementById('studentActive').checked = student.active !== false && student.active !== 'false';
    document.getElementById('studentNotes').value = student.notes || '';
    
    document.getElementById('studentModal').classList.remove('hidden');
}

async function viewStudent(studentId) {
    const student = allStudents.find(s => s.id === studentId);
    if (!student) {
        if (window.Toast) {
            window.Toast.error('Aluno não encontrado');
        }
        return;
    }
    
    const classInfo = allClasses.find(c => c.id === student.class_id);
    const isActive = student.active !== false && student.active !== 'false';
    const isFirstLogin = student.first_login === true || student.first_login === 'true';
    
    const content = document.getElementById('viewStudentContent');
    content.innerHTML = `
        <div class="space-y-6">
            <!-- Photo and basic info -->
            <div class="flex items-center gap-6 pb-6 border-b">
                <div class="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-4xl overflow-hidden">
                    ${student.photo_url ? 
                        `<img src="${student.photo_url}" alt="${student.name}" class="w-full h-full object-cover">` : 
                        student.name.charAt(0).toUpperCase()
                    }
                </div>
                <div class="flex-1">
                    <h3 class="text-2xl font-bold text-gray-800">${student.name}</h3>
                    <p class="text-gray-500">${student.email || 'Sem e-mail'}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="px-3 py-1 ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-lg text-sm font-medium">
                            ${isActive ? '✓ Ativo' : '✗ Inativo'}
                        </span>
                        ${isFirstLogin ? '<span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">Primeiro Acesso Pendente</span>' : ''}
                    </div>
                </div>
            </div>
            
            <!-- Academic Info -->
            <div>
                <h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-graduation-cap text-indigo-600 mr-2"></i>
                    Informações Acadêmicas
                </h4>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-500">Matrícula</p>
                        <p class="font-semibold text-gray-800"><code class="bg-gray-100 px-2 py-1 rounded">${student.registration}</code></p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Turma</p>
                        <p class="font-semibold text-gray-800">${classInfo ? classInfo.name : student.class_period || 'Sem turma'}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Curso</p>
                        <p class="font-semibold text-gray-800">${student.course || 'Não especificado'}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Data de Matrícula</p>
                        <p class="font-semibold text-gray-800">${student.enrollment_date ? new Date(student.enrollment_date).toLocaleDateString('pt-BR') : 'Não especificada'}</p>
                    </div>
                </div>
            </div>
            
            <!-- Personal Info -->
            <div>
                <h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-id-card text-indigo-600 mr-2"></i>
                    Informações Pessoais
                </h4>
                <div class="grid grid-cols-2 gap-4">
                    ${student.phone ? `
                    <div>
                        <p class="text-sm text-gray-500">Telefone</p>
                        <p class="font-semibold text-gray-800">${student.phone}</p>
                    </div>
                    ` : ''}
                    ${student.cpf ? `
                    <div>
                        <p class="text-sm text-gray-500">CPF</p>
                        <p class="font-semibold text-gray-800">${student.cpf}</p>
                    </div>
                    ` : ''}
                    ${student.birth_date ? `
                    <div>
                        <p class="text-sm text-gray-500">Data de Nascimento</p>
                        <p class="font-semibold text-gray-800">${new Date(student.birth_date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            ${student.notes ? `
            <!-- Notes -->
            <div>
                <h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-sticky-note text-indigo-600 mr-2"></i>
                    Observações
                </h4>
                <p class="text-gray-700 bg-gray-50 p-4 rounded-xl">${student.notes}</p>
            </div>
            ` : ''}
            
            <!-- System Info -->
            <div class="pt-4 border-t">
                <h4 class="text-sm font-semibold text-gray-500 mb-2">Informações do Sistema</h4>
                <div class="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>Criado em: ${new Date(student.created_at).toLocaleString('pt-BR')}</div>
                    <div>Atualizado em: ${new Date(student.updated_at).toLocaleString('pt-BR')}</div>
                </div>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t">
                <button onclick="closeViewStudentModal(); editStudent('${student.id}')" 
                        class="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
                    <i class="fas fa-edit mr-2"></i>
                    Editar
                </button>
                <button onclick="closeViewStudentModal()" 
                        class="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('viewStudentModal').classList.remove('hidden');
}

async function resetPassword(studentId) {
    const student = allStudents.find(s => s.id === studentId);
    if (!student) {
        if (window.Toast) {
            window.Toast.error('Aluno não encontrado');
        }
        return;
    }
    
    const confirm = window.confirm(
        `⚠️ Resetar senha do aluno?\n\n` +
        `Aluno: ${student.name}\n` +
        `Matrícula: ${student.registration}\n\n` +
        `A senha será resetada para a matrícula.\n` +
        `O aluno precisará fazer login com a matrícula como senha.`
    );
    
    if (!confirm) return;
    
    try {
        const newPassword = simpleHash(student.registration);
        
        const response = await fetch(`tables/students/${studentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: newPassword,
                first_login: true
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to reset password');
        }
        
        console.log('✅ Password reset for:', student.name);
        
        if (window.Toast) {
            window.Toast.success('Senha resetada com sucesso!');
        }
        
        alert(`✅ Senha resetada!\n\n📝 Matrícula: ${student.registration}\n🔑 Nova senha: ${student.registration}\n\n⚠️ O aluno deverá alterar no próximo login.`);
        
        await loadStudents();
        
    } catch (error) {
        console.error('❌ Error resetting password:', error);
        if (window.Toast) {
            window.Toast.error('Erro ao resetar senha');
        }
    }
}

async function deleteStudent(studentId, studentName) {
    const confirm = window.confirm(
        `⚠️ ATENÇÃO!\n\n` +
        `Tem certeza que deseja excluir o aluno?\n\n` +
        `Nome: ${studentName}\n\n` +
        `Esta ação NÃO pode ser desfeita!`
    );
    
    if (!confirm) return;
    
    const doubleConfirm = window.confirm(
        `🚨 ÚLTIMA CONFIRMAÇÃO!\n\n` +
        `Excluir permanentemente: ${studentName}?\n\n` +
        `Todas as cirurgias e módulos deste aluno também serão afetados.`
    );
    
    if (!doubleConfirm) return;
    
    try {
        console.log('🗑️ Deleting student:', studentId);
        
        const response = await fetch(`tables/students/${studentId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete student');
        }
        
        console.log('✅ Student deleted');
        
        if (window.Toast) {
            window.Toast.success('Aluno excluído com sucesso!');
        }
        
        if (window.HapticFeedback) {
            window.HapticFeedback.success();
        }
        
        await loadStudents();
        
    } catch (error) {
        console.error('❌ Error deleting student:', error);
        if (window.Toast) {
            window.Toast.error('Erro ao excluir aluno');
        }
    }
}

// ==========================================
// NAVIGATION
// ==========================================

function goBack() {
    window.history.back();
}

console.log('✅ Admin Students Management - Loaded successfully');
