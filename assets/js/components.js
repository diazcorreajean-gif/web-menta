// ── CARGAR COMPONENTES ──
function cargarComponente(id, ruta) {
    fetch(ruta)
        .then(res => res.text())
        .then(html => document.getElementById(id).innerHTML = html)
        .catch(err => console.error(`Error cargando ${ruta}:`, err));
}
cargarComponente('header', 'components/header.html');
cargarComponente('footer', 'components/footer.html');
cargarComponente('whatsapp', 'components/whatsapp-btn.html');