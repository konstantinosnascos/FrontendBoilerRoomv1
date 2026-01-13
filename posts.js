// ===== 1. ORIGINAL BLOG DATA =====
const blogPosts = [
    {
        id: "post-1",
        title: "Tillgänglighet på webben",
        excerpt: "En introduktion till varför tillgänglighet är viktigt på webben.",
        content: "Tillgänglighet på webben handlar om att skapa lösningar som kan användas av alla, oavsett funktionsvariation.",
        author: "Anna Svensson",
        date: "2025-01-05",
        category: "Webbutveckling",
        image: "https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"
    },
    {
        id: "post-2",
        title: "Semantisk HTML",
        excerpt: "Hur rätt HTML-element förbättrar tillgänglighet.",
        content: "Semantiska element som article, header och nav gör innehållet mer begripligt för skärmläsare.",
        author: "Erik Johansson",
        date: "2025-01-08",
        category: "HTML",
        image: "https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"
    },
    {
        id: "post-3",
        title: "Färgkontrast och läsbarhet",
        excerpt: "Färgval påverkar hur lätt text kan läsas.",
        content: "WCAG kräver tillräcklig kontrast mellan text och bakgrund.",
        author: "Lina Berg",
        date: "2025-01-12",
        category: "Design",
        image: "https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"
    },
    {
        id: "post-4",
        title: "Rubrikstruktur",
        excerpt: "Så skapar du en logisk struktur med rubriker.",
        content: "En korrekt rubrikstruktur gör det möjligt för användare att snabbt navigera.",
        author: "Johan Nilsson",
        date: "2025-01-15",
        category: "Tillgänglighet",
        image: "https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"
    },
    {
        id: "post-5",
        title: "Alt-texter för bilder",
        excerpt: "Beskriv bilder så att alla förstår.",
        content: "Alt-texter är nödvändiga för användare som inte kan se bilder.",
        author: "Sara Lund",
        date: "2025-01-18",
        category: "WCAG",
        image: "https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"
    },
    {
        id: "post-6",
        title: "Tangentbordsnavigering",
        excerpt: "Alla funktioner ska fungera utan mus.",
        content: "Webbplatser måste vara fullt användbara med tangentbord.",
        author: "Markus Holm",
        date: "2025-01-22",
        category: "UX",
        image: "https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"
    }
];

// ===== 2. HÄMTA ALLA INLÄGG (original + sparade) =====
function getAllPosts() {
    const savedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    return [...blogPosts, ...savedPosts];
}

// ===== 3. RENDER POSTS =====
const container = document.getElementById("blog-posts");

function renderPosts(posts) {
    if (!container) return;

    container.innerHTML = "";
    const postsToRender = posts || getAllPosts();

    postsToRender.forEach(post => {
        const article = document.createElement("article");
        article.className = "post-card";
        article.id = post.id;
        article.dataset.category = post.category;

        article.innerHTML = `
            <a href="post.html?id=${post.id}" class="post-card-link">
                <div class="post-header">
                    <h3>${post.title}</h3>
                </div>
                <div class="post-body">
                    <p class="blogger">${post.author}</p>
                    <p class="date">${new Date(post.date).toLocaleDateString("sv-SE")}</p>
                    <p class="category">${post.category}</p>
                    <p class="description">${post.excerpt}</p>
                    <img src="${post.image}" alt="${post.title}" class="post-image">
                </div>
            </a>
        `;

        container.appendChild(article);
    });
}

if (container) {
    renderPosts(getAllPosts());
}

// ===== 4. POPULAR POSTS =====
function renderPopularPosts() {
    const popularContainer = document.getElementById("popular-posts");
    if (!popularContainer) return;

    const allPosts = getAllPosts();
    const popularPosts = [allPosts[0], allPosts[4]].filter(Boolean);

    popularContainer.innerHTML = "";

    popularPosts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post-card";

        article.innerHTML = `
            <a href="post.html?id=${post.id}" class="post-card-link">
                <div class="post-header">
                    <h3>${post.title}</h3>
                </div>
                <div class="post-body">
                    <p class="description">${post.excerpt}</p>
                </div>
            </a>
        `;

        popularContainer.appendChild(article);
    });
}

renderPopularPosts();

// ===== 5. CATEGORY FILTER =====
const categoryOptions = document.querySelectorAll(".category-option");

categoryOptions.forEach(option => {
    option.addEventListener("click", () => {
        categoryOptions.forEach(opt => opt.classList.remove("active"));
        option.classList.add("active");

        const selectedCategory = option.dataset.category;
        const allPosts = getAllPosts();

        if (selectedCategory === "all") {
            renderPosts(allPosts);
        } else {
            const filteredPosts = allPosts.filter(post => post.category === selectedCategory);
            renderPosts(filteredPosts);
        }
    });
});

// ===== 6. THEME TOGGLE =====
const toggleButton = document.getElementById("theme-toggle");

if (toggleButton) {
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
}

// ===== 7. SUBSCRIBE =====
const subscribeBtn = document.getElementById("subscribe-btn");
const unsubscribeBtn = document.getElementById("unsubscribe-btn");
const emailInput = document.getElementById("subscribe-mail");
const message = document.getElementById("subscription-message");

if (message) {
    const savedEmail = localStorage.getItem("subscribedEmail");
    if (savedEmail) {
        message.textContent = `Du prenumererar med: ${savedEmail}`;
        message.style.color = "green";
    }
}

if (subscribeBtn) {
    subscribeBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();

        if (email === "") {
            message.textContent = "Ange en e-postadress!";
            message.style.color = "red";
            return;
        }

        if (!email.includes("@")) {
            message.textContent = "Ange en giltig e-postadress!";
            message.style.color = "red";
            return;
        }

        localStorage.setItem("subscribedEmail", email);
        message.textContent = `Tack! Du prenumererar nu med: ${email}`;
        message.style.color = "green";
        emailInput.value = "";
    });
}

if (unsubscribeBtn) {
    unsubscribeBtn.addEventListener("click", () => {
        const savedEmail = localStorage.getItem("subscribedEmail");

        if (savedEmail) {
            localStorage.removeItem("subscribedEmail");
            message.textContent = "Du har avprenumererat.";
            message.style.color = "orange";
        } else {
            message.textContent = "Du har ingen aktiv prenumeration.";
            message.style.color = "red";
        }

        emailInput.value = "";
    });
}

console.log("posts.js laddad!");