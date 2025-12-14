# 🔐 Sistema de Login - Documentação Completa

**Data de Implementação:** 13/12/2024  
**Versão:** 4.0  
**Status:** ✅ Funcional

---

## 🎯 Visão Geral

O sistema agora possui **autenticação individual** para cada perfusionista. Cada usuário tem seu próprio login único baseado em sua **matrícula** e uma **senha** para acesso seguro.

---

## ✨ Funcionalidades Implementadas

### 1️⃣ **Página de Login**
- 🔐 Login com matrícula e senha
- 👁️ Botão para mostrar/ocultar senha
- 💾 Opção "Lembrar minha matrícula"
- ℹ️ Instruções de primeiro acesso
- 🚨 Mensagens de erro claras
- 🎨 Design moderno e responsivo

### 2️⃣ **Autenticação**
- ✅ Validação de matrícula
- ✅ Verificação de senha (hash simples)
- ✅ Verificação de status ativo
- ✅ Sessão persistente (LocalStorage)
- ✅ Proteção de páginas

### 3️⃣ **Gestão de Sessão**
- 📍 Detecção automática de usuário logado
- 🔄 Auto-login em páginas protegidas
- 🚪 Função de logout
- 💾 Persistência entre abas

### 4️⃣ **Gerenciamento de Senhas (Admin)**
- 🔑 Resetar senha para padrão (matrícula)
- 🆕 Senha padrão ao criar novo perfusionista
- ⚠️ Confirmação antes de resetar

---

## 📁 Arquivos Criados/Modificados

### Novos Arquivos:
1. **`login.html`** - Página de login
2. **`js/auth.js`** - Sistema de autenticação

### Arquivos Modificados:
1. **`index.html`** - Adicionado proteção e logout
2. **`admin.html`** - Adicionado botão de voltar ao login
3. **`js/main.js`** - Auto-carregamento do usuário logado
4. **`js/admin.js`** - Funções de resetar senha

### Schema Atualizado:
- **Tabela `students`** - Adicionado campo `password`

---

## 🔐 Como Funciona

### Fluxo de Login:

```
1. Usuário acessa o sistema
        ↓
2. Redirecionado para login.html
        ↓
3. Digita matrícula e senha
        ↓
4. Sistema valida credenciais
        ↓
5. Se válido: redireciona para index.html
   Se inválido: exibe erro
        ↓
6. Usuário registra cirurgias
        ↓
7. Clica em "Sair" para logout
        ↓
8. Retorna para login.html
```

### Autenticação:

```javascript
// Validações realizadas:
1. Matrícula existe?
2. Perfusionista está ativo?
3. Senha está correta?
4. Salva sessão no LocalStorage
5. Redireciona para página principal
```

---

## 👤 Credenciais Padrão

### **Primeiro Acesso:**

| Campo | Valor |
|-------|-------|
| **Login** | Sua matrícula |
| **Senha** | Sua matrícula |

### **Exemplo:**
- **Matrícula:** 2024001
- **Login:** 2024001
- **Senha:** 2024001

> ⚠️ **Importante:** Recomenda-se alterar a senha após o primeiro acesso (funcionalidade de alteração pode ser implementada futuramente).

---

## 🔑 Gestão de Senhas

### **Para Administradores:**

#### Resetar Senha de um Perfusionista:

1. Acesse `admin.html`
2. Vá até "Gerenciar Perfusionistas"
3. Localize o perfusionista
4. Clique no ícone de **chave** 🔑
5. Confirme a ação
6. A senha será resetada para a **matrícula**

#### Adicionar Novo Perfusionista:

1. Clique em "Adicionar Novo Perfusionista"
2. Preencha os dados
3. Ao salvar, a **senha padrão** será a **matrícula**
4. Informe ao perfusionista suas credenciais

---

## 📖 Guia de Uso

### **Para Perfusionistas:**

#### 1️⃣ **Primeiro Acesso:**

```
1. Acesse: [URL do sistema]/login.html
2. Digite sua matrícula no campo "Matrícula"
3. Digite sua matrícula no campo "Senha"
4. Clique em "Entrar"
5. Você será redirecionado para a página principal
```

#### 2️⃣ **Acessos Seguintes:**

```
1. Acesse: [URL do sistema]
2. Digite sua matrícula
3. Digite sua senha
4. (Opcional) Marque "Lembrar minha matrícula"
5. Clique em "Entrar"
```

#### 3️⃣ **Durante o Uso:**

- Você verá seu **nome** no topo da página
- Suas informações são carregadas **automaticamente**
- Não precisa selecionar turma ou nome
- O sistema já sabe quem você é!

#### 4️⃣ **Ao Terminar:**

```
1. Clique no botão "Sair" no topo
2. Você será deslogado
3. Retornará para a página de login
```

---

### **Para Administradores:**

#### Gerenciar Senhas:

```
1. Acesse admin.html
2. Vá até "Gerenciar Perfusionistas"
3. Cada perfusionista tem um botão 🔑
4. Clique para resetar senha
5. Informe o perfusionista sobre a nova senha
```

#### Criar Novo Usuário:

```
1. Clique em "Adicionar Novo Perfusionista"
2. Preencha:
   - Nome Completo
   - Matrícula (será o login)
   - Email
   - Turma
3. Clique em "Salvar"
4. Senha padrão: igual à matrícula
5. Informe o perfusionista
```

---

## 🔒 Segurança

### **Implementações de Segurança:**

#### 1️⃣ **Hash de Senha:**
```javascript
// Senhas são armazenadas com hash simples
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}
```

> ⚠️ **Nota:** Para produção real com dados sensíveis, recomenda-se usar **bcrypt** ou **Argon2** no backend.

#### 2️⃣ **Validações:**
- ✅ Matrícula deve existir
- ✅ Perfusionista deve estar ativo
- ✅ Senha deve corresponder ao hash

#### 3️⃣ **Proteção de Páginas:**
```javascript
// Verifica se está logado ao carregar página
protectPage();
```

#### 4️⃣ **Sessão:**
- Armazenada no **LocalStorage**
- Persiste entre abas
- Limpa ao fazer logout

---

## 🎨 Interface de Login

### **Elementos Visuais:**

```
╔════════════════════════════════════════╗
║      🫀 Sistema de Presença           ║
║   Controle de Cirurgias Cardiovasc.   ║
╠════════════════════════════════════════╣
║                                        ║
║  🔐 Login de Perfusionista            ║
║                                        ║
║  🪪 Matrícula:                        ║
║  [_____________________________]      ║
║                                        ║
║  🔒 Senha:                            ║
║  [_____________________________] 👁️   ║
║                                        ║
║  ☑️ Lembrar minha matrícula           ║
║                                        ║
║        [🔓 Entrar]                    ║
║                                        ║
║  👨‍💼 Acesso Administrativo            ║
║                                        ║
║  ℹ️ Primeiro acesso?                  ║
║     Use sua matrícula como login      ║
║     e senha. Altere após primeiro     ║
║     acesso.                           ║
╚════════════════════════════════════════╝
```

### **Recursos da Interface:**

- 🎨 **Gradiente moderno** (roxo/violeta)
- 👁️ **Botão de mostrar/ocultar senha**
- 💾 **Checkbox de lembrar matrícula**
- ℹ️ **Dicas de primeiro acesso**
- 🚨 **Mensagens de erro claras**
- 📱 **Responsivo** (mobile-friendly)

---

## 🔄 Fluxos de Autenticação

### **Fluxo 1: Login Bem-Sucedido**

```
Usuário → login.html
    ↓
Digita matrícula + senha
    ↓
Clica "Entrar"
    ↓
Sistema valida (✓)
    ↓
Salva sessão
    ↓
Redireciona → index.html
    ↓
Carrega dados do usuário
    ↓
Usuário trabalha normalmente
```

### **Fluxo 2: Login com Erro**

```
Usuário → login.html
    ↓
Digita matrícula + senha
    ↓
Clica "Entrar"
    ↓
Sistema valida (✗)
    ↓
Exibe erro:
- "Matrícula não encontrada"
- "Senha incorreta"
- "Conta desativada"
    ↓
Usuário corrige e tenta novamente
```

### **Fluxo 3: Logout**

```
Usuário em index.html
    ↓
Clica botão "Sair"
    ↓
Sistema limpa sessão
    ↓
Redireciona → login.html
    ↓
Usuário deve fazer login novamente
```

### **Fluxo 4: Acesso Direto sem Login**

```
Usuário tenta acessar index.html
    ↓
Sistema verifica sessão (✗)
    ↓
Redireciona → login.html
    ↓
Usuário faz login
    ↓
Retorna para index.html
```

---

## 📊 Dados Armazenados

### **No LocalStorage:**

#### 1. **loggedInUser** (Dados do usuário):
```json
{
  "id": "uuid-123-456",
  "name": "Maria Santos",
  "registration": "2024001",
  "email": "maria@exemplo.com",
  "class_period": "2024.1",
  "course": "Estágio"
}
```

#### 2. **rememberedRegistration** (Opcional):
```
"2024001"
```

---

## 🐛 Mensagens de Erro

### **Possíveis Erros e Soluções:**

| Erro | Causa | Solução |
|------|-------|---------|
| "Por favor, preencha todos os campos" | Campos vazios | Preencher matrícula e senha |
| "Matrícula não encontrada" | Matrícula não existe | Verificar matrícula correta |
| "Senha incorreta" | Senha errada | Verificar senha (padrão: matrícula) |
| "Sua conta está desativada" | Conta inativa | Contatar administrador |
| "Erro ao processar login" | Erro de sistema | Tentar novamente ou contatar suporte |

---

## 🔧 Funcionalidades Técnicas

### **auth.js - Funções Principais:**

#### 1. `isLoggedIn()`
- Verifica se há usuário logado
- Retorna: `true` ou `false`

#### 2. `getLoggedInUser()`
- Obtém dados do usuário logado
- Retorna: objeto com dados ou `null`

#### 3. `setLoggedInUser(user)`
- Armazena dados do usuário na sessão
- Parâmetro: objeto com dados do usuário

#### 4. `logout()`
- Remove dados da sessão
- Redireciona para login.html

#### 5. `protectPage()`
- Protege páginas restritas
- Redireciona para login se não autenticado

#### 6. `simpleHash(str)`
- Gera hash simples da senha
- Retorna: string com hash

---

### **main.js - Modificações:**

#### `autoLoadLoggedInUser()`
```javascript
// Carrega automaticamente o usuário logado
// Esconde seleção de turma/nome
// Exibe informações do usuário
// Carrega dados de cirurgias
```

---

## 🎓 Perguntas Frequentes

### **1. Esqueci minha senha. O que fazer?**
Contate o administrador para resetar sua senha. Ela será resetada para sua matrícula.

### **2. Como altero minha senha?**
Atualmente, o sistema não possui funcionalidade de alteração de senha. Contate o administrador.

### **3. Posso usar o sistema sem login?**
Não. O login é obrigatório para garantir a segurança e rastreabilidade dos registros.

### **4. Minha sessão expira?**
A sessão persiste até você fazer logout ou limpar os dados do navegador.

### **5. Posso estar logado em múltiplas abas?**
Sim. O LocalStorage é compartilhado entre abas do mesmo navegador.

### **6. O que é a opção "Lembrar minha matrícula"?**
Ela salva sua matrícula no navegador para facilitar logins futuros. A senha ainda é necessária.

### **7. É seguro?**
Para uso institucional interno, sim. Para ambientes com dados altamente sensíveis, recomenda-se implementações adicionais de segurança.

---

## 🚀 Próximas Melhorias (Futuras)

### Funcionalidades Sugeridas:

1. **Alteração de Senha**
   - Permitir usuário alterar sua própria senha
   - Formulário com senha antiga + nova senha

2. **Recuperação de Senha**
   - Envio de email com link de recuperação
   - Código de verificação

3. **Autenticação de 2 Fatores (2FA)**
   - Código por SMS ou email
   - Aplicativo autenticador

4. **Histórico de Acessos**
   - Log de logins
   - Detecção de acessos suspeitos

5. **Níveis de Permissão**
   - Administrador
   - Perfusionista
   - Visualizador

6. **Tempo de Sessão**
   - Logout automático após inatividade
   - Renovação de sessão

---

## ✅ Conclusão

O sistema de login foi **implementado com sucesso** e adiciona uma camada essencial de **segurança** e **rastreabilidade** ao sistema. Cada perfusionista agora tem:

- ✅ **Login único** (matrícula)
- ✅ **Senha individual**
- ✅ **Acesso controlado**
- ✅ **Sessão persistente**
- ✅ **Experiência personalizada**

---

**Sistema de Login - Versão 4.0**  
**Status:** ✅ Implementado e Funcional  
**Data:** 13/12/2024
