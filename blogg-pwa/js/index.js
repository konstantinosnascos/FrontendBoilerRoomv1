document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.querySelector("#blog-posts");

  if (!postsContainer) {
    console.warn("Hittar inte #blog-posts");
    return;
  }

  async function loadPosts() {
    try {
      const res = await fetch("http://localhost:3000/posts");
      if (!res.ok) throw new Error("Fetch misslyckades");

      const posts = await res.json();

      postsContainer.innerHTML = posts
        .map((post) => `
          <article class="post-card">
            <div class="post-header">
              <h3>${post.title}</h3>
            </div>

            <div class="post-body">
              ${post.image ? `<img class="post-image" src="${post.image}" alt="">` : ""}

              <p class="blogger">${post.author ?? ""}</p>
              <p class="date">${post.date ? new Date(post.date).toLocaleDateString("sv-SE") : ""}</p>

              <p class="description">${post.excerpt ?? ""}</p>

              <a class="read-more" href="/post.html?id=${post.id}">Läs mer</a>
            </div>
          </article>
        `)

        .join("");
    } catch (err) {
      console.error(err);
      postsContainer.innerHTML = "<p>Kunde inte ladda inlägg.</p>";
    }
  }

  loadPosts();
});
