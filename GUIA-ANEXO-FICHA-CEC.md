# 📎 Guia Rápido: Anexar Ficha de CEC

## 🎯 O que é?

A funcionalidade de anexo permite que você faça upload da ficha de CEC (Circulação Extracorpórea) diretamente no sistema, vinculando o documento à cirurgia registrada.

---

## 👨‍⚕️ Para Perfusionistas

### Como Anexar a Ficha

#### 1️⃣ **No Início da Cirurgia:**

1. Acesse a página principal (`index.html`)
2. Selecione sua **turma**
3. Selecione seu **nome**
4. Preencha os **dados obrigatórios**:
   - ✅ Perfusionista Principal
   - ✅ Cirurgião
   - ✅ Tipo de Cirurgia
5. Na seção **"Dados da Cirurgia"**, localize o campo:
   ```
   📎 Ficha de CEC (opcional):
   [Escolher arquivo]
   ```
6. Clique em **"Escolher arquivo"**
7. Selecione o arquivo:
   - ✅ **PDF** (ficha digitalizada)
   - ✅ **JPG/PNG** (foto da ficha)
   - ⚠️ Máximo **5MB**
8. Após selecionar, você verá:
   ```
   ✅ nome-do-arquivo.pdf [❌]
   ```
9. Clique em **"Iniciar Cirurgia"** para salvar

---

#### 2️⃣ **Durante a Cirurgia:**

Se você esqueceu de anexar no início:

1. O campo de anexo permanece **habilitado**
2. Você pode anexar a qualquer momento
3. Ao clicar em **"Finalizar Cirurgia"**, o arquivo será salvo

---

#### 3️⃣ **Remover Anexo (antes de salvar):**

Se você anexou o arquivo errado:

1. Clique no **[❌]** ao lado do nome do arquivo
2. O anexo será removido
3. Você pode selecionar outro arquivo

---

### ⚠️ Validações Automáticas

O sistema irá avisar se:

- ❌ **"O arquivo é muito grande. Tamanho máximo: 5MB"**
  - Solução: Comprima o PDF ou reduza a qualidade da imagem

- ❌ **"Formato não permitido. Use: PDF, JPG ou PNG"**
  - Solução: Converta o arquivo para um formato aceito

---

### 🔒 Proteções

- ✅ Após **finalizar a cirurgia**, o campo é **desabilitado**
- ✅ Você **não pode alterar** o anexo depois de concluído
- ✅ Garante **integridade** do registro

---

## 👨‍💼 Para Administradores

### Como Visualizar e Baixar Anexos

#### 1️⃣ **Acessar Painel:**

1. Abra `admin.html`
2. Role até a seção **"Registros de Presença"**

---

#### 2️⃣ **Identificar Registros com Anexo:**

Na tabela, observe a coluna **"Ficha CEC"**:

| ... | CEC | Pinça | **Ficha CEC** | Ações |
|-----|-----|-------|---------------|-------|
| ... | 120m | 90m  | 📥            | 🗑️   |
| ... | 80m  | 60m  | -             | 🗑️   |

- **📥** = Tem anexo disponível
- **-** = Sem anexo

---

#### 3️⃣ **Baixar Anexo:**

1. Clique no ícone **📥** (download)
2. O arquivo será **baixado automaticamente**
3. Nome e formato originais são **preservados**

Exemplo de arquivo baixado:
```
ficha-cec-01-2025.pdf
foto-ficha-cirurgia.jpg
```

---

#### 4️⃣ **Exportar para CSV:**

1. Use o botão **"Exportar CSV"**
2. A planilha incluirá coluna: **"Tem Ficha CEC"**
   - Valores: `Sim` ou `Não`
3. Facilita **auditoria** e **controle**

> **Nota:** O arquivo em si não é exportado no CSV, apenas o indicador de presença.

---

## 💡 Dicas e Boas Práticas

### 📸 Para Fotos:

1. **Tire foto com boa iluminação**
2. **Foque toda a ficha** (não corte informações)
3. **Mantenha legibilidade**
4. **Reduza qualidade se necessário** (para ficar abaixo de 5MB)

---

### 📄 Para PDFs:

1. **Escaneie em resolução adequada** (150-300 DPI)
2. **Use compressão** se o arquivo ficar muito grande
3. **Prefira preto e branco** para reduzir tamanho
4. **Nomeie descritivamente** antes de fazer upload

Exemplos de nomes:
```
✅ ficha-cec-joao-15jan2025.pdf
✅ cec-revascularizacao-001.pdf
❌ documento.pdf
❌ img001.jpg
```

---

### 🗂️ Organização:

- **Anexe sempre que possível** para centralizar documentos
- **Confira o arquivo** antes de finalizar cirurgia
- **Mantenha backup local** dos originais importantes

---

## 🚨 Solução de Problemas

### ❌ **Não consigo anexar arquivo**

**Possíveis causas:**
1. Arquivo maior que 5MB → Comprima o arquivo
2. Formato não suportado → Converta para PDF/JPG/PNG
3. Cirurgia já finalizada → Não pode mais anexar

---

### ❌ **Anexei arquivo errado**

**Antes de finalizar:**
- Clique no [❌] e selecione o correto

**Depois de finalizar:**
- ⚠️ **Não é possível alterar**
- Contate o administrador para excluir o registro

---

### ❌ **Não aparece botão de download no admin**

**Causas:**
- O registro não tem anexo (mostra "-")
- Verifique se o perfusionista anexou o arquivo

---

### ❌ **Download não funciona**

**Tente:**
1. Atualizar a página (F5)
2. Usar navegador diferente
3. Verificar se o anexo não está corrompido

---

## 📊 Estatísticas de Uso

### Capacidade:

| Tipo | Tamanho Real | Armazenado (base64) |
|------|--------------|---------------------|
| PDF 1 pág | 100 KB | ~137 KB |
| Foto JPG | 500 KB | ~685 KB |
| PDF 5 pág | 2 MB | ~2.74 MB |

### Limites:

- ✅ **Por arquivo:** 5 MB
- ✅ **Por cirurgia:** 1 arquivo
- ✅ **Total sistema:** Ilimitado

---

## 🎓 Perguntas Frequentes

### **1. É obrigatório anexar a ficha?**
❌ **Não.** O campo é opcional. Mas recomendamos anexar para melhor organização.

---

### **2. Posso anexar mais de um arquivo?**
❌ **Não.** Apenas 1 arquivo por cirurgia. Combine múltiplas páginas em um PDF se necessário.

---

### **3. Posso anexar depois de finalizar?**
❌ **Não.** Após finalizar, o campo é bloqueado. Anexe durante o registro.

---

### **4. O arquivo fica seguro?**
✅ **Sim.** Armazenado no banco de dados junto com os demais dados da cirurgia.

---

### **5. Posso ver o anexo antes de baixar?**
❌ **Atualmente não.** Você precisa baixar para visualizar. (Funcionalidade futura)

---

### **6. O que acontece se excluir o registro?**
⚠️ **O anexo é excluído junto.** Não há recuperação. Faça backup se necessário.

---

## 📞 Suporte

### Em caso de dúvidas:

1. Consulte: `FUNCIONALIDADE-ANEXO-CEC.md` (documentação técnica)
2. Verifique: `README.md` (documentação geral)
3. Contate: Administrador do sistema

---

## ✅ Checklist de Uso

### Perfusionista (ao registrar cirurgia):

- [ ] Preenchi todos os campos obrigatórios
- [ ] Selecionei o arquivo correto
- [ ] Verifiquei que o arquivo tem menos de 5MB
- [ ] Confirme que o formato é PDF, JPG ou PNG
- [ ] Vi a confirmação com ✅ e nome do arquivo
- [ ] Cliquei em "Iniciar Cirurgia" ou "Finalizar Cirurgia"

### Administrador (ao consultar):

- [ ] Acessei admin.html
- [ ] Localizei o registro desejado
- [ ] Verifiquei ícone 📥 na coluna "Ficha CEC"
- [ ] Cliquei no ícone para baixar
- [ ] Arquivo foi baixado com sucesso

---

**Última Atualização:** 13/12/2024  
**Versão:** 3.0  
**Status:** ✅ Funcional
