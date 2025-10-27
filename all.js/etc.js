document.addEventListener("DOMContentLoaded", function () {
  const departmentContent = {
    ai: "<h3>Artificial Intelligence Department</h3><p>Focuses on AI projects, machine learning, and data science. Members learn to build intelligent models and participate in AI hackathons.</p>",
    sd: "<h3>Software Development Department</h3><p>Works on web, mobile, and desktop app development. Organizes coding workshops and collaborative projects.</p>",
    robotics: "<h3>Robotics Department</h3><p>Builds robots and works on automation, embedded systems, and electronics. Perfect for those passionate about hardware and control systems.</p>",
    design: "<h3>Design Department</h3><p>Responsible for the club’s visual identity — including posters, branding, and event materials. Members learn design tools like Figma and Photoshop.</p>",
    media: "<h3>Media Department</h3><p>Handles photography, videography, and social media promotion for the club’s events and initiatives.</p>",
    hr: "<h3>Human Resources Department</h3><p>Manages recruitment, internal communication, and team-building activities. Ensures smooth collaboration between departments.</p>",
    pr: "<h3>Public Relations Department</h3><p>Builds partnerships, handles collaborations, and coordinates events with other clubs and organizations.</p>"
  };

  const cards = document.querySelectorAll(".department-card");
  const contentBox = document.getElementById("department-content");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const dept = card.getAttribute("data-dept");
      contentBox.innerHTML = departmentContent[dept];
      contentBox.style.display = "block";
      contentBox.scrollIntoView({ behavior: "smooth" });
    });
  });
});
