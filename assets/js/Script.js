// assets/js/script.js — Insumo Fast

document.addEventListener('DOMContentLoaded', () => {

    // ── Referencias ──────────────────────────────────────
    const cartCount      = document.getElementById('cart-count');
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    const toast          = document.getElementById('cart-toast');
    const toastMsg       = document.getElementById('cart-toast-msg');

    // ── Estado ───────────────────────────────────────────
    let cantidad = 0;
    let toastTimer = null;

    // ── Actualizar badge ──────────────────────────────────
    function actualizarBadge() {
        cartCount.textContent = cantidad;
        cartCount.classList.remove('badge-pulse');
        void cartCount.offsetWidth; // reflow para reiniciar animación
        cartCount.classList.add('badge-pulse');
    }

    // ── Mostrar toast ─────────────────────────────────────
    function mostrarToast(nombreProducto) {
        toastMsg.textContent = `🛒 "${nombreProducto}" agregado — ${cantidad} producto${cantidad !== 1 ? 's' : ''} en el carrito`;

        toast.classList.add('toast-visible');

        // Reinicia el timer si ya había uno activo
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('toast-visible');
        }, 3000);
    }

    // ── Evento: click en cada botón Agregar ───────────────
    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            // Obtiene el nombre del producto desde la card
            const card = btn.closest('.card');
            const nombre = card.querySelector('.product-name').textContent;

            cantidad++;
            actualizarBadge();
            mostrarToast(nombre);

            // Feedback visual en el botón
            const textoOriginal = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-check-lg me-1"></i> ¡Agregado!';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = textoOriginal;
                btn.disabled = false;
            }, 1200);
        });
    });

});