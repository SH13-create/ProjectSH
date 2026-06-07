/**
 * Layout racine (expo-router) : monte tous les providers (thème, langue, quiz)
 * et la pile de navigation. Toutes les pages héritent de ce contexte.
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { LocaleProvider } from '@/context/LocaleContext';
import { QuizProvider } from '@/context/QuizContext';
import { PhotoProvider } from '@/context/PhotoContext';
import { warmUpVoices } from '@/utils/speech';

function Navigator() {
  const { isDark, colors } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  // Précharge les voix du navigateur (web) pour que la voix arabe soit prête.
  useEffect(() => {
    warmUpVoices();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <LocaleProvider>
            <QuizProvider>
              <PhotoProvider>
                <Navigator />
              </PhotoProvider>
            </QuizProvider>
          </LocaleProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
