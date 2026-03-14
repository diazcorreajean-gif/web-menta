/* ════════════════════════════════
    ANIMATIONS.JS — MENTA
   ════════════════════════════════ */

    document.addEventListener('DOMContentLoaded', () => {

    // ════════════════════════════════
    // 1. NAVBAR — cambia al hacer scroll
    // ════════════════════════════════
    const nav = document.querySelector('.menta-nav');

    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }


    // ════════════════════════════════
    // 2. SCROLL REVEAL — Intersection Observer
    // ════════════════════════════════
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealEls.forEach(el => observer.observe(el));
    }


    // ════════════════════════════════
    // 3. CURSOR PERSONALIZADO — solo en desktop
    // ════════════════════════════════
    if (!document.documentElement.classList.contains('no-cursor')) {

        const dot  = document.createElement('div');
        const ring = document.createElement('div');
        dot.className  = 'cursor-dot';
        ring.className = 'cursor-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mouseX = 0, mouseY = 0;
        let ringX  = 0, ringY  = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top  = mouseY + 'px';
        });

        function animateCursor() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactivos = document.querySelectorAll('a, button, .card, .portafolio__card, .paso');
        interactivos.forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });

        document.addEventListener('mouseleave', () => {
            dot.style.opacity  = '0';
            ring.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            dot.style.opacity  = '1';
            ring.style.opacity = '1';
        });
    }


    // ════════════════════════════════
    // 4. SMOOTH SCROLL
    // ════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
    // ── VALIDACIÓN FORMULARIO ──
    const form = document.querySelector('.formulario__form');
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                input.classList.add('error');
            });
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    
        form.addEventListener('submit', (e) => {
            let valido = true;
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.classList.add('error');
                    valido = false;
                }
            });
            if (!valido) e.preventDefault();
        });
    }