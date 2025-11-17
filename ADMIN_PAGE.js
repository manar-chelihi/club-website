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


// AUTO POST SYSTEM - Creates divs automatically
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded - checking page type...");
    
    // Check if we're on admin page (has the form)
    const adminForm = document.querySelector('#pos form');
    if (adminForm) {
        console.log("Admin page detected - setting up form...");
        setupAdminForm();
    }
    
    // Check if we're on club page
    if (document.querySelector('.events-container')) {
        console.log("Club page detected - setting up posts...");
        setupClubPosts();
    }
});

function setupAdminForm() {
    const form = document.querySelector('#pos form');
    
    // Add submit event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Form submitted!");
        
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
        
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Image file:", imageFile);
        
        // Handle image conversion and save
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                savePost(title, description, e.target.result);
            };
            reader.readAsDataURL(imageFile);
        } else {
            savePost(title, description, null);
        }
    });
}

function savePost(title, description, imageData) {
    // Get existing posts or create empty array
    let posts = JSON.parse(localStorage.getItem('clubPosts')) || [];
    
    // Create new post object
    const newPost = {
        id: Date.now(),
        title: title,
        description: description,
        image: imageData,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString()
    };
    
    // Add to beginning of array (newest first)
    posts.unshift(newPost);
    
    // Save back to localStorage
    localStorage.setItem('clubPosts', JSON.stringify(posts));
    
    console.log("Post saved to localStorage:", newPost);
    
    // Redirect to club page
    alert('Post created! Redirecting to club page...');
    window.location.href = 'esc.html'; 
}

function setupClubPosts() {
    console.log("Setting up club posts...");
    
    // Create the CSS for posts if it doesn't exist
    createPostStyles();
    
    // Create the posts container if it doesn't exist
    createPostsContainer();
    
    // Load and display posts
    loadPosts();
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
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
    console.log("Post styles created");
}

function createPostsContainer() {
    // Check if container already exists
    if (document.getElementById('autoPostsSection')) {
        console.log("Posts container already exists");
        return;
    }
    
    console.log("Creating posts container...");
    
    // Create the main section
    const postsSection = document.createElement('section');
    postsSection.className = 'auto-posts-section';
    postsSection.id = 'autoPostsSection';
    
    // Create the title and container
    postsSection.innerHTML = `
        <h2 class="auto-posts-title">Club Announcements</h2>
        <div class="auto-post-card">
            <div class="auto-post-content">
                <h3 class="auto-post-title">Loading posts...</h3>
                <p class="auto-post-description">Please wait while we load the latest announcements.</p>
            </div>
        </div>
    `;
    
    // Find where to insert - after events section
    const eventsContainer = document.querySelector('.events-container');
    if (eventsContainer) {
        console.log("Found events container, inserting after it");
        eventsContainer.parentNode.insertBefore(postsSection, eventsContainer.nextSibling);
    } else {
        // If no events container, add before comments
        const commentsSection = document.getElementById('comments');
        if (commentsSection) {
            console.log("No events container found, inserting before comments");
            commentsSection.parentNode.insertBefore(postsSection, commentsSection);
        } else {
            // Last resort - add to body
            console.log("Adding posts section to body");
            document.body.appendChild(postsSection);
        }
    }
    
    console.log("Posts container created successfully");
}

function loadPosts() {
    console.log("Loading posts from localStorage...");
    
    const postsSection = document.getElementById('autoPostsSection');
    if (!postsSection) {
        console.error("Posts section not found!");
        return;
    }
    
    // Get posts from localStorage
    const posts = JSON.parse(localStorage.getItem('clubPosts')) || [];
    console.log("Found", posts.length, "posts in localStorage");
    
    // Clear the loading message
    postsSection.innerHTML = '<h2 class="auto-posts-title">Club Announcements</h2>';
    
    // Create container for posts
    const postsContainer = document.createElement('div');
    postsContainer.className = 'auto-posts-container';
    postsContainer.id = 'autoPostsContainer';
    
    postsSection.appendChild(postsContainer);
    
    if (posts.length === 0) {
        console.log("No posts found, showing empty message");
        postsContainer.innerHTML = `
            <div class="no-posts-message">
                <h3>No announcements yet</h3>
                <p>Check back later for club updates and events!</p>
            </div>
        `;
        return;
    }
    
    console.log("Creating post cards...");
    
    // Create a card for each post
    posts.forEach((post, index) => {
        console.log(`Creating card for post ${index + 1}:`, post.title);
        
        const postCard = document.createElement('div');
        postCard.className = 'auto-post-card';
        
        // Create the HTML for this post
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
                <h3 class="auto-post-title">${post.title}</h3>
                <p class="auto-post-description">${post.description}</p>
                <div class="auto-post-date">Posted: ${post.date}</div>
            </div>
        `;
        
        postsContainer.appendChild(postCard);
    });
    
    console.log("All post cards created successfully");
}

// Debug function to see what's in localStorage
function debugPosts() {
    const posts = JSON.parse(localStorage.getItem('clubPosts')) || [];
    console.log("Current posts in localStorage:", posts);
    return posts;
}

// Function to clear all posts (for testing)
function clearAllPosts() {
    if (confirm('Delete all posts?')) {
        localStorage.removeItem('clubPosts');
        if (document.getElementById('autoPostsContainer')) {
            loadPosts();
        }
    }
}