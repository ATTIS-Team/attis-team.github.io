let defaultUrl = 'https://api.jsonsilo.com/public/3de8bd06-d7a6-4ade-80b1-6d36a778f608';
let currentUrl = defaultUrl;

document.getElementById("customJsonButton").addEventListener("click", () => {
    const container = document.getElementById("customJsonContainer");
    container.style.display = container.style.display === "none" ? "flex" : "none";
});

document.getElementById("applyJsonButton").addEventListener("click", () => {
    const newUrl = document.getElementById("customJsonUrl").value.trim();
    if (newUrl) {
        currentUrl = newUrl;
        document.getElementById("posts").innerHTML = "<h1>ATTIS Team JSON Viewer</h1>";
        loadPosts();
    }
});

async function loadPosts() {
    try {
        const response = await fetch(currentUrl, {
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
                <h2><a href="post.html?post=${post.name}&url=${encodeURIComponent(currentUrl)}">${post.title}</a></h2>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
}

loadPosts();
