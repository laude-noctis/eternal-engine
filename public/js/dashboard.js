const newPost = () => {
    document.location.replace("/new-post")
}

document.querySelector("#new-post").addEventListener("click", newPost)