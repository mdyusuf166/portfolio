const tabs = document.querySelectorAll('.tab');
const postCards = document.querySelectorAll('.post-card');
const revealElements = document.querySelectorAll('.reveal');
const actionButtons = document.querySelectorAll('.action-button');

const updateReveal = () => {
  const triggerPoint = window.innerHeight * 0.92;
  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    if (top < triggerPoint) {
      element.classList.add('active');
    }
  });
};

const filterPosts = (category) => {
  postCards.forEach((card) => {
    const cardCategory = card.dataset.category;
    card.style.display = category === 'all' || cardCategory === category ? 'grid' : 'none';
  });
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((button) => button.classList.remove('active'));
    tab.classList.add('active');
    filterPosts(tab.dataset.filter);
  });
});

actionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.post-card');
    if (!card) return;
    const abstract = card.querySelector('.post-abstract');
    if (!abstract) return;

    const expanded = abstract.classList.toggle('expanded');
    button.textContent = expanded ? 'Collapse' : 'Read Placeholder';
    if (expanded) {
      abstract.style.maxHeight = '400px';
    } else {
      abstract.style.maxHeight = '96px';
    }
  });
});

window.addEventListener('scroll', updateReveal);
window.addEventListener('load', () => {
  updateReveal();
  filterPosts('all');
});

window.addEventListener('resize', () => {
  postCards.forEach((card) => {
    card.style.display = card.style.display || 'grid';
  });
});
