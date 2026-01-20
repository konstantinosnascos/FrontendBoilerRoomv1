document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blog-posts");
  if (!container) return;

  container.innerHTML = "";

  blogPosts.forEach(post => {
    const article = document.createElement("article");
    article.className = "post-card";

    article.innerHTML = `
      <div class="post-header">
        <h3>
          <a href="post.html?id=${post.id}">${post.title}</a>
        </h3>
      </div>
      <div class="post-body">
        <p class="blogger">${post.author}</p>
        <p class="date">${new Date(post.date).toLocaleDateString("sv-SE")}</p>
        <p class="description">${post.excerpt}</p>
      </div>
    `;

    container.appendChild(article);
  });
});
