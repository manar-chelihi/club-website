document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
        1) DEPARTMENT CARD FLIP
  ============================================================ */
  const cards = document.querySelectorAll(".department-card");
  cards.forEach(card => {
    const frontContent = card.querySelector(".front-content");
    const backContent = card.querySelector(".back-content");
    const openBtn = frontContent.querySelector(".open-btn");
    const backBtn = backContent.querySelector(".back-btn");

    openBtn.addEventListener("click", () => {
      frontContent.style.display = "none";
      backContent.style.display = "block";
    });

    backBtn.addEventListener("click", () => {
      backContent.style.display = "none";
      frontContent.style.display = "block";
    });
  });



  /* ============================================================
        2) COMMENT SYSTEM
  ============================================================ */
  const comments = document.getElementById("comments");

  if (comments) {
    const commentForm = comments.querySelector("form");
    const storageKey = "gdjComments";

    let savedComments = JSON.parse(localStorage.getItem(storageKey) || "[]");

    function createCommentElement(comment, index) {
      const element = document.createElement("div");
      element.classList.add("user-comment");

      element.innerHTML = `
        <strong>${comment.name}:</strong>
        <p>${comment.text}</p>
        <button class="delete-comment" data-index="${index}">Delete</button>
      `;

      element.querySelector(".delete-comment").addEventListener("click", (e) => {
        const i = e.target.dataset.index;
        savedComments.splice(i, 1);
        localStorage.setItem(storageKey, JSON.stringify(savedComments));
        renderComments();
      });

      return element;
    }

    function renderComments() {
      comments.querySelectorAll(".user-comment").forEach(c => c.remove());
      savedComments.forEach((c, i) => commentForm.after(createCommentElement(c, i)));
    }

    renderComments();

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = commentForm.elements["name"].value.trim();
      const text = commentForm.elements["comment"].value.trim();

      if (name && text) {
        savedComments.push({ name, text });
        localStorage.setItem(storageKey, JSON.stringify(savedComments));
        renderComments();
        commentForm.reset();
      }
    });

    setTimeout(() => {
      comments.classList.add("active", "float");
    }, 200);
  }



  /* ============================================================
        3) AUTO POSTS SYSTEM (Admin → GDJ page)
  ============================================================ */
  const postForm = document.getElementById("postForm");
  const postsContainer = document.getElementById("posts");
  const postsKey = "globalPosts";  // global key for all clubs

  let savedPosts = JSON.parse(localStorage.getItem(postsKey) || "[]");

  if (postsContainer) displayPosts();

  function displayPosts() {
    postsContainer.innerHTML = "";

    savedPosts
      .filter(post => post.club === "GDJ")
      .forEach(post => {
        const div = document.createElement("div");
        div.classList.add("post");

        div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          ${post.image ? `<img src="${post.image}" style="max-width:300px;">` : ""}
          <small>${post.date}</small>
        `;

        postsContainer.appendChild(div);
      });
  }

  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = postForm.elements["event"].value.trim();
      const content = postForm.elements["description"].value.trim();
      const imageInput = postForm.elements["image"];

      if (!title || !content) return;

      if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => savePost(title, content, e.target.result);
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        savePost(title, content, "");
      }

      postForm.reset();
    });
  }

  function savePost(title, content, image) {
    const newPost = {
      club: "GDJ",
      title,
      content,
      image,
      date: new Date().toLocaleString()
    };

    savedPosts.unshift(newPost);
    localStorage.setItem(postsKey, JSON.stringify(savedPosts));

    if (postsContainer) displayPosts();
    alert("Post added successfully!");
  }



  /* ============================================================
        4) MOUSE TRAIL EFFECT
  ============================================================ */
  const trailContainer = document.getElementById("trail-container");
  const colors = ["#ff0077", "#495a92ff", "#ffcc00", "#72b6d1ff", "#ff6600", "#9933ff"];

  if (trailContainer) {
    document.addEventListener("mousemove", (e) => {
      const dot = document.createElement("div");
      dot.classList.add("trail");

      dot.style.background = colors[Math.floor(Math.random() * colors.length)];
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";

      trailContainer.appendChild(dot);

      setTimeout(() => dot.remove(), 800);
    });
  }

});
