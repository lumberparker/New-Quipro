document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("nav__list--open");
    });

    navList.addEventListener("click", (event) => {
      if (event.target.matches(".nav__link")) {
        navList.classList.remove("nav__list--open");
      }
    });
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const form = document.getElementById("contact-form");
  const success = document.getElementById("contact-success");

  initPortfolio();
});

// Respaldo local por si no se puede leer el JSON externo
const defaultPortfolioData = [
  {
    category: "Sitios Web",
    subcategories: [
      {
        name: "Corporativos",
        projects: [
          {
            name: "Resirene",
            image: "assets/imagenes/resirene.jpg",
            description:
              "Sitio corporativo para la industria química con enfoque en productos y sostenibilidad.",
          },
          {
            name: "Caribou Visual Studio",
            image: "assets/imagenes/caribou.jpg",
            description:
              "Portafolio visual para estudio creativo, optimizado para mostrar proyectos multimedia.",
          },
          {
            name: "Flat",
            image: "assets/imagenes/flat.jpg",
            description:
              "Landing page para plataforma digital enfocada en experiencias inmobiliarias.",
          },
        ],
      },
      {
        name: "Startups y comunidades",
        projects: [
          {
            name: "Co-Madre*",
            image: "assets/imagenes/comadre.jpg",
            description:
              "Comunidad de coworking para emprendedoras con foco en reservas y eventos.",
          },
          {
            name: "The Marketplace*",
            image: "assets/imagenes/marketplace.jpg",
            description:
              "Marketplace digital para conectar oferta y demanda de productos especializados.",
          },
          {
            name: "BMW Car Club Mexico",
            image: "assets/imagenes/bmw.jpg",
            description:
              "Plataforma para club automotriz con calendario de eventos y galerías.",
          },
          {
            name: "Magicae Jewelry",
            image: "assets/imagenes/magicae.jpg",
            description:
              "E-commerce de joyería con catálogo dinámico y administración de colecciones.",
          },
          {
            name: "Secnesys*",
            image: "assets/imagenes/secnesys.jpg",
            description:
              "Sitio corporativo orientado a ciberseguridad y servicios tecnológicos.",
          },
          {
            name: "Cacao Paycard Solutions",
            image: "assets/imagenes/cacao.jpg",
            description:
              "Plataforma fintech para soluciones de pago y tarjetas digitales.",
          },
        ],
      },
    ],
  },
  {
    category: "Plataformas de Lealtad / Web",
    subcategories: [
      {
        name: "Lealtad",
        projects: [
          {
            name: "Plataforma de Lealtad",
            image: "assets/imagenes/lealtad-1.jpg",
            description:
              "Sistema de lealtad B2C con acumulación de puntos y canje.",
          },
          {
            name: "Plataforma de Lealtad",
            image: "assets/imagenes/lealtad-2.jpg",
            description:
              "Programa de recompensas enfocado en campañas segmentadas.",
          },
        ],
      },
      {
        name: "Plataformas Digitales",
        projects: [
          {
            name: "Sistema de Gestión de Impresoras",
            image: "assets/imagenes/impresoras.jpg",
            description:
              "Panel web para monitoreo y administración de flotas de impresión.",
          },
          {
            name: "Plataforma Web",
            image: "assets/imagenes/plataforma-web-1.jpg",
            description:
              "Portal corporativo con gestión de contenidos y secciones dinámicas.",
          },
          {
            name: "Plataforma Web",
            image: "assets/imagenes/plataforma-web-2.jpg",
            description:
              "Sitio institucional con integración a sistemas internos.",
          },
          {
            name: "Plataforma Digital de Seguros",
            image: "assets/imagenes/seguros.jpg",
            description:
              "Plataforma para cotización y contratación de seguros en línea.",
          },
        ],
      },
    ],
  },
  {
    category: "Apps y Web Apps",
    subcategories: [
      {
        name: "Apps móviles",
        projects: [
          {
            name: "Apps móviles",
            image: "assets/imagenes/apps-moviles.jpg",
            description:
              "Aplicaciones móviles nativas para iOS y Android conectadas a APIs seguras.",
          },
        ],
      },
      {
        name: "Web Apps",
        projects: [
          {
            name: "Web Apps",
            image: "assets/imagenes/web-apps.jpg",
            description:
              "Web apps responsivas con dashboards y experiencia tipo aplicación.",
          },
        ],
      },
    ],
  },
];

let portfolioData = defaultPortfolioData.slice();

function initPortfolio() {
  const container = document.querySelector(".portfolio__dynamic");
  const filtersContainer = document.querySelector(".portfolio__filters");

  if (!container || !filtersContainer) {
    return;
  }

  fetch("./assets/portfolio.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el portafolio");
      }
      return response.json();
    })
    .then((data) => {
      portfolioData = Array.isArray(data) ? data : [];
      buildPortfolioFilters(filtersContainer, container);
    })
    .catch((error) => {
      console.warn(
        "[Portafolio] Usando datos locales de respaldo:",
        error.message
      );
      portfolioData = defaultPortfolioData.slice();
      buildPortfolioFilters(filtersContainer, container);
    });
}

function buildPortfolioFilters(filtersContainer, container) {
  filtersContainer.innerHTML = "";

  // Crear filtros por categoría
  portfolioData.forEach((group, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "portfolio__filter" + (index === 0 ? " portfolio__filter--active" : "");
    button.textContent = group.category;
    button.dataset.category = group.category;
    filtersContainer.appendChild(button);
  });

  filtersContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".portfolio__filter");
    if (!button) return;

    const category = button.dataset.category;
    document
      .querySelectorAll(".portfolio__filter")
      .forEach((el) => el.classList.remove("portfolio__filter--active"));
    button.classList.add("portfolio__filter--active");

    renderPortfolioGallery(container, category);
  });

  // Render inicial con la primera categoría
  renderPortfolioGallery(container, portfolioData[0]?.category);
}

function renderPortfolioGallery(container, category) {
  container.innerHTML = "";

  const group = portfolioData.find((item) => item.category === category);
  if (!group) return;

  group.subcategories.forEach((sub) => {
    const section = document.createElement("div");
    section.className = "portfolio__subcategory";

    const title = document.createElement("h3");
    title.className = "portfolio__subcategory-title";
    title.textContent = sub.name;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "portfolio__grid portfolio__grid--gallery";

    sub.projects.forEach((project) => {
      const item = document.createElement("article");
      item.className = "portfolio__item card portfolio-card";

      const figure = document.createElement("figure");
      figure.className = "portfolio-card__figure";

      const img = document.createElement("img");
      img.className = "portfolio-card__image";
      img.src = project.image;
      img.alt = project.name;

      const overlay = document.createElement("div");
      overlay.className = "portfolio-card__overlay";

      const title = document.createElement("h4");
      title.className = "portfolio-card__title";
      title.textContent = project.name;

      const description = document.createElement("p");
      description.className = "portfolio-card__description";
      description.textContent =
        project.description || "Solución tecnológica desarrollada por Quipro.";

      overlay.appendChild(title);
      overlay.appendChild(description);

      figure.appendChild(img);
      figure.appendChild(overlay);
      item.appendChild(figure);

      grid.appendChild(item);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}
