/**
 * Définition de TOUS les textes de l'app (typé).
 * Deux "écritures" de la darija implémentent cette interface :
 *   - ar.ts      → darija en lettres arabes (RTL)
 *   - arabizi.ts → darija en lettres latines / chiffres (LTR)
 *
 * 👉 Pour modifier un texte, va dans le fichier d'écriture correspondant.
 */
import type { Element, ZodiacSign } from '@/utils/zodiac';

export type Script = 'ar' | 'arabizi';

export type SoloReading = {
  love: string;
  work: string;
  future: string;
};

export type Band = {
  title: string;
  paragraph: string;
  advice: string;
};

export interface Strings {
  dir: 'rtl' | 'ltr';
  scriptLabel: string; // nom de l'écriture dans sa propre écriture

  common: {
    next: string;
    back: string;
    start: string;
    appName: string;
    tagline: string;
    seerName: string; // nom de la voyante (mascotte)
  };

  onboarding: {
    welcome: string;
    chooseMode: string;
    soloTitle: string;
    soloDesc: string;
    coupleTitle: string;
    coupleDesc: string;
    scriptSwitch: string;
  };

  quiz: {
    progress: string; // "{current} / {total}"
    yourName: string;
    yourNamePh: string;
    partnerName: string;
    partnerNamePh: string;
    yourBirth: string;
    partnerBirth: string;
    pickDate: string;
    gender: string;
    genderMale: string;
    genderFemale: string;
    genderOther: string;
    status: string;
    statusSingle: string;
    statusRelationship: string;
    statusMarried: string;
    statusComplicated: string;
    color: string;
    colorRed: string;
    colorBlue: string;
    colorGreen: string;
    colorGold: string;
    element: string;
    elementFire: string;
    elementWater: string;
    elementEarth: string;
    elementAir: string;
    animal: string;
    animalLion: string;
    animalCat: string;
    animalEagle: string;
    animalDolphin: string;
    project: string;
    projectMarriage: string;
    projectTravel: string;
    projectCareer: string;
    projectStudy: string;
    season: string;
    seasonSpring: string;
    seasonSummer: string;
    seasonAutumn: string;
    seasonWinter: string;
    date: string;
    dateCafe: string;
    dateWalk: string;
    dateCinema: string;
    dateFood: string;
    // Heure de naissance (forte personnalisation, option « je sais pas »)
    birthTime: string;
    btMorning: string;
    btAfternoon: string;
    btEvening: string;
    btNight: string;
    btUnknown: string;
    // Style d'attachement amoureux
    loveStyle: string;
    lsClose: string;
    lsFree: string;
    lsCalm: string;
    lsHotCold: string;
    // Langage de l'amour (comment tu montres l'amour)
    loveLang: string;
    llWords: string;
    llTime: string;
    llHelp: string;
    llGifts: string;
    llTouch: string;
    // Ce que tu cherches chez un partenaire
    wantPartner: string;
    wpLoyal: string;
    wpAmbition: string;
    wpHumor: string;
    wpWarm: string;
    wpFaith: string;
    // Façon de gérer une dispute
    conflict: string;
    cfTalk: string;
    cfSpace: string;
    cfQuiet: string;
    cfFire: string;
    // Lieu de rêve (projectif, fun)
    dreamPlace: string;
    dpBeach: string;
    dpMountain: string;
    dpCity: string;
    dpDesert: string;
    // --- SOLO : passé amoureux ---
    lovePast: string;
    lpNever: string;
    lpOneBig: string;
    lpFew: string;
    lpHealing: string;
    // --- SOLO : peur en amour ---
    fear: string;
    fearBetrayal: string;
    fearBoredom: string;
    fearDistance: string;
    fearControl: string;
    // --- SOLO : souhait de l'année ---
    yearWish: string;
    ywTheOne: string;
    ywMarriage: string;
    ywFun: string;
    ywHeal: string;
    ywReconnect: string;
    // --- COUPLE : durée de la relation ---
    howLong: string;
    hlNew: string;
    hlMonths: string;
    hlYears: string;
    hlLong: string;
    // --- COUPLE : ce que tu admires ---
    admire: string;
    adHeart: string;
    adMind: string;
    adHumor: string;
    adLooks: string;
    adAmbition: string;
    // --- COUPLE : plus grand défi ---
    challenge: string;
    chDistance: string;
    chJealousy: string;
    chRoutine: string;
    chFamily: string;
    chMoney: string;
    // --- SOLO « psychologue virtuel » ---
    socialEnergy: string;
    seIntro: string;
    seExtro: string;
    seAmbi: string;
    decision: string;
    decHeart: string;
    decHead: string;
    decBoth: string;
    rhythm: string;
    rhMorning: string;
    rhNight: string;
    rhFlex: string;
    coreValue: string;
    cvFamily: string;
    cvFreedom: string;
    cvSuccess: string;
    cvFaith: string;
    cvHonesty: string;
    lifeGoal: string;
    lgStability: string;
    lgImpact: string;
    lgWealth: string;
    lgKnowledge: string;
    lgPeace: string;
    wantKids: string;
    wkYes: string;
    wkSomeday: string;
    wkMaybe: string;
    wkNo: string;
    hobby: string;
    hbSport: string;
    hbArt: string;
    hbTravel: string;
    hbGaming: string;
    hbCooking: string;
    hbReading: string;
    socialPref: string;
    spCircle: string;
    spCrowd: string;
    spSolo: string;
    stress: string;
    stTalk: string;
    stAlone: string;
    stMove: string;
    stFaith: string;
    dream: string;
    drTravel: string;
    drBusiness: string;
    drFame: string;
    drFamily: string;
    strength: string;
    strKind: string;
    strLoyal: string;
    strFunny: string;
    strStrong: string;
    strSmart: string;
    flaw: string;
    flStubborn: string;
    flImpatient: string;
    flShy: string;
    flOverthink: string;
    futureVision: string;
    fvOptimist: string;
    fvPlanner: string;
    fvDreamer: string;
    fvRealist: string;
    // --- COUPLE premium ---
    sharedDream: string;
    sdHome: string;
    sdTravel: string;
    sdBusiness: string;
    sdFamily: string;
    affection: string;
    afLots: string;
    afSubtle: string;
    afWords: string;
    afActs: string;
    trust: string;
    trTotal: string;
    trGrowing: string;
    trCareful: string;
    decide: string;
    dcTogether: string;
    dcMe: string;
    dcPartner: string;
    dcFlow: string;
    firstStep: string;
    fsMe: string;
    fsPartner: string;
    fsBoth: string;
  };

  loading: {
    title: string;
    sub: string;
  };

  result: {
    scoreLabel: string;
    soloTitle: string; // "القراءة ديالك"
    loveLabel: string;
    workLabel: string;
    futureLabel: string;
    adviceLabel: string;
    share: string;
    restart: string;
    disclaimer: string;
    shareIntroCouple: string; // préfixe du texte partagé
    shareIntroSolo: string;
    yourSign: string;
    partnerSign: string;
    age: string;
  };

  history: {
    open: string; // bouton sur l'accueil
    title: string;
    empty: string;
    clear: string;
    scoreShort: string; // ex. "توافق"
  };

  // Noms + petits traits par signe
  signs: Record<ZodiacSign, { name: string; trait: string }>;
  elements: Record<Element, string>;

  // Lecture individuelle par signe
  solo: Record<ZodiacSign, SoloReading>;

  // Façon d'aimer de chaque signe (utilisée pour composer une interprétation
  // de couple propre à la PAIRE de signes, pas juste au palier de score).
  coupleStyle: Record<ZodiacSign, string>;
  // Gabarit composant les deux styles : {a} et {b} = phrases coupleStyle.
  coupleNarrative: string;

  // 5 paliers de score de compatibilité (du plus faible au plus fort)
  bands: [Band, Band, Band, Band, Band];

  // Phrase courte sur la relation entre les deux éléments
  elementChemistry: {
    same: string;
    friendly: string;
    neutral: string;
    tense: string;
  };

  // 🔮 Lecture détaillée & personnalisée (composée à partir des réponses).
  readings: {
    // Titres des « aspects » affichés en cartes
    personalityLabel: string;
    strengthsLabel: string;
    watchLabel: string;
    commLabel: string;
    futureTogetherLabel: string;
    yearLabel: string;
    luckyLabel: string;
    soloIntro: string; // petite intro de Moulat Niya (solo), {name}
    coupleIntro: string; // intro (couple), {name1} {name2}

    // Titres de sections du rapport SOLO enrichi
    portraitLabel: string;
    dailyLabel: string;
    valuesLabel: string;
    emotionsLabel: string;
    socialLabel: string;
    familyLabel: string;
    dreamsLabel: string;
    growthLabel: string;
    futureLabel: string;
    archetypeLabel: string; // « ton archétype »
    soloOutro: string; // mot de fin de Moulat Niya, {name}
    profileMix: string; // gabarit qui mélange plusieurs traits, {energy}{decision}{value}

    // --- Fragments SOLO (clés = valeurs de réponse) ---
    elementPersona: Record<Element, string>;
    loveStyleRead: Record<string, string>; // close/free/calm/hotcold
    lovePastRead: Record<string, string>; // never/onebig/few/healing
    fearRead: Record<string, string>; // betrayal/boredom/distance/control
    yearWishRead: Record<string, string>; // theone/marriage/fun/heal/reconnect
    wantPartnerRead: Record<string, string>; // loyal/ambition/humor/warm/faith
    // Nouveaux dictionnaires de lecture (psychologie)
    socialEnergyRead: Record<string, string>;
    decisionRead: Record<string, string>;
    rhythmRead: Record<string, string>;
    coreValueRead: Record<string, string>;
    lifeGoalRead: Record<string, string>;
    wantKidsRead: Record<string, string>;
    hobbyRead: Record<string, string>;
    socialPrefRead: Record<string, string>;
    stressRead: Record<string, string>;
    dreamRead: Record<string, string>;
    strengthRead: Record<string, string>;
    flawRead: Record<string, string>;
    futureVisionRead: Record<string, string>;
    // Archétype : choisi selon élément + énergie sociale
    archetypes: Record<string, { name: string; text: string }>;

    // --- COUPLE premium : labels de sections + dictionnaires ---
    coupleDynamicLabel: string;
    coupleTrustLabel: string;
    coupleProjectLabel: string;
    coupleOutro: string; // {name1} {name2}
    coupleArchetypes: Record<string, { name: string; text: string }>; // clé = relation d'éléments
    trustRead: Record<string, string>;
    affectionRead: Record<string, string>;
    decideRead: Record<string, string>;
    firstStepRead: Record<string, string>;
    sharedDreamRead: Record<string, string>;

    // --- Fragments COUPLE (clés = valeurs de réponse) ---
    howLongRead: Record<string, string>; // new/months/years/long
    loveLangRead: Record<string, string>; // words/time/help/gifts/touch
    conflictRead: Record<string, string>; // talk/space/quiet/fire
    admireRead: Record<string, string>; // heart/mind/humor/looks/ambition
    challengeRead: Record<string, string>; // distance/jealousy/routine/family/money
    projectRead: Record<string, string>; // marriage/travel/career/study
  };

  // 🎙️ Mode vocal / conversation avec Moulat Niya.
  voice: {
    mode: string; // libellé sur l'accueil
    modeDesc: string;
    title: string;
    askVoice: string; // « Pose ta question par la voix »
    talk: string; // « Parler avec Moulat Niya »
    typeInstead: string; // basculer en écrit
    placeholder: string; // champ de saisie
    send: string;
    listening: string; // « كانصنت ليك... »
    thinking: string; // « كانقلب فالنجوم... »
    speaking: string; // « Moulat Niya تهضر... »
    tapToSpeak: string; // sous le micro
    notSupported: string; // micro indisponible (mobile/navigateur)
    noArabicVoice: string; // pas de voix arabe installée (web)
    replay: string; // réécouter
    stop: string; // arrêter la voix
    greeting: string; // 1er message de Moulat Niya
    suggestions: string[]; // questions suggérées (puces)
    // Réponses par thème (sélection déterministe par mots-clés)
    answersLove: string[];
    answersWork: string[];
    answersMoney: string[];
    answersHealth: string[];
    answersFuture: string[];
    answersYesNo: string[];
    answersGeneric: string[];
    closing: string[]; // petite phrase de clôture ajoutée parfois
  };

  // 📸 Mode « Analyse par photo » (fictif & local).
  photo: {
    // Onboarding / écran
    mode: string; // libellé sur l'accueil
    modeDesc: string;
    title: string; // titre de l'écran
    pick1: string; // bouton choisir photo 1 (toi)
    pick2: string; // photo du partenaire
    takePhoto: string; // bouton caméra / selfie
    name1Ph: string;
    name2Ph: string;
    analyze: string; // bouton lancer
    needTwo: string; // message si photos manquantes
    permission: string; // message si permission refusée
    defaultName1: string;
    defaultName2: string;

    // Titres de sections du rapport
    visualLabel: string;
    resemblanceLabel: string;
    loveLabel: string;
    friendshipLabel: string;
    marriageLabel: string;
    storyLabel: string;
    meetingLabel: string;
    bondLabel: string;
    challengeLabel: string;
    futureLabel: string;
    familyLabel: string;
    childrenLookLabel: string;
    promptLabel: string; // « prompt pour générer l'image »
    destinyLabel: string;
    auraLabel: string;
    luckyNumLabel: string;
    luckyDateLabel: string;
    elementLabel: string;
    romanticLabel: string;
    verdictLabel: string;
    // sous-libellés enfant
    faceLabel: string;
    eyesLabel: string;
    hairLabel: string;
    smileLabel: string;
    skinLabel: string;
    resemblesLabel: string;
    traitLabel: string;
    genderGirlWord: string;
    genderBoyWord: string;
    intro: string; // parole de Moulat Niya, {n1} {n2}

    // Nouvelles sections « expérience de vie future »
    marriageWhenLabel: string;
    marriagePlaceLabel: string;
    marriageVibeLabel: string;
    houseLabel: string;
    petsLabel: string;
    noPets: string;
    timelineLabel: string;
    albumLabel: string;
    movieLabel: string;
    destinyReadingLabel: string;
    songLabel: string;
    imageHint: string; // note : images à générer via prompt

    // Pools de fragments (sélection déterministe)
    visualPool: string[]; // {name}
    resemblancePool: string[];
    meetingPool: string[]; // {n1} {n2}
    bondPool: string[];
    challengePool: string[];
    futurePool: string[];
    familyIntro: string; // {count}
    childFace: string[];
    childEyes: string[];
    childHair: string[];
    childSmile: string[];
    childSkin: string[];
    childTrait: string[];
    childGirlNames: string[];
    childBoyNames: string[];
    childImagePrompt: string; // {gender}{eyes}{hair}{skin}{smile}
    auraPool: { label: string; hex: string }[];
    romanticPool: string[]; // {n1} {n2}
    verdictPool: string[];

    // Mariage
    marriageWhenPool: string[];
    marriagePlacePool: string[];
    marriageVibePool: string[];
    // Maison de rêve
    houseTypePool: string[];
    housePlacePool: string[];
    houseDetailPool: string[];
    houseImagePrompt: string; // {type}{place}
    // Animaux
    petEmojis: string[];
    petPool: string[];
    // Frise chronologique : étapes fixes (year/emoji/title/text + scene pour l'image)
    timelineStages: { year: string; emoji: string; title: string; text: string; scene: string }[];
    stageImagePrompt: string; // {scene}
    // Album famille futur
    albumShots: { emoji: string; caption: string; scene: string }[];
    albumImagePrompt: string; // {scene}
    // Film de vie
    movieTitlePool: string[]; // {n1} {n2}
    movieActs: { label: string; text: string }[]; // {n1} {n2}
    moviePosterPrompt: string; // {n1}{n2}{title}
    // Destin enrichi
    destinyPool: string[]; // {n1} {n2}
    songPool: string[];
  };
}
