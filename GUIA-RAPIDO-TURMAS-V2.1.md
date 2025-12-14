# 🚀 GUIA RÁPIDO - GERENCIAR TURMAS v2.1

## ⚡ Acesso Rápido

**URL**: `admin-classes.html`  
**Requisito**: Login como Coordenador  
**Versão**: 2.1 (14/12/2024)

---

## 🎯 FUNCIONALIDADES PRINCIPAIS

### 1️⃣ **CRIAR TURMA**

**Passo a passo**:
1. Clique no botão **[Nova Turma]** (canto superior direito)
2. Preencha os campos obrigatórios (*):
   - Nome da Turma
   - Código
   - Ano
   - Semestre (1º ou 2º)
   - Período (Matutino/Vespertino/Noturno/Integral)
3. Campos opcionais:
   - Curso
   - Data de Início
   - Data de Término
   - Descrição
   - Turma Ativa (checked por padrão)
4. Clique em **[Salvar Turma]**

**Exemplo**:
```
Nome: Turma A - Perfusão 2024
Código: 2024-A
Ano: 2024
Semestre: 1º
Período: Integral
Curso: Perfusão Cardiovascular
Início: 01/02/2024
Término: 30/11/2024
Descrição: Turma inaugural do curso
✓ Turma Ativa
```

---

### 2️⃣ **BUSCAR E FILTRAR**

#### 🔍 Busca Geral
Digite qualquer um dos seguintes na caixa de busca:
- **Nome** da turma: "Turma A"
- **Código**: "2024-A"
- **Curso**: "Perfusão"

#### 🎚️ Filtros
- **Status**: Todas / Apenas Ativas / Apenas Inativas
- **Período**: Todos / Matutino / Vespertino / Noturno / Integral

#### 📊 Ordenação
Escolha como ordenar:
- **Nome (A-Z)**: Ordem alfabética crescente
- **Nome (Z-A)**: Ordem alfabética decrescente
- **Ano (Mais recente)**: Turmas mais novas primeiro
- **Ano (Mais antigo)**: Turmas mais antigas primeiro
- **Mais alunos**: Turmas com mais alunos no topo
- **Menos alunos**: Turmas com menos alunos no topo

#### 🔄 Limpar Filtros
Clique em **[Limpar]** para resetar todos os filtros

---

### 3️⃣ **VISUALIZAR TURMA**

Cada card de turma mostra:

#### 📌 Cabeçalho (Gradiente Roxo)
- Nome da turma
- Status (✓ ATIVA ou ✗ INATIVA)
- Código
- Ano/Semestre

#### 📊 Estatísticas
- **Período**: Com ícone colorido
  - ☀️ Matutino (Amarelo)
  - 🌤️ Vespertino (Laranja)
  - 🌙 Noturno (Roxo)
  - 🕐 Integral (Azul)
- **Alunos**: Quantidade total

#### 🎓 Informações
- **Curso**: Nome do curso (se cadastrado)
- **Datas**: Início e Término
- **Duração**: Calculada automaticamente em meses
- **Observações**: Descrição da turma (se houver)

---

### 4️⃣ **AÇÕES DISPONÍVEIS**

#### 👥 **Ver Alunos** (Botão Azul)
- Redireciona para página de alunos
- Aplica filtro automático para mostrar apenas alunos desta turma
- Útil para visualizar e gerenciar alunos rapidamente

#### ✏️ **Editar** (Botão Roxo)
- Abre modal de edição
- Todos os campos são pré-preenchidos
- Altere o que precisar e clique em **[Salvar Turma]**
- **Importante**: O contador de alunos é preservado automaticamente

#### 🗑️ **EXCLUIR TURMA** (Botão Vermelho)
- Abre confirmação de segurança
- Se a turma tiver alunos, mostra aviso especial
- **Atenção**: 
  - A turma será excluída permanentemente
  - Os alunos NÃO são excluídos
  - Os alunos ficarão sem turma associada
- Confirmação necessária para prosseguir

---

## 📊 ESTATÍSTICAS NO TOPO

Sempre visíveis no topo da página:

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ 📚 Total     │ ✓ Ativas     │ 👥 Alunos    │ ✗ Inativas   │
│    15        │    12        │    300       │    3         │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

Atualizado automaticamente ao:
- Criar turma
- Editar turma (ativar/inativar)
- Excluir turma
- Adicionar/remover alunos

---

## 💡 DICAS E BOAS PRÁTICAS

### ✅ Criação de Turmas
- Use códigos padronizados: `ANO-LETRA` (ex: 2024-A)
- Defina sempre as datas de início e término
- Ative apenas turmas em andamento
- Use a descrição para informações importantes

### 🔍 Busca Eficiente
1. Use busca geral para encontrar rapidamente
2. Combine filtros para resultados precisos
3. Ordene por "Mais alunos" para priorizar turmas grandes
4. Use "Apenas Ativas" para focar no semestre atual

### 🎨 Códigos de Cores
- **Verde**: Turma Ativa
- **Vermelho**: Turma Inativa
- **Amarelo**: Período Matutino
- **Laranja**: Período Vespertino
- **Roxo**: Período Noturno
- **Azul**: Período Integral

### ⚠️ Exclusão Segura
Antes de excluir uma turma:
1. Verifique se há alunos cadastrados
2. Se houver, considere:
   - Transferir alunos para outra turma
   - Ou simplesmente inativar a turma
3. Excluir apenas se for realmente necessário

---

## 🔄 FLUXO DE TRABALHO TÍPICO

### Início do Semestre:
```
1. Criar nova turma
2. Definir datas de início/término
3. Adicionar descrição relevante
4. Marcar como ativa
5. [Ver Alunos] → Cadastrar novos alunos
```

### Durante o Semestre:
```
1. Acompanhar estatísticas no topo
2. Usar filtros para visualizar turmas ativas
3. [Ver Alunos] para gerenciar matrículas
4. [Editar] para ajustar datas ou informações
```

### Final do Semestre:
```
1. [Editar] turma finalizada
2. Desmarcar "Turma Ativa"
3. Verificar estatísticas finais
4. Criar turma para próximo semestre
```

---

## 🐛 RESOLUÇÃO DE PROBLEMAS

### Turma não aparece na listagem
✅ **Verifique**:
- Filtros aplicados (Status, Período)
- Texto da busca
- Clique em [Limpar] para resetar

### Contador de alunos está zerado
✅ **Possíveis causas**:
- Turma recém-criada (normal)
- Alunos não associados à turma
- Recarregue a página (F5)

### Não consigo excluir turma
✅ **Confirme**:
- Você clicou em "OK" na confirmação
- Você tem permissão de coordenador
- Conexão com internet está ativa

### Botão "Ver Alunos" não funciona
✅ **Verifique**:
- Página `admin-students.html` existe
- JavaScript está habilitado
- Console do navegador para erros (F12)

---

## ⌨️ ATALHOS E DICAS

### Navegação Rápida:
- **Voltar**: Seta no topo esquerdo
- **Nova Turma**: Botão no topo direito
- **F5**: Recarregar página
- **Ctrl+F**: Busca no navegador (se necessário)

### Produtividade:
- Use ordenação "Ano (Mais recente)" no início do semestre
- Combine "Apenas Ativas" + "Mais alunos" para priorizar
- Mantenha descrições curtas e objetivas
- Use códigos padronizados para facilitar busca

---

## 📱 USO MOBILE

### Visualização:
- Cards empilhados verticalmente
- Filtros em uma coluna
- Estatísticas em uma coluna
- Todos os botões acessíveis

### Gestos:
- **Toque**: Abrir modal/executar ação
- **Scroll**: Navegar pela lista
- **Pinch**: Zoom (se necessário)

---

## 🎓 EXEMPLOS PRÁTICOS

### Exemplo 1: Criar Turma de Manhã
```
Nome: Turma Matutina 2024/1
Código: 2024-MAT-1
Ano: 2024
Semestre: 1º
Período: Matutino
Curso: Perfusão Cardiovascular
Início: 05/02/2024
Término: 30/06/2024
```

### Exemplo 2: Buscar Turmas Ativas com Alunos
```
1. Status: Apenas Ativas
2. Ordenar por: Mais alunos
3. Resultado: Turmas ativas ordenadas por tamanho
```

### Exemplo 3: Inativar Turma Finalizada
```
1. Encontrar turma na lista
2. Clicar em [Editar]
3. Desmarcar "Turma Ativa"
4. Adicionar à descrição: "Finalizada em 11/2024"
5. [Salvar Turma]
```

---

## 📞 PRECISA DE AJUDA?

### Documentação:
- **Técnica**: `MELHORIAS-GERENCIAR-TURMAS-V2.1.md`
- **Geral**: `README.md`
- **Sistema**: `RESUMO-FINAL-V9.0.md`

### Problemas Técnicos:
1. Verifique console do navegador (F12)
2. Recarregue a página (F5)
3. Limpe cache do navegador
4. Tente outro navegador

---

**Sistema de Controle de Cirurgias Cardiovasculares**  
**Módulo**: Gestão de Turmas v2.1  
**Data**: 14/12/2024  

✨ **SISTEMA 100% FUNCIONAL** ✨
