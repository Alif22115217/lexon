document.addEventListener('DOMContentLoaded', function () {
    // === Header Scroll Effect ===
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('glass-effect', 'shadow-lg');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('glass-effect', 'shadow-lg');
                header.classList.add('bg-transparent');
            }
        });
    }

    // === Mobile Menu Toggle ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        const menuIcon = mobileMenuBtn.querySelector('div');
        mobileMenuBtn.addEventListener('click', function () {
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('hidden', !isMenuOpen);
            mobileMenu.classList.toggle('show', isMenuOpen);
            if (menuIcon) menuIcon.className = isMenuOpen ? 'icon-x text-xl text-gray-700' : 'icon-menu text-xl text-gray-700';
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                if (menuIcon) menuIcon.className = 'icon-menu text-xl text-gray-700';
                isMenuOpen = false;
            });
        });
    }

    // === Smooth Scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = header ? header.offsetHeight : 0;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // === Mobile Carousel ===
    const carousel = document.querySelector('.mobile-products');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let indicators = [];

    function updateDots(index) {
        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function createIndicators() {
        if (!carousel || !indicatorsContainer) return;
        indicatorsContainer.innerHTML = '';
        const cards = carousel.querySelectorAll('.mobile-product');
        cards.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('indicator');
            dot.dataset.index = i;
            indicatorsContainer.appendChild(dot);
        });
        indicators = document.querySelectorAll('.indicator');
        updateDots(0);
    }

    createIndicators();

    if (carousel && indicatorsContainer) {
        carousel.addEventListener('scroll', function () {
            const firstCard = carousel.querySelector('.mobile-product');
            if (!firstCard) return;
            const index = Math.round(carousel.scrollLeft / firstCard.offsetWidth);
            updateDots(index);
        });

        indicatorsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('indicator')) {
                const index = +e.target.dataset.index;
                const card = carousel.querySelector('.mobile-product');
                if (card) {
                    carousel.scrollTo({ left: index * card.offsetWidth, behavior: 'smooth' });
                }
            }
        });

        // Drag scroll
        let isDown = false, startX, scrollLeft;
        carousel.addEventListener('mousedown', e => {
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
        carousel.addEventListener('mousemove', e => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            carousel.scrollLeft = scrollLeft - (x - startX) * 2;
        });
    }

    // === Flip Effect (Mobile) ===
    if (window.innerWidth < 769) {
        document.querySelectorAll('.product-card').forEach(card => {
            const flipCard = function (e) {
                const target = e.target;
                const isCartBtn = target.closest('.product-front button.text-blue-400');
                if (isCartBtn) {
                    this.classList.toggle('flipped');
                    e.stopPropagation();
                    return;
                }
                if (target.closest('button') || target.closest('a')) return;
                this.classList.toggle('flipped');
            }.bind(card);

            card.addEventListener('click', flipCard);
            card.addEventListener('touchstart', flipCard);
        });
    }

    // === Category Tabs ===
    const tabs = document.querySelectorAll('.category-tab');
    const allCards = document.querySelectorAll('.product-card');

    function showCategory(category) {
        tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
        });

        allCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        if (category === 'all') {
            card.classList.remove('hidden');
        } else {
            card.classList.toggle('hidden', !categories.includes(category));
        }
        });
    }

    // Default tampil semua
    showCategory('all');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        showCategory(category);
        });
    });


    console.log('Lexon Beauty website loaded successfully');
});
