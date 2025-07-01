export function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  // Initialize theme
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Toggle handler
  toggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  });
}
