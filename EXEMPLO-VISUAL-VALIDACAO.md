# 🎨 Exemplos Visuais: Sistema de Validação com Coordenador

## 📋 Como os Alunos Veem as Validações

---

## 📱 Interface do Aluno

### **1. Card de Cirurgia VALIDADA ✅**

```
╔════════════════════════════════════════════════════════╗
║  🫀 Cirurgia                      [✓ Validado] [⭐ Responsável] ║
║  ────────────────────────────────────────────────────  ║
║                                                        ║
║  📅 Data: 10/12/2024        🏥 Tipo: Revascularização ║
║  👨‍⚕️ Cirurgião: Dr. Silva      ⏱️ Duração: 3.5h         ║
║                                                        ║
║  ✓ Validado por: Uenderson                            ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

**Cores:**
- Badge "Validado": Verde (`bg-green-100 text-green-800`)
- Texto "Validado por": Verde escuro (`text-green-700`)
- Border esquerdo: Azul (`border-blue-500`)

---

### **2. Card de Cirurgia REJEITADA ❌**

```
╔════════════════════════════════════════════════════════╗
║  🫀 Cirurgia                                [✗ Rejeitado] ║
║  ────────────────────────────────────────────────────  ║
║                                                        ║
║  📅 Data: 08/12/2024        🏥 Tipo: Valvular         ║
║  👨‍⚕️ Cirurgião: Dr. Santos     ⏱️ Duração: 2.0h         ║
║                                                        ║
║  ❌ Rejeitado por: Daize Santa Rosa                    ║
║  📝 Motivo: Falta anexo da ficha CEC completa         ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

**Cores:**
- Badge "Rejeitado": Vermelho (`bg-red-100 text-red-800`)
- Texto "Rejeitado por": Vermelho escuro (`text-red-600`)
- Texto do motivo: Vermelho escuro (`text-red-600`)
- Border esquerdo: Azul (`border-blue-500`)

---

### **3. Card de Cirurgia PENDENTE ⏳**

```
╔════════════════════════════════════════════════════════╗
║  🫀 Cirurgia                                 [⏱ Pendente] ║
║  ────────────────────────────────────────────────────  ║
║                                                        ║
║  📅 Data: 12/12/2024        🏥 Tipo: Coronária        ║
║  👨‍⚕️ Cirurgião: Dr. Alves      ⏱️ Duração: 4.0h         ║
║                                                        ║
║  ⏳ Aguardando validação do coordenador               ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

**Cores:**
- Badge "Pendente": Amarelo (`bg-yellow-100 text-yellow-800`)
- Border esquerdo: Azul (`border-blue-500`)
- Sem informação de validador (ainda não validado)

---

## 📚 Cards de Módulos

### **4. Módulo Teórico VALIDADO ✅**

```
╔════════════════════════════════════════════════════════╗
║  📖 Módulo Teórico                          [✓ Validado] ║
║  ────────────────────────────────────────────────────  ║
║                                                        ║
║  📅 Data: 05/12/2024        ⏱️ Duração: 2h            ║
║  📚 Módulo: Anatomia Cardiovascular                   ║
║  👨‍🏫 Instrutor: Prof. Carvalho                         ║
║                                                        ║
║  ✓ Validado por: Daize Santa Rosa                     ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

**Cores:**
- Badge "Validado": Verde (`bg-green-100 text-green-800`)
- Ícone: Roxo (`text-purple-600`)
- Border esquerdo: Roxo (`border-purple-500`)
- Texto "Validado por": Verde escuro (`text-green-700`)

---

### **5. Módulo Prático REJEITADO ❌**

```
╔════════════════════════════════════════════════════════╗
║  🔬 Módulo Prático                          [✗ Rejeitado] ║
║  ────────────────────────────────────────────────────  ║
║                                                        ║
║  📅 Data: 03/12/2024        ⏱️ Duração: 4h            ║
║  🔬 Módulo: Laboratório de Simulação CEC              ║
║  👨‍🏫 Instrutor: Prof. Martins                          ║
║                                                        ║
║  ❌ Rejeitado por: Uenderson                           ║
║  📝 Motivo: Carga horária insuficiente documentada    ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

**Cores:**
- Badge "Rejeitado": Vermelho (`bg-red-100 text-red-800`)
- Ícone: Verde (`text-green-600`)
- Border esquerdo: Verde (`border-green-500`)
- Texto "Rejeitado por": Vermelho escuro (`text-red-600`)
- Texto do motivo: Vermelho escuro (`text-red-600`)

---

### **6. Módulo Prático PENDENTE ⏳**

```
╔════════════════════════════════════════════════════════╗
║  🔬 Módulo Prático                           [⏱ Pendente] ║
║  ────────────────────────────────────────────────────  ║
║                                                        ║
║  📅 Data: 11/12/2024        ⏱️ Duração: 3h            ║
║  🔬 Módulo: Prática em Bomba de Circulação           ║
║  👨‍🏫 Instrutor: Prof. Lima                             ║
║                                                        ║
║  ⏳ Aguardando validação do coordenador               ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

**Cores:**
- Badge "Pendente": Amarelo (`bg-yellow-100 text-yellow-800`)
- Ícone: Verde (`text-green-600`)
- Border esquerdo: Verde (`border-green-500`)
- Sem informação de validador (ainda não validado)

---

## 🎨 Paleta de Cores do Sistema

### **Status de Validação**

| Status | Badge | Texto Informativo | Border |
|--------|-------|-------------------|--------|
| ✅ Validado | `bg-green-100 text-green-800` | `text-green-700` | - |
| ❌ Rejeitado | `bg-red-100 text-red-800` | `text-red-600` | - |
| ⏳ Pendente | `bg-yellow-100 text-yellow-800` | - | - |

### **Tipos de Registro**

| Tipo | Ícone Color | Border |
|------|------------|--------|
| 🫀 Cirurgia | `text-blue-600` | `border-blue-500` |
| 📖 Módulo Teórico | `text-purple-600` | `border-purple-500` |
| 🔬 Módulo Prático | `text-green-600` | `border-green-500` |

---

## 📱 Responsividade

### **Mobile (< 768px)**

Cards ocupam largura total:
```
╔══════════════════════════════╗
║  🫀 Cirurgia      [✓ Validado] ║
║  ──────────────────────────  ║
║  📅 Data: 10/12/2024         ║
║  🏥 Tipo: Revascularização   ║
║  👨‍⚕️ Dr. Silva                ║
║  ⏱️ 3.5h                      ║
║                              ║
║  ✓ Validado por: Uenderson  ║
╚══════════════════════════════╝
```

### **Desktop (≥ 768px)**

Cards com grid 2 colunas de informações:
```
╔════════════════════════════════════════════╗
║  🫀 Cirurgia              [✓ Validado] [⭐] ║
║  ──────────────────────────────────────── ║
║  📅 10/12/2024    🏥 Revascularização    ║
║  👨‍⚕️ Dr. Silva      ⏱️ 3.5h                ║
║                                            ║
║  ✓ Validado por: Uenderson                ║
╚════════════════════════════════════════════╝
```

---

## 🎯 Hierarquia Visual

### **Ordem de Importância**
1. **Status** (Badge maior, destaque)
2. **Tipo de registro** (Ícone e título)
3. **Informações principais** (Data, tipo, duração)
4. **Validação** (Quem validou/rejeitou)
5. **Observações** (Motivo da rejeição, se houver)

---

## 💡 UX: Estados Visuais

### **Hover (Desktop)**
- Card eleva-se levemente
- Sombra aumenta
- Transição suave (0.3s)

### **Touch (Mobile)**
- Feedback visual imediato
- Sem hover (touchscreen)
- Scroll suave

---

## 🔍 Exemplo Real de Histórico

### **Página do Aluno: Últimos Registros**

```
════════════════════ MEUS REGISTROS ═══════════════════

[✓ Validado]  🫀 Cirurgia - 10/12/2024 - 3.5h
              Revascularização - Dr. Silva
              ✓ Validado por: Uenderson

[✗ Rejeitado] 🫀 Cirurgia - 08/12/2024 - 2.0h
              Valvular - Dr. Santos
              ❌ Rejeitado por: Daize Santa Rosa
              📝 Motivo: Falta anexo da ficha CEC

[✓ Validado]  📖 Módulo Teórico - 05/12/2024 - 2h
              Anatomia Cardiovascular - Prof. Carvalho
              ✓ Validado por: Daize Santa Rosa

[⏱ Pendente]  🔬 Módulo Prático - 11/12/2024 - 3h
              Prática em Bomba - Prof. Lima
              ⏳ Aguardando validação

[⏱ Pendente]  🫀 Cirurgia - 12/12/2024 - 4.0h
              Coronária - Dr. Alves
              ⏳ Aguardando validação

════════════════════════════════════════════════════════
```

---

## 🎓 Benefícios da Interface

### **Clareza**
- ✅ Status visível imediatamente
- ✅ Coordenador identificado claramente
- ✅ Motivo de rejeição destacado

### **Transparência**
- ✅ Não há dúvidas sobre quem validou
- ✅ Aluno sabe exatamente com quem falar
- ✅ Sistema auditável visualmente

### **Usabilidade**
- ✅ Cores intuitivas (verde=OK, vermelho=erro)
- ✅ Ícones universais
- ✅ Layout limpo e organizado

---

## 📞 Contato com Coordenadores

Quando o aluno vê:
- **"✓ Validado por: Uenderson"** → Sabe que pode esclarecer dúvidas com Uenderson
- **"❌ Rejeitado por: Daize Santa Rosa"** → Sabe que deve contatar Daize para corrigir

---

**Documento visual criado em:** 13/12/2024  
**Versão:** 1.0  
**Objetivo:** Demonstrar interface de validação com coordenador identificado
