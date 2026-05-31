/**
 * Partage du résultat : « texte / image » comme demandé.
 *  - Sur mobile : on capture la carte de résultat en image PNG et on ouvre
 *    la feuille de partage native (expo-sharing).
 *  - Sur le web (ou si la capture échoue) : on retombe sur un partage texte
 *    (Web Share API → presse-papiers → Share natif).
 */
import { Platform, Share } from 'react-native';
import type { RefObject } from 'react';
import type { View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

export async function shareResult(viewRef: RefObject<View | null>, message: string): Promise<void> {
  // 1) Mobile : tentative de partage en IMAGE.
  if (Platform.OS !== 'web' && viewRef.current) {
    try {
      const uri = await captureRef(viewRef, { format: 'png', quality: 0.95 });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: message });
        return;
      }
    } catch {
      // On bascule vers le partage texte ci-dessous.
    }
  }

  // 2) Web : Web Share API, sinon copie dans le presse-papiers.
  if (Platform.OS === 'web') {
    const nav: any = typeof navigator !== 'undefined' ? navigator : null;
    try {
      if (nav?.share) {
        await nav.share({ text: message });
        return;
      }
      if (nav?.clipboard?.writeText) {
        await nav.clipboard.writeText(message);
        return;
      }
    } catch {
      return; // l'utilisateur a probablement annulé
    }
  }

  // 3) Fallback universel : partage TEXTE natif.
  try {
    await Share.share({ message });
  } catch {
    // annulé / indisponible — on ignore en mode prototype
  }
}
