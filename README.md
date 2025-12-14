# 🚀 Cloudflare Worker - Backend + Frontend

Projeto completo de Cloudflare Worker com lógica backend e interface HTML.

## 📋 Estrutura do Projeto

```
cloudflare-worker-project/
├── src/
│   ├── index.js       # Lógica do Worker (backend)
│   └── index.html     # Interface HTML
├── wrangler.toml      # Configuração do Cloudflare
├── package.json       # Dependências do projeto
└── README.md          # Este arquivo
```

## 🛠️ Instalação

1. **Instale as dependências:**
```bash
npm install
```

2. **Configure o Wrangler (primeira vez):**
```bash
npx wrangler login
```

## 🚀 Comandos

### Desenvolvimento Local
```bash
npm run dev
```
Acesse: http://localhost:8787

### Deploy para Produção
```bash
npm run deploy
```

## 📡 Rotas API Disponíveis

### GET /
- Retorna a interface HTML

### GET /api/hello
- Exemplo de rota GET
- Retorna JSON com mensagem e timestamp

### POST /api/data
- Exemplo de rota POST
- Envia dados JSON e recebe confirmação

### GET /api/user/:id
- Exemplo de rota com parâmetros
- Retorna dados do usuário baseado no ID

## 🎨 Personalização

### Modificar o HTML
Edite o arquivo `src/index.html`

### Adicionar novas rotas API
Edite o arquivo `src/index.js` e adicione novas condições:

```javascript
if (path === '/api/nova-rota') {
  return Response.json({
    // sua lógica aqui
  })
}
```

### Configurar nome do Worker
Edite `wrangler.toml` e altere a propriedade `name`

## 📦 Recursos do Worker

✅ Serve HTML estático  
✅ Rotas API RESTful  
✅ Suporte a GET e POST  
✅ Processamento de JSON  
✅ Roteamento dinâmico  
✅ Headers customizados  
✅ Tratamento de erros  

## 🔧 Próximos Passos

1. **Adicionar banco de dados:**
   - Use Cloudflare KV para key-value storage
   - Use D1 para SQL database
   - Use Durable Objects para estado persistente

2. **Adicionar autenticação:**
   - Implemente JWT tokens
   - Integre com OAuth providers

3. **Adicionar mais funcionalidades:**
   - Upload de arquivos
   - WebSockets
   - Server-Sent Events

## 📚 Documentação

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Examples](https://developers.cloudflare.com/workers/examples/)

## 💡 Dicas

- Teste sempre localmente antes do deploy
- Use `wrangler tail` para ver logs em produção
- Configure custom domains no painel do Cloudflare
- Workers tem limite de 10ms CPU time por request (plano gratuito)

## 🐛 Resolução de Problemas

### Erro "No loader configured for .html"
✅ Já resolvido neste projeto através do `wrangler.toml`

### Worker não atualiza
```bash
# Limpe o cache e faça deploy novamente
npx wrangler deploy --force
```

### Erro de autenticação
```bash
# Faça login novamente
npx wrangler logout
npx wrangler login
```

## 📄 Licença

MIT License - Use livremente!
