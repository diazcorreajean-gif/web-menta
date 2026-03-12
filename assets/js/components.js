const base = window.location.pathname.includes('/pages/') ? '../' : '';

function cargarComponente(id, ruta, callback) {
    fetch(base + ruta)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error(`Error cargando ${ruta}:`, err));
}

function corregirRutas(id) {
    if (!base) return;
    document.querySelectorAll(`#${id} img`).forEach(img => {
        if (!img.src.includes('../')) {
            img.src = img.getAttribute('src').replace('assets/', '../assets/');
        }
    });
    document.querySelectorAll(`#${id} a`).forEach(a => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('pages/')) {
            a.href = href.replace('pages/', '');
        }
        if (href === 'index.html') {
            a.href = '../index.html';
        }
    });
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

cargarComponente('header', 'components/header.html', () => corregirRutas('header'));
cargarComponente('footer', 'components/footer.html', () => corregirRutas('footer'));
cargarComponente('whatsapp', 'components/whatsapp-btn.html');