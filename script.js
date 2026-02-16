// Enhanced interactivity for the PAMBCS website

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Simple and reliable carousel initialization
        const initializeCarousel = () => {
            console.log('Initializing carousel...');
            
            const carouselContainer = document.querySelector('[data-about-carousel]');
            if (!carouselContainer) {
                console.log('Carousel container not found');
                return;
            }
            
            const slides = Array.from(carouselContainer.querySelectorAll('.carousel-slide'));
            console.log(`Found ${slides.length} slides`);
            
            if (slides.length <= 1) {
                console.log('Not enough slides for carousel');
                return;
            }
            
            let currentIndex = 0;
            const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const intervalMs = 1500;
            let timer = null;

            const showSlide = (index) => {
                console.log(`Showing slide ${index}`);
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
            };

            const nextSlide = () => {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            };

            const startAutoPlay = () => {
                if (prefersReducedMotion) {
                    console.log('Reduced motion preferred, not starting autoplay');
                    return;
                }
                console.log('Starting autoplay');
                if (timer) clearInterval(timer);
                timer = setInterval(nextSlide, intervalMs);
            };

            const stopAutoPlay = () => {
                console.log('Stopping autoplay');
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
            };

            // Initialize first slide immediately
            showSlide(0);

            // Pause on hover
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);

            // Start autoplay immediately
            console.log('Starting autoplay immediately');
            startAutoPlay();
        };
        
        // Start carousel initialization immediately
        initializeCarousel();

        // Add ripple effect on card click
        const cards = document.querySelectorAll('.card');
        
        if (cards.length > 0) {
            cards.forEach(card => {
                card.addEventListener('click', function(e) {
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
                    
                    setTimeout(() => {
                        if (ripple.parentNode) {
                            ripple.remove();
                        }
                    }, 600);
                });
            });
            
            // Add staggered animation on page load
            if ('IntersectionObserver' in window) {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };
                
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                            }, index * 50);
                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);
                
                // Initialize cards with fade-in animation
                cards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(card);
                });
            }
            
            // Add keyboard navigation support
            cards.forEach(card => {
                card.setAttribute('tabindex', '0');
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        }

    } catch (error) {
        // Silently handle any errors to prevent breaking the page
        console.error('Error initializing page interactions:', error);
    }
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(27, 94, 32, 0.2);
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
document.head.appendChild(style);
