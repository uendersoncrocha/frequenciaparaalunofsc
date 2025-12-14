# 🚀 Guia Rápido - Sistema v9.0

**Data:** 14/12/2024  
**Versão:** 9.0  
**Novidades:** Validação, Exclusão e Estatísticas

---

## 🎉 NOVIDADES DA v9.0

### ⭐ **4 Grandes Melhorias:**

1. **📋 Sistema de Validação Ajustado**
   - Coordenador agora valida cirurgias corretamente
   - Busca da tabela `surgeries` atualizada
   - Status: `completed` → `validated` ou `rejected`

2. **🗑️ Botão EXCLUIR**
   - Coordenador pode excluir qualquer registro
   - Aluno pode excluir seus próprios registros (com regras)
   - Confirmação de segurança obrigatória

3. **📊 Estatísticas de Presença**
   - Total de dias de presença
   - Total de horas registradas
   - Média de horas por dia

4. **🔒 Validações de Segurança**
   - Aluno não pode excluir cirurgias validadas
   - Aluno não pode excluir presenças em andamento
   - Aluno não pode excluir módulos validados

---

## 👨‍💼 PARA COORDENADORES

### **1. Validar Cirurgias**

```
📍 Admin → Aba "Validações"
```

**Passo a Passo:**
1. Acesse o painel administrativo
2. Clique na aba "Validações"
3. Veja lista de cirurgias pendentes
4. Para cada cirurgia:
   - Analise os dados
   - Clique nos links para ver:
     - 📄 Ficha de CEC
     - 📎 Relatório da Cirurgia
5. Decida:
   - ✅ **[Validar]** - Aprovar cirurgia
   - ❌ **[Rejeitar]** - Rejeitar (informe motivo)
   - 🗑️ **[Excluir]** - Deletar permanentemente

**Resultado:**
- ✅ Validada: Status → `validated` (conta para título)
- ❌ Rejeitada: Status → `rejected` (não conta)
- 🗑️ Excluída: Registro removido do banco

### **2. Excluir Registros**

**Onde:**
- Lista de validações (cirurgias e módulos)

**Como:**
1. Clique no botão **[🗑️]** (cinza, à direita)
2. Confirme: "Excluir permanentemente?"
3. Registro deletado

**⚠️ ATENÇÃO:**
- Ação irreversível
- Registro não pode ser recuperado
- Use com cuidado

---

## 👨‍🎓 PARA ALUNOS

### **1. Ver Estatísticas de Presença**

```
📍 Administração → Aba "Marcar Presença"
```

**O que você vê:**
```
┌────────────────────────────────┐
│ 📈 Estatísticas de Presença    │
├──────────┬──────────┬──────────┤
│    25    │  180.5h  │   7.2h   │
│   Dias   │  Total   │  Média   │
└──────────┴──────────┴──────────┘
```

**Significado:**
- **25 Dias:** Total de presenças completas
- **180.5h:** Total de horas registradas
- **7.2h:** Média de horas por dia

**Atualização:**
- Automática ao registrar presença
- Automática ao excluir presença

### **2. Excluir Cirurgias**

```
📍 Administração → Aba "Minhas Cirurgias"
```

**Quando pode excluir:**
- ✅ Cirurgia com status `Completa` (ainda não validada)
- ✅ Cirurgia com status `Rejeitada` (pelo coordenador)
- ❌ Cirurgia com status `Validada` (NÃO pode excluir)

**Passo a Passo:**
1. Localize a cirurgia
2. Clique no botão **[🗑️ Excluir]** (vermelho, embaixo)
3. Confirme: "Excluir permanentemente?"
4. Cirurgia deletada

**⚠️ ATENÇÃO:**
- Ação irreversível
- Se excluir por engano, deve registrar novamente
- Cirurgias validadas NÃO podem ser excluídas

### **3. Excluir Presenças**

```
📍 Administração → Aba "Marcar Presença" → Histórico
```

**Quando pode excluir:**
- ✅ Presença completa (entrada E saída registradas)
- ❌ Presença em andamento (NÃO pode excluir)

**Passo a Passo:**
1. Vá para "Presenças Recentes"
2. Localize a presença completa
3. Clique **[🗑️ Excluir]** (vermelho)
4. Confirme exclusão
5. Presença deletada

**Impacto:**
- Total de dias reduz em 1
- Total de horas reduz
- Média recalculada automaticamente

### **4. Excluir Módulos/Aulas**

```
📍 Administração → Aba "Minhas Aulas"
```

**Quando pode excluir:**
- ✅ Módulo NÃO validado (status: Pendente)
- ❌ Módulo validado (NÃO pode excluir)

**Passo a Passo:**
1. Localize o módulo
2. Se mostrar **[🗑️ Excluir]**, pode excluir
3. Clique no botão
4. Confirme exclusão
5. Módulo deletado

**Badge de Status:**
- 🟠 **Pendente** → Pode excluir
- 🟢 **Validado** → NÃO pode excluir

---

## 🔄 FLUXOS TÍPICOS

### **Fluxo 1: Cirurgia do Início ao Fim**

```
ALUNO:
1. Registra cirurgia (index.html)
   ↓ Status: "completed"
   
COORDENADOR:
2. Vê na aba "Validações"
3. Analisa Ficha CEC + Relatório
4. Decide:

   OPÇÃO A: Aprovar
   └→ Clica [Validar]
      └→ Status: "validated"
         └→ Aluno: ✅ Conta para título

   OPÇÃO B: Rejeitar
   └→ Clica [Rejeitar]
      └→ Informa motivo
         └→ Status: "rejected"
            └→ Aluno: ❌ Não conta
            
   OPÇÃO C: Excluir
   └→ Clica [🗑️]
      └→ Confirma
         └→ Registro deletado

ALUNO (se rejeitada):
5. Vê na aba "Minhas Cirurgias"
6. Lê motivo da rejeição
7. Decide:
   - Excluir e registrar novamente
   - Manter no histórico
```

### **Fluxo 2: Controle de Presença Diário**

```
MANHÃ - Chegada:
1. Administração → Marcar Presença
2. Preencher data/local
3. [Registrar Entrada]
   ✅ Entrada: 08:00

DURANTE O DIA:
4. Registrar cirurgias (se houver)

TARDE - Saída:
5. Administração → Marcar Presença
6. [Registrar Saída]
   ✅ Saída: 17:00
   ✅ Duração: 9h 0min

ESTATÍSTICAS:
7. Ver card atualizado:
   - Dias: +1
   - Horas: +9h
   - Média: recalculada
```

### **Fluxo 3: Correção de Erro**

```
ALUNO registra presença errada:

1. Administração → Marcar Presença
2. Presenças Recentes
3. Localiza presença errada
4. [Excluir] → Confirma
   ✅ Presença removida

5. Registra novamente corretamente
   ✅ Nova presença criada
```

---

## ⚠️ REGRAS IMPORTANTES

### **O QUE PODE SER EXCLUÍDO:**

#### **Coordenador:**
- ✅ Qualquer cirurgia
- ✅ Qualquer módulo
- ✅ Qualquer presença
- ⚠️ Sempre com confirmação

#### **Aluno - Cirurgias:**
- ✅ Status: `completed` (não validada ainda)
- ✅ Status: `rejected` (rejeitada)
- ❌ Status: `validated` (validada)

#### **Aluno - Presenças:**
- ✅ Presença completa (check-out registrado)
- ❌ Presença em andamento (sem check-out)

#### **Aluno - Módulos:**
- ✅ Módulo NÃO validado
- ❌ Módulo validado

---

## 💡 DICAS E BOAS PRÁTICAS

### **Para Coordenadores:**

1. **Ao Validar:**
   - ✅ Sempre verifique os anexos
   - ✅ Confirme dados de tempos (CEC, pinça, total)
   - ✅ Valide apenas se tudo estiver correto

2. **Ao Rejeitar:**
   - ✅ SEMPRE informe motivo claro
   - ✅ Seja específico (ex: "Tempo de CEC inconsistente")
   - ✅ Ajude o aluno a corrigir

3. **Ao Excluir:**
   - ⚠️ Use apenas se necessário
   - ⚠️ Confirme que é o registro correto
   - ⚠️ Lembre: não há volta!

### **Para Alunos:**

1. **Antes de Excluir:**
   - ⚠️ Tenha certeza que quer excluir
   - ⚠️ Verifique se é o registro correto
   - ⚠️ Lembre: não há recuperação!

2. **Cirurgias Rejeitadas:**
   - 📖 Leia o motivo da rejeição
   - 📝 Corrija o problema
   - 🔄 Registre novamente corretamente
   - 🗑️ Pode excluir a rejeitada

3. **Estatísticas de Presença:**
   - 📊 Acompanhe regularmente
   - ✅ Mantenha frequência consistente
   - 📈 Use para planejar suas horas

---

## 🆘 SOLUÇÕES DE PROBLEMAS

### **"Não consigo excluir cirurgia"**

**Possíveis Causas:**
1. ✅ Cirurgia já foi validada
   - Solução: Apenas coordenador pode excluir
   
2. ✅ Não há botão de excluir
   - Solução: Status deve ser `completed` ou `rejected`

### **"Estatísticas não aparecem"**

**Soluções:**
1. ✅ Registre pelo menos 1 presença completa
2. ✅ Atualize a página (F5)
3. ✅ Verifique se há presenças com check-out

### **"Excluí por engano, como recupero?"**

**Resposta:**
- ❌ Não é possível recuperar
- ✅ Deve registrar novamente
- 💡 Próxima vez: confirme antes de excluir

### **"Botão de validar não aparece"**

**Coordenador:**
1. ✅ Verifique se está na aba "Validações"
2. ✅ Confirme que há registros pendentes
3. ✅ Atualize a página (F5)

---

## 📊 EXEMPLOS PRÁTICOS

### **Exemplo 1: Estatísticas de Presença**

**Cenário:** João tem 20 dias de presença

```
Presenças de João:
- Dia 1: 08:00-17:00 (9h)
- Dia 2: 08:00-16:00 (8h)
- Dia 3: 09:00-18:00 (9h)
- ... (17 dias mais)
- Total: 20 dias, 165 horas

Card exibido:
┌──────────┬──────────┬──────────┐
│    20    │   165h   │  8.25h   │
│   Dias   │  Total   │  Média   │
└──────────┴──────────┴──────────┘

Interpretação:
- João esteve presente 20 dias
- Trabalhou 165 horas no total
- Média de 8.25 horas por dia
```

### **Exemplo 2: Exclusão Inteligente**

**Cenário:** Maria registrou 2 cirurgias no mesmo dia (erro)

```
Cirurgia 1: 08:00-12:00 (correta)
Cirurgia 2: 14:00-18:00 (errada)

Solução:
1. Administração → Minhas Cirurgias
2. Localiza "Cirurgia 2"
3. Status: "Completa" ✅ (pode excluir)
4. [Excluir] → Confirma
5. Apenas Cirurgia 1 permanece

Resultado:
✅ Erro corrigido
✅ Histórico limpo
```

---

## 🎯 RESUMO RÁPIDO

### **Coordenadores:**
- ✅ Validar: Aprova cirurgia
- ❌ Rejeitar: Rejeita com motivo
- 🗑️ Excluir: Remove permanentemente

### **Alunos:**
- 📊 Estatísticas: Total dias, horas, média
- 🗑️ Excluir: Apenas se não validado
- ⚠️ Cuidado: Exclusões são permanentes

### **Novidades v9.0:**
1. Sistema de validação corrigido
2. Botões de exclusão funcionais
3. Estatísticas de presença
4. Validações de segurança

---

## 📚 DOCUMENTAÇÃO COMPLETA

**Arquivos Disponíveis:**
- `AJUSTE-VALIDACAO-EXCLUSAO-V9.0.md` (14KB - técnico)
- `GUIA-RAPIDO-V9.0.md` (este arquivo - prático)
- `README.md` (documentação geral)

---

**Sistema de Controle de Cirurgias v9.0**  
**Data:** 14/12/2024  
**Status:** ✅ 100% FUNCIONAL

🎉 **Sistema completo com validação, exclusão e estatísticas!** 🎉

---

**Para dúvidas:** Consulte F12 (console) ou documentação técnica.
