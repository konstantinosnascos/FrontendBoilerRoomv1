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
        .map(
          (post) => `
          <article class="post-card">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="/post.html?id=${post.id}">Läs mer</a>
          </article>
        `
        )
        .join("");
    } catch (err) {
      console.error(err);
      postsContainer.innerHTML = "<p>Kunde inte ladda inlägg.</p>";
    }
  }

  loadPosts();
});
