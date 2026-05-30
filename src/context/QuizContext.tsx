/**
 * Contexte du quiz : garde le mode choisi (individuel / couple) et les réponses
 * pendant toute la session. Permet de calculer le résultat à la fin.
 */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { computeResult, type Result } from '@/utils/compatibility';
import type { Answers, Mode } from '@/utils/questions';

type QuizContextValue = {
  mode: Mode;
  answers: Answers;
  setMode: (m: Mode) => void;
  setAnswer: (key: string, value: string) => void;
  reset: () => void;
  getResult: () => Result;
};

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('solo');
  const [answers, setAnswers] = useState<Answers>({});

  const value = useMemo<QuizContextValue>(
    () => ({
      mode,
      answers,
      setMode: (m) => {
        setMode(m);
        setAnswers({}); // on repart propre quand on change de mode
      },
      setAnswer: (key, val) => setAnswers((prev) => ({ ...prev, [key]: val })),
      reset: () => setAnswers({}),
      getResult: () => computeResult(mode, answers),
    }),
    [mode, answers],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz doit être utilisé dans <QuizProvider>');
  return ctx;
}
