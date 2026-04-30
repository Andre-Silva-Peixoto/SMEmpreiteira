# SM Empreiteira — site institucional

Site estático da **SM Empreiteira de Obras** (cartão de visitas digital): Início, Quem somos, Catálogo de obras e Contato. Projeto da disciplina de **Projeto Integrador Web**, com conteúdo alinhado ao briefing do cliente.

## Stack

- [Vite](https://vitejs.dev/) 6
- TypeScript (checagem estrita, sem emit separado no build)
- HTML semântico + CSS (`src/style.css`)
- Identidade visual: azul `#004182`, laranja `#F5A623`, fonte [Montserrat](https://fonts.google.com/specimen/Montserrat) (Google Fonts)

## Pré-requisitos

- Node.js 20+ (recomendado LTS)
- npm

## Como rodar

```bash
npm install
npm run dev
```

Abre o servidor de desenvolvimento (URL exibida no terminal, em geral `http://localhost:5173`).

## Build e preview local

```bash
npm run build
npm run preview
```

A pasta `dist/` contém os arquivos estáticos prontos para publicação.

## Deploy (Vercel)

O repositório inclui `vercel.json` com `npm run build` e saída em `dist/`.

Na raiz do projeto (com [Vercel CLI](https://vercel.com/docs/cli) autenticada):

```bash
npx vercel deploy --prod --yes
```

Se o primeiro link falhar por causa do caminho do projeto no Windows (espaços no path), use um nome explícito na primeira vez: `npx vercel deploy --prod --yes --name sm-empreiteira`.

**Produção:** [https://sm-empreiteira.vercel.app](https://sm-empreiteira.vercel.app)

## Estrutura principal

| Caminho | Descrição |
|--------|-----------|
| `index.html` | Página única e seções âncora |
| `src/main.ts` | Menu mobile, render do catálogo, ano no rodapé |
| `src/style.css` | Tokens de marca e layout |
| `src/data/projects.ts` | Dados dos cards do catálogo |
| `public/logo-sm-empreiteira.svg` | Logo vetorial do header |
| `public/projects/` | Imagens placeholder do catálogo |

## Personalização rápida

- **Catálogo:** edite `src/data/projects.ts` e coloque imagens em `public/` (ou use URLs absolutas).
- **Contato:** altere o bloco Contato em `index.html` (ex.: `mailto:` real).
- **Cores:** variáveis em `:root` no início de `src/style.css`.
- **Convenções do time:** veja `AGENTS.md`.

## Documentação de produto (spec-driven)

- Especificação: `specs/sm-empreiteira.md`
- Plano: `plans/sm-empreiteira.md`
- Tech spec do MVP: `tech-specs/sm-empreiteira__T01.md`

## Licença

Uso acadêmico e institucional conforme acordo com o cliente; código do repositório é privado ao grupo/projeto.
