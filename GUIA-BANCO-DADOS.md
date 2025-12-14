# 📊 GUIA COMPLETO: Banco de Dados

**Sistema:** RESTful Table API  
**Versão:** 9.1  
**Data:** 14/12/2024

---

## ✅ VOCÊ JÁ TEM UM BANCO DE DADOS!

O sistema **já possui** um banco de dados integrado e funcionando.

### **Tabelas Existentes:**

| Tabela | Campos | Uso |
|--------|--------|-----|
| **students** | 17 | Alunos/Perfusionistas |
| **surgeries** | 27 | Cirurgias registradas |
| **attendance** | 24 | Presenças no estágio |
| **modules** | 13 | Aulas/Módulos |
| **classes** | 13 | Turmas |

---

## 🎯 COMO FUNCIONA

### **API RESTful:**

```
GET    /tables/{tabela}           → Listar registros
GET    /tables/{tabela}/{id}      → Buscar um registro
POST   /tables/{tabela}           → Criar registro
PUT    /tables/{tabela}/{id}      → Atualizar registro
PATCH  /tables/{tabela}/{id}      → Atualizar parcial
DELETE /tables/{tabela}/{id}      → Excluir registro
```

---

## 💻 EXEMPLOS PRÁTICOS

### **1. CRIAR (INSERT)**

```javascript
async function criarAluno() {
    const novoAluno = {
        name: "João Silva",
        email: "joao@email.com",
        registration: "20240001",
        class_period: "Manhã",
        active: true
    };
    
    const response = await fetch('tables/students', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(novoAluno)
    });
    
    const resultado = await response.json();
    console.log('Aluno criado:', resultado);
    // resultado.id = ID gerado automaticamente
}
```

### **2. LISTAR (SELECT ALL)**

```javascript
async function listarAlunos() {
    // Buscar todos (paginado)
    const response = await fetch('tables/students?limit=100');
    const data = await response.json();
    
    console.log('Total:', data.total);
    console.log('Alunos:', data.data);
    
    // Com filtros de busca
    const response2 = await fetch('tables/students?search=João&limit=10');
    const data2 = await response2.json();
}
```

### **3. BUSCAR UM (SELECT BY ID)**

```javascript
async function buscarAluno(id) {
    const response = await fetch(`tables/students/${id}`);
    const aluno = await response.json();
    
    console.log('Aluno:', aluno);
    console.log('Nome:', aluno.name);
    console.log('Email:', aluno.email);
}
```

### **4. ATUALIZAR (UPDATE)**

```javascript
async function atualizarAluno(id) {
    // Primeiro busca o registro atual
    const getResponse = await fetch(`tables/students/${id}`);
    const alunoAtual = await getResponse.json();
    
    // Atualiza os campos desejados
    const alunoAtualizado = {
        ...alunoAtual,
        email: "novo@email.com",
        phone: "(11) 98765-4321"
    };
    
    // Envia atualização
    const response = await fetch(`tables/students/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(alunoAtualizado)
    });
    
    const resultado = await response.json();
    console.log('Atualizado:', resultado);
}
```

### **5. EXCLUIR (DELETE)**

```javascript
async function excluirAluno(id) {
    const response = await fetch(`tables/students/${id}`, {
        method: 'DELETE'
    });
    
    if (response.ok || response.status === 204) {
        console.log('Aluno excluído com sucesso');
    }
}
```

---

## 🆕 CRIAR NOVA TABELA

### **Passo 1: Definir Estrutura**

```javascript
// Exemplo de estrutura
const campos = [
    {
        name: "id",
        type: "text",
        description: "ID único do registro"
    },
    {
        name: "titulo",
        type: "text",
        description: "Título do item"
    },
    {
        name: "descricao",
        type: "rich_text",
        description: "Descrição detalhada"
    },
    {
        name: "quantidade",
        type: "number",
        description: "Quantidade numérica"
    },
    {
        name: "ativo",
        type: "bool",
        description: "Item está ativo?"
    },
    {
        name: "data_criacao",
        type: "datetime",
        description: "Data de criação"
    },
    {
        name: "tags",
        type: "array",
        description: "Lista de tags"
    }
];
```

### **Passo 2: Criar Tabela**

Me informe e eu crio para você com o comando `TableSchemaUpdate`.

### **Tipos de Campos Disponíveis:**

| Tipo | Uso | Exemplo |
|------|-----|---------|
| **text** | Texto simples | "João Silva" |
| **rich_text** | Texto formatado | HTML/Markdown |
| **number** | Números | 123, 45.67 |
| **bool** | Verdadeiro/Falso | true, false |
| **datetime** | Data e hora | "2024-12-14T10:30:00Z" |
| **array** | Lista de itens | ["tag1", "tag2"] |

---

## 📄 EXEMPLO COMPLETO EM HTML

Criei um arquivo de exemplo: **`exemplo-banco-dados.html`**

**Como usar:**
1. Abra: `exemplo-banco-dados.html`
2. Veja a interface funcionando
3. Crie, liste, atualize e exclua registros
4. Veja o console de logs em tempo real

**O arquivo demonstra:**
- ✅ Criar registro (POST)
- ✅ Listar registros (GET)
- ✅ Atualizar status (PUT)
- ✅ Excluir registro (DELETE)
- ✅ Estatísticas em tempo real
- ✅ Console de logs

---

## 🔍 CAMPOS DO SISTEMA

### **Campos Automáticos (System Fields):**

Todo registro recebe automaticamente:

```javascript
{
    id: "uuid-gerado-automaticamente",
    gs_project_id: "id-do-projeto",
    gs_table_name: "nome-da-tabela",
    created_at: 1702544400000,  // timestamp
    updated_at: 1702544400000   // timestamp
}
```

---

## 📊 PAGINAÇÃO E FILTROS

### **Parâmetros de Query:**

```javascript
// Limite de resultados
fetch('tables/students?limit=50')

// Paginação
fetch('tables/students?page=2&limit=20')

// Busca
fetch('tables/students?search=João')

// Ordenação
fetch('tables/students?sort=name')

// Combinação
fetch('tables/students?page=1&limit=10&search=Silva&sort=name')
```

### **Resposta Paginada:**

```javascript
{
    data: [...],        // Array de registros
    total: 150,         // Total de registros
    page: 1,            // Página atual
    limit: 10,          // Itens por página
    table: "students",  // Nome da tabela
    schema: {...}       // Estrutura da tabela
}
```

---

## 🛠️ BOAS PRÁTICAS

### **1. Sempre use try/catch:**

```javascript
async function buscarDados() {
    try {
        const response = await fetch('tables/students');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar dados');
    }
}
```

### **2. Verifique o status da resposta:**

```javascript
const response = await fetch('tables/students', {...});

if (response.ok) {
    // Sucesso
    const data = await response.json();
} else {
    // Erro
    console.error('Status:', response.status);
}
```

### **3. Use async/await:**

```javascript
// ✅ BOM
async function criar() {
    const response = await fetch(...);
    const data = await response.json();
    return data;
}

// ❌ EVITE
function criar() {
    fetch(...).then(response => {
        response.json().then(data => {
            // Callback hell
        });
    });
}
```

### **4. Validação de dados:**

```javascript
async function criarAluno(dados) {
    // Valida antes de enviar
    if (!dados.name || !dados.email) {
        alert('Nome e email são obrigatórios');
        return;
    }
    
    if (!dados.email.includes('@')) {
        alert('Email inválido');
        return;
    }
    
    // Envia para o banco
    const response = await fetch('tables/students', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
    });
}
```

---

## 🔒 SEGURANÇA

### **O sistema já implementa:**

1. ✅ Validação de tipos de dados
2. ✅ IDs únicos automáticos
3. ✅ Timestamps automáticos
4. ✅ Soft delete (marca como excluído)
5. ✅ Auditoria de criação/atualização

### **Você deve implementar:**

1. ⚠️ Validação de entrada no frontend
2. ⚠️ Verificação de permissões (quem pode editar?)
3. ⚠️ Sanitização de dados
4. ⚠️ Confirmação antes de excluir

---

## 📋 CHECKLIST DE USO

### **Para usar o banco existente:**
- [x] Sistema já configurado
- [x] API funcionando
- [x] Tabelas criadas
- [ ] Faça suas consultas via fetch()

### **Para criar nova tabela:**
- [ ] Defina estrutura dos campos
- [ ] Me informe para eu criar
- [ ] Use a API para manipular dados
- [ ] Implemente interface no HTML

---

## 💡 EXEMPLOS DE USO NO SISTEMA

### **Onde já está sendo usado:**

1. **Login (auth.js):**
```javascript
// Busca aluno para login
const response = await fetch('tables/students?limit=1000');
const students = response.json();
const student = students.data.find(s => s.registration === registration);
```

2. **Cirurgias (main.js):**
```javascript
// Salva cirurgia
await fetch('tables/surgeries', {
    method: 'POST',
    body: JSON.stringify(surgeryData)
});
```

3. **Presenças (student-admin.js):**
```javascript
// Busca presenças do aluno
const response = await fetch('tables/attendance?limit=1000');
const attendance = data.data.filter(a => a.student_id === studentId);
```

---

## 🆘 TROUBLESHOOTING

### **Problema: "Erro ao buscar dados"**

**Solução:**
```javascript
// Verifique o console (F12)
console.log('Response:', response);
console.log('Status:', response.status);
console.log('Data:', await response.text());
```

### **Problema: "Registro não aparece"**

**Verificar:**
1. ID está correto?
2. Tabela existe?
3. Dados foram salvos?

```javascript
// Debug: listar todos
const response = await fetch('tables/sua_tabela?limit=1000');
const data = await response.json();
console.log('Total:', data.total);
console.log('Dados:', data.data);
```

### **Problema: "Não consigo atualizar"**

**Lembre-se:**
1. Buscar registro atual primeiro
2. Manter todos os campos
3. Usar método PUT

```javascript
// ✅ Correto
const current = await fetch(`tables/students/${id}`).then(r => r.json());
const updated = { ...current, name: "Novo Nome" };
await fetch(`tables/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updated)
});
```

---

## 🎓 RESUMO

### **Você JÁ TEM:**
- ✅ Banco de dados funcionando
- ✅ 5 tabelas criadas
- ✅ API RESTful completa
- ✅ Sistema de autenticação
- ✅ CRUD completo

### **Como USAR:**
1. Use `fetch()` no JavaScript
2. Métodos: GET, POST, PUT, DELETE
3. Endpoint: `tables/{nome_da_tabela}`
4. Veja exemplo: `exemplo-banco-dados.html`

### **Para CRIAR nova tabela:**
1. Defina campos
2. Me informe
3. Eu crio com `TableSchemaUpdate`
4. Use a nova tabela

---

## 📞 SUPORTE

**Dúvidas?**
- Exemplo prático: `exemplo-banco-dados.html`
- Console (F12) para debug
- Veja código existente em: `js/main.js`, `js/student-admin.js`

**Quer criar nova tabela?**
- Me informe nome e campos
- Eu crio para você
- Você implementa a interface

---

**Sistema v9.1**  
**14/12/2024**

📊 **Banco de dados pronto e funcionando!** 📊
