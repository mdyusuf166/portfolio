const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const modal = document.getElementById("demoModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const demoButtons = document.querySelectorAll(".demo-btn");

const githubBtn = document.getElementById("loadGithubBtn");
const githubUsernameInput = document.getElementById("githubUsername");
const githubResult = document.getElementById("githubResult");
const GITHUB_DEFAULT_USERNAME = (githubUsernameInput?.closest('.github-card')?.dataset.defaultUsername || "mdyousuf").trim();

if (githubUsernameInput && !githubUsernameInput.value.trim()) {
  githubUsernameInput.value = GITHUB_DEFAULT_USERNAME;
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const updateActiveNav = () => {
  const scrollY = window.scrollY;

  navItems.forEach((item) => {
    const target = document.querySelector(item.getAttribute("href"));
    if (!target) return;

    const targetTop = target.offsetTop - 120;
    const targetBottom = targetTop + target.offsetHeight;

    if (scrollY >= targetTop && scrollY < targetBottom) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

const timelineSection = document.querySelector(".timeline");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    if (top < triggerBottom) {
      element.classList.add("active");
    }
  });
};

const animateTimelineLine = () => {
  if (!timelineSection) return;

  const rect = timelineSection.getBoundingClientRect();
  const triggerBottom = window.innerHeight * 0.85;
  if (rect.top < triggerBottom) {
    timelineSection.classList.add("active");
  }
};

const staggerResearchCards = () => {
  document.querySelectorAll(".research-card, .research-abstract").forEach((card, index) => {
    card.style.transitionDelay = `${index * 90}ms`;
  });
};

const animateSkillBars = () => {
  document.querySelectorAll(".skill-fill").forEach((bar) => {
    const parent = bar.closest(".skill-card");
    if (!parent) return;
    const top = parent.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.9) {
      bar.style.width = `${bar.dataset.value}%`;
    }
  });
};

window.addEventListener("scroll", () => {
  revealOnScroll();
  animateSkillBars();
  animateTimelineLine();
  updateActiveNav();
});

window.addEventListener("load", () => {
  revealOnScroll();
  animateSkillBars();
  animateTimelineLine();
  staggerResearchCards();
  updateActiveNav();
  if (typeof animateFloatingAccents === "function") {
    animateFloatingAccents();
  }
  if (githubResult) {
    loadGitHubRepos();
  }
});

const floatingAccents = document.querySelectorAll(".floating-accent");
const hero = document.querySelector(".hero");
const profileFrame = document.querySelector(".profile-avatar-frame");

const animateFloatingAccents = () => {
  if (!floatingAccents.length) {
    return;
  }

  const step = (time) => {
    floatingAccents.forEach((accent, index) => {
      const x = Math.sin((time / 1200) + index * 0.9) * (18 + index * 4);
      const y = Math.cos((time / 1000) + index * 1.3) * (8 + index * 3);
      accent.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};

const animateHeroPanel = (event) => {
  if (!hero || !profileFrame) {
    return;
  }

  const rect = hero.getBoundingClientRect();
  const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
  const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

  profileFrame.style.transform = `translate3d(${offsetX * 12}px, ${offsetY * 10}px, 0) rotate(${offsetX * 3}deg)`;
};

const resetHeroPanel = () => {
  if (!profileFrame) {
    return;
  }

  profileFrame.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
};

if (hero) {
  hero.addEventListener("mousemove", animateHeroPanel);
  hero.addEventListener("mouseleave", resetHeroPanel);
}

const openModal = (title, text) => {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

demoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.dataset.title || "Project";
    const text = button.dataset.demo || "Demo details coming soon.";
    openModal(title, text);
  });
});

modalOverlay.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

async function loadGitHubRepos() {
  const username = githubUsernameInput.value.trim() || GITHUB_DEFAULT_USERNAME;

  if (!username) {
    githubResult.innerHTML = `<div class="state-message error-state">Please enter a GitHub username.</div>`;
    return;
  }

  githubResult.innerHTML = `<div class="state-message loading-state"><span class="loading-dot"></span>Loading repositories from ${username}…</div>`;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`);

    if (!response.ok) {
      throw new Error("GitHub user not found or repositories unavailable.");
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      githubResult.innerHTML = `<div class="state-message empty-state">No public repositories found for <strong>${username}</strong>.</div>`;
      return;
    }

    const reposHTML = repos
      .map((repo) => `
        <article class="repo-card">
          <div class="repo-card-body">
            <h4>${repo.name}</h4>
            <p>${repo.description || "No description available."}</p>
          </div>
          <div class="repo-meta">
            ${repo.language ? `<span class="repo-meta-item">${repo.language}</span>` : ""}
            <span class="repo-meta-item">★ ${repo.stargazers_count}</span>
            <span class="repo-meta-item">⇄ ${repo.forks_count}</span>
            <a class="repo-meta-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
        </article>
      `)
      .join("");

    githubResult.innerHTML = `<div class="repo-grid">${reposHTML}</div>`;
  } catch (error) {
    githubResult.innerHTML = `<div class="state-message error-state">${error.message}</div>`;
  }
}

if (githubBtn) {
  githubBtn.addEventListener("click", loadGitHubRepos);
}

if (githubUsernameInput) {
  githubUsernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      loadGitHubRepos();
    }
  });
}

const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
