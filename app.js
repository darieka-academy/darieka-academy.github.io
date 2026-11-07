// ======================================================
// ОБНОВЛЕНИЕ: ИЛЛЮСТРАЦИИ ГРИМУАРА И ЧИСТЫЕ ЭКРАНЫ
// ======================================================

// Изображения страниц: от первой до одиннадцатой.
const grimoirePageImages = [
    'gr.jfif',
    'gr1.jfif',
    'gr2.jfif',
    'gr3.jfif',
    'gr4.jfif',
    'gr5.jfif',
    'gr6.jfif',
    'gr7.jfif',
    'gr8.jfif',
    'gr9.jfif',
    'gr10.jfif'
];

// Отдельно сохраняем записи ученицы.
// Старый игровой прогресс при этом не затрагивается.
window.dariekaGrimoireNotes = (() => {
    try {
        return JSON.parse(
            localStorage.getItem('darieka_grimoire_notes') || '{}'
        );
    } catch (error) {
        return {};
    }
})();

function saveGrimoireNote(index, value) {
    window.dariekaGrimoireNotes[index] = value;

    localStorage.setItem(
        'darieka_grimoire_notes',
        JSON.stringify(window.dariekaGrimoireNotes)
    );
}


// ------------------------------------------------------
// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
// Теперь одновременно виден только один экран.
// ------------------------------------------------------

function switchScreen(hideId, showId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    if (showId) {
        const showScreen = document.getElementById(showId);

        if (showScreen) {
            showScreen.classList.add('active');
        }
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// ------------------------------------------------------
// ПОКАЗ ТЕКУЩЕЙ СТРАНИЦЫ ГРИМУАРА
// ------------------------------------------------------

function showGrimoireLesson() {
    const content = document.getElementById('grimoire-content');

    if (!content) return;

    const index = gameState.grimoireStep;
    const lesson = grimoireLessons[index];

    if (!lesson) return;

    const image = grimoirePageImages[index] || '';
    const savedNote = window.dariekaGrimoireNotes[index] || '';

    content.innerHTML = `
        <div class="grimoire-page">

            <p class="grimoire-small">
                СТРАНИЦА ${index + 1}
                ИЗ ${grimoireLessons.length}
            </p>

            <div class="grimoire-illustration-wrap">
                <img
                    class="grimoire-illustration"
                    src="${image}"
                    alt="Иллюстрация страницы ${index + 1}"
                    onerror="this.parentElement.style.display='none'"
                >
            </div>

            <h3>${lesson.title}</h3>

            <p class="grimoire-subtitle">
                ${lesson.subtitle}
            </p>

            <div class="grimoire-lesson-text">
                ${lesson.text}
            </div>

            <div class="grimoire-task">
                <strong>Твоё исследование:</strong>

                <p>${lesson.task}</p>

                <textarea
                    id="grimoire-student-note"
                    class="grimoire-note"
                    placeholder="Здесь можно записать свои наблюдения..."
                >${escapeHTML(savedNote)}</textarea>

                <p class="grimoire-small">
                    Твои записи сохраняются автоматически.
                    К ним можно вернуться позже.
                </p>
            </div>

            <div class="grimoire-question">
                <strong>Проверка знаний от Дариеки</strong>

                <p>${lesson.question}</p>

                ${lesson.answers.map((answer, answerIndex) => `
                    <button
                        class="grimoire-answer"
                        onclick="checkGrimoireAnswer(${answerIndex})"
                    >
                        ${answer}
                    </button>
                `).join('')}

                <div id="grimoire-feedback"></div>
            </div>

        </div>
    `;

    const noteInput = document.getElementById('grimoire-student-note');

    if (noteInput) {
        noteInput.addEventListener('input', function() {
            saveGrimoireNote(index, this.value);
        });
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// ------------------------------------------------------
// СОХРАНЕНИЕ ПРОЙДЕННОЙ СТРАНИЦЫ
// ------------------------------------------------------

function completeGrimoireLesson() {
    const index = gameState.grimoireStep;
    const lesson = grimoireLessons[index];

    if (!lesson) return;

    const noteInput = document.getElementById('grimoire-student-note');
    const note = noteInput ? noteInput.value.trim() : '';

    saveGrimoireNote(index, note);

    // Защита от повторного начисления опыта.
    if (gameState.grimoirePages.includes(index)) {
        gameState.grimoireStep++;
        saveState();
        updateGrimoireInterface();
        return;
    }

    gameState.grimoirePages.push(index);
    gameState.grimoireStep++;

    gameState.exp += 10;

    saveState();

    showGrimoireSavedPage(lesson, note);
}
