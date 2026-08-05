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

      // Replace with a symmetric, canonical heart SVG so it appears centered
      // and not distorted. Path is symmetric and fits a 24×24 viewBox.
      const heartSvg = '<svg class="heart-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    button.innerHTML = heartSvg;
    button.setAttribute('aria-label', 'Toggle theme');
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