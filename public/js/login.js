// Login logic
const loginForm = async () => {
    const email = document.getElementById("#email-login");
    const password = document.getElementById("#password-login");
    
    if (email && password) {
        const response = await fetch ("/api/users/login", {
            method: "POST",
            body: JSON.strigify({ email, password }),
        });
    
        if (response.ok) {
            document.location.replace("/profile")
        } else {
            alert(response.statusText);
        };
    };
}
