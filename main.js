document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // 1️⃣ OBTENER REFERENCIA AL FORMULARIO
    // ===============================

    // Buscamos en el HTML el elemento que tenga el id "formRegistro"
    // Esto nos permite trabajar con el formulario desde JavaScript
    const formulario = document.getElementById("formRegistro");


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
        if (isNaN(altura) || altura < 1.60) {

            alert("Error: Altura mínima requerida es 1.60cm.");
            return;
        }

        // 🔹 Validar que se haya seleccionado una posición
        // Si no selecciona nada, el value será ""
        if (posicion === "") {

            alert("Error: Debe seleccionar una posición.");
            return;
        }


        // ===============================
        // 5️⃣ CLASIFICACIÓN POR EDAD
        // ===============================

        // Creamos una variable vacía
        // Aquí guardaremos la categoría del jugador
        let categoria;

        // Si edad es menor a 18 → Juvenil
        if (edad < 18) {

            categoria = "Juvenil";

        } else {
            // Si no es menor a 18 → Adulto
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
Altura: ${altura}m
Posición: ${posicion}
Categoría: ${categoria}
    `);

    });



});