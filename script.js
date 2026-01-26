// Enhanced interactivity for the landing page

document.addEventListener('DOMContentLoaded', function() {
    try {
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
                            }, index * 100);
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
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        }
        
        // Add parallax effect to background circles on scroll
        const circles = document.querySelectorAll('.bg-circle');
        if (circles.length > 0) {
            let lastScrollY = window.scrollY;
            
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                
                circles.forEach((circle, index) => {
                    const speed = (index + 1) * 0.5;
                    const yPos = -(scrollY * speed);
                    circle.style.transform = `translateY(${yPos}px)`;
                });
                
                lastScrollY = scrollY;
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
        background: rgba(22, 163, 74, 0.3);
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
