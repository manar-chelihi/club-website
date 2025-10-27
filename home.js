// home.js
// Check user state from localStorage and manage buttons

document.addEventListener("DOMContentLoaded", () => {
  const joinBtn = document.getElementsByClassName("join-btn")[0];
  const leaveBtn = document.getElementsByClassName("leave-btn")[0];
  const clubImg = document.getElementsByClassName("club-image")[0];
  
  // Check if user is already a member
  const isMember = localStorage.getItem("isMember") === "true";

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
    window.location.href = "formpage.html";
  });

  // When click "Leave"
  leaveBtn.addEventListener("click", () => {
    localStorage.setItem("isMember", "false");
    alert("You left the club!");
    window.location.reload(); // Refresh to update button state
  });

  // Redirect when click on club image
  clubImg.addEventListener("click", () => {
    if (isMember) {
      window.location.href = "clubpage.html";
    } else {
      alert("Please join the club to access this page.");
      window.location.href = "formpage.html";
    }
  });
});
