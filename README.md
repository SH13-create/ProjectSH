# 🔮 Moulat Niya — مولات النية

Prototype mobile **ludique et divertissant** en **darija marocaine**, mené par
**Moulat Niya** (مولات النية) — une **voyante / chouwafa IA** qui « lit » dans le
fenjan et les étoiles. Elle calcule la **compatibilité amoureuse** entre deux
personnes (mode couple) ou « révèle » l'**avenir** d'une personne seule (mode
individuel), à partir d'un petit quiz qu'elle te pose.

> ⚠️ **C'est juste pour s'amuser.** Moulat Niya est un **personnage fictif** ;
> l'app ne fait aucune vraie prédiction ni conseil sérieux. **Aucune donnée ne
> quitte l'appareil** : tout est stocké en local.

---

## 🏷️ Le nom & le concept

**Moulat Niya** (مولات النية) = « celle qui a le don / l'intuition », clin d'œil
à la *chouwafa* marocaine. C'est une **persona de voyante** : elle parle à la
première personne (« كانشوف ليك... » / « Kanchouf lik... »), accueille
l'utilisateur, pose les questions, puis « lit » le résultat — un angle de
différenciation par rapport aux apps de compatibilité génériques (cf. benchmark
Co–Star, The Pattern, EvaTarot…).

Pour changer le nom : voir [`app.json`](./app.json) (`name`, `slug`) et les clés
`common.appName` / `common.seerName` dans les fichiers de langue.

### 🔮 L'avatar de Moulat Niya (portrait premium)

Moulat Niya est représentée par un **vrai portrait IA photoréaliste** d'une
voyante marocaine — fichier [`assets/seer.png`](./assets/seer.png) — affiché dans
un **cadre circulaire doré** avec halo (rendu **premium**, qualité cover d'app).
Composant : [`SeerAvatar.tsx`](./src/components/SeerAvatar.tsx) (`USE_PHOTO = true`).

**Pour remplacer le portrait** par un autre :
1. Prépare une image **carrée** (≥ 768×768), visage centré.
2. Remplace **`assets/seer.png`**.
3. (Garde `USE_PHOTO = true`.) C'est tout — la photo s'affiche partout.

Pour **générer** un nouveau portrait IA, prompt optimisé :
   > *"Photorealistic studio portrait of a Moroccan female fortune teller, around
   > 40 years old, warm and reassuring yet mysterious gaze, natural elegant
   > features, soft genuine smile; wearing an elegant modern Moroccan caftan and a
   > flowing headscarf, delicate gold jewelry; color palette of deep violet, navy
   > blue and gold; soft professional cinematic lighting; subtle mystical
   > background with faint stars, a soft moon and golden glow; premium, trustworthy,
   > high-end editorial look; ultra detailed, 8k, photorealistic. Square 1:1.
   > Negative: cartoon, illustration, 3d render, emoji, childish, low quality,
   > distorted face, extra fingers."*

La photo s'affiche **partout** (accueil, chargement, lectures, mode photo) dans le
même cadre doré premium. Si l'image source n'est pas carrée, on peut la recadrer
proprement (ex. via `sharp`, comme lors de l'intégration initiale).

### ❓ Deux parcours de quiz **volontairement différents**

- **Mode individuel** — un véritable **bilan de personnalité** (~26 questions)
  couvrant : 🧠 personnalité (énergie sociale, cœur/tête, qualité, défaut),
  ⏰ habitudes & loisirs, 💎 valeurs & objectifs de vie, 🌊 gestion des émotions,
  🎭 préférences sociales, ❤️ amour (style, passé, idéal, peur), 👪 famille,
  ✨ rêves & ambitions, 🔭 vision du futur.
- **Mode couple** — bilan de relation premium (~19 questions) : depuis quand
  ensemble, **niveau de confiance**, **démonstration d'affection**, langage de
  l'amour, gestion des disputes, **qui fait le 1er pas**, **prise de décision**,
  ce que tu admires, plus grand défi, **rêve commun**, projet. Le rapport couple
  affiche aussi un **archétype de couple** (selon la chimie des éléments, ex.
  « 🪞 Âme sœur », « ⚡ Attraction puissante ») + sections détaillées (forces,
  confiance, communication, dynamique, vigilance, projet) + intro/outro.

La **lecture finale solo** ([`src/utils/reading.ts`](./src/utils/reading.ts)) est
un **rapport long et immersif** « façon psychologue virtuel » : un **archétype**
mis en avant (combinaison élément × énergie sociale, ex. « 🌋 Le Guerrier
Tranquille »), puis ~12 sections personnalisées (portrait, personnalité,
habitudes, valeurs, émotions, social, amour, famille, rêves, point de croissance,
travail, futur), chaque paragraphe étant **assemblé à partir des réponses
réelles** — d'où l'effet « c'est écrit pour moi ». Le tout encadré par une
parole d'ouverture et de clôture de Moulat Niya. 100% déterministe & local.

### 🎙️ Mode vocal interactif — « Parler avec Moulat Niya »

Une **conversation** avec la voyante ([`app/voice.tsx`](./app/voice.tsx)) :
l'utilisateur pose une question **par la voix** ou **en l'écrivant**, et Moulat
Niya répond par **un texte élégant + une voix chaleureuse** (synthèse vocale), avec
une **animation d'onde sonore** quand elle parle (impression de conversation
vivante).

- **Voix de Moulat Niya (TTS)** : sur le **web**, on utilise l'**API native**
  `window.speechSynthesis` (la plus fiable sur Chrome/Edge/Safari) ; sur **mobile**
  `expo-speech`. Elle parle **toujours en darija marocaine** (`ar-MA`) — c'est la
  version en lettres arabes qui est lue. Voix arabe choisie automatiquement si le
  navigateur en propose une (ex. « Google العربية »), **sans installation
  manuelle** ; sinon on force quand même `lang = ar-MA`.
  - ⚠️ **Autoplay** : les navigateurs bloquent l'audio tant que l'utilisateur n'a
    pas interagi. Au 1ᵉʳ lancement web, un bouton **« كبس باش تسمع مولات النية »**
    débloque l'audio (`unlockAudio()`) puis déclenche l'accueil
    **« مرحبا بوليداتي »**. Toute interaction (mic, question) débloque aussi la voix.
  - Anti-coupure Chrome : `resume()` périodique pendant les longues phrases.
- **Questions suggérées** : des puces tappables amorcent la conversation.
- **Mascotte vivante** ([`src/components/LiveSeer.tsx`](./src/components/LiveSeer.tsx)) :
  un personnage **animé en SVG** (pas une image figée) qui donne l'impression de
  parler — **bouche synchronisée** à l'audio (animation pilotée par les callbacks
  `onStart`/`onDone` du TTS, avec repli temporisé si aucune voix n'émet),
  **clignement des yeux** aléatoire (toutes les ~2,4–5 s) et **léger balancement
  de tête** permanent (reanimated). Aucune API externe.
- **Micro / dictée** : [`src/utils/speech.ts`](./src/utils/speech.ts) utilise la
  **Web Speech API** (Chrome/Edge) — **sans backend**. Si le micro n'est pas
  supporté (certains navigateurs / mobile natif), l'UI bascule proprement sur la
  **saisie écrite** (« Écrire au lieu de la voix »).
- **Réponses (vraie IA)** : [`src/utils/ai.ts`](./src/utils/ai.ts) envoie la
  question à un modèle de langage (API compatible OpenAI : OpenAI, Groq,
  OpenRouter…) avec une consigne « réponds en **darija marocaine**, chaleureuse,
  ton de voyante, divertissement ». **Configuration** : copie `.env.example` en
  `.env` et mets ta clé `EXPO_PUBLIC_AI_API_KEY` (+ éventuellement `_BASE_URL` et
  `_MODEL`). **Sans clé**, l'app reste fonctionnelle : repli automatique sur le
  moteur **local** [`src/utils/oracle.ts`](./src/utils/oracle.ts) (réponses darija
  déterministes par thème).
- **Voix féminine, sans emoji** : la synthèse choisit en priorité une voix
  **féminine** arabe, et `cleanForSpeech()` **retire les emojis/symboles** avant
  lecture (plus de « 🌙 » prononcé « croissant de lune »).
### 📸 Mode « Analyse par photo » (fictif & 100% local)

Un 3ᵉ mode depuis l'accueil : on importe **2 photos** + 2 prénoms, et Moulat Niya
génère un rapport complet et ludique
([`app/photo.tsx`](./app/photo.tsx) → [`app/photoReport.tsx`](./app/photoReport.tsx),
moteur : [`src/utils/photoReport.ts`](./src/utils/photoReport.ts)) :

1. **Analyse visuelle** (lecture d'énergie fictive) · ressemblances/différences
2. **Scores** amour / amitié / mariage (jauges animées)
3. **Histoire du couple** (rencontre, ce qui les rapproche, défi, avenir rêvé)
4. **Potentiel de mariage** (quand, où, ambiance)
5. **Famille future** : nombre d'enfants, prénoms, traits + **apparence de chaque
   enfant** (visage, yeux, cheveux, sourire, teint, parent ressemblant)
6. **Maison de rêve** (type, lieu, détail) + prompt d'image
7. **Animaux futurs**
8. **Frise chronologique de vie** (+1 an → +40 ans), chaque étape avec son prompt
9. **Album famille futur** (photos légendées + prompts)
10. **Film de vie** (titre + 3 actes + prompt d'affiche)
11. **Destin** : aura, numéro & date porte-bonheur, élément, lecture du destin,
    prédiction romantique, « chanson du couple »
12. **Verdict final**

> 🎨 **Images** : chaque grande étape (enfants, maison, étapes de vie, album,
> affiche de film) fournit un **prompt prêt à coller** dans un générateur
> d'images IA. L'app **ne génère pas** les visuels elle-même (pas d'outil
> d'images embarqué) — c'est volontaire et indiqué dans l'UI.

> ⚠️ **Important** : **aucune reconnaissance faciale, aucun envoi réseau.** Les
> photos restent sur l'appareil ; le rapport est un **divertissement
> déterministe** dérivé d'une empreinte neutre des images (mêmes photos = même
> rapport). C'est volontairement fictif, fidèle à la promesse « zéro donnée
> envoyée ». La génération réelle des visages d'enfants n'est pas faite dans
> l'app : on fournit le **prompt** à copier dans l'outil IA de ton choix.

---

## 🛠️ Stack technique

- **React Native + Expo** (SDK 56) — aperçu local immédiat (web ou téléphone)
- **TypeScript**
- **expo-router** pour la navigation (dossier [`app/`](./app))
- **AsyncStorage** pour les préférences locales (écriture, thème)
- **react-native-reanimated** pour les animations (jauge, transitions, chargement)
- **react-native-svg** pour le fond zellige et la jauge circulaire

---

## 🚀 Lancer l'app en local (rapide)

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer le serveur de développement

```bash
npx expo start
```

Un QR code et un menu s'affichent dans le terminal.

### 🌐 Aperçu dans le **navigateur web**

```bash
npx expo start --web
```

…ou appuie sur **`w`** dans le terminal après `npx expo start`.
(Équivalent : `npm run web`.)

### 📱 Aperçu sur le **téléphone** (Expo Go)

1. Installe l'app **Expo Go** (Android : Play Store / iOS : App Store).
2. Lance `npx expo start`.
3. Scanne le QR code :
   - **Android** : depuis l'app Expo Go.
   - **iOS** : depuis l'app Appareil photo, puis ouvre dans Expo Go.

> 📌 Le téléphone et l'ordinateur doivent être sur le **même réseau Wi-Fi**.
> Si ça ne marche pas (réseau d'entreprise), lance avec un tunnel :
> `npx expo start --tunnel`.

### 🔁 Basculer entre web et téléphone

Pendant que `npx expo start` tourne, utilise les raccourcis clavier :

| Touche | Action |
| ------ | ------ |
| `w` | ouvrir dans le **navigateur web** |
| `a` | ouvrir sur un **émulateur Android** (si installé) |
| `i` | ouvrir sur un **simulateur iOS** (macOS) |
| `r` | recharger l'app |
| `j` | ouvrir le debugger |

Pour le téléphone, garde simplement Expo Go ouvert et scanne le QR code.

### ✅ Vérifier que tout compile

```bash
npm run tsc          # vérification TypeScript (0 erreur attendue)
npm test             # tests unitaires Jest (logique zodiaque + compatibilité)
npx expo export --platform web   # build de production web dans /dist
```

---

## 📂 Arborescence du projet

```
ProjectSH/
├── app/                      # Écrans (routing via expo-router)
│   ├── _layout.tsx           # Providers (thème, langue, quiz) + navigation
│   ├── index.tsx             # 🏠 Accueil / onboarding + choix du mode
│   ├── quiz.tsx              # ❓ Flux de questions (1 question/écran)
│   ├── loading.tsx           # ⏳ « جاري التحليل... » (animation suspense)
│   ├── result.tsx            # 🎉 Résultat (score couple OU lecture solo)
│   └── history.tsx           # 📜 Résultats précédents (stockés en local)
│
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── AppText.tsx        # Texte (gère RTL + couleurs du thème)
│   │   ├── ZelligeBackground  # Motif géométrique d'arrière-plan (SVG)
│   │   ├── Button.tsx         # Bouton animé + haptique
│   │   ├── Card.tsx           # Carte arrondie avec ombre
│   │   ├── ChoiceCard.tsx     # Carte de choix « à taper »
│   │   ├── Confetti.tsx       # 🎊 Confettis (célébration des grands scores)
│   │   ├── DateField.tsx      # Sélecteur de date maison (web + mobile)
│   │   ├── Gauge.tsx          # Jauge circulaire animée (score %)
│   │   ├── ProgressBar.tsx    # Barre de progression du quiz
│   │   ├── Screen.tsx         # Conteneur d'écran (safe area + fond)
│   │   ├── Toggles.tsx        # Bascules écriture & thème
│   │   └── ZodiacBadge.tsx    # 🪐 Médaillon vectoriel d'un signe (SVG)
│   │
│   ├── context/              # État global (React Context)
│   │   ├── ThemeContext.tsx   # Mode clair / sombre
│   │   ├── LocaleContext.tsx  # Écriture de la darija (arabe / arabizi) + RTL
│   │   └── QuizContext.tsx    # Mode + réponses + calcul du résultat
│   │
│   ├── locales/              # 🌍 TOUS les textes (faciles à modifier)
│   │   ├── types.ts           # Structure typée des textes
│   │   ├── ar.ts              # Darija en lettres arabes (RTL)
│   │   ├── arabizi.ts         # Darija en lettres latines / chiffres
│   │   └── index.ts
│   │
│   ├── theme/                # 🎨 Couleurs, espacements, typographie
│   │   ├── colors.ts          # Palette zellige (clair + sombre)
│   │   └── index.ts
│   │
│   └── utils/                # Logique métier
│       ├── zodiac.ts          # Calcul du signe astrologique + éléments
│       ├── questions.ts       # Définition des questions du quiz
│       ├── compatibility.ts   # 💞 Score déterministe + lecture solo
│       ├── resultText.ts      # Texte de partage
│       ├── share.ts           # Partage texte / image (mobile + web)
│       ├── storage.ts         # AsyncStorage (préférences + historique)
│       └── __tests__/         # Tests Jest (zodiac, compatibilité)
│
├── assets/                   # Icônes / splash
├── app.json                  # Config Expo (nom, thème, plugins)
├── babel.config.js           # Preset Expo + plugin worklets (reanimated)
└── tsconfig.json             # Alias d'import "@/..." → "src/..."
```

---

## 🌍 Langue : darija en 2 écritures

L'app est **entièrement en darija marocaine**, affichable en :

- **الدارجة بالحروف العربية** (lettres arabes, mise en page **RTL**)
- **Arabizi** (lettres latines / chiffres : « kifach », « 3andek »…)

On bascule via le bouton **🌐** en haut de l'écran d'accueil. Le choix est
mémorisé localement.

👉 **Pour modifier un texte**, édite simplement
[`src/locales/ar.ts`](./src/locales/ar.ts) et
[`src/locales/arabizi.ts`](./src/locales/arabizi.ts). Les deux fichiers ont
exactement la même structure (vérifiée par TypeScript).

---

## 🎨 Personnaliser le design

- **Couleurs** → [`src/theme/colors.ts`](./src/theme/colors.ts). Palette inspirée
  du zellige : terracotta, bleu Majorelle, vert menthe, doré, crème. Versions
  claire **et** sombre.
- **Espacements / tailles / arrondis** → [`src/theme/index.ts`](./src/theme/index.ts).
- **Mode clair / sombre** → bouton 🌙 / ☀️ en haut de l'accueil (suit le système
  par défaut).

---

## 🧠 Comment marche le score ? (déterministe)

Le calcul est dans [`src/utils/compatibility.ts`](./src/utils/compatibility.ts).
Il combine :

1. La **relation entre les éléments** des deux signes (feu / eau / terre / air).
2. Les **réponses** au quiz (élément préféré, projet, statut…).
3. Une **variation stable** dérivée des prénoms (hash déterministe).

➡️ **Les mêmes réponses donnent toujours exactement le même résultat** (aucun
`Math.random()`), comme demandé.

---

## ❓ Le quiz

- **Mode individuel** : prénom, date de naissance (→ signe + âge auto), genre,
  statut, couleur, élément, animal, projet d'avenir.
- **Mode couple** : idem + prénom et date du / de la partenaire.

Pour ajouter / retirer une question : voir les tableaux en bas de
[`src/utils/questions.ts`](./src/utils/questions.ts).

---

## 📤 Partage du résultat (texte / image)

Le bouton **« Partager »** ([`src/utils/share.ts`](./src/utils/share.ts)) :

- **Sur mobile** : capture la carte de résultat en **image PNG**
  (`react-native-view-shot`) et ouvre la feuille de partage native
  (`expo-sharing`) — idéal pour envoyer le score sur WhatsApp / Instagram.
- **Sur le web** : capture aussi une **carte image PNG** ; si le navigateur
  supporte le partage de fichiers (Web Share API niveau 2) l'image est partagée,
  sinon elle est **téléchargée** (`moulat-niya.png`). Repli ultime : texte /
  presse-papiers.

---

## ✨ Fonctionnalités bonus

- **Illustrations vectorielles des signes** : médaillons « zellige » dessinés en
  SVG ([`ZodiacBadge`](./src/components/ZodiacBadge.tsx)), colorés selon
  l'élément (couleurs dans [`zodiac.ts → ELEMENT_COLOR`](./src/utils/zodiac.ts)).
- **Historique local** : les derniers résultats sont gardés sur l'appareil
  (écran 📜 accessible depuis l'accueil), avec possibilité de tout effacer.
- **Confettis** 🎊 + vibration de réussite quand le score de couple est élevé.
- **Interprétation propre à la paire** : le texte de couple combine la « façon
  d'aimer » de chaque signe (pas seulement le palier de score).
- **Tests unitaires** de la logique (déterminisme du score, calcul des signes).

## ⚠️ Disclaimer & vie privée

- Un **disclaimer en darija** s'affiche en bas de l'écran de résultat.
- **Aucune collecte de données** : pas de backend, tout reste sur l'appareil
  (seules les préférences d'affichage sont sauvegardées via AsyncStorage).
