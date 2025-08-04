document.addEventListener('DOMContentLoaded', function() {

    // =================================================================
    // 1. EFEK SCROLL PADA HEADER
    // =================================================================
    function initHeaderEffect() {
        const header = document.getElementById('header');
        if (!header) return;

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

    // =================================================================
    // 2. TOGGLE MENU MOBILE
    // =================================================================
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenuBtn || !mobileMenu) return;

        let isMenuOpen = false;
        const menuIcon = mobileMenuBtn.querySelector('div');

        const toggleMenu = (forceClose = false) => {
            isMenuOpen = forceClose ? false : !isMenuOpen;
            mobileMenu.classList.toggle('hidden', !isMenuOpen);
            mobileMenu.classList.toggle('show', isMenuOpen);
            if (menuIcon) {
                menuIcon.className = isMenuOpen ? 'icon-x text-xl text-gray-700' : 'icon-menu text-xl text-gray-700';
            }
        };
        
        mobileMenuBtn.addEventListener('click', () => toggleMenu());

        // Tutup menu saat link navigasi di-klik
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });
    }

    // =================================================================
    // 3. SMOOTH SCROLL UNTUK LINK NAVIGASI
    // =================================================================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // =================================================================
    // 4. FILTER PRODUK & INTEGRASI CAROUSEL MOBILE
    // =================================================================
    function initProductFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');
        const mobileCarousel = document.querySelector('.mobile-products');
        
        if (filterButtons.length === 0 || productCards.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update status tombol aktif
                document.querySelector('.filter-btn.active').classList.remove('active');
                button.classList.add('active');

                // Proses filter produk
                productCards.forEach(card => {
                    const productCategory = card.getAttribute('data-category');
                    const isVisible = (filter === 'all' || productCategory === filter);
                    card.style.display = isVisible ? '' : 'none';
                });

                // Penting: Update indikator carousel setelah filter
                if (mobileCarousel) {
                    updateMobileCarouselIndicators();
                    mobileCarousel.scrollTo({ left: 0, behavior: 'auto' }); // Reset posisi scroll
                }
            });
        });
    }

    // =================================================================
    // 5. CAROUSEL PRODUK MOBILE (INDIKATOR & DRAG)
    // =================================================================
    function updateMobileCarouselIndicators() {
        const carousel = document.querySelector('.mobile-products');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        if (!carousel || !indicatorsContainer) return;

        indicatorsContainer.innerHTML = ''; // Bersihkan indikator lama
        
        // Hanya hitung produk yang terlihat (tidak di-display:none)
        const visibleProductCards = Array.from(carousel.querySelectorAll('.mobile-product')).filter(
            card => card.style.display !== 'none'
        );

        if (visibleProductCards.length === 0) return;

        visibleProductCards.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = 'indicator';
            indicator.setAttribute('data-index', index);
            indicatorsContainer.appendChild(indicator);
        });

        updateActiveDot(0); // Set dot pertama sebagai aktif
    }
    
    function updateActiveDot(index) {
        const indicators = document.querySelectorAll('.carousel-indicators .indicator');
        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function initMobileProductCarousel() {
        const carousel = document.querySelector('.mobile-products');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        if (!carousel || !indicatorsContainer) return;

        // Inisialisasi indikator saat halaman dimuat
        updateMobileCarouselIndicators();

        // Event listener untuk scroll
        carousel.addEventListener('scroll', function() {
            const visibleCards = Array.from(carousel.querySelectorAll('.mobile-product')).filter(
                card => card.style.display !== 'none'
            );
            if (visibleCards.length === 0) return;

            const cardWidth = visibleCards[0].offsetWidth;
            if (cardWidth === 0) return;
            
            const currentIndex = Math.round(carousel.scrollLeft / cardWidth);
            updateActiveDot(currentIndex);
        });
        
        // Event listener untuk klik pada dot indikator
        indicatorsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('indicator')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                const visibleCards = Array.from(carousel.querySelectorAll('.mobile-product')).filter(
                     card => card.style.display !== 'none'
                );
                if (visibleCards.length === 0) return;

                const cardWidth = visibleCards[0].offsetWidth;
                carousel.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            }
        });
    }

    // =================================================================
    // 6. EFEK FLIP PADA KARTU PRODUK (HANYA MOBILE)
    // =================================================================
    function initCardFlipEffect() {
        if (window.innerWidth >= 769) return; // Hanya berjalan di mobile

        document.querySelectorAll('.product-card').forEach(card => {
            const handleCardFlip = (e) => {
                const isCartButton = e.target.closest('.product-front button.text-blue-400');
                const isOtherButton = e.target.closest('button, a');

                if (isCartButton) {
                    card.classList.toggle('flipped');
                    e.stopPropagation();
                    return;
                }
                
                if (isOtherButton && !isCartButton) {
                    return; // Jangan lakukan apa-apa jika tombol lain di klik
                }

                card.classList.toggle('flipped');
            };
            
            // Menggunakan 'click' saja sudah cukup untuk kebanyakan kasus modern
            card.addEventListener('click', handleCardFlip);
        });
    }

    // =================================================================
    // 7. CAROUSEL TESTIMONIAL
    // =================================================================
    function initTestimonialCarousel() {
        const carousel = document.getElementById('testimonial-carousel');
        const track = document.getElementById('testimonial-track');
        if (!carousel || !track) return;

        const indicators = document.getElementById('testimonial-indicators');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const cards = track.querySelectorAll('.testimonial-card');

        let currentIndex = 0;
        let autoInterval = null;
        const delay = 3000; // 3 detik

        const updateTestimonialDots = (idx) => {
            indicators?.querySelectorAll('span').forEach((d, i) => {
                d.classList.toggle('bg-primary-blue', i === idx);
                d.classList.toggle('bg-gray-400', i !== idx);
            });
        };

        const scrollToTestimonial = (idx) => {
            const scrollWidth = carousel.offsetWidth * idx;
            carousel.scrollTo({ left: scrollWidth, behavior: 'smooth' });
            currentIndex = idx;
            updateTestimonialDots(idx);
        };
        
        const nextTestimonial = () => {
            const totalPages = Math.ceil(track.scrollWidth / carousel.offsetWidth);
            const nextIndex = (currentIndex + 1) % totalPages;
            scrollToTestimonial(nextIndex);
        };

        const prevTestimonial = () => {
            const totalPages = Math.ceil(track.scrollWidth / carousel.offsetWidth);
            const prevIndex = (currentIndex - 1 + totalPages) % totalPages;
            scrollToTestimonial(prevIndex);
        };

        const startAutoSlide = () => {
            stopAutoSlide();
            autoInterval = setInterval(nextTestimonial, delay);
        };

        const stopAutoSlide = () => {
            clearInterval(autoInterval);
        };

        // Event Listeners
        prevBtn?.addEventListener('click', () => { stopAutoSlide(); prevTestimonial(); startAutoSlide(); });
        nextBtn?.addEventListener('click', () => { stopAutoSlide(); nextTestimonial(); startAutoSlide(); });
        indicators?.addEventListener('click', e => {
            if (e.target.dataset.index) {
                stopAutoSlide();
                scrollToTestimonial(+e.target.dataset.index);
                startAutoSlide();
            }
        });
        
        // Inisialisasi
        startAutoSlide();
    }

    // =================================================================
    // 8. INITIALIZE IMAGE SLIDESHOW
    // =================================================================
    function initImageSlideshow() {
        const images = document.querySelectorAll('.slideshow-image');
        if (images.length === 0) return;

        let currentIndex = 0;

        function showNextImage() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }

        setInterval(showNextImage, 5000); // Change image every 5 seconds
    }

    // =================================================================
    // EKSEKUSI SEMUA FUNGSI INISIALISASI
    // =================================================================
    initHeaderEffect();
    initMobileMenu();
    initSmoothScroll();
    initProductFilter();
    initMobileProductCarousel();
    initCardFlipEffect();
    initTestimonialCarousel();
    initImageSlideshow();

    console.log("Lexon Beauty website loaded and all scripts initialized successfully.");
});