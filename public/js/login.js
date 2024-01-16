// Login logic
const loginForm = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email-login");
    const password = document.getElementById("password-login");

    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace("/profile")
        } else {
            alert(response.statusText);
        };
    };
};

document.querySelector(".login-form").addEventListener("submit", loginForm);

// Signup Logic
const signupForm = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name-signup")
    const email = document.getElementById("email-signup")
    const password = document.getElementById("password-signup")

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
