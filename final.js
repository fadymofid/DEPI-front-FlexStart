const body = document.body;
const toggleButton = document.getElementById('toggle-button');


const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark-theme') {
    body.classList.add('dark-theme');
    toggleButton.textContent = '☀️';
} else {
    toggleButton.textContent = '🌙';
}


function toggleTheme() {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light-theme');
        toggleButton.textContent = '🌙';
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        toggleButton.textContent = '☀️';
    }
}


"use strict";

// Toggle Scrolled Class on Body
function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) {
        console.error("Header element not found.");
        return;
    }
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
}

// Dropdown Toggle in Navigation Menu
function initDropdownToggle() {
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
            this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });
}

// Scroll to Top Button
function initScrollTop() {
    let scrollTop = document.querySelector('.scroll-top');
    if (!scrollTop) {
        console.error("Scroll to top button not found.");
        return;
    }

    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
    }

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    } else {
        console.error("AOS library not found.");
    }
}

// FAQ Toggle
function initFAQToggle() {
    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
        faqItem.addEventListener('click', () => {
            faqItem.parentNode.classList.toggle('faq-active');
        });
    });
}

// Initialize Isotope
function initIsotope() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
        if (typeof Isotope !== 'undefined') {
            let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
            let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
            let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

            let initIsotope;
            imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
                initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
                    itemSelector: '.isotope-item',
                    layoutMode: layout,
                    filter: filter,
                    sortBy: sort
                });
            });

            isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
                filters.addEventListener('click', function() {
                    isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
                    this.classList.add('filter-active');
                    initIsotope.arrange({
                        filter: this.getAttribute('data-filter')
                    });
                    if (typeof initAOS === 'function') {
                        initAOS();
                    }
                }, false);
            });
        } else {
            console.error("Isotope library not found.");
        }
    });
}

// Initialize GLightbox
function initGLightbox() {
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true
        });
    } else {
        console.error("Glightbox library not found.");
    }
}

// Initialize Swiper
function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
            swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        if (typeof Swiper !== 'undefined') {
            if (swiperElement.classList.contains("swiper-tab")) {
                initSwiperWithCustomPagination(swiperElement, config);
            } else {
                new Swiper(swiperElement, config);
            }
        } else {
            console.error("Swiper library not found.");
        }
    });
}

// Handle Page Load with Hash Links
function handleHashLink() {
    window.addEventListener('load', function(e) {
        if (window.location.hash) {
            if (document.querySelector(window.location.hash)) {
                setTimeout(() => {
                    let section = document.querySelector(window.location.hash);
                    let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
                    window.scrollTo({
                        top: section.offsetTop - parseInt(scrollMarginTop),
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    });
}

// Event Listeners
window.addEventListener('load', toggleScrolled);
document.addEventListener('scroll', toggleScrolled);
window.addEventListener('load', initDropdownToggle);
window.addEventListener('load', initScrollTop);
window.addEventListener('load', initAOS);
window.addEventListener('load', initFAQToggle);
window.addEventListener('load', initIsotope);
window.addEventListener('load', initGLightbox);
window.addEventListener('load', initSwiper);
handleHashLink();

