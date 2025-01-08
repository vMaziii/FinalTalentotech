document.addEventListener("DOMContentLoaded", () => {
    const carritoItems = document.getElementById("carrito-items");
    const totalElement = document.getElementById("total");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    const pagarCarritoBtn = document.getElementById("pagar-carrito");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const actualizarCarrito = () => {
        carritoItems.innerHTML = "";
        let total = 0;

        carrito.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Eliminar";
            removeBtn.addEventListener("click", () => {
                carrito.splice(index, 1);
                guardarCarrito();
                actualizarCarrito();
            });

            li.appendChild(removeBtn);
            carritoItems.appendChild(li);

            total += item.price;
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    const guardarCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
    });

    pagarCarritoBtn?.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de pagar.");
        } else {
            window.location.href = "pagar.html";
        }
    });

    // Función de manejo del carrito en la página de pago
    if (document.getElementById("carrito-detalles")) {
        const detallesInput = document.getElementById("carrito-detalles");
        const totalPagoInput = document.getElementById("total-pago");

        if (carrito.length === 0) {
            alert("No hay productos en el carrito. Redirigiendo al menú...");
            window.location.href = "index.html";
            return;
        }

        let detalles = "";
        let total = 0;

        carrito.forEach((item) => {
            detalles += `${item.name} - $${item.price.toFixed(2)}\n`;
            total += item.price;
        });

        detallesInput.value = detalles.trim();
        totalPagoInput.value = `$${total.toFixed(2)}`;
    }

    // Agregar productos al carrito
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));

            carrito.push({ name, price });
            guardarCarrito();
            actualizarCarrito();
        });
    });

    actualizarCarrito();
});


