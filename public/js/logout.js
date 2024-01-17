const logoutHandler = async (event) => {
    event.preventDefault();
    console.log("hello there")
    const response = await fetch("/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace("/")
    } else {
        alert("Failed to Logout :(")
    }
};

document.querySelector("#logout").addEventListener("click", logoutHandler)
