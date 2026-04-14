const copyEmailBtn = document.getElementById("copyEmailBtn");
const copyEmailBtnSecondary = document.getElementById("copyEmailBtnSecondary");
const linkedinBtn = document.getElementById("linkedinBtn");
const linkedinBtnSecondary = document.getElementById("linkedinBtnSecondary");
const toast = document.querySelector(".contact-toast");

const showToast = (message) => {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("active");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove("active");
  }, 2800);
};

const copyEmail = async () => {
  const email = "contact@mdyousuf.dev";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Email copied: ${email}`);
      return;
    } catch (error) {
      // Fallback to mailto in case clipboard access fails.
    }
  }

  window.location.href = `mailto:${email}`;
};

const linkedinStatus = () => {
  showToast("LinkedIn profile is being prepared for future outreach.");
};

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", copyEmail);
}

if (copyEmailBtnSecondary) {
  copyEmailBtnSecondary.addEventListener("click", copyEmail);
}

if (linkedinBtn) {
  linkedinBtn.addEventListener("click", linkedinStatus);
}

if (linkedinBtnSecondary) {
  linkedinBtnSecondary.addEventListener("click", linkedinStatus);
}
