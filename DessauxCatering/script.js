


document.getElementById("contact-form").addEventListener("submit", function(event) {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;

    // Validación de campos
    if (!nombre || !email || !mensaje) {
        event.preventDefault(); // Prevenir el envío
        alert("Por favor, complete todos los campos.");
    }
});
