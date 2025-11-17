function scrollToElement(elementId)
{
 const ele = document.getElementById(elementId);
 if(ele ){ele.scrollIntoView({behavior: 'smooth',block:'start'})  }

}


// ADMIN MEMBERS SCRIPT
document.addEventListener('DOMContentLoaded', function() {
    console.log("=== DEBUG: Script started ===");
    
    // Define club members for different admin clubs
    const clubMembers = {
        "chelihimanar38@gmail.com": [
            "Mohammed, mohammed@ensia.edu.dz", "Ahmed, ahmed@ensia.edu.dz", "Ali, ali@ensia.edu.dz", 
            "Khalid, khalid@ensia.edu.dz", "Fatima, fatima@ensia.edu.dz", "Maryam, maryam@ensia.edu.dz", 
            "Youssef, youssef@ensia.edu.dz", "Omar, omar@ensia.edu.dz", "Sarah, sarah@ensia.edu.dz", 
            "Layla, layla@ensia.edu.dz", "Hassan, hassan@ensia.edu.dz", "Zainab, zainab@ensia.edu.dz", 
            "Aisha, aisha@ensia.edu.dz", "Ibrahim, ibrahim@ensia.edu.dz", "Nour, nour@ensia.edu.dz",
            "Reem, reem@ensia.edu.dz", "Osama, osama@ensia.edu.dz", "Huda, huda@ensia.edu.dz", 
            "Mustafa, mustafa@ensia.edu.dz", "Amina, amina@ensia.edu.dz"
        ],
        "admin1@gmail.com": [
            "John, john@ensia.edu.dz", "Michael, michael@ensia.edu.dz", "David, david@ensia.edu.dz", 
            "Robert, robert@ensia.edu.dz", "Jennifer, jennifer@ensia.edu.dz", "Lisa, lisa@ensia.edu.dz", 
            "Susan, susan@ensia.edu.dz", "Jessica, jessica@ensia.edu.dz", "Thomas, thomas@ensia.edu.dz", 
            "Daniel, daniel@ensia.edu.dz"
        ],
        "admin2@gmail.com": [
            "Emily, emily@ensia.edu.dz", "Christopher, christopher@ensia.edu.dz", "Sarah, sarah@ensia.edu.dz", 
            "Kevin, kevin@ensia.edu.dz", "Amanda, amanda@ensia.edu.dz", "James, james@ensia.edu.dz", 
            "Nicole, nicole@ensia.edu.dz", "Andrew, andrew@ensia.edu.dz", "Elizabeth, elizabeth@ensia.edu.dz", 
            "Brian, brian@ensia.edu.dz"
        ]
    };

    const clubLogos = {
        "chelihimanar38@gmail.com": "imgs/ebec.png",
        "admin1@gmail.com": "imgs/etc.jpg", 
        "admin2@gmail.com": "imgs/skill%20and%20tell.jpg"
    };

    // Get current admin email from localStorage
    const adminEmail = localStorage.getItem('adminEmail');
    console.log("DEBUG: adminEmail =", adminEmail);
    
    if (!adminEmail) {
        console.error("DEBUG: No admin email found in localStorage!");
        alert("Please login first!");
        window.location.href = "login.html"; // Change this to your login page
        return;
    }

    // Update members list
    const memberList = document.querySelector('#members .c-g');
    console.log("DEBUG: memberList element =", memberList);
    
    if (memberList && clubMembers[adminEmail]) {
        console.log("DEBUG: Updating members for:", adminEmail);
        
        // Clear existing list
        memberList.innerHTML = '';
        
        // Add members from the admin's club
        clubMembers[adminEmail].forEach(member => {
            const li = document.createElement('li');
            li.textContent = member;
            memberList.appendChild(li);
        });
        
        console.log("DEBUG: Members updated successfully");
        
        // Re-initialize GSAP animations
        setTimeout(() => {
            initializeGSAPAnimations();
        }, 100);
    } else {
        console.error("DEBUG: Could not update members - memberList:", !!memberList, "clubMembers[adminEmail]:", !!clubMembers[adminEmail]);
    }

    // Update logo
    const logoImg = document.querySelector('#members form img');
    console.log("DEBUG: logoImg element =", logoImg);
    
    if (logoImg && clubLogos[adminEmail]) {
        logoImg.src = clubLogos[adminEmail];
        console.log("DEBUG: Logo updated to:", clubLogos[adminEmail]);
    }

    // Update heading
    const heading = document.querySelector('#members form h2');
    if (heading) {
        if (adminEmail === "chelihimanar38@gmail.com") {
            heading.textContent = "EBEC Club Members";
        } else if (adminEmail === "admin1@gmail.com") {
            heading.textContent = "ETC Club Members"; 
        } else if (adminEmail === "admin2@gmail.com") {
            heading.textContent = "Skill & Tell Club Members";
        }
    }
});

function initializeGSAPAnimations() {
    console.log("DEBUG: Initializing GSAP animations");
    
    const items = document.querySelectorAll(".c-g li");
    console.log("DEBUG: Found", items.length, "list items for GSAP");
    
    if (items.length === 0) {
        console.error("DEBUG: No list items found for GSAP!");
        return;
    }

    // Your existing GSAP code here...
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

    items.forEach((item) => {
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
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}