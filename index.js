// Importa o HTML como string
import htmlContent from './index.html'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    // Rota principal - serve o HTML
    if (path === '/' || path === '/index.html') {
      return new Response(htmlContent, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=3600',
        },
      })
    }

    // Rota API de exemplo - GET
    if (path === '/api/hello') {
      return Response.json({
        message: 'Olá! Esta é uma rota API',
        timestamp: new Date().toISOString(),
        method: request.method
      })
    }

    // Rota API de exemplo - POST
    if (path === '/api/data' && request.method === 'POST') {
      try {
        const body = await request.json()
        
        // Aqui você pode adicionar sua lógica backend
        // Por exemplo: salvar no KV, processar dados, etc.
        
        return Response.json({
          success: true,
          received: body,
          processed: `Dados recebidos: ${JSON.stringify(body)}`
        })
      } catch (error) {
        return Response.json({
          success: false,
          error: 'Erro ao processar requisição'
        }, { status: 400 })
      }
    }

    // Rota API com parâmetros
    if (path.startsWith('/api/user/')) {
      const userId = path.split('/').pop()
      return Response.json({
        userId: userId,
        name: 'Usuário Exemplo',
        message: `Dados do usuário ${userId}`
      })
    }

    // 404 para rotas não encontradas
    return new Response('Página não encontrada', { 
      status: 404,
      headers: {
        'content-type': 'text/plain;charset=UTF-8'
      }
    })
  },
}
