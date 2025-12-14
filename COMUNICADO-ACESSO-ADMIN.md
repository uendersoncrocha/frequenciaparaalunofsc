# 📢 COMUNICADO: Acesso ao Painel Administrativo

## 🎯 Para: Administrador do Sistema

---

## ✅ Correção Implementada

A navegação para o **Painel Administrativo** foi corrigida e agora funciona corretamente através da página de login administrativa.

---

## 🔐 Como Acessar o Painel Administrativo

### 🌐 **Método 1: A partir da página de login de perfusionistas**

1. Acesse: `login.html`
2. Na parte inferior da página, clique no link: **"Acesso Administrativo"**
3. Você será redirecionado para: `admin-login.html`
4. Insira suas credenciais administrativas:
   - **Usuário:** `Uenderson`
   - **Senha:** `020412`
5. Clique em: **"Acessar Painel"**

---

### 🏥 **Método 2: A partir da página principal (index.html)**

1. Após fazer login como perfusionista
2. No topo da página, clique no botão: **"Acesso Administrativo"**
3. Você será redirecionado para: `admin-login.html`
4. Insira suas credenciais administrativas:
   - **Usuário:** `Uenderson`
   - **Senha:** `020412`
5. Clique em: **"Acessar Painel"**

---

### 🔗 **Método 3: Acesso direto**

1. Digite diretamente na barra de endereços: `admin-login.html`
2. Insira suas credenciais:
   - **Usuário:** `Uenderson`
   - **Senha:** `020412`
3. Clique em: **"Acessar Painel"**

---

## 🔒 Credenciais Administrativas

```
🌐 URL de Acesso: admin-login.html
👤 Usuário: Uenderson
🔑 Senha: 020412
```

> ⚠️ **IMPORTANTE:** Estas credenciais são exclusivas para o administrador e diferentes das credenciais dos perfusionistas.

---

## 💡 Opções de Sessão

Ao fazer login, você pode escolher:

- ☑️ **Manter conectado**: Sua sessão será mantida por **7 dias**
- ☐ **Não manter**: Sua sessão expirará ao fechar o navegador

---

## 🛡️ Segurança

### Proteção Implementada:

1. ✅ **Login Obrigatório**: Não é possível acessar o painel sem autenticação
2. ✅ **Redirecionamento Automático**: Tentativas de acesso direto a `admin.html` redirecionam para login
3. ✅ **Sessão Segura**: Informações de login armazenadas de forma segura
4. ✅ **Logout Seguro**: Botão "Sair do Admin" encerra a sessão e limpa dados

---

## 🚀 Funcionalidades do Painel Administrativo

Após fazer login, você terá acesso a:

### 📊 **Dashboard**
- Total de perfusionistas cadastrados
- Cirurgias realizadas hoje
- Total de registros no sistema
- Taxa de presença dos últimos 30 dias

### 📈 **Gráficos**
- Gráfico de linha: Cirurgias nos últimos 7 dias
- Gráfico de rosca: Distribuição de cirurgias por perfusionista

### 📋 **Tabela de Registros**
- Listagem completa de todas as cirurgias
- 13 colunas com informações detalhadas
- Filtros por turma, perfusionista e data
- Download de fichas de CEC anexadas
- Exportação para CSV
- Exclusão de registros

### 👥 **Gerenciamento de Perfusionistas**
- Lista de todos os perfusionistas por turma
- Adicionar novos perfusionistas
- Ativar/desativar perfusionistas
- Resetar senhas (volta para matrícula padrão)
- Contador de cirurgias por perfusionista

---

## 🔄 Diferença Entre os Tipos de Login

### 🩺 **Login de Perfusionistas** (`login.html`)
- Para: Perfusionistas registrarem suas cirurgias
- Credenciais: Matrícula e senha individual
- Acessa: Página de registro de cirurgias (`index.html`)

### 👨‍💼 **Login Administrativo** (`admin-login.html`)
- Para: Administrador gerenciar o sistema
- Credenciais: Usuário `Uenderson` + Senha `020412`
- Acessa: Painel administrativo (`admin.html`)

---

## ❓ Perguntas Frequentes

### 1. **Esqueci minha senha administrativa, o que fazer?**
Entre em contato com o desenvolvedor do sistema para resetar sua senha.

### 2. **Posso usar as credenciais de perfusionista para acessar o painel administrativo?**
Não. O painel administrativo requer credenciais exclusivas diferentes das credenciais dos perfusionistas.

### 3. **Por que não consigo acessar `admin.html` diretamente?**
Por segurança, o painel administrativo requer autenticação. O sistema redirecionará automaticamente para a página de login.

### 4. **Como faço logout do painel administrativo?**
No painel administrativo, clique no botão **"Sair do Admin"** no canto superior direito.

### 5. **Minha sessão expira quando fecho o navegador?**
Depende. Se você marcou **"Manter conectado"** ao fazer login, sua sessão durará 7 dias. Caso contrário, expirará ao fechar o navegador.

---

## 🆘 Problemas de Acesso?

Se você encontrar problemas ao acessar o painel administrativo:

1. **Verifique a URL**: Certifique-se de estar acessando `admin-login.html` (não `admin.html`)
2. **Confirme as credenciais**: Usuário: `Uenderson` | Senha: `020412`
3. **Limpe o cache**: Às vezes o navegador pode ter dados antigos em cache
4. **Tente outro navegador**: Para descartar problemas específicos do navegador
5. **Consulte a documentação**: Veja `NAVEGACAO-ADMIN.md` para mais detalhes

---

## 📚 Documentação Relacionada

Para mais informações, consulte:

- **`LOGIN-ADMINISTRATIVO.md`** - Documentação completa do login administrativo
- **`NAVEGACAO-ADMIN.md`** - Guia de navegação administrativa
- **`SISTEMA-LOGIN.md`** - Sistema de autenticação completo
- **`README.md`** - Documentação geral do sistema

---

## 📞 Suporte

Para assistência adicional ou dúvidas sobre o sistema:
- Consulte a documentação completa
- Verifique o arquivo `INDICE-DOCUMENTACAO.md` para encontrar documentos específicos
- Entre em contato com o desenvolvedor do sistema

---

## ✅ Resumo Rápido

```
🔹 URL: admin-login.html
🔹 Usuário: Uenderson
🔹 Senha: 020412
🔹 Acesso: Links "Acesso Administrativo" em login.html e index.html
🔹 Sessão: 7 dias (se "Manter conectado")
🔹 Logout: Botão "Sair do Admin"
```

---

**Data:** 13/12/2025  
**Versão do Sistema:** 4.1  
**Status:** ✅ Sistema Operacional  

**🎉 O acesso administrativo está totalmente funcional!**
