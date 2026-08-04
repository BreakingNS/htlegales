/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // IntersectionObserver to set .active on nav links based on the section with largest visible area
    (function(){
        if (!('IntersectionObserver' in window)) return;
        const navSelector = '#mainNav .nav-link';
        const navLinks = Array.from(document.querySelectorAll(navSelector));

        // Build link->section pairs. Map '#page-top' to '.masthead' so Inicio behaves as expected.
        const pairs = navLinks.map(a => {
            const h = a.getAttribute('href');
            if (!h || !h.startsWith('#')) return null;
            let section = null;
            if (h === '#page-top') section = document.querySelector('.masthead') || document.body;
            else section = document.querySelector(h);
            return section ? { link: a, section: section } : null;
        }).filter(Boolean);

        if (pairs.length === 0) return;

        // Observe all target sections
        const observer = new IntersectionObserver(() => {
            // On any change, compute visible ratio for each observed section and pick the max
            let best = { pair: null, ratio: 0 };
            pairs.forEach(p => {
                const rect = p.section.getBoundingClientRect();
                const height = rect.height || (window.innerHeight || document.documentElement.clientHeight);
                const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
                const ratio = height > 0 ? (visible / height) : 0;
                if (ratio > best.ratio) best = { pair: p, ratio: ratio };
            });

            // Clear and set active based on best ratio (require small threshold to avoid flicker)
            navLinks.forEach(n => n.classList.remove('active'));
            if (best.pair && best.ratio > 0.15) {
                best.pair.link.classList.add('active');
            }
        }, { threshold: [0,0.15,0.25,0.5,0.75,1] });

        pairs.forEach(p => observer.observe(p.section));
    })();

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
