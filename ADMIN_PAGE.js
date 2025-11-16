function scrollToElement(elementId)
{
 const ele = document.getElementById(elementId);
 if(ele ){ele.scrollIntoView({behavior: 'smooth',block:'start'})  }

}
/*document.addEventListener("DOMContentLoaded",function(){

const clubData= JSON.parse(localStorage.getItem("Current"));
if (clubData)
{
document.getElementById("adminNameSpan").textContent = clubData.admin ;
document.getElementById("clubNameSpan").textContent =clubData.name;

}
else{
window.location.href = "form.html"

}


});*/

const items = document.querySelectorAll(".c-g li");

const customEase = CustomEase.create("custom", "M0,0 C0.548,0.032 0.63,1 1,1 ");

const introTween = gsap
  .timeline({
    defaults: {
      duration: 0.48
    }
  })
  .to(".c-g li", {
    "--stop-active": "100%",
    stagger: {
      each: 0.1,
      ease: customEase
    }
  })
  .to(".c-g li", {
    "--stop-hover": "100%",
    stagger: {
      each: 0.1
    }
  })
  .to(
    ".c-g li",
    {
      "--stop-hover": "0%",
      stagger: {
        each: -0.1
      }
    },
    "-=0.1"
  );

gsap.set(items, { "--stop-hover": "0%" });

items.forEach((item, i) => {
  item.addEventListener("mouseenter", function () {
    gsap.to(this, {
      "--stop-hover": "100%",
      ease: customEase,
      duration: 0.36
    });
  });

  item.addEventListener("mouseleave", function () {
    gsap.to(this, {
      "--stop-hover": "0%",
      ease: customEase,
      duration: 0.36
    });
  });
});

/*

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (localStorage.getItem('isAdmin') !== "true") {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    // Add logout functionality
    addLogoutButton();
    
    // Handle your form submissions
    setupYourFormHandlers();
    
    // Load any existing data
    loadExistingData();
});

function addLogoutButton() {
    const sidebar = document.querySelector('.sidebar');
    const logoutItem = document.createElement('div');
    logoutItem.className = 'nav-item';
    logoutItem.innerHTML = '<span onclick="adminLogout()"><p>🚪 Logout</p></span>';
    sidebar.appendChild(logoutItem);
}

function adminLogout() {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('loginTime');
    window.location.href = "login.html";
}

function setupYourFormHandlers() {
    // Handle post form
    const postForm = document.querySelector('#pos form');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            savePostToStorage();
        });
    }

    
    const deptForm = document.querySelector('#shef form');
    if (deptForm) {
        deptForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveDepartmentToStorage();
        });
    }
}

function savePostToStorage() {
    const eventInput = document.querySelector('#pos input[type="text"]');
    const descInput = document.querySelector('#pos textarea');
    
    if (eventInput && descInput) {
        const postData = {
            event: eventInput.value,
            description: descInput.value,
            timestamp: new Date().toISOString(),
            author: localStorage.getItem('adminEmail')
        };
        
      
        let posts = JSON.parse(localStorage.getItem('adminPosts') || '[]');
        posts.push(postData);
        localStorage.setItem('adminPosts', JSON.stringify(posts));
        
        alert('Post saved successfully!');
        eventInput.value = '';
        descInput.value = '';
    }
}

function saveDepartmentToStorage() {
    const completedShef = document.querySelector('#shefcompleted');
    const newShef = document.querySelector('#shefNew');
    
    if (completedShef && newShef) {
        const deptData = {
            completedShef: completedShef.value,
            newShef: newShef.value,
            timestamp: new Date().toISOString(),
            changedBy: localStorage.getItem('adminEmail')
        };
        
        // Save department changes
        let deptChanges = JSON.parse(localStorage.getItem('departmentChanges') || '[]');
        deptChanges.push(deptData);
        localStorage.setItem('departmentChanges', JSON.stringify(deptChanges));
        
        alert('Department changes saved!');
        completedShef.value = '';
        newShef.value = '';
    }
}

function loadExistingData() {
    // Load and display existing posts
    const posts = JSON.parse(localStorage.getItem('adminPosts') || '[]');
    console.log('Existing posts:', posts);
    
    // Load and display department changes
    const deptChanges = JSON.parse(localStorage.getItem('departmentChanges') || '[]');
    console.log('Department changes:', deptChanges);
}

// Your existing scroll function (keep it)
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
    */
   // ADMIN_PAGE.js

document.addEventListener('DOMContentLoaded', () => {
    // Define club members for different admin clubs
    const clubMembers = {
        "chelihimanar38@gmail.com": [
            "Mohamemd,mohammed@ensia.edu.dz", "Ahmed,ahmed@ensia.edu.dz", "Ali,ali@ensia.edu.dz", "Khalid,khalid@ensia.edu.dz", "Fatima,fatima@ensia.edu.dz", 
            "Maryam,maryam@ensia.edu.dz", "Youssef,youssef@ensia.edu.dz", "Omar,omar@ensia.edu.dz", "Sarah,sarah@ensia.edu.dz", "Layla,layla@ensia.edu.dz",
            "Hassan,hassan@ensia.edu.dz", "Zainab,zainab@ensia.edu.dz", "Aisha,aisha@ensia.edu.dz", "Ibrahim,ibrahim@ensia.edu.dz", "Nour,nour@ensia.edu.dz",
            "Reem,reem@ensia.edu.dz", "Osama,osama@ensia.edu.dz", "Huda,huda@ensia.edu.dz", "Mustafa,mustafa@ensia.edu.dz", "Amina,amina@ensia.edu.dz"
        ],
        "admin1@gmail.com": [
            "John,jhon@ensia.edu.dz", "Michael,michael@ensia.edu.dz", "David,david@ensia.edu.dz", "Robert,robert@ensia.edu.dz", "Jennifer,jennifer@ensia.edu.dz",
            "Lisa,lisa@ensia.edu.dz", "Susan,susan@ensia.edu.dz", "Jessica,jessica@ensia.edu.dz", "Thomas,thomas@ensia.edu.dz", "Daniel,daniel@ensia.edu.dz"
        ],
        "admin2@gmail.com": [
            "Emily,emily@ensia.edu.dz", "Christopher,chrostopher@ensia.edu.dz", "Sarah,sarah@ensia.edu.dz", "Kevin,kevin@ensia.edu.dz", "Amanda,amanda@ensia.edu.dz",
            "James,james@ensia.edu.dz", "Nicole,nicole@ensia.edu.dz", "Andrew,andrew@ensia.edu.dz", "Elizabeth,elizabeth@ensia.edu.dz", "Brian,brian@ensia.edu.dz"
        ]
    };
   const clubLogos = {
        "chelihimanar38@gmail.com": "imgs/ebec.png",
        "admin1@gmail.com": "imgs/etc.jpg", 
        "admin2@gmail.com": "imgs/skill and tell.jpg"
    };
    // Get current admin email from localStorage
    const adminEmail = localStorage.getItem('adminEmail');
    
    // Update members list based on admin's club
    const memberList = document.querySelector('#members .c-g');
    if (memberList && adminEmail && clubMembers[adminEmail]) {
        // Clear existing list
        memberList.innerHTML = '';
        
        // Add members from the admin's club
        clubMembers[adminEmail].forEach(member => {
            const li = document.createElement('li');
            li.textContent = member;
            memberList.appendChild(li);
        });
    }
   const logoImg = document.querySelector('#members form img');
    if (logoImg && adminEmail && clubLogos[adminEmail]) {
        logoImg.src = clubLogos[adminEmail];
    }
    // Keep the existing scroll functionality
    window.scrollToElement = function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
});