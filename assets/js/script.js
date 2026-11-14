// ==================== //
// Intersection Observer for fade-in animations
// ==================== //

document.addEventListener('DOMContentLoaded', () => {
    const animated = Array.from(document.querySelectorAll('.card, .stack-card'));

    animated.forEach(el => {
        const siblings = Array.from(el.parentElement.children)
            .filter(child => child.matches('.card, .stack-card'));
        const index = siblings.indexOf(el);
        el.style.animationDelay = `${Math.min(index, 5) * 0.08}s`;
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
        animated.forEach(el => el.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animated.forEach(el => observer.observe(el));
    }

    // ==================== //
    // Nav background on scroll
    // ==================== //

    const nav = document.querySelector('nav');
    const setNavState = () => {
        nav.classList.toggle('scrolled', window.scrollY > 100);
    };

    setNavState();
    window.addEventListener('scroll', setNavState, { passive: true });
});

// ==================== //
// Custom Cursor
// ==================== //

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isFirstMove = true;
    let isTouch = false;
    let rafId = null;
    const LERP = 0.18;
    const DOT_DEFAULT = 1.8;
    const DOT_HOVER = 1;
    let dotScale = DOT_DEFAULT;
    let targetDotScale = DOT_DEFAULT;
    const SCALE_LERP = 0.15;

    cursorDot.style.transform = 'translate3d(-100px, -100px, 0)';
    cursorRing.style.transform = 'translate3d(-100px, -100px, 0)';

    function hideCursor() {
        cursorDot.style.display = 'none';
        cursorRing.style.display = 'none';
    }

    function scheduleTick() {
        if (rafId === null) {
            rafId = requestAnimationFrame(tick);
        }
    }

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('pointerenter', e => {
            if (e.pointerType === 'touch') return;
            targetDotScale = DOT_HOVER;
            scheduleTick();
        });
        el.addEventListener('pointerleave', e => {
            if (e.pointerType === 'touch') return;
            targetDotScale = DOT_DEFAULT;
            scheduleTick();
        });
    });

    document.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch') {
            isTouch = true;
            hideCursor();
            return;
        }
        isTouch = false;
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (isFirstMove) {
            ringX = mouseX;
            ringY = mouseY;
            isFirstMove = false;
        }
        cursorDot.style.display = 'block';
        cursorRing.style.display = 'block';
        scheduleTick();
    });

    document.addEventListener('touchstart', () => {
        isTouch = true;
        hideCursor();
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        isFirstMove = true;
        mouseX = -100;
        mouseY = -100;
        ringX = -100;
        ringY = -100;
        hideCursor();
        targetDotScale = DOT_DEFAULT;
        scheduleTick();
    });

    function tick() {
        ringX += (mouseX - ringX) * LERP;
        ringY += (mouseY - ringY) * LERP;
        dotScale += (targetDotScale - dotScale) * SCALE_LERP;
        cursorDot.style.transform = `translate3d(${mouseX - 2.5}px, ${mouseY - 2.5}px, 0) scale(${dotScale})`;
        cursorRing.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;

        const ringSettled = Math.abs(mouseX - ringX) < 0.1 && Math.abs(mouseY - ringY) < 0.1;
        const scaleSettled = Math.abs(targetDotScale - dotScale) < 0.001;

        rafId = (!isTouch && (!ringSettled || !scaleSettled)) ? requestAnimationFrame(tick) : null;
    }

    scheduleTick();
}
