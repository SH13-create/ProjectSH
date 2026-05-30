/**
 * Contexte de localisation : choix de l'écriture de la darija (arabe / arabizi),
 * sens de lecture (RTL / LTR) et accès aux textes traduits via `t`.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LOCALES, type Script, type Strings } from '@/locales';
import { loadPref, savePref } from '@/utils/storage';

type LocaleContextValue = {
  script: Script;
  t: Strings; // raccourci pour LOCALES[script]
  isRTL: boolean;
  setScript: (s: Script) => void;
  toggleScript: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [script, setScriptState] = useState<Script>('ar');

  useEffect(() => {
    loadPref('script').then((saved) => {
      if (saved === 'ar' || saved === 'arabizi') setScriptState(saved);
    });
  }, []);

  const setScript = (s: Script) => {
    setScriptState(s);
    savePref('script', s);
  };

  const value = useMemo<LocaleContextValue>(() => {
    const t = LOCALES[script];
    return {
      script,
      t,
      isRTL: t.dir === 'rtl',
      setScript,
      toggleScript: () => setScript(script === 'ar' ? 'arabizi' : 'ar'),
    };
  }, [script]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale doit être utilisé dans <LocaleProvider>');
  return ctx;
}
