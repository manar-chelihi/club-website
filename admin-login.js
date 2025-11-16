document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  if (!form) return;

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  //defien my admins
  const admins = {
    "chelihimanar38@gmail.com": { password: "manar123456789", role: "super" },
    "admin1@gmail.com": { password: "admin12345", role: "normal" },
    "admin2@gmail.com": { password: "admin45678", role: "normal" }
  };

  //live validation
  emailInput.addEventListener('input', () => {
    if (!isEmail(emailInput.value.trim())) setError(emailInput, "Email is not valid");
    else setSuccess(emailInput);
  });

  passwordInput.addEventListener('input', () => {
    if (!isPassword(passwordInput.value.trim())) setError(passwordInput, "Invalid Password");
    else setSuccess(passwordInput);
  });


  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let valid = true;

    // Format validation
    if (!isEmail(email)) { setError(emailInput, "Email is not valid"); valid = false; }
    else setSuccess(emailInput);

    if (!isPassword(password)) { setError(passwordInput, "Password must be at least 8 chars with letters & numbers"); valid = false; }
    else setSuccess(passwordInput);

    if (!valid) return; 

    // Credential check
    const user = admins[email];
    if (!user || user.password !== password) {
      alert("Wrong email or password. Please try again.");
      form.reset();
      emailInput.classList.remove('error', 'success');
      passwordInput.classList.remove('error', 'success');
      return;
    }

    alert(`Welcome ${email}!`);
    localStorage.setItem('isAdmin', "true");
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminRole', user.role);

    if (user.role === "super") window.location.href = "super_admin.html";
    else window.location.href = "admin.html";
  });
});

function setError(input, message) {
  const small = input.nextElementSibling;
  input.classList.add('error');
  input.classList.remove('success');
  if (small) small.innerText = message;
}

function setSuccess(input) {
  const small = input.nextElementSibling;
  input.classList.remove('error');
  input.classList.add('success');
  if (small) small.innerText = '';
}

function isEmail(email) {
  return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
}

function isPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}
