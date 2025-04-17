const promptsData = {
  "idioma": "Español",
  "prompts": {
    "solo_codigo": {
      "lenguaje": "Python",
      "prompt": "Escribe únicamente el código necesario en {lenguaje} para realizar la siguiente tarea. No incluyas explicaciones ni texto adicional. Usa comentarios en el código solo si son necesarios para entender la lógica."
    },
    "parafraseo_formal": {
      "prompt": "Reescribe el siguiente texto con un tono formal y profesional. Conserva el significado original y mejora la redacción, la claridad y la estructura:"
    },
    "correccion": {
      "prompt": "Revisa y corrige el siguiente texto, eliminando errores ortográficos, gramaticales y de estilo. Asegúrate de que sea claro, coherente y fluido:"
    },
    "translate": {
      "idioma_origen": "Detectar",
      "idioma_traducido": "Español",
      "prompt": "Traduce el siguiente texto del idioma {idioma_origen} al {idioma_traducido}. Mantén el significado original, el tono y el contexto:"
    },
    "resumen": {
      "numero_lineas": "5",
      "prompt": "Resume el siguiente texto en aproximadamente {numero_lineas} líneas, destacando los puntos clave y conservando el sentido general:"
    },
    "evaluacion": {
      "nivel_exigencia": "5",
      "prompt": "Evalúa el siguiente contenido con un nivel de exigencia de {nivel_exigencia} sobre 10. Señala errores, oportunidades de mejora, puntos fuertes y da una calificación final del 1 al 10, con justificación detallada:"
    },
    "explicacion_tecnica": {
      "prompt": "Explica de forma clara, detallada y didáctica los siguientes conceptos o temas. Incluye ejemplos relevantes para facilitar su comprensión, si es necesario:"
    },
    "generar_ideas": {
      "prompt": "Genera una lista de ideas creativas o soluciones viables para el siguiente problema o reto. Considera enfoques variados e innovadores:"
    },
    "generar_critica": {
      "prompt": "Elabora una crítica constructiva del siguiente contenido, destacando fortalezas, debilidades y sugerencias concretas para su mejora:"
    },
    "recomendaciones": {
      "prompt": "Proporciona recomendaciones claras y accionables basadas en el siguiente análisis. Enfócate en mejorar el rendimiento, la eficiencia o la calidad del proyecto:"
    },
    "completar_codigo": {
      "lenguaje": "Python",
      "prompt": "Completa el siguiente fragmento de código en {lenguaje}, asegurándote de que cumpla con el propósito indicado y funcione correctamente:"
    },
    "generar_documentacion": {
      "prompt": "Genera documentación técnica clara y útil para el siguiente código o proyecto. Incluye: descripción general, instrucciones de uso, dependencias y ejemplos prácticos:"
    },
    "analisis_de_datos": {
      "prompt": "Analiza los siguientes datos y ofrece una interpretación detallada. Identifica patrones, correlaciones, anomalías y conclusiones relevantes:"
    },
    "optimizar_codigo": {
      "lenguaje": "Python",
      "prompt": "Reescribe el siguiente código en {lenguaje} para optimizar su rendimiento, legibilidad y eficiencia. Explica brevemente los cambios si es necesario:"
    }
  }
};

// Funciones para el menú de usuario
function toggleUserMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

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
function abrirPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    if (popupId === 'promptPopup') {
        // Resetear el formulario de prompts
        document.getElementById('promptType').value = '';
        document.getElementById('configOptions').classList.add('hidden');
        document.getElementById('generatedPrompt').textContent = '';
        document.getElementById('userInput').value = '';
        document.getElementById('charCounter').textContent = '0/10.000';
    }
}

function cerrarPopup(popupId) {
    document.getElementById(popupId).classList.remove('show');
    document.body.style.overflow = 'auto';
}

function seleccionarOpcion(element, value) {
    const options = element.parentElement.querySelectorAll('.option-card');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    const radio = element.querySelector('input[type="radio"]');
    radio.checked = true;
}

// Funciones para el popup de prompts
function cambiarPrompt() {
    const promptType = document.getElementById('promptType').value;
    const configOptions = document.getElementById('configOptions');
    
    if (!promptType) {
        configOptions.classList.add('hidden');
        document.getElementById('generatedPrompt').textContent = '';
        return;
    }
    
    const promptConfig = promptsData.prompts[promptType];
    
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
                    if (key === 'nivel_exigencia') input.max = '10';
                }
            }
            
            input.addEventListener('input', actualizarPrompt);
            
            optionDiv.appendChild(label);
            optionDiv.appendChild(input);
            configOptions.appendChild(optionDiv);
        }
    }
    
    actualizarPrompt();
}

function actualizarPrompt() {
    const promptType = document.getElementById('promptType').value;
    if (!promptType) return;
    
    const promptConfig = promptsData.prompts[promptType];
    let promptText = promptConfig.prompt;
    
    for (const [key, value] of Object.entries(promptConfig)) {
        if (key !== 'prompt') {
            const input = document.getElementById(`config_${key}`);
            const currentValue = input ? input.value : value;
            promptText = promptText.replace(`{${key}}`, currentValue);
        }
    }
    
    document.getElementById('generatedPrompt').textContent = promptText;
}

function abrirPreviewPrompt() {
    actualizarPrompt();
    const promptContent = document.getElementById('generatedPrompt').textContent;
    
    if (!promptContent.trim()) {
        alert('Por favor selecciona y configura un tipo de prompt primero');
        return;
    }
    
    document.getElementById('previewPromptContent').textContent = promptContent;
    document.getElementById('previewPromptPopup').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function copiarPreviewPrompt() {
    const previewContent = document.getElementById('previewPromptContent').textContent;
    navigator.clipboard.writeText(previewContent).then(() => {
        alert('Prompt copiado al portapapeles');
    });
}

function actualizarContador() {
    const textarea = document.getElementById('userInput');
    const charCounter = document.getElementById('charCounter');
    const count = textarea.value.length;
    charCounter.textContent = `${count}/10.000`;
    
    if (count > 9000) {
        charCounter.style.color = '#e74c3c';
    } else if (count > 7500) {
        charCounter.style.color = '#f39c12';
    } else {
        charCounter.style.color = '';
    }
}

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
    console.log('Prompt completo:', fullPrompt);
    alert('Prompt generado con éxito. Ver la consola para ver el resultado.');
    cerrarPopup('promptPopup');
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
}

function confirmarInforme() {
    alert('Configuración confirmada');
    cerrarPopup('apiPopup');
}

function accion1() {
    alert('Acción 1 seleccionada');
}
