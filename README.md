# 💞 Twafo9 — قارئ التوافق بالدارجة

Prototype mobile **ludique et divertissant** en **darija marocaine** qui calcule
la **compatibilité amoureuse** entre deux personnes (mode couple) ou révèle une
**lecture de l'avenir** pour une personne seule (mode individuel), à partir d'un
petit quiz.

> ⚠️ **C'est juste pour s'amuser.** L'app ne fait aucune vraie prédiction et ne
> donne aucun conseil sérieux. **Aucune donnée ne quitte l'appareil** : tout est
> stocké en local.

---

## 🏷️ Le nom de l'app

Trois propositions étaient sur la table :

| Nom | Idée |
| --- | --- |
| **Twafo9** ✅ *(retenu)* | « توافق » = compatibilité. Court, mémorable, 100% darija. |
| Smiyti w Smiytek | « mon prénom & ton prénom », chaleureux et personnel. |
| Hob & Nojoum | « amour & étoiles », l'angle astrologique. |

Le nom retenu est **Twafo9**. Pour le changer : voir [`app.json`](./app.json)
(`name`, `slug`) et la clé `common.appName` dans les fichiers de langue.

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
│   └── result.tsx            # 🎉 Résultat (score couple OU lecture solo)
│
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── AppText.tsx        # Texte (gère RTL + couleurs du thème)
│   │   ├── Background...      # ZelligeBackground.tsx (motif géométrique)
│   │   ├── Button.tsx         # Bouton animé + haptique
│   │   ├── Card.tsx           # Carte arrondie avec ombre
│   │   ├── ChoiceCard.tsx     # Carte de choix « à taper »
│   │   ├── DateField.tsx      # Sélecteur de date maison (web + mobile)
│   │   ├── Gauge.tsx          # Jauge circulaire animée (score %)
│   │   ├── ProgressBar.tsx    # Barre de progression du quiz
│   │   ├── Screen.tsx         # Conteneur d'écran (safe area + fond)
│   │   └── Toggles.tsx        # Bascules écriture & thème
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
│       └── storage.ts         # AsyncStorage (préférences locales)
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

## ⚠️ Disclaimer & vie privée

- Un **disclaimer en darija** s'affiche en bas de l'écran de résultat.
- **Aucune collecte de données** : pas de backend, tout reste sur l'appareil
  (seules les préférences d'affichage sont sauvegardées via AsyncStorage).
