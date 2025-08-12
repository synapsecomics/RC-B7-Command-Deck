document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('toggleThemeBtn');
  const body = document.body;

  function setTheme(mode) {
    if (mode === 'light') {
      body.classList.add('lightmode');
      themeBtn.textContent = '🌑 Dark Mode';
      themeBtn.setAttribute('aria-label', 'Switch to dark mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('lightmode');
      themeBtn.textContent = '🍰 Light Mode';
      themeBtn.setAttribute('aria-label', 'Switch to light mode');
      localStorage.setItem('theme', 'dark');
    }
  }

  // Initial theme load
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'light' ? 'light' : 'dark');

  themeBtn.addEventListener('click', () => {
    setTheme(body.classList.contains('lightmode') ? 'dark' : 'light');
  });
});