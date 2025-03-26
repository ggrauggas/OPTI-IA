function toggleOptionsMenu() {
    const menu = document.getElementById("options-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Acciones de los botones del menú desplegable
function accionPerfil() {
    alert("Accediendo al perfil...");
}

function accionConfiguracion() {
    alert("Abriendo configuración...");
}

function cerrarSesion() {
    alert("Cerrando sesión...");
    window.location.href = "index.html"; // Redirige a la página de inicio
}

// Acciones de los botones principales
function accion1() {
    alert("Ingresando a Monitoreo...");
}

function accion2() {
    alert("Abriendo Gestión de Sistema...");
}

// Abrir y cerrar el popup
function abrirPopup1() {
    document.getElementById("popup").style.display = "flex";
}

function abrirPopup2() {
    document.getElementById("popup2").style.display = "flex";
}


function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
}

function cerrarPopup2() {
    document.getElementById("popup2").style.display = "none";
}

// Seleccionar opción de informe
function seleccionarOpcion(elemento, valor) {
    // Deseleccionar todas las opciones
    let opciones = document.querySelectorAll('.popup .option');
    opciones.forEach(opcion => {
        opcion.classList.remove('selected');
    });

    // Seleccionar la opción actual
    elemento.classList.add('selected');

    // Marcar el radio button correspondiente
    let radio = elemento.querySelector('input[type="radio"]');
    radio.checked = true;
}

// Confirmar la selección del informe
function confirmarInforme() {
    const informeSeleccionado = document.querySelector('.popup .option.selected');
    if (!informeSeleccionado) {
        alert("Por favor, selecciona un informe.");
    } else {
        const informe = informeSeleccionado.querySelector('input[type="radio"]').value;
        const comentarios = document.getElementById("comentarios").value;
        alert(`Informe ${informe} confirmado con los comentarios: ${comentarios}`);
        cerrarPopup();
    }
}
