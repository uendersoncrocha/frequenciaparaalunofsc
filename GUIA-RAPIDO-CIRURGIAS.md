# 🚀 Guia Rápido - Sistema de Cirurgias

## 📖 Para Perfusionistas

### ✅ Registrar uma Cirurgia:

1. **Abra**: `index.html`
2. **Selecione sua turma**: 2024.1, 2024.2, 2025.1 ou 2025.2
3. **Selecione seu nome**: Lista filtrada pela turma
4. **Preencha os dados**:
   - 👨‍⚕️ **Perfusionista Principal** (obrigatório - digite o nome)
   - 👤 **Perfusionista Auxiliar** (automático - seu nome já aparece)
   - ✏️ **Nome do Cirurgião** (obrigatório)
   - 🏥 **Tipo de Cirurgia** (obrigatório)
   - ⏱️ Tempo de CEC (opcional - pode preencher depois)
   - 📌 Tempo de Pinça (opcional - pode preencher depois)
5. **Clique**: "**Iniciar Cirurgia**" (horário registrado automaticamente)
6. **Durante**: Atualize CEC e Pinça conforme necessário
7. **Ao término**: 
   - Confirme/atualize Tempo de CEC
   - Confirme/atualize Tempo de Pinça
   - Adicione observações
   - Clique em "**Finalizar Cirurgia**"

## 📊 Para Administradores

### ✅ Visualizar Dados:

1. **Abra**: `admin.html`
2. **Veja estatísticas**: Topo da página
   - Total de perfusionistas
   - Cirurgias do dia
   - Total de registros
   - Média mensal

3. **Use os filtros**:
   - 🎓 Por Turma
   - 👤 Por Perfusionista
   - 📅 Por Período

4. **Exporte dados**: Botão "Exportar CSV"

5. **Analise métricas**:
   - 🔵 Tempo de CEC (badge azul)
   - 🟠 Tempo de Pinça (badge laranja)
   - ⏱️ Duração total

## 🏥 Tipos de Cirurgias Disponíveis

- ❤️ Revascularização do Miocárdio
- 🔄 Troca Valvar Aórtica
- 🔄 Troca Valvar Mitral
- 🩺 Correção de CIA
- 🩺 Correção de CIV
- 💓 Transplante Cardíaco
- ➕ Outra

## 📋 Dados Registrados

### Automáticos:
- ✅ Data
- ✅ Horário de início
- ✅ Horário de término
- ✅ Duração total (calculada)
- ✅ Turma
- ✅ Usuário que registrou

### Manuais:
- ✍️ **Perfusionista Principal** (texto livre - digite o nome)
- ✍️ Nome do Cirurgião
- ✍️ Tipo de Cirurgia
- ✍️ Tempo de CEC (minutos)
- ✍️ Tempo de Pinça (minutos)
- ✍️ Observações

### Automático (Perfusionista Auxiliar):
- ✅ Seu nome (aluno logado) - campo bloqueado

## 💡 Dicas Importantes

### ⚠️ Regras:
- Uma cirurgia por usuário logado por dia
- **Perfusionista Principal** é obrigatório (digite o nome)
- **Perfusionista Auxiliar** é automático (seu nome)
- Nome do Cirurgião é obrigatório
- Tipo de Cirurgia é obrigatório
- Após finalizar, dados ficam bloqueados

### 💪 Boas Práticas:
- Registre o início imediatamente
- Atualize CEC/Pinça durante o procedimento
- Adicione observações relevantes
- Finalize assim que terminar

### 🎯 Para Análise:
- Use filtros para buscar procedimentos específicos
- Exporte dados regularmente para backup
- Analise tempos de CEC para controle de qualidade
- Compare durações por tipo de cirurgia

## 📱 Compatibilidade

✅ Desktop  
✅ Tablet  
✅ Smartphone

## 🔗 Páginas do Sistema

| Página | Acesso | Função |
|--------|--------|--------|
| **index.html** | Perfusionistas | Registrar cirurgias |
| **admin.html** | Administradores | Visualizar e gerenciar |

## 🎓 Perfusionistas por Turma

| Turma | Quantidade |
|-------|------------|
| 2024.1 | 7 perfusionistas |
| 2024.2 | 4 perfusionistas |
| 2025.1 | 5 perfusionistas |
| 2025.2 | 9 perfusionistas |
| **Total** | **25 perfusionistas** |

## 📊 Exportação de Dados

O arquivo CSV contém:
- Data da cirurgia
- Turma do perfusionista
- Nome do perfusionista
- Nome do cirurgião
- Tipo de cirurgia
- Horário de início
- Horário de término
- Duração total
- ⏱️ **Tempo de CEC** (minutos)
- ⏱️ **Tempo de Pinça** (minutos)
- Observações

## ❓ Perguntas Frequentes

**P: Posso registrar mais de uma cirurgia por dia?**  
R: Não, o sistema permite apenas um registro por perfusionista por dia.

**P: Posso editar uma cirurgia após finalizar?**  
R: Não, para preservar a integridade dos dados históricos, cirurgias finalizadas ficam bloqueadas.

**P: O que fazer se esqueci de registrar o tempo de CEC?**  
R: Os tempos de CEC e Pinça podem ser atualizados antes de finalizar a cirurgia.

**P: Como adiciono um novo perfusionista?**  
R: No painel admin, clique em "Adicionar Novo Perfusionista", preencha os dados e selecione a turma.

**P: Posso ver histórico de um perfusionista específico?**  
R: Sim, use o filtro por perfusionista no painel admin.

---

## 🚀 Início Rápido

**Para começar agora:**

1. ✅ Abra `index.html`
2. ✅ Selecione sua turma
3. ✅ Selecione seu nome
4. ✅ Registre sua primeira cirurgia!

---

**Sistema pronto para uso!** 🏥❤️

Para documentação completa, consulte `README-CIRURGIAS.md`
