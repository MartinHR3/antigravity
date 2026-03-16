import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
    const biografiaSection = document.getElementById('biografia-section');
    if (!biografiaSection) return;

    // Small delay to let preloader finish first
    setTimeout(() => {
        gsap.from(".bio-text", {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".bio-img", {
            y: 40,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3
        });
    }, 500);
});
