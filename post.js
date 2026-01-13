// Säkerställ att DOM och data finns
document.addEventListener("DOMContentLoaded", () => {

  // Kontroll: finns blogPosts?
  if (typeof blogPosts === "undefined") {
    console.error("blogPosts finns inte. Kontrollera att posts.js laddas före post.js");
    return;
  }

  // Hämta id från URL (post.html?id=post-3)
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  // Välj inlägg (fallback = första)
  let selectedPost = blogPosts[0];

  if (postId) {
    const foundPost = blogPosts.find(post => post.id === postId);
    if (foundPost) {
      selectedPost = foundPost;
    }
  }

  //  Hämta element
  const titleEl = document.getElementById("post-title");
  const authorEl = document.getElementById("post-author");
  const dateEl = document.getElementById("post-date");
  const categoryEl = document.getElementById("post-category");
  const contentEl = document.getElementById("post-content");
  const imageEl = document.getElementById("post-image");

  // Säkerhetskoll
  if (!titleEl || !authorEl || !dateEl || !categoryEl || !contentEl || !imageEl) {
    console.error("Ett eller flera HTML-element saknas. Kontrollera id:n i HTML.");
    return;
  }

  // Rendera inlägget
  titleEl.textContent = selectedPost.title;
  authorEl.textContent = selectedPost.author;
  categoryEl.textContent = selectedPost.category;

  dateEl.textContent = new Date(selectedPost.date).toLocaleDateString("sv-SE");
  dateEl.setAttribute("datetime", selectedPost.date);

  contentEl.innerHTML = `
    <p><strong>Kort utdrag:</strong> ${selectedPost.excerpt}</p>
    <p>${selectedPost.content}</p>
  `;

  imageEl.src = selectedPost.Image;
  imageEl.alt = `Bild till inlägget "${selectedPost.title}"`;

  // Uppdatera sidans <title>
  document.title = `${selectedPost.title} | Campus Blog`;
});
