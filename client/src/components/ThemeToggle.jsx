import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ branded = false }) {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === 'dark' ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`flex items-center  gap-3 px-4 py-3 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${branded
        ? 'text-zinc-100 '
        : 'text-zinc-700 dark:text-zinc-100'}`}
    >
      <div>
        <Icon size={20} aria-hidden="true" />
      </div>
      <div>
        {theme==='dark' ? "Dark Mode":"Light Mode"}
      </div>
    </button>
  );
}