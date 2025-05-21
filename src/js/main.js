// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggler
  initThemeToggle();
  
  // Scroll functions
  handleScrollEvents();
  
  // Initialize portfolio filter
  initPortfolioFilter();
  
  // Initialize any interactive elements
  initializeScrollSpy();
});

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');
  
  // Check for stored theme preference or use system preference
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark-mode');
    icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    // Update icon based on current theme
    if (body.classList.contains('dark-mode')) {
      icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
      localStorage.setItem('theme', 'light');
    }
  });
}

// Handle all scroll-related events
function handleScrollEvents() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.querySelector('.back-to-top');
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Navbar styling on scroll
    if (scrollPosition > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (scrollPosition > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
    
    // Scroll animations
    animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('show');
      }
    });
  });
  
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Handle back to top button click
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Trigger scroll once to initialize element states
  window.dispatchEvent(new Event('scroll'));
}

// Portfolio filter functionality
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to current button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Initialize Bootstrap's ScrollSpy
function initializeScrollSpy() {
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar',
    offset: 100
  });
  
  // Update nav links active state on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}