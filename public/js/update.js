const updatePost = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/blogposts/update/4`, {
        method: "PUT",
        body: JSON.stringify({}),
        headers: { "Content-type": "application/json" }
    });

    if (response.ok) {
        document.location.replace(`blogpost`)
    } else {
        alert("Failed to update blogpost")
    }
}


document.querySelector("#update-post").addEventListener("click", updatePost)