

const deleteButton = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        const response = await fetch(`/api/blogposts/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to delete post :(")
        }
    }
};

document.querySelector("#delete-button").addEventListener("click", deleteButton);
