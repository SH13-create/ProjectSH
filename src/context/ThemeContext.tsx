/**
 * Contexte de thème : mode clair / sombre + palette de couleurs active.
 * Au démarrage on suit le thème du système, puis on mémorise le choix manuel.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, type ColorScheme } from '@/theme';
import { loadPref, savePref } from '@/utils/storage';

type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ColorScheme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(system === 'dark' ? 'dark' : 'light');

  // Restaure la préférence sauvegardée (si elle existe).
  useEffect(() => {
    loadPref('theme').then((saved) => {
      if (saved === 'light' || saved === 'dark') setMode(saved);
    });
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const isDark = mode === 'dark';
    return {
      mode,
      isDark,
      colors: isDark ? darkColors : lightColors,
      toggleTheme: () => {
        setMode((prev) => {
          const next = prev === 'dark' ? 'light' : 'dark';
          savePref('theme', next);
          return next;
        });
      },
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit être utilisé dans <ThemeProvider>');
  return ctx;
}
