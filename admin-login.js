document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementsByClassName('login-form')[0];
  if (!form) return; // Safety check

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get data from the form
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Define admin accounts
    const admins = {
      "chelihimanar38@gmail.com": { password: "manar", role: "super" },
      "admin1@gmail.com": { password: "admin123", role: "normal" },
      "admin2@gmail.com": { password: "admin456", role: "normal" }
    };

    const user = admins[email];

    // Verify admin credentials
    if (user && user.password === password) {
      alert("Welcome to the Admin page!");
      localStorage.setItem('isAdmin', "true");
      localStorage.setItem('adminEmail', email);
      localStorage.setItem("adminRole", user.role);

       if(user.role === "super"){
        window.location.href = "super_Admin.html";
       }
       else{
         window.location.href = "admin.html";
       }
     
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });
});
