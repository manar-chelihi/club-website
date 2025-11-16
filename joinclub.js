// join.js

document.addEventListener('DOMContentLoaded', () => {

    const clubs = {
        escc: "ENSIA Sport & Culture Club",
        gdg: "Google Developer Group",
        ebec: "ENSIA Business and Engineering Club",
        skilltell: "Skill & Tell",
        secai: "Security & Artificial Intelligence Club",
        etc: "ENSIA Tech Community"
    };

    const clubId = localStorage.getItem("selectedClub");
    if(!clubId){console.log("error in getting club id from local storage")}
    
    const clubName = clubs[clubId];

    const title = document.querySelector('.form-title');  
    if (title) {
        title.textContent = `Join ${clubName} By Filling the Form Below`;
    }

    const form = document.querySelector('.join-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fnameInput = document.getElementById('fname');
        const lnameInput = document.getElementById('lname');
        const emailInput = document.getElementById('email');
        const studentIdInput = document.getElementById('student-id');
        const deptSection = document.querySelector('.dept-section');

        const fname = fnameInput.value.trim();
        const lname = lnameInput.value.trim();
        const email = emailInput.value.trim();
        const studentId = studentIdInput.value.trim();

        // DEPARTMENTS
        const selectedDepartments = [];
        document.querySelectorAll('.dept:checked').forEach(cb => {
            selectedDepartments.push(cb.value.trim());
        });

        // VALIDATIONS  
        if (!fname) setErrorFor(fnameInput, 'Name cannot be blank');
        else setSuccessFor(fnameInput);

        if (!lname) setErrorFor(lnameInput, 'Name cannot be blank');
        else setSuccessFor(lnameInput);

        if (!email) setErrorFor(emailInput, 'Email cannot be blank');
        else if (!isEmail(email)) setErrorFor(emailInput, "Email is not valid");
        else setSuccessFor(emailInput);

        if (!studentId) setErrorFor(studentIdInput, 'student ID cannot be blank');
        else setSuccessFor(studentIdInput);

        if (selectedDepartments.length === 0)
            setErrorFor(deptSection, 'Select at least one Department');
        else
            setSuccessFor(deptSection);

       
        if (fname && lname && email && isEmail(email) && studentId && selectedDepartments.length > 0) {

            localStorage.setItem(`${clubId}_isMember`, 'true');
            localStorage.setItem('firstname', fname);
            localStorage.setItem('lastname', lname);
            localStorage.setItem('email', email);       
            localStorage.setItem('studentId', studentId);
            localStorage.setItem('memberDepartments', JSON.stringify(selectedDepartments));

            alert("Form submitted successfully!");
            window.location.href = `${clubId}.html`; 
        }
    });

    function setErrorFor(element, message) {
        let small;

        if (element.tagName === 'INPUT') {
            small = element.nextElementSibling;
        } else {
            small = element.querySelector('small:last-child');
        }

        element.classList.add('error');
        element.classList.remove('success');

        if (small) small.innerText = message;
    }

    function setSuccessFor(element) {
        let small;

        if (element.tagName === 'INPUT') {
            small = element.nextElementSibling;
        } else {
            small = element.querySelector('small:last-child');
        }

        element.classList.remove('error');
        element.classList.add('success');

        if (small) small.innerText = '';
    }

    function isEmail(email) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
    }

});
