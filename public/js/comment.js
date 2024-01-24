const commentBtn = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        const comment = document.getElementById("comment").value.trim();
        const blogpost_id = id;
        
        if (comment) {
            const response = await fetch("/api/comments", {
                method: "POST",
                body: JSON.stringify({ comment, blogpost_id }),
                headers: { "Content-type": "application/json" },
            });

            if (response.ok) {
                document.location.replace(`/blogposts/${id}`);
            } else (err) => {
                console.error(err);
                alert(response.statusText);
            };
        }
    }
}

document.querySelector("#comment-button").addEventListener("click", commentBtn)