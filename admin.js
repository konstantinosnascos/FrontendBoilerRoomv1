// ===== ADMIN FUNKTIONALITET =====

const postForm = document.getElementById("post-form");
const editIdInput = document.getElementById("edit-id");
const titleInput = document.getElementById("post-title");
const authorInput = document.getElementById("post-author");
const categoryInput = document.getElementById("post-category");
const imageInput = document.getElementById("post-image");
const excerptInput = document.getElementById("post-excerpt");
const contentInput = document.getElementById("post-content");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formMessage = document.getElementById("form-message");
const adminPostsList = document.getElementById("admin-posts-list");

const defaultImage = "https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png";

// ===== HÄMTA ALLA INLÄGG =====
function getAllPosts() {
    const savedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    return [...blogPosts, ...savedPosts];
}

// ===== HÄMTA ANVÄNDARENS INLÄGG =====
function getUserPosts() {
    return JSON.parse(localStorage.getItem("userPosts")) || [];
}

// ===== SPARA INLÄGG =====
function saveUserPosts(posts) {
    localStorage.setItem("userPosts", JSON.stringify(posts));
}

// ===== GENERERA ID =====
function generateId() {
    return "user-post-" + Date.now();
}

// ===== RENDERA ADMIN-LISTA =====
function renderAdminPosts() {
    if (!adminPostsList) return;

    const allPosts = getAllPosts();
    adminPostsList.innerHTML = "";

    if (allPosts.length === 0) {
        adminPostsList.innerHTML = "<p>Inga inlägg finns.</p>";
        return;
    }

    allPosts.forEach(post => {
        const isUserPost = post.id.startsWith("user-post-");

        const postDiv = document.createElement("div");
        postDiv.className = "admin-post-item";

        postDiv.innerHTML = `
            <div class="admin-post-info">
                <h3>${post.title}</h3>
                <p class="admin-post-meta">
                    <span>${post.author}</span> • 
                    <span>${post.category}</span> • 
                    <span>${new Date(post.date).toLocaleDateString("sv-SE")}</span>
                </p>
                <p class="admin-post-excerpt">${post.excerpt}</p>
            </div>
            <div class="admin-post-actions">
                <a href="post.html?id=${post.id}" class="btn btn-small btn-view" target="_blank">Visa</a>
                ${isUserPost ? `
                    <button class="btn btn-small btn-edit" data-id="${post.id}">Redigera</button>
                    <button class="btn btn-small btn-delete" data-id="${post.id}">Ta bort</button>
                ` : `
                    <span class="original-badge">Original</span>
                `}
            </div>
        `;

        adminPostsList.appendChild(postDiv);
    });

    addAdminButtonListeners();
}

// ===== KNAPP-LYSSNARE =====
function addAdminButtonListeners() {
    document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", () => editPost(btn.dataset.id));
    });

    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", () => deletePost(btn.dataset.id));
    });
}

// ===== SKAPA/UPPDATERA INLÄGG =====
function handleSubmit(e) {
    e.preventDefault();

    const editId = editIdInput.value;
    const userPosts = getUserPosts();

    const existingPost = editId ? userPosts.find(p => p.id === editId) : null;

    const newPost = {
        id: editId || generateId(),
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        category: categoryInput.value,
        image: imageInput.value.trim() || defaultImage,
        excerpt: excerptInput.value.trim(),
        content: contentInput.value.trim(),
        date: existingPost ? existingPost.date : new Date().toISOString().split("T")[0]
    };

    if (editId) {
        const index = userPosts.findIndex(p => p.id === editId);
        if (index !== -1) {
            userPosts[index] = newPost;
            showMessage("Inlägg uppdaterat!", "green");
        }
    } else {
        userPosts.push(newPost);
        showMessage("Inlägg publicerat!", "green");
    }

    saveUserPosts(userPosts);
    resetForm();
    renderAdminPosts();
}

// ===== REDIGERA =====
function editPost(postId) {
    const allPosts = getAllPosts();
    const post = allPosts.find(p => p.id === postId);

    if (!post) return;

    editIdInput.value = post.id;
    titleInput.value = post.title;
    authorInput.value = post.author;
    categoryInput.value = post.category;
    imageInput.value = post.image === defaultImage ? "" : post.image;
    excerptInput.value = post.excerpt;
    contentInput.value = post.content;

    submitBtn.textContent = "Uppdatera";
    cancelBtn.style.display = "inline-block";

    postForm.scrollIntoView({ behavior: "smooth" });
}

// ===== TA BORT =====
function deletePost(postId) {
    if (!confirm("Är du säker på att du vill ta bort detta inlägg?")) return;

    let userPosts = getUserPosts();
    userPosts = userPosts.filter(p => p.id !== postId);
    saveUserPosts(userPosts);

    showMessage("Inlägg borttaget!", "orange");
    renderAdminPosts();
}

// ===== ÅTERSTÄLL FORMULÄR =====
function resetForm() {
    postForm.reset();
    editIdInput.value = "";
    submitBtn.textContent = "Publicera";
    cancelBtn.style.display = "none";
}

// ===== VISA MEDDELANDE =====
function showMessage(text, color) {
    formMessage.textContent = text;
    formMessage.style.color = color;
    setTimeout(() => formMessage.textContent = "", 3000);
}

// ===== EVENT LISTENERS =====
if (postForm) postForm.addEventListener("submit", handleSubmit);
if (cancelBtn) cancelBtn.addEventListener("click", resetForm);

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

// ===== INIT =====
renderAdminPosts();
console.log("admin.js laddad!");