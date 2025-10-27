document.addEventListener("DOMContentLoaded", function () {
  const departments = {
    ai: "Focuses on AI, Machine Learning, and Data Science projects, helping members explore neural networks and automation.",
    sd: "Develops websites, mobile apps, and software tools through coding workshops and hackathons.",
    robotics: "Explores IoT and embedded systems by creating intelligent devices and prototypes.",
    design: "Creates visuals, posters, and UI/UX designs for GDJ projects and events.",
    media: "Handles photography, videography, and social media to promote club activities.",
    hr: "Manages recruitment, organizes internal events, and ensures team cohesion.",
    pr: "Builds partnerships, organizes DevFests, and collaborates with other clubs and organizations."
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
