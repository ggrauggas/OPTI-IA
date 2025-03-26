// Función para mostrar/ocultar el menú de usuario
function toggleUserMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

// Cerrar el menú si se hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.user-btn')) {
        const dropdowns = document.getElementsByClassName('dropdown-menu');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Funciones para los popups
function abrirPopup1() {
    const popup = document.getElementById('apiPopup');
    popup.classList.add('show');
}

function cerrarPopup() {
    const popup = document.getElementById('apiPopup');
    popup.classList.remove('show');
}
// Añade este objeto al principio del archivo
const promptsData = {
    "idioma": "Español",
    "prompts": {
        "solo_codigo": {
            "lenguaje": "Python",
            "prompt": "Genera únicamente el código necesario para esta tarea en el lenguaje {lenguaje}, sin explicaciones. Si es necesario, agrega comentarios directamente en el código para facilitar su comprensión: "
        }, 
        "parafraseo_formal": {
            "prompt": "Reescribe el siguiente texto de manera formal y profesional, manteniendo el significado original y mejorando la estructura: "
        },   
        "correccion": {
            "prompt": "Corrige los errores ortográficos, gramaticales y de estilo en el siguiente texto. Asegúrate de que sea coherente y fluido: "
        },
        "translate": {
            "idioma_origen": "Detectar",
            "idioma_traducido": "Español",
            "prompt": "Traduce el siguiente texto del idioma {idioma_origen} al {idioma_traducido} manteniendo el significado y contexto lo más preciso posible: "
        },
        "resumen": {
            "numero_lineas": "5",
            "prompt": "Resume el siguiente texto en aproximadamente {numero_lineas} líneas, manteniendo los puntos clave y el sentido original: "
        },
        "evaluacion": {
            "nivel_exigencia": "5",
            "prompt": "Evalúa el siguiente contenido con un nivel de exigencia de {nivel_exigencia} sobre 10, proporcionando comentarios detallados sobre errores, mejoras, y calidad general. Finaliza con una calificación del 1 al 10: "
        },
        "explicacion_tecnica": {
            "prompt": "Explica de forma clara y detallada los siguientes conceptos o temas, utilizando ejemplos si es necesario para hacer la explicación más comprensible: "
        },
        "generar_ideas": {
            "prompt": "Genera una lista de ideas creativas o soluciones posibles para el siguiente desafío o problema, considerando diferentes enfoques: "
        },
        "generar_critica": {
            "prompt": "Genera una crítica constructiva sobre el siguiente contenido, destacando tanto los aspectos positivos como las áreas de mejora: "
        },
        "recomendaciones": {
            "prompt": "Proporciona recomendaciones basadas en el siguiente análisis, enfocándote en mejorar el rendimiento, la eficiencia o la calidad del proyecto: "
        },
        "completar_codigo": {
            "lenguaje": "Python",
            "prompt": "Completa el siguiente fragmento de código en {lenguaje} para que funcione correctamente según el propósito que se indica: "
        },
        "generar_documentacion": {
            "prompt": "Genera documentación clara y concisa para el siguiente código o proyecto, incluyendo una descripción general, instrucciones de uso, y ejemplos: "
        },
        "analisis_de_datos": {
            "prompt": "Analiza los siguientes datos y proporciona una interpretación detallada, incluyendo posibles tendencias, correlaciones y conclusiones relevantes: "
        },
        "optimizar_codigo": {
            "lenguaje": "Python",
            "prompt": "Optimiza el siguiente código en {lenguaje} para mejorar su rendimiento, legibilidad y eficiencia, haciendo los cambios necesarios: "
        }
    }
};

// Función para cambiar el prompt según la selección
function cambiarPrompt() {
    const promptType = document.getElementById('promptType').value;
    const configOptions = document.getElementById('configOptions');
    const generatedPrompt = document.getElementById('generatedPrompt');
    
    if (!promptType) {
        configOptions.classList.add('hidden');
        generatedPrompt.textContent = '';
        return;
    }
    
    const promptConfig = promptsData.prompts[promptType];
    let promptText = promptConfig.prompt;
    
    // Mostrar opciones configurables
    configOptions.innerHTML = '';
    configOptions.classList.remove('hidden');
    
    // Procesar cada configuración disponible
    for (const [key, value] of Object.entries(promptConfig)) {
        if (key !== 'prompt') {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'config-option';
            
            const label = document.createElement('label');
            label.textContent = key.replace('_', ' ') + ':';
            
            let input;
            
            if (key === 'lenguaje' || key === 'idioma_origen' || key === 'idioma_traducido') {
                input = document.createElement('select');
                input.id = `config_${key}`;
                
                const languages = ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin'];
                const languagesDetect = ['Detectar', 'Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués'];
                
                const options = key === 'idioma_traducido' ? languagesDetect.slice(1) : 
                              key === 'idioma_origen' ? languagesDetect : languages;
                
                options.forEach(lang => {
                    const option = document.createElement('option');
                    option.value = lang;
                    option.textContent = lang;
                    if (lang === value) option.selected = true;
                    input.appendChild(option);
                });
            } else {
                input = document.createElement('input');
                input.type = 'text';
                input.id = `config_${key}`;
                input.value = value;
                
                if (key === 'nivel_exigencia' || key === 'numero_lineas') {
                    input.type = 'number';
                    input.min = '1';
                    input.max = '10';
                }
            }
            
            input.addEventListener('change', actualizarPrompt);
            
            optionDiv.appendChild(label);
            optionDiv.appendChild(input);
            configOptions.appendChild(optionDiv);
        }
    }
    
    // Actualizar el prompt inicial
    actualizarPrompt();
}

// Función para actualizar el prompt con las configuraciones
function actualizarPrompt() {
    const promptType = document.getElementById('promptType').value;
    if (!promptType) return;
    
    const promptConfig = promptsData.prompts[promptType];
    let promptText = promptConfig.prompt;
    
    // Reemplazar variables en el prompt
    for (const [key, value] of Object.entries(promptConfig)) {
        if (key !== 'prompt') {
            const input = document.getElementById(`config_${key}`);
            const currentValue = input ? input.value : value;
            promptText = promptText.replace(`{${key}}`, currentValue);
        }
    }
    
    document.getElementById('generatedPrompt').textContent = promptText;
}
// Función para actualizar el contador de caracteres
function actualizarContador() {
    const textarea = document.getElementById('userInput');
    const charCounter = document.getElementById('charCounter');
    const count = textarea.value.length;
    charCounter.textContent = `${count}/1000`;
    
    // Cambiar color si se acerca al límite
    if (count > 900) {
        charCounter.style.color = '#e74c3c';
    } else if (count > 750) {
        charCounter.style.color = '#f39c12';
    } else {
        charCounter.style.color = '';
    }
}

// Función para copiar el prompt al portapapeles
function copiarPrompt() {
    const promptText = document.getElementById('generatedPrompt').textContent;
    if (!promptText.trim()) {
        alert('No hay prompt para copiar');
        return;
    }
    
    navigator.clipboard.writeText(promptText).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = '<i class="far fa-copy"></i> Copiar';
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Inicializar el contador al abrir el popup
function abrirPopup2() {
    const popup = document.getElementById('promptPopup');
    document.getElementById('promptType').value = '';
    document.getElementById('configOptions').classList.add('hidden');
    document.getElementById('generatedPrompt').textContent = '';
    document.getElementById('userInput').value = '';
    document.getElementById('charCounter').textContent = '0/1000';
    popup.classList.add('show');
}

// Función para usar el prompt generado
function usarPrompt() {
    const promptType = document.getElementById('promptType').value;
    const userInput = document.getElementById('userInput').value;
    const generatedPrompt = document.getElementById('generatedPrompt').textContent;
    
    if (!promptType) {
        alert('Por favor selecciona un tipo de prompt');
        return;
    }
    
    if (!userInput) {
        alert('Por favor introduce tu texto');
        return;
    }
    
    const fullPrompt = generatedPrompt + '\n\n' + userInput;
    
    // Aquí puedes hacer lo que necesites con el prompt completo
    console.log('Prompt completo:', fullPrompt);
    alert('Prompt generado con éxito. Ver la consola para ver el resultado.');
    
    cerrarPopup2();
}

// Modifica la función abrirPopup2 para resetear el formulario
function abrirPopup2() {
    const popup = document.getElementById('promptPopup');
    document.getElementById('promptType').value = '';
    document.getElementById('configOptions').classList.add('hidden');
    document.getElementById('generatedPrompt').textContent = '';
    document.getElementById('userInput').value = '';
    popup.classList.add('show');
}


// Seleccionar opción en los popups
function seleccionarOpcion(element, value) {
    // Deseleccionar todas las opciones primero
    const options = element.parentElement.querySelectorAll('.option-card');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Seleccionar la opción clickeada
    element.classList.add('selected');
    
    // Marcar el radio button correspondiente
    const radio = element.querySelector('input[type="radio"]');
    radio.checked = true;
}

// Funciones de los botones del menú
function accionPerfil() {
    alert('Perfil seleccionado');
}

function accionConfiguracion() {
    alert('Configuración seleccionada');
}

function cerrarSesion() {
    alert('Sesión cerrada');
    // Aquí iría la lógica para cerrar sesión
}

function accion1() {
    alert('Acción 1 ejecutada');
}

function confirmarInforme() {
    alert('Configuración confirmada');
    // Aquí iría la lógica para procesar la selección
}