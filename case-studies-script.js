// ============================================
// CASE STUDIES SECTION - INTERACTIVE EFFECTS
// Research-Lab Premium Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initializeCaseStudies();
});

function initializeCaseStudies() {
  const caseStudyCards = document.querySelectorAll('.case-study-card');
  const deepDiveSection = document.querySelector('.deep-dive-section');
  const ctaSection = document.querySelector('.case-study-cta');

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: stop observing after animation plays
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  caseStudyCards.forEach(card => observer.observe(card));
  if (deepDiveSection) observer.observe(deepDiveSection);
  if (ctaSection) observer.observe(ctaSection);

  // Card hover effects with mouse tracking
  caseStudyCards.forEach(card => {
    setupCardHoverEffect(card);
  });

  // CTA button interactions
  setupCTAButtons();
}

/**
 * Setup hover effect for individual cards
 * Creates subtle parallax/tilt effect on mouse movement
 */
function setupCardHoverEffect(card) {
  card.addEventListener('mouseenter', function() {
    this.style.pointerEvents = 'auto';
  });

  card.addEventListener('mousemove', function(e) {
    // Only apply effect if card is visible
    if (!this.classList.contains('in-view')) return;

    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate center offsets
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    // Subtle 3D effect
    this.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(20px)
    `;
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    this.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.320, 1)';

    // Reset transition after use
    setTimeout(() => {
      this.style.transition = '';
    }, 400);
  });
}

/**
 * Setup CTA button interactions
 */
function setupCTAButtons() {
  const ctaButtons = document.querySelectorAll('.case-study-cta .btn');

  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });

    // Ripple effect on click
    button.addEventListener('click', function(e) {
      createRipple(e, this);
    });
  });
}

/**
 * Create ripple effect on button click
 */
function createRipple(event, button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');

  // Add ripple CSS if not present
  if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
      .btn {
        position: relative;
        overflow: hidden;
      }
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

/**
 * Smooth scroll to sections on CTA buttons
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();

        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize smooth scroll on page load
setupSmoothScroll();

/**
 * Add visual feedback to architecture diagram on hover
 */
function setupArchitectureDiagramInteractions() {
  const diagrams = document.querySelectorAll('.architecture-diagram');

  diagrams.forEach(diagram => {
    diagram.addEventListener('mouseenter', function() {
      const blocks = this.querySelectorAll('.arch-block');
      blocks.forEach((block, index) => {
        setTimeout(() => {
          block.style.transform = 'scale(1.05)';
          block.style.backgroundColor = 'rgba(0, 217, 255, 0.12)';
        }, index * 50);
      });
    });

    diagram.addEventListener('mouseleave', function() {
      const blocks = this.querySelectorAll('.arch-block');
      blocks.forEach(block => {
        block.style.transform = 'scale(1)';
        block.style.backgroundColor = 'rgba(0, 217, 255, 0.05)';
      });
    });
  });
}

// Initialize architecture diagram interactions
setupArchitectureDiagramInteractions();

/**
 * Stagger animation for case study cards on initial load
 */
window.addEventListener('load', function() {
  const cards = document.querySelectorAll('.case-study-card');
  cards.forEach((card, index) => {
    // Trigger animation with stagger
    const delay = index * 100; // 100ms between each card
    setTimeout(() => {
      card.classList.add('in-view');
    }, delay);
  });
});

/**
 * Accessibility: Keyboard navigation
 */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Clear any hover states on Escape
    document.querySelectorAll('.case-study-card').forEach(card => {
      card.style.transform = '';
    });
  }
});

/**
 * Analytics/Tracking: Log visible case studies
 * Useful for understanding user engagement
 */
function trackVisibleStudies() {
  const studies = document.querySelectorAll('.case-study-card');
  const studyNames = [];

  studies.forEach((study, index) => {
    const inView = study.classList.contains('in-view');
    if (inView) {
      studyNames.push(`Study ${index + 1}`);
    }
  });

  // Log only when studies become visible
  if (studyNames.length > 0) {
    console.debug('Visible case studies:', studyNames);
  }
}

// Run tracking every 2 seconds
setInterval(trackVisibleStudies, 2000);

/**
 * Performance optimization: Lazy load animations for offscreen elements
 */
function optimizePerformance() {
  const cards = document.querySelectorAll('.case-study-card');

  // Disable hover effects for cards not in viewport
  const viewportObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.pointerEvents = 'auto';
        } else {
          entry.target.style.pointerEvents = 'none';
        }
      });
    },
    { threshold: 0 }
  );

  cards.forEach(card => viewportObserver.observe(card));
}

optimizePerformance();
