import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme } from '../store/slices/themeSlice';

const STORAGE_KEY = 'drveda-theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((s) => s.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return <>{children}</>;
};

export const useTheme = () => {
  const theme = useAppSelector((s) => s.theme);
  const dispatch = useAppDispatch();
  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme: () => dispatch(toggleTheme()),
  };
};
