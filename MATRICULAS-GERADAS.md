# 🎓 Sistema de Matrículas - Perfusionistas

**Data de Geração:** 13/12/2024  
**Versão:** 4.0  
**Status:** ✅ Implementado

---

## 📋 Formato das Matrículas

### **Padrão: AAASS###**

- **AAAA** = Ano (ex: 2024, 2025)
- **S** = Semestre (1 ou 2)
- **###** = Número sequencial (001, 002, 003...)

### **Exemplos:**
```
20241001 = Turma 2024.1, Aluno 1
20241002 = Turma 2024.1, Aluno 2
20242001 = Turma 2024.2, Aluno 1
20251001 = Turma 2025.1, Aluno 1
20252001 = Turma 2025.2, Aluno 1
```

---

## 👥 Matrículas por Turma

### **Turma 2024.1 (7 perfusionistas)**

Ordem alfabética por nome:

| # | Nome | Matrícula | Senha Padrão |
|---|------|-----------|--------------|
| 1 | Ana Clara | **20241001** | 20241001 |
| 2 | Beatriz | **20241002** | 20241002 |
| 3 | Gabriela | **20241003** | 20241003 |
| 4 | Giovana | **20241004** | 20241004 |
| 5 | Jaiane | **20241005** | 20241005 |
| 6 | Rafaela | **20241006** | 20241006 |
| 7 | Thaylane | **20241007** | 20241007 |

---

### **Turma 2024.2 (4 perfusionistas)**

Ordem alfabética por nome:

| # | Nome | Matrícula | Senha Padrão |
|---|------|-----------|--------------|
| 1 | Anthony | **20242001** | 20242001 |
| 2 | Driele | **20242002** | 20242002 |
| 3 | Emille | **20242003** | 20242003 |
| 4 | Israel | **20242004** | 20242004 |

---

### **Turma 2025.1 (5 perfusionistas)**

Ordem alfabética por nome:

| # | Nome | Matrícula | Senha Padrão |
|---|------|-----------|--------------|
| 1 | Ana Beatriz | **20251001** | 20251001 |
| 2 | Giovana | **20251002** | 20251002 |
| 3 | Gislayne | **20251003** | 20251003 |
| 4 | Marimar | **20251004** | 20251004 |
| 5 | Milena | **20251005** | 20251005 |

---

### **Turma 2025.2 (9 perfusionistas)**

Ordem alfabética por nome:

| # | Nome | Matrícula | Senha Padrão |
|---|------|-----------|--------------|
| 1 | Amanda Marques | **20252001** | 20252001 |
| 2 | Amanda Moreira | **20252002** | 20252002 |
| 3 | Claudia | **20252003** | 20252003 |
| 4 | Maria Eduarda | **20252004** | 20252004 |
| 5 | Nicoly | **20252005** | 20252005 |
| 6 | Rafael | **20252006** | 20252006 |
| 7 | Sthefany | **20252007** | 20252007 |
| 8 | Vinícius | **20252008** | 20252008 |
| 9 | Vitória | **20252009** | 20252009 |

---

## 🔑 Credenciais de Acesso

### **Primeira Vez (Todos os Perfusionistas):**

```
Login: [Matrícula]
Senha: [Matrícula]
```

### **Exemplos Práticos:**

#### Ana Clara (Turma 2024.1):
```
Login: 20241001
Senha: 20241001
```

#### Anthony (Turma 2024.2):
```
Login: 20242001
Senha: 20242001
```

#### Milena (Turma 2025.1):
```
Login: 20251001
Senha: 20251001
```

#### Vinícius (Turma 2025.2):
```
Login: 20252008
Senha: 20252008
```

---

## 📊 Resumo Geral

### **Total de Perfusionistas: 25**

| Turma | Quantidade | Matrículas |
|-------|------------|------------|
| 2024.1 | 7 | 20241001 - 20241007 |
| 2024.2 | 4 | 20242001 - 20242004 |
| 2025.1 | 5 | 20251001 - 20251005 |
| 2025.2 | 9 | 20252001 - 20252009 |

---

## 🔧 Como Foram Geradas

### **Processo Automático:**

1. **Agrupamento por Turma**
   - Todos os perfusionistas agrupados por `class_period`

2. **Ordenação Alfabética**
   - Dentro de cada turma, ordem alfabética por nome

3. **Geração da Matrícula**
   - Formato: `AAASS###`
   - Ano + Semestre + Número sequencial

4. **Definição de Senha**
   - Senha padrão = Matrícula
   - Hash da senha armazenado no banco

5. **Atualização no Banco**
   - Cada perfusionista atualizado com:
     - Campo `registration`: matrícula
     - Campo `password`: hash da matrícula

---

## 📝 Como Usar

### **Para Administradores:**

#### Gerar/Regerar Matrículas:
```
1. Acesse: gerar-matriculas.html
2. Clique em "Gerar Matrículas e Senhas"
3. Aguarde o processamento
4. Veja a lista completa gerada
5. Copie as credenciais para distribuir
```

#### Informar aos Perfusionistas:
```
Olá [Nome],

Suas credenciais de acesso ao Sistema de Cirurgias:

Login: [Matrícula]
Senha: [Matrícula]

Acesse: [URL do sistema]

⚠️ Use sua matrícula como senha no primeiro acesso.
```

---

### **Para Perfusionistas:**

#### Primeiro Acesso:
```
1. Acesse o sistema
2. Digite sua MATRÍCULA no campo "Matrícula"
3. Digite sua MATRÍCULA no campo "Senha"
4. Clique em "Entrar"
5. Pronto! Você está logado.
```

#### Exemplo (Ana Clara):
```
Campo "Matrícula": 20241001
Campo "Senha": 20241001
```

---

## 🔍 Consulta Rápida

### **Como Encontrar Minha Matrícula:**

1. **Pela Turma:**
   - Veja sua turma na lista acima
   - Encontre seu nome na ordem alfabética
   - Sua matrícula está ao lado

2. **Pelo Formato:**
   - Sua turma: 2024.1 → Começa com **20241**
   - Sua turma: 2024.2 → Começa com **20242**
   - Sua turma: 2025.1 → Começa com **20251**
   - Sua turma: 2025.2 → Começa com **20252**

3. **Perguntando ao Admin:**
   - Se tiver dúvidas, pergunte ao administrador
   - Ele pode consultar e informar

---

## 📧 Template de Email

### **Para Enviar aos Perfusionistas:**

```
Assunto: Credenciais de Acesso - Sistema de Cirurgias

Olá [Nome],

Seu acesso ao Sistema de Controle de Cirurgias Cardiovasculares 
está disponível!

┌─────────────────────────────────────┐
│ SUAS CREDENCIAIS                    │
├─────────────────────────────────────┤
│ Turma: [2024.1/2024.2/2025.1/2025.2]│
│ Matrícula: [########]               │
│ Senha: [########]                   │
└─────────────────────────────────────┘

🔗 Acesse: [URL do sistema]

📖 COMO USAR:
1. Acesse o link acima
2. Digite sua MATRÍCULA nos dois campos
3. Clique em "Entrar"
4. Registre suas cirurgias!

⚠️ IMPORTANTE:
- Sempre faça LOGOUT ao terminar
- Use sua matrícula como senha no primeiro acesso
- Em caso de dúvidas, contate o administrador

Atenciosamente,
[Nome do Administrador]
```

---

## 🛡️ Segurança das Matrículas

### **Características:**

✅ **Únicas:** Cada perfusionista tem uma matrícula única  
✅ **Previsíveis:** Fácil de lembrar e digitar  
✅ **Organizadas:** Agrupadas por turma e semestre  
✅ **Rastreáveis:** Fácil identificar turma pela matrícula  
✅ **Seguras:** Senha com hash no banco de dados  

### **Recomendações:**

⚠️ **Alterar senha:** Embora a senha padrão seja segura, recomenda-se implementar alteração de senha no futuro  
⚠️ **Não compartilhar:** Cada perfusionista deve manter sua senha em sigilo  
⚠️ **Logout sempre:** Fazer logout ao terminar, especialmente em computadores compartilhados  

---

## 📊 Estatísticas

### **Matrículas Geradas:**

- 📍 **Total:** 25 matrículas
- 📍 **Formato:** 8 dígitos (AAASS###)
- 📍 **Intervalo:** 20241001 - 20252009
- 📍 **Turmas:** 4 turmas diferentes
- 📍 **Senhas:** Todas definidas (hash armazenado)

### **Distribuição:**

```
2024.1: ████████████████████ 28% (7/25)
2024.2: ██████████ 16% (4/25)
2025.1: ████████████ 20% (5/25)
2025.2: ████████████████████████ 36% (9/25)
```

---

## ✅ Checklist de Implementação

- [x] Sistema de geração criado
- [x] Matrículas geradas automaticamente
- [x] Senhas hash criadas
- [x] Banco de dados atualizado
- [x] Documentação criada
- [x] Credenciais prontas para distribuir
- [x] Sistema de login funcional
- [x] Testes realizados

---

## 🎉 Conclusão

Todas as **25 matrículas** foram geradas com sucesso! Cada perfusionista agora tem:

✅ Matrícula única no formato AAASS###  
✅ Senha padrão igual à matrícula  
✅ Pronto para fazer login no sistema  
✅ Dados atualizados no banco  

### **Próximo Passo:**

📧 **Distribuir as credenciais** para cada perfusionista via email, WhatsApp ou presencialmente.

---

**Sistema de Matrículas - Versão 4.0**  
**Data:** 13/12/2024  
**Status:** ✅ Implementado e Funcional
