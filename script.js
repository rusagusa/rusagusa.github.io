// Fade-in effect for sections as they come into view
const sections = document.querySelectorAll('.section');

const options = {
    threshold: 0.15
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});


// Mobile navigation toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.header-nav-container');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});


// Header scroll effect
let lastScrollY = window.scrollY;
const headerNavContainer = document.querySelector('.header-nav-container');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling down
        headerNavContainer.classList.add('scrolled');
    }
    else {
        // Scrolling up
        headerNavContainer.classList.remove('scrolled');
    }

    lastScrollY = window.scrollY;
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const currentMaxHeight = answer.style.maxHeight;

        // Close other open answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            if (ans !== answer) {
                ans.style.maxHeight = null;
                ans.previousElementSibling.classList.remove('active');
            }
        });

        // Toggle the clicked answer
        if (currentMaxHeight) {
            answer.style.maxHeight = null;
            question.classList.remove('active');
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            question.classList.add('active');
        }
    });
});