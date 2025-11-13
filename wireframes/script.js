document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const faqQuestions = document.querySelectorAll(".faq-question");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const form = document.getElementById("appointmentForm");
  let slideIndex = 1;
  const init = () => {
    setupIntersectionObserver();
    setupEventListeners();
    handleUrlParameters();
    showSlides(slideIndex);
  };
  const setupIntersectionObserver = () => {
    const options = {
      threshold: 0.15,
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);
    sections.forEach((section) => {
      observer.observe(section);
    });
  };
  const setupEventListeners = () => {
    if (menuToggle && mobileMenu) {
      const navLinks = mobileMenu.querySelectorAll("a");
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        icon.className = mobileMenu.classList.contains("active") ?
          "fas fa-times" :
          "fas fa-bars";
      });
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("active");
          menuToggle.querySelector("i").className = "fas fa-bars";
        });
      });
    }
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains("active");
        document.querySelectorAll(".faq-answer").forEach((ans) => {
          ans.style.maxHeight = null;
          ans.previousElementSibling.classList.remove("active");
        });
        if (!isActive) {
          question.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
    if (form) {
      form.addEventListener("submit", handleFormSubmission);
    }
  };
  const handleFormSubmission = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formMessages = document.getElementById("form-messages");
    fetch(form.getAttribute("action"), {
        method: "POST",
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        formMessages.textContent = data.message;
        formMessages.className = data.success ? "success" : "error";
        if (data.success) {
          form.reset();
        }
      })
      .catch(() => {
        formMessages.textContent =
          "An unexpected error occurred. Please try again.";
        formMessages.className = "error";
      });
  };
  const getUrlParameter = (name) => {
    name = name.replace(/[[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(window.location.href);
    if (!results || !results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };
  const handleUrlParameters = () => {
    const serviceParam = getUrlParameter("service");
    if (serviceParam) {
      const serviceSelect = document.getElementById("service");
      if (serviceSelect) {
        const option = serviceSelect.querySelector(
          `option[value="${serviceParam}"]`
        );
        if (option) {
          option.selected = true;
        }
      }
    }
  };

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }
  window.plusSlides = (n) => showSlides((slideIndex += n));
  window.currentSlide = (n) => showSlides((slideIndex = n));
  init();
});