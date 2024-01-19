const newBlogPost = async (event) => {
    event.preventDefault();

    const title = document.getElementById("post-title").value.trim();
    const description = document.getElementById("post-description").value.trim();

    if (title && description) {
        const response = await fetch("/api/blogposts", {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: { "Content-type": "application/json" }
        });

        if (response.ok) {
            document.location.replace("/dashboard")
        } else {
            alert("Failed to create blogPost :(")
        }
    }
};

document.querySelector("#create-post").addEventListener("click", newBlogPost);
