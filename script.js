document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) { // Pastikan header ada
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('glass-effect', 'shadow-lg');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('glass-effect', 'shadow-lg');
                header.classList.add('bg-transparent');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        const menuIcon = mobileMenuBtn.querySelector('div'); // Ambil div di dalam button
        mobileMenuBtn.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('show');
                if (menuIcon) menuIcon.className = 'icon-x text-xl text-gray-700'; // Change icon to 'X'
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                if (menuIcon) menuIcon.className = 'icon-menu text-xl text-gray-700'; // Revert to 'menu' icon
            }
        });

        // Close mobile menu when clicking on navigation links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                if (menuIcon) menuIcon.className = 'icon-menu text-xl text-gray-700';
                isMenuOpen = false;
            });
        });
    }

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 0; // Handle if header is null
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
    const indicatorsContainer = document.querySelector('.carousel-indicators'); // Dapatkan container indikator
    let indicators = []; // Definisikan di sini untuk scope yang benar

    // Function to create indicators based on number of products
    function createIndicators() {
        if (!carousel || !indicatorsContainer) return;

        indicatorsContainer.innerHTML = ''; // Bersihkan indikator yang ada
        const productCards = carousel.querySelectorAll('.mobile-product');
        productCards.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            indicator.setAttribute('data-index', index);
            indicatorsContainer.appendChild(indicator);
        });
        indicators = document.querySelectorAll('.indicator'); // Perbarui NodeList indicators
    }

    // Call createIndicators on DOMContentLoaded
    createIndicators();


    if (carousel && indicatorsContainer) { // Pastikan kedua elemen ada
        // Update dots based on scroll position
        carousel.addEventListener('scroll', function() {
            if (indicators.length === 0) return; // Pastikan indikator sudah dibuat
            const scrollPosition = carousel.scrollLeft;
            // Dapatkan lebar produk pertama atau gunakan lebar yang dihitung dari flex-basis
            const firstCard = carousel.querySelector('.mobile-product');
            if (!firstCard) return; // Pencegahan error jika tidak ada kartu
            const cardWidth = firstCard.offsetWidth;

            if (cardWidth === 0) return; // Hindari pembagian dengan nol

            const currentIndex = Math.round(scrollPosition / cardWidth);
            updateDots(currentIndex);
        });

        // Click on dots to scroll to corresponding product
        indicatorsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('indicator')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                const firstCard = carousel.querySelector('.mobile-product');
                if (!firstCard) return;
                const cardWidth = firstCard.offsetWidth;
                carousel.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            }
        });

        // Initialize dots
        updateDots(0);

        // Auto-scroll prevention for touch devices (drag-to-scroll)
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active-drag'); // Optional: add a class for styling when dragging
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active-drag');
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active-drag');
        });

        carousel.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
            carousel.scrollLeft = scrollLeft - walk;
        });
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

    // Product Flip on Mobile (Pastikan hanya ada satu blok ini)
    if (window.innerWidth < 769) { // Lebih konsisten dengan media query CSS max-width: 768px
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Mencegah flip jika klik terjadi pada tombol atau tautan
                if (e.target.closest('button') || e.target.closest('a')) {
                    return; 
                }
                this.classList.toggle('flipped'); // Toggle status flip
            });
        });
    }

    console.log('Lexon Beauty website loaded successfully');
});