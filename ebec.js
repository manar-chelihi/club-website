document.addEventListener("DOMContentLoaded", () => {
  // ===== Department card toggle =====
  const cards = document.querySelectorAll(".department-card");
  cards.forEach(card => {
    const frontContent = card.querySelector(".front-content");
    const backContent = card.querySelector(".back-content");
    const openBtn = frontContent.querySelector(".open-btn");
    const backBtn = backContent.querySelector(".back-btn");

    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      frontContent.style.display = "none";
      backContent.style.display = "block";
    });

    backBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      backContent.style.display = "none";
      frontContent.style.display = "block";
    });
  });

  // ===== Comment system =====
  const comments = document.getElementById('comments');
  if (comments) {
    const commentForm = comments.querySelector("form");
    const storageKey = "ebecComments";
    let savedComments = JSON.parse(localStorage.getItem(storageKey) || "[]");

    // Load existing comments
    savedComments.forEach(c => {
      const newComment = document.createElement("div");
      newComment.classList.add("user-comment");
      newComment.innerHTML = `<strong>${c.name}:</strong> <p>${c.text}</p>`;
      commentForm.after(newComment);
    });

    // Animate comments
    setTimeout(() => {
      comments.classList.add('active');
      comments.classList.add('float');
    }, 200);

    // Submit new comment
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = commentForm.elements["name"].value.trim();
      const commentText = commentForm.elements["comment"].value.trim();

      if (name && commentText) {
        savedComments.push({ name, text: commentText });
        localStorage.setItem(storageKey, JSON.stringify(savedComments));

        const newComment = document.createElement("div");
        newComment.classList.add("user-comment");
        newComment.innerHTML = `<strong>${name}:</strong> <p>${commentText}</p>`;
        commentForm.after(newComment);

        commentForm.reset();
      }
    });
  }

  // ===== Admin Post Form to Local Storage =====
  const postForm = document.getElementById("postForm");
  const postsContainer = document.getElementById("posts");
  const postsKey = "ebecPosts"; // unique key for this club
  let savedPosts = JSON.parse(localStorage.getItem(postsKey) || "[]");

  // Display existing posts
  if (postsContainer) {
    savedPosts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" alt="${post.title}" style="max-width:300px;">` : ''}
        <small>${post.date}</small>
      `;
      postsContainer.appendChild(postDiv);
    });
  }

  // Handle new post submission
  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = postForm.elements["event"].value.trim();
      const content = postForm.elements["description"].value.trim();
      const imageInput = postForm.elements["image"];

      if (!title || !content) return;

      // Handle image file
      if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const imageURL = e.target.result;
          savePost(title, content, imageURL);
        }
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        savePost(title, content, "");
      }

      postForm.reset();
    });
  }

  function savePost(title, content, image) {
    const newPost = { title, content, image, date: new Date().toLocaleString() };
    savedPosts.push(newPost);
    localStorage.setItem(postsKey, JSON.stringify(savedPosts));

    if (postsContainer) {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <h3>${newPost.title}</h3>
        <p>${newPost.content}</p>
        ${newPost.image ? `<img src="${newPost.image}" alt="${newPost.title}" style="max-width:300px;">` : ''}
        <small>${newPost.date}</small>
      `;
      postsContainer.appendChild(postDiv);
    }

    alert("Post added successfully!");
  }

  // ===== Mouse trail animation =====
  const trailContainer = document.getElementById('trail-container');
  const colors = ['#ff0077', '#495a92ff', '#ffcc00', '#72b6d1ff', '#ff6600', '#9933ff'];

  if (trailContainer) {
    document.addEventListener('mousemove', (e) => {
      const dot = document.createElement('div');
      dot.classList.add('trail');
      dot.style.background = colors[Math.floor(Math.random() * colors.length)];
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      trailContainer.appendChild(dot);
      setTimeout(() => dot.remove(), 800);
    });
  }

});
