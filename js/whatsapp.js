// whatsapp.js
document.addEventListener("DOMContentLoaded", () => {
    initWhatsAppButton();
});

function initWhatsAppButton() {
    const btn = document.querySelector(".whatsapp-button");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const phoneNumber = "593987654321"; // 👈 cambia por tu número (con código país)
        const message = encodeURIComponent("Hola, me gustaría agendar una cita.");
        const url = `https://wa.me/${phoneNumber}?text=${message}`;

        // Abrir en nueva pestaña
        window.open(url, "_blank");
    });
}
