// ======================================
// СОСТОЯНИЕ ИГРЫ
// ======================================

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
    secretRewardClaimed: localStorage.getItem('darieka_secret_reward_claimed') === 'true'
};


// ======================================
// СОХРАНЕНИЕ
// ======================================

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

    localStorage.setItem('darieka_quiz_reward_claimed', gameState.quizRewardClaimed);
    localStorage.setItem('darieka_secret_reward_claimed', gameState.secretRewardClaimed);

    updateUI();
}


// ======================================
// ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
// ======================================

function updateUI() {
    const topBar = document.getElementById('topBar');

    if (gameState.name) {
        topBar.classList.add('active');

        document.getElementById('ui-name').innerText = gameState.name;
        document.getElementById('ui-exp').innerText = gameState.exp;

        const itemsCount =
            (gameState.hasPass ? 1 : 0) +
            (gameState.hasFern ? 1 : 0) +
            (gameState.hasKey ? 1 : 0) +
            (gameState.hasLetter ? 1 : 0) +
            (gameState.hasAtticCard ? 1 : 0);

        document.getElementById('ui-items').innerText = itemsCount;

        document.querySelectorAll('.displayName').forEach(element => {
            element.innerText = gameState.name;
        });

        // Наполнение колбочки: визуальная шкала на каждые 100 опыта
        const expFill = document.getElementById('expFill');

        if (expFill) {
            expFill.style.width = (gameState.exp % 100) + '%';
        }
    }

    // ОРАНЖЕРЕЯ

    const locGreen = document.getElementById('loc-greenhouse');

    if (locGreen) {
        if (gameState.lesson1Completed) {
            locGreen.classList.remove('locked');
            locGreen.classList.add('researched');

            document.getElementById('name-greenhouse').innerText = 'Оранжерея (изучена)';
            document.getElementById('icon-greenhouse').innerText = '🌿';
        } else if (gameState.greenhouseOpened) {
            locGreen.classList.remove('locked');
            locGreen.classList.add('unlocked');

            document.getElementById('name-greenhouse').innerText = 'Оранжерея';
            document.getElementById('icon-greenhouse').innerText = '🌿';
        }
    }

    // БИБЛИОТЕКА

    const locLibrary = document.getElementById('loc-library');

    if (locLibrary && gameState.libraryOpened) {
        locLibrary.classList.remove('locked');
        locLibrary.classList.add('unlocked');

        document.getElementById('name-library').innerText = 'Библиотека';
        document.getElementById('icon-library').innerText = '📚';
    }

    // ЧЕРДАК

    const locAttic = document.getElementById('loc-attic');

    if (locAttic && gameState.hasPet) {
        locAttic.classList.remove('locked');
        locAttic.classList.add(gameState.hasAtticCard ? 'researched' : 'unlocked');

        document.getElementById('name-attic').innerText =
            gameState.hasAtticCard ? 'Чердак (исследован)' : 'Чердак хранительницы';

        document.getElementById('icon-attic').innerText = '⌂';
    }

    // КНОПКА ПРОДОЛЖЕНИЯ

    const btnStart = document.getElementById('btn-start-lesson');

    if (btnStart) {
        if (gameState.hasPet) {
            btnStart.innerText = 'Открыть Чердак хранительницы';
        } else if (gameState.hasLetter) {
            btnStart.innerText = 'Найти Моховичка';
        } else if (gameState.secretFound) {
            btnStart.innerText = 'Открыть Библиотеку';
        } else if (gameState.lesson1Completed) {
            btnStart.innerText = 'Найти следующую тайну';
        } else {
            btnStart.innerText = 'Продолжить обучение';
        }
    }

    // КНОПКА ПИТОМЦЕВ

    const petsButton = document.getElementById('btn-pets-map');

    if (petsButton) {
        petsButton.style.display = gameState.hasPet ? 'block' : 'none';
    }

    // КНОПКА ДИПЛОМА

    const diplomaButton = document.getElementById('btn-diploma-map');

    if (diplomaButton) {
        diplomaButton.style.display =
            gameState.chapter1BonusClaimed ? 'block' : 'none';
    }

    // ИМЯ ПИТОМЦА

    const petDisplayName = document.getElementById('pet-display-name');

    if (petDisplayName) {
        petDisplayName.innerText = gameState.petName || 'Моховичок';
    }

    const petCard = document.getElementById('pet-card');
    const noPetsMessage = document.getElementById('no-pets-message');

    if (petCard && noPetsMessage) {
        petCard.style.display = gameState.hasPet ? 'block' : 'none';
        noPetsMessage.style.display = gameState.hasPet ? 'none' : 'block';
    }

    // НАХОДКА НА ЧЕРДАКЕ

    const atticResult = document.getElementById('attic-card-result');
    const atticButton = document.getElementById('btn-attic-find');

    if (atticResult && atticButton) {
        atticResult.classList.toggle('hidden', !gameState.hasAtticCard);
        atticButton.style.display = gameState.hasAtticCard ? 'none' : 'block';
    }
}


// ======================================
// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
// ======================================

function switchScreen(hideId, showId) {
    if (hideId) {
        const hideScreen = document.getElementById(hideId);
        if (hideScreen) hideScreen.classList.remove('active');
    }

    if (showId) {
        const showScreen = document.getElementById(showId);
        if (showScreen) showScreen.classList.add('active');
    }

    window.scrollTo(0, 0);
}

function backToMap() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    document.getElementById('screen-map').classList.add('active');
    window.scrollTo(0, 0);
}


// ======================================
// ЗАПУСК ИГРЫ
// ======================================

window.onload = function() {
    // Если ученица получила питомца до обновления,
    // выдаём ей новый бонус Главы I только один раз.
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
};


// ======================================
// ШАГ 1. ИМЯ И ПРОПУСК
// ======================================

function saveName() {
    const name = document.getElementById('nameInput').value.trim();

    if (name === '') {
        alert('Пожалуйста, напиши имя!');
        return;
    }

    gameState.name = name;
    saveState();

    switchScreen('screen-gates', 'screen-card');
}

function addToCollection(item) {
    if (item === 'pass') {
        gameState.hasPass = true;
    }

    saveState();
    switchScreen('screen-card', 'screen-map');
}


// ======================================
// ШАГ 2. ОРАНЖЕРЕЯ
// ======================================

function startGreenhouse() {
    if (gameState.lesson1Completed) {
        alert('Ты уже прошла этот урок! Можешь полюбоваться находками.');
    } else if (gameState.greenhouseOpened) {
        switchScreen('screen-map', 'screen-lesson2');
    } else {
        alert('Сначала поговори с Дариекой!');
    }
}

function openDariekaMeeting() {
    if (gameState.hasPet) {
        openAttic();
        return;
    }

    if (gameState.hasLetter) {
        switchScreen('screen-map', 'screen-pet-meeting');
        return;
    }

    if (gameState.secretFound) {
        switchScreen('screen-map', 'screen-library-intro');
        return;
    }

    if (gameState.lesson1Completed) {
        switchScreen('screen-map', 'screen-secret');
        return;
    }

    if (gameState.greenhouseOpened) {
        switchScreen('screen-map', 'screen-lesson2');
    } else {
        switchScreen('screen-map', 'screen-meeting');
    }
}

function goToGreenhouseLesson() {
    gameState.greenhouseOpened = true;
    saveState();

    switchScreen('screen-meeting', 'screen-lesson2');
}

function showQuiz() {
    switchScreen('screen-lesson2', 'screen-quiz');
}

function checkAnswer(choice) {
    const feedback = document.getElementById('quizFeedback');

    if (choice === 2) {
        feedback.innerHTML =
            '<span style="color: green;">Прекрасно! Ты запомнила правило.</span>';

        if (!gameState.quizRewardClaimed) {
            gameState.exp += 15;
            gameState.quizRewardClaimed = true;
            saveState();
        }

        setTimeout(() => {
            switchScreen('screen-quiz', 'screen-reward2');
        }, 1000);

    } else {
        feedback.innerHTML =
            '<span style="color: #8c3a3a;">Не совсем! Незнакомые растения могут быть опасны.</span>';
    }
}

function finishLesson() {
    gameState.hasFern = true;
    gameState.lesson1Completed = true;

    saveState();

    switchScreen('screen-reward2', 'screen-map');
}


// ======================================
// ШАГ 3. ТАЙНА ОРАНЖЕРЕИ
// ======================================

function checkSecret() {
    const val = document.getElementById('secretInput').value.trim().toUpperCase();

    if (val === 'ЛИСТ') {
        if (!gameState.secretRewardClaimed) {
            gameState.exp += 10;
            gameState.secretRewardClaimed = true;
            saveState();
        }

        switchScreen('screen-secret', 'screen-secret-reward');

    } else {
        alert('Пока не сходится. Подсказка: 12 — это двенадцатая буква алфавита.');
    }
}

function finishSecret() {
    gameState.hasKey = true;
    gameState.secretFound = true;

    saveState();

    switchScreen('screen-secret-reward', 'screen-map');
}


// ======================================
// ШАГ 4. БИБЛИОТЕКА
// ======================================

function openLibraryIntro() {
    switchScreen('screen-library-intro', 'screen-library');
}

function openLibraryFromMap() {
    if (gameState.libraryOpened) {
        switchScreen('screen-map', 'screen-library');
    } else {
        alert('Сначала найди ключ и открой Библиотеку!');
    }
}

function openChest() {
    if (gameState.hasLetter) {
        switchScreen('screen-library', 'screen-letter-found');
        return;
    }

    gameState.hasLetter = true;
    gameState.libraryOpened = true;
    gameState.exp += 10;

    saveState();

    switchScreen('screen-library', 'screen-letter-found');
}

function continueToPet() {
    switchScreen('screen-letter-found', 'screen-pet-meeting');
}


// ======================================
// ШАГ 5. МОХОВИЧОК
// ======================================

function adoptPet() {
    const petNameInput = document.getElementById('petNameInput');

    const petName =
        petNameInput.value.trim() || 'Моховичок';

    if (!gameState.hasPet) {
        gameState.hasPet = true;
        gameState.petName = petName;
        gameState.exp += 20;
    }

    finishChapterOne();
}


// ======================================
// ФИНАЛ ГЛАВЫ I
// ======================================

function finishChapterOne() {
    if (!gameState.chapter1BonusClaimed) {
        gameState.exp += 50;
        gameState.chapter1BonusClaimed = true;
    }

    saveState();

    switchScreen('screen-pet-meeting', 'screen-chapter1-finale');
}

function openDiploma() {
    switchScreen('screen-map', 'screen-diploma');
}

function openPets() {
    switchScreen(null, 'screen-pets');
}


// ======================================
// ГЛАВА II. ЧЕРДАК ХРАНИТЕЛЬНИЦЫ
// ======================================

function openChapterTwo() {
    gameState.atticOpened = true;
    saveState();

    switchScreen('screen-chapter1-finale', 'screen-attic');
}

function openAttic() {
    if (!gameState.hasPet) {
        alert('Эта локация откроется после завершения Главы I.');
        return;
    }

    gameState.atticOpened = true;
    saveState();

    switchScreen(null, 'screen-attic');
}

function findAtticCard() {
    if (gameState.hasAtticCard) {
        return;
    }

    gameState.hasAtticCard = true;
    gameState.exp += 10;

    saveState();

    document.getElementById('attic-card-result').classList.remove('hidden');
    document.getElementById('btn-attic-find').style.display = 'none';
}


// ======================================
// КОЛЛЕКЦИЯ
// ======================================

function openCollection() {
    const grid = document.getElementById('collection-grid');

    grid.innerHTML = '';

    if (gameState.hasPass) {
        grid.innerHTML += `
            <div class="collectible-card">
                <h3>Пропуск</h3>
                <p>Твой первый артефакт академии.</p>
            </div>
        `;
    }

    if (gameState.hasFern) {
        grid.innerHTML += `
            <div class="collectible-card">
                <h3>Папоротник</h3>
                <p>Растение из оранжереи.</p>
            </div>
        `;
    }

    if (gameState.hasKey) {
        grid.innerHTML += `
            <div class="collectible-card">
                <h3>Старый ключ</h3>
                <p>Артефакт, который помог открыть Библиотеку.</p>
            </div>
        `;
    }

    if (gameState.hasLetter) {
        grid.innerHTML += `
            <div class="collectible-card">
                <h3>Письмо из архива</h3>
                <p>Старинное послание из библиотечного сундука.</p>
            </div>
        `;
    }

    if (gameState.hasAtticCard) {
        grid.innerHTML += `
            <div class="collectible-card">
                <h3>Медный колокольчик</h3>
                <p>Первая находка на Чердаке хранительницы.</p>
            </div>
        `;
    }

    if (grid.innerHTML === '') {
        grid.innerHTML = '<p class="text-center">Корзинка пока пуста. Твои находки появятся здесь.</p>';
    }

    switchScreen(null, 'screen-collection');
}
