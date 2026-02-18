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
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
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
        product.addEventListener('mouseenter', function() { this.style.zIndex = '10'; });
        product.addEventListener('mouseleave', function() { this.style.zIndex = '1'; });
    });
    
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => { img.src = img.dataset.src || img.src; });
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

const header = document.querySelector('.argentum-header-inner');

if (header) {
    const nav = document.querySelector('.argentum-nav');
    const actions = document.querySelector('.argentum-header-actions');

    const hamburger = document.createElement('button');
    hamburger.classList.add('argentum-hamburger');
    hamburger.setAttribute('aria-label', 'Öppna meny');
    hamburger.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round">
        <line x1="3" y1="7" x2="21" y2="7"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="17" x2="21" y2="17"/>
    </svg>`;

    if (actions) {
        actions.appendChild(hamburger);
    }

    const overlay = document.createElement('div');
    overlay.classList.add('argentum-mobile-overlay');
    document.body.appendChild(overlay);

    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('argentum-mobile-menu');
    mobileMenu.style.cssText = 'display:none; transform: translateX(100%); transition: transform 0.3s ease;';

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('argentum-mobile-menu-close');
    closeBtn.innerHTML = '✕';

    const navLinks = nav ? nav.querySelectorAll('a') : [];
    const ul = document.createElement('ul');

    navLinks.forEach(function(link) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        a.addEventListener('click', closeMenu);
        li.appendChild(a);
        ul.appendChild(li);
    });

    mobileMenu.appendChild(closeBtn);
    mobileMenu.appendChild(ul);
    document.body.appendChild(mobileMenu);

    function openMenu() {
        mobileMenu.style.display = 'block';
        overlay.style.display = 'block';
        document.body.classList.add('argentum-menu-open');
        requestAnimationFrame(function() {
            mobileMenu.style.transform = 'translateX(0)';
            overlay.style.opacity = '1';
        });
    }

    function closeMenu() {
        mobileMenu.style.transform = 'translateX(100%)';
        overlay.style.opacity = '0';
        document.body.classList.remove('argentum-menu-open');
        setTimeout(function() {
            mobileMenu.style.display = 'none';
            overlay.style.display = 'none';
        }, 300);
    }

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
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
                setTimeout(() => { button.classList.remove('added'); }, 2000);
            }, 500);
        }
    });
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax-section').forEach(element => {
            element.style.backgroundPosition = `center ${-(scrolled * 0.5)}px`;
        });
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    document.querySelectorAll('.woocommerce-product-gallery__image').forEach((image, index) => {
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
    const siteHeader = document.querySelector('.site-header');
    
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            siteHeader.classList.toggle('scrolled', currentScroll > 100);
            siteHeader.classList.toggle('hidden', currentScroll > lastScroll && currentScroll > 200);
            lastScroll = currentScroll;
        });
    }
    
    console.log('Argentum theme loaded successfully');
});