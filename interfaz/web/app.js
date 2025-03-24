// Configuración de Firebase
const firebaseConfig = {

    apiKey: "AIzaSyAh-WoG_7mToEy2JTkwrH1ZricDrxlcRAY",
    authDomain: "opti-ia.firebaseapp.com",
    projectId: "opti-ia",
    storageBucket: "opti-ia.firebasestorage.app",
    messagingSenderId: "87487071548",
    appId: "1:87487071548:web:0fb8a844f0ec192b884a39",
    measurementId: "G-8LZ9HK46TH"
  };


// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Función para registrar un nuevo usuario
function registerUser() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Usuario creado exitosamente
            const user = userCredential.user;
            alert("Registro exitoso, por favor revisa tu correo para verificar tu cuenta.");
            sendVerificationEmail();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// Función para iniciar sesión
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                alert("Inicio de sesión exitoso");
            } else {
                alert("Por favor verifica tu correo antes de continuar.");
            }
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// Función para enviar correo de verificación
function sendVerificationEmail() {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
        user.sendEmailVerification()
            .then(() => {
                alert("Correo de verificación enviado.");
            })
            .catch((error) => {
                alert("Error al enviar correo de verificación: " + error.message);
            });
    } else {
        alert("Ya has verificado tu correo.");
    }
}

// Función para cerrar sesión
function logoutUser() {
    auth.signOut()
        .then(() => {
            alert("Sesión cerrada");
        })
        .catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
        });
}

// Escucha cambios en el estado de autenticación
auth.onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            document.getElementById('auth-container').innerHTML = `<h3>Bienvenido, ${user.email}</h3>`;
        } else {
            document.getElementById('verification-message').innerText = "Tu cuenta no está verificada.";
        }
    }
});
