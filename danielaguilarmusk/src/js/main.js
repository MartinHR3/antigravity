import { createIcons, Menu, X, LogOut, Clock, Map, MapPin, Plus, Trash2, GripVertical, Pencil } from 'lucide';

// Initialize Lucide Icons globally
document.addEventListener('DOMContentLoaded', () => {
    createIcons({
        icons: {
            Menu,
            X,
            LogOut,
            Clock,
            Map,
            MapPin,
            Plus,
            Trash2,
            GripVertical,
            Pencil
        }
    });

    initNavbar();
    initPreloader();
});

// Navbar Logic
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMobileMenuOpen = false;

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 || isMobileMenuOpen) {
            navbar.classList.add('bg-[#0f172a]/95', 'backdrop-blur-md', 'border', 'border-white/10', 'text-brand-text', 'shadow-lg');
            navbar.classList.remove('bg-transparent', 'text-white');
        } else {
            navbar.classList.remove('bg-[#0f172a]/95', 'backdrop-blur-md', 'border', 'border-white/10', 'text-brand-text', 'shadow-lg');
            navbar.classList.add('bg-transparent', 'text-white');
        }
    });

    // Mobile Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            isMobileMenuOpen = !isMobileMenuOpen;

            if (isMobileMenuOpen) {
                mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
                mobileMenu.classList.replace('max-h-0', 'max-h-64');
                mobileMenu.classList.replace('opacity-0', 'opacity-100');
                mobileMenu.classList.replace('py-0', 'pt-8');
                mobileMenu.classList.add('pb-4');
                navbar.classList.add('bg-[#0f172a]/95', 'backdrop-blur-md', 'border', 'border-white/10', 'text-brand-text', 'shadow-lg');
                navbar.classList.remove('bg-transparent', 'text-white');
            } else {
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                mobileMenu.classList.replace('max-h-64', 'max-h-0');
                mobileMenu.classList.replace('opacity-100', 'opacity-0');
                mobileMenu.classList.replace('pt-8', 'py-0');
                mobileMenu.classList.remove('pb-4');

                if (window.scrollY <= 50) {
                    navbar.classList.remove('bg-[#0f172a]/95', 'backdrop-blur-md', 'border', 'border-white/10', 'text-brand-text', 'shadow-lg');
                    navbar.classList.add('bg-transparent', 'text-white');
                }
            }
            createIcons({ icons: { Menu, X } });
        });
    }

    // Set active year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Preloader Logic
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');

    if (!preloader || !preloaderText) return;

    // Import GSAP statically here just for the preloader if available globally, otherwise we assume it's bundled
    import('gsap').then(({ default: gsap }) => {
        const tl = gsap.timeline({
            onComplete: () => {
                preloader.remove();
            }
        });

        tl.fromTo(preloaderText,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
        )
            .to(preloaderText, {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: "power2.in",
                delay: 0.8
            })
            .to(preloader, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut"
            });
    });
}
