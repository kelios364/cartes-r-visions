// --- BASE DE DONNÉES INTÉGRÉE (PROVENANT DU JSON) ---
const rawQuestionsData = [
  {
    "id": 0,
    "title": "Histoire - Révolution",
    "cards": [
      { "id": "0-1", "q": "Quelle est la date de la prise de la Bastille ?", "a": "14 juillet 1789" },
      { "id": "0-2", "q": "Quel texte fondamental est voté le 26 août 1789 ?", "a": "La Déclaration des Droits de l'Homme et du Citoyen (DDHC)" },
      { "id": "0-3", "q": "Quand la Ire République est-elle proclamée ?", "a": "22 septembre 1792" },
      { "id": "0-4", "q": "Quel événement met fin à la Terreur en juillet 1794 ?", "a": "La chute et l'exécution de Robespierre (9 Thermidor)" },
      { "id": "0-5", "q": "Quel coup d'État de Bonaparte met fin au Directoire ?", "a": "Le coup d'État du 18 Brumaire (9 novembre 1799)" }
    ]
  },
  {
    "id": 1,
    "title": "Maths - Dérivées & Intégrales",
    "cards": [
      { "id": "1-1", "q": "Quelle est la dérivée de f(x) = xⁿ ?", "a": "f'(x) = n · xⁿ⁻¹" },
      { "id": "1-2", "q": "Quelle est la dérivée de f(x) = eˣ ?", "a": "f'(x) = eˣ" },
      { "id": "1-3", "q": "Quelle est la dérivée de f(x) = ln(x) ?", "a": "f'(x) = 1 / x" },
      { "id": "1-4", "q": "Que vaut l'intégrale ∫ (1/x) dx ?", "a": "ln|x| + C" },
      { "id": "1-5", "q": "Formule de la dérivée d'un produit (u · v)' ?", "a": "u'v + uv'" }
    ]
  },
  {
    "id": 2,
    "title": "Physique - Mécanique",
    "cards": [
      { "id": "2-1", "q": "Énoncer la 2e loi de Newton (Principe fondamental de la dynamique)", "a": "Σ F = m · a" },
      { "id": "2-2", "q": "Quelle est l'unité de la force dans le système international ?", "a": "Le Newton (N), équivalent à kg·m·s⁻²" },
      { "id": "2-3", "q": "Formule de l'énergie cinétique (Ec) ?", "a": "Ec = ½ · m · v²" },
      { "id": "2-4", "q": "Formule du travail d'une force constante W(F) ?", "a": "W(F) = F · d · cos(θ)" },
      { "id": "2-5", "q": "Qu'est-ce que la 3e loi de Newton ?", "a": "Le principe des actions réciproques (F_A/B = -F_B/A)" }
    ]
  },
  {
    "id": 3,
    "title": "Philosophie - La Conscience",
    "cards": [
      { "id": "3-1", "q": "Qui est l'auteur de la célèbre formule « Je pense donc je suis » ?", "a": "René Descartes (Discours de la méthode, 1637)" },
      { "id": "3-2", "q": "Qu'est-ce que l'intentionnalité selon Husserl ?", "a": "Le principe selon lequel « toute conscience est conscience de quelque chose »" },
      { "id": "3-3", "q": "Qui a théorisé l'Inconscient pour critiquer la souveraineté de la conscience ?", "a": "Sigmund Freud" },
      { "id": "3-4", "q": "Selon Kant, que permet la conscience morale ?", "a": "De distinguer le bien du mal via l'impératif catégorique" },
      { "id": "3-5", "q": "Quelle est la définition étymologique de « conscience » (cum scientia) ?", "a": "« Avec savoir » ou « accompagné de connaissance »" }
    ]
  },
  {
    "id": 4,
    "title": "SVT - Génétique & ADN",
    "cards": [
      { "id": "4-1", "q": "Quelles sont les 4 bases azotées de l'ADN ?", "a": "Adénine (A), Thymine (T), Cytosine (C), Guanine (G)" },
      { "id": "4-2", "q": "Par quoi la Thymine est-elle remplacée dans l'ARN ?", "a": "Par l'Uracile (U)" },
      { "id": "4-3", "q": "Quel processus permet de passer de l'ADN à l'ARNm ?", "a": "La transcription" },
      { "id": "4-4", "q": "Où se déroule la traduction de l'ARNm en protéine ?", "a": "Dans le cytoplasme, au niveau des ribosomes" },
      { "id": "4-5", "q": "Qu'est-ce qu'un allèle ?", "a": "Une version différente d'un même gène" }
    ]
  }
];

const extraThemeTitles = [
  "Chimie - Solutions & Moles", "Anglais - Vocabulaire Avancé", "Géographie - Mondialisation", 
  "Droit - Droit Constitutionnel", "Économie - Microéconomie", "Informatique - Algorithmique", 
  "Espagnol - Grammaire", "Littérature - Le Théâtre", "Histoire - Guerre Froide", 
  "Biologie - Système Immunitaire", "Maths - Probabilités", "Physique - Optique", 
  "Philosophie - La Justice", "SVT - Tectonique des Plaques", "Économie - Macroéconomie", 
  "Droit - Droit Civil", "Chimie - Thermo-chimie", "Histoire - Moyen Âge", 
  "Informatique - Réseaux", "Sociologie - Culture"
];

// --- GÉNÉRATION DES 100 CARTES PAR THÈME (SANS MÉLANGER LES MATIÈRES) ---
let themesData = [];

// 1. Génération de 100 cartes pour les 5 thèmes gratuits (sans sortir de leur matière)
rawQuestionsData.forEach(theme => {
  let themeCards = [];
  for (let i = 0; i < 100; i++) {
    let baseCard = theme.cards[i % theme.cards.length];
    themeCards.push({
      id: `${theme.id}-${i + 1}`,
      q: baseCard.q + (i >= theme.cards.length ? ` (Variante Q${i + 1})` : ""),
      a: baseCard.a
    });
  }
  themesData.push({
    id: theme.id,
    title: theme.title,
    cards: themeCards
  });
});

// 2. Génération de 100 cartes spécifiques pour chacun des 20 thèmes payants
extraThemeTitles.forEach((title, index) => {
  const themeId = index + 5;
  let themeCards = [];
  for (let i = 0; i < 100; i++) {
    themeCards.push({
      id: `${themeId}-${i + 1}`,
      q: `[${title}] Question N°${i + 1}`,
      a: `Explication et réponse pour la question N°${i + 1} du thème ${title}.`
    });
  }
  themesData.push({
    id: themeId,
    title: title,
    cards: themeCards
  });
});

// --- ÉTAT GLOBAL ---
let isPro = false;
const FREE_THEMES_LIMIT = 5;
const SESSION_CARDS_COUNT = 100; // Affiche les 100 cartes lors d'une session

let currentSessionQueue = [];
let currentThemeTitle = "";

// --- ÉLÉMENTS DU DOM ---
const themesGrid = document.getElementById('themesGrid');
const themesScreen = document.getElementById('themes-screen');
const sessionScreen = document.getElementById('session-screen');
const completeScreen = document.getElementById('complete-screen');

const flashcard = document.getElementById('flashcard');
const cardFront = document.getElementById('cardFront');
const cardBack = document.getElementById('cardBack');
const sessionProgress = document.getElementById('sessionProgress');
const currentThemeTitleElem = document.getElementById('currentThemeTitle');
const proBadge = document.getElementById('proBadge');

// --- NAVIGATION ---
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetTab = item.getAttribute('data-tab');
    navItems.forEach(i => i.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    item.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

function openPricingTab() {
  navItems.forEach(i => i.classList.remove('active'));
  tabContents.forEach(c => c.classList.remove('active'));

  const pricingTabBtn = document.querySelector('[data-tab="view-pricing"]');
  pricingTabBtn.classList.add('active');
  document.getElementById('view-pricing').classList.add('active');
}

// --- PASS ÉTUDIANT ---
function togglePassEtudiant() {
  isPro = !isPro;
  
  if (isPro) {
    proBadge.innerText = "Pass Actif ⚡";
    proBadge.style.background = "#10b981";
    alert("🟢 Pass Étudiant ACTIVÉ ! Les 25 thèmes et le scanner sont désormais débloqués.");
  } else {
    proBadge.innerText = "Pass Étudiant";
    proBadge.style.background = "linear-gradient(135deg, #6366f1, #a855f7)";
    alert("🔴 Pass Étudiant DÉSACTIVÉ (retour aux 5 thèmes gratuits).");
  }

  renderThemes();
}

proBadge.addEventListener('click', togglePassEtudiant);

// --- SCANNER ---
document.getElementById('btnGenerateCards').addEventListener('click', () => {
  if (!isPro) {
    alert("🔒 La génération de fiches depuis vos cours nécessite le Pass Étudiant.");
    openPricingTab();
    return;
  }

  const courseText = document.getElementById('courseText').value;
  const scanInput = document.getElementById('scanInput');

  if (!courseText && scanInput.files.length === 0) {
    alert("Veuillez saisir du texte ou sélectionner un fichier.");
    return;
  }

  const resultContainer = document.getElementById('scanResult');
  const resultText = document.getElementById('generatedCardsContent');
  
  resultText.innerText = "Analyse du cours en cours...\n\n✅ Fiche #1 : Définition des notions clés extraites.\n✅ Fiche #2 : Formules et dates importantes identifiées.\n✅ Fiche #3 : Synthèse prête pour la révision !";
  resultContainer.classList.remove('hidden');
});

// --- THÈMES & CARDS ---
function renderThemes() {
  themesGrid.innerHTML = '';

  themesData.forEach((theme, index) => {
    const isUnlocked = index < FREE_THEMES_LIMIT || isPro;

    const cardEl = document.createElement('div');
    cardEl.className = `theme-card ${isUnlocked ? '' : 'locked'}`;

    cardEl.innerHTML = `
      ${!isUnlocked ? '<span class="lock-icon">🔒</span>' : ''}
      <h4>${theme.title}</h4>
      <span class="count">${theme.cards.length} cartes</span>
    `;

    cardEl.addEventListener('click', () => {
      if (isUnlocked) {
        startSession(theme);
      } else {
        alert("🔒 Ce thème nécessite le Pass Étudiant.");
        openPricingTab();
      }
    });

    themesGrid.appendChild(cardEl);
  });
}

function startSession(theme) {
  // Mélange uniquement les cartes du thème sélectionné (sans mélange de matières)
  const shuffled = [...theme.cards].sort(() => 0.5 - Math.random());

  currentSessionQueue = shuffled.slice(0, SESSION_CARDS_COUNT);
  currentThemeTitle = theme.title;

  currentThemeTitleElem.innerText = currentThemeTitle;
  
  themesScreen.classList.add('hidden');
  completeScreen.classList.add('hidden');
  sessionScreen.classList.remove('hidden');

  displayCurrentCard();
}

function displayCurrentCard() {
  if (currentSessionQueue.length === 0) {
    sessionScreen.classList.add('hidden');
    completeScreen.classList.remove('hidden');
    return;
  }

  const currentCard = currentSessionQueue[0];
  cardFront.innerText = currentCard.q;
  cardBack.innerText = currentCard.a;

  flashcard.classList.remove('flipped');
  sessionProgress.innerText = `Restantes : ${currentSessionQueue.length}`;
}

flashcard.addEventListener('click', () => {
  flashcard.classList.toggle('flipped');
});

document.getElementById('btnPass').addEventListener('click', () => {
  if (currentSessionQueue.length === 0) return;
  currentSessionQueue.shift();
  displayCurrentCard();
});

document.getElementById('btnFail').addEventListener('click', () => {
  if (currentSessionQueue.length === 0) return;
  const failedCard = currentSessionQueue.shift();
  currentSessionQueue.push(failedCard);
  displayCurrentCard();
});

document.getElementById('btnBackToThemes').addEventListener('click', () => {
  sessionScreen.classList.add('hidden');
  themesScreen.classList.remove('hidden');
});

document.getElementById('btnFinishSession').addEventListener('click', () => {
  completeScreen.classList.add('hidden');
  themesScreen.classList.remove('hidden');
});

// --- PLANIFICATEUR ---
document.getElementById('btnCalculatePlan').addEventListener('click', () => {
  const examDateValue = document.getElementById('examDate').value;
  const totalCards = parseInt(document.getElementById('totalCardsInput').value, 10);

  if (!examDateValue) {
    alert("Veuillez sélectionner la date de votre examen.");
    return;
  }

  const today = new Date();
  const examDate = new Date(examDateValue);
  const diffTime = examDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const resultContainer = document.getElementById('plannerResult');
  const output = document.getElementById('plannerOutput');

  if (diffDays <= 0) {
    output.innerText = "La date de l'examen doit être ultérieure à aujourd'hui !";
  } else {
    const cardsPerDay = Math.ceil(totalCards / diffDays);
    output.innerHTML = `Il vous reste <strong>${diffDays} jours</strong> avant l'examen.<br><br>🎯 Vous devez réviser <strong>${cardsPerDay} cartes par jour</strong> pour être prêt le jour J !`;
  }

  resultContainer.classList.remove('hidden');
});

renderThemes();