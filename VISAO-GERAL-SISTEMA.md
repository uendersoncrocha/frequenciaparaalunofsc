# 🏥 Sistema de Controle de Cirurgias Cardiovasculares - Visão Geral

**Versão:** 3.0  
**Data:** 13/12/2024  
**Status:** ✅ Produção

---

## 🎯 O Que é o Sistema?

Um sistema web completo para **controle e registro de cirurgias cardiovasculares**, focado no trabalho de **perfusionistas** em treinamento. Permite registrar detalhes das cirurgias, tempos de CEC e pinçamento, e anexar documentação.

---

## 👥 Usuários do Sistema

### 👨‍⚕️ **Perfusionistas** (25 usuários)
Divididos em 4 turmas:
- **2024.1** - 7 perfusionistas
- **2024.2** - 4 perfusionistas
- **2025.1** - 5 perfusionistas
- **2025.2** - 9 perfusionistas

### 👨‍💼 **Administradores**
Visualizam relatórios, exportam dados e gerenciam perfusionistas.

---

## ✨ Principais Funcionalidades

### Para Perfusionistas:

#### 1️⃣ **Registro de Cirurgias**
```
┌─────────────────────────────────────┐
│  🏥 Nova Cirurgia                   │
├─────────────────────────────────────┤
│  👨‍⚕️ Perfusionista Principal      │
│  👨‍🎓 Perfusionista Auxiliar (você)│
│  🩺 Cirurgião                       │
│  ❤️ Tipo de Cirurgia               │
│  ⏱️ Tempo de CEC                    │
│  🔧 Tempo de Pinça                  │
│  📎 Anexar Ficha de CEC             │
│  📝 Observações                     │
│                                     │
│  [▶️ Iniciar]  [⏹️ Finalizar]      │
└─────────────────────────────────────┘
```

#### 2️⃣ **7 Tipos de Cirurgias**
- ❤️ Revascularização do Miocárdio
- 🫀 Troca Valvar Aórtica
- 💓 Troca Valvar Mitral
- 🔄 Correção de CIA
- 🔁 Correção de CIV
- 🫁 Transplante Cardíaco
- ➕ Outra

#### 3️⃣ **Cálculos Automáticos**
- ✅ **Duração Total** da cirurgia
- ✅ **Horas trabalhadas** (check-in → check-out)
- ✅ **Data e horários** registrados automaticamente

#### 4️⃣ **Anexo de Documentos**
- 📎 **Ficha de CEC** em PDF, JPG ou PNG
- 📏 **Máximo 5MB** por arquivo
- ✅ **Validação automática** de tipo e tamanho
- 🔒 **Protegido** após finalização

#### 5️⃣ **Histórico Pessoal**
- 📊 **Últimas 5 cirurgias** registradas
- 📅 **Datas e horários**
- ⏱️ **Tempos de CEC e Pinça**
- 📝 **Observações**

---

### Para Administradores:

#### 1️⃣ **Dashboard Completo**
```
┌──────────────────────────────────────────────┐
│  📊 ESTATÍSTICAS                             │
├──────────────────────────────────────────────┤
│  👥 25 Perfusionistas   📅 3 Cirurgias Hoje  │
│  📝 150 Registros       📈 92% Taxa Presença │
└──────────────────────────────────────────────┘
```

#### 2️⃣ **Gráficos Visuais**
- 📈 **Linha:** Cirurgias nos últimos 7 dias
- 🍩 **Rosca:** Distribuição por perfusionista

#### 3️⃣ **Tabela Completa de Registros**
| Data | Turma | Perfus. Principal | Perfus. Auxiliar | Cirurgião | Tipo | ⏰ Início | ⏰ Fim | ⏱️ Duração | CEC | Pinça | 📎 Ficha | 🗑️ |
|------|-------|-------------------|------------------|-----------|------|-----------|--------|-----------|-----|-------|----------|-----|
| 13/12 | 2024.1 | Dr. João Silva | Maria Santos | Dr. Costa | Revasc. | 08:00 | 12:30 | 4h30m | 120m | 90m | 📥 | 🗑️ |

#### 4️⃣ **Filtros Avançados**
- 🎓 **Por turma:** 2024.1, 2024.2, 2025.1, 2025.2
- 👤 **Por perfusionista:** Todos ou individual
- 📅 **Por período:** Data inicial e final
- 🔍 **Aplicar/Limpar** filtros dinamicamente

#### 5️⃣ **Exportação**
- 📊 **CSV completo** com todos os dados
- 📎 **Indicador** de presença de anexo
- 📥 **Download individual** de fichas de CEC

#### 6️⃣ **Gerenciamento**
- ➕ **Adicionar** novos perfusionistas
- ✅ **Ativar/Desativar** usuários
- 🗑️ **Excluir** registros
- 📊 **Contador** de cirurgias por perfusionista

---

## 🗂️ Estrutura de Dados

### Tabela: `students` (Perfusionistas)
```
┌──────────────────────────────────┐
│  id: "uuid-123-456"              │
│  name: "Maria Santos"            │
│  registration: "2024001"         │
│  class_period: "2024.1"          │
│  email: "maria@exemplo.com"      │
│  course: "Perfusão"              │
│  active: true                    │
└──────────────────────────────────┘
```

### Tabela: `attendance` (Cirurgias)
```
┌──────────────────────────────────────┐
│  id: "uuid-789-012"                  │
│  student_id: "uuid-123-456"          │
│  perfusionist_main: "Dr. João Silva" │
│  perfusionist_auxiliary: "Maria..."  │
│  surgeon_name: "Dr. Costa"           │
│  surgery_type: "Revascularização"    │
│  date: "2024-12-13"                  │
│  check_in: "08:00"                   │
│  check_out: "12:30"                  │
│  surgery_time: "4h30m"               │
│  cec_time: "120"                     │
│  clamp_time: "90"                    │
│  cec_attachment: "{...base64...}"    │
│  notes: "Cirurgia sem intercorrências"│
└──────────────────────────────────────┘
```

---

## 🔄 Fluxo de Uso

### 🩺 Perfusionista Registra Cirurgia:

```
1. Acessa index.html
        ↓
2. Seleciona TURMA (ex: 2024.1)
        ↓
3. Seleciona NOME (ex: Maria Santos)
        ↓
4. Preenche DADOS DA CIRURGIA
   ├─ Perfusionista Principal ✏️
   ├─ Cirurgião ✏️
   ├─ Tipo de Cirurgia 📋
   ├─ Tempo CEC ⏱️
   ├─ Tempo Pinça 🔧
   └─ Anexa Ficha 📎 (opcional)
        ↓
5. Clica [▶️ INICIAR CIRURGIA]
   └─ Sistema registra data/hora início
        ↓
6. Durante cirurgia:
   └─ Pode atualizar CEC/Pinça
   └─ Pode anexar ficha se não fez antes
        ↓
7. Clica [⏹️ FINALIZAR CIRURGIA]
   └─ Sistema calcula duração
   └─ Campos ficam bloqueados ✅
```

### 👨‍💼 Administrador Consulta Dados:

```
1. Acessa admin.html
        ↓
2. Visualiza DASHBOARD
   ├─ Estatísticas gerais 📊
   └─ Gráficos visuais 📈
        ↓
3. Aplica FILTROS (opcional)
   ├─ Por turma 🎓
   ├─ Por perfusionista 👤
   └─ Por período 📅
        ↓
4. Consulta TABELA DE REGISTROS
   ├─ 13 colunas de informação
   ├─ Paginação (10 por página)
   └─ Download de anexos 📥
        ↓
5. Exporta RELATÓRIO CSV 📊
   └─ Dados completos para análise
```

---

## 🎨 Interface Visual

### Página Principal (Perfusionistas):
```
╔═══════════════════════════════════════════════════╗
║  🏥 Sistema de Presença - Controle de Estágio    ║
╠═══════════════════════════════════════════════════╣
║  [🏠 Marcar Presença]  [👨‍💼 Administração]       ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  📋 Selecione sua turma:  [2024.1 ▼]            ║
║  👤 Selecione seu nome:   [Maria Santos ▼]      ║
║                                                   ║
║  ┌─────────────────────────────────────────────┐ ║
║  │ 👨‍⚕️ Informações do Perfusionista          │ ║
║  │ Nome: Maria Santos                          │ ║
║  │ Matrícula: 2024001  │  Turma: 2024.1       │ ║
║  └─────────────────────────────────────────────┘ ║
║                                                   ║
║  ┌─────────────────────────────────────────────┐ ║
║  │ 🩺 Dados da Cirurgia                        │ ║
║  │                                             │ ║
║  │ Perfusionista Principal: [______________]   │ ║
║  │ Perfusionista Auxiliar:  [Maria Santos]    │ ║
║  │ Cirurgião: [______________]                │ ║
║  │ Tipo: [Revascularização ▼]                │ ║
║  │ CEC: [120] min  │  Pinça: [90] min        │ ║
║  │ 📎 Ficha: [Escolher arquivo...]            │ ║
║  └─────────────────────────────────────────────┘ ║
║                                                   ║
║  [▶️ Iniciar Cirurgia]  [⏹️ Finalizar Cirurgia] ║
║                                                   ║
║  ┌─────────────────────────────────────────────┐ ║
║  │ 📝 Histórico Recente                        │ ║
║  │ • 13/12 - Revasc. - 4h30m - ✅             │ ║
║  │ • 12/12 - Troca Aórtica - 3h15m - ✅       │ ║
║  └─────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════╝
```

### Painel Admin:
```
╔═══════════════════════════════════════════════════╗
║  👨‍💼 Painel Administrativo                       ║
╠═══════════════════════════════════════════════════╣
║  [👨‍⚕️ Marcar Presença]  [📊 Administração]      ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  📊 ESTATÍSTICAS                                 ║
║  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐║
║  │👥 25    │ │📅 3     │ │📝 150   │ │📈 92%  │║
║  │Perfusion│ │Cirurgias│ │Registros│ │Presença│║
║  └─────────┘ └─────────┘ └─────────┘ └────────┘║
║                                                   ║
║  📈 GRÁFICOS                                     ║
║  ┌─────────────────┐  ┌─────────────────┐      ║
║  │ 📊 Últimos 7   │  │ 🍩 Por          │      ║
║  │    Dias        │  │   Perfusionista  │      ║
║  └─────────────────┘  └─────────────────┘      ║
║                                                   ║
║  🔍 FILTROS                                      ║
║  Turma: [Todas ▼] Perfus: [Todos ▼]            ║
║  Data: [início] até [fim]  [Aplicar] [Limpar]  ║
║                                                   ║
║  📋 REGISTROS (150 total)       [📥 Exportar CSV]║
║  ┌─────┬──────┬──────────┬──────────┬─────┬──┐║
║  │Data │Turma │Principal │Auxiliar  │...  │📎│║
║  ├─────┼──────┼──────────┼──────────┼─────┼──┤║
║  │13/12│2024.1│Dr. João  │Maria S.  │...  │📥│║
║  │12/12│2024.2│Dra. Ana  │Carlos P. │...  │- │║
║  └─────┴──────┴──────────┴──────────┴─────┴──┘║
║  Mostrando 1-10 de 150  [◀] 1 2 3 ... 15 [▶]  ║
╚═══════════════════════════════════════════════════╝
```

---

## 📊 Estatísticas do Sistema

### Capacidade:
- ✅ **Perfusionistas:** Ilimitado (atualmente 25)
- ✅ **Registros:** Ilimitado (atualmente ~150)
- ✅ **Anexos:** 1 por cirurgia (máx. 5MB cada)
- ✅ **Turmas:** 4 períodos configurados

### Performance:
- ⚡ **Load time:** ~8-13 segundos
- ⚡ **Registros por página:** 10
- ⚡ **Resposta da API:** < 1 segundo

### Armazenamento:
- 💾 **Dados:** Banco de dados relacional
- 💾 **Anexos:** Base64 no banco
- 💾 **Backup:** Automático via sistema

---

## 🔐 Segurança e Validações

### Validações de Entrada:
- ✅ **Campos obrigatórios:** Perfusionista Principal, Cirurgião, Tipo
- ✅ **Formato de arquivo:** PDF, JPG, PNG
- ✅ **Tamanho de arquivo:** Máximo 5MB
- ✅ **Bloqueio após conclusão:** Campos não podem ser alterados

### Proteções:
- 🔒 **Dados imutáveis** após finalização
- 🔒 **Validação no frontend** e backend
- 🔒 **Timestamps automáticos** (não editáveis)
- 🔒 **IDs únicos** (UUIDs)

---

## 🚀 Como Começar?

### 1️⃣ **Perfusionistas:**
```bash
1. Acesse: [URL do sistema]/index.html
2. Leia: GUIA-RAPIDO-CIRURGIAS.md
3. Registre sua primeira cirurgia!
```

### 2️⃣ **Administradores:**
```bash
1. Acesse: [URL do sistema]/admin.html
2. Explore o dashboard e relatórios
3. Leia: README.md (seção admin)
```

### 3️⃣ **Deploy (Publicação):**
```bash
1. Acesse a aba "Publish" no ambiente
2. Clique em "Publicar"
3. Copie o link gerado
4. Compartilhe com os usuários!
```

---

## 📚 Documentação Completa

| Documento | Propósito |
|-----------|-----------|
| **INDICE-DOCUMENTACAO.md** | 📑 Navegação por todos os documentos |
| **README.md** | 📖 Documentação técnica completa |
| **GUIA-RAPIDO-CIRURGIAS.md** | ⚡ Como usar o sistema |
| **GUIA-ANEXO-FICHA-CEC.md** | 📎 Como anexar documentos |
| **FUNCIONALIDADE-ANEXO-CEC.md** | 🔧 Detalhes técnicos de anexos |

---

## ✅ Status Atual

### O Que Está Funcionando:

- ✅ Sistema completo de registro de cirurgias
- ✅ 4 turmas com 25 perfusionistas
- ✅ 7 tipos de cirurgias cardiovasculares
- ✅ Cálculo automático de duração
- ✅ Upload e download de anexos (fichas de CEC)
- ✅ Painel administrativo com dashboard
- ✅ Gráficos visuais (Chart.js)
- ✅ Filtros avançados por turma/perfusionista/período
- ✅ Exportação completa para CSV
- ✅ Gerenciamento de perfusionistas
- ✅ Documentação completa em português
- ✅ Interface responsiva (mobile-friendly)
- ✅ Validações automáticas
- ✅ Feedback visual (modais e alertas)

### Pronto para:

- ✅ **Produção** - Sistema testado e funcional
- ✅ **Deploy** - Publicação via aba "Publish"
- ✅ **Uso real** - Registro de cirurgias reais
- ✅ **Expansão** - Adicionar mais perfusionistas/turmas

---

## 🎯 Benefícios do Sistema

### Para Perfusionistas:
- ✅ **Registro fácil** e rápido
- ✅ **Histórico pessoal** acessível
- ✅ **Cálculos automáticos** (sem erros)
- ✅ **Documentação anexada** (centralizada)

### Para Administradores:
- ✅ **Visão geral completa** do setor
- ✅ **Relatórios instantâneos** com gráficos
- ✅ **Exportação de dados** para análise
- ✅ **Controle total** de perfusionistas

### Para a Instituição:
- ✅ **Rastreabilidade** de todas as cirurgias
- ✅ **Auditoria facilitada** com registros completos
- ✅ **Estatísticas precisas** de produtividade
- ✅ **Documentação digital** organizada

---

**Sistema pronto para uso em produção! 🚀**  
**Versão 3.0 - Dezembro 2024**
