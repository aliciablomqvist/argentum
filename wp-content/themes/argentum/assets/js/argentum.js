/**
 * Argentum Theme JavaScript
 * Elegant interactions for silver jewelry e-commerce
 */

document.addEventListener('DOMContentLoaded', function() {
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    const sections = document.querySelectorAll('.wp-block-group, .woocommerce ul.products li.product');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 100;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cartObserver = new MutationObserver(() => {
            cartCount.classList.remove('pulse');
            void cartCount.offsetWidth;
            cartCount.classList.add('pulse');
        });
        
        cartObserver.observe(cartCount, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }
    
    const products = document.querySelectorAll('.woocommerce ul.products li.product');
    products.forEach(product => {
        product.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add_to_cart_button') || 
            e.target.closest('.add_to_cart_button')) {
            
            const button = e.target.classList.contains('add_to_cart_button') 
                ? e.target 
                : e.target.closest('.add_to_cart_button');
            
            button.classList.add('loading');
            
            setTimeout(() => {
                button.classList.remove('loading');
                button.classList.add('added');
                button.textContent = 'Added to cart';
                
                setTimeout(() => {
                    button.classList.remove('added');
                }, 2000);
            }, 500);
        }
    });
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.backgroundPosition = `center ${yPos}px`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    const productImages = document.querySelectorAll('.woocommerce-product-gallery__image');
    productImages.forEach((image, index) => {
        image.style.animationDelay = `${index * 0.1}s`;
    });
    
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    
    if (searchToggle && searchForm) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchForm.classList.toggle('active');
            
            if (searchForm.classList.contains('active')) {
                searchForm.querySelector('input[type="search"]').focus();
            }
        });
    }
    
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    console.log('Argentum theme loaded successfully');
});
