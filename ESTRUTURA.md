# 📁 Estrutura do Projeto - Sistema de Presença por Turmas

## 🗂️ Organização de Arquivos

```
📦 sistema-presenca-estagio/
│
├── 📄 index.html                    # Página principal - Marcação de presença
├── 📄 admin.html                    # Painel administrativo
│
├── 📁 js/
│   ├── 📜 main.js                   # Lógica da página do aluno
│   └── 📜 admin.js                  # Lógica do painel admin
│
├── 📚 README.md                     # Documentação completa do projeto
├── 🚀 INICIO-RAPIDO.md             # Guia rápido de uso
├── 🔄 MUDANCAS-TURMAS.md           # Resumo das atualizações de turmas
└── 📋 ESTRUTURA.md                 # Este arquivo
```

---

## 📊 Estrutura de Dados

### 🗃️ Tabelas do Sistema

#### 1. **students** (Alunos)
```
┌─────────────────┬──────────┬────────────────────────────┐
│ Campo           │ Tipo     │ Descrição                  │
├─────────────────┼──────────┼────────────────────────────┤
│ id              │ text     │ ID único                   │
│ name            │ text     │ Nome completo              │
│ email           │ text     │ E-mail                     │
│ course          │ text     │ Curso (sempre "Estágio")   │
│ registration    │ text     │ Número de matrícula        │
│ class_period    │ text     │ Turma (2024.1, 2024.2...)  │
│ active          │ bool     │ Status ativo/inativo       │
└─────────────────┴──────────┴────────────────────────────┘
```

#### 2. **attendance** (Presenças)
```
┌─────────────────┬──────────┬────────────────────────────┐
│ Campo           │ Tipo     │ Descrição                  │
├─────────────────┼──────────┼────────────────────────────┤
│ id              │ text     │ ID único                   │
│ student_id      │ text     │ ID do aluno                │
│ student_name    │ text     │ Nome do aluno              │
│ date            │ text     │ Data (YYYY-MM-DD)          │
│ check_in        │ text     │ Horário entrada (HH:MM)    │
│ check_out       │ text     │ Horário saída (HH:MM)      │
│ location        │ text     │ Localização                │
│ notes           │ text     │ Observações                │
└─────────────────┴──────────┴────────────────────────────┘
```

---

## 🎓 Distribuição de Alunos

```
┌──────────────────────────────────────────────────────────┐
│                   TURMAS DO SISTEMA                      │
├──────────┬────────┬──────────────────────────────────────┤
│  Turma   │ Alunos │          Nomes                       │
├──────────┼────────┼──────────────────────────────────────┤
│ 2024.1   │   7    │ Giovana, Gabriela, Thaylane,         │
│          │        │ Rafaela, Jaiane, Beatriz,            │
│          │        │ Ana Clara                            │
├──────────┼────────┼──────────────────────────────────────┤
│ 2024.2   │   4    │ Anthony, Emille, Driele,             │
│          │        │ Israel                               │
├──────────┼────────┼──────────────────────────────────────┤
│ 2025.1   │   5    │ Milena, Giovana, Gislayne,           │
│          │        │ Marimar, Ana Beatriz                 │
├──────────┼────────┼──────────────────────────────────────┤
│ 2025.2   │   9    │ Vinícius, Maria Eduarda,             │
│          │        │ Amanda Moreira, Amanda Marques,      │
│          │        │ Rafael, Vitória, Claudia,            │
│          │        │ Sthefany, Nicoly                     │
├──────────┼────────┼──────────────────────────────────────┤
│  TOTAL   │   25   │                                      │
└──────────┴────────┴──────────────────────────────────────┘
```

---

## 🔗 Fluxo de Navegação

### Para Alunos (index.html):

```
┌─────────────────────────────────────────────────────────┐
│                    INDEX.HTML                           │
│                                                         │
│  1️⃣  Selecionar Turma                                   │
│      ↓                                                  │
│  2️⃣  Selecionar Nome (filtrado)                         │
│      ↓                                                  │
│  3️⃣  Visualizar Informações                             │
│      ↓                                                  │
│  4️⃣  Registrar Entrada/Saída                            │
│      ↓                                                  │
│  5️⃣  Ver Histórico de Presenças                         │
└─────────────────────────────────────────────────────────┘
```

### Para Administradores (admin.html):

```
┌─────────────────────────────────────────────────────────┐
│                    ADMIN.HTML                           │
│                                                         │
│  📊 DASHBOARD                                           │
│      ├─ Estatísticas gerais                            │
│      ├─ Gráfico de presenças (7 dias)                  │
│      └─ Gráfico por aluno                              │
│                                                         │
│  🔍 FILTROS                                             │
│      ├─ Por turma                                       │
│      ├─ Por aluno                                       │
│      └─ Por período                                     │
│                                                         │
│  📋 TABELA DE REGISTROS                                 │
│      ├─ Listagem com paginação                         │
│      ├─ Visualização de turma                          │
│      └─ Ações (excluir)                                │
│                                                         │
│  👥 GERENCIAMENTO                                       │
│      ├─ Listar alunos por turma                        │
│      ├─ Adicionar novo aluno                           │
│      └─ Ativar/desativar                               │
│                                                         │
│  💾 EXPORTAÇÃO                                          │
│      └─ CSV com dados de turma                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Tecnologias e Bibliotecas

| Tecnologia | Versão/CDN | Uso |
|------------|------------|-----|
| **HTML5** | - | Estrutura das páginas |
| **Tailwind CSS** | CDN | Estilização e responsividade |
| **Font Awesome** | 6.4.0 | Ícones |
| **Chart.js** | Latest | Gráficos e visualizações |
| **JavaScript ES6+** | - | Lógica de aplicação |
| **RESTful API** | Interno | Persistência de dados |

---

## 📱 Responsividade

O sistema é otimizado para:

- 💻 **Desktop**: Layout completo com 2-4 colunas
- 📱 **Tablet**: Layout adaptado com 1-2 colunas
- 📱 **Mobile**: Layout vertical de coluna única

---

## 🔐 Segurança e Boas Práticas

✅ Validação de formulários  
✅ Filtro de dados por turma  
✅ Soft delete (registros não são removidos permanentemente)  
✅ Campos obrigatórios  
✅ Feedback visual claro  
✅ Tratamento de erros  

---

## 📈 Performance

- ⚡ Carregamento rápido via CDN
- 🔄 Paginação de registros (10 por página)
- 🎯 Filtros eficientes
- 📊 Gráficos otimizados com Chart.js
- 💾 Cache de dados no frontend

---

## 🔄 API Endpoints

### Students (Alunos)
```
GET    /tables/students          # Listar todos
GET    /tables/students/{id}     # Obter um
POST   /tables/students          # Criar
PUT    /tables/students/{id}     # Atualizar
DELETE /tables/students/{id}     # Remover
```

### Attendance (Presenças)
```
GET    /tables/attendance        # Listar todos
GET    /tables/attendance/{id}   # Obter um
POST   /tables/attendance        # Criar
PUT    /tables/attendance/{id}   # Atualizar
PATCH  /tables/attendance/{id}   # Atualizar parcial
DELETE /tables/attendance/{id}   # Remover
```

---

## 📝 Documentação Disponível

| Arquivo | Conteúdo |
|---------|----------|
| 📚 **README.md** | Documentação completa e detalhada |
| 🚀 **INICIO-RAPIDO.md** | Guia rápido para começar |
| 🔄 **MUDANCAS-TURMAS.md** | Detalhes da atualização de turmas |
| 📋 **ESTRUTURA.md** | Este arquivo (visão geral) |

---

## ✨ Destaques do Sistema

1. **🎯 Organização por Turmas**
   - 4 turmas diferentes
   - 25 alunos cadastrados
   - Filtros inteligentes

2. **📊 Visualizações**
   - Dashboard com estatísticas
   - Gráficos interativos
   - Tabelas com paginação

3. **💼 Gestão Completa**
   - CRUD de alunos
   - CRUD de presenças
   - Exportação de dados

4. **🎨 Interface Moderna**
   - Design responsivo
   - Gradientes e efeitos
   - Feedback visual claro

5. **⚡ Performance**
   - Carregamento rápido
   - Filtros eficientes
   - Experiência fluida

---

**Sistema completo e pronto para uso!** 🚀

Para começar, abra `index.html` ou `admin.html` no navegador.
