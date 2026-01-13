// 1. Hämta id från URL
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// 2. Hitta rätt inlägg
const post = blogPosts.find(p => p.id === postId);

// 3. Om inget inlägg hittas – visa fallback men behåll layouten
if (!post) {
  document.getElementById("post-image").style.display = "none";

  document.getElementById("post-title").textContent = "Inlägget hittades inte";
  document.getElementById("post-author").textContent = "Okänd";
  document.getElementById("post-date").textContent = "";
  document.getElementById("post-category").textContent = "";

  document.getElementById("post-content").innerHTML = `
    <p>Tyvärr kunde vi inte hitta det här inlägget.</p>
    <p><a href="index.html">Tillbaka till startsidan</a></p>
  `;
} else {

  // 4. Fyll HTML med data
  document.getElementById("post-image").src = post.Image;
  document.getElementById("post-image").alt = post.title;

  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-author").textContent = post.author;

  const dateEl = document.getElementById("post-date");
  dateEl.textContent = new Date(post.date).toLocaleDateString("sv-SE");
  dateEl.setAttribute("datetime", post.date);

  document.getElementById("post-category").textContent = post.category;
  document.getElementById("post-content").innerHTML = post.content;
}
