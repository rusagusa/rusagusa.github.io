document.addEventListener('DOMContentLoaded', () => {
    // Fade-in effect for sections
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => observer.observe(section));

    // Mobile navigation toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        const navLinks = mobileMenu.querySelectorAll('a');
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const headerNavContainer = document.querySelector('.header-nav-container');
    window.addEventListener('scroll', () => {
        headerNavContainer.classList.toggle('scrolled', window.scrollY > lastScrollY);
        lastScrollY = window.scrollY;
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = null);
            document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Form submission
    const form = document.getElementById('appointmentForm');
    const formMessages = document.getElementById('form-messages');
    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            fetch(form.getAttribute('action'), {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                formMessages.textContent = data.message;
                formMessages.className = data.success ? 'success' : 'error';
                if (data.success) form.reset();
            })
            .catch(() => {
                formMessages.textContent = 'An unexpected error occurred.';
                formMessages.className = 'error';
            });
        });
    }

    // URL parameter handling
    const getUrlParameter = name => {
        const regex = new RegExp(`[\\?&]${name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')}=([^&#]*)`);
        const results = regex.exec(location.search);
        return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : '';
    };

    const serviceParam = getUrlParameter('service');
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            const optionToSelect = serviceSelect.querySelector(`option[value="${serviceParam}"]`);
            if (optionToSelect) optionToSelect.selected = true;
        }
    }

    // Slideshow
    let slideIndex = 1;
    const showSlides = n => {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
        for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    };

    window.plusSlides = n => showSlides(slideIndex += n);
    window.currentSlide = n => showSlides(slideIndex = n);

    showSlides(slideIndex);
});
