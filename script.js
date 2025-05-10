// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const header = document.querySelector('header');

    // Toggle menu mobile
    const menuDropdown = document.querySelector('.menu-dropdown');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêcher la propagation du clic
        if (menuDropdown.style.display === 'block') {
            menuDropdown.style.display = 'none';
            menuDropdown.style.animation = 'none';
        } else {
            menuDropdown.style.display = 'block';
            menuDropdown.style.animation = 'fadeIn 0.3s ease';
        }
        menuToggle.classList.toggle('active');
        console.log('Menu toggled'); // Pour le débogage
    });

    // Fermer le menu mobile en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target)) {
            menuDropdown.style.display = 'none';
            menuToggle.classList.remove('active');
        }

        if (!header.contains(e.target) && mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
        }
    });

    // Gestion du menu responsive
    function checkMenuDisplay() {
        if (window.innerWidth <= 850) {
            mainMenu.classList.remove('active');
        }
    }

    // Vérifier au chargement et au redimensionnement
    checkMenuDisplay();
    window.addEventListener('resize', checkMenuDisplay);

    // Animation du header au scroll
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Ajouter une classe pour réduire la taille du header au scroll
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Cacher/montrer le header selon la direction du scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Effet de scroll pour le header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            // Animation du bouton hamburger
            this.classList.toggle('active');
        });
    }

    // Fermer le menu lorsqu'un lien est cliqué
    const menuLinks = document.querySelectorAll('.main-menu a');
    const dropdownLinks = document.querySelectorAll('.menu-dropdown a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainMenu.classList.contains('active')) {
                mainMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });

    // Fermer le menu déroulant lorsqu'un lien est cliqué
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            menuDropdown.style.display = 'none';
            menuToggle.classList.remove('active');
        });
    });

    // Effet de parallaxe pour la bannière
    const heroBanner = document.querySelector('.hero-banner');
    if (heroBanner) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroBanner.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
        });
    }

    // Animation au défilement pour les cartes de catégories avec délai progressif
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Ajouter un délai progressif pour chaque carte
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 150); // 150ms de délai entre chaque carte
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animation des cartes de catégories
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        // Définir l'état initial
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Observer pour l'animation au défilement
        observer.observe(card);

        // Ajouter un effet de survol 3D
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;

            // Calculer l'angle de rotation basé sur la position de la souris
            const rotateY = mouseX / 20;
            const rotateX = -mouseY / 20;

            // Appliquer la transformation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        // Réinitialiser la transformation lorsque la souris quitte la carte
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Style pour l'animation de fade-in
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0px); }
            }

            .float-animation {
                animation: float 4s ease-in-out infinite;
            }

            .menu-toggle.active i {
                transform: rotate(90deg);
                color: var(--primary-color);
            }
        </style>
    `);

    // Ajouter une animation flottante à certains éléments
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('float-animation');
    }

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajustement pour le header fixe
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation des titres de section au défilement
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        titleObserver.observe(title);
    });
});