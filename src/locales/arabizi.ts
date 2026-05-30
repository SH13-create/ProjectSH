/**
 * 🇲🇦 Darija b lhoruf latin / arabizi (LTR).
 * Kaml l-textes dyal l-app kaynin hna. Beddel li bghiti b kol bساطة.
 */
import type { Strings } from './types';

const arabizi: Strings = {
  dir: 'ltr',
  scriptLabel: 'Arabizi',

  common: {
    next: 'Li jay',
    back: 'Rjou3',
    start: 'Yallah nbdaw',
    appName: 'Twafo9',
    tagline: 'Chouf ch7al katwaf9o ntoma jouj 💫',
  },

  onboarding: {
    welcome: 'Mer7ba bik! Hna ghadi nktachfo sser dyal twafo9 dyalek b tari9a sahla w momti3a 🌙',
    chooseMode: 'Khtar kifach bghiti tel3eb',
    soloTitle: 'Ana bو7di',
    soloDesc: 'Qira2a 3la l-mosta9bal dyalek: l-7ob, l-khedma w l-machari3',
    coupleTitle: 'Ana w chariki',
    coupleDesc: '7seb nisbat t-twafo9 binatkom w khod nasa2i7',
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
    statusSingle: '3azeb/3azba',
    statusRelationship: 'F 3ela9a',
    statusMarried: 'Mzewej/Mzewja',
    statusComplicated: 'Mu39da chwiya',
    color: 'Chno l-loun li kit3jbek?',
    colorRed: '7mer',
    colorBlue: 'Zre9',
    colorGreen: 'Khder',
    colorGold: 'Dahabi',
    element: 'Chmen 3onsor 7ssito 9rib lik?',
    elementFire: 'L-3afia',
    elementWater: 'L-ma',
    elementEarth: 'L-ard',
    elementAir: 'R-ri7',
    animal: 'Chmen 7aywan kichbhek?',
    animalLion: 'Sse3',
    animalCat: 'L-mech',
    animalEagle: 'N-nser',
    animalDolphin: 'Dolfin',
    project: 'Chno l-machrou3 li f balek daba?',
    projectMarriage: 'Z-zwaj',
    projectTravel: 'S-sfer',
    projectCareer: 'L-career',
    projectStudy: 'L-9raya',
  },

  loading: {
    title: 'Jari t-t7lil...',
    sub: 'Kan9elbo f n-njoum w l-9mar bach nl9aw l-jawab 🌟',
  },

  result: {
    scoreLabel: 'Nisbat t-twafo9',
    soloTitle: 'L-qira2a dyalek',
    loveLabel: 'F l-7ob',
    workLabel: 'F l-khedma',
    futureLabel: 'L-mosta9bal',
    adviceLabel: 'Nasi7a',
    share: 'Charek',
    restart: '3awd men jdid',
    disclaimer:
      'Had l-app howa ghir l t-tasliya w d-d7ek. Machi taw9i3 7a9i9i w ma khassekch t3temed 3lih f l-9rarat dyalek. Kaml l-mou3tayat kaybqaw f t-tilifoun dyalek.',
    shareIntroCouple: 'Jarrebt twafo9 f app Twafo9! 💞',
    shareIntroSolo: 'Hahiya l-qira2a dyali f app Twafo9! 🌙',
    yourSign: 'L-borj dyalek',
    partnerSign: 'Borj charikek',
    age: 'L-3omr',
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
