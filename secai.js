document.addEventListener("DOMContentLoaded", () => {
  const SecAI = {
    clubName: "SecAI",
    cardClass: ".department-card",
    commentContainer: "#comments",
    postForm: "#postForm",
    postsContainer: "#posts",
    trailContainer: "#trail-container",
    commentKey: "secaiComments",
    postKey: "secaiPosts"
  };

  // ===== Department card toggle =====
  const cards = document.querySelectorAll(SecAI.cardClass);
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
  const comments = document.querySelector(SecAI.commentContainer);
  if (comments) {
    const commentForm = comments.querySelector("form");
    let savedComments = JSON.parse(localStorage.getItem(SecAI.commentKey) || "[]");

    function createCommentElement(comment, index) {
      const newComment = document.createElement("div");
      newComment.classList.add("user-comment");
      newComment.innerHTML = `
        <strong>${comment.name}:</strong> <p>${comment.text}</p>
        <button class="delete-comment" data-index="${index}">Delete</button>
      `;
      newComment.querySelector(".delete-comment").addEventListener("click", (e) => {
        const idx = e.target.dataset.index;
        savedComments.splice(idx, 1);
        localStorage.setItem(SecAI.commentKey, JSON.stringify(savedComments));
        renderComments();
      });
      return newComment;
    }

    function renderComments() {
      comments.querySelectorAll(".user-comment").forEach(c => c.remove());
      savedComments.forEach((c, i) => commentForm.after(createCommentElement(c, i)));
    }

    renderComments();

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = commentForm.elements["name"].value.trim();
      const commentText = commentForm.elements["comment"].value.trim();
      if (name && commentText) {
        savedComments.push({ name, text: commentText });
        localStorage.setItem(SecAI.commentKey, JSON.stringify(savedComments));
        renderComments();
        commentForm.reset();
      }
    });

    setTimeout(() => {
      comments.classList.add('active');
      comments.classList.add('float');
    }, 200);
  }

  // ===== Admin Post Form =====
  const postForm = document.querySelector(SecAI.postForm);
  const postsContainer = document.querySelector(SecAI.postsContainer);
  let savedPosts = JSON.parse(localStorage.getItem(SecAI.postKey) || "[]");

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

  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = postForm.elements["event"].value.trim();
      const content = postForm.elements["description"].value.trim();
      const imageInput = postForm.elements["image"];
      if (!title || !content) return;

      if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          savePost(title, content, e.target.result);
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
    localStorage.setItem(SecAI.postKey, JSON.stringify(savedPosts));

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
  const trailContainer = document.querySelector(SecAI.trailContainer);
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
