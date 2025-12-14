# 📁 Estrutura do Projeto

## 🎯 Sistema de Controle de Cirurgias Cardiovasculares

Estrutura completa e organizada do sistema.

---

## 📂 Estrutura de Diretórios

```
sistema-cirurgias/
│
├── 📄 start.html                    # Página inicial (redireciona para login)
├── 📄 login.html                    # Página de login
├── 📄 index.html                    # Página principal (após login)
├── 📄 admin-login.html              # Login administrativo
├── 📄 admin.html                    # Painel administrativo
│
├── 📄 manifest.json                 # Configuração PWA
├── 📄 service-worker.js             # Service Worker PWA
├── 📄 README.md                     # Documentação principal
│
├── 📁 css/                          # Estilos CSS
│   └── style.css                    # Estilos globais
│
├── 📁 js/                           # Scripts JavaScript
│   ├── main.js                      # Script principal
│   ├── auth.js                      # Autenticação
│   ├── admin.js                     # Painel admin
│   ├── navigation.js                # Navegação
│   ├── student-stats.js             # Estatísticas do aluno
│   ├── modules.js                   # Módulos
│   ├── admin-validations.js         # Validações admin
│   ├── admin-attachments.js         # Anexos admin
│   ├── install-app.js               # Instalação PWA
│   └── pwa.js                       # PWA Manager
│
├── 📁 icons/                        # Ícones PWA
│   ├── icon.svg                     # Ícone SVG
│   └── gerar-icones.html            # Gerador de ícones
│
├── 📁 images/                       # Imagens do sistema
│   └── README.md                    # Documentação de imagens
│
├── 📁 config/                       # Configurações
│   └── system-config.js             # Configuração do sistema
│
├── 📁 docs/                         # Documentação
│   ├── README.md                    # Índice de documentação
│   └── [vários arquivos .md]        # Documentos específicos
│
└── 📁 util/                         # Utilitários
    ├── cadastrar-alunos.html        # Cadastro de alunos
    ├── gerar-matriculas.html        # Gerador de matrículas
    ├── verificar-usuarios.html      # Verificar usuários
    ├── testar-login.html            # Testar login
    └── testar-login-completo.html   # Teste completo de login
```

---

## 🎯 Páginas Principais

### 🔐 Páginas de Acesso
| Arquivo | Descrição | URL |
|---------|-----------|-----|
| `start.html` | Página inicial (redireciona) | `/start.html` |
| `login.html` | Login de perfusionistas | `/login.html` |
| `admin-login.html` | Login administrativo | `/admin-login.html` |

### 📱 Páginas do Aluno
| Arquivo | Descrição | Acesso |
|---------|-----------|--------|
| `index.html` | Painel principal do aluno | Após login |

### 👨‍💼 Páginas Administrativas
| Arquivo | Descrição | Acesso |
|---------|-----------|--------|
| `admin.html` | Painel administrativo | Após login admin |

---

## 📦 Scripts JavaScript

### 🔑 Core (Principais)
- **`auth.js`** - Sistema de autenticação
- **`main.js`** - Lógica principal (registro de cirurgias)
- **`navigation.js`** - Navegação e atalhos de teclado

### 📊 Funcionalidades
- **`student-stats.js`** - Estatísticas do perfusionista
- **`modules.js`** - Gerenciamento de módulos
- **`admin.js`** - Dashboard administrativo
- **`admin-validations.js`** - Sistema de validação
- **`admin-attachments.js`** - Gerenciamento de anexos

### 📱 PWA
- **`pwa.js`** - PWA Manager
- **`install-app.js`** - Sistema de instalação
- **`service-worker.js`** - Service Worker (raiz)

---

## 🎨 Estilos

### 📁 CSS
- **`css/style.css`** - Estilos globais do sistema

### 🎨 Frameworks
- **Tailwind CSS** - Carregado via CDN
- **Font Awesome** - Ícones

---

## 🛠️ Utilitários

### 📁 util/ (Ferramentas)
- `cadastrar-alunos.html` - Cadastrar novos alunos
- `gerar-matriculas.html` - Gerar matrículas
- `verificar-usuarios.html` - Verificar usuários cadastrados
- `testar-login.html` - Testar sistema de login
- `testar-login-completo.html` - Teste completo

---

## 📚 Documentação

### 📁 docs/
Mais de 70 documentos organizados por categoria:
- Guias de início rápido
- Manuais de funcionalidades
- Documentação técnica
- Relatórios de conclusão

Ver `docs/README.md` para índice completo.

---

## ⚙️ Configuração

### 📁 config/
- **`system-config.js`** - Configurações centralizadas do sistema

---

## 🚀 Fluxo de Navegação

```
start.html
    ↓
login.html ─────────────→ admin-login.html
    ↓                           ↓
index.html                  admin.html
(Aluno)                    (Administrador)
    ↓                           ↓
[Registrar Cirurgia]      [Validar Registros]
[Ver Estatísticas]        [Gerenciar Alunos]
[Registrar Módulos]       [Ver Dashboard]
```

---

## 📊 Banco de Dados (Tables API)

### Tabelas Principais:
1. **`students`** - Perfusionistas cadastrados
2. **`attendance`** - Registros de cirurgias
3. **`modules`** - Módulos teóricos e práticos

### Campos Principais:
- ID único
- Timestamps (created_at, updated_at)
- Campos de validação (validated, validated_by, validated_at)
- Campos específicos por tabela

---

## 🔐 Segurança

### Autenticação:
- Login individual por matrícula
- Senhas armazenadas localmente
- Sessão persistente (7 dias)
- Primeiro acesso obrigatório

### Administração:
- Login separado (admin-login.html)
- 2 coordenadores: Uenderson e Daize Santa Rosa
- Validação de ações administrativas

---

## 📱 PWA (Progressive Web App)

### Arquivos:
- `manifest.json` - Configuração do app
- `service-worker.js` - Funcionalidade offline
- `icons/` - Ícones do app

### Funcionalidades:
- Instalação com 1 clique
- Funcionamento offline
- Atualizações automáticas
- Notificações push (Android)

---

## 🎨 Design

### Cores Principais:
- **Primário:** #667eea → #764ba2 (gradiente roxo)
- **Sucesso:** #11998e → #38ef7d (verde)
- **Erro:** #eb3349 → #f45c43 (vermelho)
- **Background:** Gradiente roxo

### Componentes:
- Glass effect (transparência + blur)
- Cards com hover effect
- Botões com gradientes
- Modals responsivos

---

## 📊 Métricas do Sistema

- **Total de Arquivos:** ~90+
- **Linhas de Código:** ~15.000+
- **Páginas HTML:** 10+
- **Scripts JS:** 10
- **Documentos MD:** 70+
- **Turmas:** 4 (2024.1, 2024.2, 2025.1, 2025.2)
- **Alunos Cadastrados:** 25

---

## ✅ Status do Projeto

**🎉 100% FUNCIONAL E PRONTO PARA PRODUÇÃO**

- ✅ Sistema de login completo
- ✅ Registro de cirurgias
- ✅ Registro de módulos
- ✅ Validação administrativa
- ✅ Anexos obrigatórios
- ✅ Estatísticas em tempo real
- ✅ PWA instalável
- ✅ Sistema de navegação
- ✅ Documentação completa

---

**Última atualização:** 13/12/2024  
**Versão:** 1.0  
**Status:** ✅ Produção
