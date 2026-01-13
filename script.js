const toggleButton = document.getElementById("theme-toggle");

//ladda o spara tema
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light mode";
}

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleButton.textContent = "☀️ Light mode";
    } else {
        localStorage.setItem("theme", "light");
        toggleButton.textContent = "🌙 Dark mode";
    }
});