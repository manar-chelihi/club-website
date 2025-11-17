function scrollToElement(elementId)
{
 const ele = document.getElementById(elementId);
 if(ele ){ele.scrollIntoView({behavior: 'smooth',block:'start'})  }

}

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

 // AUTO POST SYSTEM - Creates divs automatically
// INTEGRATED POST SYSTEM - Handles multiple clubs based on admin email
document.addEventListener('DOMContentLoaded', function() {
    console.log("Integrated system loaded");
    
    // Check if we're on admin page (has the form)
    const adminForm = document.querySelector('#pos form');
    if (adminForm) {
        console.log("Admin page detected");
        setupAdminForm();
    }
    
    // Check if we're on any club page
    if (document.querySelector('.events-container') || document.querySelector('#members')) {
        console.log("Club page detected");
        setupClubPosts();
    }
});

// Club mapping based on admin emails
const CLUB_MAPPING = {
    "chelihimanar38@gmail.com": {
        name: "EBEC Club",
        page: "ebec-club.html",  // Change to your actual EBEC club page
        logo: "imgs/ebec.png"
    },
    "admin1@gmail.com": {
        name: "BEST Club", 
        page: "best-club.html",  // Change to your actual BEST club page
        logo: "imgs/best.jpg"
    },
    "admin2@gmail.com": {
        name: "Skill & Tell Club",
        page: "skill-club.html",  // Change to your actual Skill club page
        logo: "imgs/skill%20and%20tell.jpg"
    }
};

function setupAdminForm() {
    const form = document.querySelector('#pos form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Form submitted!");
        
        // Get admin email from localStorage (from login system)
        const adminEmail = localStorage.getItem('adminEmail');
        console.log("Admin email from localStorage:", adminEmail);
        
        if (!adminEmail) {
            alert('Please login first!');
            window.location.href = 'login.html'; // Redirect to login
            return;
        }
        
        // Get form data
        const titleInput = form.querySelector('input[type="text"]');
        const descInput = form.querySelector('textarea');
        const fileInput = form.querySelector('input[type="file"]');
        
        const title = titleInput.value;
        const description = descInput.value;
        const imageFile = fileInput.files[0];
        
        if (!title || !description) {
            alert('Please fill in all fields');
            return;
        }
        
        console.log("Creating post for admin:", adminEmail);
        console.log("Title:", title);
        console.log("Description:", description);
        
        // Handle image and save post
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                savePostAndRedirect(adminEmail, title, description, e.target.result);
            };
            reader.readAsDataURL(imageFile);
        } else {
            savePostAndRedirect(adminEmail, title, description, null);
        }
    });
}

function savePostAndRedirect(adminEmail, title, description, imageData) {
    // Determine which club this admin belongs to
    const clubInfo = CLUB_MAPPING[adminEmail];
    
    if (!clubInfo) {
        alert('Error: No club found for this admin email: ' + adminEmail);
        return;
    }
    
    console.log("Club info:", clubInfo);
    
    // Save post with club information
    savePostToStorage(adminEmail, clubInfo.name, title, description, imageData);
    
    // Redirect to the specific club page using SWITCH statement
    redirectToClubPage(adminEmail, clubInfo.page);
}

function savePostToStorage(adminEmail, clubName, title, description, imageData) {
    // Get existing posts or create empty array
    let posts = JSON.parse(localStorage.getItem('clubPosts')) || [];
    
    // Create new post object with club info
    const newPost = {
        id: Date.now(),
        adminEmail: adminEmail,
        clubName: clubName,
        title: title,
        description: description,
        image: imageData,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        timestamp: new Date().toISOString()
    };
    
    // Add to beginning of array (newest first)
    posts.unshift(newPost);
    
    // Save back to localStorage
    localStorage.setItem('clubPosts', JSON.stringify(posts));
    
    console.log("Post saved for club:", clubName);
}

function redirectToClubPage(adminEmail, clubPage) {
    console.log("Redirecting to club page for:", adminEmail);
    
    // SWITCH statement to handle different redirects
    switch(adminEmail) {
        case "chelihimanar38@gmail.com":
            console.log("Redirecting to EBEC club page");
            window.location.href = clubPage;
            break;
            
        case "admin1@gmail.com":
            console.log("Redirecting to BEST club page");
            window.location.href = clubPage;
            break;
            
        case "admin2@gmail.com":
            console.log("Redirecting to Skill & Tell club page");
            window.location.href = clubPage;
            break;
            
        default:
            console.log("Unknown admin, using default redirect");
            window.location.href = clubPage;
            break;
    }
}

function setupClubPosts() {
    console.log("Setting up club posts system...");
    
    // Create the CSS for posts if it doesn't exist
    createPostStyles();
    
    // Create the posts section if it doesn't exist
    createPostsContainer();
    
    // Load and display posts for current club
    loadClubPosts();
}

function createPostStyles() {
    if (document.getElementById('post-styles')) return;
    
    const styles = `
        <style id="post-styles">
            .auto-posts-section {
                width: 100%;
                padding: 40px 20px;
                background: rgba(0, 0, 0, 0.3);
                margin: 30px 0;
                border-radius: 10px;
            }
            
            .auto-posts-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 25px;
                max-width: 1200px;
                margin: 0 auto;
            }
            
            .auto-post-card {
                background: linear-gradient(135deg, #4e50a7 0%, #3685eb 100%);
                border-radius: 15px;
                overflow: hidden;
                width: 320px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s ease;
            }
            
            .auto-post-card:hover {
                transform: translateY(-5px);
            }
            
            .auto-post-image {
                width: 100%;
                height: 180px;
                object-fit: cover;
                background: #2c3e50;
            }
            
            .auto-post-content {
                padding: 15px;
            }
            
            .auto-post-title {
                font-size: 1.3em;
                color: white;
                margin: 0 0 10px 0;
                font-weight: bold;
            }
            
            .auto-post-description {
                font-size: 0.9em;
                line-height: 1.4;
                color: #e0e0e0;
                margin: 0 0 10px 0;
            }
            
            .auto-post-date {
                font-size: 0.8em;
                color: #b0b0b0;
                text-align: right;
            }
            
            .auto-posts-title {
                text-align: center;
                font-size: 2em;
                color: #52b385;
                margin: 0 0 30px 0;
            }
            
            .no-posts-message {
                color: white;
                text-align: center;
                padding: 40px;
                font-size: 1.1em;
                width: 100%;
            }
            
            .club-badge {
                background: #ff6b6b;
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.7em;
                margin-left: 10px;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

function createPostsContainer() {
    if (document.getElementById('autoPostsSection')) return;
    
    console.log("Creating posts container...");
    
    const postsSection = document.createElement('section');
    postsSection.className = 'auto-posts-section';
    postsSection.id = 'autoPostsSection';
    
    postsSection.innerHTML = `
        <h2 class="auto-posts-title">Club Announcements</h2>
        <div class="auto-posts-container" id="autoPostsContainer">
            <div class="no-posts-message">Loading announcements...</div>
        </div>
    `;
    
    // Insert after events section or before comments
    const eventsContainer = document.querySelector('.events-container');
    if (eventsContainer) {
        eventsContainer.parentNode.insertBefore(postsSection, eventsContainer.nextSibling);
    } else {
        const commentsSection = document.getElementById('comments');
        if (commentsSection) {
            commentsSection.parentNode.insertBefore(postsSection, commentsSection);
        } else {
            document.body.appendChild(postsSection);
        }
    }
}

function loadClubPosts() {
    console.log("Loading club posts...");
    
    const postsContainer = document.getElementById('autoPostsContainer');
    if (!postsContainer) return;
    
    // Get current page to determine which club we're on
    const currentPage = window.location.pathname.split('/').pop();
    console.log("Current page:", currentPage);
    
    // Get all posts from localStorage
    const allPosts = JSON.parse(localStorage.getItem('clubPosts')) || [];
    console.log("Total posts in storage:", allPosts.length);
    
    // Determine which posts to show based on current page
    let postsToShow = [];
    
    // SWITCH statement to filter posts based on current page
    switch(currentPage) {
        case "ebec-club.html": // Change to your actual EBEC club page filename
        case "super_admin.html": // EBEC admin might use this page
            console.log("Showing EBEC club posts");
            postsToShow = allPosts.filter(post => 
                post.adminEmail === "chelihimanar38@gmail.com" || 
                post.clubName === "EBEC Club"
            );
            break;
            
        case "best-club.html": // Change to your actual BEST club page filename
        case "admin.html": // Normal admins might use this page
            console.log("Showing BEST club posts");
            postsToShow = allPosts.filter(post => 
                post.adminEmail === "admin1@gmail.com" || 
                post.clubName === "BEST Club"
            );
            break;
            
        case "skill-club.html": // Change to your actual Skill club page filename
            console.log("Showing Skill & Tell club posts");
            postsToShow = allPosts.filter(post => 
                post.adminEmail === "admin2@gmail.com" || 
                post.clubName === "Skill & Tell Club"
            );
            break;
            
        default:
            console.log("Unknown page, showing all posts");
            postsToShow = allPosts;
            break;
    }
    
    console.log("Filtered posts to show:", postsToShow.length);
    
    // Display the filtered posts
    displayPosts(postsToShow);
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('autoPostsContainer');
    if (!postsContainer) return;
    
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="no-posts-message">
                <h3>No announcements yet</h3>
                <p>Check back later for club updates and events!</p>
            </div>
        `;
        return;
    }
    
    // Create a card for each post
    posts.forEach((post, index) => {
        console.log(`Creating card ${index + 1} for: ${post.title}`);
        
        const postCard = document.createElement('div');
        postCard.className = 'auto-post-card';
        
        let imageHTML = '';
        if (post.image) {
            imageHTML = `<img src="${post.image}" alt="${post.title}" class="auto-post-image">`;
        } else {
            imageHTML = `
                <div class="auto-post-image" style="display: flex; align-items: center; justify-content: center; color: white; background: linear-gradient(45deg, #3498db, #2c3e50);">
                    <span>${post.title}</span>
                </div>
            `;
        }
        
        postCard.innerHTML = `
            ${imageHTML}
            <div class="auto-post-content">
                <h3 class="auto-post-title">
                    ${post.title}
                    <span class="club-badge">${post.clubName}</span>
                </h3>
                <p class="auto-post-description">${post.description}</p>
                <div class="auto-post-date">Posted: ${post.date}</div>
            </div>
        `;
        
        postsContainer.appendChild(postCard);
    });
    
    console.log("All post cards created successfully");
}

// Utility functions
function debugSystem() {
    console.log("=== SYSTEM DEBUG ===");
    console.log("Admin email in localStorage:", localStorage.getItem('adminEmail'));
    console.log("All posts in localStorage:", JSON.parse(localStorage.getItem('clubPosts')) || []);
    console.log("Current page:", window.location.href);
}

function clearAllPosts() {
    if (confirm('Delete all posts?')) {
        localStorage.removeItem('clubPosts');
        if (document.getElementById('autoPostsContainer')) {
            loadClubPosts();
        }
    }
}