document.addEventListener("DOMContentLoaded", () => {
  const clubCards = document.querySelectorAll(".club-card");

  // Loop through every club card
  clubCards.forEach((card) => {
    const joinBtn = card.querySelector(".join-btn");
    const leaveBtn = card.querySelector(".leave-btn");
    const clubImg = card.querySelector(".club-image");
    const clubName = card.getAttribute("data-club");



    // Check if user is already a member of this specific club
    const isMember = localStorage.getItem(`${clubName}_isMember`) === "true";

    // Toggle buttons based on membership
    if (isMember) {
      joinBtn.style.display = "none";
      leaveBtn.style.display = "inline-block";
    } else {
      joinBtn.style.display = "inline-block";
      leaveBtn.style.display = "none";
    }

    // When click "Join"
    joinBtn.addEventListener("click", () => {
      localStorage.setItem(`${clubName}_isMember`, "true");
      window.location.href = "formpage.html";
    });

    // When click "Leave"
    leaveBtn.addEventListener("click", () => {
      localStorage.setItem(`${clubName}_isMember`, "false");
      alert("You left the club!");
      window.location.reload();
    });

    // When click on the club image
    clubImg.addEventListener("click", () => {
      if (isMember) {
        window.location.href = "clubpage.html";
      } else {
        alert("Please join the club to access this page.");
        window.location.href = "formpage.html";
      }
    });
  });
});
