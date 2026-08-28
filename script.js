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
