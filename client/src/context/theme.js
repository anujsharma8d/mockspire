export function getInitialTheme() {
  try {
    const saved = localStorage.getItem('mockspire-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* Theme switching also works when storage is unavailable. */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
