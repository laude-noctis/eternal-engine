const commentBtn = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#comment").value.trim();

    const response = await fetch("/fill in later", {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: { "Content-type": "application.json" },
    })

    if (response.ok) {
        document.location.replace("/fill in later")
    } else (err) => {
        console.error(err)
        alert(response.statusText);
    };
}

document.querySelector("#comment-button").addEventListener("click", commentBtn)