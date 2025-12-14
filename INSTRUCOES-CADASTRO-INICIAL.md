# 🚀 Instruções para Cadastro Inicial dos 25 Perfusionistas

## 📋 Objetivo

Este documento fornece instruções passo a passo para cadastrar todos os 25 perfusionistas no sistema com suas credenciais padrão e configurar o primeiro acesso obrigatório.

---

## ⚡ Cadastro Rápido (Recomendado)

### 🎯 Use a Ferramenta Automática

**Arquivo:** `cadastrar-alunos.html`

1. **Abra o arquivo** `cadastrar-alunos.html` no navegador
2. **Clique** no botão **"CADASTRAR TODOS OS ALUNOS"**
3. **Confirme** a ação no popup
4. **Aguarde** o processo (5-10 segundos)
5. **Verifique** o resumo final

✅ **Pronto!** Todos os 25 perfusionistas estarão cadastrados automaticamente!

---

## 📊 Dados que Serão Cadastrados

### Turma 2024.1 (7 alunos):
1. Ana Clara - 20241001
2. Beatriz - 20241002
3. Gabriela - 20241003
4. Giovana - 20241004
5. Jaiane - 20241005
6. Rafaela - 20241006
7. Thaylane - 20241007

### Turma 2024.2 (4 alunos):
1. Anthony - 20242001
2. Driele - 20242002
3. Emille - 20242003
4. Israel - 20242004

### Turma 2025.1 (5 alunos):
1. Ana Beatriz - 20251001
2. Giovana - 20251002
3. Gislayne - 20251003
4. Marimar - 20251004
5. Milena - 20251005

### Turma 2025.2 (9 alunos):
1. Amanda Marques - 20252001
2. Amanda Moreira - 20252002
3. Claudia - 20252003
4. Maria Eduarda - 20252004
5. Nicoly - 20252005
6. Rafael - 20252006
7. Sthefany - 20252007
8. Vinícius - 20252008
9. Vitória - 20252009

---

## 🔐 Configurações Automáticas

Para cada perfusionista, o sistema irá configurar:

| Campo | Valor |
|-------|-------|
| **Nome** | Nome completo do aluno |
| **Matrícula** | Formato AAASS### |
| **Email** | [matrícula]@perfusionista.edu.br |
| **Curso** | Estágio em Perfusão |
| **Turma** | 2024.1, 2024.2, 2025.1 ou 2025.2 |
| **Senha** | Hash da matrícula |
| **Status** | Ativo (true) |
| **Primeiro Login** | Sim (first_login: true) |

---

## 📧 Após o Cadastro: Comunicar aos Perfusionistas

### 📝 Template de Email

```
Assunto: Acesso ao Sistema de Controle de Cirurgias Cardiovasculares

Olá [NOME],

Você foi cadastrado(a) no Sistema de Controle de Cirurgias Cardiovasculares!

═══════════════════════════════════════
🔐 SUAS CREDENCIAIS DE ACESSO
═══════════════════════════════════════

Login: [MATRÍCULA]
Senha: [MATRÍCULA]
Turma: [TURMA]

Exemplo para Ana Clara:
Login: 20241001
Senha: 20241001

═══════════════════════════════════════
🌐 LINK DE ACESSO
═══════════════════════════════════════

[URL DO SISTEMA]/login.html

═══════════════════════════════════════
⚠️ IMPORTANTE - PRIMEIRO ACESSO
═══════════════════════════════════════

No seu PRIMEIRO LOGIN, o sistema irá EXIGIR que você
altere sua senha. Esta é uma medida de segurança 
OBRIGATÓRIA.

Sua nova senha deve:
✓ Ter no mínimo 6 caracteres
✓ Ser diferente da sua matrícula
✓ Ser confirmada duas vezes

Você NÃO CONSEGUIRÁ acessar o sistema sem alterar
a senha no primeiro acesso.

═══════════════════════════════════════
📚 GUIA DE PRIMEIRO ACESSO
═══════════════════════════════════════

Para instruções detalhadas, consulte o documento:
GUIA-PRIMEIRO-ACESSO.md

Ou siga estes passos:

1. Acesse o link acima
2. Digite sua matrícula como Login
3. Digite sua matrícula como Senha
4. Uma tela aparecerá pedindo nova senha
5. Crie uma senha segura (min. 6 caracteres)
6. Confirme a nova senha
7. Pronto! Você será direcionado ao sistema

═══════════════════════════════════════
❓ PRECISA DE AJUDA?
═══════════════════════════════════════

Se tiver dúvidas ou problemas no primeiro acesso:
• Consulte o guia fornecido
• Entre em contato com o administrador
• Verifique se digitou sua matrícula corretamente

═══════════════════════════════════════

Atenciosamente,
Sistema de Gestão de Cirurgias Cardiovasculares
```

---

## 📋 Lista de Emails para Envio

Você pode usar esta lista para enviar emails em lote:

### Turma 2024.1:
- 20241001@perfusionista.edu.br (Ana Clara)
- 20241002@perfusionista.edu.br (Beatriz)
- 20241003@perfusionista.edu.br (Gabriela)
- 20241004@perfusionista.edu.br (Giovana)
- 20241005@perfusionista.edu.br (Jaiane)
- 20241006@perfusionista.edu.br (Rafaela)
- 20241007@perfusionista.edu.br (Thaylane)

### Turma 2024.2:
- 20242001@perfusionista.edu.br (Anthony)
- 20242002@perfusionista.edu.br (Driele)
- 20242003@perfusionista.edu.br (Emille)
- 20242004@perfusionista.edu.br (Israel)

### Turma 2025.1:
- 20251001@perfusionista.edu.br (Ana Beatriz)
- 20251002@perfusionista.edu.br (Giovana)
- 20251003@perfusionista.edu.br (Gislayne)
- 20251004@perfusionista.edu.br (Marimar)
- 20251005@perfusionista.edu.br (Milena)

### Turma 2025.2:
- 20252001@perfusionista.edu.br (Amanda Marques)
- 20252002@perfusionista.edu.br (Amanda Moreira)
- 20252003@perfusionista.edu.br (Claudia)
- 20252004@perfusionista.edu.br (Maria Eduarda)
- 20252005@perfusionista.edu.br (Nicoly)
- 20252006@perfusionista.edu.br (Rafael)
- 20252007@perfusionista.edu.br (Sthefany)
- 20252008@perfusionista.edu.br (Vinícius)
- 20252009@perfusionista.edu.br (Vitória)

---

## ✅ Checklist de Implantação

### Fase 1: Cadastro (5-10 minutos)
- [ ] Abrir `cadastrar-alunos.html` no navegador
- [ ] Clicar em "CADASTRAR TODOS OS ALUNOS"
- [ ] Confirmar a ação
- [ ] Aguardar conclusão do cadastro
- [ ] Verificar que todos os 25 foram cadastrados com sucesso
- [ ] Anotar se houve algum erro

### Fase 2: Verificação (5 minutos)
- [ ] Abrir painel administrativo (`admin.html`)
- [ ] Ir para "Gerenciar Perfusionistas"
- [ ] Verificar se os 25 perfusionistas aparecem
- [ ] Confirmar que todos estão com status "Ativo"
- [ ] Verificar distribuição por turmas

### Fase 3: Comunicação (15-30 minutos)
- [ ] Preparar email com credenciais
- [ ] Personalizar URL do sistema no email
- [ ] Anexar `GUIA-PRIMEIRO-ACESSO.md`
- [ ] Enviar email para todos os 25 perfusionistas
- [ ] Confirmar envio de emails

### Fase 4: Suporte Inicial (Primeiros dias)
- [ ] Monitorar primeiros logins
- [ ] Verificar mudanças de senha
- [ ] Responder dúvidas dos perfusionistas
- [ ] Resolver problemas de acesso
- [ ] Documentar problemas comuns

---

## 🆘 Solução de Problemas

### ❌ Problema: Erro ao cadastrar algum aluno

**Solução:**
1. Verifique os logs na tela de cadastro
2. Identifique qual aluno teve erro
3. Tente cadastrar manualmente pelo painel admin
4. Verifique se a matrícula já existe no banco

---

### ❌ Problema: Aluno não consegue fazer login

**Possíveis Causas:**

1. **Matrícula digitada errado**
   - Peça para digitar novamente com cuidado
   - Formato: 8 dígitos (ex: 20241001)

2. **Aluno não foi cadastrado**
   - Verificar no painel admin se existe
   - Cadastrar manualmente se necessário

3. **Aluno está inativo**
   - Ativar via painel admin

4. **Senha incorreta**
   - No primeiro acesso, senha = matrícula
   - Resetar senha se necessário

---

### ❌ Problema: Modal de mudança de senha não aparece

**Solução:**
1. Verificar se campo `first_login` está como `true`
2. Limpar cache do navegador
3. Tentar em outro navegador
4. Verificar console JavaScript para erros

---

### ❌ Problema: Erro ao salvar nova senha

**Solução:**
1. Verificar se senha tem mínimo 6 caracteres
2. Verificar se senhas coincidem
3. Verificar se senha é diferente da matrícula
4. Verificar conexão com internet

---

## 📞 Suporte aos Perfusionistas

### Perguntas Frequentes:

**P: Como faço meu primeiro acesso?**
R: Use sua matrícula como login e senha. No primeiro login, você será obrigado a criar uma nova senha.

**P: Esqueci minha senha. O que faço?**
R: Contate o administrador para resetar sua senha. Ela voltará para a matrícula padrão.

**P: Minha senha não funciona!**
R: Certifique-se de usar a matrícula correta. Se já alterou a senha uma vez, use a nova senha.

**P: O sistema pediu para mudar senha mas não consigo!**
R: Verifique se: (1) senha tem 6+ caracteres, (2) senhas coincidem, (3) senha é diferente da matrícula.

**P: Consigo usar o sistema no celular?**
R: Sim! O sistema é responsivo e funciona em qualquer dispositivo.

---

## 📊 Monitoramento Pós-Implantação

### Métricas para Acompanhar:

1. **Taxa de Primeiro Acesso:**
   - Quantos perfusionistas já fizeram primeiro login
   - Meta: 100% nas primeiras 2 semanas

2. **Mudanças de Senha:**
   - Verificar campo `first_login: false`
   - Confirmar que todos alteraram senha

3. **Problemas Reportados:**
   - Documentar dificuldades comuns
   - Criar FAQ baseado em problemas reais

4. **Uso do Sistema:**
   - Acompanhar primeiras cirurgias registradas
   - Verificar qualidade dos dados inseridos

---

## 📚 Documentação de Referência

Para mais informações, consulte:

- **`LISTA-COMPLETA-ALUNOS.md`** - Lista com todos os 25 perfusionistas
- **`GUIA-PRIMEIRO-ACESSO.md`** - Guia para perfusionistas
- **`RESUMO-PRIMEIRO-ACESSO.md`** - Resumo técnico da implementação
- **`README.md`** - Documentação geral do sistema
- **`cadastrar-alunos.html`** - Ferramenta de cadastro

---

## 🎉 Conclusão

Seguindo estas instruções, você conseguirá:

✅ Cadastrar os 25 perfusionistas automaticamente  
✅ Configurar primeiro acesso obrigatório  
✅ Comunicar credenciais aos usuários  
✅ Monitorar primeiros acessos  
✅ Oferecer suporte inicial  

**O sistema está pronto para ser usado por todos os perfusionistas!**

---

**Versão:** 4.2  
**Data:** 13/12/2025  
**Status:** ✅ Instruções Completas e Testadas

---

💙 **Sucesso na Implantação!** 🏥
