/* =========================================================
   PORTAFOLIO DE GABRIEL CHÁVEZ · JAVASCRIPT
   01 Tema · 02 Color · 03 Visor del CV
   NOTA: Las tarjetas de proyectos son HTML estático;
   no requieren tocar este archivo para añadir proyectos.
   ========================================================= */

/* 01. MODO OSCURO / CLARO */
const toggleTheme = document.getElementById("toggle-theme");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText = document.getElementById("toggle-text");

function updateTheme() {
  const isDark = document.body.classList.contains("dark");
  if (toggleIcon)
    toggleIcon.src = isDark ? "assets/icons/moon.svg" : "assets/icons/sun.svg";
  if (toggleText)
    toggleText.textContent = isDark ? "Modo oscuro" : "Modo claro";
  if (toggleTheme) {
    toggleTheme.setAttribute("aria-pressed", String(isDark));
    toggleTheme.setAttribute(
      "aria-label",
      isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro",
    );
  }
}

try {
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  if (savedTheme === "light") document.body.classList.remove("dark");
} catch (error) {
  // El tema inicial funciona incluso sin almacenamiento del navegador.
}
updateTheme();

if (toggleTheme) {
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    try {
      localStorage.setItem(
        "portfolio-theme",
        document.body.classList.contains("dark") ? "dark" : "light",
      );
    } catch (error) {
      // El cambio visual sigue funcionando sin localStorage.
    }
    updateTheme();
  });
}

/* 02. COLORES PRINCIPALES */
const toggleColors = document.getElementById("toggle-colors");
const rootStyles = document.documentElement.style;

function updateColorSelection(color) {
  if (!toggleColors) return;
  toggleColors.querySelectorAll("[data-color]").forEach((item) => {
    item.setAttribute("aria-pressed", String(item.dataset.color === color));
  });
}

try {
  const savedColor = localStorage.getItem("portfolio-color");
  if (
    savedColor &&
    toggleColors?.querySelector('[data-color="' + savedColor + '"]')
  ) {
    rootStyles.setProperty("--primary-color", savedColor);
    updateColorSelection(savedColor);
  } else {
    updateColorSelection("hsl(214, 84%, 56%)");
  }
} catch (error) {
  updateColorSelection("hsl(214, 84%, 56%)");
}

if (toggleColors) {
  toggleColors.addEventListener("click", (event) => {
    const option = event.target.closest("[data-color]");
    if (!option || !toggleColors.contains(option)) return;
    const selectedColor = option.dataset.color;
    rootStyles.setProperty("--primary-color", selectedColor);
    updateColorSelection(selectedColor);
    try {
      localStorage.setItem("portfolio-color", selectedColor);
    } catch (error) {
      // El selector funciona aunque no sea posible guardar la preferencia.
    }
  });
}

/* 03. VENTANA EMERGENTE DEL CURRÍCULUM */
const cvModal = document.getElementById("cv-modal");
const openCv = document.getElementById("open-cv");
const closeCv = document.getElementById("close-cv");

if (cvModal && openCv && closeCv) {
  openCv.addEventListener("click", () => {
    if (!cvModal.open) cvModal.showModal();
  });

  closeCv.addEventListener("click", () => cvModal.close());

  // Click fuera del rectángulo del dialog (sobre el fondo oscurecido).
  cvModal.addEventListener("click", (event) => {
    const rect = cvModal.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (outside) cvModal.close();
  });
  // La tecla Esc se gestiona automáticamente por <dialog>.
}
