document.addEventListener('DOMContentLoaded', () => {
  // Navbar Scrolled State
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  // Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Intersection Observer for fade-up animations
  const fadeElements = document.querySelectorAll('.fade-up');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // Popup logic (only runs if popup elements exist on page, e.g. index.html)
  const popupOverlay = document.getElementById('popup-overlay');
  const popupClose = document.getElementById('popup-close');
  if (popupOverlay && popupClose) {
    if (!sessionStorage.getItem('popupShown')) {
      setTimeout(() => {
        popupOverlay.classList.add('active');
        sessionStorage.setItem('popupShown', 'true');
      }, 5000);
    }
    
    popupClose.addEventListener('click', () => {
      popupOverlay.classList.remove('active');
    });
  }
});

// Shared WhatsApp Submission Function
function submitToWhatsApp(formType = 'enquiry') {
  let nameId, phoneId, concernId;
  
  if (formType === 'popup') {
    nameId = 'popup-name';
    phoneId = 'popup-phone';
    concernId = 'popup-concern';
  } else {
    nameId = 'enquiry-name';
    phoneId = 'enquiry-phone';
    concernId = 'enquiry-concern';
  }
  
  const nameEl = document.getElementById(nameId);
  const phoneEl = document.getElementById(phoneId);
  const concernEl = document.getElementById(concernId);
  
  if (!nameEl || !phoneEl || !concernEl) return;
  
  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const concern = concernEl.value.trim();
  
  if (!name || !phone || !concern) {
    alert('Please fill in all fields before submitting.');
    return;
  }
  
  const prefix = formType === 'popup' ? "I'd like a free consultation" : "I found your website and would like to book an appointment";
  const message = `Hi Aaditi Physiotherapy, ${prefix}.\n\nName: ${name}\nPhone: ${phone}\nConcern: ${concern}`;
  const encoded = encodeURIComponent(message);
  
  window.open(`https://wa.me/919845233815?text=${encoded}`, '_blank');
  
  if (formType === 'popup') {
    document.getElementById('popup-overlay').classList.remove('active');
  }
}

// Lightbox logic (gallery.html)
function openLightbox(imgSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('active');
}
