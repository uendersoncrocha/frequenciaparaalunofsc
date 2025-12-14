# 📖 Guia Rápido: Administração do Aluno

**Versão:** 8.9  
**Data:** 14/12/2024  
**Para:** Perfusionistas (Alunos)

---

## 🎯 O QUE É?

A página **"Administração"** é o painel pessoal do aluno onde ele pode:
- 📍 Marcar presença no estágio
- 📋 Ver todas as suas cirurgias registradas
- 📚 Ver todas as suas aulas/módulos

---

## 🚀 COMO ACESSAR?

### **Opção 1: Botão na Página Inicial**
1. Faça login no sistema
2. Na página inicial (`index.html`)
3. Clique no botão **"Administração"** (ícone: ⚙️)

### **Opção 2: Link Direto**
- Acesse: `student-admin.html`

---

## 📍 ABA 1: MARCAR PRESENÇA

### **Para Registrar Entrada:**

1. **Selecione a Data** (padrão = hoje)
2. **Escolha o Local:**
   - Centro Cirúrgico
   - Sala de Aula
   - Laboratório
   - Hospital
   - Outro
3. **Adicione Observações** (opcional)
4. Clique **"Registrar Entrada"**

✅ **Resultado:** Entrada registrada com horário automático!

### **Para Registrar Saída:**

1. Após registrar entrada, o botão **"Registrar Saída"** é habilitado
2. Clique **"Registrar Saída"** ao final do dia
3. Sistema calcula automaticamente a duração

✅ **Resultado:** Presença completa com entrada, saída e duração!

### **Status Visual:**

| Cor | Status | Descrição |
|-----|--------|-----------|
| 🟡 Amarelo | Sem presença | Precisa registrar entrada |
| 🟢 Verde | Entrada registrada | Aguardando saída |
| 🔵 Azul | Presença completa | Entrada e saída registradas |

### **Histórico de Presenças:**
- Mostra as **10 últimas presenças**
- Exibe: Data, Local, Entrada, Saída, Duração
- Ordenado por data (mais recentes primeiro)

---

## 📋 ABA 2: MINHAS CIRURGIAS

### **O que Você Vê:**
- Todas as cirurgias que você registrou
- Status de cada cirurgia
- Se você foi responsável ou auxiliar
- Todos os detalhes (cirurgião, tempos, etc.)

### **Filtros Disponíveis:**

#### **1. Por Status:**
- **Todos** - Mostra todas
- **Completas** - Cirurgias finalizadas
- **Validadas** - Aprovadas pelo coordenador
- **Rejeitadas** - Rejeitadas pelo coordenador

#### **2. Por Responsabilidade:**
- **Todos** - Mostra todas
- **Fui Responsável** - Só cirurgias como responsável (🏆)
- **Fui Auxiliar** - Só cirurgias como auxiliar

#### **3. Busca:**
- Campo de texto para buscar por tipo de cirurgia
- Ex: "Revascularização", "Troca Valvar", etc.

### **Informações Exibidas:**

Para cada cirurgia:
- 📅 **Data**
- 🏥 **Tipo de Cirurgia**
- 👨‍⚕️ **Cirurgião**
- 👨‍🔬 **Perfusionista Principal**
- ⏱️ **Tempo de CEC** (minutos)
- 📌 **Tempo de Pinça** (minutos)
- ⌛ **Tempo Total** (minutos e horas)
- 🕐 **Horário** (início - fim)
- 🏆 **Responsabilidade** (Responsável ou Auxiliar)
- 📝 **Observações**
- 📎 **Anexos:**
  - Ver Ficha de CEC
  - Ver Relatório da Cirurgia

### **Badges de Status:**

| Badge | Cor | Significado |
|-------|-----|-------------|
| Completa | 🔵 Azul | Cirurgia finalizada |
| Validada | 🟢 Verde | Aprovada pelo coordenador |
| Rejeitada | 🔴 Vermelha | Rejeitada pelo coordenador |

### **Ver Anexos:**
- Clique em **"Ver Ficha CEC"** para abrir o arquivo
- Clique em **"Ver Relatório"** para abrir o documento
- Arquivos abrem em nova aba

---

## 📚 ABA 3: MINHAS AULAS

### **O que Você Vê:**
- Todos os módulos/aulas que você registrou
- Tipo de cada módulo
- Duração em horas
- Instrutor

### **Informações Exibidas:**

Para cada aula:
- 📅 **Data**
- 📚 **Nome/Descrição do Módulo**
- 👨‍🏫 **Instrutor/Professor**
- ⏱️ **Duração** (horas)
- 📝 **Observações**
- 🎓 **Tipo:**
  - **Teórico** (🎓 azul) - Não conta para 800h
  - **Prático** (⚗️ verde) - Abate das 800h

---

## 🔄 NAVEGAÇÃO

### **Botões Disponíveis:**

| Botão | Ação |
|-------|------|
| **⬅️ Voltar** | Volta para a página anterior |
| **➕ Registrar Cirurgia** | Vai para página de registro |
| **👤 Meu Perfil** | Vai para seu perfil |
| **🚪 Sair** | Faz logout (com confirmação) |

---

## 💡 DICAS ÚTEIS

### **Para Presença:**
✅ Registre entrada ao chegar no estágio  
✅ Não esqueça de registrar saída ao sair  
✅ Adicione observações relevantes  
✅ Verifique o histórico regularmente

### **Para Cirurgias:**
✅ Use filtros para encontrar cirurgias específicas  
✅ Verifique status de validação  
✅ Confira se anexos foram enviados  
✅ Leia notas de validação (se houver)

### **Para Aulas:**
✅ Acompanhe módulos práticos (contam para 800h)  
✅ Verifique duração total  
✅ Mantenha registro organizado

---

## ⚠️ OBSERVAÇÕES IMPORTANTES

### **Presença:**
- ⚠️ Só é possível registrar **1 entrada por dia**
- ⚠️ Deve registrar entrada antes da saída
- ⚠️ Data é obrigatória
- ℹ️ Duração é calculada automaticamente

### **Cirurgias:**
- ℹ️ Cirurgias "Rejeitadas" não contam para título
- ℹ️ Apenas "Validadas" são aprovadas
- ℹ️ Cirurgias como "Responsável" contam para título
- ℹ️ Cirurgias como "Auxiliar" contam apenas experiência

### **Aulas:**
- ℹ️ Aulas práticas reduzem meta de 800h
- ℹ️ Aulas teóricas não contam para horas
- ℹ️ Validação pelo coordenador é necessária

---

## 🆘 PROBLEMAS COMUNS

### **"Não consigo registrar entrada"**
✅ Verifique se selecionou a data  
✅ Confirme que não há entrada hoje já  
✅ Atualize a página e tente novamente

### **"Não vejo minhas cirurgias"**
✅ Verifique se está logado com usuário correto  
✅ Remova filtros aplicados  
✅ Verifique se registrou cirurgias

### **"Não consigo ver anexos"**
✅ Verifique se anexo foi enviado  
✅ Permita pop-ups no navegador  
✅ Tente em outro navegador

---

## 📊 ESTATÍSTICAS

Suas estatísticas completas estão na **página inicial** após login:
- 🎯 **Total de Cirurgias**
- 🏆 **Cirurgias como Responsável**
- ⏱️ **Total de Horas**
- 📊 **Progresso para 800h**

---

## 🔗 LINKS ÚTEIS

- **Registrar Nova Cirurgia:** `index.html`
- **Meu Perfil:** `student-profile.html`
- **Administração:** `student-admin.html` (esta página)
- **Logout:** Botão "Sair" (Alt+L)

---

## ⌨️ ATALHOS DE TECLADO

| Atalho | Ação |
|--------|------|
| **Alt + B** | Voltar |
| **Alt + L** | Logout |
| **Alt + P** | Ir para Perfil |
| **Alt + R** | Registrar Cirurgia |

---

## 🎯 FLUXO COMPLETO

### **Dia Típico de Estágio:**

1. **Chegada no Estágio**
   ```
   Login → Administração → Marcar Presença
   → Selecionar data/local → Registrar Entrada
   ```

2. **Durante o Estágio**
   ```
   Se houver cirurgia:
   Registrar Cirurgia → Preencher dados
   → Anexar Ficha CEC + Relatório → Salvar
   ```

3. **Saída do Estágio**
   ```
   Administração → Marcar Presença
   → Registrar Saída
   ```

4. **Verificar Registros**
   ```
   Administração → Minhas Cirurgias
   → Verificar status de validação
   ```

---

## ✅ CHECKLIST DIÁRIO

### **Ao Chegar:**
- [ ] Fazer login
- [ ] Registrar entrada na presença
- [ ] Verificar notificações

### **Durante o Dia:**
- [ ] Registrar cirurgias realizadas
- [ ] Anexar Ficha de CEC
- [ ] Anexar Relatório
- [ ] Adicionar observações relevantes

### **Ao Sair:**
- [ ] Registrar saída na presença
- [ ] Verificar cirurgias pendentes
- [ ] Conferir status de validações

---

## 📞 SUPORTE

**Em caso de dúvidas:**
1. Consulte o `README.md` principal
2. Leia `COMECE-AQUI.md`
3. Veja documentação específica:
   - `AJUSTE-ADMINISTRACAO-PRESENCA-V8.9.md`
   - `AJUSTE-BOTAO-FICHA-CEC-V8.8.md`
   - `AJUSTE-DATAS-V8.7.md`

**Console do navegador (F12):**
- Veja mensagens de log
- Identifique erros
- Copie mensagens para reportar

---

## 🎉 APROVEITE!

Sua página de administração está completa e funcional!

✨ **Use para:**
- ✅ Controlar sua presença
- ✅ Acompanhar suas cirurgias
- ✅ Visualizar suas aulas
- ✅ Monitorar seu progresso

**Bons estudos e ótimos procedimentos! 🏥💙**

---

**Versão:** 8.9  
**Data:** 14/12/2024  
**Página:** `student-admin.html`  
**Sistema:** Controle de Cirurgias Cardiovasculares
