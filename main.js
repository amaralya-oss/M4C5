document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // 1️⃣ OBTENER REFERENCIA AL FORMULARIO
    // ===============================

    // Buscamos en el HTML el elemento que tenga el id "formRegistro"
    // Esto nos permite trabajar con el formulario desde JavaScript
    const formulario = document.getElementById("formRegistro");

    // ===============================
    // FUNCIONES DE VALIDACIÓN EN TIEMPO REAL
    // ===============================

    const validaciones = {
        nombre: (valor) => {
            valor = valor.trim();
            return valor !== "" && valor.length >= 2;
        },
        edad: (valor) => {
            const num = Number(valor);
            return !isNaN(num) && num > 15 && num <= 35;
        },
   altura: (valor) => {
            // La altura se ingresa en centímetros
            // El mínimo requerido es 160cm
            const num = Number(valor);
            return !isNaN(num) && num >= 160;
        },
        posicion: (valor) => {
            return valor !== "";
        }
    };

    // Función para actualizar el estado visual del campo
    function actualizarEstadoCampo(inputElement, esValido) {
        inputElement.classList.remove("input-success", "input-error");

        if (esValido) {
            inputElement.classList.add("input-success");
            if (inputElement.nextElementSibling) {
                inputElement.nextElementSibling.textContent = "✔";
            }
        } else if (inputElement.value !== "" && inputElement.value !== inputElement.defaultValue) {
            inputElement.classList.add("input-error");
            if (inputElement.nextElementSibling) {
                inputElement.nextElementSibling.textContent = "❌";
            }
        } else {
            // Campo vacío, sin estado
            if (inputElement.nextElementSibling) {
                inputElement.nextElementSibling.textContent = "";
            }
        }
    }

    // ===============================
    // AGREGAR VALIDACIÓN EN TIEMPO REAL
    // ===============================

    const campos = {
        nombre: document.getElementById("nombre"),
        edad: document.getElementById("edad"),
        altura: document.getElementById("altura"),
        posicion: document.getElementById("posicion")
    };

    // Para cada campo, agregar listeners de input y blur
    Object.entries(campos).forEach(([nombreCampo, inputElement]) => {
        if (!inputElement) return;

        // Validar mientras se escribe
        inputElement.addEventListener("input", function () {
            const esValido = validaciones[nombreCampo](this.value);
            actualizarEstadoCampo(this, esValido);
        });

        // Validar al perder el foco
        inputElement.addEventListener("blur", function () {
            const esValido = validaciones[nombreCampo](this.value);
            if (this.value === "") {
                this.classList.remove("input-success", "input-error");
                if (this.nextElementSibling) {
                    this.nextElementSibling.textContent = "";
                }
            } else {
                actualizarEstadoCampo(this, esValido);
            }
        });
    });


    // ===============================
    // 2️⃣ ESCUCHAR EL EVENTO "SUBMIT"
    // ===============================

    // Le decimos al formulario:
    // "Cuando alguien presione el botón Registrar (submit), ejecuta esta función"
    formulario.addEventListener("submit", function (e) {

        // e representa el evento que ocurre (submit)
        // preventDefault() evita que el navegador recargue la página
        // (por defecto los formularios se recargan)
        e.preventDefault();


        // ===============================
        // 3️⃣ OBTENER LOS VALORES INGRESADOS
        // ===============================

        // .value obtiene lo que el usuario escribió
        // trim() elimina espacios al inicio y final
        const nombre = document.getElementById("nombre").value.trim();

        // Convertimos a número con Number()
        // Siempre convertir inputs tipo number porque llegan como string
        const edad = Number(document.getElementById("edad").value);

        // Lo mismo para altura
        const altura = Number(document.getElementById("altura").value);

        // En select, .value devuelve el valor seleccionado
        const posicion = document.getElementById("posicion").value;


        // ===============================
        // 4️⃣ VALIDACIONES (CONDICIONES DE BORDE)
        // ===============================

        // 🔹 Validar que el nombre no esté vacío
        if (nombre === "") {

            // Mostramos mensaje de error
            alert("Error: El nombre no puede estar vacío");

            // return detiene la ejecución de la función aquí
            // Si no lo ponemos, el código seguiría ejecutándose
            return;
        }

        // 🔹 Validar que la edad sea número válido y mayor a 15
        // isNaN significa "is Not a Number"
        if (isNaN(edad)) {

            alert("Error: Debe ingresar un número válido.");
            return;

        } else if (edad <= 15) {

            alert("Error: Debe ser mayor a 15 años.");
            return;

        } else if (edad > 35) {

            alert("Error: La edad máxima permitida es 35 años.");
            return;
        }

      // 🔹 Validar altura mínima
        // La altura mínima permitida es 160cm
        if (isNaN(altura) || altura < 160) {

            alert("Error: Altura mínima requerida es 160cm.");
            return;
        }

        // 🔹 Validar que se haya seleccionado una posición
        // Si no selecciona nada, el value será ""
        if (posicion === "") {

            alert("Error: Debe seleccionar una posición.");
            return;
        }


        // ===============================
        // 5️⃣ CLASIFICACIÓN POR EDAD Y ALTURA
        // ===============================

        let categoria;

       // Juvenil: menor de 16 Y menor a 180cm
        if (edad < 16 && altura < 180) {
            categoria = "Juvenil";
        }
        // Adulto: mayor o igual a 16 O altura mayor o igual a 180cm
        else if (edad >= 16 || altura >= 180) {
            categoria = "Adulto";
        }

        // ===============================
        // 6️⃣ SI TODO ESTÁ CORRECTO
        // ===============================

        // Si el código llegó hasta aquí,
        // significa que pasó todas las validaciones

alert(`
Jugador registrado correctamente:

Nombre: ${nombre}
Edad: ${edad}
Altura: ${altura}cm
Posición: ${posicion}
Categoría: ${categoria}
    `);

    });


    // ===============
    // Movimiento botón hero
    //==================
    document.querySelector('.hero__cta').addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });


    // ===============================
    // LLUVIA DE PELOTITAS
    // ===============================

    const rainContainer = document.querySelector(".rain-container");

    function crearPelota() {
        const ball = document.createElement("img");
        ball.src = "assets/pelota.png"; // ajusta la ruta si es necesario
        ball.classList.add("ball");

        // Posición horizontal aleatoria
        ball.style.left = Math.random() * 100 + "vw";

        // Tamaño aleatorio
        const size = Math.random() * 40 + 40;
        ball.style.width = size + "px";

        // Duración aleatoria
        const duration = Math.random() * 5 + 5;
        ball.style.animationDuration = duration + "s";

        rainContainer.appendChild(ball);

        // Eliminar pelota después de caer
        setTimeout(() => {
            ball.remove();
        }, duration * 1000);
    }

    // Crear una pelota cada 1200ms
    setInterval(crearPelota, 1200);

});
