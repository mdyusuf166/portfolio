const tabs = document.querySelectorAll(".tab");
const publicationCards = document.querySelectorAll(".publication-card");
const revealElements = document.querySelectorAll(".reveal");
const actionButtons = document.querySelectorAll(".action-button");

const updateReveal = () => {
  const trigger = window.innerHeight * 0.88;
  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    if (top < trigger) {
      element.classList.add("active");
    }
  });
};

const filterCards = (category) => {
  publicationCards.forEach((card) => {
    const cardCategory = card.dataset.category;
    card.style.display = category === "all" || cardCategory === category ? "grid" : "none";
  });
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((button) => button.classList.remove("active"));
    tab.classList.add("active");
    filterCards(tab.dataset.filter);
  });
});

actionButtons.forEach((button) => {
  button.dataset.defaultLabel = button.textContent;
  button.addEventListener("click", () => {
    const card = button.closest(".publication-card");
    if (!card) return;

    const summary = card.querySelector(".publication-summary");
    const expanded = summary.classList.toggle("expanded");
    button.textContent = expanded ? "Close Abstract" : button.dataset.defaultLabel;
  });
});

window.addEventListener("scroll", updateReveal);
window.addEventListener("load", () => {
  updateReveal();
  filterCards("all");
});
