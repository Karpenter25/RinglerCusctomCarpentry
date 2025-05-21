document.addEventListener("DOMContentLoaded", function () {
    // ------------------------------------
    // Global Elements
    // ------------------------------------
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle'); // Consistent with HTML
    const mainNavigation = document.getElementById('main-navigation'); // Consistent with HTML
    const backToTopButton = document.getElementById('back-to-top'); // Consistent with HTML

    // ------------------------------------
    // Mobile Menu Toggle
    // ------------------------------------
    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);
            mainNavigation.classList.toggle('active'); // Use 'active' class for styling
            document.body.classList.toggle('no-scroll'); // Optional: Prevent body scrolling when menu is open
        });

        // Close menu if a nav link is clicked (useful for single-page sites or smooth scrolls)
        mainNavigation.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavigation.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', false);
                    mainNavigation.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // ------------------------------------
    // Smooth Scroll for Internal Anchor Links
    // ------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only smooth scroll if it's an actual anchor on the current page
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------
    // Sticky Header & Scroll to Top Button Visibility
    // ------------------------------------
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const scrollThreshold = 50; // Pixels to scroll before header becomes sticky/scrolled
        const backToTopThreshold = 300; // Pixels to scroll before back to top button appears

        // Sticky Header
        if (header) {
            if (scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Scroll to Top Button
        if (backToTopButton) {
            if (scrollY > backToTopThreshold) {
                backToTopButton.classList.add('show'); // Use 'show' class for CSS visibility
            } else {
                backToTopButton.classList.remove('show');
            }
        }
    };

    // Attach scroll event listener with debounce
    if (header || backToTopButton) {
        window.addEventListener('scroll', debounce(handleScroll, 100));
        // Also call once on load to set initial state if user loads partway down
        handleScroll();
    }

    // ------------------------------------
    // Scroll to Top Button Click Event
    // ------------------------------------
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ------------------------------------
    // Dynamically Update Copyright Year
    // ------------------------------------
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }

    // ------------------------------------
    // FormSubmit Redirect URL (Specific to contact.html)
    // ------------------------------------
    const formRedirectUrlInput = document.getElementById('form-redirect-url');
    if (formRedirectUrlInput) {
        formRedirectUrlInput.value = "https://ringler-custom-carpentry.vercel.app/thankyou.html";
    }

    // ------------------------------------
    // Portfolio Lightbox Functionality (Specific to portfolio.html)
    // ------------------------------------
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    if (portfolioItems.length > 0 && lightbox && lightboxImg && lightboxCaption && closeBtn) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const fullImgSrc = item.getAttribute('data-full-img');
                const captionText = item.getAttribute('data-caption');

                lightboxImg.src = fullImgSrc;
                lightboxImg.alt = captionText;
                lightboxCaption.textContent = captionText;
                lightbox.style.display = 'flex'; // Use flex to center content
                document.body.classList.add('no-scroll'); // Prevent body scrolling when lightbox is open
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.classList.remove('no-scroll');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // Only close if clicked directly on the overlay, not the image
                lightbox.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        });
    }
});

// ------------------------------------
// Debounce Function (kept outside DOMContentLoaded as it's a utility)
// ------------------------------------
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}