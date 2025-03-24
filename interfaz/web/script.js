// Manejo de la validación de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Validación simple: los campos no pueden estar vacíos
    if (username === "" || password === "") {
        errorMessage.textContent = "Por favor, complete todos los campos.";
        return;
    }

    // Simulamos un inicio de sesión exitoso (puedes sustituir esto con tu lógica)
    if (username === "admin" && password === "1234") {
        errorMessage.textContent = "";
        alert("¡Inicio de sesión exitoso!");
        // Aquí puedes redirigir a otra página o realizar otras acciones
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
});
