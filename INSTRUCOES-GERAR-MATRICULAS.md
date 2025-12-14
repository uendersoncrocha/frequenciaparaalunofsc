# 🎓 INSTRUÇÕES: Gerar Matrículas para os 25 Perfusionistas

**Versão:** 4.0  
**Data:** 13/12/2024  
**Status:** Pronto para Executar

---

## 🎯 O Que Será Feito

Vamos gerar **matrículas únicas** para todos os 25 perfusionistas e definir suas **senhas padrão**.

---

## 📋 Formato das Matrículas

**Padrão: AAASS###**

- **AAAA** = Ano (2024 ou 2025)
- **S** = Semestre (1 ou 2)
- **###** = Número sequencial (001, 002, 003...)

**Exemplos:**
- Turma 2024.1: `20241001`, `20241002`, `20241003`...
- Turma 2024.2: `20242001`, `20242002`, `20242003`...
- Turma 2025.1: `20251001`, `20251002`, `20251003`...
- Turma 2025.2: `20252001`, `20252002`, `20252003`...

---

## 🚀 Como Executar

### **PASSO 1: Abrir o Gerador**

```
1. Localize o arquivo: gerar-matriculas.html
2. Abra no navegador
3. Você verá uma página com o título "Gerar Matrículas para Perfusionistas"
```

### **PASSO 2: Gerar as Matrículas**

```
1. Clique no botão azul: "Gerar Matrículas e Senhas"
2. Aguarde o processamento (alguns segundos)
3. Uma tabela será exibida com todos os perfusionistas
```

### **PASSO 3: Verificar os Resultados**

```
Você verá 4 tabelas (uma por turma) com:
- Nome do perfusionista
- Matrícula gerada
- Senha padrão (igual à matrícula)
- Status (✓ Atualizado)
```

### **PASSO 4: Copiar as Credenciais**

```
Use as informações exibidas para:
- Criar uma lista de credenciais
- Enviar por email para cada perfusionista
- Imprimir e distribuir presencialmente
```

---

## 📊 O Que Será Gerado

### **Turma 2024.1 (7 perfusionistas)**
```
Ana Clara    → 20241001
Beatriz      → 20241002
Gabriela     → 20241003
Giovana      → 20241004
Jaiane       → 20241005
Rafaela      → 20241006
Thaylane     → 20241007
```

### **Turma 2024.2 (4 perfusionistas)**
```
Anthony      → 20242001
Driele       → 20242002
Emille       → 20242003
Israel       → 20242004
```

### **Turma 2025.1 (5 perfusionistas)**
```
Ana Beatriz  → 20251001
Giovana      → 20251002
Gislayne     → 20251003
Marimar      → 20251004
Milena       → 20251005
```

### **Turma 2025.2 (9 perfusionistas)**
```
Amanda Marques  → 20252001
Amanda Moreira  → 20252002
Claudia         → 20252003
Maria Eduarda   → 20252004
Nicoly          → 20252005
Rafael          → 20252006
Sthefany        → 20252007
Vinícius        → 20252008
Vitória         → 20252009
```

---

## 🔐 Senhas Padrão

**TODAS as senhas serão iguais às matrículas:**

- Matrícula: `20241001` → Senha: `20241001`
- Matrícula: `20242001` → Senha: `20242001`
- Matrícula: `20251001` → Senha: `20251001`
- Matrícula: `20252001` → Senha: `20252001`

---

## ✅ O Que Será Atualizado no Banco

Para cada perfusionista:

1. **Campo `registration`:** Receberá a matrícula gerada
2. **Campo `password`:** Receberá o hash da senha (seguro)

Exemplo de atualização:
```json
{
  "name": "Giovana",
  "registration": "20241004",  ← NOVO
  "password": "[hash]",        ← NOVO
  "class_period": "2024.1",
  "email": "giovana@exemplo.com",
  "active": true
}
```

---

## 📧 Template para Enviar aos Perfusionistas

Após gerar as matrículas, envie este modelo para cada perfusionista:

```
Assunto: Suas Credenciais de Acesso - Sistema de Cirurgias

Olá [NOME],

Suas credenciais de acesso ao Sistema de Controle de Cirurgias:

┌─────────────────────────────┐
│ Turma: [2024.1/2/2025.1/2]  │
│ Login: [########]           │
│ Senha: [########]           │
└─────────────────────────────┘

🔗 Acesse: [URL do sistema]

COMO USAR:
1. Digite seu LOGIN (matrícula)
2. Digite sua SENHA (mesma que a matrícula)
3. Clique em "Entrar"

⚠️ IMPORTANTE:
- Sempre faça LOGOUT ao terminar
- Não compartilhe suas credenciais

Dúvidas? Contate o administrador.

Atenciosamente,
[Seu Nome]
```

---

## 🎨 Exemplo Visual do Resultado

Após clicar em "Gerar Matrículas", você verá:

```
╔════════════════════════════════════════════════╗
║ Turma 2024.1                                   ║
╠════════════════════════════════════════════════╣
║ Nome          │ Matrícula │ Senha    │ Status ║
║───────────────┼───────────┼──────────┼────────║
║ Ana Clara     │ 20241001  │ 20241001 │ ✓      ║
║ Beatriz       │ 20241002  │ 20241002 │ ✓      ║
║ Gabriela      │ 20241003  │ 20241003 │ ✓      ║
║ ... (7 no total)                               ║
╚════════════════════════════════════════════════╝

╔════════════════════════════════════════════════╗
║ Turma 2024.2                                   ║
╠════════════════════════════════════════════════╣
║ Nome          │ Matrícula │ Senha    │ Status ║
║───────────────┼───────────┼──────────┼────────║
║ Anthony       │ 20242001  │ 20242001 │ ✓      ║
║ ... (4 no total)                               ║
╚════════════════════════════════════════════════╝

... (e assim para as outras turmas)

✅ 25 perfusionistas atualizados com sucesso!
```

---

## ⚠️ Observações Importantes

### **Antes de Executar:**
- ✅ Certifique-se de que todos os 25 perfusionistas estão cadastrados
- ✅ Verifique que o campo `class_period` está preenchido corretamente
- ✅ Faça backup se necessário (opcional)

### **Durante a Execução:**
- ⏳ Aguarde o processamento completo (não feche a página)
- 👀 Observe as mensagens de status
- ✅ Confirme que todos aparecem com "✓ Atualizado"

### **Após a Execução:**
- 📋 Copie ou anote todas as credenciais
- 📧 Distribua para os perfusionistas
- ✅ Teste fazendo login com uma das matrículas

---

## 🧪 Como Testar

### **Após Gerar as Matrículas:**

1. **Acesse a página de login** (`login.html`)
2. **Teste com uma matrícula:**
   - Login: `20241001`
   - Senha: `20241001`
3. **Clique em "Entrar"**
4. **Deve funcionar!** ✅

Se funcionar, todas as outras também funcionarão!

---

## 🆘 Solução de Problemas

### **Erro ao Gerar:**
```
Problema: Erro ao processar
Solução: 
- Verifique a conexão com o banco
- Recarregue a página (F5)
- Tente novamente
```

### **Alguns Não Foram Atualizados:**
```
Problema: Alguns com "✗ Erro"
Solução:
- Anote quais não foram atualizados
- Execute novamente
- Se persistir, atualize manualmente no admin
```

### **Não Encontrou Todos os Perfusionistas:**
```
Problema: Menos de 25 perfusionistas
Solução:
- Verifique se todos estão cadastrados
- Verifique o campo class_period
- Adicione os faltantes no admin
```

---

## 📚 Documentação Relacionada

Após gerar as matrículas, consulte:

- **MATRICULAS-GERADAS.md** - Lista completa de todas as matrículas
- **SISTEMA-LOGIN.md** - Como funciona o sistema de login
- **GUIA-INICIO-COM-LOGIN.md** - Guia para os perfusionistas

---

## ✅ Checklist de Execução

Antes de começar:
- [ ] Arquivo `gerar-matriculas.html` está acessível
- [ ] Banco de dados está online
- [ ] Todos os 25 perfusionistas estão cadastrados

Durante a execução:
- [ ] Abri `gerar-matriculas.html` no navegador
- [ ] Cliquei em "Gerar Matrículas e Senhas"
- [ ] Aguardei o processamento completo
- [ ] Verifiquei que todos têm status "✓ Atualizado"

Após a execução:
- [ ] Copiei todas as credenciais
- [ ] Testei login com uma matrícula
- [ ] Preparei emails/mensagens para distribuir
- [ ] Informei todos os perfusionistas

---

## 🎉 Pronto!

Após seguir estes passos:

✅ Todas as 25 matrículas estarão geradas  
✅ Todas as senhas estarão definidas  
✅ Sistema estará pronto para uso  
✅ Perfusionistas poderão fazer login  

---

**Sistema de Matrículas - Versão 4.0**  
**Status:** Pronto para Executar  
**Data:** 13/12/2024

🚀 **Vamos começar!**
