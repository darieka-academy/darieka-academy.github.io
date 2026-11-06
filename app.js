// Состояние игры
let gameState = {
    name: localStorage.getItem('darieka_student_name') || '',
    hasPass: localStorage.getItem('darieka_has_pass') === 'true',
    hasFern: localStorage.getItem('darieka_has_fern') === 'true',
    hasKey: localStorage.getItem('darieka_has_key') === 'true',
    exp: parseInt(localStorage.getItem('darieka_exp')) || 0,
    greenhouseOpened: localStorage.getItem('darieka_greenhouse_opened') === 'true',
    lesson1Completed: localStorage.getItem('darieka_lesson1_completed') === 'true',
    secretFound: localStorage.getItem('darieka_secret_found') === 'true'
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
    updateUI();
}

function updateUI() {
    if (gameState.name) {
        document.getElementById('topBar').classList.add('active');
        document.getElementById('ui-name').innerText = gameState.name;
        document.getElementById('ui-exp').innerText = '⭐ ' + gameState.exp;
        
        let itemsCount = (gameState.hasPass?1:0) + (gameState.hasFern?1:0) + (gameState.hasKey?1:0);
        document.getElementById('ui-items').innerText = '🎒 ' + itemsCount;
        
        document.querySelectorAll('.displayName').forEach(el => el.innerText = gameState.name);
    }

    // Карта
    const locGreen = document.getElementById('loc-greenhouse');
    if(locGreen) {
        if (gameState.lesson1Completed) {
            locGreen.classList.remove('locked'); locGreen.classList.add('researched');
            document.getElementById('name-greenhouse').innerText = "Оранжерея (Изучена)"; 
            document.getElementById('icon-greenhouse').innerText = "🌿";
        } else if (gameState.greenhouseOpened) {
            locGreen.classList.remove('locked'); locGreen.classList.add('unlocked');
            document.getElementById('name-greenhouse').innerText = "Оранжерея"; 
            document.getElementById('icon-greenhouse').innerText = "🌿";
        }
    }

    const btnStart = document.getElementById('btn-start-lesson');
    if(btnStart) {
        if (gameState.secretFound) {
            btnStart.innerText = "📖 Уроки на сегодня завершены";
            btnStart.classList.add('btn-disabled');
        } else if (gameState.lesson1Completed) {
            btnStart.innerText = "🔍 Найти следующую тайну";
        }
    }
}

function switchScreen(hideId, showId) {
    if (hideId) document.getElementById(hideId).classList.remove('active');
    if (showId) document.getElementById(showId).classList.add('active');
    window.scrollTo(0, 0);
}

window.onload = function() {
    updateUI();
    if (gameState.name && gameState.hasPass) {
        switchScreen('screen-gates', 'screen-map');
    } else if (gameState.name) {
        switchScreen('screen-gates', 'screen-card');
    }
};

// --- Шаг 1 ---
function saveName() {
    const name = document.getElementById('nameInput').value.trim();
    if (name === "") { alert("Пожалуйста, напиши имя!"); return; }
    gameState.name = name;
    saveState();
    switchScreen('screen-gates', 'screen-card');
}
function addToCollection(item) {
    if (item === 'pass') gameState.hasPass = true;
    saveState();
    switchScreen('screen-card', 'screen-map');
}

// --- Шаг 2 ---
function startGreenhouse() {
    if (gameState.lesson1Completed) alert('Ты уже прошла этот урок! Можешь полюбоваться цветами.');
    else if (gameState.greenhouseOpened) switchScreen('screen-map', 'screen-lesson2');
    else alert('Сначала поговори с Дариекой (кнопка "Продолжить обучение")!');
}
function openDariekaMeeting() {
    if (gameState.secretFound) { alert('На сегодня приключений достаточно!'); return; }
    if (!gameState.lesson1Completed) {
        if (gameState.greenhouseOpened) switchScreen('screen-map', 'screen-lesson2');
        else switchScreen('screen-map', 'screen-meeting');
    } else {
        switchScreen('screen-map', 'screen-secret'); // Ведем на поиск секрета
    }
}
function goToGreenhouseLesson() {
    gameState.greenhouseOpened = true; saveState();
    switchScreen('screen-meeting', 'screen-lesson2');
}
function showQuiz() { switchScreen('screen-lesson2', 'screen-quiz'); }
function checkAnswer(choice) {
    const feedback = document.getElementById('quizFeedback');
    if (choice === 2) {
        feedback.innerHTML = '<span style="color: green;">Прекрасно! Ты запомнила правило.</span>';
        if (!gameState.lesson1Completed) { gameState.exp += 15; saveState(); }
        setTimeout(() => { switchScreen('screen-quiz', 'screen-reward2'); }, 1500);
    } else {
        feedback.innerHTML = '<span style="color: #8c3a3a;">Не совсем! Незнакомые растения могут быть опасны.</span>';
    }
}
function finishLesson() {
    gameState.hasFern = true; gameState.lesson1Completed = true;
    saveState(); switchScreen('screen-reward2', 'screen-map');
}

// --- Шаг 3 ---
function checkSecret() {
    const val = document.getElementById('secretInput').value.trim().toUpperCase();
    if (val === 'ЛИСТ') {
        gameState.exp += 10; 
        saveState();
        switchScreen('screen-secret', 'screen-secret-reward');
    } else {
        alert('Пока не сходится. Подсказка: 12 — это двенадцатая буква алфавита.');
    }
}
function finishSecret() {
    gameState.hasKey = true; gameState.secretFound = true;
    saveState(); switchScreen('screen-secret-reward', 'screen-map');
}

// --- Коллекция ---
function openCollection() {
    const grid = document.getElementById('collection-grid');
    grid.innerHTML = ''; // Очищаем
    
    if (gameState.hasPass) grid.innerHTML += `<div class="collectible-card" style="padding:10px;"><h3 style="font-size:16px;">Пропуск</h3><p style="font-size:12px;">Твой первый артефакт.</p></div>`;
    if (gameState.hasFern) grid.innerHTML += `<div class="collectible-card" style="padding:10px;"><h3 style="font-size:16px;">Папоротник</h3><p style="font-size:12px;">Растение из оранжереи.</p></div>`;
    if (gameState.hasKey) grid.innerHTML += `<div class="collectible-card" style="padding:10px;"><h3 style="font-size:16px;">Ключ</h3><p style="font-size:12px;">Открывает тайны.</p></div>`;
    
    if (grid.innerHTML === '') grid.innerHTML = '<p class="text-center">Твой рюкзак пока пуст.</p>';
    
    switchScreen('screen-map', 'screen-collection');
}
