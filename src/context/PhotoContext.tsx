/**
 * Contexte du mode « Analyse par photo » : garde les 2 photos + prénoms
 * choisis, le temps de passer de l'écran de sélection à l'écran du rapport.
 * Aucune persistance, aucune sortie réseau.
 */
import React, { createContext, useContext, useMemo, useState } from 'react';
import type { PhotoInput } from '@/utils/photoReport';

type PhotoData = {
  photo1: PhotoInput;
  photo2: PhotoInput;
  name1: string;
  name2: string;
};

type PhotoContextValue = {
  data: PhotoData | null;
  setData: (d: PhotoData) => void;
  clear: () => void;
};

const PhotoContext = createContext<PhotoContextValue | null>(null);

export function PhotoProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<PhotoData | null>(null);

  const value = useMemo<PhotoContextValue>(
    () => ({
      data,
      setData: setDataState,
      clear: () => setDataState(null),
    }),
    [data],
  );

  return <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>;
}

export function usePhoto(): PhotoContextValue {
  const ctx = useContext(PhotoContext);
  if (!ctx) throw new Error('usePhoto doit être utilisé dans <PhotoProvider>');
  return ctx;
}
