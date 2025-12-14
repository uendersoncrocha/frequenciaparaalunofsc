// ============================================
// STUDENT STATISTICS MODULE - Version 1.0
// Gerenciamento de estatísticas do perfusionista
// ============================================

console.log('📊 Carregando módulo de estatísticas do perfusionista...');

// ============================================
// CONSTANTS
// ============================================
const HOURS_TARGET = 800; // Meta de 800 horas para o título

// ============================================
// LOAD AND DISPLAY STUDENT STATISTICS
// ============================================

/**
 * Carrega e exibe estatísticas do perfusionista
 */
async function loadStudentStatistics(studentId) {
    try {
        console.log('📊 Carregando estatísticas para:', studentId);
        
        // Fetch all surgeries for this student
        const surgeryResponse = await fetch(`tables/attendance?limit=1000`);
        const surgeryData = await surgeryResponse.json();
        
        // Filter surgeries for current student
        const studentSurgeries = surgeryData.data.filter(surgery => 
            surgery.student_id === studentId && 
            surgery.check_out // Only completed surgeries
        );
        
        // Fetch all modules for this student
        const moduleResponse = await fetch(`tables/modules?limit=1000`);
        const moduleData = await moduleResponse.json();
        
        // Filter modules for current student
        const studentModules = moduleData.data.filter(module => 
            module.student_id === studentId
        );
        
        console.log(`✅ ${studentSurgeries.length} cirurgias e ${studentModules.length} módulos encontrados`);
        
        // Calculate statistics
        const stats = calculateStatistics(studentSurgeries, studentModules);
        
        // Display statistics
        displayStudentStatistics(stats);
        
        return stats;
    } catch (error) {
        console.error('❌ Erro ao carregar estatísticas:', error);
        return {
            totalSurgeries: 0,
            responsibleCount: 0,
            totalHours: 0,
            totalMinutes: 0,
            validatedHours: 0,
            pendingHours: 0,
            practicalModuleHours: 0,
            adjustedTarget: 800
        };
    }
}

/**
 * Calcula estatísticas baseado nas cirurgias e módulos
 */
function calculateStatistics(surgeries, modules = []) {
    let totalSurgeries = surgeries.length;
    let responsibleCount = 0;
    let totalMinutes = 0;
    let validatedMinutes = 0;
    let pendingMinutes = 0;
    let practicalModuleHours = 0;
    
    // Calculate surgery statistics
    surgeries.forEach(surgery => {
        // Count responsible surgeries
        if (surgery.was_responsible === true || surgery.was_responsible === 'true') {
            responsibleCount++;
        }
        
        // Sum total minutes
        const surgeryTime = parseInt(surgery.total_surgery_time) || 0;
        totalMinutes += surgeryTime;
        
        // Separate validated and pending
        if (surgery.validated === true || surgery.validated === 'true') {
            validatedMinutes += surgeryTime;
        } else {
            pendingMinutes += surgeryTime;
        }
    });
    
    // Calculate module statistics (practical modules reduce target)
    modules.forEach(module => {
        const moduleHours = parseFloat(module.duration_hours) || 0;
        if ((module.module_type === 'pratico' || module.module_type === 'prático') && 
            (module.validated === true || module.validated === 'true')) {
            practicalModuleHours += moduleHours;
        }
    });
    
    // Convert minutes to hours
    const totalHours = Math.round((totalMinutes / 60) * 100) / 100;
    const validatedHours = Math.round((validatedMinutes / 60) * 100) / 100;
    const pendingHours = Math.round((pendingMinutes / 60) * 100) / 100;
    
    // Adjusted target (800h - practical modules)
    const adjustedTarget = Math.max(0, 800 - practicalModuleHours);
    
    console.log('📊 Estatísticas calculadas:', {
        totalSurgeries,
        responsibleCount,
        totalHours,
        validatedHours,
        pendingHours,
        practicalModuleHours,
        adjustedTarget
    });
    
    return {
        totalSurgeries,
        responsibleCount,
        totalHours,
        totalMinutes,
        validatedHours,
        pendingHours,
        practicalModuleHours,
        adjustedTarget
    };
}

/**
 * Exibe estatísticas na interface
 */
function displayStudentStatistics(stats) {
    // Update statistics cards
    document.getElementById('totalSurgeriesCount').textContent = stats.totalSurgeries;
    document.getElementById('responsibleCount').textContent = stats.responsibleCount;
    
    // Format hours display - show validated hours
    const hoursDisplay = `${stats.validatedHours.toFixed(1)}h`;
    document.getElementById('totalHours').textContent = hoursDisplay;
    
    // Show pending hours if any
    const adjustedTarget = stats.adjustedTarget || HOURS_TARGET;
    const remainingHours = Math.max(0, adjustedTarget - stats.validatedHours);
    
    let remainingText = `${remainingHours.toFixed(1)}h restantes`;
    if (stats.pendingHours > 0) {
        remainingText += ` (${stats.pendingHours.toFixed(1)}h pendentes)`;
    }
    document.getElementById('remainingHours').textContent = remainingText;
    
    // Calculate and display progress based on VALIDATED hours
    const progressPercentage = Math.min(100, (stats.validatedHours / adjustedTarget) * 100);
    document.getElementById('progressPercentage').textContent = progressPercentage.toFixed(1) + '%';
    document.getElementById('progressBar').style.width = progressPercentage + '%';
    
    // Update progress text with adjusted target
    let progressText = `${stats.validatedHours.toFixed(1)} de ${adjustedTarget} horas completadas`;
    if (stats.practicalModuleHours > 0) {
        progressText += ` (Meta ajustada: -${stats.practicalModuleHours.toFixed(1)}h de aulas práticas)`;
    }
    document.getElementById('hoursProgress').textContent = progressText;
    
    // Change progress bar color based on progress
    const progressBar = document.getElementById('progressBar');
    if (progressPercentage >= 100) {
        progressBar.className = 'bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500';
        
        // Show diploma message if completed
        showDiplomaEligibilityMessage(stats);
    } else if (progressPercentage >= 75) {
        progressBar.className = 'bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500';
    } else if (progressPercentage >= 50) {
        progressBar.className = 'bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500';
    } else {
        progressBar.className = 'bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-500';
    }
    
    console.log('✅ Estatísticas exibidas na interface');
}

/**
 * Exibe mensagem de elegibilidade para diploma
 */
function showDiplomaEligibilityMessage(stats) {
    const adjustedTarget = stats.adjustedTarget || HOURS_TARGET;
    
    if (stats.validatedHours >= adjustedTarget) {
        const diplomaAlert = document.getElementById('diplomaAlert');
        if (diplomaAlert) {
            diplomaAlert.classList.remove('hidden');
        } else {
            // Create diploma alert if it doesn't exist
            const statsHeader = document.getElementById('studentStatsHeader');
            if (statsHeader) {
                const alertHTML = `
                    <div id="diplomaAlert" class="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 mb-6 shadow-lg animate-pulse">
                        <div class="flex items-center gap-4">
                            <div class="text-5xl">🎓</div>
                            <div class="flex-1">
                                <h3 class="text-2xl font-bold mb-2">Parabéns! Você completou as 800 horas!</h3>
                                <p class="text-lg mb-2">
                                    ✅ ${stats.validatedHours.toFixed(1)}h validadas pelo coordenador
                                </p>
                                <p class="text-green-100">
                                    <i class="fas fa-check-circle mr-2"></i>
                                    <strong>Pronto para obtenção do diploma!</strong>
                                    Aguarde a aprovação final do coordenador.
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                statsHeader.insertAdjacentHTML('beforeend', alertHTML);
            }
        }
    }
}

/**
 * Exibe informações do aluno no cabeçalho
 */
function displayStudentHeader(student) {
    const headerName = document.getElementById('headerStudentName');
    const headerInfo = document.getElementById('headerStudentInfo');
    const statsHeader = document.getElementById('studentStatsHeader');
    
    if (headerName && headerInfo && statsHeader) {
        headerName.textContent = student.name;
        headerInfo.textContent = `Turma ${student.class_period} • Matrícula ${student.registration}`;
        statsHeader.classList.remove('hidden');
        
        console.log('✅ Cabeçalho do aluno exibido:', student.name);
    }
}

/**
 * Atualiza estatísticas após registro de cirurgia
 */
async function refreshStudentStatistics(studentId) {
    console.log('🔄 Atualizando estatísticas...');
    await loadStudentStatistics(studentId);
}

// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Valida se o tempo total de cirurgia foi preenchido
 */
function validateSurgeryTime() {
    const totalSurgeryTime = document.getElementById('totalSurgeryTime');
    if (!totalSurgeryTime || !totalSurgeryTime.value) {
        return {
            valid: false,
            message: 'Por favor, preencha o tempo total de cirurgia em minutos'
        };
    }
    
    const time = parseInt(totalSurgeryTime.value);
    if (time <= 0) {
        return {
            valid: false,
            message: 'O tempo total de cirurgia deve ser maior que zero'
        };
    }
    
    if (time > 1440) { // 24 hours
        return {
            valid: false,
            message: 'O tempo total de cirurgia não pode exceder 24 horas (1440 minutos)'
        };
    }
    
    return { valid: true };
}

/**
 * Obtém valor do checkbox "Foi Responsável"
 */
function getWasResponsibleValue() {
    const checkbox = document.getElementById('wasResponsible');
    return checkbox ? checkbox.checked : false;
}

/**
 * Obtém tempo total de cirurgia em minutos
 */
function getTotalSurgeryTime() {
    const timeInput = document.getElementById('totalSurgeryTime');
    return timeInput ? parseInt(timeInput.value) || 0 : 0;
}

// ============================================
// PROGRESS NOTIFICATIONS
// ============================================

/**
 * Exibe notificações de progresso
 */
function showProgressNotification(stats) {
    const percentage = (stats.totalHours / HOURS_TARGET) * 100;
    
    // Notificações em marcos importantes
    if (percentage >= 100 && percentage < 102) {
        showSuccess(
            '🎉 Parabéns! Meta Alcançada!', 
            `Você completou ${stats.totalHours}h de ${HOURS_TARGET}h necessárias para o título!`
        );
    } else if (percentage >= 75 && percentage < 77) {
        showSuccess(
            '🎯 75% Completo!', 
            `Faltam apenas ${(HOURS_TARGET - stats.totalHours).toFixed(1)}h para sua meta!`
        );
    } else if (percentage >= 50 && percentage < 52) {
        showSuccess(
            '🚀 Metade do Caminho!', 
            `Você já completou ${stats.totalHours}h. Continue assim!`
        );
    }
}

// ============================================
// EXPORT STATISTICS
// ============================================

/**
 * Exporta estatísticas para CSV
 */
function exportStatisticsToCSV(studentName, stats) {
    const csvContent = [
        'Estatísticas do Perfusionista',
        `Nome:,${studentName}`,
        `Data:,${new Date().toLocaleDateString('pt-BR')}`,
        '',
        'Indicador,Valor',
        `Total de Cirurgias,${stats.totalSurgeries}`,
        `Cirurgias como Responsável,${stats.responsibleCount}`,
        `Horas Totais,${stats.totalHours.toFixed(1)}h`,
        `Progresso,${((stats.totalHours / HOURS_TARGET) * 100).toFixed(1)}%`,
        `Horas Restantes,${Math.max(0, HOURS_TARGET - stats.totalHours).toFixed(1)}h`
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `estatisticas_${studentName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('📥 Estatísticas exportadas para CSV');
}

// ============================================
// DETAILED STATISTICS
// ============================================

/**
 * Gera relatório detalhado de estatísticas
 */
function generateDetailedReport(surgeries) {
    const report = {
        byMonth: {},
        bySurgeryType: {},
        byResponsibility: {
            responsible: 0,
            auxiliary: 0
        },
        averageDuration: 0,
        longestSurgery: null,
        shortestSurgery: null
    };
    
    surgeries.forEach(surgery => {
        // By month
        const month = surgery.date ? surgery.date.substring(0, 7) : 'Unknown';
        report.byMonth[month] = (report.byMonth[month] || 0) + 1;
        
        // By type
        const type = surgery.surgery_type || 'Não especificado';
        report.bySurgeryType[type] = (report.bySurgeryType[type] || 0) + 1;
        
        // By responsibility
        if (surgery.was_responsible) {
            report.byResponsibility.responsible++;
        } else {
            report.byResponsibility.auxiliary++;
        }
        
        // Duration analysis
        const duration = parseInt(surgery.total_surgery_time) || 0;
        if (duration > 0) {
            if (!report.longestSurgery || duration > report.longestSurgery.duration) {
                report.longestSurgery = { ...surgery, duration };
            }
            if (!report.shortestSurgery || duration < report.shortestSurgery.duration) {
                report.shortestSurgery = { ...surgery, duration };
            }
        }
    });
    
    // Calculate average duration
    const totalMinutes = surgeries.reduce((sum, s) => sum + (parseInt(s.total_surgery_time) || 0), 0);
    report.averageDuration = surgeries.length > 0 ? Math.round(totalMinutes / surgeries.length) : 0;
    
    return report;
}

console.log('✅ Módulo de estatísticas do perfusionista carregado!');
