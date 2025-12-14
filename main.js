// ===============================================
// Sistema de Registro de Cirurgias v8.5
// ===============================================

// Global variables
let allStudents = [];
let students = [];
let currentStudent = null;
let currentSurgeryId = null;
let selectedClassPeriod = '';
let cecAttachmentData = null;
let cecSheetData = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Sistema de Cirurgias iniciando...');
    await loadStudents();
    setupEventListeners();
    autoLoadLoggedInUser();
});

// ===============================================
// LOAD DATA
// ===============================================

// Load students from API
async function loadStudents() {
    try {
        const response = await fetch('tables/students?limit=100');
        const data = await response.json();
        allStudents = data.data.filter(s => s.active);
        console.log(`✅ ${allStudents.length} alunos carregados`);
    } catch (error) {
        console.error('❌ Erro ao carregar alunos:', error);
        showError('Erro ao carregar lista de alunos');
    }
}

// Populate student select dropdown based on selected class period
function populateStudentSelect(classPeriod) {
    const select = document.getElementById('studentSelect');
    const container = document.getElementById('studentSelectContainer');
    
    select.innerHTML = '<option value="">-- Escolha seu nome --</option>';
    
    students = allStudents.filter(s => s.class_period === classPeriod);
    
    if (students.length === 0) {
        container.classList.add('hidden');
        showError('Nenhum aluno encontrado nesta turma');
        return;
    }
    
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.name;
        select.appendChild(option);
    });
    
    container.classList.remove('hidden');
}

// ===============================================
// EVENT LISTENERS
// ===============================================

function setupEventListeners() {
    const cecAttachment = document.getElementById('cecAttachment');
    const cecSheet = document.getElementById('cecSheet');
    
    if (cecAttachment) cecAttachment.addEventListener('change', handleAttachmentChange);
    if (cecSheet) cecSheet.addEventListener('change', handleCecSheetChange);
}

// ===============================================
// AUTO LOAD LOGGED USER
// ===============================================

async function autoLoadLoggedInUser() {
    const loggedUser = getLoggedInUser();
    if (!loggedUser) {
        console.log('⚠️ Nenhum usuário logado');
        return;
    }
    
    console.log('✅ Usuário logado:', loggedUser.name);
    
    // Find the student in allStudents
    const student = allStudents.find(s => s.id === loggedUser.id);
    if (!student) {
        console.error('❌ Usuário logado não encontrado na lista de alunos');
        return;
    }
    
    // Set the current student
    currentStudent = student;
    selectedClassPeriod = student.class_period;
    
    console.log('✅ Aluno atual:', currentStudent.name);
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    const surgeryDateInput = document.getElementById('surgeryDate');
    const moduleDateInput = document.getElementById('moduleDate');
    if (surgeryDateInput) surgeryDateInput.value = today;
    if (moduleDateInput) moduleDateInput.value = today;
    
    // Display student header with stats
    displayStudentHeader(currentStudent);
    await loadStudentStatistics(currentStudent.id);
    
    // Display student info and load data
    setPerfusionistAuxiliary();
    await checkTodaySurgery();
    await loadRecentSurgeries();
    document.getElementById('attendanceForm').classList.remove('hidden');
}

// ===============================================
// HANDLE CHANGES
// ===============================================

function handleClassPeriodChange(event) {
    selectedClassPeriod = event.target.value;
    
    // Reset student selection
    document.getElementById('studentInfo').classList.add('hidden');
    document.getElementById('attendanceForm').classList.add('hidden');
    currentStudent = null;
    
    if (!selectedClassPeriod) {
        document.getElementById('studentSelectContainer').classList.add('hidden');
        return;
    }
    
    populateStudentSelect(selectedClassPeriod);
}

async function handleStudentChange(event) {
    const studentId = event.target.value;
    
    if (!studentId) {
        document.getElementById('studentInfo').classList.add('hidden');
        document.getElementById('attendanceForm').classList.add('hidden');
        currentStudent = null;
        return;
    }

    currentStudent = students.find(s => s.id === studentId);
    
    if (currentStudent) {
        displayStudentInfo(currentStudent);
        setPerfusionistAuxiliary();
        await checkTodaySurgery();
        await loadRecentSurgeries();
        document.getElementById('attendanceForm').classList.remove('hidden');
    }
}

// ===============================================
// DISPLAY FUNCTIONS
// ===============================================

function setPerfusionistAuxiliary() {
    const auxiliaryField = document.getElementById('perfusionistAuxiliary');
    if (currentStudent && auxiliaryField) {
        auxiliaryField.value = currentStudent.name;
    }
}

function displayStudentInfo(student) {
    document.getElementById('infoName').textContent = student.name;
    document.getElementById('infoRegistration').textContent = student.registration;
    document.getElementById('infoClassPeriod').textContent = student.class_period;
    document.getElementById('infoEmail').textContent = student.email;
    document.getElementById('studentInfo').classList.remove('hidden');
}

// ===============================================
// CHECK TODAY'S SURGERY
// ===============================================

async function checkTodaySurgery() {
    if (!currentStudent) return;
    
    try {
        const today = new Date().toISOString().split('T')[0];
        console.log('🔍 Verificando cirurgia de hoje:', today);
        
        const response = await fetch(`tables/surgeries?limit=100`);
        const data = await response.json();
        
        const todaySurgery = data.data.find(s => 
            s.student_id === currentStudent.id && s.date === today
        );

        const statusDiv = document.getElementById('todayStatus');
        const checkInBtn = document.getElementById('checkInBtn');
        const checkOutBtn = document.getElementById('checkOutBtn');
        const notesInput = document.getElementById('notesInput');

        if (todaySurgery) {
            currentSurgeryId = todaySurgery.id;
            console.log('✅ Cirurgia encontrada:', todaySurgery);
            
            if (todaySurgery.status === 'completed' && todaySurgery.end_time) {
                // Already completed
                displayCompletedSurgery(todaySurgery);
                disableAllFields();
                checkInBtn.disabled = true;
                checkOutBtn.disabled = true;
            } else if (todaySurgery.status === 'started') {
                // In progress
                displayInProgressSurgery(todaySurgery);
                fillFieldsWithData(todaySurgery, false);
                checkInBtn.disabled = true;
                checkOutBtn.disabled = false;
            }
        } else {
            // No surgery today
            console.log('⚠️ Nenhuma cirurgia registrada hoje');
            displayNoSurgeryToday();
            enableAllFields();
            clearAllFields();
            checkInBtn.disabled = false;
            checkOutBtn.disabled = true;
            currentSurgeryId = null;
        }
    } catch (error) {
        console.error('❌ Erro ao verificar cirurgia:', error);
    }
}

function displayCompletedSurgery(surgery) {
    const statusDiv = document.getElementById('todayStatus');
    const hours = (surgery.total_surgery_time / 60).toFixed(1);
    
    statusDiv.innerHTML = `
        <div class="bg-blue-100 border-2 border-blue-400 rounded-lg p-4">
            <p class="font-bold text-blue-900 text-lg mb-2">
                <i class="fas fa-check-circle mr-2"></i>Cirurgia já registrada hoje!
            </p>
            <div class="text-blue-800 grid md:grid-cols-2 gap-2">
                <p><strong>Início:</strong> ${surgery.start_time}</p>
                <p><strong>Término:</strong> ${surgery.end_time}</p>
                <p><strong>Duração Total:</strong> ${surgery.total_surgery_time} min (${hours}h)</p>
                <p><strong>Perfusionista Principal:</strong> ${surgery.perfusionist_main || '-'}</p>
                <p><strong>Perfusionista Auxiliar:</strong> ${surgery.perfusionist_auxiliary || '-'}</p>
                <p><strong>Cirurgião:</strong> ${surgery.surgeon_name || '-'}</p>
                <p><strong>Tipo:</strong> ${surgery.surgery_type || '-'}</p>
                <p><strong>Responsável:</strong> ${surgery.was_responsible ? '✅ Sim' : '❌ Não'}</p>
                <p><strong>Tempo CEC:</strong> ${surgery.cec_time || '0'} min</p>
                <p><strong>Tempo Pinça:</strong> ${surgery.clamp_time || '0'} min</p>
                ${surgery.notes ? `<p class="col-span-2"><strong>Obs:</strong> ${surgery.notes}</p>` : ''}
            </div>
        </div>
    `;
}

function displayInProgressSurgery(surgery) {
    const statusDiv = document.getElementById('todayStatus');
    statusDiv.innerHTML = `
        <div class="bg-green-100 border-2 border-green-400 rounded-lg p-4">
            <p class="font-bold text-green-900 text-lg mb-2">
                <i class="fas fa-heartbeat mr-2"></i>Cirurgia em Andamento!
            </p>
            <div class="text-green-800 grid md:grid-cols-2 gap-2">
                <p><strong>Início:</strong> ${surgery.start_time}</p>
                <p><strong>Perfusionista Principal:</strong> ${surgery.perfusionist_main || '-'}</p>
                <p><strong>Perfusionista Auxiliar:</strong> ${surgery.perfusionist_auxiliary || '-'}</p>
                <p><strong>Cirurgião:</strong> ${surgery.surgeon_name || '-'}</p>
                <p class="col-span-2"><strong>Tipo:</strong> ${surgery.surgery_type || '-'}</p>
            </div>
        </div>
    `;
}

function displayNoSurgeryToday() {
    const statusDiv = document.getElementById('todayStatus');
    statusDiv.innerHTML = `
        <div class="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
            <p class="font-bold text-yellow-900 text-lg">
                <i class="fas fa-exclamation-triangle mr-2"></i>Nenhuma cirurgia registrada hoje!
            </p>
            <p class="text-yellow-800">Preencha os dados e clique em "Iniciar Cirurgia".</p>
        </div>
    `;
}

function fillFieldsWithData(surgery, readonly) {
    document.getElementById('surgeryDate').value = surgery.date || '';
    document.getElementById('perfusionistMain').value = surgery.perfusionist_main || '';
    document.getElementById('perfusionistAuxiliary').value = surgery.perfusionist_auxiliary || currentStudent.name;
    document.getElementById('surgeonName').value = surgery.surgeon_name || '';
    document.getElementById('surgeryType').value = surgery.surgery_type || '';
    document.getElementById('cecTime').value = surgery.cec_time || '';
    document.getElementById('clampTime').value = surgery.clamp_time || '';
    document.getElementById('totalSurgeryTime').value = surgery.total_surgery_time || '';
    document.getElementById('wasResponsible').checked = surgery.was_responsible || false;
    document.getElementById('notesInput').value = surgery.notes || '';
    
    // Disable basic fields (surgeon, type) but allow CEC/Clamp/Time during surgery
    document.getElementById('perfusionistMain').disabled = true;
    document.getElementById('surgeonName').disabled = true;
    document.getElementById('surgeryType').disabled = true;
    
    if (readonly) {
        document.getElementById('cecTime').disabled = true;
        document.getElementById('clampTime').disabled = true;
        document.getElementById('totalSurgeryTime').disabled = true;
        document.getElementById('wasResponsible').disabled = true;
        document.getElementById('notesInput').disabled = true;
        document.getElementById('cecAttachment').disabled = true;
    } else {
        document.getElementById('cecTime').disabled = false;
        document.getElementById('clampTime').disabled = false;
        document.getElementById('totalSurgeryTime').disabled = false;
        document.getElementById('wasResponsible').disabled = false;
        document.getElementById('notesInput').disabled = false;
        document.getElementById('cecAttachment').disabled = false;
    }
}

function disableAllFields() {
    document.getElementById('perfusionistMain').disabled = true;
    document.getElementById('surgeonName').disabled = true;
    document.getElementById('surgeryType').disabled = true;
    document.getElementById('cecTime').disabled = true;
    document.getElementById('clampTime').disabled = true;
    document.getElementById('totalSurgeryTime').disabled = true;
    document.getElementById('wasResponsible').disabled = true;
    document.getElementById('notesInput').disabled = true;
    document.getElementById('cecAttachment').disabled = true;
}

function enableAllFields() {
    document.getElementById('perfusionistMain').disabled = false;
    document.getElementById('surgeonName').disabled = false;
    document.getElementById('surgeryType').disabled = false;
    document.getElementById('cecTime').disabled = false;
    document.getElementById('clampTime').disabled = false;
    document.getElementById('totalSurgeryTime').disabled = false;
    document.getElementById('wasResponsible').disabled = false;
    document.getElementById('notesInput').disabled = false;
    document.getElementById('cecAttachment').disabled = false;
}

function clearAllFields() {
    document.getElementById('perfusionistMain').value = '';
    document.getElementById('perfusionistAuxiliary').value = currentStudent ? currentStudent.name : '';
    document.getElementById('surgeonName').value = '';
    document.getElementById('surgeryType').value = '';
    document.getElementById('cecTime').value = '';
    document.getElementById('clampTime').value = '';
    document.getElementById('totalSurgeryTime').value = '';
    document.getElementById('wasResponsible').checked = false;
    document.getElementById('notesInput').value = '';
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    const surgeryDateInput = document.getElementById('surgeryDate');
    if (surgeryDateInput) surgeryDateInput.value = today;
    
    clearCecSheet();
    clearAttachment();
}

// ===============================================
// SAVE SURGERY RECORD (Replaces check-in/check-out)
// ===============================================

async function saveSurgeryRecord() {
    if (!currentStudent) {
        showError('Nenhum aluno selecionado');
        return;
    }

    // Validate surgery fields
    const perfusionistMain = document.getElementById('perfusionistMain').value.trim();
    const perfusionistAuxiliary = document.getElementById('perfusionistAuxiliary').value.trim();
    const surgeonName = document.getElementById('surgeonName').value.trim();
    const surgeryType = document.getElementById('surgeryType').value;
    
    if (!perfusionistMain || !surgeonName || !surgeryType) {
        showError('Por favor, preencha o perfusionista principal, cirurgião e tipo de cirurgia');
        return;
    }
    
    // Validate total surgery time
    const totalSurgeryTime = parseInt(document.getElementById('totalSurgeryTime').value) || 0;
    if (totalSurgeryTime <= 0) {
        showError('Por favor, informe o tempo total da cirurgia em minutos');
        return;
    }

    // ⚠️ VALIDAÇÃO OBRIGATÓRIA DE ANEXOS
    if (!cecSheetData) {
        showError('FICHA DE CEC OBRIGATÓRIA: Por favor, anexe a ficha de CEC preenchida');
        return;
    }
    
    if (!cecAttachmentData) {
        showError('RELATÓRIO OBRIGATÓRIO: Por favor, anexe o relatório da cirurgia');
        return;
    }

    try {
        const now = new Date();
        const time = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
        
        // Get selected date or use today
        const surgeryDateInput = document.getElementById('surgeryDate');
        const date = surgeryDateInput && surgeryDateInput.value ? surgeryDateInput.value : now.toISOString().split('T')[0];
        
        const notes = document.getElementById('notesInput').value.trim();
        const cecTime = parseInt(document.getElementById('cecTime').value) || 0;
        const clampTime = parseInt(document.getElementById('clampTime').value) || 0;
        const wasResponsible = document.getElementById('wasResponsible').checked;

        // Check if surgery already exists
        if (currentSurgeryId) {
            // Update existing surgery
            console.log('📝 Atualizando cirurgia:', currentSurgeryId);
            
            const getResponse = await fetch(`tables/surgeries/${currentSurgeryId}`);
            const currentData = await getResponse.json();
            
            const updatedData = {
                ...currentData,
                date: date,
                perfusionist_main: perfusionistMain,
                surgeon_name: surgeonName,
                surgery_type: surgeryType,
                cec_time: cecTime,
                clamp_time: clampTime,
                total_surgery_time: totalSurgeryTime,
                was_responsible: wasResponsible,
                notes: notes,
                end_time: time,
                status: 'completed',
                cec_sheet_url: cecSheetData ? cecSheetData.data : currentData.cec_sheet_url,
                cec_sheet_name: cecSheetData ? cecSheetData.name : currentData.cec_sheet_name,
                cec_sheet_type: cecSheetData ? cecSheetData.type : currentData.cec_sheet_type,
                attachment_url: cecAttachmentData ? cecAttachmentData.data : currentData.attachment_url,
                attachment_name: cecAttachmentData ? cecAttachmentData.name : currentData.attachment_name,
                attachment_type: cecAttachmentData ? cecAttachmentData.type : currentData.attachment_type
            };
            
            const response = await fetch(`tables/surgeries/${currentSurgeryId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedData)
            });
            
            if (response.ok) {
                const hoursDecimal = (totalSurgeryTime / 60).toFixed(1);
                console.log('✅ Cirurgia atualizada');
                showSuccess('Registro Atualizado!', `Cirurgia atualizada com sucesso. Tempo total: ${totalSurgeryTime} min (${hoursDecimal}h)`);
                await checkTodaySurgery();
                await loadRecentSurgeries();
                await loadStudentStatistics(currentStudent.id);
            } else {
                const error = await response.text();
                console.error('❌ Erro ao atualizar:', error);
                showError('Erro ao atualizar cirurgia');
            }
        } else {
            // Create new surgery
            const surgeryData = {
                student_id: currentStudent.id,
                student_name: currentStudent.name,
                registration: currentStudent.registration,
                class_period: currentStudent.class_period,
                date: date,
                perfusionist_main: perfusionistMain,
                perfusionist_auxiliary: perfusionistAuxiliary,
                surgeon_name: surgeonName,
                surgery_type: surgeryType,
                cec_time: cecTime,
                clamp_time: clampTime,
                total_surgery_time: totalSurgeryTime,
                was_responsible: wasResponsible,
                notes: notes,
                start_time: time,
                end_time: time,
                status: 'completed',
                validated_at: '',
                validated_by: '',
                validation_notes: '',
                cec_sheet_url: cecSheetData ? cecSheetData.data : '',
                cec_sheet_name: cecSheetData ? cecSheetData.name : '',
                cec_sheet_type: cecSheetData ? cecSheetData.type : '',
                attachment_url: cecAttachmentData ? cecAttachmentData.data : '',
                attachment_name: cecAttachmentData ? cecAttachmentData.name : '',
                attachment_type: cecAttachmentData ? cecAttachmentData.type : ''
            };

            console.log('📝 Criando cirurgia:', surgeryData);

            const response = await fetch('tables/surgeries', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(surgeryData)
            });

            if (response.ok) {
                const result = await response.json();
                const hoursDecimal = (totalSurgeryTime / 60).toFixed(1);
                console.log('✅ Cirurgia salva:', result);
                showSuccess('Registro Salvo!', `Cirurgia registrada com sucesso. Tempo total: ${totalSurgeryTime} min (${hoursDecimal}h)`);
                await checkTodaySurgery();
                await loadRecentSurgeries();
                await loadStudentStatistics(currentStudent.id);
            } else {
                const error = await response.text();
                console.error('❌ Erro ao salvar:', error);
                showError('Erro ao salvar cirurgia');
            }
        }
    } catch (error) {
        console.error('❌ Erro ao salvar cirurgia:', error);
        showError('Erro ao salvar cirurgia: ' + error.message);
    }
}

// ===============================================
// CHECK-IN: START SURGERY (DEPRECATED - use saveSurgeryRecord instead)
// ===============================================

async function handleCheckIn() {
    if (!currentStudent) {
        showError('Nenhum aluno selecionado');
        return;
    }

    // Validate surgery fields
    const perfusionistMain = document.getElementById('perfusionistMain').value.trim();
    const perfusionistAuxiliary = document.getElementById('perfusionistAuxiliary').value.trim();
    const surgeonName = document.getElementById('surgeonName').value.trim();
    const surgeryType = document.getElementById('surgeryType').value;
    
    if (!perfusionistMain || !surgeonName || !surgeryType) {
        showError('Por favor, preencha o perfusionista principal, cirurgião e tipo de cirurgia');
        return;
    }
    
    try {
        const now = new Date();
        const time = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
        
        // Get selected date or use today
        const surgeryDateInput = document.getElementById('surgeryDate');
        const date = surgeryDateInput && surgeryDateInput.value ? surgeryDateInput.value : now.toISOString().split('T')[0];
        const notes = document.getElementById('notesInput').value.trim();
        const cecTime = parseInt(document.getElementById('cecTime').value) || 0;
        const clampTime = parseInt(document.getElementById('clampTime').value) || 0;
        const totalSurgeryTime = parseInt(document.getElementById('totalSurgeryTime').value) || 0;
        const wasResponsible = document.getElementById('wasResponsible').checked;

        const surgeryData = {
            student_id: currentStudent.id,
            student_name: currentStudent.name,
            registration: currentStudent.registration,
            class_period: currentStudent.class_period,
            date: date,
            perfusionist_main: perfusionistMain,
            perfusionist_auxiliary: perfusionistAuxiliary,
            surgeon_name: surgeonName,
            surgery_type: surgeryType,
            cec_time: cecTime,
            clamp_time: clampTime,
            total_surgery_time: totalSurgeryTime,
            was_responsible: wasResponsible,
            notes: notes,
            start_time: time,
            end_time: '',
            status: 'started',
            validated_at: '',
            validated_by: '',
            validation_notes: '',
            attachment_url: cecAttachmentData ? cecAttachmentData.data : '',
            attachment_name: cecAttachmentData ? cecAttachmentData.name : '',
            attachment_type: cecAttachmentData ? cecAttachmentData.type : ''
        };

        console.log('📝 Criando cirurgia:', surgeryData);

        const response = await fetch('tables/surgeries', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(surgeryData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Cirurgia iniciada:', result);
            showSuccess('Cirurgia Iniciada!', `Cirurgia iniciada às ${time}`);
            await checkTodaySurgery();
            await loadRecentSurgeries();
            await loadStudentStatistics(currentStudent.id);
        } else {
            const error = await response.text();
            console.error('❌ Erro ao iniciar:', error);
            showError('Erro ao iniciar cirurgia');
        }
    } catch (error) {
        console.error('❌ Erro ao iniciar cirurgia:', error);
        showError('Erro ao iniciar cirurgia: ' + error.message);
    }
}

// ===============================================
// CHECK-OUT: END SURGERY
// ===============================================

async function handleCheckOut() {
    if (!currentStudent || !currentSurgeryId) {
        showError('Nenhuma cirurgia em andamento');
        return;
    }
    
    // Validate total surgery time
    const totalSurgeryTime = parseInt(document.getElementById('totalSurgeryTime').value) || 0;
    if (totalSurgeryTime <= 0) {
        showError('Por favor, informe o tempo total da cirurgia em minutos');
        return;
    }

    // ⚠️ VALIDAÇÃO OBRIGATÓRIA DE ANEXO
    if (!cecAttachmentData) {
        showError('ANEXO OBRIGATÓRIO: Por favor, anexe o relatório da cirurgia antes de finalizar');
        return;
    }

    try {
        const now = new Date();
        const time = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
        const notes = document.getElementById('notesInput').value.trim();
        const cecTime = parseInt(document.getElementById('cecTime').value) || 0;
        const clampTime = parseInt(document.getElementById('clampTime').value) || 0;
        const wasResponsible = document.getElementById('wasResponsible').checked;

        // Get current surgery
        const getResponse = await fetch(`tables/surgeries/${currentSurgeryId}`);
        const currentData = await getResponse.json();
        
        console.log('📝 Atualizando cirurgia:', currentSurgeryId);

        const updatedData = {
            ...currentData,
            cec_time: cecTime,
            clamp_time: clampTime,
            total_surgery_time: totalSurgeryTime,
            was_responsible: wasResponsible,
            end_time: time,
            notes: notes,
            status: 'completed',
            attachment_url: cecAttachmentData ? cecAttachmentData.data : currentData.attachment_url,
            attachment_name: cecAttachmentData ? cecAttachmentData.name : currentData.attachment_name,
            attachment_type: cecAttachmentData ? cecAttachmentData.type : currentData.attachment_type
        };

        const response = await fetch(`tables/surgeries/${currentSurgeryId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            const hoursDecimal = (totalSurgeryTime / 60).toFixed(1);
            console.log('✅ Cirurgia finalizada');
            showSuccess('Cirurgia Finalizada!', `Cirurgia finalizada às ${time}. Tempo total: ${totalSurgeryTime} min (${hoursDecimal}h)`);
            
            // Refresh statistics
            await loadStudentStatistics(currentStudent.id);
            await checkTodaySurgery();
            await loadRecentSurgeries();
        } else {
            const error = await response.text();
            console.error('❌ Erro ao finalizar:', error);
            showError('Erro ao finalizar cirurgia');
        }
    } catch (error) {
        console.error('❌ Erro ao finalizar cirurgia:', error);
        showError('Erro ao finalizar cirurgia: ' + error.message);
    }
}

// ===============================================
// ATTACHMENT HANDLING
// ===============================================

async function handleAttachmentChange(event) {
    const file = event.target.files[0];
    const attachmentPreview = document.getElementById('attachmentPreview');
    const attachmentName = document.getElementById('attachmentName');
    
    if (!file) {
        cecAttachmentData = null;
        attachmentPreview.classList.add('hidden');
        return;
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showError('O arquivo é muito grande. Tamanho máximo: 5MB');
        event.target.value = '';
        cecAttachmentData = null;
        attachmentPreview.classList.add('hidden');
        return;
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        showError('Formato não permitido. Use: PDF, JPG ou PNG');
        event.target.value = '';
        cecAttachmentData = null;
        attachmentPreview.classList.add('hidden');
        return;
    }
    
    try {
        // Convert to base64
        const base64 = await fileToBase64(file);
        cecAttachmentData = {
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64
        };
        
        console.log('✅ Anexo carregado:', file.name);
        
        // Show preview
        attachmentName.textContent = file.name;
        attachmentPreview.classList.remove('hidden');
    } catch (error) {
        console.error('❌ Erro ao processar arquivo:', error);
        showError('Erro ao processar arquivo');
        event.target.value = '';
        cecAttachmentData = null;
        attachmentPreview.classList.add('hidden');
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

function clearAttachment() {
    const cecAttachment = document.getElementById('cecAttachment');
    const attachmentPreview = document.getElementById('attachmentPreview');
    
    if (cecAttachment) cecAttachment.value = '';
    cecAttachmentData = null;
    if (attachmentPreview) attachmentPreview.classList.add('hidden');
}

// ===============================================
// CEC SHEET HANDLING
// ===============================================

async function handleCecSheetChange(event) {
    const file = event.target.files[0];
    const sheetPreview = document.getElementById('cecSheetPreview');
    const sheetName = document.getElementById('cecSheetName');
    
    if (!file) {
        cecSheetData = null;
        sheetPreview.classList.add('hidden');
        return;
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showError('O arquivo da ficha de CEC é muito grande. Tamanho máximo: 5MB');
        event.target.value = '';
        cecSheetData = null;
        sheetPreview.classList.add('hidden');
        return;
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        showError('Formato não permitido para ficha de CEC. Use: PDF, JPG ou PNG');
        event.target.value = '';
        cecSheetData = null;
        sheetPreview.classList.add('hidden');
        return;
    }
    
    try {
        // Convert to base64
        const base64 = await fileToBase64(file);
        cecSheetData = {
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64
        };
        
        console.log('✅ Ficha de CEC carregada:', file.name);
        
        // Show preview
        sheetName.textContent = file.name;
        sheetPreview.classList.remove('hidden');
    } catch (error) {
        console.error('❌ Erro ao processar ficha de CEC:', error);
        showError('Erro ao processar ficha de CEC');
        event.target.value = '';
        cecSheetData = null;
        sheetPreview.classList.add('hidden');
    }
}

function clearCecSheet() {
    const cecSheet = document.getElementById('cecSheet');
    const sheetPreview = document.getElementById('cecSheetPreview');
    
    if (cecSheet) cecSheet.value = '';
    cecSheetData = null;
    if (sheetPreview) sheetPreview.classList.add('hidden');
}

// ===============================================
// LOAD RECENT SURGERIES
// ===============================================

async function loadRecentSurgeries() {
    if (!currentStudent) return;

    try {
        console.log('🔍 Carregando cirurgias recentes...');
        const response = await fetch('tables/surgeries?limit=100');
        const data = await response.json();
        
        const studentSurgeries = data.data
            .filter(s => s.student_id === currentStudent.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        console.log(`✅ ${studentSurgeries.length} cirurgias encontradas`);

        const container = document.getElementById('recentAttendance');
        
        if (studentSurgeries.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-4">Nenhum registro encontrado</p>';
            return;
        }

        container.innerHTML = studentSurgeries.map(surgery => {
            const hours = surgery.total_surgery_time ? (surgery.total_surgery_time / 60).toFixed(1) : '0';
            const statusBadge = surgery.status === 'completed' ? 
                '<i class="fas fa-check-circle mr-1"></i>Completa' : 
                '<i class="fas fa-heartbeat mr-1"></i>Em andamento';
            const statusColor = surgery.status === 'completed' ? 'text-green-600' : 'text-orange-600';
            
            return `
                <div class="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-purple-300 transition">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <span class="font-bold text-gray-800">${formatDate(surgery.date)}</span>
                            <p class="text-sm text-purple-600 font-semibold">${surgery.surgery_type || 'Tipo não informado'}</p>
                        </div>
                        <span class="text-sm ${statusColor}">
                            ${statusBadge}
                        </span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-sm text-gray-700">
                        <p><strong>Início:</strong> ${surgery.start_time || '-'}</p>
                        <p><strong>Término:</strong> ${surgery.end_time || '-'}</p>
                        <p><strong>Duração:</strong> ${surgery.total_surgery_time || '0'} min (${hours}h)</p>
                        <p><strong>Responsável:</strong> ${surgery.was_responsible ? '✅ Sim' : '❌ Não'}</p>
                        <p><strong>Perfusionista Principal:</strong> ${surgery.perfusionist_main || '-'}</p>
                        <p><strong>Cirurgião:</strong> ${surgery.surgeon_name || '-'}</p>
                        <p><strong>Tempo CEC:</strong> ${surgery.cec_time || '0'} min</p>
                        <p><strong>Tempo Pinça:</strong> ${surgery.clamp_time || '0'} min</p>
                        ${surgery.notes ? `<p class="col-span-2 text-gray-600"><strong>Obs:</strong> ${surgery.notes}</p>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('❌ Erro ao carregar cirurgias recentes:', error);
    }
}

// Compatibility alias for old code
async function loadRecentAttendance() {
    return await loadRecentSurgeries();
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function calculateHours(checkIn, checkOut) {
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

// ===============================================
// SHOW/HIDE FORMS
// ===============================================

function showSurgeryForm() {
    document.getElementById('surgeryFormFields').classList.remove('hidden');
    document.getElementById('moduleFormFields').classList.add('hidden');
    document.getElementById('btnSurgery').classList.add('border-blue-500');
    document.getElementById('btnSurgery').classList.remove('border-gray-300');
    document.getElementById('btnModule').classList.add('border-gray-300');
    document.getElementById('btnModule').classList.remove('border-green-500');
}

function showModuleForm() {
    document.getElementById('surgeryFormFields').classList.add('hidden');
    document.getElementById('moduleFormFields').classList.remove('hidden');
    document.getElementById('btnModule').classList.add('border-green-500');
    document.getElementById('btnModule').classList.remove('border-gray-300');
    document.getElementById('btnSurgery').classList.add('border-gray-300');
    document.getElementById('btnSurgery').classList.remove('border-blue-500');
}

// ===============================================
// MODAL FUNCTIONS
// ===============================================

function showSuccess(title, message) {
    console.log('✅', title, message);
    if (typeof Toast !== 'undefined' && Toast.success) {
        Toast.success(message);
    } else {
        alert(`${title}\n${message}`);
    }
}

function showError(message) {
    console.error('❌', message);
    if (typeof Toast !== 'undefined' && Toast.error) {
        Toast.error(message);
    } else {
        alert(`Erro: ${message}`);
    }
}

function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
}

// ===============================================
// EXPORT FOR EXTERNAL USE
// ===============================================

console.log('✅ main.js carregado');
