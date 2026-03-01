// ========================================
// Services Section Functionality
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Service Card Animations on Scroll
    // ========================================
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optionally stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        // Add initial invisible state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        // Observe the card
        observer.observe(card);
    });
    
    // Add animation class
    const style = document.createElement('style');
    style.textContent = `
        .service-card.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // Service Card Click Tracking
    // ========================================
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('.service-title').textContent;
            console.log(`Service card clicked: ${serviceTitle}`);
            
            // Add a subtle pulse effect on click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // ========================================
    // Responsive Grid Adjustments
    // ========================================
    function adjustGridLayout() {
        const windowWidth = window.innerWidth;
        const servicesGrid = document.querySelector('.services-section .row.g-4');
        
        if (!servicesGrid) return;
        
        // Adjust grid gap based on screen size
        if (windowWidth < 576) {
            servicesGrid.style.setProperty('--bs-gutter-x', '0.8rem');
            servicesGrid.style.setProperty('--bs-gutter-y', '0.8rem');
        } else if (windowWidth < 768) {
            servicesGrid.style.setProperty('--bs-gutter-x', '1rem');
            servicesGrid.style.setProperty('--bs-gutter-y', '1rem');
        } else {
            servicesGrid.style.setProperty('--bs-gutter-x', '1.5rem');
            servicesGrid.style.setProperty('--bs-gutter-y', '1.5rem');
        }
    }
    
    // Initial adjustment
    adjustGridLayout();
    
    // Adjust on window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            adjustGridLayout();
            console.log('Grid layout adjusted for screen size');
        }, 250);
    });
    
    // ========================================
    // Service Features Toggle (Optional Enhancement)
    // ========================================
    const serviceFeatureLists = document.querySelectorAll('.service-features');
    
    serviceFeatureLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            // Add staggered animation on card hover
            item.style.transition = `all 0.3s ease ${index * 0.05}s`;
        });
    });
    
    // Add hover effect to parent cards
    serviceCards.forEach(card => {
        const features = card.querySelectorAll('.service-features li');
        
        card.addEventListener('mouseenter', function() {
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
            });
        });
    });
    
    // ========================================
    // Lazy Load Service Icons (Performance Optimization)
    // ========================================
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    const iconObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('icon-visible');
                iconObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    serviceIcons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        iconObserver.observe(icon);
    });
    
    // Add icon visible class style
    const iconStyle = document.createElement('style');
    iconStyle.textContent = `
        .service-icon.icon-visible {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(iconStyle);
    
    // ========================================
    // CTA Button Enhancement
    // ========================================
    const ctaButton = document.querySelector('.services-cta .btn-primary');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            console.log('CTA button clicked from services section');
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Add ripple styles
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .btn-primary {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // ========================================
    // Section Spacing Manager
    // ========================================
    function manageSectionSpacing() {
        const servicesSection = document.querySelector('.services-section');
        if (!servicesSection) return;
        
        const windowWidth = window.innerWidth;
        
        // Adjust padding based on screen size
        if (windowWidth < 576) {
            servicesSection.style.paddingTop = '50px';
            servicesSection.style.paddingBottom = '50px';
        } else if (windowWidth < 768) {
            servicesSection.style.paddingTop = '60px';
            servicesSection.style.paddingBottom = '60px';
        } else if (windowWidth < 992) {
            servicesSection.style.paddingTop = '80px';
            servicesSection.style.paddingBottom = '80px';
        } else {
            servicesSection.style.paddingTop = '100px';
            servicesSection.style.paddingBottom = '100px';
        }
    }
    
    // Initial spacing adjustment
    manageSectionSpacing();
    
    // Adjust on resize
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(manageSectionSpacing, 250);
    });
    
    // ========================================
    // Accessibility Enhancements
    // ========================================
    
    // Add keyboard navigation for service cards
    serviceCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Ensure focus is visible
    serviceCards.forEach(card => {
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid #00adb5';
            this.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // ========================================
    // Performance Monitoring
    // ========================================
    console.log('Services section initialized successfully!');
    console.log(`Total service cards: ${serviceCards.length}`);
    console.log(`Screen width: ${window.innerWidth}px`);
    console.log(`Layout mode: ${window.innerWidth < 576 ? 'Mobile' : window.innerWidth < 768 ? 'Small Tablet' : window.innerWidth < 992 ? 'Tablet' : 'Desktop'}`);
});

// ========================================
// Utility Functions
// ========================================

// Function to get active service cards in viewport
function getVisibleServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    const visibleCards = [];
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            visibleCards.push(card);
        }
    });
    
    return visibleCards;
}

// Function to highlight a specific service
function highlightService(index) {
    const cards = document.querySelectorAll('.service-card');
    if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        cards[index].style.transform = 'scale(1.02)';
        setTimeout(() => {
            cards[index].style.transform = '';
        }, 500);
    }
}

// Export functions if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getVisibleServiceCards,
        highlightService
    };
}