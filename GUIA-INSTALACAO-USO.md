# 🚀 Guia Completo de Instalação e Uso

## Sistema de Controle de Cirurgias Cardiovasculares

---

## 📋 Índice

1. [Requisitos do Sistema](#requisitos)
2. [Instalação](#instalação)
3. [Primeiro Acesso](#primeiro-acesso)
4. [Uso do Sistema](#uso-do-sistema)
5. [PWA - Instalação do App](#pwa)
6. [Administração](#administração)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Requisitos do Sistema {#requisitos}

### Servidor Web:
- ✅ Apache, Nginx, ou qualquer servidor HTTP
- ✅ HTTPS configurado (recomendado para PWA)
- ✅ Suporte a arquivos estáticos

### Navegadores Suportados:
- ✅ Chrome/Edge 90+ (recomendado)
- ✅ Safari 14+ (iOS/macOS)
- ✅ Firefox 88+
- ✅ Samsung Internet 14+

### Dispositivos:
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Mobile (Android, iOS)
- ✅ Tablet (Android, iOS)

---

## 📦 Instalação {#instalação}

### Método 1: Deploy Direto

1. **Fazer download dos arquivos**
   ```bash
   # Todos os arquivos do sistema
   ```

2. **Colocar na pasta do servidor web**
   ```bash
   # Apache: /var/www/html/
   # Nginx: /usr/share/nginx/html/
   # Ou outra pasta configurada
   ```

3. **Verificar permissões**
   ```bash
   chmod 644 *.html
   chmod 644 *.js
   chmod 644 *.css
   ```

4. **Acessar via navegador**
   ```
   http://seu-dominio.com/login.html
   ou
   http://localhost/login.html
   ```

### Método 2: Servidor de Desenvolvimento

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000

# Acessar: http://localhost:8000/login.html
```

---

## 🔐 Primeiro Acesso {#primeiro-acesso}

### Para Perfusionistas (Alunos):

1. **Acessar página de login**
   ```
   /login.html
   ```

2. **Usar credenciais padrão**
   - **Login:** Sua matrícula (ex: 20241001)
   - **Senha:** Sua matrícula (mesma)

3. **Trocar senha obrigatoriamente**
   - Sistema pedirá nova senha
   - Mínimo 6 caracteres
   - Confirmar nova senha

4. **Pronto!** Você está logado

### Para Administradores (Coordenadores):

1. **Acessar página de admin**
   ```
   /admin-login.html
   ```

2. **Usar credenciais de coordenador**
   
   **Coordenador Uenderson:**
   - Login: `Uenderson`
   - Senha: `020412`
   
   **Coordenadora Daize:**
   - Login: `Daize Santa Rosa`
   - Senha: `1614`

3. **Pronto!** Acesso ao painel administrativo

---

## 💻 Uso do Sistema {#uso-do-sistema}

### Para Perfusionistas:

#### 1. **Registrar Cirurgia**

1. Clique em "Registrar Cirurgia"
2. Preencha os dados:
   - Perfusionista Principal
   - Perfusionista Auxiliar
   - Cirurgião
   - Tipo de Cirurgia
   - Data
3. Clique em "Registrar Entrada"
4. Após a cirurgia, clique em "Registrar Saída"
5. Preencha:
   - Tempo CEC
   - Tempo de Pinça
   - Observações
   - **ANEXAR RELATÓRIO** (obrigatório)
6. Clique em "Finalizar Cirurgia"

#### 2. **Registrar Módulo**

1. Clique no botão "Cirurgia/Módulo"
2. Selecione "Registrar Módulo"
3. Preencha:
   - Tipo (Teórico ou Prático)
   - Nome do Módulo
   - Duração (horas)
   - Instrutor
   - Data
   - Observações
4. Clique em "Registrar Módulo"

#### 3. **Ver Estatísticas**

- Dashboard automático mostra:
  - Total de horas validadas
  - Cirurgias como responsável
  - Meta de 800h ajustada
  - Progresso visual
  - Histórico de registros

#### 4. **Acompanhar Validações**

- Registros aparecem como:
  - 🟡 **Pendente** - Aguardando validação
  - 🟢 **Validado** - Aprovado por coordenador
  - 🔴 **Rejeitado** - Com motivo da rejeição

---

### Para Administradores:

#### 1. **Dashboard**

- Visualizar:
  - Total de alunos
  - Presenças do dia
  - Total de registros
  - Taxa de presença
  - Gráficos interativos

#### 2. **Validações**

1. Clicar na aba "Validações"
2. Ver lista de registros pendentes
3. Filtrar: Todos / Cirurgias / Módulos

**Validar Cirurgia:**
- Clique em "Validar"
- Confirme → Horas contabilizadas

**Validar Módulo Teórico:**
- Clique em "Validar"
- Confirme → Registrado

**Validar Módulo Prático:**
- Clique em "Validar Horas"
- Ajuste duração se necessário
- Confirme → Horas abatidas da meta

**Rejeitar Registro:**
- Clique em "Rejeitar"
- Digite justificativa (obrigatório)
- Confirme → Aluno vê motivo

#### 3. **Relatórios/Anexos**

1. Clicar na aba "Relatórios"
2. Ver todos os anexos enviados
3. Filtrar por: Turma / Aluno / Status
4. Visualizar ou baixar relatórios

#### 4. **Gerenciar Perfusionistas**

1. Clicar na aba "Perfusionistas"
2. Filtrar por turma
3. Adicionar novos perfusionistas
4. Ativar/desativar alunos
5. Resetar senhas

---

## 📱 PWA - Instalação do App {#pwa}

### Opção 1: Botão na Navegação (🟢 Verde)

1. Acessar `/login.html` ou `/index.html`
2. Localizar botão "⬇️ Instalar App" (verde)
3. Clicar no botão
4. Confirmar instalação no prompt do navegador
5. App instalado!

### Opção 2: Botão Flutuante (🟣 Roxo)

1. Acessar qualquer página do sistema
2. Localizar botão flutuante no canto inferior direito
3. Clicar em "📥 Instalar App"
4. Confirmar instalação
5. App instalado!

### Instruções Específicas:

**iOS (Safari):**
1. Abrir site no Safari
2. Toque no botão "Compartilhar" (📤)
3. Selecione "Adicionar à Tela Inicial"
4. Confirme → App na tela inicial

**Android (Chrome):**
1. Abrir site no Chrome
2. Toque nos 3 pontos (⋮)
3. Selecione "Instalar aplicativo"
4. Confirme → App instalado

**Desktop (Chrome/Edge):**
1. Abrir site
2. Clique no ícone de instalação na barra de endereço
3. Ou: Menu → Instalar...
4. Confirme → App instalado

---

## 👨‍💼 Administração {#administração}

### Adicionar Novo Perfusionista:

**Via Interface:**
1. Login admin → Aba "Perfusionistas"
2. Clique em "Adicionar Novo Perfusionista"
3. Preencha: Nome, Matrícula, Email, Turma
4. Clique em "Adicionar"

**Via Utilitário:**
1. Acessar `/util/cadastrar-alunos.html`
2. Preencher formulário
3. Aluno cadastrado automaticamente

### Gerar Matrículas:

1. Acessar `/util/gerar-matriculas.html`
2. Escolher turma e quantidade
3. Matrículas geradas automaticamente

### Verificar Usuários:

1. Acessar `/util/verificar-usuarios.html`
2. Ver lista completa de usuários cadastrados

### Testar Login:

1. Acessar `/util/testar-login.html`
2. Testar credenciais de alunos

---

## 🔧 Troubleshooting {#troubleshooting}

### Problema: Não consigo fazer login

**Solução:**
1. Verificar se está usando matrícula correta
2. Primeiro acesso: senha = matrícula
3. Limpar cache do navegador
4. Tentar em modo anônimo

### Problema: Botão "Instalar App" não aparece

**Solução:**
1. Verificar se está usando HTTPS
2. Usar Chrome/Edge (melhor suporte)
3. iOS: Usar Safari, não Chrome
4. Botão pode estar oculto se app já instalado

### Problema: Anexo não está sendo enviado

**Solução:**
1. Verificar tamanho (máx. 5MB)
2. Formatos: PDF, JPG, PNG
3. Tentar outro arquivo
4. Verificar conexão com internet

### Problema: Validações não aparecem no admin

**Solução:**
1. Fazer logout e login novamente
2. Verificar se é coordenador (não aluno)
3. Atualizar página (F5)
4. Verificar console do navegador (F12)

### Problema: Estatísticas não atualizam

**Solução:**
1. Aguardar validação do coordenador
2. Horas só contam após validação
3. Atualizar página
4. Fazer logout/login

### Problema: Service Worker não registra

**Solução:**
1. Verificar HTTPS (obrigatório)
2. Verificar arquivo `service-worker.js` existe
3. Limpar cache do navegador
4. Tentar em modo anônimo

---

## 📞 Suporte

### Documentação:
- `README.md` - Documentação principal
- `ESTRUTURA-PROJETO.md` - Estrutura do sistema
- `docs/` - Documentação detalhada

### Administradores:
- **Uenderson** (Coordenador)
- **Daize Santa Rosa** (Coordenadora)

---

## ✅ Checklist de Instalação

- [ ] Servidor web configurado
- [ ] Arquivos copiados para servidor
- [ ] Permissões configuradas
- [ ] HTTPS ativo (para PWA)
- [ ] Acesso via navegador funcionando
- [ ] Login de teste bem-sucedido
- [ ] Admin login funcionando
- [ ] Registro de cirurgia testado
- [ ] Validação testada
- [ ] PWA instalável
- [ ] Documentação revisada

---

**Sistema pronto para uso em produção!** ✅

---

**Última atualização:** 13/12/2024  
**Versão:** 1.0  
**Status:** ✅ Produção
