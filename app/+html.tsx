/**
 * Document HTML racine (Expo Router web).
 *
 * Garantit un rendu correct de l'arabe sur TOUS les appareils :
 *  - lang="ar" + charset utf-8 (mise en forme correcte des lettres liées) ;
 *  - chargement d'une police arabe web (Cairo + Noto Sans Arabic) pour que le
 *    façonnage (cursive) soit identique partout, sans dépendre des polices de
 *    l'appareil — c'est ce qui corrige les lettres « dé-liées » sur mobile.
 *
 * ⚠️ Ne contient aucun texte de l'app : juste l'enveloppe du document web.
 */
import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="ar">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        {/* Police arabe web : assure des lettres correctement liées partout. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Noto+Sans+Arabic:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />

        <ScrollViewStyleReset />

        {/* Applique la police arabe à toute l'app + bon rendu du texte. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #root, * {
                font-family: 'Cairo', 'Noto Sans Arabic', -apple-system, BlinkMacSystemFont,
                  'Segoe UI', Roboto, sans-serif;
              }
              body { -webkit-text-size-adjust: 100%; text-rendering: optimizeLegibility; }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
