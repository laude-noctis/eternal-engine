const updatePost = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id")
        console.log(id)
        const title = document.getElementById("post-title").value.trim();
        const description = document.getElementById("post-description").value.trim();

        const response = await fetch(`/api/blogposts/update/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, description }),
            headers: { "Content-type": "application/json" }
        });
        
        if (response.ok) {
            document.location.replace(`/blogposts/${id}`)
        } else (err) => {
            console.error(err)
            alert("Failed to update blogpost")
        }
    }
}

document.querySelector("#update-post").addEventListener("click", updatePost)

