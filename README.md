# FALUCHI STUDIO — Landing Page

Landing Page **mobile first** para o serviço de criação de Landing Pages do
Daniel Faluchi (Faluchi Studio).

HTML, CSS e JavaScript puro — sem frameworks, sem build, pronta para deploy.

```
index.html      → todo o conteúdo e os textos da página
style.css       → cores, tipografia e layout
script.js       → CONFIG (WhatsApp, Instagram, e-mail, galeria) + FAQ e animações
assets/
  favicon.svg   → ícone da aba do navegador
robots.txt      → SEO
sitemap.xml     → SEO
```

---

## Como editar (o essencial)

### 1. WhatsApp, Instagram e e-mail
Tudo fica no topo do `script.js`, no bloco `CONFIG`:

```js
const CONFIG = {
  whatsapp: "5521989380500",      // país + DDD + número (só números)
  mensagens: {
    orcamento: "Olá, quero fazer um orçamento!!",
    projeto:   "Olá! Vi sua página e gostaria de conversar sobre o meu projeto...",
    final:     "Olá! Vi sua página e gostaria de solicitar um orçamento..."
  },
  instagram: "https://www.instagram.com/faluchi.studio/",
  email: "",                       // deixe "" para esconder o e-mail do rodapé
  galeria: []
};
```

Todo botão com a classe `js-wa` vira automaticamente um link de WhatsApp.
O atributo `data-wa="orcamento"` escolhe qual mensagem já vai escrita.

> Os links de WhatsApp também estão escritos direto no `index.html` (assim os
> botões continuam funcionando mesmo se o JavaScript não carregar). O `CONFIG`
> do `script.js` é quem manda: ao trocar o número ali, todos os botões são
> atualizados automaticamente quando a página abre.

### 2. Adicionar projetos na galeria
Ainda no `script.js`, preencha `CONFIG.galeria`:

```js
galeria: [
  { imagem: "https://i.imgur.com/SEULINK.jpeg", titulo: "Clínica Vida", descricao: "Landing Page de agendamento" },
  { imagem: "https://i.imgur.com/OUTRO.jpeg",  titulo: "Studio Bela",  descricao: "Landing Page de serviços" }
]
```

A seção **Projetos** aparece sozinha assim que existir pelo menos uma imagem.
Enquanto estiver vazia, a página mostra apenas as **Demonstrações** em mockup.

### 3. Trocar as cores
No começo do `style.css`, no bloco `:root`:

```css
--preto:        #08090D;   /* fundo principal */
--cinza-escuro: #151821;
--azul:         #2563FF;   /* botões e CTAs */
--azul-claro:   #60A5FA;   /* detalhes e efeitos */
--branco:       #F8FAFC;
--cinza-texto:  #9BA3B4;   /* textos secundários */
```

### 4. Trocar os textos
Todos os textos estão no `index.html`, com as seções comentadas
(`<!-- 3. POR QUE MEU NEGÓCIO PRECISA DE UMA? -->`, etc.).

### 5. Trocar a foto do hero
No `index.html`, procure por `class="expert__photo"` e troque o `src`.
Para remover a foto, apague o bloco `<figure class="expert"> ... </figure>`.

### 6. Favicon
Substitua o arquivo `assets/favicon.svg` (pode ser `.png` ou `.ico` —
só ajuste o `<link rel="icon">` no `index.html`).

### 7. Título, descrição e domínio (SEO)
No `<head>` do `index.html`: `<title>`, `meta description`, `link canonical`
e as tags `og:`. Troque `https://faluchistudio.vercel.app/` pelo domínio final
(aqui, no `robots.txt` e no `sitemap.xml`).

---

## Como publicar na Vercel

1. Suba este repositório no GitHub.
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório.
3. Framework Preset: **Other**. Build Command e Output Directory: deixe em branco.
4. **Deploy**. Pronto — é um site estático, publica em segundos.

Para testar no seu computador, basta abrir o `index.html` no navegador.

---

## O que já vem pronto

- 100% responsiva e mobile first
- Rolagem suave e animações leves de entrada
- FAQ interativo (acordeão, acessível via teclado)
- Botões de WhatsApp com mensagem pré-escrita
- Barra fixa de CTA no celular
- SEO básico: meta title, meta description, Open Graph, dados estruturados, sitemap
- Acessibilidade: skip link, foco visível, `aria-expanded`, textos alternativos
  e respeito a `prefers-reduced-motion`
- Sem vídeos, áudios, depoimentos, logos ou números inventados
