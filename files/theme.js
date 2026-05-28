(() => {
  const storageKey = 'theme';
  const root = document.documentElement;
  const toggleSelector = '[data-theme-toggle]';

  const readPreferredTheme = () => {
    try {
      const storedTheme = localStorage.getItem(storageKey);
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
    } catch (error) {
      // Ignore storage access issues and fall back to system preference.
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const syncToggle = (theme) => {
    const button = document.querySelector(toggleSelector);
    if (!button) {
      return;
    }

    button.textContent = theme === 'dark' ? 'light mode' : 'dark mode';
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    syncToggle(theme);

    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Ignore storage access issues; the theme still applies for this session.
    }
  };

  const init = () => {
    const theme = root.dataset.theme || readPreferredTheme();
    applyTheme(theme);

    const button = document.querySelector(toggleSelector);
    if (!button) {
      return;
    }

    syncToggle(theme);

    button.addEventListener('click', () => {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();