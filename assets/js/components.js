// ── CARGAR COMPONENTES ──
function cargarComponente(id, ruta) {
    fetch(ruta)
        .then(res => res.text())
        .then(html => document.getElementById(id).innerHTML = html)
        .catch(err => console.error(`Error cargando ${ruta}:`, err));
}
function abrirModal(ruta, titulo) {
    document.getElementById('modal-iframe').src = ruta;
    document.getElementById('modal-titulo').textContent = titulo;
    document.getElementById('modal').classList.add('activo');
    document.body.style.overflow = 'hidden';
}
function cerrarModal() {
    document.getElementById('modal').classList.remove('activo');
    document.getElementById('modal-iframe').src = '';
    document.body.style.overflow = '';
}
function cerrarModalFuera(e) {
    if (e.target === document.getElementById('modal')) cerrarModal();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarModal(); });
cargarComponente('header', 'components/header.html');
cargarComponente('footer', 'components/footer.html');
cargarComponente('whatsapp', 'components/whatsapp-btn.html');