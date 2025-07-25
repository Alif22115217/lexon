document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('glass-effect', 'shadow-lg');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('glass-effect', 'shadow-lg');
            header.classList.add('bg-transparent');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('div');
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('show');
            menuIcon.className = 'icon-x text-xl text-gray-700'; // Change icon to 'X'
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            menuIcon.className = 'icon-menu text-xl text-gray-700'; // Revert to 'menu' icon
        }
    });

    // Close mobile menu when clicking on navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            menuIcon.className = 'icon-menu text-xl text-gray-700';
            isMenuOpen = false;
        });
    });

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Product Carousel
    const carousel = document.querySelector('.mobile-products');
    const indicators = document.querySelectorAll('.indicator');

    if (carousel) {
        // Update dots based on scroll position
        carousel.addEventListener('scroll', function() {
            const scrollPosition = carousel.scrollLeft;
            const cardWidth = carousel.querySelector('.mobile-product').offsetWidth;
            const currentIndex = Math.round(scrollPosition / cardWidth);

            updateDots(currentIndex); // Update dots based on current index
        });

        // Click on dots to scroll to corresponding product
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const cardWidth = carousel.querySelector('.mobile-product').offsetWidth;
                carousel.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            });
        });

        // Initialize dots
        updateDots(0);
    }

    function updateDots(index) {
        indicators.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Product Flip on Mobile
    if (window.innerWidth < 1024) {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('button')) return; // Don't flip if clicking on button
                this.classList.toggle('flipped'); // Toggle flip state
            });
        });
    }

    // Product Flip on Mobile
    if (window.innerWidth < 769) { // Lebih konsisten dengan media query CSS max-width: 768px
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('button')) return; // Don't flip if clicking on button
                this.classList.toggle('flipped'); // Toggle flip state
            });
        });
    }

    console.log('Lexon Beauty website loaded successfully');
});
