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

        // Auto-scroll prevention for touch devices
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
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

    // Product Flip on Mobile
    if (window.innerWidth < 1024) {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('button')) return; // Don't flip if clicking on button
                this.classList.toggle('flipped'); // Toggle flip state
            });
        });
    }

    console.log('Lexon Beauty website loaded successfully');
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Products Carousel
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
});

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

    // Mobile Product Carousel (pastikan ini di dalam satu DOMContentLoaded)
    const carousel = document.querySelector('.mobile-products');
    const indicators = document.querySelectorAll('.indicator');

    if (carousel) {
        // Update dots based on scroll position
        carousel.addEventListener('scroll', function() {
            const scrollPosition = carousel.scrollLeft;
            // Dapatkan lebar kartu pertama sebagai referensi
            const firstCard = carousel.querySelector('.mobile-product');
            if (!firstCard) return; // Pencegahan error jika tidak ada kartu
            const cardWidth = firstCard.offsetWidth;
            const currentIndex = Math.round(scrollPosition / cardWidth);

            updateDots(currentIndex); // Update dots based on current index
        });

        // Click on dots to scroll to corresponding product
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const firstCard = carousel.querySelector('.mobile-product');
                if (!firstCard) return;
                const cardWidth = firstCard.offsetWidth;
                carousel.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            });
        });

        // Initialize dots
        updateDots(0);

        // Auto-scroll prevention for touch devices (jika ingin tetap ada)
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
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

    // Product Flip on Mobile
    if (window.innerWidth < 1024) { // Cek lagi apakah ini masih diinginkan
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('button')) return; // Don't flip if clicking on button
                this.classList.toggle('flipped'); // Toggle flip state
            });
        });
    }

    console.log('Lexon Beauty website loaded successfully');
});

// Menambahkan event listener untuk flip effect pada mobile
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('click', function() {
        // Toggle kelas 'flipped' saat produk diklik untuk flip
        card.classList.toggle('flipped');
    });
});
