import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'drveda-theme';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'dark' || stored === 'light') return stored;
  return 'light';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialTheme(),
  reducers: {
    toggleTheme: (state) => (state === 'dark' ? 'light' : 'dark'),
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
