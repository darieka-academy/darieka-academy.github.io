'use strict';

const ASSETS = {
  section1: 'bazik9.jfif',
  section2: 'potions-cover.jfif',
  familiars: [
    {
      id: 'cat',
      name: 'Чёрный кот',
      image: 'f1.jfif',
      video: 'f1video.mp4',
      description: 'Наблюдательный и независимый спутник. Он замечает то, что скрыто в тени, и любит устраиваться рядом с раскрытыми книгами.'
    },
    {
      id: 'rabbit',
      name: 'Лесной кролик',
      image: 'f2.jfif',
      video: 'f2video.mp4',
      description: 'Добрый и чуткий спутник. Он первым замечает тихие перемены в лесу и никогда не пропускает интересную тропинку.'
    },
    {
      id: 'fox',
      name: 'Лисёнок',
      image: 'f3.jfif',
      description: 'Любознательный и находчивый спутник. Он умеет находить необычные следы и обожает маленькие загадки.'
    },
    {
      id: 'woodland',
      name: 'Лесной хранитель',
      image: 'f4.jfif',
      description: 'Мудрый и спокойный спутник. Он хранит старые лесные истории и помогает не забывать о бережном отношении к природе.'
    }
  ]
};

const COURSES = [
  {
    title: 'Основы травологии',
    kicker: 'Раздел I · Пять уроков и пять квестов',
    description: 'Первый путь ученицы: научиться замечать растения, понимать их устройство и наблюдать за природой бережно и внимательно.',
    cover: ASSETS.section1,
    lessons: [
      {
        title: 'Знакомство с миром трав',
        subtitle: 'Глаз травницы',
        image: 'bazik1.jfif',
        questImage: 'potion-ingredients.jfif',
        body: '<p>Травология — это изучение растений, их особенностей, строения и связи с окружающей средой. Травница начинает не с волшебства, а с внимательного наблюдения.</p><p>Растения бывают травянистыми, кустарниками и деревьями. Одни растут на лугах, другие — в лесах, у воды или на болотах. У каждого вида свои особенности.</p><p>В сказках встречаются волшебные растения, но их свойства принадлежат вымышленному миру. Настоящие растения изучают по наблюдениям и научным сведениям.</p>',
        note: 'Дариека: «Первое умение травницы — смотреть внимательно и не спешить с выводами».',
        quest: 'На учебном столе перепутались карточки растений. Как поступит внимательная ученица?',
        question: 'Как правильнее всего изучать незнакомое растение?',
        answers: [
          'Попробовать лист на вкус',
          'Рассмотреть его издали, записать признаки и свериться с надёжным определителем',
          'Сорвать всё растение и унести домой'
        ],
        correct: 1,
        reward: 'Зоркий глаз'
      },
      {
        title: 'Из чего состоит растение',
        subtitle: 'Собери растение',
        image: 'gr3.jfif',
        questImage: 'gr4.jfif',
        body: '<p>У многих растений можно различить корень, стебель, листья, цветок, плод и семена. У разных видов строение может отличаться, но каждая часть выполняет свою роль.</p><p>Корни закрепляют растение и поглощают воду с растворёнными веществами. Стебель поддерживает надземные части и участвует в переносе воды. Листья у многих растений помогают улавливать свет и создавать питательные вещества.</p><p>Цветок участвует в размножении, а плод защищает семена и помогает им распространяться.</p>',
        note: 'Дариека: «Растение — не набор отдельных деталей. Все его части связаны между собой».',
        quest: 'Перед тобой схема растения. Нужно выбрать правильное описание его частей.',
        question: 'Какая часть растения обычно поглощает воду из почвы?',
        answers: ['Корень', 'Цветок', 'Плод'],
        correct: 0,
        reward: 'Хранительница корней'
      },
      {
        title: 'Где живут растения',
        subtitle: 'Найди свой уголок',
        image: 'bazik6.jfif',
        questImage: 'bazik1.jfif',
        body: '<p>Растения приспосабливаются к месту, где живут. В лесу света может быть меньше, на открытом лугу его много, а у водоёмов и на болотах особенно важна влажность.</p><p>На жизнь растения влияют свет, вода, температура, почва и соседство с другими организмами. Даже зимой растения ведут себя по-разному: одни сбрасывают листья, другие остаются зелёными, а многие травы пережидают холод под землёй или в виде семян.</p>',
        note: 'Дариека: «Чтобы понять растение, узнай, где его дом и какие условия ему нужны».',
        quest: 'Зимние карточки мест обитания ждут своих растений. Выбери подходящее условие.',
        question: 'Какое место чаще всего подходит влаголюбивым болотным растениям?',
        answers: [
          'Сухая песчаная дюна',
          'Переувлажнённая почва и заболоченное место',
          'Каменная вершина без почвы'
        ],
        correct: 1,
        reward: 'Следопыт'
      },
      {
        title: 'Искусство распознавания и гербарий',
        subtitle: 'Тайны старого гербария',
        image: 'bazik10.jfif',
        questImage: 'bazik5.jfif',
        body: '<p>Растения распознают по совокупности признаков: форме листьев, расположению листьев на стебле, цветкам, плодам и другим особенностям. Одного признака обычно недостаточно.</p><p>Гербарий — это научная коллекция высушенных и оформленных образцов растений. Для учебных наблюдений можно сделать бумажный гербарий из рисунков и фотографий, не срывая растения.</p><p>В хорошей карточке указывают название, дату наблюдения, место и заметные признаки. Неизвестные растения не трогают и не пробуют.</p>',
        note: 'Дариека: «Гербарий хранит не только образцы, но и историю наблюдений».',
        quest: 'В старом гербарии перепутались карточки. Что обязательно поможет сделать запись полезной?',
        question: 'Что стоит указать в ботанической карточке наблюдения?',
        answers: [
          'Только красивое прозвище',
          'Название или описание, дату, место и признаки растения',
          'Совет попробовать растение'
        ],
        correct: 1,
        reward: 'Знаток растений'
      },
      {
        title: 'Правила травницы',
        subtitle: 'Первый выход в лес',
        image: '3f049ffdde0411f1afa4c6b7a46b4fd1_5.jfif',
        questImage: '437ab298de0711f1b48d12724e65a986_3.jfif',
        body: '<p>Настоящая травница бережно относится к природе. Она не вытаптывает растения, не ломает ветви, не выкапывает корни и не собирает редкие или охраняемые виды.</p><p>Незнакомые растения нельзя пробовать на вкус или использовать для приготовления настоев. Даже знакомые растения могут быть опасны при неправильном применении. В Академии мы изучаем ботанику наблюдением, рисунками и проверенными источниками.</p><p>Зимой особенно важно не тревожить укрытые снегом растения и животных. Иногда лучший образец для гримуара — точный рисунок или фотография.</p>',
        note: 'Дариека: «Бережность — не отдельное правило. Это основа мастерства травницы».',
        quest: 'Во время зимней прогулки ты замечаешь редкое растение, выглядывающее из-под снега. Как поступить?',
        question: 'Что должна сделать ученица, встретив редкое или незнакомое растение?',
        answers: [
          'Выкопать его, чтобы рассмотреть дома',
          'Оставить на месте, не трогать и записать наблюдение',
          'Попробовать маленький кусочек'
        ],
        correct: 1,
        reward: 'Юная травница'
      }
    ]
  },
  {
    title: 'Искусство зелий и чар',
    kicker: 'Раздел II · Пять уроков и пять квестов',
    description: 'После знакомства с природой ученица открывает сказочное ремесло Академии: игровые рецепты, волшебные формулы и силу доброго слова.',
    cover: ASSETS.section2,
    lessons: [
      {
        title: 'Тайны волшебного котла',
        subtitle: 'Первое зелье',
        image: '44543a8dde0111f18e21860be368d33b_5.jfif',
        questImage: '9aff7228de0511f1af93b632ab106e2a_4.jfif',
        body: '<p>В мире Академии зелья — это сказочные составы, которые создаются по особым рецептам. У каждого рецепта есть замысел, символические ингредиенты и последовательность действий.</p><p>У зельевара есть котёл, ступка, деревянная ложка, мерные чаши и сосуды для хранения. Важно читать рецепт целиком и не менять порядок шагов наугад.</p><p>Все рецепты Академии вымышлены и предназначены только для игры и истории. Их нельзя пить, наносить на кожу или повторять с настоящими неизвестными растениями и веществами.</p>',
        note: 'Дариека: «Котёл любит не спешку, а внимание. Сначала прочти рецепт, потом приступай».',
        quest: 'На столе подготовлены символические ингредиенты для учебного зелья. Выбери, с чего начать.',
        question: 'Что зельевар должен сделать прежде всего?',
        answers: [
          'Смешать всё сразу',
          'Внимательно прочитать рецепт и подготовить нужные предметы',
          'Добавить случайный ингредиент'
        ],
        correct: 1,
        reward: 'Искра зельевара'
      },
      {
        title: 'Искусство приготовления зелий',
        subtitle: 'Аптекарская мастерская',
        image: '02e6c63fde0211f1bd040a013b9caca9_2.jfif',
        questImage: '5596a85dde0611f1a277165fbb8c93af_5.jfif',
        body: '<p>В сказочном ремесле важны последовательность, пропорции и аккуратность. Сначала готовят инструменты, затем отмеряют условные ингредиенты и выполняют шаги рецепта в указанном порядке.</p><p>У каждого зелья может быть свой цвет, узор пара и знак на этикетке. Эти признаки помогают различать игровые составы и не путать их в кладовой.</p><p>Помни: игровые рецепты не являются настоящими лечебными средствами. Нельзя заменять ими медицинскую помощь или готовить по ним реальные смеси.</p>',
        note: 'Дариека: «Хорошая мастерица умеет не только создать состав, но и подписать его, чтобы никто не перепутал».',
        quest: 'В кладовой стоят три закрытых флакона. Нужно выбрать верный порядок работы.',
        question: 'Что помогает не перепутать готовые игровые зелья?',
        answers: [
          'Оставить все флаконы без подписей',
          'Подписать каждый сосуд и хранить его отдельно',
          'Перелить все составы в одну бутылку'
        ],
        correct: 1,
        reward: 'Хозяйка аптекарской кладовой'
      },
      {
        title: 'Азбука заклинаний',
        subtitle: 'Первые чары',
        image: 'b19c0dedde0311f1bd14969b547feeaa_2.jfif',
        questImage: 'e94c8048de0611f1af93b632ab106e2a_4.jfif',
        body: '<p>Заклинание в мире Дариеки — это короткая вымышленная формула, которая помогает героине направить намерение на определённое действие. У формулы есть название, смысл и образный знак.</p><p>Заклинания Академии могут зажечь огонёк в фонаре, подсветить страницу или помочь найти потерянную вещь в сказочном сюжете. Они не обещают реального воздействия на мир.</p><p>У каждой формулы есть границы: магия не должна причинять вред, принуждать другого или нарушать его волю.</p>',
        note: 'Дариека: «Сильное заклинание начинается с ясной мысли и доброго намерения».',
        quest: 'В книге перепутались знаки к трём учебным чарам. Подбери правильный принцип.',
        question: 'Какое намерение подходит для заклинаний Академии?',
        answers: [
          'Помочь осветить тёмную страницу',
          'Заставить другого человека подчиниться',
          'Напугать и причинить вред'
        ],
        correct: 0,
        reward: 'Знаток первых чар'
      },
      {
        title: 'Сила заговорённого слова',
        subtitle: 'Слова силы',
        image: '3f049ffdde0411f1afa4c6b7a46b4fd1_5.jfif',
        questImage: '437ab298de0711f1b48d12724e65a986_3.jfif',
        body: '<p>Заговор в нашей сказочной истории — это ритмичные слова-пожелания, которые произносят как часть обряда или доброго намерения. Повтор, ритм и образность помогают создать особую атмосферу.</p><p>В реальном фольклоре существуют разные заговорные тексты и обрядовые традиции. В Академии мы создаём собственные вымышленные формулы, не выдавая их за подлинные исторические тексты.</p><p>Добрый заговор не управляет чужой волей. Он может быть пожеланием спокойствия, смелости, ясности или защиты в сказочном путешествии.</p>',
        note: 'Дариека: «Слово может поддержать. Поэтому выбирай его бережно».',
        quest: 'Старинная береста хранит строки доброго пожелания. Какой текст лучше подходит для Академии?',
        question: 'Какой заговор соответствует правилам Академии?',
        answers: [
          'Пожелание смелости и спокойствия',
          'Приказ другому человеку делать то, чего он не хочет',
          'Обещание гарантированного исцеления'
        ],
        correct: 0,
        reward: 'Хранительница доброго слова'
      },
      {
        title: 'Большое испытание зельевара',
        subtitle: 'Три дара мастерства',
        image: '968fe256de0411f1967eea529fad49dc_5.jfif',
        questImage: '6f352e57de0011f1a5c2c2c1e6453527_3.jfif',
        body: '<p>В финале раздела Дариека предлагает ученице пройти три части испытания. Сначала нужно прочитать игровой рецепт и выбрать порядок действий. Затем — подобрать доброе заклинание для освещения старой комнаты. В завершение — произнести собственное пожелание для дальнейшего пути.</p><p>Здесь важны не скорость и не безошибочность с первой попытки, а внимательность, доброта и понимание правил волшебного ремесла.</p><p>Все элементы испытания — вымысел мира Академии, а не реальные инструкции по изготовлению или применению веществ.</p>',
        note: 'Дариека: «Теперь ты знаешь: ремесло требует точности, чары — ясности, а слово — ответственности».',
        quest: 'Дариека приготовила заключительное испытание. Выбери верное сочетание трёх правил.',
        question: 'Что объединяет хорошее зельеварение, заклинание и заговор?',
        answers: [
          'Спешка и случайность',
          'Внимательность, безопасные границы и доброе намерение',
          'Секретность любой ценой'
        ],
        correct: 1,
        reward: 'Мастерица зелий и чар'
      }
    ]
  }
];

const LEGACY_NAME = localStorage.getItem('darieka_student_name') || '';

const DEFAULT_STATE = {
  name: LEGACY_NAME,
  familiarId: '',
  familiarName: '',
  exp: 0,
  completed: { 0: [], 1: [] },
  notes: '',
  activeSection: 0,
  firstVisit: true
};

let state = loadState();
let currentSection = 0;
let currentLesson = 0;
let answered = false;
let selectedFamiliar = '';

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('darieka_reimagined_v1') || 'null');
    if (saved) {
      return {
        ...DEFAULT_STATE,
        ...saved,
        completed: { 0: [], 1: [], ...(saved.completed || {}) }
      };
    }
  } catch (e) {}

  const legacyExp = parseInt(localStorage.getItem('darieka_exp') || '0', 10) || 0;
  return { ...DEFAULT_STATE, exp: legacyExp };
}

function persist() {
  localStorage.setItem('darieka_reimagined_v1', JSON.stringify(state));
  updateHeader();
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const screen = document.getElementById('screen-' + name);
  if (screen) screen.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateHeader() {
  const bar = document.getElementById('topbar');
  bar.hidden = !state.name;

  document.getElementById('studentNameTop').textContent = state.name || 'Ученица';
  document.getElementById('expTop').textContent = state.exp;

  document.getElementById('rankTop').textContent =
    state.completed[1].length === 5
      ? 'Мастерица зелий и чар'
      : state.completed[0].length === 5
        ? 'Юная травница'
        : 'Ученица Академии';
}

function beginJourney() {
  const name = document.getElementById('studentName').value.trim();

  if (!name) {
    alert('Сначала впиши своё имя.');
    return;
  }

  state.name = name;
  persist();
  renderFamiliarChoices();
  showScreen('familiar');
}

function renderFamiliarChoices() {
  const grid = document.getElementById('familiarGrid');

  grid.innerHTML = ASSETS.familiars.map(f => `
    <button class="familiar-choice ${selectedFamiliar === f.id ? 'selected' : ''}"
      onclick="selectFamiliar('${f.id}')">
      <img src="${f.image}" alt="${f.name}">
      <b>${f.name}</b>
      <small>${f.description}</small>
    </button>
  `).join('');
}

function selectFamiliar(id) {
  selectedFamiliar = id;
  renderFamiliarChoices();
  document.getElementById('chooseFamiliarButton').disabled = false;
}

function confirmFamiliar() {
  const familiar = ASSETS.familiars.find(f => f.id === selectedFamiliar);
  if (!familiar) return;

  state.familiarId = familiar.id;
  state.familiarName =
    document.getElementById('familiarName').value.trim() || familiar.name;

  persist();

  document.getElementById('introText').textContent =
    `${state.name}, твой фамильяр ${state.familiarName} уже рядом. Вместе вы будете исследовать Академию, учиться и открывать её тайны. Сегодня за окнами снег, а в оранжерее ждут первые уроки.`;

  showScreen('intro');
}

function familiarMarkup(familiar, compact = false) {
  if (!familiar) return '';

  if (familiar.video) {
    return `
      <video class="familiar-video ${compact ? 'compact' : ''}"
        src="${familiar.video}"
        autoplay muted loop playsinline
        poster="${familiar.image}">
      </video>
    `;
  }

  return `
    <img class="familiar-picture ${compact ? 'compact' : ''}"
      src="${familiar.image}" alt="${familiar.name}">
  `;
}

function renderHome() {
  const familiar = ASSETS.familiars.find(f => f.id === state.familiarId);

  document.getElementById('homeGreeting').textContent =
    `Академия ждёт тебя, ${state.name}`;

  document.getElementById('homeFamiliar').innerHTML = familiar
    ? `${familiarMarkup(familiar, true)}<span><b>${state.familiarName}</b><small>Твой фамильяр и спутник</small></span>`
    : '';

  document.getElementById('familiarTileImage').src =
    familiar ? familiar.image : 'f1.jfif';

  document.getElementById('familiarTileName').textContent =
    state.familiarName || 'Выбрать фамильяра';

  document.getElementById('sectionOneProgress').textContent =
    `${state.completed[0].length} из 5 квестов`;

  document.getElementById('sectionTwoProgress').textContent =
    state.completed[0].length === 5
      ? `${state.completed[1].length} из 5 квестов`
      : 'Откроется после первого раздела';

  document.getElementById('homeLetter').textContent =
    state.completed[0].length === 5
      ? '«Ты доказала, что умеешь наблюдать и беречь. Теперь я могу открыть тебе тайны котла, чар и заговорённого слова».'
      : '«Зима — хорошее время для учёбы. Пока лес отдыхает под снегом, мы будем собирать знания у тёплого очага».';
}

function openSection(index) {
  if (index === 1 && state.completed[0].length < 5) {
    alert('Сначала заверши пять квестов первого раздела. Можно возвращаться к занятиям в любое время.');
    return;
  }

  currentSection = index;
  const course = COURSES[index];

  document.getElementById('sectionKicker').textContent = course.kicker;
  document.getElementById('sectionTitle').textContent = course.title;
  document.getElementById('sectionDescription').textContent = course.description;
  document.getElementById('sectionCover').src = course.cover;

  document.getElementById('lessonList').innerHTML = course.lessons.map((lesson, i) => {
    const done = state.completed[index].includes(i);
    const unlocked = i === 0 || state.completed[index].includes(i - 1);

    return `
      <button class="lesson-row ${done ? 'done' : ''}"
        ${unlocked ? '' : 'disabled'}
        onclick="openLesson(${index}, ${i})">
        <span class="lesson-number">${done ? '✓' : i + 1}</span>
        <span>
          <b>${lesson.title}</b>
          <small>${lesson.subtitle}</small>
        </span>
        <em>${done ? 'Пройдено' : unlocked ? 'Открыть' : 'Закрыто'}</em>
      </button>
    `;
  }).join('');

  showScreen('section');
}

function openLesson(section, index) {
  if (index > 0 && !state.completed[section].includes(index - 1)) {
    return;
  }

  currentSection = section;
  currentLesson = index;

  const lesson = COURSES[section].lessons[index];

  document.getElementById('lessonKicker').textContent =
    `${COURSES[section].title} · Урок ${index + 1} из 5`;

  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonImage').src = lesson.image;
  document.getElementById('lessonBody').innerHTML = lesson.body;
  document.getElementById('lessonNote').textContent = lesson.note;

  showScreen('lesson');
}

function backToSection() {
  openSection(currentSection);
}

function backToLesson() {
  openLesson(currentSection, currentLesson);
}

function startQuest() {
  const lesson = COURSES[currentSection].lessons[currentLesson];

  answered = false;

  document.getElementById('questTitle').textContent =
    `Квест ${currentLesson + 1}. ${lesson.subtitle}`;

  document.getElementById('questImage').src = lesson.questImage;
  document.getElementById('questIntro').textContent = lesson.quest;
  document.getElementById('questFeedback').textContent = '';
  document.getElementById('questContinue').hidden = true;

  document.getElementById('questChoices').innerHTML = lesson.answers.map((answer, i) => `
    <button class="choice" onclick="answerQuest(${i})">
      ${String.fromCharCode(1040 + i)}. ${answer}
    </button>
  `).join('');

  showScreen('quest');
}

function answerQuest(choice) {
  if (answered) return;

  const lesson = COURSES[currentSection].lessons[currentLesson];
  const buttons = [...document.querySelectorAll('.choice')];

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === lesson.correct) {
      button.classList.add('correct');
    } else if (i === choice) {
      button.classList.add('incorrect');
    }
  });

  const good = choice === lesson.correct;

  document.getElementById('questFeedback').textContent = good
    ? 'Верно! Дариека одобрительно кивает.'
    : 'Пока не совсем. Верный ответ подсвечен — попробуй запомнить это правило.';

  if (good) {
    answered = true;
    document.getElementById('questContinue').hidden = false;
  } else {
    document.getElementById('questChoices').insertAdjacentHTML(
      'afterend',
      '<button class="text-button retry" onclick="startQuest()">Попробовать ещё раз</button>'
    );
  }
}

function completeQuest() {
  if (!answered) return;

  const list = state.completed[currentSection];

  if (!list.includes(currentLesson)) {
    list.push(currentLesson);
    list.sort((a, b) => a - b);
    state.exp += 20;
  }

  persist();

  const lesson = COURSES[currentSection].lessons[currentLesson];

  document.getElementById('rewardTitle').textContent = lesson.reward;

  document.getElementById('rewardText').textContent =
    currentSection === 0
      ? 'Ты сохранила новое знание в гримуаре. Каждый бережный шаг приближает тебя к мастерству.'
      : 'Ты освоила ещё одну часть сказочного ремесла Академии. Знание записано в гримуар.';

  document.getElementById('rewardNumber').textContent =
    `Знак № ${currentLesson + 1}`;

  showScreen('reward');
}

function continueAfterReward() {
  if (state.completed[currentSection].length === 5) {
    if (currentSection === 0) {
      showScreen('finale');
    } else {
      openSection(1);
    }
  } else {
    openSection(currentSection);
  }
}

function openGrimoire() {
  const container = document.getElementById('grimoireContent');

  container.innerHTML = COURSES.map((course, sectionIndex) => `
    <div class="grimoire-section">
      <h2>${course.title}</h2>
      ${course.lessons.map((lesson, i) => `
        <div class="grimoire-entry ${state.completed[sectionIndex].includes(i) ? 'earned' : ''}">
          <span>${state.completed[sectionIndex].includes(i) ? '✧' : '○'}</span>
          <div>
            <b>${lesson.title}</b>
            <small>${state.completed[sectionIndex].includes(i)
              ? 'Квест пройден · ' + lesson.reward
              : 'Пока не открыто'}</small>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');

  document.getElementById('studentNotes').value = state.notes || '';
  showScreen('grimoire');
}

function saveNotes() {
  state.notes = document.getElementById('studentNotes').value;
  persist();
  alert('Записи сохранены в гримуаре.');
}

function openFamiliar() {
  const familiar = ASSETS.familiars.find(f => f.id === state.familiarId);
  if (!familiar) return;

  document.getElementById('profileFamiliarName').textContent = state.familiarName;
  document.getElementById('profileFamiliarArt').innerHTML = familiarMarkup(familiar);
  document.getElementById('profileFamiliarDescription').textContent = familiar.description;

  showScreen('familiar-profile');
}

(function init() {
  updateHeader();

  if (state.name && state.familiarId) {
    renderHome();
    showScreen('home');
  } else if (state.name) {
    document.getElementById('studentName').value = state.name;
    renderFamiliarChoices();
    showScreen('familiar');
  } else {
    showScreen('welcome');
  }
})();
