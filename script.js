/* ============================================
   SPICE GARDEN — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- DOM Elements ---------- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const heroParallax = document.getElementById('heroParallax');
    const menuGrid = document.getElementById('menuGrid');
    const menuFilters = document.getElementById('menuFilters');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');


    /* ============================================
       NAVBAR — Scroll Effect
       ============================================ */
    let lastScroll = 0;

    const handleNavScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });


    /* ============================================
       MOBILE MENU — Hamburger Toggle
       ============================================ */
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    /* ============================================
       SMOOTH SCROLL
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });


    /* ============================================
       HERO — Parallax Effect
       ============================================ */
    const handleParallax = () => {
        if (!heroParallax) return;
        const scrollY = window.scrollY;
        const speed = 0.4;
        heroParallax.style.transform = `translateY(${scrollY * speed}px)`;
    };

    window.addEventListener('scroll', handleParallax, { passive: true });


    /* ============================================
       REVEAL ON SCROLL — Intersection Observer
       ============================================ */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for sibling reveals
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ============================================
       ABOUT — Count-Up Animation
       ============================================ */
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    const animateCountUp = (el, target, duration = 2000) => {
        let start = 0;
        const startTime = performance.now();

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(easedProgress * target);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsCounted) {
                statsCounted = true;
                statNumbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    animateCountUp(num, target);
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statsObserver.observe(num));


    /* ============================================
       MENU — Data & Rendering
       ============================================ */
    const menuItems = [
        {
            name: 'Butter Chicken',
            description: 'Tender chicken in a rich, creamy tomato-butter sauce with aromatic spices',
            price: '₹595',
            category: 'mains',
            image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Paneer Tikka',
            description: 'Chargrilled cottage cheese marinated in yoghurt and Tandoori spices',
            price: '₹425',
            category: 'starters',
            image: 'https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-Featured-1.jpg'
        },
        {
            name: 'Hyderabadi Biryani',
            description: 'Fragrant basmati rice slow-cooked with lamb, saffron, and whole spices',
            price: '₹695',
            category: 'mains',
            image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/hyderabadi-biryani-recipe-chicken.jpg'
        },
        {
            name: 'Crispy Samosa',
            description: 'Golden-fried pastry pockets stuffed with spiced potato and green peas',
            price: '₹245',
            category: 'starters',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Gulab Jamun',
            description: 'Soft milk-solid dumplings soaked in rose-cardamom sugar syrup',
            price: '₹295',
            category: 'desserts',
            image: 'https://www.cadburydessertscorner.com/hubfs/dc-website-2022/articles/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know.webp'
        },
        {
            name: 'Masala Dosa',
            description: 'Paper-thin rice crepe filled with spiced potato, served with chutneys',
            price: '₹345',
            category: 'mains',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Mango Lassi',
            description: 'Chilled blend of ripe Alphonso mango, yoghurt, and a hint of cardamom',
            price: '₹195',
            category: 'drinks',
            image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0'
        },
        {
            name: 'Rasmalai',
            description: 'Delicate cottage cheese discs immersed in saffron-pistachio cream',
            price: '₹345',
            category: 'desserts',
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80'
        }
    ];

    const renderMenuItems = (filter = 'all') => {
        menuGrid.innerHTML = '';

        menuItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.setAttribute('data-category', item.category);

            if (filter !== 'all' && item.category !== filter) {
                card.classList.add('hiding');
            }

            card.innerHTML = `
                <div class="menu-card-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy">
                    <span class="menu-card-category">${item.category}</span>
                </div>
                <div class="menu-card-body">
                    <h3 class="menu-card-name">${item.name}</h3>
                    <p class="menu-card-desc">${item.description}</p>
                    <span class="menu-card-price">${item.price}</span>
                </div>
            `;

            menuGrid.appendChild(card);
        });
    };

    // Initial render
    renderMenuItems();

    // Filter event listeners
    menuFilters.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        // Update active button
        menuFilters.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');
        renderMenuItems(filter);
    });


    /* ============================================
       GALLERY — Lightbox
       ============================================ */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);
    let currentImageIndex = 0;

    const openLightbox = (index) => {
        currentImageIndex = index;
        lightboxImg.src = galleryImages[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const navigateLightbox = (direction) => {
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentImageIndex];
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 200);
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });


    /* ============================================
       BOOKING FORM — Validation
       ============================================ */
    const setMinDate = () => {
        const dateInput = document.getElementById('bookingDate');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    };

    setMinDate();

    const validateForm = () => {
        let isValid = true;

        // Name validation
        const name = document.getElementById('guestName');
        const nameError = document.getElementById('nameError');
        if (!name.value.trim() || name.value.trim().length < 2) {
            nameError.textContent = 'Please enter your full name';
            name.parentElement.classList.add('error');
            isValid = false;
        } else {
            nameError.textContent = '';
            name.parentElement.classList.remove('error');
        }

        // Phone validation
        const phone = document.getElementById('guestPhone');
        const phoneError = document.getElementById('phoneError');
        const phoneRegex = /^[\+]?[0-9\s\-]{8,15}$/;
        if (!phone.value.trim() || !phoneRegex.test(phone.value.replace(/\s/g, ''))) {
            phoneError.textContent = 'Please enter a valid phone number';
            phone.parentElement.classList.add('error');
            isValid = false;
        } else {
            phoneError.textContent = '';
            phone.parentElement.classList.remove('error');
        }

        // Date validation
        const date = document.getElementById('bookingDate');
        const dateError = document.getElementById('dateError');
        if (!date.value) {
            dateError.textContent = 'Please select a date';
            date.parentElement.classList.add('error');
            isValid = false;
        } else {
            dateError.textContent = '';
            date.parentElement.classList.remove('error');
        }

        // Time validation
        const time = document.getElementById('bookingTime');
        const timeError = document.getElementById('timeError');
        if (!time.value) {
            timeError.textContent = 'Please select a time';
            time.parentElement.classList.add('error');
            isValid = false;
        } else {
            timeError.textContent = '';
            time.parentElement.classList.remove('error');
        }

        // Guests validation
        const guests = document.getElementById('guestCount');
        const guestsError = document.getElementById('guestsError');
        if (!guests.value) {
            guestsError.textContent = 'Please select number of guests';
            guests.parentElement.classList.add('error');
            isValid = false;
        } else {
            guestsError.textContent = '';
            guests.parentElement.classList.remove('error');
        }

        return isValid;
    };

    // Clear error on input
    const formInputs = bookingForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('error');
            const errorSpan = input.parentElement.querySelector('.form-error');
            if (errorSpan) errorSpan.textContent = '';
        });
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Show success message
            bookingForm.style.display = 'none';
            formSuccess.classList.add('active');

            // Reset after 5 seconds
            setTimeout(() => {
                bookingForm.reset();
                bookingForm.style.display = 'flex';
                formSuccess.classList.remove('active');
                setMinDate();
            }, 5000);
        }
    });


    /* ============================================
       ACTIVE NAV LINK — Scroll Spy
       ============================================ */
    const sections = document.querySelectorAll('section[id]');

    const highlightNavLink = () => {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.style.color = '');
                navLink.style.color = '#E8961E';
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink, { passive: true });

});



document.querySelectorAll('.orbit-item img').forEach(orbitImg => {
    orbitImg.addEventListener('click', function() {
        // 1. Beech wali main image ko select karein
        const mainImg = document.querySelector('.hero-main-dish img');
        
        // 2. Dono images ke src (link) aur alt text ko aapas mein badal (swap) dein
        const tempSrc = mainImg.src;
        const tempAlt = mainImg.alt;
        
        mainImg.src = this.src;
        mainImg.alt = this.alt;
        
        this.src = tempSrc;
        this.alt = tempAlt;
    });
});

