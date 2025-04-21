document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isActive);
        });
    }

    // Smooth Scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn(`Target element not found for link: ${this.getAttribute('href')}`);
            }
        });
    });

    // Sticky Header and Scroll to Top Button
    const header = document.querySelector('.header');
    const scrollBtn = document.querySelector('.scroll-top');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Sticky Header
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Scroll to Top Button
        if (scrollBtn) {
            scrollBtn.style.display = scrollY > 200 ? 'block' : 'none';
        }
    };

    if (header || scrollBtn) {
        window.addEventListener('scroll', debounce(handleScroll, 100));
    }

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}