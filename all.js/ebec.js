document.addEventListener("DOMContentLoaded", function () {
  const departments = {
    ai: "Encourages analytical thinking and problem-solving using business data and technology.",
    sd: "Focuses on digital solutions, app prototypes, and business innovation tools.",
    robotics: "Involves in creative technical projects that support sustainable entrepreneurship.",
    design: "Responsible for visual identity, event branding, and communication materials.",
    media: "Covers photography, video editing, and social media promotion for EBEC events.",
    hr: "Handles recruitment, training, and motivation of members to maintain strong teamwork.",
    pr: "Builds external relations, secures partnerships, and represents EBEC in public events.",
    marketing: "Develops marketing campaigns, promotes EBEC’s image, and manages event visibility."
  };

  const cards = document.querySelectorAll(".department-card");

  cards.forEach((card) => {
    const title = card.querySelector("h4");
    if (!title) return;
    const id = title.id;
    const originalText = title.textContent;

    card.addEventListener("mouseenter", () => {
      title.textContent = departments[id];
    });

    card.addEventListener("mouseleave", () => {
      title.textContent = originalText;
    });
  });
});
