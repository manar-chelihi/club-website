document.addEventListener("DOMContentLoaded", function () {
  const divisions = {
    sports: "Organizes inter-university sports tournaments, fitness sessions and team sports for members of ENSIA.",
    arts: "Coordinates music, dance, theatre and visual-arts performances to showcase student talent and creativity.",
    wellness: "Runs wellness workshops, mindfulness sessions and healthy-lifestyle campaigns for the ENSIA community.",
    culture: "Promotes cultural diversity through festivals, language exchanges and inclusive cultural events.",
   "media-escc": "Manages the club's social media, event photography, video production and promotional content.",
    "hr-escc": "Handles membership recruitment, onboardings, event scheduling and ensures strong member engagement."
  };

  const cards = document.querySelectorAll(".department-card");
  cards.forEach((card) => {
    const title = card.querySelector("h4");
    if (!title) return;
    const id = title.id;
    const originalText = title.textContent;

    card.addEventListener("mouseenter", () => {
      if (divisions[id]) {
        title.textContent = divisions[id];
      }
    });
    card.addEventListener("mouseleave", () => {
      title.textContent = originalText;
    });
  });
});
