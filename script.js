// --- BASE DE DONNÉES DE DÉMONSTRATION (25 Thèmes x 100 Questions) ---
const THEMES_COUNT = 25;
const FREE_THEMES_LIMIT = 5;
const SESSION_CARDS_COUNT = 20;

// Génération de 25 thèmes avec 100 questions chacun
const themesData = [];

const themeNames = [
  "Histoire - Révolution", "Maths - Dérivées & Intégrales", "Physique - Mécanique", 
  "Philosophie - La Conscience", "SV - Génétique & ADN", "Chimie - Solutions & Moles",
  "Anglais - Vocabulaire Avancé", "Géographie - Mondialisation", "Droit - Droit Constitutionnel",
  "Économie - Microéconomie", "Informatique - Algorithmique", "Espagnol - Grammaire",
  "Littérature - Le Théâtre", "Histoire - Guerre Froide", "Biologie - Système Immunitaire",
  "Maths - Probabilités", "Physique - Optique", "Philosophie - La Justice",
  "SVT - Tectonique des Plaques", "Économie - Macroéconomie", "Droit - Droit Civil",
  "Chimie - Thermo-chimie", "Histoire - Moyen Âge", "Informatique - Réseaux", "Sociologie - Culture"
];

for (let i = 0; i < THEMES_COUNT; i++) {
  const cards = [];
  for (let j = 1; j <= 100; j++) {
    cards.push({
      id: `${i}-${j}`,
      q: `Question ${j} [${themeNames[i]}] : Intitulé de la question d'entraînement ?`,
      a: `Réponse à la question ${j} : Définition ou formule clé à retenir.`
    });
  }

  themesData.push({
    id: i,
    title: themeNames[i],
    isFree: i < FREE_THEMES_LIMIT,
    cardsCount: 100,
    cards: cards
  });
}

// --- ÉTATS DE LA SESSION ACTUELLE ---
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

// --- NAVIGATION DANS L'APPLICATION (BOTTOM NAV) ---
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

// --- GÉNÉRATION DE LA GRILLE DES THÈMES ---
function renderThemes() {
  themesGrid.innerHTML = '';

  themesData.forEach(theme => {
    const cardEl = document.createElement('div');
    cardEl.className = `theme-card ${theme.isFree ? '' : 'locked'}`;

    cardEl.innerHTML = `
      ${!theme.isFree ? '<span class="lock-icon">🔒</span>' : ''}
      <h4>${theme.title}</h4>
      <span class="count">100 cartes</span>
    `;

    cardEl.addEventListener('click', () => {
      if (theme.isFree) {
        startSession(theme);
      } else {
        alert("🔒 Ce thème est réservé aux membres Pass Étudiant.");
        openPricingTab();
      }
    });

    themesGrid.appendChild(cardEl);
  });
}

// --- ALGORITHME DE SESSION DE RÉVISION ---
function startSession(theme) {
  // Sélection aléatoire de 20 cartes parmi les 100 du thème
  const shuffled = [...theme.cards].sort(() => 0.5 - Math.random());
  currentSessionQueue = shuffled.slice(0, SESSION_CARDS_COUNT);
  currentThemeTitle = theme.title;

  currentThemeTitleElem.innerText = currentThemeTitle;
  
  // Afficher l'écran de session
  themesScreen.classList.add('hidden');
  completeScreen.classList.add('hidden');
  sessionScreen.classList.remove('hidden');

  displayCurrentCard();
}

function displayCurrentCard() {
  if (currentSessionQueue.length === 0) {
    // Session terminée
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

// Flip carte au clic
flashcard.addEventListener('click', () => {
  flashcard.classList.toggle('flipped');
});

// --- BOUTONS D'ACTION SRS ---

// Bouton Vert : ACQUIS (Supprime la carte de la session)
document.getElementById('btnPass').addEventListener('click', () => {
  if (currentSessionQueue.length === 0) return;
  
  // Retire la carte actuelle
  currentSessionQueue.shift();
  displayCurrentCard();
});

// Bouton Rouge : NON ACQUIS (Met la carte à la suite des questions restantes)
document.getElementById('btnFail').addEventListener('click', () => {
  if (currentSessionQueue.length === 0) return;

  // Retire la carte du début et la réinsère à la fin du tableau
  const failedCard = currentSessionQueue.shift();
  currentSessionQueue.push(failedCard);

  displayCurrentCard();
});

// Retour aux thèmes
document.getElementById('btnBackToThemes').addEventListener('click', () => {
  sessionScreen.classList.add('hidden');
  themesScreen.classList.remove('hidden');
});

document.getElementById('btnFinishSession').addEventListener('click', () => {
  completeScreen.classList.add('hidden');
  themesScreen.classList.remove('hidden');
});

// --- CALCULATEUR D'EXAMENS ---
document.getElementById('examDate').addEventListener('change', (e) => {
  const dateInput = e.target.value;
  if (!dateInput) return;

  const examDate = new Date(dateInput);
  const today = new Date();
  const diffDays = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

  const resultDiv = document.getElementById('planResult');

  if (diffDays <= 0) {
    resultDiv.innerText = "Sélectionnez une date future.";
    return;
  }

  const cardsPerDay = Math.ceil((25 * 100) / diffDays);
  resultDiv.innerHTML = `<strong>J-${diffDays} avant votre examen :</strong><br>Réviser environ <strong>${cardsPerDay} cartes/jour</strong> pour tout maîtriser à 100%.`;
});

// Init
renderThemes();