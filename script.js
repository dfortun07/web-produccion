document.addEventListener("DOMContentLoaded", function () {
    const btnEjemplo = document.getElementById("btn-ejemplo");
    const textoEjemplo = document.getElementById("texto-ejemplo");

    const formTarea = document.getElementById("form-tarea");
    const textoTareaInput = document.getElementById("texto-tarea");
    const horaTareaInput = document.getElementById("hora-tarea");
    const mensajeForm = document.getElementById("mensaje-form");

    const listaTareas = document.getElementById("lista-tareas");
    const resumenTareas = document.getElementById("resumen-tareas");
    const btnLimpiarTodo = document.getElementById("btn-limpiar-todo");

    let cantidadTareas = 0;

    // Mostrar / ocultar ejemplo de día
    btnEjemplo.addEventListener("click", function () {
        textoEjemplo.classList.toggle("d-none");
    });

    // Agregar nueva tarea
    formTarea.addEventListener("submit", function (e) {
        e.preventDefault();

        const texto = textoTareaInput.value.trim();
        const hora = horaTareaInput.value;

        if (!texto) {
            mensajeForm.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Escribe al menos una tarea antes de añadirla.
                </div>
            `;
            return;
        }

        // Crear elemento de lista
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const spanTexto = document.createElement("span");
        spanTexto.textContent = hora ? `${hora} - ${texto}` : texto;

        const btnHecho = document.createElement("button");
        btnHecho.className = "btn btn-sm btn-outline-success";
        btnHecho.textContent = "Hecho";

        // Evento para marcar como realizada
        btnHecho.addEventListener("click", function () {
            spanTexto.classList.toggle("tarea-realizada");
        });

        li.appendChild(spanTexto);
        li.appendChild(btnHecho);
        listaTareas.appendChild(li);

        cantidadTareas++;
        actualizarResumen();

        // Limpiar formulario y mensaje
        textoTareaInput.value = "";
        horaTareaInput.value = "";
        mensajeForm.innerHTML = "";
    });

    // Limpiar todas las tareas
    btnLimpiarTodo.addEventListener("click", function () {
        listaTareas.innerHTML = "";
        cantidadTareas = 0;
        actualizarResumen();
    });

    function actualizarResumen() {
        if (cantidadTareas === 0) {
            resumenTareas.textContent = "Aún no has agregado tareas.";
        } else if (cantidadTareas === 1) {
            resumenTareas.textContent = "Tienes 1 tarea para hoy.";
        } else {
            resumenTareas.textContent = `Tienes ${cantidadTareas} tareas para hoy.`;
        }
    }
});
