# 🏥 Sistema de Controle de Cirurgias Cardíacas

Sistema web completo para controle e registro de procedimentos cirúrgicos cardiovasculares, com ênfase em perfusão e CEC (Circulação Extracorpórea).

## 🎯 Objetivos do Projeto

Facilitar o registro detalhado de cirurgias cardíacas, incluindo dados específicos de perfusão, tempo de CEC, tempo de pinça, e outras métricas essenciais para o controle de qualidade em cirurgias cardiovasculares.

## ✨ Funcionalidades Principais

### Para Perfusionistas (index.html)
- ✅ **Seleção de turma**: Escolha da turma (2024.1, 2024.2, 2025.1, 2025.2)
- ✅ **Identificação do perfusionista**: Lista filtrada por turma
- ✅ **Registro de início de cirurgia**:
  - Nome do cirurgião
  - Tipo de cirurgia
  - Horário de início automático
- ✅ **Registro de término de cirurgia**:
  - Tempo de CEC (Circulação Extracorpórea) em minutos
  - Tempo de Pinça em minutos
  - Horário de término automático
  - Cálculo automático da duração total
- ✅ **Observações**: Campo para anotações sobre o procedimento
- ✅ **Histórico pessoal**: Visualização das últimas 5 cirurgias do perfusionista

### Para Administradores (admin.html)
- ✅ **Dashboard com estatísticas**:
  - Total de perfusionistas cadastrados
  - Cirurgias realizadas no dia
  - Total de registros no sistema
  - Média mensal de procedimentos

- ✅ **Gráficos visuais**:
  - Gráfico de linha: cirurgias nos últimos 7 dias
  - Gráfico de rosca: distribuição por perfusionista

- ✅ **Tabela detalhada de registros**:
  - Data e turma
  - Perfusionista
  - Cirurgião
  - Tipo de cirurgia
  - Horários (início e término)
  - Duração total da cirurgia
  - **Tempo de CEC (destaque visual)**
  - **Tempo de Pinça (destaque visual)**
  - Paginação (10 registros por página)
  - Função de exclusão

- ✅ **Filtros avançados**:
  - Por turma
  - Por perfusionista
  - Por período (data inicial e final)
  - Exportação para CSV com todos os dados

- ✅ **Gerenciamento de perfusionistas**:
  - Listagem organizada por turma
  - Adicionar novos perfusionistas
  - Ativar/desativar perfusionistas
  - Contador de cirurgias por perfusionista

## 🗂️ Estrutura de Dados

### Tabela: students (Perfusionistas)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | text | ID único do perfusionista |
| name | text | Nome completo |
| email | text | E-mail |
| course | text | Curso (sempre "Estágio") |
| registration | text | Número de matrícula |
| class_period | text | Turma (2024.1, 2024.2, 2025.1, 2025.2) |
| active | bool | Status (ativo/inativo) |

### Tabela: attendance (Cirurgias)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | text | ID único do registro |
| student_id | text | ID do perfusionista |
| student_name | text | Nome do perfusionista |
| perfusionist_name | text | Nome do perfusionista (duplicado para clareza) |
| date | text | Data da cirurgia (YYYY-MM-DD) |
| check_in | text | Horário de início (HH:MM) |
| check_out | text | Horário de término (HH:MM) |
| **surgery_time** | text | **Duração total calculada** |
| **surgeon_name** | text | **Nome do cirurgião** |
| **surgery_type** | text | **Tipo de cirurgia** |
| **cec_time** | text | **Tempo de CEC em minutos** |
| **clamp_time** | text | **Tempo de Pinça em minutos** |
| location | text | Localização (Centro Cirúrgico) |
| notes | text | Observações sobre o procedimento |

## 🔬 Tipos de Cirurgias Cadastradas

O sistema permite registro dos seguintes tipos de cirurgias cardiovasculares:

1. **Revascularização do Miocárdio** (CRM)
2. **Troca Valvar Aórtica** (TVAo)
3. **Troca Valvar Mitral** (TVM)
4. **Correção de CIA** (Comunicação Interatrial)
5. **Correção de CIV** (Comunicação Interventricular)
6. **Transplante Cardíaco**
7. **Outra** (campo aberto)

## 📊 Métricas Importantes

### Tempo de CEC (Circulação Extracorpórea)
- Medido em **minutos**
- Indica o tempo em que o paciente esteve conectado à máquina coração-pulmão
- **Destacado com badge azul** na tabela administrativa
- Essencial para controle de qualidade

### Tempo de Pinça (Clampeamento Aórtico)
- Medido em **minutos**
- Tempo de clampeamento da aorta durante o procedimento
- **Destacado com badge laranja** na tabela administrativa
- Métrica crítica para avaliação do procedimento

### Duração Total da Cirurgia
- Calculada automaticamente
- Diferença entre horário de início e término
- Exibida em formato "Xh Ymin"

## 🚀 Como Usar

### Para Perfusionistas:

1. **Antes da cirurgia**:
   - Acesse `index.html`
   - Selecione sua turma
   - Selecione seu nome
   - Preencha: Nome do Cirurgião e Tipo de Cirurgia
   - Clique em "**Iniciar Cirurgia**" (horário registrado automaticamente)

2. **Durante a cirurgia**:
   - Sistema registra que cirurgia está em andamento
   - Você pode atualizar Tempo de CEC e Tempo de Pinça conforme procedimento avança

3. **Ao término**:
   - Atualize **Tempo de CEC** (se ainda não informado)
   - Atualize **Tempo de Pinça** (se ainda não informado)
   - Adicione observações relevantes
   - Clique em "**Finalizar Cirurgia**"
   - Sistema calcula duração automaticamente

### Para Administradores:

1. **Monitoramento**:
   - Acesse `admin.html`
   - Visualize estatísticas em tempo real
   - Analise gráficos de tendência

2. **Busca e Filtros**:
   - Filtre por turma para ver perfusionistas específicos
   - Filtre por período para relatórios mensais
   - Use filtro de perfusionista para análise individual

3. **Análise de Dados**:
   - Visualize tempos de CEC e Pinça
   - Compare durações de cirurgias
   - Identifique tendências por tipo de cirurgia

4. **Exportação**:
   - Exporte dados em CSV
   - Arquivo inclui todas as métricas
   - Pronto para análise em Excel/planilhas

5. **Gestão**:
   - Adicione novos perfusionistas selecionando a turma
   - Ative/desative perfusionistas conforme necessário

## 📱 Design e Interface

- 🎨 **Design moderno** com gradientes roxo/violeta
- 💉 **Ícones médicos** específicos (heartbeat, user-md, procedures)
- 📊 **Badges coloridos** para métricas importantes:
  - 🔵 Azul: Tempo de CEC
  - 🟠 Laranja: Tempo de Pinça
  - 🟣 Roxo: Turma
- 📱 **100% responsivo** (desktop, tablet, mobile)
- ⚡ **Feedback visual claro** para todas as ações

## 🔗 Endpoints da API

### Perfusionistas
```
GET    /tables/students          # Listar
POST   /tables/students          # Adicionar
PUT    /tables/students/{id}     # Atualizar
```

### Cirurgias
```
GET    /tables/attendance        # Listar
GET    /tables/attendance/{id}   # Obter detalhes
POST   /tables/attendance        # Registrar nova
PUT    /tables/attendance/{id}   # Atualizar (finalizar)
DELETE /tables/attendance/{id}   # Excluir
```

## 👥 Perfusionistas Cadastrados

### 📚 Turma 2024.1 (7 perfusionistas)
Giovana, Gabriela, Thaylane, Rafaela, Jaiane, Beatriz, Ana Clara

### 📚 Turma 2024.2 (4 perfusionistas)
Anthony, Emille, Driele, Israel

### 📚 Turma 2025.1 (5 perfusionistas)
Milena, Giovana, Gislayne, Marimar, Ana Beatriz

### 📚 Turma 2025.2 (9 perfusionistas)
Vinícius, Maria Eduarda, Amanda Moreira, Amanda Marques, Rafael, Vitória, Claudia, Sthefany, Nicoly

**Total: 25 perfusionistas**

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **Tailwind CSS**: Estilização moderna via CDN
- **Font Awesome**: Ícones médicos e interface
- **Chart.js**: Gráficos e visualizações
- **JavaScript ES6+**: Lógica de aplicação
- **RESTful API**: Persistência de dados

## 📈 Benefícios do Sistema

1. **✅ Registro Completo**
   - Todos os dados importantes em um só lugar
   - Histórico completo de procedimentos

2. **⏱️ Métricas Automáticas**
   - Cálculo automático de duração
   - Horários registrados automaticamente
   - Sem erros de cálculo manual

3. **📊 Análise de Qualidade**
   - Tempos de CEC e Pinça claramente visíveis
   - Identificação de tendências
   - Comparação entre procedimentos

4. **📱 Acesso Fácil**
   - Interface intuitiva
   - Funciona em qualquer dispositivo
   - Sem necessidade de treinamento extensivo

5. **💾 Dados Seguros**
   - Backup automático
   - Histórico completo preservado
   - Exportação para análise externa

## 🎓 Aplicação Educacional

Ideal para:
- **Escolas de Perfusão**
- **Hospitais-escola**
- **Programas de residência**
- **Treinamento de perfusionistas**
- **Controle de qualidade em centro cirúrgico**

## 📝 Observações Importantes

- ⚠️ **Campos obrigatórios ao iniciar**: Nome do Cirurgião e Tipo de Cirurgia
- 💡 **Tempos de CEC/Pinça**: Podem ser atualizados durante e no final da cirurgia
- 📅 **Uma cirurgia por dia**: Sistema permite apenas um registro por perfusionista por dia
- 🔒 **Após finalizar**: Dados ficam bloqueados para edição (preservação do histórico)

## 🚀 Próximos Passos Recomendados

1. **Relatórios Avançados**
   - Análise estatística de tempos de CEC
   - Comparação por tipo de cirurgia
   - Indicadores de performance

2. **Notificações**
   - Alertas para tempos de CEC prolongados
   - Lembretes de registro

3. **Integração**
   - Exportação para prontuário eletrônico
   - API para outros sistemas hospitalares

---

**Sistema desenvolvido para controle de qualidade em cirurgias cardiovasculares** ❤️🏥

Para começar, abra `index.html` e registre sua primeira cirurgia!
