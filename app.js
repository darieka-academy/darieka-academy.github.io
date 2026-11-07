// 1. СОСТОЯНИЕ ИГРЫ
let gameState = {
    name: localStorage.getItem('darieka_student_name') || '',
    hasPass: localStorage.getItem('darieka_has_pass') === 'true',
    hasFern: localStorage.getItem('darieka_has_fern') === 'true',
    hasKey: localStorage.getItem('darieka_has_key') === 'true',
    exp: parseInt(localStorage.getItem('darieka_exp'), 10) || 0,
    greenhouseOpened: localStorage.getItem('darieka_greenhouse_opened') === 'true',
    lesson1Completed: localStorage.getItem('darieka_lesson1_completed') === 'true',
    secretFound: localStorage.getItem('darieka_secret_found') === 'true',
    libraryOpened: localStorage.getItem('darieka_library_opened') === 'true',
    hasLetter: localStorage.getItem('darieka_has_letter') === 'true',
    hasPet: localStorage.getItem('darieka_has_pet') === 'true',
    petName: localStorage.getItem('darieka_pet_name') || '',
    chapter1BonusClaimed: localStorage.getItem('darieka_chapter1_bonus_claimed') === 'true',
    atticOpened: localStorage.getItem('darieka_attic_opened') === 'true',
    hasAtticCard: localStorage.getItem('darieka_has_attic_card') === 'true',
    quizRewardClaimed: localStorage.getItem('darieka_quiz_reward_claimed') === 'true',
    secretRewardClaimed: localStorage.getItem('darieka_secret_reward_claimed') === 'true',
    grimoireStarted: localStorage.getItem('darieka_grimoire_started') === 'true',
    grimoireStep: parseInt(localStorage.getItem('darieka_grimoire_step'), 10) || 0,
    grimoirePages: JSON.parse(localStorage.getItem('darieka_grimoire_pages') || '[]'),
    grimoireName: localStorage.getItem('darieka_grimoire_name') || 'Гримуар травницы'
};

function saveState() {
    localStorage.setItem('darieka_student_name', gameState.name);
    localStorage.setItem('darieka_has_pass', gameState.hasPass);
    localStorage.setItem('darieka_has_fern', gameState.hasFern);
    localStorage.setItem('darieka_has_key', gameState.hasKey);
    localStorage.setItem('darieka_exp', gameState.exp);
    localStorage.setItem('darieka_greenhouse_opened', gameState.greenhouseOpened);
    localStorage.setItem('darieka_lesson1_completed', gameState.lesson1Completed);
    localStorage.setItem('darieka_secret_found', gameState.secretFound);
    localStorage.setItem('darieka_library_opened', gameState.libraryOpened);
    localStorage.setItem('darieka_has_letter', gameState.hasLetter);
    localStorage.setItem('darieka_has_pet', gameState.hasPet);
    localStorage.setItem('darieka_pet_name', gameState.petName);
    localStorage.setItem('darieka_chapter1_bonus_claimed', gameState.chapter1BonusClaimed);
    localStorage.setItem('darieka_attic_opened', gameState.atticOpened);
    localStorage.setItem('darieka_has_attic_card', gameState.hasAtticCard);
    localStorage.setItem("darieka_quiz_reward_claimed", gameState.quizRewardClaimed);
    localStorage.setItem('darieka_secret_reward_claimed', gameState.secretRewardClaimed);
    localStorage.setItem('darieka_grimoire_started', gameState.grimoireStarted);
    localStorage.setItem('darieka_grimoire_step', gameState.grimoireStep);
    localStorage.setItem('darieka_grimoire_pages', JSON.stringify(gameState.grimoirePages));
    localStorage.setItem('darieka_grimoire_name', gameState.grimoireName);
    updateUI();
}

function updateUI() {
    const topBar = document.getElementById('topBar');
    if (topBar && gameState.name) topBar.classList.add('active');

    const uiName = document.getElementById('ui-name');
    const uiExp = document.getElementById('ui-exp');
    const uiItems = document.getElementById('ui-items');

    if (uiName) uiName.innerText = gameState.name;
    if (uiExp) uiExp.innerText = gameState.exp;

    document.querySelectorAll('.displayName').forEach(el => {
        el.innerText = gameState.name;
    });

    const itemsCount = (gameState.hasPass?1:0) + (gameState.hasFern?1:0) + (gameState.hasKey?1:0) + (gameState.hasLetter?1:0) + (gameState.hasAtticCard?1:0);
    if (uiItems) uiItems.innerText = itemsCount;

    const expFill = document.getElementById('expFill');
    if (expFill) expFill.style.width = (gameState.exp % 100) + '%';

    const greenhouse = document.getElementById('loc-greenhouse');
    if (greenhouse) {
        if (gameState.lesson1Completed) {
            greenhouse.classList.remove('locked'); greenhouse.classList.add('researched');
        } else if (gameState.greenhouseOpened) {
            greenhouse.classList.remove('locked'); greenhouse.classList.add('unlocked');
        }
    }

    const library = document.getElementById('loc-library');
    if (library && gameState.libraryOpened) {
        library.classList.remove('locked'); library.classList.add('unlocked');
    }

    const attic = document.getElementById('loc-attic');
    if (attic && gameState.hasPet) {
        attic.classList.remove('locked'); attic.classList.add('unlocked');
    }

    const btnStart = document.getElementById('btn-start-lesson');
    if (btnStart) {
        if (gameState.hasPet) btnStart.innerText = 'Открыть чердак хранительницы';
        else if (gameState.hasLetter) btnStart.innerText = 'Найти Моховичку';
        else if (gameState.secretFound) btnStart.innerText = 'Открыть Библиотеку';
        else if (gameState.lesson1Completed) btnStart.innerText = 'Найти следующую тайну';
        else btnStart.innerText = 'Продолжить обучение';
    }

    const petsButton = document.getElementById('btn-pets-map');
    if (petsButton) petsButton.style.display = gameState.hasPet ? 'block' : 'none';

    const petDisplayName = document.getElementById('pet-display-name');
    if (petDisplayName) petDisplayName.innerText = gameState.petName || 'Моховичок';

    const petCard = document.getElementById('pet-card');
    const noPetsMessage = document.getElementById('no-pets-message');
    if (petCard && noPetsMessage) {
        petCard.style.display = gameState.hasPet ? 'block' : 'none';
        noPetsMessage.style.display = gameState.hasPet ? 'none' : 'block';
    }

    const diplomaButton = document.getElementById('btn-diploma-map');
    if (diplomaButton) diplomaButton.style.display = gameState.chapter1BonusClaimed ? 'block' : 'none';

    const atticResult = document.getElementById('attic-card-result');
    const atticButton = document.getElementById('btn-attic-find');
    if (atticResult && atticButton) {
        atticResult.classList.toggle('hidden', !gameState.hasAtticCard);
        atticButton.style.display = gameState.hasAtticCard ? 'none' : 'block';
    }
}

function switchScreen(hideId, showId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    if (showId) {
        const showScreen = document.getElementById(showId);
        if (showScreen) showScreen.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function backToMap() {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    const map = document.getElementById('screen-map');
    if (map) map.classList.add('active');
    window.scrollTo(0, 0);
}

window.addEventListener('load', function() {
    if (gameState.hasPet && !gameState.chapter1BonusClaimed) {
        gameState.chapter1BonusClaimed = true;
        gameState.exp += 50;
        saveState();
    }
    updateUI();

    if (gameState.name && gameState.hasPass) {
        switchScreen('screen-gates', 'screen-map');
    } else if (gameState.name) {
        switchScreen('screen-gates', 'screen-card');
    }
});

function saveName() {
    const input = document.getElementById('nameInput');
    if (!input) return;
    const name = input.value.trim();
    if (!name) { alert('Пожалуйста, напишите имя!'); return; }
    gameState.name = name;
    saveState();
    switchScreen('screen-gates', 'screen-card');
}

function addToCollection(item) {
    if (item === 'pass') gameState.hasPass = true;
    saveState();
    switchScreen('screen-card', 'screen-map');
}

function startGreenhouse() {
    if (gameState.lesson1Completed) alert('Ты уже прошла этот урок! Можешь полюбоваться находками.');
    else if (gameState.greenhouseOpened) switchScreen('screen-map', 'screen-lesson2');
    else alert('Сначала поговори с Дариекой!');
}

function openDariekaMeeting() {
    if (gameState.hasPet) { openAttic(); return; }
    if (gameState.hasLetter) { switchScreen('screen-map', 'screen-pet-meeting'); return; }
    if (gameState.secretFound) { switchScreen('screen-map', 'screen-library-intro'); return; }
    if (gameState.lesson1Completed) { switchScreen('screen-map', 'screen-secret'); return; }
    if (gameState.greenhouseOpened) switchScreen('screen-map', 'screen-lesson2');
    else switchScreen('screen-map', 'screen-meeting');
}

function goToGreenhouseLesson() { gameState.greenhouseOpened = true; saveState(); switchScreen('screen-meeting', 'screen-lesson2'); }
function showQuiz() { switchScreen('screen-lesson2', 'screen-quiz'); }

function checkAnswer(choice) {
    const feedback = document.getElementById('quizFeedback');
    if (!feedback) return;
    if (choice === 2) {
        feedback.innerHTML = '<span style="color:green;">Прекрасно! Ты запомнила правило.</span>';
        if (!gameState.quizRewardClaimed) { gameState.exp += 15; gameState.quizRewardClaimed = true; saveState(); }
        setTimeout(() => { switchScreen('screen-quiz', 'screen-reward2'); }, 900);
    } else {
        feedback.innerHTML = '<span style="color:#8c3a3a;">Не совсем! Незнакомые растения могут быть опасны.</span>';
    }
}

function finishLesson() { gameState.hasFern = true; gameState.lesson1Completed = true; saveState(); switchScreen('screen-reward2', 'screen-map'); }

function checkSecret() {
    const input = document.getElementById('secretInput');
    if (!input) return;
    const value = input.value.trim().toUpperCase();
    if (value === 'ЛИСТ') {
        if (!gameState.secretRewardClaimed) { gameState.exp += 10; gameState.secretRewardClaimed = true; saveState(); }
        switchScreen('screen-secret', 'screen-secret-reward');
    } else {
        alert('Пока не сходится. Подсказка: 12 — это двенадцатая буква алфавита.');
    }
}

function finishSecret() { gameState.hasKey = true; gameState.secretFound = true; saveState(); switchScreen('screen-secret-reward', 'screen-map'); }
function openLibraryIntro() { switchScreen('screen-library-intro', 'screen-library'); }
function openLibraryFromMap() { if (gameState.libraryOpened) switchScreen('screen-map', 'screen-library'); else alert('Сначала найди ключ и открой Библиотеку!'); }

function openChest() {
    if (gameState.hasLetter) { switchScreen('screen-library', 'screen-letter-found'); return; }
    gameState.hasLetter = true; gameState.libraryOpened = true; gameState.exp += 10; saveState();
    switchScreen('screen-library', 'screen-letter-found');
}

function continueToPet() { switchScreen('screen-letter-found', 'screen-pet-meeting'); }

function adoptPet() {
    const input = document.getElementById('petNameInput');
    const petName = input && input.value.trim() ? input.value.trim() : 'Моховичок';
    if (!gameState.hasPet) { gameState.hasPet = true; gameState.petName = petName; gameState.exp += 20; }
    finishChapterOne();
}

function finishChapterOne() {
    if (!gameState.chapter1BonusClaimed) { gameState.exp += 50; gameState.chapter1BonusClaimed = true; }
    saveState();
    switchScreen('screen-pet-meeting', 'screen-chapter1-finale');
}

function openDiploma() { switchScreen('screen-map', 'screen-diploma'); }
function openPets() { switchScreen(null, 'screen-pets'); }

function playChapterDoorAnimation(callback) {
    const overlay = document.createElement('div');
    overlay.id = 'chapter-door-overlay';
    overlay.innerHTML = `
        <div class="chapter-door-scene">
            <div class="chapter-door-light"></div>
            <div class="chapter-door">
                <div class="chapter-door-panel"></div>
                <div class="chapter-door-handle"></div>
            </div>
            <div class="chapter-door-title">
                <p>Школа травниц Дариеки</p>
                <h1>Глава II</h1>
                <h2>Чердак хранительницы</h2>
            </div>
        </div>
    `;
    const style = document.createElement('style');
    style.id = 'chapter-door-style';
    style.textContent = `
        #chapter-door-overlay { position: fixed; inset: 0; z-index: 99999; background: #171b13; display: flex; justify-content: center; align-items: center; overflow: hidden; animation: doorFadeIn 1s ease; }
        .chapter-door-scene { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; perspective: 1000px; background: radial-gradient(ellipse at center, #57452b 0%, #22271c 65%, #11150f 100%); }
        .chapter-door-light { position: absolute; width: 260px; height: 400px; background: #e6b65c; opacity: 0; filter: blur(65px); animation: doorLight 4s ease forwards; }
        .chapter-door { position: absolute; width: 230px; height: 390px; background: linear-gradient(90deg, #35251a, #68482b, #302016); border: 9px solid #92734a; border-radius: 5px; box-shadow: 0 0 35px #090b08; transform-origin: left center; animation: doorOpen 3.5s ease-in-out forwards; animation-delay: 1.2s; }
        .chapter-door-panel { position: absolute; inset: 20px; border: 3px solid #b18b54; box-shadow: inset 0 0 20px #17120c; }
        .chapter-door-handle { position: absolute; right: 22px; top: 48%; width: 13px; height: 13px; background: #d4ac60; border-radius: 50%; }
        .chapter-door-title { position: absolute; z-index: 3; text-align: center; color: #f2dfb7; opacity: 0; width: 90%; text-shadow: 0 2px 10px #000; animation: chapterTitle 2s ease forwards; animation-delay: 3.5s; }
        .chapter-door-title p { letter-spacing: 3px; text-transform: uppercase; font-size: 12px; }
        .chapter-door-title h1 { font-family: Georgia, serif; font-size: 42px; margin: 12px 0; }
        .chapter-door-title h2 { font-family: Georgia, serif; font-size: 24px; font-weight: normal; }
        @keyframes doorOpen { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(-105deg); } }
        @keyframes doorLight { 0% { opacity: 0; transform: scale(.5); } 70% { opacity: .75; transform: scale(1.3); } 100% { opacity: .45; transform: scale(1.5); } }
        @keyframes chapterTitle { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes doorFadeIn { from { opacity: 0; } to { opacity: 1; } }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    const audio = new Audio('door_creak_slow.mp3');
    audio.volume = 0.65;
    audio.play().catch(() => {});
    setTimeout(() => { overlay.remove(); style.remove(); if (callback) callback(); }, 6500);
}

function openChapterTwo() {
    gameState.atticOpened = true; saveState();
    playChapterDoorAnimation(() => { switchScreen('screen-chapter1-finale', 'screen-attic'); createGrimoireInterface(); });
}

function openAttic() {
    if (!gameState.hasPet) { alert('Эта локация откроется после завершения Главы I.'); return; }
    gameState.atticOpened = true; saveState(); switchScreen(null, 'screen-attic'); createGrimoireInterface();
}

function findAtticCard() {
    if (gameState.hasAtticCard) return;
    gameState.hasAtticCard = true; gameState.exp += 10; saveState();
    const result = document.getElementById('attic-card-result');
    const button = document.getElementById('btn-attic-find');
    if (result) result.classList.remove('hidden');
    if (button) button.style.display = 'none';
}

const grimoireLessons = [
    {
        title: 'Пустая книга хранительницы', subtitle: 'Начало твоего гримуара',
        text: `<p>На старом чердаке ты находишь большую книгу в темно-зеленом переплете.</p><p>Ее страницы пожелтели от времени. На первой странице виден едва заметный отпечаток листа.</p><p><strong>Дариэка:</strong> «Каждая хранительница вела свою книгу. В неё записывали открытия, наблюдения, рисунки и истории. Теперь у тебя будет своя».</p><p>Гримуар — это не просто книга заклинаний. Это личная энциклопедия исследовательницы.</p>`,
        task: 'Придумай название для своей книги.',
        question: 'Для чего хранительница ведет гримуар?',
        answers: ['Чтобы записывать наблюдения, знания и открытия', 'Чтобы хранить только красивые картинки', 'Чтобы забыть изученные растения'],
        correct: 0, reward: 'Первая страница гримуара', fact: 'Настоящие исследователи тоже ведут полевые дневники.'
    },
    {
        title: 'Тайный язык растений', subtitle: 'Из чего состоит растение',
        text: `<p>На следующей странице изображено незнакомое растение. От корней до верхушки оно разделено на несколько частей.</p><p>У большинства знакомых нам растений есть корень, стебель и листья. У многих также есть цветы, плоды и семена.</p><p><strong>Корень</strong> помогает растению закрепляться в почве и получать воду.</p><p><strong>Стебель</strong> поддерживает растение и проводит воду и питательные вещества.</p><p><strong>Листья</strong> участвуют в фотосинтезе.</p>`,
        task: 'Нарисуй растение и подпиши корень, стебель и листья.',
        question: 'Какая часть растения обычно поглощает воду из почвы?',
        answers: ['Цветок', 'Корень', 'Лист'],
        correct: 1, reward: 'Знание строения растения', fact: 'У мхов нет настоящих корней.'
    },
    {
        title: 'Тайна листа', subtitle: 'Форма, края и прожилки',
        text: `<p>Дариэка кладёт перед тобой несколько изображений листьев.</p><p>Листья различаются по форме, краям, размеру и расположению прожилок.</p><p>Прожилки помогают распределять воду и вещества внутри листа.</p>`,
        task: 'Посмотри на комнатное растение с разрешения взрослого. Опиши его листья.',
        question: 'Что можно рассмотреть, сравнивая листья?',
        answers: ['Только их запах', 'Форму, края и прожилки', 'Только высоту дерева'],
        correct: 1, reward: 'Страница наблюдений за листьями', fact: 'У некоторых растений листья имеют необычную форму.'
    },
    {
        title: 'Подземные тайны', subtitle: 'Корни растений',
        text: `<p>На старой иллюстрации изображено растение, а под землей — целый мир тонких корешков.</p><p>Корни удерживают растение в почве и поглощают воду с растворёнными минеральными веществами.</p>`,
        task: 'Нарисуй подземную часть растения.',
        question: 'Какая одна из главных задач корней?',
        answers: ['Поглощать воду и удерживать растение', 'Привлекать бабочек ярким цветом', 'Создавать семена'],
        correct: 0, reward: 'Страница «Подземный мир»', fact: 'Корни некоторых деревьев могут распространяться далеко за пределы кроны.'
    },
    {
        title: 'Секрет зеленого стебля', subtitle: 'Опора и движение воды',
        text: `<p>Стебель кажется простой частью растения, но внутри него происходит постоянное движение.</p><p>По специальным проводящим тканям вода поднимается от корней к листьям.</p>`,
        task: 'Нарисуй два растения: одно с мягким стеблем, другое — с одревесневшим.',
        question: 'Какую функцию выполняет стебель?',
        answers: ['Только украшает растение', 'Поддерживает части растения и участвует в переносе воды', 'Заменяет корни у всех растений'],
        correct: 1, reward: 'Страница «Страж стебля»', fact: 'Ствол дерева — это тоже стебель.'
    },
    {
        title: 'Цветочная мастерская', subtitle: 'Как устроен цветок',
        text: `<p>На этой странице гримуара нарисован цветок с раскрытыми лепестками.</p><p>Цветок — орган размножения многих растений.</p>`,
        task: 'Нарисуй цветок и попробуй обозначить лепестки, тычинки и пестик.',
        question: 'Какую важную роль выполняет цветок?',
        answers: ['Участвует в размножении растения', 'Всегда защищает корни от холода', 'Поглощает воду из почвы'],
        correct: 0, reward: 'Страница «Цветочная мастерская»', fact: 'Некоторые цветы опыляются не насекомыми, а ветром.'
    },
    {
        title: 'Тайна семени', subtitle: 'Начало новой жизни',
        text: `<p>В маленьком семени скрыта будущая жизнь растения.</p><p>Внутри семени находится зародыш — зачаток будущего растения.</p>`,
        task: 'Придумай и нарисуй путешествие одного семечка.',
        question: 'Что находится внутри семени?',
        answers: ['Готовый взрослый цветок', 'Зародыш будущего растения', 'Только воздух'],
        correct: 1, reward: 'Страница «Путешествие семени»', fact: 'Семена одуванчика могут переноситься ветром на большие расстояния.'
    },
    {
        title: 'Гербарная мастерская', subtitle: 'Искусство наблюдения',
        text: `<p>Дариэка открывает ящик с рисунками растений.</p><p>В нашей академии можно вести безопасный бумажный гербарий.</p>`,
        task: 'Создай свою первую ботаническую страницу.',
        question: 'Что можно использовать для безопасной страницы гербария?',
        answers: ['Только неизвестные растения, собранные в лесу', 'Рисунок, фотографию и собственные наблюдения', 'Попробовать растение на вкус'],
        correct: 1, reward: 'Первая ботаническая страница', fact: 'В музеях хранятся гербарии, которым сотни лет.'
    },
    {
        title: 'Легенды зеленого леса', subtitle: 'Реальные растения и вымышленные истории',
        text: `<p>На чердаке ты находишь книгу старых преданий.</p><p>В нашей академии существуют и собственные вымышленные легенды о волшебных травах.</p>`,
        task: 'Придумай легенду о вымышленном лесном растении.',
        question: 'Что важно помнить о магических свойствах растений из сказок?',
        answers: ['Любая легенда является научным фактом', 'Сказочные свойства — часть вымышленной истории', 'Любое растение можно использовать как зелье'],
        correct: 1, reward: 'Страница лесных преданий', fact: 'У многих реальных растений есть народные названия.'
    },
    {
        title: 'Испытание травницы', subtitle: 'Собери знания воедино',
        text: `<p>Дариека раскладывает перед тобой карточки с изображениями корня, стебля, листа, цветка и семени.</p>`,
        task: 'Создай схему растения целиком. Подпиши его части.',
        question: 'Почему части растения нельзя рассматривать совершенно отдельно друг от друга?',
        answers: ['Потому что они работают вместе и связаны между собой', 'Потому что все части выполняют одну и ту же функцию', 'Потому что у растения нет отдельных частей'],
        correct: 0, reward: 'Знак начинающей травницы', fact: 'Даже небольшой лист зависит от воды, которую получают корни.'
    },
    {
        title: 'Послание Дариеки', subtitle: 'Твои первые открытия',
        text: `<p>На последней странице первого раздела появляется золотистая печать.</p><p><strong>Дариека:</strong> «Ты научилась замечать то, мимо чего многие проходят».</p>`,
        task: 'Напиши короткое письмо самой себе: что тебе больше всего понравилось изучать?',
        question: 'Что делает личный гримуар ценным?',
        answers: ['Он хранит только награды', 'Он собирает знания, наблюдения и личные открытия ученицы', 'Его нельзя дополнять после первого урока'],
        correct: 1, reward: 'Завершение первого тома', fact: 'Настоящие научные дневники помогают сохранять наблюдения.'
    }
];

const grimoirePageImages = ['gr.jfif', 'gr1.jfif', 'gr2.jfif', 'gr3.jfif', 'gr4.jfif', 'gr5.jfif', 'gr6.jfif', 'gr7.jfif', 'gr8.jfif', 'gr9.jfif', 'gr10.jfif'];

function getGrimoireNotes() {
    try { return JSON.parse(localStorage.getItem('darieka_grimoire_notes') || '{}'); } catch (error) { return {}; }
}
function saveGrimoireNote(index, value) {
    const notes = getGrimoireNotes();
    notes[index] = value;
    localStorage.setItem('darieka_grimoire_notes', JSON.stringify(notes));
}

function createGrimoireInterface() {
    const atticScreen = document.getElementById('screen-attic');
    if (!atticScreen) return;
    if (document.getElementById('grimoire-interface')) { updateGrimoireInterface(); return; }

    const style = document.createElement('style');
    style.id = 'grimoire-style';
    style.textContent = `
        .grimoire-panel { margin-top: 24px; padding: 18px; border: 1px solid #a58b58; border-radius: 10px; background: rgba(44, 53, 37, .96); color: #f1e5c9; }
        .grimoire-panel h2, .grimoire-panel h3 { font-family: Georgia, serif; color: #e6cb91; }
        .grimoire-progress { height: 9px; background: #1c251b; border-radius: 20px; overflow: hidden; margin: 12px 0; }
        .grimoire-progress-fill { height: 100%; width: 0; background: linear-gradient(90deg, #71875b, #d0ad65); transition: width .4s ease; }
        .grimoire-page { background: #eee2c5; color: #443726; border: 2px solid #b49a66; border-radius: 7px; padding: 18px; margin-top: 16px; line-height: 1.7; }
        .grimoire-page h3 { color: #4a5639; }
        .grimoire-task { background: #dcd0ae; padding: 14px; border-left: 4px solid #8b774b; margin-top: 16px; border-radius: 4px; }
        .grimoire-question { margin-top: 18px; padding: 14px; background: #e4d7b8; color: #443726; border-radius: 6px; }
        .grimoire-answer { display: block; width: 100%; padding: 12px; margin: 8px 0; border: 1px solid #8e805e; border-radius: 5px; background: #f2e8d2; color: #403626; text-align: left; cursor: pointer; font-size: 15px; }
        .grimoire-answer:hover { background: #d8c9a6; }
        .grimoire-note { width: 100%; min-height: 100px; padding: 12px; margin-top: 12px; border: 1px solid #a58b58; border-radius: 5px; background: #f5ebd6; color: #403626; font-family: Georgia, serif; font-size: 15px; box-sizing: border-box; }
        .grimoire-small { color: #d7c49c; font-size: 13px; }
        .grimoire-success { color: #42643b; font-weight: bold; margin-top: 12px; }
        .grimoire-reward { border: 1px solid #c4a35e; background: #eee0b9; color: #493b28; padding: 15px; border-radius: 6px; margin-top: 14px; }
        .grimoire-illustration-frame { width: 100%; margin: 0 auto 18px; padding: 7px; background: #d9c9a8; border: 2px solid #a58b58; border-radius: 5px; box-shadow: 0 4px 12px rgba(0,0,0,.22); }
        .grimoire-illustration { display: block; width: 100%; height: auto; max-height: 520px; object-fit: contain; border-radius: 3px; }
        .grimoire-page-counter { text-align: center; color: #766448; font-size: 11px; letter-spacing: 1px; margin-bottom: 10px; }
        .grimoire-page .grimoire-note { display: block; width: 100%; min-height: 115px; box-sizing: border-box; resize: vertical; }
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.id = 'grimoire-interface';
    panel.className = 'grimoire-panel';
    panel.innerHTML = `
        <h2>Книга хранительницы</h2>
        <p>Здесь будут храниться твои знания, рисунки, наблюдения и открытия.</p>
        <div class="grimoire-progress"><div id="grimoire-progress-fill" class="grimoire-progress-fill"></div></div>
        <p id="grimoire-progress-text" class="grimoire-small"></p>
        <div id="grimoire-content"></div>
    `;
    atticScreen.querySelector('.paper-card').appendChild(panel);
    updateGrimoireInterface();
}

function updateGrimoireInterface() {
    const content = document.getElementById('grimoire-content');
    if (!content) return;

    const total = grimoireLessons.length;
    const completed = gameState.grimoirePages.length;
    const progress = document.getElementById('grimoire-progress-fill');
    const progressText = document.getElementById('grimoire-progress-text');

    if (progress) progress.style.width = (completed / total * 100) + '%';
    if (progressText) progressText.innerText = 'Страниц открыто: ' + completed + ' из ' + total;

    if (!gameState.grimoireStarted) {
        content.innerHTML = `
            <div class="grimoire-page">
                <h3>Старая книга</h3>
                <p>На чердаке ты находишь книгу прежней хранительницы. Её страницы почти пусты.</p>
                <p>Возможно, именно тебе предстоит наполнить её знаниями.</p>
                <label for="grimoire-name">Название твоего гримуара:</label>
                <input id="grimoire-name" class="grimoire-note" type="text" value="${escapeHTML(gameState.grimoireName)}" maxlength="60">
                <button class="btn btn-gold" onclick="beginGrimoire()">Открыть первую страницу</button>
            </div>
        `;
        return;
    }

    if (gameState.grimoireStep >= total) {
        content.innerHTML = `
            <div class="grimoire-page
