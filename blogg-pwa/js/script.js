document.addEventListener("DOMContentLoaded", () => {
  // ===== DARK MODE =====
  const toggleButton = document.getElementById("theme-toggle");

  // Ladda sparat tema
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Uppdatera knappens text direkt när sidan laddas
  if (toggleButton) {
    toggleButton.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light mode"
      : "🌙 Dark mode";

    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      toggleButton.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
    });
  }
});
