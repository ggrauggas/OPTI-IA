
// Función para iniciar sesión
function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Si es "admin" y "admin", redirige a menu.html
    if (email === "admin" && password === "admin") {
        window.location.href = "menu.html";
        return;
    }

    // Autenticación con Firebase
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Inicio de sesión exitoso");
            window.location.href = "menu.html"; // Redirigir tras login exitoso
        })
        .catch(error => {
            alert("Error al iniciar sesión: " + error.message);
        });
}

// Función para registrar usuario
function registerUser() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Registro exitoso, ahora puedes iniciar sesión.");
            closeRegisterPopup();
        })
        .catch(error => {
            alert("Error al registrar: " + error.message);
        });
}

// Mostrar/ocultar contraseña en login
function togglePassword() {
    const passwordField = document.getElementById("login-password");
    passwordField.type = (passwordField.type === "password") ? "text" : "password";
}

// Mostrar/ocultar contraseña en registro
function toggleRegisterPassword() {
    const passwordField = document.getElementById("register-password");
    passwordField.type = (passwordField.type === "password") ? "text" : "password";
}

// Abrir y cerrar popup de registro
function openRegisterPopup() {
    document.getElementById("register-popup").style.display = "block";
}

function closeRegisterPopup() {
    document.getElementById("register-popup").style.display = "none";
}
