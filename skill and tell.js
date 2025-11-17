document.addEventListener("DOMContentLoaded", () => {
  const SkillTell = {
    clubName: "Skill & Tell",
    cardClass: ".department-card",
    commentContainer: "#comments",
    postForm: null,  // No admin posts here
    postsContainer: null,
    trailContainer: "#trail-container",
    commentKey: "skillTellComments",
    postKey: null
  };

  // ===== Department card toggle =====
  const cards = document.querySelectorAll(SkillTell.cardClass);
  cards.forEach(card => {
    const front = card.querySelector(".front-content");
    const back = card.querySelector(".back-content");
    const openBtn = front.querySelector(".open-btn");
    const backBtn = back.querySelector(".back-btn");

    openBtn.addEventListener("click", e => {
      e.stopPropagation();
      front.style.display = "none";
      back.style.display = "block";
    });

    backBtn.addEventListener("click", e => {
      e.stopPropagation();
      back.style.display = "none";
      front.style.display = "block";
    });
  });

  // ===== Comment system =====
  const commentsSection = document.querySelector(SkillTell.commentContainer);
  if (commentsSection) {
    const form = commentsSection.querySelector("form");
    let savedComments = JSON.parse(localStorage.getItem(SkillTell.commentKey) || "[]");

    function renderComments() {
      commentsSection.querySelectorAll(".user-comment").forEach(c => c.remove());
      savedComments.forEach((c, i) => {
        const div = document.createElement("div");
        div.classList.add("user-comment");
        div.innerHTML = `<strong>${c.name}:</strong><p>${c.text}</p>
          <button data-index="${i}" class="delete-comment">Delete</button>`;
        commentsSection.appendChild(div);

        div.querySelector(".delete-comment").addEventListener("click", (e) => {
          const idx = e.target.dataset.index;
          savedComments.splice(idx, 1);
          localStorage.setItem(SkillTell.commentKey, JSON.stringify(savedComments));
          renderComments();
        });
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements["name"].value.trim();
      const text = form.elements["comment"].value.trim();
      if (name && text) {
        savedComments.push({ name, text });
        localStorage.setItem(SkillTell.commentKey, JSON.stringify(savedComments));
        renderComments();
        form.reset();
      }
    });

    renderComments();

    setTimeout(() => {
      commentsSection.classList.add("active");
      commentsSection.classList.add("float");
    }, 200);
  }

  // ===== Mouse trail effect =====
  const trailContainer = document.querySelector(SkillTell.trailContainer);
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
