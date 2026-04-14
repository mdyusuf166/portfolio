/**
 * Premium Animated Growth Timeline
 * Intersection Observer-based scroll animations with performance optimization
 */

class PremiumTimeline {
  constructor() {
    this.timelineItems = document.querySelectorAll('.timeline-item');
    this.timelineProgress = document.querySelector('.timeline-progress');
    this.isInitialized = false;

    this.init();
  }

  init() {
    if (this.isInitialized) return;

    this.setupIntersectionObserver();
    this.setupScrollProgressBar();
    this.isInitialized = true;
  }

  /**
   * Setup Intersection Observer for scroll reveal animations
   */
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Trigger when item is 100px from bottom
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Optional: Stop observing once animated
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.timelineItems.forEach((item) => {
      observer.observe(item);
    });
  }

  /**
   * Setup dynamic scroll progress bar for timeline
   * Updates the progress line as user scrolls through timeline
   */
  setupScrollProgressBar() {
    if (!this.timelineProgress) return;

    const updateProgress = () => {
      const timelineContainer = document.querySelector('.timeline-container');
      if (!timelineContainer) return;

      const rect = timelineContainer.getBoundingClientRect();
      const containerHeight = timelineContainer.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how much of the timeline is visible
      const startInView = rect.top < viewportHeight;
      const endInView = rect.bottom > 0;

      if (startInView && endInView) {
        // Calculate progress percentage
        const scrollRange = containerHeight + viewportHeight;
        const scrolled = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(100, (scrolled / scrollRange) * 100));

        this.timelineProgress.style.height = `${progress}%`;
      } else if (rect.top > viewportHeight) {
        // Timeline not yet in view
        this.timelineProgress.style.height = '0%';
      } else {
        // Timeline completely scrolled past
        this.timelineProgress.style.height = '100%';
      }
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', updateProgress, { passive: true });
    // Initial call
    updateProgress();
  }

  /**
   * Manual trigger for animations (optional)
   * Useful if you need to animate items on demand
   */
  animateItem(index) {
    if (this.timelineItems[index]) {
      this.timelineItems[index].classList.add('in-view');
    }
  }

  /**
   * Animate all items (useful for testing)
   */
  animateAll() {
    this.timelineItems.forEach((item) => {
      item.classList.add('in-view');
    });
  }

  /**
   * Reset animations
   */
  resetAnimations() {
    this.timelineItems.forEach((item) => {
      item.classList.remove('in-view');
    });
    this.timelineProgress.style.height = '0%';
  }
}

/**
 * Initialize timeline when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new PremiumTimeline();
});

/**
 * Fallback initialization if DOMContentLoaded already fired
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PremiumTimeline();
  });
} else {
  new PremiumTimeline();
}

/**
 * Performance: Debounce scroll for additional optimization if needed
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Optional: Add parallax effect to timeline items on hover (premium touch)
 */
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach((item) => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      const content = item.querySelector('.timeline-content');
      if (content) {
        content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    item.addEventListener('mouseleave', () => {
      const content = item.querySelector('.timeline-content');
      if (content) {
        content.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      }
    });
  });
});

/**
 * Optional: Smooth scroll to timeline section when clicking navigation
 */
document.addEventListener('DOMContentLoaded', () => {
  const timelineLink = document.querySelector('a[href="#timeline"]');
  if (timelineLink) {
    timelineLink.addEventListener('click', (e) => {
      e.preventDefault();
      const timelineSection = document.getElementById('timeline');
      if (timelineSection) {
        timelineSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
});
