/**
 * Conteneur d'écran : gère la zone sûre (encoches), le fond zellige et,
 * en option, le défilement. À utiliser comme racine de chaque écran.
 */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@/theme';
import { ZelligeBackground } from './ZelligeBackground';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  center?: boolean;
};

export function Screen({ children, scroll, center }: Props) {
  const insets = useSafeAreaInsets();
  const pad = {
    paddingTop: insets.top + spacing.md,
    paddingBottom: insets.bottom + spacing.lg,
    paddingHorizontal: spacing.lg,
  };

  return (
    <ZelligeBackground>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[pad, center && styles.center, { gap: spacing.md }]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, pad, center && styles.center, { gap: spacing.md }]}>{children}</View>
      )}
    </ZelligeBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flexGrow: 1, justifyContent: 'center' },
});
