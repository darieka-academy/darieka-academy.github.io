function renderBookEntries(sectionIndex, targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  const course = COURSES[sectionIndex];

  container.innerHTML = `<div class="grimoire-section"><h2>${course.title}</h2>${course.lessons.map((lesson, i) => {
    const done = state.completed[sectionIndex].includes(i);
    const practice = state.practice[sectionIndex][String(i)] || '';

    return `<article class="grimoire-entry ${done ? 'earned' : ''}">
      <span>${done ? `<i class="book-stamp stamp-${sectionIndex}-${i}">✧</i>` : '○'}</span>
      <div>
        <b>${esc(lesson.title)}</b>
        <small>${done ? `Урок пройден · Печать: ${esc(lesson.reward)}` : 'Страница пока ждёт своего часа'}</small>
        ${practice ? `<p class="book-practice"><b>Практическая запись:</b> ${esc(practice)}</p>` : ''}
      </div>
    </article>`;
  }).join('')}</div>`;
}

function openTravnik() {
  renderBookEntries(0, 'travnikContent');
  document.getElementById('travnikNotes').value = state.travnikNotes || '';
  showScreen('travnik');
}

function openGrimoire() {
  renderBookEntries(1, 'grimoireContent');
  document.getElementById('grimoireNotes').value = state.grimoireNotes || '';
  showScreen('grimoire');
}

function saveTravnikNotes() {
  state.travnikNotes = document.getElementById('travnikNotes').value;
  persist();
  toast('Записи сохранены в Травнике');
}

function saveGrimoireNotes() {
  state.grimoireNotes = document.getElementById('grimoireNotes').value;
  state.notes = state.grimoireNotes;
  persist();
  toast('Записи сохранены в Гримуаре');
}

function savePractice() {
  const value = document.getElementById('practiceText').value.trim();
  state.practice[currentSection][String(currentLesson)] = value;
  persist();

  toast(value
    ? `Запись сохранена в ${bookForSection(currentSection) === 'travnik' ? 'Травник' : 'Гримуар'}`
    : 'Практическая запись очищена');
}

function openFamiliar() {
  if (!currentFamiliar()) return;
  showScreen('familiar-profile');
}

function renderFamiliarProfile() {
  const familiar = currentFamiliar();
  if (!familiar) return;

  document.getElementById('profileFamiliarName').textContent = state.familiarName;
  document.getElementById('profileFamiliarArt').innerHTML = familiarMarkup(familiar);
  document.getElementById('profileFamiliarDescription').textContent = familiar.description;
}

/* =========================================================
   Окна: смена имён и подтверждение сброса
   ========================================================= */

let modalConfig = null;
let modalReturnFocus = null;

function openModal(config) {
  const modal = document.getElementById('modal');
  modalConfig = config;
  modalReturnFocus = document.activeElement;

  document.getElementById('modalTitle').textContent = config.title;
  document.getElementById('modalText').textContent = config.text || '';

  const field = document.getElementById('modalField');
  const input = document.getElementById('modalInput');

  field.hidden = !config.label;

  if (config.label) {
    document.getElementById('modalLabel').textContent = config.label;
    input.maxLength = config.max || 24;
    input.value = config.value || '';
  }

  const checkRow = document.getElementById('modalCheckRow');
  const check = document.getElementById('modalCheck');

  checkRow.hidden = !config.checkText;
  check.checked = false;

  if (config.checkText) {
    document.getElementById('modalCheckText').textContent = config.checkText;
  }

  const ok = document.getElementById('modalOk');
  ok.textContent = config.okText || 'Сохранить';
  ok.classList.toggle('is-danger', !!config.danger);
  ok.disabled = !!config.checkText;

  document.getElementById('modalError').textContent = '';
  modal.hidden = false;
  document.body.classList.add('modal-open');

  if (config.label) {
    input.focus();
    input.select();
  } else {
    document.getElementById('modalCancel').focus();
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal || modal.hidden) return;

  modal.hidden = true;
  modalConfig = null;
  document.body.classList.remove('modal-open');

  if (modalReturnFocus && typeof modalReturnFocus.focus === 'function') {
    try {
      modalReturnFocus.focus();
    } catch (e) {}
  }
}

function submitModal() {
  if (!modalConfig) return;

  const ok = document.getElementById('modalOk');
  if (ok.disabled) return;

  const result = modalConfig.onSubmit(document.getElementById('modalInput').value);

  if (typeof result === 'string') {
    document.getElementById('modalError').textContent = result;
    return;
  }

  closeModal();
}

function initModal() {
  const modal = document.getElementById('modal');

  document.getElementById('modalCheck').addEventListener('change', function (e) {
    document.getElementById('modalOk').disabled = !e.target.checked;
  });

  document.getElementById('modalInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) {
      e.preventDefault();
      closeModal();
    }
  });

  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      const focusable = Array.from(modal.querySelectorAll('input, button'))
        .filter(el => !el.disabled && el.offsetParent !== null);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

function openRenameStudent() {
  openModal({
    title: 'Изменить имя',
    text: 'Так Дариека будет обращаться к тебе. Прогресс останется прежним.',
    label: 'Твоё имя',
    value: state.name,
    max: NAME_MAX,
    okText: 'Сохранить имя',
    onSubmit: function (value) {
      const name = cleanInput(value, NAME_MAX);
      if (!name) return 'Впиши имя — хотя бы одну букву.';

      state.name = name;
      persist();
      refreshNames();
      toast('Имя сохранено');

      return true;
    }
  });
}

function openRenameFamiliar() {
  if (!currentFamiliar()) return;

  openModal({
    title: 'Имя фамильяра',
    text: 'Фамильяр останется прежним, изменится только имя.',
    label: 'Новое имя фамильяра',
    value: state.familiarName,
    max: FAMILIAR_NAME_MAX,
    okText: 'Сохранить имя',
    onSubmit: function (value) {
      const name = cleanInput(value, FAMILIAR_NAME_MAX);
      if (!name) return 'Придумай имя — хотя бы одну букву.';

      state.familiarName = name;
      persist();
      refreshNames();
      toast('Имя фамильяра сохранено');

      return true;
    }
  });
}

/* =========================================================
   Начать сначала
   ========================================================= */

function openResetConfirm() {
  openModal({
    title: 'Начать сначала?',
    text: 'Будут стёрты пройденные уроки и квесты, опыт, полученные награды, практические задания и записи в обеих книгах. Твоё имя и фамильяр останутся. Отменить это действие после подтверждения нельзя.',
    checkText: 'Я понимаю, что прогресс обучения будет сброшен.',
    okText: 'Да, начать сначала',
    danger: true,
    onSubmit: function () {
      performReset();
      return true;
    }
  });
}

function performReset() {
  lsSet(STORE_BACKUP, JSON.stringify(state));

  const fresh = normalizeState({
    name: state.name,
    familiarId: state.familiarId,
    familiarName: state.familiarName,
    exp: 0,
    completed: { 0: [], 1: [] },
    notes: '',
    travnikNotes: '',
    grimoireNotes: '',
    practice: { 0: {}, 1: {} },
    firstVisit: true,
    ui: {
      mapPage: 0,
      mapSwiped: state.ui.mapSwiped
    }
  });

  state = fresh;
  currentSection = 0;
  currentLesson = 0;
  answered = false;
  persist();

  document.getElementById('resetDoneText').textContent =
    `${state.name}, ${state.familiarName} уже ждёт у порога. Ничего не потеряно, кроме спешки: начнём с первого урока и пойдём в твоём темпе.`;

  showScreen('reset-done');
}

/* =========================================================
   Карта из трёх страниц и перелистывание
   ========================================================= */

let mapPage = 0;
let suppressMapClickUntil = 0;
let autoScrollUntil = 0;
let settleTimer = 0;

function getPager() {
  return document.getElementById('mapPager');
}

function syncMapUI() {
  for (let i = 0; i < MAP_PAGES; i++) {
    const tab = document.getElementById('mapTab' + i);
    if (!tab) continue;

    tab.setAttribute('aria-selected', i === mapPage ? 'true' : 'false');
    tab.tabIndex = i === mapPage ? 0 : -1;
  }

  const prev = document.getElementById('mapPrev');
  const next = document.getElementById('mapNext');

  if (prev) prev.disabled = mapPage === 0;
  if (next) next.disabled = mapPage === MAP_PAGES - 1;

  const hint = document.getElementById('mapHint');
  if (hint) hint.hidden = !!state.ui.mapSwiped;
}

function setMapPage(index, smooth) {
  const pager = getPager();
  if (!pager) return;

  mapPage = Math.max(0, Math.min(MAP_PAGES - 1, index));

  if (smooth) {
    autoScrollUntil = Date.now() + 700;
  }

  if (pager.clientWidth > 0) {
    pager.scrollTo({
      left: mapPage * pager.clientWidth,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  syncMapUI();
}

function rememberMapPage() {
  if (state.ui.mapPage !== mapPage) {
    state.ui.mapPage = mapPage;
    persist();
  }
}

function markMapSwiped() {
  if (!state.ui.mapSwiped) {
    state.ui.mapSwiped = true;
    persist();
    syncMapUI();
  }
}

function goMapPage(index) {
  setMapPage(index, true);
  rememberMapPage();
  markMapSwiped();
}

function mapStep(delta) {
  goMapPage(mapPage + delta);
}

function restoreMapPage() {
  mapPage = [0, 1, 2].indexOf(state.ui.mapPage) !== -1
    ? state.ui.mapPage
    : 0;

  setMapPage(mapPage, false);
}

function onMapScroll() {
  const pager = getPager();
  if (!pager || !pager.clientWidth) return;

  if (Date.now() < autoScrollUntil) {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(
      onMapScroll,
      autoScrollUntil - Date.now() + 40
    );
    return;
  }

  const index = Math.max(
    0,
    Math.min(
      MAP_PAGES - 1,
      Math.round(pager.scrollLeft / pager.clientWidth)
    )
  );

  if (index !== mapPage) {
    mapPage = index;
    syncMapUI();
    rememberMapPage();
    markMapSwiped();
  }
}

function initMapPager() {
  const pager = getPager();
  if (!pager) return;

  let frame = 0;

  pager.addEventListener('scroll', function () {
    if (frame) return;

    frame = requestAnimationFrame(function () {
      frame = 0;
      onMapScroll();
    });
  }, { passive: true });

  let drag = null;

  pager.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;

    drag = {
      x: e.clientX,
      left: pager.scrollLeft,
      page: mapPage,
      moved: false,
      id: e.pointerId
    };
  });

  pager.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;

    const dx = e.clientX - drag.x;

    if (!drag.moved && Math.abs(dx) > 6) {
      drag.moved = true;
      pager.classList.add('dragging');

      try {
        pager.setPointerCapture(drag.id);
      } catch (err) {}
    }

    if (drag.moved) {
      pager.scrollLeft = drag.left - dx;
    }
  });

  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;

    const wasDrag = drag;
    drag = null;

    if (!wasDrag.moved) return;

    pager.classList.remove('dragging');

    try {
      pager.releasePointerCapture(wasDrag.id);
    } catch (err) {}

    suppressMapClickUntil = Date.now() + 120;

    const dx = e.clientX - wasDrag.x;
    const threshold = pager.clientWidth * 0.12;
    let target = wasDrag.page;

    if (dx < -threshold) {
      target = wasDrag.page + 1;
    } else if (dx > threshold) {
      target = wasDrag.page - 1;
    }

    goMapPage(target);
  }

  pager.addEventListener('pointerup', endDrag);
  pager.addEventListener('pointercancel', endDrag);

  pager.addEventListener('click', function (e) {
    if (Date.now() < suppressMapClickUntil) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  pager.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

    const home = document.getElementById('screen-home');
    const modal = document.getElementById('modal');

    if (!home || !home.classList.contains('active') || (modal && !modal.hidden)) {
      return;
    }

    const tag = (e.target && e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    e.preventDefault();
    mapStep(e.key === 'ArrowLeft' ? -1 : 1);
  });

  window.addEventListener('resize', function () {
    setMapPage(mapPage, false);
  });
}

function openProfile() {
  state.ui.mapPage = 2;
  showScreen('home');
}

(function init() {
  updateHeader();
  initMapPager();
  initModal();

  if (state.name && state.familiarId) {
    showScreen('home');
  } else if (state.name) {
    document.getElementById('studentName').value = state.name;
    renderFamiliarChoices();
    showScreen('familiar');
  } else {
    showScreen('welcome');
  }
})();
