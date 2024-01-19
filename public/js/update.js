const updatePost = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/blogposts/update/:id", {
        method: "PUT",
        body: JSON.stringify({}),
        headers: { "Content-type": "application/json" }
    });

    if (response.ok) {
        document.location.replace("/blogposts/:id")
    } else {
        alert("Failed to update blogpost")
    }
}


document.querySelector("#update-post").addEventListener("click", updatePost)