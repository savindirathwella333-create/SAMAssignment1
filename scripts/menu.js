// ========================================
// Navigation Menu Functionality
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // ========================================
    // Smooth Scrolling for Navigation Links
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed navbar
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking (if open)
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ========================================
    // Navbar Background on Scroll
    // ========================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // ========================================
    // Close Mobile Menu on Outside Click
    // ========================================
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navbar.contains(e.target);
        const isNavbarOpen = navbarCollapse.classList.contains('show');
        
        if (!isClickInsideNav && isNavbarOpen && window.innerWidth < 992) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
    
    // ========================================
    // Carousel Auto-play Control
    // ========================================
    const carousel = document.querySelector('#heroCarousel');
    
    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 4000,
            ride: 'carousel',
            pause: 'hover',
            wrap: true
        });
        
        // Pause carousel when user is interacting with navigation
        navbar.addEventListener('mouseenter', function() {
            bsCarousel.pause();
        });
        
        navbar.addEventListener('mouseleave', function() {
            bsCarousel.cycle();
        });
        
        // Reset animations when carousel slides
        carousel.addEventListener('slide.bs.carousel', function(e) {
            // Remove animation classes from previous slide
            const prevSlide = e.relatedTarget.previousElementSibling || 
                             carousel.querySelector('.carousel-item:last-child');
            if (prevSlide) {
                const animatedElements = prevSlide.querySelectorAll('[class*="animate"]');
                animatedElements.forEach(el => {
                    el.style.animation = 'none';
                });
            }
        });
        
        carousel.addEventListener('slid.bs.carousel', function(e) {
            // Trigger animations on new slide
            const activeSlide = e.relatedTarget;
            const animatedElements = activeSlide.querySelectorAll('[class*="animate"]');
            
            animatedElements.forEach(el => {
                el.style.animation = 'none';
                // Force reflow
                void el.offsetWidth;
                el.style.animation = null;
            });
        });
    }
    
    // ========================================
    // Event Listeners
    // ========================================
    window.addEventListener('scroll', function() {
        handleNavbarScroll();
        setActiveNavLink();
    });
    
    // Initial calls
    handleNavbarScroll();
    setActiveNavLink();
    
    // ========================================
    // Mobile Menu Enhancement
    // ========================================
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            // Add slight delay to ensure Bootstrap has toggled the menu
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            }, 350);
        });
    }
    
    // Reset body overflow on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            document.body.style.overflow = 'auto';
        }
    });
    
    // ========================================
    // Prevent Carousel from Blocking Clicks
    // ========================================
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
        carouselInner.addEventListener('click', function(e) {
            // Allow button clicks to pass through
            if (!e.target.closest('.btn') && !e.target.closest('.carousel-control-prev') 
                && !e.target.closest('.carousel-control-next')) {
                e.stopPropagation();
            }
        });
    }
    
    // ========================================
    // Keyboard Navigation for Accessibility
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
    
    console.log('Navigation and carousel initialized successfully!');
});

// ========================================
// Utility Functions
// ========================================

// Function to programmatically navigate to a section
function navigateToSection(sectionId) {
    const targetSection = document.querySelector(sectionId);
    const navbar = document.querySelector('.navbar');
    
    if (targetSection && navbar) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Function to pause carousel
function pauseCarousel() {
    const carousel = document.querySelector('#heroCarousel');
    if (carousel) {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) {
            bsCarousel.pause();
        }
    }
}

// Function to resume carousel
function resumeCarousel() {
    const carousel = document.querySelector('#heroCarousel');
    if (carousel) {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) {
            bsCarousel.cycle();
        }
    }
}

// Export functions for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToSection,
        pauseCarousel,
        resumeCarousel
    };
}