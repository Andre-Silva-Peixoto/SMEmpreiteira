# SM Empreiteira — convenções do projeto

## Stack

- **Linguagem:** TypeScript 5.x
- **Runtime:** Node 20+ (dev)
- **Build:** Vite 6 (site estático, sem framework SPA pesado)
- **Estilo:** CSS em arquivo único (`src/style.css`), variáveis CSS para marca
- **Gerenciador:** npm
- **Deploy alvo:** hospedagem estática (GitHub Pages, Netlify, etc.); domínio próprio depois da aprovação do cliente

## Deploy — runbook para o próximo agente

Objetivo: qualquer agente deve conseguir **validar** o projeto e **publicar produção na Vercel** sem perguntar ao usuário, usando só esta seção + arquivos do repo.

### Pré-condições

- **Node.js 20+** no PATH (o `package.json` declara `engines.node` 20.x).
- Repositório clonado; **cwd** = raiz do projeto (pasta `SMEmpreiteira`).
- **Windows PowerShell:** encadear com `;` (evitar `&&` em PS antigo). Ex.: `npm install; npm run typecheck; npm run build`.

### Variável `VITE_BASE_PATH` (crítico)

- **`vite.config.ts`** define `base` a partir de `process.env.VITE_BASE_PATH`.
- **Vercel / Netlify / Cloudflare (domínio na raiz):** **não** defina `VITE_BASE_PATH` no painel. O build usa base `/`.
- **GitHub Pages** (URL `https://<user>.github.io/<repo>/`): o workflow `.github/workflows/deploy-github-pages.yml` já exporta `VITE_BASE_PATH=/${{ github.event.repository.name }}/` no job de build. Não sobrescrever na Vercel com valor de subpath.

### Sequência obrigatória antes de deploy manual

```bash
npm install
npm run typecheck
npm run build
```

Se qualquer passo falhar, **não** faça deploy até corrigir.

### Vercel — produção (CLI)

1. **Primeira vez nesta máquina:** `npx vercel login` (interativo). Depois, na raiz do repo: `npx vercel link` para associar ao projeto/time correto.
2. **Deploy produção (não interativo, quando já há link):**

```bash
npx vercel deploy --prod --yes
```

(`npx --yes vercel` força baixar a CLI se necessário.)

3. **URL de produção (alias estável):** `https://sm-empreiteira.vercel.app` — confira no output do comando (`Aliased:`) ou no [dashboard](https://vercel.com/dashboard).
4. **Não usar** o flag `--name` na CLI (deprecated na Vercel). O nome do projeto vem do `vercel link` / dashboard.

**CI / token:** em ambiente sem browser, use `VERCEL_TOKEN` (token em Vercel → Account → Tokens) com a CLI; não commitar o token.

### GitHub Pages (alternativa)

- **Gatilho:** `git push` para a branch **`main`** (ver `.github/workflows/deploy-github-pages.yml`).
- **URL típica:** `https://<usuario>.github.io/SMEmpreiteira/` (depende do dono do repo).
- Deploy não roda só por commit local; precisa **push** para `origin/main`.

### Onde está a config

| Destino | Arquivo / recurso |
|--------|-------------------|
| Vercel | `vercel.json` (`buildCommand`, `outputDirectory: dist`) |
| GitHub Pages | `.github/workflows/deploy-github-pages.yml` |
| Netlify | `netlify.toml` |
| Base Vite | `vite.config.ts` (`VITE_BASE_PATH`) |

### Documentação humana

- Visão geral e alternativas de hospedagem: **`README.md`** → seção **Deploy**.

## Produto

Site institucional “cartão de visitas” para **SM Empreiteira de Obras**: navegação objetiva (Início, Quem somos, Catálogo, Contato), catálogo visual de obras, tom profissional para primeiro contato com escritórios e licitações.

## Idioma

- Conteúdo do site e documentação de produto: **pt-BR**
- Código, nomes de arquivos e identificadores: **inglês**

## Regras

- Sem bibliotecas de UI ou frameworks além do necessário; preferir HTML semântico + CSS.
- **Marca:** azul `#004182`, laranja `#F5A623`, tipografia **Montserrat** (Google Fonts). Logo vetorial em `public/logo-sm-empreiteira.svg` (substituir por PNG oficial com fundo transparente em `public/logo-sm-empreiteira.png` e atualizar `index.html` se necessário).
- Fotos do catálogo em `public/projects/` (`1.png`–`6.png`), listadas em `src/data/projects.ts`.
