# SM Empreiteira — convenções do projeto

## Stack

- **Linguagem:** TypeScript 5.x
- **Runtime:** Node 20+ (dev)
- **Build:** Vite 6 (site estático, sem framework SPA pesado)
- **Estilo:** CSS em arquivo único (`src/style.css`), variáveis CSS para marca
- **Gerenciador:** npm
- **Deploy alvo:** hospedagem estática (GitHub Pages, Netlify, etc.); domínio próprio depois da aprovação do cliente

## Produto

Site institucional “cartão de visitas” para **SM Empreiteira de Obras**: navegação objetiva (Início, Quem somos, Catálogo, Contato), catálogo visual de obras, tom profissional para primeiro contato com escritórios e licitações.

## Idioma

- Conteúdo do site e documentação de produto: **pt-BR**
- Código, nomes de arquivos e identificadores: **inglês**

## Regras

- Sem bibliotecas de UI ou frameworks além do necessário; preferir HTML semântico + CSS.
- **Marca:** azul `#004182`, laranja `#F5A623`, tipografia **Montserrat** (Google Fonts). Logo vetorial em `public/logo-sm-empreiteira.svg` (substituir por PNG oficial com fundo transparente em `public/logo-sm-empreiteira.png` e atualizar `index.html` se necessário).
- Imagens reais do catálogo vêm do cliente; placeholders em `public/projects/` até troca.
