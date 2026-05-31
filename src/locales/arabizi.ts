/**
 * 🇲🇦 Darija b lhoruf latin / arabizi (LTR).
 * Kaml l-textes dyal l-app kaynin hna. Beddel li bghiti b kol bsata.
 */
import type { Strings } from './types';

const arabizi: Strings = {
  dir: 'ltr',
  scriptLabel: 'Arabizi',

  common: {
    next: 'Li men be3d',
    back: 'Rje3',
    start: 'Yallah nbdaw',
    appName: 'Moulat Niya',
    tagline: 'Ana Moulat Niya, ghadi n9ra lik f l-fenjan w n-njoum ✨',
    seerName: 'Moulat Niya',
  },

  onboarding: {
    welcome: 'Mer7ba bik 3zizi! Ana Moulat Niya. Gles, strakhi, w khellini n9ra lik chno khebba lik l-9dar f l-7ob w l-mosta9bal 🌙',
    chooseMode: 'Chno bghiti n9ra lik l-yom?',
    soloTitle: 'Ana b w7di',
    soloDesc: 'Ghadi n9ra lik l-mosta9bal: l-7ob, l-khedma w l-machari3 dyalek',
    coupleTitle: 'Ana w chariki',
    coupleDesc: 'Ghadi n7seb likom nisbat t-twafo9 w n3tikom nasa2i7',
    scriptSwitch: 'Beddel l-kitaba',
  },

  quiz: {
    progress: '{current} / {total}',
    yourName: 'Chno smitek?',
    yourNamePh: 'Kteb smitek hna',
    partnerName: 'Chno smiyt charikek?',
    partnerNamePh: 'Kteb smito/smitha',
    yourBirth: 'Imta zdti?',
    partnerBirth: 'Imta zad/zadat charikek?',
    pickDate: 'Khtar t-tarikh',
    gender: 'Chno l-jins dyalek?',
    genderMale: 'Rajel',
    genderFemale: 'Mra',
    genderOther: 'Ma n9oulch',
    status: 'Fach 7ala dyalek daba?',
    statusSingle: '3azeb / 3azba',
    statusRelationship: 'F 3ela9a',
    statusMarried: 'Mzewej / Mzewja',
    statusComplicated: 'M3e99da chwiya',
    color: 'Chno l-loun li ki3jbek?',
    colorRed: '7mer',
    colorBlue: 'Zre9',
    colorGreen: 'Khder',
    colorGold: 'Dahabi',
    element: 'Chmen 3onsor 7ass rasek 9rib lih?',
    elementFire: 'L-3afia',
    elementWater: 'L-ma',
    elementEarth: 'L-ard',
    elementAir: 'R-ri7',
    animal: 'Chmen 7aywan kichbhek?',
    animalLion: 'Sse3',
    animalCat: 'L-9et',
    animalEagle: 'N-nsr',
    animalDolphin: 'Dolfin',
    project: 'Chno l-machrou3 li f balek daba?',
    projectMarriage: 'Z-zwaj',
    projectTravel: 'S-sfer',
    projectCareer: 'L-khedma',
    projectStudy: 'L-9raya',
    season: 'Chmen fasl katfeddel?',
    seasonSpring: 'R-rbi3',
    seasonSummer: 'S-sif',
    seasonAutumn: 'L-khrif',
    seasonWinter: 'Ch-chta',
    date: 'Fin katheb tkhrej f awwel maw3id?',
    dateCafe: 'L-9ahwa',
    dateWalk: 'Tmechya',
    dateCinema: 'S-sinima',
    dateFood: 'Makla bnina',
    birthTime: 'Imta ta9riban zdti f n-nhar?',
    btMorning: 'S-sba7',
    btAfternoon: 'L-9ayla',
    btEvening: 'L-3chiya',
    btNight: 'L-lil',
    btUnknown: 'Ma 3arefch',
    loveStyle: 'Fach katbda tbghi chi 7ed, kifach katkoun?',
    lsClose: 'Kan9reb bezzaf w bghit l-itmi2nan',
    lsFree: 'Kankhelli masafa bach nb9a 7or',
    lsCalm: 'Kankoun merta7 w wate9',
    lsHotCold: 'Merra 9rib merra b3id',
    loveLang: 'Kifach katbiyen l-7ob l charikek?',
    llWords: 'B l-klam z-zwin',
    llTime: 'B l-we9t li n9addi m3ah',
    llHelp: 'B l-mosa3ada w l-khedma',
    llGifts: 'B l-kadoyat',
    llTouch: 'B l-lemsa w l-9orb',
    wantPartner: 'Chno aktar 7aja kat9leb 3liha f charik?',
    wpLoyal: 'L-ikhlas',
    wpAmbition: 'T-tamou7',
    wpHumor: 'D-d7ek w n-nokta',
    wpWarm: 'L-7niya',
    wpFaith: 'D-din w l-9iyam',
    conflict: 'Fach kayn chi khilaf, kifach kattsarraf?',
    cfTalk: 'Kanhder f l-7in bach n7ello',
    cfSpace: 'Kan7taj chwiya dyal l-masafa',
    cfQuiet: 'Kanskot w nbla3',
    cfFire: 'Kanche3el thumma kanbred b sor3a',
    dreamPlace: 'Fin kat7lem t3ich?',
    dpBeach: '7da l-b7ar',
    dpMountain: 'F j-jbel',
    dpCity: 'F mdina kbira',
    dpDesert: 'F s-s7ra l-hadya',
  },

  loading: {
    title: 'Kan9ra f l-fenjan...',
    sub: 'Sebri 3liya chwiya, kan9leb f n-njoum w l-9mar bach nchouf lik l-mektoub 🌟',
  },

  result: {
    scoreLabel: 'Nisbat t-twafo9',
    soloTitle: 'L-qira2a dyalek 3and Moulat Niya',
    loveLabel: 'F l-7ob',
    workLabel: 'F l-khedma',
    futureLabel: 'L-mosta9bal',
    adviceLabel: 'Nasi7a men Moulat Niya',
    share: 'Charek',
    restart: '3awd men jdid',
    disclaimer:
      'Had l-app howa ghir l t-tasliya w d-d7ek. Moulat Niya chakhsiya khayaliya, w l-qira2a machi taw9i3 7a9i9i w ma khassekch t3temed 3liha f l-9rarat dyalek. Kaml l-mou3tayat kaybqaw f t-tilifoun dyalek.',
    shareIntroCouple: 'Moulat Niya 9ratna w 7esbat lina nisbat t-twafo9! 💞',
    shareIntroSolo: 'Moulat Niya 9rat liya l-mosta9bal! 🌙',
    yourSign: 'L-borj dyalek',
    partnerSign: 'Borj charikek',
    age: 'L-3omr',
  },

  history: {
    open: 'L-qira2at s-sab9a',
    title: 'L-qira2at s-sab9a',
    empty: 'Mazal ma 9rit lik walou. Aji n9ra lik awwel merra! 🌙',
    clear: 'Ms7 l-kol',
    scoreShort: 'Twafo9',
  },

  signs: {
    aries: { name: 'Hamal', trait: 'jari2 w mlian b ta9a' },
    taurus: { name: 'Thawr', trait: 'sabour w kib7eb r-ra7a' },
    gemini: { name: 'Jawza', trait: 'dki w kihder bezzaf' },
    cancer: { name: 'Saratan', trait: '7nin w 7assas' },
    leo: { name: 'Asad', trait: 'fakhour w kib7eb l-adwa2' },
    virgo: { name: 'Adra', trait: 'd9i9 w kib7eb t-tartib' },
    libra: { name: 'Mizan', trait: 'kib7eb t-tawazoun w j-jamal' },
    scorpio: { name: '3aqrab', trait: '9wi w 3ami9' },
    sagittarius: { name: 'Qaws', trait: '7or w kib7eb l-moghamara' },
    capricorn: { name: 'Jady', trait: 'tamou7 w jiddi' },
    aquarius: { name: 'Dalw', trait: 'mokhtalef w mobdi3' },
    pisces: { name: 'Hut', trait: '7alem w romansi' },
  },

  elements: {
    fire: 'L-3afia',
    water: 'L-ma',
    earth: 'L-ard',
    air: 'R-ri7',
  },

  solo: {
    aries: {
      love: 'F l-7ob rak mondafe3, ghadi tji lik forsa bach tbiyen mcha3rek bla khouf.',
      work: 'T-ta9a dyalek ghadi tkhellik tbda 7aja jdida f l-khedma, ghir ma tste3jelch bezzaf.',
      future: 'L-mosta9bal dyalek fih moghamarat, l-jor2a dyalek ghadi tfte7 lik biban.',
    },
    taurus: {
      love: 'Katebghi l-isti9rar, l-7ob li jay ghadi ykoun hadi w fih thi9a.',
      work: 'S-sber dyalek ghadi yjib lik natija, l-flous ghadi tt7essen chwiya b chwiya.',
      future: 'Ghadi tebni 7aja tb9a, r-ra7a w l-aman homa li kat9leb 3lihom.',
    },
    gemini: {
      love: 'L-klam l-7lou sila7ek, ghadi tl9a chi 7ed kifehmek men noss l-kelma.',
      work: '3andek afkar bezzaf, khtar w7da w rakez 3liha ghadi terbe7.',
      future: 'Tn9lat w m3aref jdad f t-tri9, 7yatek maghadich tkoun 3ya.',
    },
    cancer: {
      love: 'L-9alb dyalek kbir, l-3a2ila w l-7ob ghadien y3tiwk l-far7a had l-fatra.',
      work: 'L-7ads dyalek 9wi, tbe3 i7sasek f l-9rarat dyal l-khedma.',
      future: 'Dar w isti9rar 3a2ili 9rib, ghadi t7ess b l-aman li bghiti.',
    },
    leo: {
      love: 'L-karizma dyalek katjdeb n-nas, chi 7ed ghadi y3jeb bik bezzaf.',
      work: 'Hadi fatra bach tbiyen w takhod mkanek, n-nas ghadi ychoufo l-9ima dyalek.',
      future: 'Naja7 w i3tiraf f t-tri9, bes ma tnsach li 7dak.',
    },
    virgo: {
      love: 'Katdir 7sab l koulchi, tsme7 l rasek t3ich l-le7da w l-7ob ghadi yji.',
      work: 'D-di9a dyalek ghadi tkhellik tberez, chi mas2oulia jdida 9riba.',
      future: 'T-tartib w s-sber ghadien ywesslouk l hadaf mohim.',
    },
    libra: {
      love: 'Kat9leb 3la t-tawazoun, 3ela9a fiha i7tiram w jamal jaya lik.',
      work: 'D-dibloumasia dyalek ghadi t7ell lik machakil w t9errbek men n-naja7.',
      future: 'Ikhtiyarat mohimma 9oddamek, wzen l-omour w ghadi tkhtar mzyan.',
    },
    scorpio: {
      love: 'Mcha3rek 3ami9a, 7ob 9wi w sadi9 ghadi ydkhol 7yatek.',
      work: 'L-3azima dyalek makat3refch l-istislam, hadaf s3ib ghadi t7e99o.',
      future: 'Ta7awoul kbir f 7yatek, ghadi tkhrej a9wa mma knti.',
    },
    sagittarius: {
      love: 'Katheb l-7orria, ghadi tl9a chi 7ed ymchi m3ak f l-moghamara bla ma y9eydek.',
      work: 'Forsa b3ida wla sfer mertbet b l-khedma momken ybeddel 7yatek.',
      future: 'Abwab jdad w tajarib, t-tafa2ol dyalek howa l-mefta7.',
    },
    capricorn: {
      love: 'Katakhod l-7ob b jiddiya, 3ela9a mosta9irra w twila l-amad f balek.',
      work: 'T-tamou7 dyalek ghadi ywesslek b3id, tar9iya wla naja7 9rib.',
      future: 'Koul khotwa katebniha daba ghadi techkerha men b3d.',
    },
    aquarius: {
      love: 'Katfekker b tari9a mokhtalfa, l-7ob li jay ghadi ykoun ghir 3adi w mothir.',
      work: 'Fikra mobdi3a dyalek momken tbeddel koulchi, tjerre2 w 9eddemha.',
      future: 'Mosta9bal fih tejdid, nta li ghadi tbda l-mawja.',
    },
    pisces: {
      love: 'Romansi bezzaf, 7ob 7alem w 7nin ghadi ylmes 9albek.',
      work: 'L-khayal dyalek mawhiba, ste3melha f chi machrou3 ibda3i.',
      future: 'L-a7lam dyalek 9riba twelli 7a9i9a ila tbe3tiha.',
    },
  },

  coupleStyle: {
    aries: 'kib7eb b 7amas w kibiyen mcha3ro b sor3a',
    taurus: 'kib7eb b houdou2 w kidour 3la l-isti9rar',
    gemini: 'kib7eb b l-klam w d-d7ek w t-taghyir',
    cancer: 'kib7eb b 7niya w ki3ti bezzaf men 9albo',
    leo: 'kib7eb b fakhr w bgha y7ess b annou mohim',
    virgo: 'kib7eb b t-tafasil s-sghira w l-ihtimam',
    libra: 'kib7eb b t-tawazoun w kikreh l-machakil',
    scorpio: 'kib7eb b 3om9 w b koul jawar7o',
    sagittarius: 'kib7eb b 7orria w kibghi charik moghamer',
    capricorn: 'kib7eb b jiddiya w kifekker f l-mosta9bal',
    aquarius: 'kib7eb b tari9a mokhtalfa w ki7taj msa7to',
    pisces: 'kib7eb b 7olm w romansia kbira',
  },
  coupleNarrative: 'Kanchouf bli nta {a}, w howa/hiya {b}. Fach had t-tabi3tin kitla9aw, kikhrej menhom mazij khass bikom we7dkom.',

  bands: [
    {
      title: 'Twafo9 d3if chwiya',
      paragraph:
        'L-abraj dyalkom mokhtalfin bezzaf, w hadchi kikhelli binatkom i7tikak men we9t l we9t. Walakin l-ikhtilaf machi nihayat l-3alam, b l-3aks momken ywelli 7aja momti3a.',
      advice: 'Tfahmo b l-klam w 9eblo l-fer9 li binatkom.',
    },
    {
      title: 'Twafo9 la bas',
      paragraph:
        'Kayna kimya binatkom walakin khassha chwiya dyal l-khedma. 3andkom no9at mochtaraka w no9at mokhtalfa, w had t-tawazoun howa li kikhelli l-3ela9a fiha 7yat.',
      advice: 'Rekzo 3la l-9awasim l-mochtaraka w 3tiw we9t l b3diyatkom.',
    },
    {
      title: 'Twafo9 mzyan',
      paragraph:
        'L-abraj dyalkom kitkamlo bezzaf! Katfehmo b3diyatkom b shoula w kayna ra7a f l-3ela9a. Had n-now3 dyal t-twafo9 kidoum ila 7afdto 3lih.',
      advice: 'Stemro f t-tawasol w ma takhdoch b3diyatkom 3la asas madmoun.',
    },
    {
      title: 'Twafo9 kbir!',
      paragraph:
        'Waw! L-abraj dyalkom mtnas9in bezzaf. Kayna binatkom jadibiya w tafahom 9wi, w katkemlo b3diyatkom f l-omour l-mohimma. 3ela9a fiha far7a w defa.',
      advice: 'Dello b3diyatkom w khelliw had t-ta9a l-7lowa mostamirra.',
    },
    {
      title: 'Twafo9 ostouri 💞',
      paragraph:
        'Hadchi nadir! L-abraj w l-ijabat dyalkom kigoulo billi ntoma zouj rou7 f rou7 w7da. Tafahom, jadibiya w insijam bezzaf. Had n-now3 dyal l-connexion makitla9ach bezzaf.',
      advice: '7afdo 3la had n-ni3ma w kemlo bina2 l-a7lam b jouj.',
    },
  ],

  elementChemistry: {
    same: 'Bma annakom nafs l-3onsor, katfehmo b3diyatkom b tabi3tkom.',
    friendly: 'L-3anasir dyalkom kitkamlo w kiy3tiw ta9a ijabiya.',
    neutral: 'L-3anasir dyalkom m7aydin, khasskom chwiya dyal t-tawazoun.',
    tense: 'L-3anasir dyalkom mokhtalfin, w hadchi kizid ithara l l-3ela9a.',
  },
};

export default arabizi;
