(function() {
    "use strict";

    // --- DOM Elements ---
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggle');
    const mainNav = document.getElementById('mainNav');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const revealElements = document.querySelectorAll('.section-reveal');

    // --- Theme Management ---
    const updateThemeIcon = (isLight) => {
        const icon = themeToggleBtn.querySelector('.icon');
        icon.textContent = isLight ? '🌞' : '🌙';
    };

    const setTheme = (isLight) => {
        if (isLight) {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        }
        localStorage.setItem('elan-theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('elan-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    themeToggleBtn.addEventListener('click', () => {
        const isCurrentlyLight = body.classList.contains('light-mode');
        setTheme(!isCurrentlyLight);
    });

    // --- Scroll Effects ---
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Navbar state
        if (scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }

        // Scroll Top Button
        if (scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Scroll Reveal
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.85) {
                el.classList.add('active');
            }
        });
    };

    // Scroll Top Action
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Form Interaction ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const formRow = document.getElementById('formRow');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate sending delay
            setTimeout(() => {
                // Hide the form fields
                formRow.classList.add('d-none');
                
                // Show success status
                formStatus.classList.remove('d-none');
                
                // Redirect after 5 seconds
                setTimeout(() => {
                    window.location.href = window.location.pathname; // Redirect to same page
                }, 5000);
            }, 1000);
        });
    }

    // --- Initialize ---
    window.addEventListener('scroll', handleScroll);
    
    // Set current year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Trigger once on load
    handleScroll();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                const navCollapse = document.getElementById('navMenu');
                if (navCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

})();
