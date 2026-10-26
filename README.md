# Lemify · Site institucional

Site institucional do Lemify (família de softwares com IA para empresas brasileiras).

## Tecnologias

- **React 19** + **Vite**
- **GSAP** (ScrollTrigger) para animações de scroll, parallax e sticky
- **Lenis** para o scroll suavizado
- CSS puro, escopado em `.inst`

## Estrutura

```text
index.html               # meta tags, Open Graph, JSON-LD e conteúdo estático (SEO/AIO)
public/
  robots.txt             # libera buscadores e crawlers de IA
  sitemap.xml            # páginas indexáveis
  llms.txt               # resumo em texto simples para agentes de IA
  favicon.svg, logo.png, og-image.jpg
src/
  App.jsx                # roteamento por pathname + SEO por página
  seo.js                 # título, descrição e canonical de cada rota
  institutional/         # site institucional (Hero, Sections, Header, Footer...)
    siteConfig.js        # contatos, links e CNPJ (edite aqui)
    assets/              # imagens, mascotes, logos de integrações
  legal/                 # documentos legais (um arquivo .js por documento) + LegalPage.jsx
  blog/                  # blog: lista, post e renderizador de Markdown
  components/Terms/      # manual de integração do Bling
```

## Rotas

`/` · `/blog` · `/blog/:slug` · `/docs` · `/termos` · `/privacidade` · `/reembolso` · `/termos-ia` · `/google-disclosure` · `/lgpd` · `/manual/bling`. Qualquer outro caminho
retorna 404 na Vercel (ver `vercel.json`).

## SEO e AIO: o que mexer ao publicar

- O domínio `https://lemify.com.br` está escrito em `index.html`, `src/seo.js`,
  `public/robots.txt`, `public/sitemap.xml` e `public/llms.txt`. Se for outro, troque nos cinco.
- Ao mudar textos da home, atualize também o bloco estático dentro de `<div id="root">`
  em `index.html` e o `public/llms.txt`.
- `public/og-image.jpg` é uma foto provisória; troque por uma arte 1200x630.

## Blog

Os posts ficam no banco do LCC e são gerenciados lá (menu Blog). O LCC expõe uma API restrita por chave (`/api/site/blog/posts`, `BLOG_SITE_API_KEY` no LCC).
O navegador nunca fala com essa API: ele chama as funções do próprio site em `api/blog`, que usam a chave no servidor
e devolvem só posts publicados. `/blog/:slug` é servido por `api/blog-page.js`, que devolve o HTML já com título, meta tags, JSON-LD e o texto do artigo (SEO e agentes de IA que não executam JavaScript); o React assume por cima. `/sitemap.xml` é gerado por `api/sitemap.js` e inclui os posts.

Variáveis de ambiente (veja `.env.example`; na Vercel em Settings > Environment Variables): `LCC_API_URL` (URL do backend do LCC) e `BLOG_API_KEY` (igual à `BLOG_SITE_API_KEY` do LCC).

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (dist/)
npm run lint
```
