/* ============================================================
   FALUCHI STUDIO — script.js
   Tudo que você precisa alterar no dia a dia está no bloco
   CONFIG logo abaixo. Nada mais precisa ser mexido.
   ============================================================ */

const CONFIG = {
  /* ---- Contato ---- */
  // Apenas números: código do país (55) + DDD + número
  whatsapp: "5521989380500",

  // Mensagens que já vão escritas quando o cliente abre o WhatsApp.
  // A chave (orcamento, projeto, final) é usada no HTML em data-wa="...".
  mensagens: {
    orcamento: "Olá, quero fazer um orçamento!!",
    projeto:   "Olá! Vi sua página e gostaria de conversar sobre o meu projeto de Landing Page.",
    final:     "Olá! Vi sua página e gostaria de solicitar um orçamento para criação de uma Landing Page."
  },

  instagram: "https://www.instagram.com/faluchi.studio/",

  // Deixe vazio ("") para esconder o e-mail do rodapé.
  email: "",

  /* ---- Galeria de projetos ----
     Cole aqui os links das imagens dos seus projetos reais.
     Exemplo:
     { imagem: "https://i.imgur.com/XXXXXX.jpeg", titulo: "Clínica Vida", descricao: "Landing Page de agendamento" }
     Enquanto estiver vazia, a galeria fica escondida e apenas as
     demonstrações em mockup aparecem na página.                      */
  galeria: [
    // { imagem: "", titulo: "", descricao: "" },
  ]
};

/* ============================================================
   Daqui para baixo é o funcionamento da página.
   ============================================================ */
(function () {
  "use strict";

  const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Links de WhatsApp ---------- */
  function montarLinkWhatsapp(chave) {
    const texto = CONFIG.mensagens[chave] || CONFIG.mensagens.orcamento || "";
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(texto);
  }

  document.querySelectorAll(".js-wa").forEach(function (el) {
    el.setAttribute("href", montarLinkWhatsapp(el.dataset.wa));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------- 2. Instagram e e-mail ---------- */
  const instagram = document.getElementById("link-instagram");
  if (instagram && CONFIG.instagram) instagram.setAttribute("href", CONFIG.instagram);

  const email = document.getElementById("link-email");
  if (email && CONFIG.email) {
    email.setAttribute("href", "mailto:" + CONFIG.email);
    const rotulo = email.querySelector(".js-email-label");
    if (rotulo) rotulo.textContent = CONFIG.email;
    email.hidden = false;
  }

  /* ---------- 3. Ano do rodapé ---------- */
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- 4. FAQ interativo ---------- */
  const perguntas = document.querySelectorAll(".faq__q");

  function fecharPergunta(botao) {
    const resposta = document.getElementById(botao.getAttribute("aria-controls"));
    botao.setAttribute("aria-expanded", "false");
    botao.closest(".faq__item").classList.remove("is-open");
    if (resposta) resposta.hidden = true;
  }

  perguntas.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const aberta = botao.getAttribute("aria-expanded") === "true";
      // Fecha as outras (comportamento de acordeão)
      perguntas.forEach(function (outra) {
        if (outra !== botao) fecharPergunta(outra);
      });

      const resposta = document.getElementById(botao.getAttribute("aria-controls"));
      botao.setAttribute("aria-expanded", String(!aberta));
      botao.closest(".faq__item").classList.toggle("is-open", !aberta);
      if (resposta) resposta.hidden = aberta;
    });
  });

  /* ---------- 5. Animação de entrada das seções ---------- */
  const elementos = document.querySelectorAll(".reveal");

  if (semAnimacao || !("IntersectionObserver" in window)) {
    elementos.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    const observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    elementos.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 60 + "ms";
      observador.observe(el);
    });
  }

  /* ---------- 6. Header e barra fixa de CTA ---------- */
  const header = document.getElementById("header");
  const stickyCta = document.getElementById("sticky-cta");
  if (stickyCta) stickyCta.hidden = false;

  let ticking = false;
  function aoRolar() {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 12);

    if (stickyCta) {
      const final = document.getElementById("contato");
      const passouDoHero = y > window.innerHeight * 0.75;
      const chegouNoFinal = final
        ? final.getBoundingClientRect().top < window.innerHeight
        : false;
      stickyCta.classList.toggle("is-visible", passouDoHero && !chegouNoFinal);
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(aoRolar);
    }
  }, { passive: true });
  aoRolar();

  /* ---------- 7. Rolagem suave (fallback p/ navegadores antigos) ---------- */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (link) {
    link.addEventListener("click", function (evento) {
      const alvo = document.querySelector(link.getAttribute("href"));
      if (!alvo) return;
      evento.preventDefault();
      alvo.scrollIntoView({ behavior: semAnimacao ? "auto" : "smooth", block: "start" });
      alvo.setAttribute("tabindex", "-1");
      alvo.focus({ preventScroll: true });
    });
  });

  /* ---------- 8. Galeria de projetos ---------- */
  const galeria = document.getElementById("galeria");
  const grade = document.getElementById("galeria-grid");

  if (galeria && grade && Array.isArray(CONFIG.galeria) && CONFIG.galeria.length) {
    CONFIG.galeria.forEach(function (projeto) {
      if (!projeto || !projeto.imagem) return;

      const item = document.createElement("article");
      item.className = "gallery__item";

      const img = document.createElement("img");
      img.src = projeto.imagem;
      img.alt = projeto.titulo ? "Projeto: " + projeto.titulo : "Projeto Faluchi Studio";
      img.loading = "lazy";
      img.decoding = "async";
      item.appendChild(img);

      if (projeto.titulo || projeto.descricao) {
        const legenda = document.createElement("div");
        legenda.className = "gallery__caption";
        const titulo = document.createElement("strong");
        titulo.textContent = projeto.titulo || "";
        legenda.appendChild(titulo);
        if (projeto.descricao) {
          legenda.appendChild(document.createElement("br"));
          legenda.appendChild(document.createTextNode(projeto.descricao));
        }
        item.appendChild(legenda);
      }

      grade.appendChild(item);
    });

    galeria.hidden = false;
  }
})();
