// Función para alternar la visibilidad de la contraseña (Inicio de sesión)
function togglePassword() {
    const passwordField = document.getElementById('login-password');
    const passwordIcon = document.getElementById('toggle-password');

    // Cambiar el tipo de input entre 'password' y 'text'
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye');
    }
}

// Función para alternar la visibilidad de la contraseña (Registro)
function toggleRegisterPassword() {
    const passwordField = document.getElementById('register-password');
    const passwordIcon = document.getElementById('toggle-register-password');

    // Cambiar el tipo de input entre 'password' y 'text'
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye');
    }
}

// Abrir el popup de registro
function openRegisterPopup() {
    document.getElementById('register-popup').style.display = 'flex';
}

// Cerrar el popup de registro
function closeRegisterPopup() {
    document.getElementById('register-popup').style.display = 'none';
}

// Función para manejar el inicio de sesión (aquí debes agregar la lógica de Firebase)
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log("Intentando iniciar sesión con: ", email, password);
    // Aquí va tu código de autenticación con Firebase
}

// Función para manejar el registro (aquí debes agregar la lógica de Firebase)
function registerUser() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    console.log("Registrando usuario con: ", email, password);
    // Aquí va tu código de registro con Firebase
}
