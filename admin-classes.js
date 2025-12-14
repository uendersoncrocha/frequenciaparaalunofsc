// ============================================
// ADMIN CLASSES MANAGEMENT - Version 2.1
// ============================================

console.log('🏫 Admin Classes Management v2.1 - Loading...');

let allClasses = [];
let filteredClasses = [];
let allStudents = [];
let currentEditingClass = null;

// ============================================
// LOAD DATA
// ============================================

async function loadClasses() {
    try {
        console.log('📥 Loading classes...');
        
        // Load classes
        const classesResponse = await fetch('tables/classes?limit=1000');
        if (!classesResponse.ok) throw new Error('Failed to load classes');
        const classesData = await classesResponse.json();
        allClasses = classesData.data || [];
        
        // Load students to count per class
        const studentsResponse = await fetch('tables/students?limit=1000');
        if (studentsResponse.ok) {
            const studentsData = await studentsResponse.json();
            allStudents = studentsData.data || [];
            
            // Update student count for each class
            allClasses.forEach(cls => {
                cls.total_students = allStudents.filter(s => s.class_id === cls.id).length;
            });
        }
        
        console.log(`✅ Loaded ${allClasses.length} classes`);
        
        filteredClasses = [...allClasses];
        updateStatistics();
        displayClasses(filteredClasses);
        
    } catch (error) {
        console.error('❌ Error loading classes:', error);
        showErrorState();
    }
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function updateStatistics() {
    const totalClasses = allClasses.length;
    const activeClasses = allClasses.filter(c => c.active !== false).length;
    const inactiveClasses = totalClasses - activeClasses;
    const totalStudents = allClasses.reduce((sum, c) => sum + (c.total_students || 0), 0);
    
    document.getElementById('totalClasses').textContent = totalClasses;
    document.getElementById('activeClasses').textContent = activeClasses;
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('inactiveClasses').textContent = inactiveClasses;
}

function displayClasses(classes) {
    const grid = document.getElementById('classesGrid');
    
    if (!classes || classes.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-chalkboard text-6xl text-gray-300 mb-4"></i>
                <p class="text-xl font-semibold text-gray-600 mb-2">Nenhuma turma encontrada</p>
                <p class="text-sm text-gray-500 mb-4">
                    ${allClasses.length === 0 ? 'Clique em "Nova Turma" para começar' : 'Tente ajustar os filtros'}
                </p>
                <button onclick="showCreateClassModal()" class="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
                    <i class="fas fa-plus mr-2"></i>Criar Turma
                </button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = classes.map(cls => createClassCard(cls)).join('');
}

function createClassCard(cls) {
    const isActive = cls.active !== false && cls.active !== 'false';
    const studentCount = cls.total_students || 0;
    
    // Format dates
    const startDate = cls.start_date ? new Date(cls.start_date).toLocaleDateString('pt-BR') : 'Não definida';
    const endDate = cls.end_date ? new Date(cls.end_date).toLocaleDateString('pt-BR') : 'Não definida';
    
    // Calculate duration if both dates exist
    let duration = '';
    if (cls.start_date && cls.end_date) {
        const start = new Date(cls.start_date);
        const end = new Date(cls.end_date);
        const months = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
        duration = `${months} meses`;
    }
    
    // Period icon and colors
    const periodConfig = {
        'Matutino': { icon: 'fa-sun', color: 'text-yellow-600', bg: 'bg-yellow-50' },
        'Vespertino': { icon: 'fa-cloud-sun', color: 'text-orange-600', bg: 'bg-orange-50' },
        'Noturno': { icon: 'fa-moon', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        'Integral': { icon: 'fa-clock', color: 'text-blue-600', bg: 'bg-blue-50' }
    };
    const periodInfo = periodConfig[cls.period] || { icon: 'fa-clock', color: 'text-gray-600', bg: 'bg-gray-50' };
    
    // Status colors
    const statusColor = isActive ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-gray-400 to-gray-500';
    
    return `
        <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 border-2 border-transparent hover:border-indigo-200">
            <!-- Header -->
            <div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative overflow-hidden">
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                
                <div class="relative z-10">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1 pr-4">
                            <h3 class="text-2xl font-bold mb-2 leading-tight">${cls.name}</h3>
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-semibold">
                                    <i class="fas fa-hashtag mr-1"></i>${cls.code}
                                </span>
                                <span class="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-semibold">
                                    ${cls.year}/${cls.semester}º
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-2">
                            <span class="px-3 py-1.5 ${statusColor} rounded-full text-xs font-bold shadow-lg">
                                ${isActive ? '✓ ATIVA' : '✗ INATIVA'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Body -->
            <div class="p-6 space-y-4">
                <!-- Quick Stats -->
                <div class="grid grid-cols-2 gap-3">
                    <div class="${periodInfo.bg} rounded-xl p-4 border-2 border-${periodInfo.color.replace('text-', '')}-200">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas ${periodInfo.icon} ${periodInfo.color} text-lg"></i>
                            <p class="text-xs font-medium text-gray-600">Período</p>
                        </div>
                        <p class="font-bold ${periodInfo.color} text-sm">${cls.period}</p>
                    </div>
                    <div class="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-users text-indigo-600 text-lg"></i>
                            <p class="text-xs font-medium text-gray-600">Alunos</p>
                        </div>
                        <p class="font-bold text-indigo-600 text-sm">
                            ${studentCount} ${studentCount === 1 ? 'aluno' : 'alunos'}
                        </p>
                    </div>
                </div>
                
                ${cls.course ? `
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-graduation-cap text-blue-600"></i>
                        <p class="text-xs font-medium text-gray-600">Curso</p>
                    </div>
                    <p class="font-semibold text-gray-800 text-sm">${cls.course}</p>
                </div>
                ` : ''}
                
                <!-- Dates Info -->
                <div class="bg-gray-50 rounded-xl p-4 space-y-2 border-2 border-gray-200">
                    <div class="flex items-center justify-between text-xs">
                        <span class="text-gray-600 flex items-center gap-2">
                            <i class="fas fa-play-circle text-green-600"></i>Início
                        </span>
                        <span class="font-semibold text-gray-800">${startDate}</span>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                        <span class="text-gray-600 flex items-center gap-2">
                            <i class="fas fa-stop-circle text-red-600"></i>Término
                        </span>
                        <span class="font-semibold text-gray-800">${endDate}</span>
                    </div>
                    ${duration ? `
                    <div class="pt-2 mt-2 border-t border-gray-300 text-center">
                        <span class="text-xs text-gray-600">
                            <i class="fas fa-hourglass-half mr-1"></i>Duração: <strong class="text-indigo-600">${duration}</strong>
                        </span>
                    </div>
                    ` : ''}
                </div>
                
                ${cls.description ? `
                <div class="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                    <p class="text-xs font-medium text-gray-600 mb-1">
                        <i class="fas fa-info-circle mr-1"></i>Observações
                    </p>
                    <p class="text-xs text-gray-700 leading-relaxed line-clamp-2">${cls.description}</p>
                </div>
                ` : ''}
                
                <!-- Actions -->
                <div class="grid grid-cols-2 gap-2 pt-4 border-t-2 border-gray-200">
                    <button onclick="viewStudents('${cls.id}', '${cls.name}')" 
                            class="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <i class="fas fa-users mr-2"></i>Alunos
                    </button>
                    <button onclick="editClass('${cls.id}')" 
                            class="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <i class="fas fa-edit mr-2"></i>Editar
                    </button>
                </div>
                
                <button onclick="deleteClass('${cls.id}', '${cls.name}')" 
                        class="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-bold shadow-md hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-red-800">
                    <i class="fas fa-trash-alt mr-2"></i>EXCLUIR TURMA
                </button>
            </div>
        </div>
    `;
}

function showErrorState() {
    document.getElementById('classesGrid').innerHTML = `
        <div class="col-span-full text-center py-12">
            <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <p class="text-lg text-red-600 mb-4">Erro ao carregar turmas</p>
            <button onclick="loadClasses()" class="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
                <i class="fas fa-redo mr-2"></i>Tentar Novamente
            </button>
        </div>
    `;
}

// ============================================
// FILTER FUNCTIONS
// ============================================

function filterClasses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const periodFilter = document.getElementById('periodFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    filteredClasses = allClasses.filter(cls => {
        // Search filter
        const matchesSearch = 
            cls.name.toLowerCase().includes(searchTerm) ||
            cls.code.toLowerCase().includes(searchTerm) ||
            (cls.course && cls.course.toLowerCase().includes(searchTerm));
        
        // Status filter
        const isActive = cls.active !== false;
        const matchesStatus = 
            statusFilter === 'all' ||
            (statusFilter === 'active' && isActive) ||
            (statusFilter === 'inactive' && !isActive);
        
        // Period filter
        const matchesPeriod = 
            periodFilter === 'all' ||
            cls.period === periodFilter;
        
        return matchesSearch && matchesStatus && matchesPeriod;
    });
    
    // Apply sorting
    filteredClasses.sort((a, b) => {
        switch (sortFilter) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'year-desc':
                return (b.year || 0) - (a.year || 0) || (b.semester || 0) - (a.semester || 0);
            case 'year-asc':
                return (a.year || 0) - (b.year || 0) || (a.semester || 0) - (b.semester || 0);
            case 'students-desc':
                return (b.total_students || 0) - (a.total_students || 0);
            case 'students-asc':
                return (a.total_students || 0) - (b.total_students || 0);
            default:
                return 0;
        }
    });
    
    displayClasses(filteredClasses);
    console.log(`🔍 Filtered: ${filteredClasses.length} of ${allClasses.length} classes`);
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('periodFilter').value = 'all';
    document.getElementById('sortFilter').value = 'name-asc';
    filterClasses();
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function showCreateClassModal() {
    currentEditingClass = null;
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus mr-2"></i>Nova Turma';
    document.getElementById('classForm').reset();
    document.getElementById('classId').value = '';
    document.getElementById('classActive').checked = true;
    document.getElementById('classYear').value = new Date().getFullYear();
    document.getElementById('classModal').classList.remove('hidden');
}

function closeClassModal() {
    document.getElementById('classModal').classList.add('hidden');
    currentEditingClass = null;
}

// ============================================
// CRUD OPERATIONS
// ============================================

// Create/Update Class
document.getElementById('classForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const classId = document.getElementById('classId').value;
    const isEditing = !!classId;
    
    const adminSession = JSON.parse(localStorage.getItem('adminSession'));
    
    // Get current data if editing to preserve total_students
    let currentClass = null;
    if (isEditing) {
        currentClass = allClasses.find(c => c.id === classId);
    }
    
    const classData = {
        name: document.getElementById('className').value.trim(),
        code: document.getElementById('classCode').value.trim(),
        year: parseInt(document.getElementById('classYear').value),
        semester: parseInt(document.getElementById('classSemester').value),
        period: document.getElementById('classPeriod').value,
        course: document.getElementById('classCourse').value.trim(),
        start_date: document.getElementById('classStartDate').value || null,
        end_date: document.getElementById('classEndDate').value || null,
        description: document.getElementById('classDescription').value.trim(),
        active: document.getElementById('classActive').checked,
        coordinator_id: adminSession?.id || 'admin',
        total_students: currentClass ? currentClass.total_students : 0
    };
    
    try {
        const url = isEditing ? `tables/classes/${classId}` : 'tables/classes';
        const method = isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(classData)
        });
        
        if (!response.ok) throw new Error('Failed to save class');
        
        alert(`✅ Turma ${isEditing ? 'atualizada' : 'criada'} com sucesso!`);
        
        closeClassModal();
        await loadClasses();
        
    } catch (error) {
        console.error('❌ Error saving class:', error);
        alert('❌ Erro ao salvar turma. Tente novamente.');
    }
});

// Edit Class
async function editClass(classId) {
    const cls = allClasses.find(c => c.id === classId);
    if (!cls) {
        alert('❌ Turma não encontrada');
        return;
    }
    
    currentEditingClass = cls;
    
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit mr-2"></i>Editar Turma';
    document.getElementById('classId').value = cls.id;
    document.getElementById('className').value = cls.name;
    document.getElementById('classCode').value = cls.code;
    document.getElementById('classYear').value = cls.year;
    document.getElementById('classSemester').value = cls.semester;
    document.getElementById('classPeriod').value = cls.period;
    document.getElementById('classCourse').value = cls.course || '';
    document.getElementById('classStartDate').value = cls.start_date ? cls.start_date.split('T')[0] : '';
    document.getElementById('classEndDate').value = cls.end_date ? cls.end_date.split('T')[0] : '';
    document.getElementById('classDescription').value = cls.description || '';
    document.getElementById('classActive').checked = cls.active !== false;
    
    document.getElementById('classModal').classList.remove('hidden');
}

// Delete Class
async function deleteClass(classId, className) {
    const cls = allClasses.find(c => c.id === classId);
    const studentCount = cls ? cls.total_students : 0;
    
    let confirmMsg = `⚠️ ATENÇÃO!\n\nDeseja realmente excluir a turma "${className}"?`;
    
    if (studentCount > 0) {
        confirmMsg += `\n\n⚠️ Esta turma possui ${studentCount} aluno(s) cadastrado(s)!`;
        confirmMsg += `\n\nOs alunos NÃO serão excluídos, mas ficarão sem turma.`;
    }
    
    confirmMsg += `\n\nEsta ação NÃO pode ser desfeita!`;
    
    if (!confirm(confirmMsg)) return;
    
    try {
        const response = await fetch(`tables/classes/${classId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete class');
        
        alert('✅ Turma excluída com sucesso!');
        await loadClasses();
        
    } catch (error) {
        console.error('❌ Error deleting class:', error);
        alert('❌ Erro ao excluir turma. Tente novamente.');
    }
}

// View Students
function viewStudents(classId, className) {
    // Redirect to students page with class filter
    localStorage.setItem('filterClassId', classId);
    localStorage.setItem('filterClassName', className);
    window.location.href = 'admin-students.html';
}

// ============================================
// NAVIGATION
// ============================================

function goBack() {
    window.location.href = 'admin.html';
}

// ============================================
// INITIALIZATION
// ============================================

console.log('✅ Admin Classes Management v2.1 - Loaded');
