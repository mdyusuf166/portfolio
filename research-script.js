/**
 * Premium Research & Vision Section
 * Intersection Observer-based animations with interactive effects
 */

class PremiumResearchSection {
  constructor() {
    this.section = document.querySelector('.research');
    this.cards = document.querySelectorAll('.research-card, .research-abstract, .convergence-block, .research-cta');
    this.isInitialized = false;

    this.init();
  }

  init() {
    if (this.isInitialized || !this.section) return;

    this.setupIntersectionObserver();
    this.setupInteractiveElements();
    this.isInitialized = true;
  }

  /**
   * Setup Intersection Observer for scroll reveal animations
   */
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px', // Trigger when 80px from bottom of viewport
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    this.cards.forEach((card) => {
      observer.observe(card);
    });
  }

  /**
   * Setup interactive hover effects
   */
  setupInteractiveElements() {
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach((card) => {
      // Subtle glow effect on hover
      card.addEventListener('mouseenter', () => {
        this.addCardGlow(card);
      });

      card.addEventListener('mousemove', (e) => {
        this.applyMouseGradient(card, e);
      });

      card.addEventListener('mouseleave', () => {
        this.removeCardGlow(card);
      });
    });

    // Convergence items interaction
    this.setupConvergenceInteractions();
  }

  /**
   * Add glow effect to card on hover
   */
  addCardGlow(card) {
    const style = card.style;
    const glowColor = 'rgba(0, 217, 255, 0.1)';
    style.boxShadow = `0 12px 48px ${glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`;
  }

  /**
   * Remove glow effect from card
   */
  removeCardGlow(card) {
    const style = card.style;
    style.boxShadow = '';
  }

  /**
   * Apply subtle mouse-following gradient effect
   */
  applyMouseGradient(card, event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distX = (x - centerX) / 50;
    const distY = (y - centerY) / 50;

    const rotateX = distY;
    const rotateY = -distX;

    card.style.perspective = '1000px';
    card.style.transform = `perspective(1200px) rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg)`;
  }

  /**
   * Setup convergence items interaction
   */
  setupConvergenceInteractions() {
    const convergenceItems = document.querySelectorAll('.convergence-item');

    convergenceItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        convergenceItems.forEach((other, otherIndex) => {
          if (otherIndex !== index) {
            other.style.opacity = '0.6';
            other.style.transform = 'scale(0.95)';
          }
        });
        item.style.opacity = '1';
        item.style.transform = 'scale(1.05)';
      });

      item.addEventListener('mouseleave', () => {
        convergenceItems.forEach((other) => {
          other.style.opacity = '1';
          other.style.transform = 'scale(1)';
        });
      });
    });
  }

  /**
   * Manually trigger animations (useful for testing)
   */
  animateAll() {
    this.cards.forEach((card) => {
      card.classList.add('in-view');
    });
  }

  /**
   * Reset animations
   */
  resetAnimations() {
    this.cards.forEach((card) => {
      card.classList.remove('in-view');
    });
  }
}

/**
 * Initialize research section when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new PremiumResearchSection();
});

/**
 * Fallback initialization if DOMContentLoaded already fired
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PremiumResearchSection();
  });
} else {
  new PremiumResearchSection();
}

/**
 * Optional: Add smooth scroll for research direction links
 */
document.addEventListener('DOMContentLoaded', () => {
  const researchLinks = document.querySelectorAll('a[href^="#"]');

  researchLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

/**
 * Optional: Animate counter badges on scroll
 * This adds a nice effect to the abstract badges
 */
document.addEventListener('DOMContentLoaded', () => {
  const badges = document.querySelectorAll('.abstract-badges .badge');

  const staggerBadges = () => {
    badges.forEach((badge, index) => {
      setTimeout(() => {
        badge.style.animation = 'fadeInScale 0.5s ease-out forwards';
      }, index * 50);
    });
  };

  // Trigger on intersection
  const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        staggerBadges();
        badgeObserver.unobserve(entry.target);
      }
    });
  });

  const abstractBlock = document.querySelector('.research-abstract');
  if (abstractBlock) {
    badgeObserver.observe(abstractBlock);
  }
});

/**
 * Ensure smooth interactions don't flicker
 * Reset transform on mouse leave
 */
document.addEventListener('DOMContentLoaded', () => {
  const researchCards = document.querySelectorAll('.research-card');

  researchCards.forEach((card) => {
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.perspective = '';
    });
  });
});

/**
 * Performance: Add passive listeners where possible
 */
(() => {
  const researchCards = document.querySelectorAll('.research-card');

  researchCards.forEach((card) => {
    if (card.addEventListener) {
      // Use capture phase for better event handling
      card.addEventListener('mousemove', () => {}, { passive: true });
    }
  });
})();
