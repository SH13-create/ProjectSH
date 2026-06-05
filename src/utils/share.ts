/**
 * Partage du résultat en « carte image » (+ repli texte).
 *  - Mobile : capture la carte en PNG (react-native-view-shot) puis ouvre la
 *    feuille de partage native (expo-sharing).
 *  - Web : capture la carte en PNG ; si le navigateur supporte le partage de
 *    fichiers (Web Share API niveau 2) on partage l'image, sinon on la
 *    télécharge. En dernier recours : partage / copie du texte.
 */
import { Platform, Share } from 'react-native';
import type { RefObject } from 'react';
import type { View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

/** Convertit une data URI en Blob (web). */
function dataUriToBlob(uri: string): Blob {
  const [head, body] = uri.split(',');
  const mime = head.match(/:(.*?);/)?.[1] ?? 'image/png';
  const bin = atob(body);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

async function shareOnWeb(viewRef: RefObject<View | null>, message: string): Promise<void> {
  const nav: any = typeof navigator !== 'undefined' ? navigator : null;

  // 1) Tentative de CARTE IMAGE.
  if (viewRef.current) {
    try {
      // Sur web, captureRef renvoie une data URI (png).
      const uri = await captureRef(viewRef, { format: 'png', quality: 0.95, result: 'data-uri' });
      const blob = dataUriToBlob(uri);
      const file = new File([blob], 'moulat-niya.png', { type: 'image/png' });

      // a) Web Share API niveau 2 (partage de fichier) si dispo.
      if (nav?.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], text: message });
        return;
      }
      // b) Sinon : téléchargement de l'image.
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'moulat-niya.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return;
    } catch {
      // On bascule vers le texte ci-dessous.
    }
  }

  // 2) Repli texte (Web Share → presse-papiers).
  try {
    if (nav?.share) {
      await nav.share({ text: message });
      return;
    }
    if (nav?.clipboard?.writeText) {
      await nav.clipboard.writeText(message);
    }
  } catch {
    // annulé
  }
}

export async function shareResult(viewRef: RefObject<View | null>, message: string): Promise<void> {
  if (Platform.OS === 'web') {
    await shareOnWeb(viewRef, message);
    return;
  }

  // Mobile : carte image + feuille de partage native.
  if (viewRef.current) {
    try {
      const uri = await captureRef(viewRef, { format: 'png', quality: 0.95 });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: message });
        return;
      }
    } catch {
      // repli texte
    }
  }
  try {
    await Share.share({ message });
  } catch {
    // annulé / indisponible
  }
}
