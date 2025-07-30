document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect (tidak ada perubahan)
    const header = document.getElementById('header');
    if (header) {
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

    // Mobile Menu Toggle (tidak ada perubahan)
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

    // Smooth Scroll for Navigation Links (tidak ada perubahan)
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

    // Mobile Product Carousel (tidak ada perubahan)
    const carousel = document.querySelector('.mobile-products');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let indicators = [];

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
        indicators = document.querySelectorAll('.indicator');
    }

    // Call createIndicators on DOMContentLoaded
    createIndicators();

    if (carousel && indicatorsContainer) {
        // Update dots based on scroll position
        carousel.addEventListener('scroll', function() {
            if (indicators.length === 0) return;
            const scrollPosition = carousel.scrollLeft;
            const firstCard = carousel.querySelector('.mobile-product');
            if (!firstCard) return;
            const cardWidth = firstCard.offsetWidth;

            if (cardWidth === 0) return;

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

        // Auto-scroll prevention for touch devices
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active-drag');
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
            if (!isDown) return;
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

    // === GLOBAL VARIABLES ===
    let nextTestimonial, prevTestimonial, startAutoSlide, stopAutoSlide;

    document.addEventListener('DOMContentLoaded', () => {
        const carousel   = document.getElementById('testimonial-carousel');
        const track      = document.getElementById('testimonial-track');
        const indicators = document.getElementById('testimonial-indicators');
        const prevBtn    = document.getElementById('prevBtn');
        const nextBtn    = document.getElementById('nextBtn');

        if (!carousel || !track) return;

        const cards            = track.querySelectorAll('.testimonial-card');
        let currentIndex       = 0;
        let autoInterval       = null;
        const delay            = 2000; // 2 detik

        // --- Helpers ---
        const visibleCards = () => window.innerWidth >= 1024 ? 3 :
                                    window.innerWidth >= 768  ? 2 : 1;

        const createDots = () => {
            if (!indicators) return;
            indicators.innerHTML = '';
            const sets = Math.ceil(cards.length / 2 / visibleCards());
            for (let i = 0; i < sets; i++) {
            const dot = document.createElement('span');
            dot.className = 'w-3 h-3 bg-gray-400 rounded-full cursor-pointer';
            dot.dataset.index = i;
            indicators.appendChild(dot);
            }
            updateDots(0);
        };

        const updateDots = idx => {
            indicators?.querySelectorAll('span').forEach((d, i) =>
            d.classList.toggle('bg-primary-blue', i === idx)
            );
        };

        const scrollTo = idx => {
            const vw = carousel.offsetWidth;
            carousel.scrollTo({ left: idx * vw, behavior: 'smooth' });
            currentIndex = idx;
            updateDots(idx);
        };

        // --- Fungsi GLOBAL (agar bisa diakses di luar) ---
        nextTestimonial = () => {
            const vw = carousel.offsetWidth;
            const max = carousel.scrollWidth - vw;
            if (carousel.scrollLeft < max - 10) {
            scrollTo(currentIndex + 1);
            } else {
            carousel.scrollTo({ left: 0, behavior: 'auto' });
            scrollTo(0);
            }
        };

        prevTestimonial = () => {
            const vw = carousel.offsetWidth;
            if (carousel.scrollLeft > vw) {
            scrollTo(currentIndex - 1);
            } else {
            const max = carousel.scrollWidth - vw;
            carousel.scrollTo({ left: max, behavior: 'auto' });
            scrollTo(Math.floor(max / vw));
            }
        };

        startAutoSlide = () => {
            stopAutoSlide();
            autoInterval = setInterval(nextTestimonial, delay);
        };

        stopAutoSlide = () => {
            if (autoInterval) clearInterval(autoInterval);
        };

        // --- Event listeners ---
        prevBtn?.addEventListener('click', prevTestimonial);
        nextBtn?.addEventListener('click', nextTestimonial);

        indicators?.addEventListener('click', e => {
            if (e.target.dataset.index != null) {
            scrollTo(+e.target.dataset.index);
            stopAutoSlide();
            startAutoSlide();
            }
        });

        carousel.addEventListener('scroll', () => {
            stopAutoSlide();
            const idx = Math.round(carousel.scrollLeft / carousel.offsetWidth);
            updateDots(idx);
            setTimeout(startAutoSlide, 500);
        });

        // --- init ---
        createDots();
        scrollTo(0);
        startAutoSlide();

        // Responsive
        window.addEventListener('resize', () => {
            createDots();
            scrollTo(0);
            startAutoSlide();
        });
    });

// --- Header & lain-lain (kode lama Anda) ---
// ... (letakkan di bawah, tidak perlu diubah) ...arousel exists

    // Flip Effect on Mobile (tidak ada perubahan)
    if (window.innerWidth < 769) {
        console.log("Mobile detected, adding event listeners");

        // Menambahkan event listener pada setiap card produk di carousel
        document.querySelectorAll('.product-card').forEach(card => {
            // Fungsi umum untuk menangani flip berdasarkan event
            const handleCardFlip = function(e) {
                console.log("Product card interaction detected");

                const target = e.target;

                // 1. Periksa apakah yang diklik adalah tombol keranjang atau SVG di dalamnya
                // Tombol keranjang memiliki kelas `text-blue-400` dan berada di dalam `.product-front`
                const isCartButton = target.closest('.product-front button.text-blue-400');

                if (isCartButton) {
                    this.classList.toggle('flipped'); // Lakukan flip
                    e.stopPropagation(); // Penting: Hentikan event agar tidak memicu listener lain
                    return; // Flip sudah ditangani, keluar dari fungsi
                }

                // 2. Periksa apakah yang diklik adalah tombol lain (misal "Buy Now") atau tautan
                // Jika ya, JANGAN lakukan flip
                if (target.closest('button') || target.closest('a')) {
                    console.log("Clicked on another button or link, preventing flip.");
                    return; // Jangan lakukan flip, biarkan tombol/link berfungsi normal
                }

                // 3. Jika bukan tombol keranjang, tombol lain, atau tautan,
                // maka itu adalah tap umum pada area kartu, Lakukan flip
                console.log("Clicked on general card area, toggling flip.");
                this.classList.toggle('flipped'); // Menambah atau menghapus kelas flipped
            }.bind(card); // Bind 'this' ke elemen card agar bisa menggunakan this.classList.toggle

            // Tambahkan event listener untuk 'click' (untuk sebagian besar mobile & desktop)
            card.addEventListener('click', handleCardFlip);

            // Tambahkan event listener untuk 'touchstart' (untuk perangkat mobile murni)
            // Ini akan memastikan respons yang lebih cepat pada mobile
            card.addEventListener('touchstart', handleCardFlip);
        });
    } else {
        console.log("Not a mobile view (or larger screen)");
    }

    console.log('Lexon Beauty website loaded successfully');
});

// baru tambahkan listener global
document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  if (nextBtn) nextBtn.addEventListener('click', () => nextTestimonial && nextTestimonial());
  if (prevBtn) prevBtn.addEventListener('click', () => prevTestimonial && prevTestimonial());
});