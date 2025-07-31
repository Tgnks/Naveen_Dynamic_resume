// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({ 
        top: offsetTop, 
        behavior: 'smooth' 
      });
    }
  });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (correspondingLink) {
        correspondingLink.classList.add('active');
      }
    }
  });
});

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Collect form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Simple validation
  if (!name || !email || !subject || !message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  // Simulate form submission
  showNotification('Thank you for your message! I will get back to you soon.', 'success');
  contactForm.reset();
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
  // Remove existing notification 
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    max-width: 300px;
    box-shadow: 4px 12px rgba(0, 0, 0, 0.15);
  `;

  if (type === 'success') {
    notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  } else {
    notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
  }
  
  //Add to DOM
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Add slide animation to css
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elemenys for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat, .about-img-container');
  animatedElements.forEach(el => observer.observe(el));
});

// Typing Animation for Hero Title
function typewriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Intiate typing animation when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typewriter(heroTitle, originalText, 100);
  }
});

// Counter Animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Animate counters when they come into view
const statNumbers = document.querySelectorAll('.stat h3');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.textContent);
      animateCounter(entry.target, target);
      statObserver.unobserve(entry.target);
    }
  });
});

statNumbers.forEach(stat => statObserver.observe(stat));

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (hero && heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Skill Hover Effect
document.addEventListener('DOMContentLoaded', () => {
  const skillItems = document.querySelectorAll('.skill-item');

  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.05) rotate(2deg)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});

// Project Card 3D Hover
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
});

// Loading Animation
window.addEventListener('load', () => {
  const loading = document.querySelector('.loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => {
        loading.remove();
      }, 500);
    }, 1000);
  }
});

//Add loading screen HTML
document.addEventListener('DOMContentLoaded', () => {
  const loadingHTML = `
    <div class="loading">
      <div class="spinner"></div>
    <div>
  `;
  document.body.insertAdjacentHTML('afterbegin', loadingHTML);
});

// Cursor Trail Effect
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-trail';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, var(--primary-color), transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.7;
    transition: transform 0.1s ease;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(1.5)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
  });
});

// Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--primary-color);
    z-index: 10000;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
});

// Theme Toggle (Day/Night Mode)
function createThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
  themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: var(--primary-color);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: var(--shadow);
  `;

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');

    if (document.body.classList.contains('dark-theme')) {
      icon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    } else {
      icon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.querySelector('i').className = 'fas fa-sun';
  }

  document.body.appendChild(themeToggle);
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', createThemeToggle);

// Dark theme styles
const darkThemeStyles = document.createElement('style');
darkThemeStyles.textContent = `
  .dark-theme {
    --primary-color: #4da6ff;
    --secondary-color: #0073e6;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --background-light: #1a1a1a;
    --background-white: #2a2a2a;
    --border-color: #404040;
  }

  .dark-theme .navbar {
    background: rgba(42, 42, 42, 0.95);
  }

  .dark-theme .navbar.scrolled {
    background: #2a2a2a;
  }
`;
document.head.appendChild(darkThemeStyles);
