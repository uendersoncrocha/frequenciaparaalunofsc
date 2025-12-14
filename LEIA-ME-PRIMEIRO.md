# 🏥 Sistema de Controle de Cirurgias Cardiovasculares

## 🎯 O Que É Este Sistema?

Sistema web completo para **registro e controle de cirurgias cardíacas**, com foco em **perfusão** e métricas essenciais como **Tempo de CEC** (Circulação Extracorpórea) e **Tempo de Pinça**.

---

## 📱 Páginas Principais

| Arquivo | Para Quem | Função |
|---------|-----------|--------|
| **index.html** | Perfusionistas | Registrar cirurgias |
| **admin.html** | Administradores | Visualizar e gerenciar dados |

---

## ⚡ Início Rápido

### Para Perfusionistas:
1. Abra `index.html`
2. Selecione sua turma
3. Selecione seu nome
4. Preencha: Cirurgião + Tipo de Cirurgia
5. Clique "Iniciar Cirurgia"
6. Ao terminar: Atualize CEC/Pinça e clique "Finalizar"

### Para Administradores:
1. Abra `admin.html`
2. Veja estatísticas e gráficos
3. Use filtros para buscar
4. Exporte dados em CSV

---

## 📚 Documentação Disponível

| Arquivo | Conteúdo |
|---------|----------|
| 🚀 **GUIA-RAPIDO-CIRURGIAS.md** | **COMECE POR AQUI!** Guia rápido de uso |
| 📘 **README-CIRURGIAS.md** | Documentação completa e detalhada |
| 🔄 **ALTERACOES-SISTEMA-CIRURGICO.md** | Todas as mudanças implementadas |
| 📋 **ESTRUTURA.md** | Visão geral da arquitetura |
| 📝 **README.md** | Documentação do sistema de presença original |
| 🏫 **MUDANCAS-TURMAS.md** | Histórico de organização por turmas |

---

## ✨ Principais Funcionalidades

### ✅ Registro de Cirurgias
- Nome do Cirurgião
- Tipo de Cirurgia (7 opções pré-definidas)
- **Tempo de CEC** (minutos)
- **Tempo de Pinça** (minutos)
- Horários de início/término automáticos
- Duração calculada automaticamente
- Observações

### ✅ Painel Administrativo
- Estatísticas em tempo real
- Gráficos de tendência
- Tabela detalhada com 11 colunas
- Filtros por turma, perfusionista e período
- Exportação completa em CSV
- Gerenciamento de perfusionistas

### ✅ Métricas Destacadas
- 🔵 **Tempo de CEC** (badge azul)
- 🟠 **Tempo de Pinça** (badge laranja)
- ⏱️ **Duração Total** (calculada)

---

## 👥 Dados Cadastrados

### 25 Perfusionistas em 4 Turmas:

- **2024.1**: 7 perfusionistas
- **2024.2**: 4 perfusionistas
- **2025.1**: 5 perfusionistas
- **2025.2**: 9 perfusionistas

---

## 🏥 Tipos de Cirurgias

1. Revascularização do Miocárdio
2. Troca Valvar Aórtica
3. Troca Valvar Mitral
4. Correção de CIA
5. Correção de CIV
6. Transplante Cardíaco
7. Outra

---

## 🛠️ Tecnologias

- HTML5
- Tailwind CSS (via CDN)
- JavaScript ES6+
- Chart.js (gráficos)
- Font Awesome (ícones)
- RESTful API (persistência)

---

## 📊 Dados Importantes

### Campos Obrigatórios ao Iniciar:
- ⚠️ Nome do Cirurgião
- ⚠️ Tipo de Cirurgia

### Campos Opcionais (podem atualizar depois):
- ℹ️ Tempo de CEC
- ℹ️ Tempo de Pinça
- ℹ️ Observações

---

## ✅ Status do Sistema

- ✅ Interface funcional
- ✅ Validações implementadas
- ✅ Cálculos automáticos
- ✅ Exportação CSV completa
- ✅ 25 perfusionistas cadastrados
- ✅ 4 turmas organizadas
- ✅ Gráficos e estatísticas
- ✅ Design responsivo
- ✅ Documentação completa

---

## 🎓 Aplicação

Ideal para:
- Hospitais-escola
- Cursos de perfusão
- Treinamento cirúrgico
- Controle de qualidade
- Análise de métricas

---

## 🚀 Para Começar

1. **Leia**: `GUIA-RAPIDO-CIRURGIAS.md`
2. **Abra**: `index.html` (perfusionistas) ou `admin.html` (administração)
3. **Registre**: Sua primeira cirurgia!

---

## 📞 Estrutura de Arquivos

```
📦 Sistema de Cirurgias
├── 📄 index.html                           # Página de registro
├── 📄 admin.html                           # Painel administrativo
├── 📁 js/
│   ├── 📜 main.js                          # Lógica de registro
│   └── 📜 admin.js                         # Lógica administrativa
├── 📚 LEIA-ME-PRIMEIRO.md                  # Este arquivo
├── 🚀 GUIA-RAPIDO-CIRURGIAS.md            # Guia rápido
├── 📘 README-CIRURGIAS.md                  # Documentação completa
├── 🔄 ALTERACOES-SISTEMA-CIRURGICO.md     # Changelog
└── 📋 ESTRUTURA.md                         # Arquitetura
```

---

## 💡 Dica

**Primeira vez?** → Leia `GUIA-RAPIDO-CIRURGIAS.md`  
**Quer detalhes?** → Leia `README-CIRURGIAS.md`  
**Quer saber o que mudou?** → Leia `ALTERACOES-SISTEMA-CIRURGICO.md`

---

## 🎯 Fluxo de Trabalho

```
1. Perfusionista seleciona turma e nome
         ↓
2. Preenche dados da cirurgia
         ↓
3. Clica "Iniciar Cirurgia" (horário registrado)
         ↓
4. Durante: Atualiza CEC/Pinça conforme necessário
         ↓
5. Ao terminar: Confirma dados e clica "Finalizar"
         ↓
6. Sistema calcula duração automaticamente
         ↓
7. Dados aparecem no painel admin
         ↓
8. Administrador pode filtrar, visualizar e exportar
```

---

## 🔒 Segurança dos Dados

- ✅ Validação de campos obrigatórios
- ✅ Bloqueio após finalização (preserva histórico)
- ✅ Campos desabilitados para dados críticos durante cirurgia
- ✅ Registro de data/hora automático (sem manipulação)

---

## 📈 Benefícios

1. **Registro Completo**: Todos os dados em um lugar
2. **Automação**: Horários e cálculos automáticos
3. **Análise**: Métricas visuais e exportáveis
4. **Qualidade**: Controle de tempos de CEC e Pinça
5. **Histórico**: Preservação de todos os procedimentos

---

**Sistema pronto para uso em ambiente cirúrgico!** 🏥❤️

Para publicar online, vá até a aba **Publish** ➔ Click em **Publicar**
