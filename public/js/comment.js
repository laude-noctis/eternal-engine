const commentBtn = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#comment").value.trim();

    const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: { "Content-type": "application.json" },
    })

    if (response.ok) {
        document.location.replace("/blogposts/:id")
    } else (err) => {
        console.error(err)
        alert(response.statusText);
    };
}

document.querySelector("#comment-button").addEventListener("click", commentBtn)