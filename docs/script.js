const url = 'https://api.jsonsilo.com/public/3de8bd06-d7a6-4ade-80b1-6d36a778f608';

async function loadPosts() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        const postsContainer = document.getElementById("posts");
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            postElement.innerHTML = `
                <h2><a href="post.html?post=${post.name}">${post.title}</a></h2>
            `;

            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
}

loadPosts();

