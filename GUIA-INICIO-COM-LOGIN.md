# 🚀 Guia de Início Rápido - Sistema com Login

**Versão:** 4.0  
**Última Atualização:** 13/12/2024  
**Status:** ✅ Operacional

---

## 🎯 Bem-vindo ao Sistema!

Este guia mostra como começar a usar o **Sistema de Controle de Cirurgias Cardiovasculares** com o novo sistema de login individual.

---

## 👥 Para Quem é Este Sistema?

### 👨‍⚕️ **Perfusionistas**
- Registram suas cirurgias diárias
- Controlam tempos de CEC e pinçamento
- Anexam fichas de procedimentos

### 👨‍💼 **Administradores**
- Visualizam relatórios e estatísticas
- Gerenciam perfusionistas e senhas
- Exportam dados para análise

---

## 🔐 Primeiro Acesso (Perfusionistas)

### Passo 1: Acesse o Sistema
```
Abra seu navegador e vá para:
https://[url-do-sistema]
```

### Passo 2: Faça Login
```
📍 Você será redirecionado para a tela de login

🪪 No campo "Matrícula":
   Digite sua matrícula (ex: 2024001)

🔒 No campo "Senha":
   Digite sua matrícula novamente
   (senha padrão no primeiro acesso)

🔓 Clique em "Entrar"
```

### Passo 3: Acesso Concedido!
```
✅ Você será redirecionado para a página principal
✅ Seu nome aparecerá no topo da página
✅ Suas informações serão carregadas automaticamente
```

---

## 📝 Registrar Sua Primeira Cirurgia

### 1️⃣ **Preencha os Dados Obrigatórios:**

```
👨‍⚕️ Perfusionista Principal:
   Digite o nome do perfusionista principal
   (pode ser você ou outro)

🩺 Cirurgião:
   Digite o nome do cirurgião responsável

❤️ Tipo de Cirurgia:
   Selecione o tipo no dropdown
   • Revascularização do Miocárdio
   • Troca Valvar Aórtica
   • Troca Valvar Mitral
   • Correção de CIA
   • Correção de CIV
   • Transplante Cardíaco
   • Outra
```

### 2️⃣ **Preencha os Dados Opcionais:**

```
⏱️ Tempo de CEC (minutos):
   Ex: 120

🔧 Tempo de Pinça (minutos):
   Ex: 90

📎 Ficha de CEC:
   Clique em "Escolher arquivo"
   Selecione PDF, JPG ou PNG (máx 5MB)

📝 Observações:
   Adicione notas sobre o procedimento
```

### 3️⃣ **Inicie a Cirurgia:**

```
🔵 Clique em "Iniciar Cirurgia"

O sistema registrará:
✓ Data atual
✓ Horário de início
✓ Todos os dados preenchidos

Durante a cirurgia:
• Você pode atualizar CEC/Pinça
• Pode adicionar/alterar observações
• Não pode alterar dados básicos
```

### 4️⃣ **Finalize a Cirurgia:**

```
🔴 Clique em "Finalizar Cirurgia"

O sistema calculará automaticamente:
✓ Horário de término
✓ Duração total da cirurgia
✓ Salva todos os dados permanentemente

⚠️ Após finalizar, nada pode ser alterado!
```

---

## 🚪 Como Sair do Sistema

```
1. Localize o botão "Sair" no topo da página
2. Clique nele
3. Você será deslogado
4. Retornará para a tela de login

⚠️ SEMPRE faça logout ao terminar!
   Especialmente em computadores compartilhados
```

---

## 🔑 Esqueci Minha Senha

### O Que Fazer:

```
1️⃣ Contate o administrador do sistema
2️⃣ Informe sua matrícula
3️⃣ Administrador resetará sua senha
4️⃣ Nova senha = sua matrícula
5️⃣ Faça login novamente
```

---

## 👨‍💼 Para Administradores

### Acesso ao Painel Admin

```
1. Acesse: [url-do-sistema]/admin.html
2. Não requer login (acesso direto)
3. Visualize estatísticas e registros
```

### Criar Novo Perfusionista

```
1. Clique em "Adicionar Novo Perfusionista"
2. Preencha:
   • Nome Completo
   • Matrícula (será o login)
   • Email
   • Turma (ex: 2024.1)
3. Clique em "Salvar"

🔒 Senha padrão: igual à matrícula

📢 Informe o perfusionista:
   "Seu login é: [matrícula]"
   "Sua senha é: [matrícula]"
```

### Resetar Senha de Perfusionista

```
1. Vá até "Gerenciar Perfusionistas"
2. Localize o perfusionista
3. Clique no ícone 🔑 (chave)
4. Confirme a ação
5. Senha resetada para a matrícula

📢 Informe o perfusionista sobre a nova senha
```

### Desativar/Ativar Perfusionista

```
Desativar:
1. Clique em "Desativar"
2. Perfusionista não poderá mais fazer login
3. Dados históricos são preservados

Ativar:
1. Clique em "Ativar"
2. Perfusionista volta a ter acesso
```

---

## 📊 Visualizar Relatórios (Admin)

### Dashboard

```
Veja estatísticas em tempo real:
• Total de perfusionistas
• Cirurgias realizadas hoje
• Total de registros
• Taxa de presença (30 dias)
```

### Gráficos

```
📈 Linha: Cirurgias nos últimos 7 dias
🍩 Rosca: Distribuição por perfusionista
```

### Tabela de Registros

```
Veja todos os registros com:
• Data e turma
• Perfusionistas (principal e auxiliar)
• Cirurgião e tipo de cirurgia
• Horários e duração
• Tempos de CEC e pinça
• Download de ficha CEC (se houver)
```

### Filtros

```
Filtre registros por:
• Turma (2024.1, 2024.2, 2025.1, 2025.2)
• Perfusionista específico
• Período de datas

Exportar:
• Clique em "Exportar CSV"
• Baixa planilha com todos os dados filtrados
```

---

## 🎓 Dicas Importantes

### 🔒 **Segurança**

✅ **SEMPRE** faça logout ao terminar
✅ **NUNCA** compartilhe sua senha
✅ Use computadores confiáveis
✅ Altere sua senha se suspeitar de acesso indevido

### 📱 **Compatibilidade**

✅ Funciona em computadores, tablets e celulares
✅ Use navegadores atualizados:
   • Google Chrome
   • Microsoft Edge
   • Mozilla Firefox
   • Safari

### 💾 **Salvamento**

✅ Dados são salvos automaticamente
✅ Não é necessário salvar manualmente
✅ Sempre confirme mensagens de sucesso
✅ Em caso de erro, tente novamente

### 📎 **Anexos**

✅ Formatos: PDF, JPG, PNG
✅ Tamanho máximo: 5MB
✅ Anexe durante ou antes de finalizar
✅ Não pode anexar após finalizar

---

## ❓ Perguntas Frequentes

### **1. Posso usar o mesmo login em vários computadores?**
✅ Sim, mas apenas um por vez. Logout no primeiro antes de usar outro.

### **2. Minha sessão expira?**
❌ Não. Você fica logado até fazer logout ou limpar os dados do navegador.

### **3. Posso alterar minha senha?**
❌ Atualmente não. Contate o administrador para resetar se necessário.

### **4. E se eu errar ao registrar uma cirurgia?**
⚠️ Durante o registro: pode editar CEC/Pinça/Observações  
❌ Após finalizar: apenas admin pode excluir o registro

### **5. Posso ver cirurgias de outros perfusionistas?**
❌ Não na página principal (apenas as suas)  
✅ Admin pode ver todas no painel administrativo

### **6. Como sei que meu registro foi salvo?**
✅ Uma mensagem de sucesso aparecerá  
✅ O registro aparecerá no seu histórico recente

---

## 🆘 Suporte

### Problemas Comuns e Soluções:

| Problema | Solução |
|----------|---------|
| Não consigo fazer login | Verifique matrícula e senha. Contate admin se necessário |
| Esqueci minha senha | Peça ao admin para resetar |
| Sistema lento | Atualize a página (F5) ou limpe cache do navegador |
| Não consigo anexar arquivo | Verifique se é PDF/JPG/PNG e menor que 5MB |
| Botão "Finalizar" não funciona | Preencha todos os campos obrigatórios |

### Contato:

```
📧 Email: [email do administrador]
📱 WhatsApp: [número do administrador]
🏢 Sala: [localização]
```

---

## 🎉 Pronto para Começar!

```
1️⃣ Acesse: [URL do sistema]
2️⃣ Faça login com sua matrícula
3️⃣ Registre sua primeira cirurgia
4️⃣ Explore as funcionalidades
5️⃣ Não esqueça de fazer logout!
```

---

## 📚 Documentação Adicional

Para mais informações, consulte:

- **SISTEMA-LOGIN.md** - Documentação completa do sistema de login
- **README.md** - Documentação geral do sistema
- **GUIA-RAPIDO-CIRURGIAS.md** - Detalhes sobre registro de cirurgias
- **GUIA-ANEXO-FICHA-CEC.md** - Como anexar documentos
- **VISAO-GERAL-SISTEMA.md** - Visão geral ilustrada

---

**Sistema de Controle de Cirurgias Cardiovasculares**  
**Versão 4.0 - Com Sistema de Login**  
**Status: ✅ Operacional**

Bom trabalho! 🫀💙
