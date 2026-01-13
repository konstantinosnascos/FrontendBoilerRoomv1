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

// Subscription form validation: show message if email textarea is empty
document.addEventListener('DOMContentLoaded', () => {
    const mail = document.getElementById('subscribe-mail');
    const buttons = document.querySelectorAll('.subscription-options button');

    function requireEmail() {
        if (!mail || !mail.value.trim()) {
            alert('Please enter your email');
            return false;
        }
        return true;
    }

    if (buttons[0]) {
        buttons[0].addEventListener('click', (e) => {
            e.preventDefault();
            if (!requireEmail()) return;
            alert('Subscribed with ' + mail.value.trim());
        });
    }

    if (buttons[1]) {
        buttons[1].addEventListener('click', (e) => {
            e.preventDefault();
            if (!requireEmail()) return;
            alert('Unsubscribed ' + mail.value.trim());
        });
    }
});