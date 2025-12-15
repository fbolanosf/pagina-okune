// OKUNE Consulting Website - Main JS

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Fail-safe: Force visibility after 1 second if observer hasn't triggered (fixes "disappearing content" bug)
    setTimeout(() => {
        animatedElements.forEach(el => {
            if (getComputedStyle(el).opacity === '0') {
                el.classList.add('visible');
            }
        });
    }, 1000);


    // 2. Number Counters Animation
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutQuad)
            const easeProgress = 1 - (1 - progress) * (1 - progress);

            const currentVal = easeProgress * target;

            // Format: if target is small (like 1.6), show 1 decimal. Else integers.
            if (target % 1 !== 0) {
                counter.innerText = currentVal.toFixed(1);
            } else {
                counter.innerText = Math.floor(currentVal);
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target; // Ensure final value is exact
            }
        };

        requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));


    // 3. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px -10px rgba(2,12,27,0.7)";
            navbar.style.padding = "10px 0";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "15px 0";
        }
    });

    // 4. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Simple toggle for now, could be animated
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--bg-light-navy)';
                navLinks.style.width = '100%';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
                navLinks.style.zIndex = '10000'; // Ensure it's on top of everything
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                // Force close if menu is open (mobile behavior)
                if (navLinks.style.position === 'absolute') {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    // 6. LinkedIn Carousel Logic
    const carouselContainer = document.getElementById('carouselContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carouselContainer && prevBtn && nextBtn) {
        // Auto-scroll functionality
        let autoScrollInterval;
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                carouselContainer.scrollBy({ left: 320, behavior: 'smooth' });
                // Reset to start if at end (approximate check)
                if (carouselContainer.scrollLeft + carouselContainer.clientWidth >= carouselContainer.scrollWidth - 10) {
                    carouselContainer.scrollTo({ left: 0, behavior: 'smooth' });
                }
            }, 4000); // Scroll every 4 seconds
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        // Start auto-scroll
        startAutoScroll();

        // Pause on hover
        carouselContainer.addEventListener('mouseenter', stopAutoScroll);
        carouselContainer.addEventListener('mouseleave', startAutoScroll);

        nextBtn.addEventListener('click', () => {
            stopAutoScroll(); // Pause interaction
            carouselContainer.scrollBy({ left: 320, behavior: 'smooth' });
            startAutoScroll(); // Restart
        });

        prevBtn.addEventListener('click', () => {
            stopAutoScroll();
            carouselContainer.scrollBy({ left: -320, behavior: 'smooth' });
            startAutoScroll();
        });
    }

    // 5. Interactive Cases
    const caseTriggers = document.querySelectorAll('.case-trigger');

    caseTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const caseId = trigger.getAttribute('data-case');
            const details = document.getElementById(caseId + '-details');

            // Toggle active class
            if (details.classList.contains('active')) {
                details.classList.remove('active');
            } else {
                // Close others first (optional, but cleaner)
                document.querySelectorAll('.case-details').forEach(d => d.classList.remove('active'));
                details.classList.add('active');
            }
        });
    });

    // 7. Parallax Scrolling Effect
    const heroVideo = document.querySelector('.hero-video-bg');
    const techShapes = document.querySelectorAll('.tech-shape');
    const techParticles = document.querySelectorAll('.particle');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        // Parallax video (moves slower)
        if (heroVideo && scrolled < heroHeight) {
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Parallax tech shapes (different speeds)
        if (techShapes.length > 0 && scrolled < heroHeight) {
            techShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }

        // Parallax particles
        if (techParticles.length > 0 && scrolled < heroHeight) {
            techParticles.forEach((particle, index) => {
                const speed = (index + 1) * 0.15;
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }

        // Fade out scroll indicator
        if (scrollIndicator) {
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    });

    // 8. Smooth scroll for scroll indicator
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // 9. Scroll Progress Bar
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');

    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            scrollProgressBar.style.width = scrollPercent + '%';
        });
    }
});
