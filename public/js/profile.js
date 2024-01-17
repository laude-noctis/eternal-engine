const newBlogPost = async (event) => {
    event.preventDefault();

    const title = document.getElementById("post-title");
    const description = document.getElementById("post-description");

    if (title && description) {
        const response = await fetch("/api/blogposts", {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: { "Content-type": "application/json" }
        });

        if (response.ok) {
            document.location.replace("/profile")
        } else {
            alert("Failed to create blogPost :(")
        }
    }
};

document.querySelector("#create-post").addEventListener("click", newBlogPost);

const deleteButton = async (event) => {
    event.preventDefault();

    const id = document.querySelector("#delete-button")

    const response = await fetch(`/api/blogposts/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace("/profile");
    } else {
        alert("Failed to delete post :(")
    }
}

document.querySelector("#delete-button").addEventListener("click", deleteButton);
