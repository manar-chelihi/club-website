// join.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementsByClassName('join-form')[0];
  if (!form) return; // Safety check

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get data from the form
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const studentId = document.getElementById('student-id').value.trim();

    // Collect selected departments
    const selectedDepartments = [];
    document.querySelectorAll('.dept:checked').forEach((checkbox) => {
      selectedDepartments.push(checkbox.value);
    });

    if (selectedDepartments.length === 0) {
      alert("Please select at least one department.");
      return;
    }

    if (fname && lname && email && studentId) {
      // Store data in localStorage
      localStorage.setItem('isMember', 'true');
      localStorage.setItem('firstname', fname);
      localStorage.setItem('lastname', lname);
      localStorage.setItem('email', email);
      localStorage.setItem('studentId', studentId);
      localStorage.setItem('memberDepartments', JSON.stringify(selectedDepartments));

      alert("Form submitted successfully!");
      window.location.href = "etc.html";
    } else {
      alert('Make sure to fill all boxes.');
    }
  });
});
