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
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        const navLinks = mobileMenu.querySelectorAll('a');

        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    // Form submission
    const form = document.getElementById('appointmentForm');
    const formMessages = document.getElementById('form-messages');

    if (form) {
      form.addEventListener('submit', (event) => {
          event.preventDefault();

          const formData = new FormData(form);

          fetch(form.getAttribute('action'), {
              method: 'POST',
              body: formData,
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  formMessages.textContent = data.message;
                  formMessages.classList.remove('error');
                  formMessages.classList.add('success');
                  form.reset();
              } else {
                  formMessages.textContent = data.message;
                  formMessages.classList.remove('success');
                  formMessages.classList.add('error');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              formMessages.textContent = 'An unexpected error occurred. Please try again.';
              formMessages.classList.remove('success');
              formMessages.classList.add('error');
          });
      });
    }

    // Slideshow
    showSlides(slideIndex);

    // URL parameter
    const serviceParam = getUrlParameter('service');
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            const optionToSelect = serviceSelect.querySelector(`option[value="${serviceParam}"]`);
            if (optionToSelect) {
                optionToSelect.selected = true;
            }
        }
    }
});

// Function to get a URL parameter by name
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slides.length > 0) {
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
}
