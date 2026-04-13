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

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    if (top < triggerBottom) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", () => {
  revealOnScroll();
  updateActiveNav();
});

window.addEventListener("load", () => {
  revealOnScroll();
  updateActiveNav();
});

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
  const username = githubUsernameInput.value.trim();

  if (!username) {
    githubResult.innerHTML = `<p class="muted">Please enter a GitHub username.</p>`;
    return;
  }

  githubResult.innerHTML = `<p class="muted">Loading GitHub repositories...</p>`;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);

    if (!response.ok) {
      throw new Error("GitHub user not found or repositories unavailable.");
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      githubResult.innerHTML = `<p class="muted">No public repositories found.</p>`;
      return;
    }

    const reposHTML = repos
      .map((repo) => `
        <article class="repo-card">
          <div>
            <h4>${repo.name}</h4>
            <p>${repo.description || "No description available."}</p>
          </div>
          <div class="repo-meta">
            ${repo.language ? `<span>${repo.language}</span>` : ""}
            <span>? ${repo.stargazers_count}</span>
            <span>?? ${repo.forks_count}</span>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View repo</a>
          </div>
        </article>
      `)
      .join("");

    githubResult.innerHTML = `<div class="repo-grid">${reposHTML}</div>`;
  } catch (error) {
    githubResult.innerHTML = `<p class="muted">${error.message}</p>`;
  }
}

if (githubBtn) {
  githubBtn.addEventListener("click", loadGitHubRepos);
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
