# 📎 Funcionalidade: Anexo da Ficha de CEC

## 🎯 Visão Geral

O sistema agora permite anexar a ficha de CEC (Circulação Extracorpórea) diretamente no registro de cada cirurgia. Os arquivos são convertidos para base64 e armazenados no banco de dados, facilitando o acesso e a gestão dos documentos.

---

## ✨ Recursos Implementados

### 1. Upload de Arquivo na Página do Perfusionista

**Localização:** `index.html` - Seção "Dados da Cirurgia"

**Características:**
- ✅ Campo opcional para anexar arquivo
- ✅ Formatos aceitos: **PDF, JPG, PNG**
- ✅ Tamanho máximo: **5MB**
- ✅ Preview do nome do arquivo após seleção
- ✅ Botão para remover anexo antes de salvar
- ✅ Validação automática de tipo e tamanho

**Comportamento:**
- **Nova cirurgia:** Campo habilitado para upload
- **Cirurgia em andamento:** Campo habilitado (pode adicionar durante)
- **Cirurgia concluída:** Campo desabilitado (não pode alterar)

---

### 2. Armazenamento de Dados

**Estrutura no Banco:**
```json
{
  "cec_attachment": "{
    \"filename\": \"ficha-cec-001.pdf\",
    \"filetype\": \"application/pdf\",
    \"filesize\": 1048576,
    \"data\": \"data:application/pdf;base64,JVBERi0xLjQKJeLjz9...\"
  }"
}
```

**Conversão:**
- Arquivo é convertido para **base64** no frontend
- Armazenado como **string JSON** no campo `cec_attachment`
- Inclui metadados: nome, tipo, tamanho e dados

---

### 3. Visualização no Painel Administrativo

**Localização:** `admin.html` - Tabela de Registros

**Nova Coluna: "Ficha CEC"**
- 📥 **Ícone de download** quando há anexo disponível
- ➖ **Hífen (-)** quando não há anexo
- 🖱️ **Clique no ícone** para baixar o arquivo original

**Exportação CSV:**
- Coluna adicional: **"Tem Ficha CEC"**
- Valores: `Sim` ou `Não`
- *Nota: O arquivo em si não é exportado no CSV*

---

## 🔧 Funções JavaScript Implementadas

### `main.js` (Página do Perfusionista)

#### 1. `handleAttachmentChange(event)`
- Processa seleção de arquivo
- Valida tipo e tamanho
- Converte para base64
- Exibe preview

#### 2. `fileToBase64(file)`
- Converte arquivo para base64 usando FileReader
- Retorna Promise com dados codificados

#### 3. `clearAttachment()`
- Remove arquivo selecionado
- Limpa preview e variável global

#### 4. Variável Global
```javascript
let cecAttachmentData = null; // Armazena dados do anexo temporariamente
```

---

### `admin.js` (Painel Administrativo)

#### 1. `downloadAttachment(attendanceId)`
- Busca dados do registro
- Decodifica anexo JSON
- Cria link temporário
- Inicia download do arquivo original

#### 2. Atualização da Tabela
- Nova coluna com ícone de download
- Verificação de existência de anexo
- Botão funcional para baixar

---

## 📋 Fluxo de Uso

### Para o Perfusionista:

1. **Iniciar Nova Cirurgia:**
   - Preencher dados obrigatórios (Perfusionista Principal, Cirurgião, Tipo)
   - *Opcionalmente:* Anexar ficha de CEC
   - Clicar em "Iniciar Cirurgia"

2. **Durante a Cirurgia:**
   - Campo de anexo permanece habilitado
   - Pode anexar arquivo se não foi feito no início
   - Atualizar tempos de CEC e Pinça

3. **Finalizar Cirurgia:**
   - Clicar em "Finalizar Cirurgia"
   - Anexo é salvo permanentemente
   - Campos são bloqueados

### Para o Administrador:

1. **Visualizar Registros:**
   - Acessar `admin.html`
   - Ver tabela com coluna "Ficha CEC"
   - Identificar registros com anexo (ícone 📥)

2. **Baixar Anexo:**
   - Clicar no ícone de download
   - Arquivo original é baixado automaticamente
   - Nome e formato preservados

3. **Exportar Relatório:**
   - Usar botão "Exportar CSV"
   - Coluna indica presença de anexo
   - Facilita auditoria e controle

---

## 🔒 Validações e Segurança

### Validações Frontend:

✅ **Tipo de arquivo:**
- application/pdf
- image/jpeg
- image/jpg
- image/png

✅ **Tamanho máximo:** 5MB (5.242.880 bytes)

✅ **Mensagens de erro claras:**
- "O arquivo é muito grande. Tamanho máximo: 5MB"
- "Formato não permitido. Use: PDF, JPG ou PNG"

### Proteções:

🔐 **Campo desabilitado após conclusão** - Previne alterações
🔐 **Validação antes de salvar** - Garante integridade
🔐 **Codificação base64** - Preserva dados binários

---

## 💾 Dados Técnicos

### Tamanho Estimado:

| Tipo de Arquivo | Tamanho Original | Tamanho Base64 (aprox.) |
|-----------------|------------------|-------------------------|
| PDF (1 página)  | 100 KB          | 137 KB                  |
| Foto JPG        | 500 KB          | 685 KB                  |
| PDF (5 páginas) | 2 MB            | 2.74 MB                 |

*Nota: Base64 aumenta o tamanho em aproximadamente 37%*

### Capacidade:

- **Limite por arquivo:** 5 MB
- **Limite base64:** ~6.85 MB
- **Armazenamento:** Campo TEXT no banco de dados

---

## 🎨 Interface do Usuário

### Campo de Upload:

```html
<div class="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition">
    <input type="file" id="cecAttachment" accept="image/*,.pdf" class="...">
    <p class="text-xs text-gray-500 mt-2">
        <i class="fas fa-info-circle mr-1"></i>
        Formatos aceitos: PDF, JPG, PNG (máx. 5MB)
    </p>
    <div id="attachmentPreview" class="mt-3 hidden">
        <div class="flex items-center gap-2 text-sm text-green-600">
            <i class="fas fa-check-circle"></i>
            <span id="attachmentName"></span>
            <button onclick="clearAttachment()" class="text-red-600 hover:text-red-800 ml-2">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
</div>
```

### Coluna na Tabela Admin:

```html
<td class="px-3 py-3 text-center">
    ${att.cec_attachment ? 
        `<button onclick="downloadAttachment('${att.id}')" class="text-blue-600 hover:text-blue-800" title="Baixar Ficha CEC">
            <i class="fas fa-download"></i>
        </button>` : 
        '<span class="text-gray-400">-</span>'
    }
</td>
```

---

## 🚀 Benefícios

1. ✅ **Centralização:** Todos os documentos em um só lugar
2. ✅ **Rastreabilidade:** Cada cirurgia com sua ficha específica
3. ✅ **Acessibilidade:** Download fácil e rápido pelo admin
4. ✅ **Auditoria:** Exportação CSV indica presença de documentos
5. ✅ **Organização:** Não há necessidade de pasta física separada
6. ✅ **Backup:** Documentos salvos junto com os dados

---

## 📝 Próximas Melhorias Possíveis

- [ ] Visualizar anexo em modal antes de baixar
- [ ] Permitir múltiplos anexos por cirurgia
- [ ] Compressão automática de imagens
- [ ] Assinatura digital de documentos
- [ ] Histórico de versões de anexos
- [ ] Integração com scanner para digitalização direta

---

## ✅ Status da Implementação

- ✅ Schema do banco atualizado (`cec_attachment`)
- ✅ Interface de upload na página do perfusionista
- ✅ Validação de tipo e tamanho de arquivo
- ✅ Conversão para base64 no frontend
- ✅ Armazenamento no banco de dados
- ✅ Coluna de anexo na tabela administrativa
- ✅ Função de download no painel admin
- ✅ Exportação CSV com indicador de anexo
- ✅ Documentação completa

---

**Data de Implementação:** 13/12/2024  
**Versão do Sistema:** 3.0  
**Status:** ✅ Funcional e Testado
