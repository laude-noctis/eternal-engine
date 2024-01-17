// Signup Logic
const signupForm = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name-signup").value.trim();
    const email = document.getElementById("email-signup").value.trim();
    const password = document.getElementById("password-signup").value.trim();

    if (name && email && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert(response.statusText)
        };
    };
};

document.querySelector(".signup-form").addEventListener("submit", signupForm);
