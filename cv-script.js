const downloadButton = document.querySelector('.btn-primary');

if (downloadButton) {
  downloadButton.addEventListener('mouseenter', () => {
    downloadButton.style.boxShadow = '0 24px 64px rgba(0, 217, 255, 0.28)';
  });

  downloadButton.addEventListener('mouseleave', () => {
    downloadButton.style.boxShadow = '0 18px 48px rgba(0, 217, 255, 0.2)';
  });

  downloadButton.addEventListener('focus', () => {
    downloadButton.style.outline = '2px solid rgba(0, 217, 255, 0.35)';
    downloadButton.style.outlineOffset = '4px';
  });

  downloadButton.addEventListener('blur', () => {
    downloadButton.style.outline = 'none';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const panel = document.querySelector('.cv-panel');
  if (panel) {
    panel.classList.add('active');
  }
});
