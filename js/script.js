/**
 * Digizen Solutions - Main JavaScript File
 * This file contains all the JavaScript functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#' or empty
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Portfolio filtering (for portfolio.html)
    const portfolioFilters = document.querySelectorAll('.portfolio-filter button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                portfolioFilters.forEach(f => f.classList.remove('bg-primary', 'text-white'));
                portfolioFilters.forEach(f => f.classList.add('bg-gray-100', 'text-gray-800'));
                
                // Add active class to current filter
                this.classList.remove('bg-gray-100', 'text-gray-800');
                this.classList.add('bg-primary', 'text-white');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.classList.remove('opacity-0');
                            item.classList.add('opacity-100');
                        }, 50);
                    } else if (item.classList.contains(filterValue)) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.classList.remove('opacity-0');
                            item.classList.add('opacity-100');
                        }, 50);
                    } else {
                        item.classList.add('opacity-0');
                        item.classList.remove('opacity-100');
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300); // Match this with the CSS transition time
                    }
                });
            });
        });
    }

    // Testimonial Slider (if exists)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        const nextBtn = document.querySelector('.testimonial-next');
        const prevBtn = document.querySelector('.testimonial-prev');
        
        // Initialize slider
        if (slides.length > 0) {
            slides.forEach((slide, index) => {
                if (index !== 0) {
                    slide.classList.add('hidden');
                }
            });
        }
        
        // Next slide function
        const goToNextSlide = () => {
            slides[currentSlide].classList.add('hidden');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.remove('hidden');
        };
        
        // Previous slide function
        const goToPrevSlide = () => {
            slides[currentSlide].classList.add('hidden');
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            slides[currentSlide].classList.remove('hidden');
        };
        
        // Add event listeners if buttons exist
        if (nextBtn) nextBtn.addEventListener('click', goToNextSlide);
        if (prevBtn) prevBtn.addEventListener('click', goToPrevSlide);
        
        // Auto-advance slides every 5 seconds
        setInterval(goToNextSlide, 5000);
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real application, you would send this to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would handle the form submission here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Sticky header effect
    const header = document.querySelector('nav');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
                header.classList.add('bg-white/95');
                header.classList.remove('bg-white');
            } else {
                header.classList.remove('shadow-lg');
                header.classList.remove('bg-white/95');
                header.classList.add('bg-white');
            }
        });
    }
});
