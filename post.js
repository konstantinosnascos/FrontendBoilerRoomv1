// ===== HÄMTA ALLA INLÄGG =====
function getAllPosts() {
    const savedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    return [...blogPosts, ...savedPosts];
}

// ===== HÄMTA POST-ID FRÅN URL =====
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

// ===== HITTA RÄTT POST =====
const allPosts = getAllPosts();
const post = allPosts.find(p => p.id === postId);

// ===== RENDERA SINGLE POST =====
const singlePostContainer = document.getElementById("single-post");
const authorBio = document.getElementById("author-bio");
const relatedPostsContainer = document.getElementById("related-posts");

if (post && singlePostContainer) {
    document.title = `${post.title} - Campus Blog`;

    singlePostContainer.innerHTML = `
        <div class="post-hero">
            <img src="${post.image}" alt="${post.title}" class="post-hero-image">
        </div>
        <header class="post-single-header">
            <span class="post-category-tag">${post.category}</span>
            <h1>${post.title}</h1>
            <div class="post-meta">
                <span class="post-author">Av ${post.author}</span>
                <span class="post-date">${new Date(post.date).toLocaleDateString("sv-SE")}</span>
            </div>
        </header>
        <div class="post-content">
            <p class="post-excerpt">${post.excerpt}</p>
            <p>${post.content}</p>
        </div>
    `;

    if (authorBio) {
        authorBio.textContent = `${post.author} är en erfaren skribent inom ${post.category.toLowerCase()}.`;
    }

    if (relatedPostsContainer) {
        const relatedPosts = allPosts
            .filter(p => p.category === post.category && p.id !== post.id)
            .slice(0, 2);

        if (relatedPosts.length > 0) {
            relatedPosts.forEach(relatedPost => {
                const article = document.createElement("article");
                article.className = "related-post-card";
                article.innerHTML = `
                    <a href="post.html?id=${relatedPost.id}">
                        <h4>${relatedPost.title}</h4>
                        <p>${relatedPost.excerpt}</p>
                    </a>
                `;
                relatedPostsContainer.appendChild(article);
            });
        } else {
            relatedPostsContainer.innerHTML = "<p>Inga relaterade inlägg.</p>";
        }
    }

} else if (singlePostContainer) {
    singlePostContainer.innerHTML = `
        <div class="post-not-found">
            <h1>Inlägget hittades inte</h1>
            <p>Tyvärr kunde vi inte hitta inlägget du letade efter.</p>
            <a href="index.html" class="back-button">← Tillbaka till startsidan</a>
        </div>
    `;
}

// ===== THEME TOGGLE =====
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

console.log("post.js laddad!");