// ==================== //
// Intersection Observer for fade-in animations
// ==================== //

document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .stack-card, .tech-stack').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // ==================== //
    // Smooth scroll for nav links
    // ==================== //

    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==================== //
    // Nav background on scroll
    // ==================== //

    let lastScroll = 0;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.style.borderBottomColor = 'rgba(38, 38, 38, 1)';
        } else {
            nav.style.borderBottomColor = 'rgba(38, 38, 38, 0.5)';
        }

        lastScroll = currentScroll;
    }, { passive: true });
});

// ==================== //
// Custom Cursor
// ==================== //

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
const LERP = 0.12;
let dotScale = 1;
let targetDotScale = 1;
const DOT_HOVER = 1.5;
const SCALE_LERP = 0.15;

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { targetDotScale = DOT_HOVER; });
    el.addEventListener('mouseleave', () => { targetDotScale = 1; });
});

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.display = 'block';
    cursorRing.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
    targetDotScale = 1;
});

function tick() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    dotScale += (targetDotScale - dotScale) * SCALE_LERP;
    cursorDot.style.transform = `translate3d(${mouseX - 2.5}px, ${mouseY - 2.5}px, 0) scale(${dotScale})`;
    cursorRing.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
