const app = document.querySelector('#app');
const storageKey = 'klasmonster-v2';
const studentNav = [
  ['leerling', 'Dashboard'],
  ['opdrachten', 'Leesopdrachten'],
  ['monster', 'Mijn monstertje'],
  ['voortgang', 'Mijn voortgang']
];

// Alle schermen in de volgorde van het prototype.
const screens = [
  ['Leerling', 'leerling', 'Dashboard'],
  ['Leerling', 'monster', 'Mijn monstertje'],
  ['Leerling', 'opdrachten', 'Leesopdrachten'],
  ['Leerling', 'lezen/schat', 'Leesopdracht · Lezen'],
  ['Leerling', 'vragen/schat/1', 'Leesopdracht · Vraag 1'],
  ['Leerling', 'vragen/schat/2', 'Leesopdracht · Vraag 2'],
  ['Leerling', 'vragen/schat/3', 'Leesopdracht · Vraag 3'],
  ['Leerling', 'antwoorden/schat', 'Leesopdracht · Antwoorden'],
  ['Leerling', 'overzicht/schat', 'Leesopdracht · Overzicht'],
  ['Leerling', 'voortgang', 'Mijn voortgang'],
  ['Leerkracht', 'leerkracht', 'Dashboard'],
  ['Leerkracht', 'leerlingen', 'Alle leerlingen'],
  ['Leerkracht', 'nieuw', 'Nieuwe leesopdracht'],
  ['Leerkracht', 'sjablonen', 'Opdrachtensjablonen'],
  ['Leerkracht', 'nieuw/begrijpend-lezen', 'Nieuwe leesopdracht · Begrijpend lezen'],
  ['Leerkracht', 'nieuw/woordenschat', 'Nieuwe leesopdracht · Woordenschat'],
  ['Leerkracht', 'klasinstellingen', 'Klasinstellingen'],
  ['Ouder', 'ouder', 'Dashboard']
];

const state = { results: [], custom: [], drafts: {}, concepts: {}, className: '4B', schoolYear: '2026–2027' };
try {
  Object.assign(state, JSON.parse(localStorage.getItem(storageKey)) || {});
} catch {
  // De demo blijft bruikbaar als de browser opslag blokkeert.
}

let notice = '';

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // De huidige sessie behoudt de wijzigingen.
  }
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

const allAssignments = () => [...leesopdrachten, ...state.custom];
const currentHash = () => location.hash.slice(1) || 'leerling';

function currentRoute() {
  const [screen, id, step] = currentHash().split('/');
  return { screen, id, step, assignment: allAssignments().find(item => item.id === id) };
}

function progress(value, label, max = 100) {
  return `<progress value="${value}" max="${max}" aria-label="${label}"></progress>`;
}

function questionCount(assignment) {
  const count = assignment.questions.length;
  return `${count} ${count === 1 ? 'vraag' : 'vragen'}`;
}

function meta(assignment) {
  const deadline = assignment.deadline
    ? ` · Tegen ${assignment.deadline.split('-').reverse().join('/')}` : '';
  return `Begrijpend lezen · ${questionCount(assignment)}${deadline}`;
}

/* Paginakader */

function page(home, nav, content, { width = '', user = '' } = {}) {
  return `<header class="site-header"><div class="site-header-inner ${user ? 'has-user' : ''}">
      <a class="logo" href="#${home}">Klasmonster</a>
      ${nav}
      ${user ? `<span class="user">${user}</span>` : ''}
    </div></header>
    <div class="page ${width}">${content}</div>`;
}

function menu(items, current) {
  return `<nav class="site-nav" aria-label="Hoofdmenu">${items.map(([key, label]) =>
    `<a href="#${key}" ${key === current ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>`;
}

const studentPage = (current, content) => page('leerling', menu(studentNav, current), content, { user: 'Milan' });

function exercisePage(active, content) {
  const steps = `<ol class="steps" aria-label="Stappen van de leesopdracht">${['Lezen', 'Vragen', 'Antwoorden'].map((label, index) =>
    `<li ${index === active ? 'aria-current="step"' : ''}>${index + 1}. ${label}</li>`).join('')}</ol>`;
  return page('leerling', steps, content, { width: 'narrow' });
}

function teacherPage(current, label, content) {
  const items = [['leerkracht', 'Dashboard']];
  if (current !== 'leerkracht') items.push([current, label]);
  return page('leerkracht', menu(items, current), content);
}

const backToDashboard = '<a class="button" href="#leerkracht"><span aria-hidden="true">←</span> Terug naar dashboard</a>';

/* Leerling */

function progressStats() {
  const count = 12 + state.results.length;
  const total = state.results.reduce((sum, result) => sum + result.percent, 12 * 80);
  return `<dl class="stats">
    <div><dt>Opdrachten gemaakt</dt><dd>${count}</dd></div>
    <div><dt>Gemiddelde score</dt><dd>${Math.round(total / count)}%</dd></div>
  </dl>`;
}

function monsterStats() {
  const points = state.results.reduce((sum, result) => sum + result.percent, 200);
  const level = 3 + Math.floor(points / 250);
  return { level, points: points % 250, left: `Nog ${250 - points % 250} punten tot level ${level + 1}` };
}

const monsterImage = `<svg class="monster" viewBox="8 0 216 120" role="img" aria-label="Zwaaiend monstertje met twee hoorntjes">
  <path fill="currentColor" d="M 40 117 C 42 113 46 110 50 108 C 38 97 39 78 46 66 C 22 64 13 52 13 35 C 13 19 23 8 38 6 C 30 24 34 39 47 46 C 53 41 61 37 72 35 C 77 22 87 17 101 19 L 95 31 C 106 27 119 29 124 34 L 114 36 C 126 37 133 40 139 45 C 151 36 154 22 146 5 C 164 9 174 21 174 38 C 174 51 166 60 153 65 C 161 77 159 93 154 101 C 164 108 169 99 168 90 C 160 84 162 75 167 76 C 170 76 172 80 174 82 C 171 69 175 65 180 67 C 183 68 183 73 184 77 C 185 68 193 68 195 72 C 198 76 194 81 194 83 C 200 78 206 81 205 86 C 204 91 199 95 194 100 C 193 108 190 114 186 117 Z"/>
  <path fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" d="M 202 49 Q 216 54 219 67 M 197 57 Q 207 62 210 74"/>
</svg>`;

const chestImage = `<div class="thumbnail" aria-hidden="true"><svg viewBox="0 0 64 44" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M2 42V12Q2 2 12 2H52Q62 2 62 12V42ZM2 20H26M38 20H62M14 2V20M50 2V20M26 16H38V24L35 28H29L26 24Z"/>
</svg></div>`;

function assignmentLink(assignment) {
  return `<a class="assignment-link" href="#lezen/${assignment.id}">
    <span><strong>${escapeHTML(assignment.title)}</strong><small>${meta(assignment)}</small></span>
    <span aria-hidden="true">›</span></a>`;
}

function dashboardScreen() {
  const [next, second] = leesopdrachten;
  const { level, left } = monsterStats();
  return studentPage('leerling', `<h1>Hallo, Milan!</h1>
    <p class="lead">Klaar voor een nieuwe leesuitdaging?</p>
    <div class="student-grid">
      <section class="panel next-assignment">
        <div><p class="eyebrow">Jouw volgende leesopdracht</p>
          <h2 class="large">${next.title}</h2>
          <p class="muted">${meta(next)}</p>
          <a class="button primary" href="#lezen/${next.id}">Start leesopdracht</a></div>
        ${chestImage}
      </section>
      <section class="panel monster-card">
        <div><h2>Mijn monstertje</h2>
          <h3>Level ${level}</h3>
          <p class="muted">${left}</p>
          <a class="button" href="#monster">Bekijk mijn monstertje</a></div>
        ${monsterImage}
      </section>
      <section class="panel"><h2>Meer leesopdrachten</h2>
        <div class="stack">${[second, ...state.custom.slice(-1)].map(assignmentLink).join('')}</div>
      </section>
      <section class="panel"><h2>Mijn voortgang</h2>${progressStats()}</section>
    </div>`);
}

function monsterScreen() {
  const { level, points, left } = monsterStats();
  return studentPage('monster', `<section class="panel monster-detail">
    <h1>Mijn monstertje</h1>
    ${monsterImage}
    <p><strong>Level ${level}</strong> · ${left}</p>
    ${progress(points, 'Punten naar het volgende level', 250)}
    <a class="button primary" href="#opdrachten">Verdien meer punten</a>
  </section>`);
}

function assignmentsScreen() {
  return studentPage('opdrachten', `<h1>Leesopdrachten</h1>
    <p class="lead">Kies een opdracht om te starten.</p>
    <div class="stack form-width">${allAssignments().map(assignmentLink).join('')}</div>`);
}

function progressScreen() {
  const recent = state.results.slice(-5).reverse();
  return studentPage('voortgang', `<h1>Mijn voortgang</h1>
    <div class="stack form-width section-gap">
      <section class="panel">${progressStats()}</section>
      <section class="panel"><h2>Recente resultaten</h2>
        ${recent.length ? `<ul class="result-list">${recent.map(result => {
          const assignment = allAssignments().find(item => item.id === result.id);
          return `<li><strong>${escapeHTML(assignment?.title)}</strong><span>${result.correct} / ${result.answers.length}</span></li>`;
        }).join('')}</ul>` : '<p class="muted">Je nieuwe resultaten verschijnen hier zodra je een leesopdracht afwerkt.</p>'}
      </section>
    </div>`);
}

/* Leesopdracht */

function draftFor(assignment) {
  return state.drafts[assignment.id] ??= Array(assignment.questions.length).fill(null);
}

// De eerste vraag zonder antwoord; staat alles ingevuld, dan vraag 1.
function nextQuestion(assignment) {
  return Math.max(0, draftFor(assignment).indexOf(null)) + 1;
}

function readingScreen(assignment) {
  return exercisePage(0, `<p class="eyebrow">Leesopdracht</p>
    <article class="panel passage"><h1>${escapeHTML(assignment.title)}</h1><hr>
      ${assignment.passage.map(part => `<p>${escapeHTML(part)}</p>`).join('')}
    </article>
    <div class="actions"><span class="muted">Stap 1 van 3</span>
      <a class="button primary" href="#vragen/${assignment.id}/${nextQuestion(assignment)}">Naar de vragen <span aria-hidden="true">→</span></a></div>`);
}

function questionScreen(assignment, step) {
  const total = assignment.questions.length;
  const index = Math.min(Math.max(Number.parseInt(step, 10) || 1, 1), total) - 1;
  const { question, options } = assignment.questions[index];
  const answer = draftFor(assignment)[index];
  return exercisePage(1, `<p class="eyebrow">Vraag ${index + 1} van ${total}</p>
    <section class="panel"><p class="eyebrow">${escapeHTML(assignment.title)}</p><hr>
      <h1 class="question">${escapeHTML(question)}</h1>
      <p class="muted">Kies één antwoord om verder te gaan.</p>
      <div class="options">${options.map((option, value) => `<button type="button" class="answer-option"
        data-question="${index}" data-answer="${value}" aria-pressed="${answer === value}">${escapeHTML(option)}</button>`).join('')}</div>
    </section>
    <div class="actions"><a class="button" href="#lezen/${assignment.id}"><span aria-hidden="true">←</span> Terug naar lezen</a></div>`);
}

// Zonder ingediend resultaat tonen de resultaatschermen de beginstand (0 juist).
function latestResult(assignment) {
  return state.results.findLast(result => result.id === assignment.id)
    ?? { answers: [], correct: 0, percent: 0, xp: 0 };
}

function answerScreen(assignment) {
  const result = latestResult(assignment);
  return exercisePage(2, `<div class="stack">
    <section class="panel result-heading"><div><h1>Jouw resultaat</h1><p class="muted">${escapeHTML(assignment.title)}</p></div>
      <p><strong>${result.correct} / ${assignment.questions.length}</strong><span class="muted">Vragen juist</span></p></section>
    ${assignment.questions.map(({ question, options, correct, explanation }, index) => {
      const answer = result.answers[index];
      const given = answer !== undefined;
      return `<section class="panel review">
        <h2>${index + 1}. ${escapeHTML(question)}</h2>
        <span class="mark">${given ? `<span role="img" aria-label="${answer === correct ? 'Juist' : 'Fout'}">${answer === correct ? '✓' : '✗'}</span>` : ''}</span>
        <p>Jouw antwoord${given ? ` · ${escapeHTML(options[answer])}` : ''}</p>
        <p><strong>Juiste antwoord · ${escapeHTML(options[correct])}</strong></p>
        ${explanation ? `<p class="muted">${escapeHTML(explanation)}</p>` : ''}
      </section>`;
    }).join('')}</div>
    <div class="actions"><a class="button" href="#lezen/${assignment.id}"><span aria-hidden="true">←</span> Terug naar lezen</a>
      <a class="button primary" href="#overzicht/${assignment.id}">Naar het overzicht <span aria-hidden="true">→</span></a></div>`);
}

function overviewScreen(assignment) {
  const { correct, percent, xp } = latestResult(assignment);
  return page('leerling', '<ol class="steps"><li aria-current="step">Overzicht</li></ol>', `
    <section class="panel overview"><p class="eyebrow">${escapeHTML(assignment.title)}</p>
      <h1>Goed gedaan!</h1>
      <p>Je had ${correct} van de ${questionCount(assignment)} juist.</p><hr>
      <dl class="stats"><div><dt>Jouw score</dt><dd>${percent}%</dd></div>
        <div><dt>Punten verdiend</dt><dd>+${percent}</dd></div>
        <div><dt>XP verdiend</dt><dd>+${xp}</dd></div></dl>
    </section>
    <div class="actions"><a class="button" href="#antwoorden/${assignment.id}"><span aria-hidden="true">←</span> Terug naar je antwoorden</a>
      <a class="button primary" href="#leerling">Naar het dashboard <span aria-hidden="true">→</span></a></div>`, { width: 'narrow centered' });
}

/* Leerkracht */

function studentTable(students) {
  return `<table><thead><tr><th scope="col">Leerling</th><th scope="col">Score</th><th scope="col">Voortgang</th></tr></thead>
    <tbody>${students.map(([name, score]) => `<tr><th scope="row">${name}</th><td>${score}%</td>
      <td>${progress(score, `Voortgang van ${name}`)}</td></tr>`).join('')}</tbody></table>`;
}

function teacherScreen() {
  const average = Math.round(leerlingen.reduce((sum, [, score]) => sum + score, 0) / leerlingen.length);
  return teacherPage('leerkracht', '', `<div class="heading-row"><h1>Dashboard leerkracht</h1><strong>Klas ${escapeHTML(state.className)}</strong></div>
    <p class="notice" role="status">${escapeHTML(notice)}</p>
    <dl class="teacher-stats">
      <div class="panel"><dt>Leerlingen</dt><dd>${leerlingen.length}</dd></div>
      <div class="panel"><dt>Actieve opdrachten</dt><dd>${allAssignments().length}</dd></div>
      <div class="panel"><dt>Gemiddelde score</dt><dd>${average}%</dd></div>
    </dl>
    <div class="teacher-grid">
      <section class="panel"><h2>Voortgang per leerling</h2>${studentTable(leerlingen.slice(0, 4))}
        <a class="button" href="#leerlingen">Bekijk alle leerlingen <span aria-hidden="true">→</span></a></section>
      <section class="panel stack quick-actions"><h2>Snelle acties</h2>
        <a class="button primary" href="#nieuw">+ Nieuwe leesopdracht</a>
        <a class="button" href="#sjablonen">Opdrachtensjablonen</a>
        <a class="button" href="#klasinstellingen">Klasinstellingen</a></section>
    </div>`);
}

function studentsScreen() {
  return teacherPage('leerlingen', 'Leerlingen', `${backToDashboard}
    <h1>Alle leerlingen</h1><p class="lead">Klas ${escapeHTML(state.className)} · ${leerlingen.length} leerlingen</p>
    <section class="panel form-width">${studentTable(leerlingen)}</section>`);
}

function templatesScreen() {
  return teacherPage('sjablonen', 'Opdrachtensjablonen', `${backToDashboard}
    <h1>Opdrachtensjablonen</h1><p class="lead">Kies een sjabloon met voorbeeldvragen om sneller te starten.</p>
    <div class="stack form-width">${sjablonen.map(item => `<section class="panel split"><div>
      <h2>${item.title}</h2><p>${item.description}</p>
      <p class="muted">${item.questions.length} voorbeeldvragen · Meerkeuze</p></div>
      <a class="button primary" href="#nieuw/${item.id}">Gebruik sjabloon <span aria-hidden="true">→</span></a></section>`).join('')}</div>`);
}

function questionFields(number, { question = '', a = '', b = '', correct = '' } = {}) {
  return `<fieldset class="question-fields"><legend class="visually-hidden">Vraag ${number}</legend>
    <label>Vraag ${number}<input name="question" maxlength="160" placeholder="${number === 1 ? 'Typ hier je eerste vraag' : 'Typ hier je vraag'}" value="${escapeHTML(question)}"></label>
    <div class="answer-fields">
      <label>Antwoord A<input name="a" maxlength="140" placeholder="Typ een antwoord" value="${escapeHTML(a)}"></label>
      <label>Antwoord B<input name="b" maxlength="140" placeholder="Typ een antwoord" value="${escapeHTML(b)}"></label>
      <label>Juiste antwoord<select name="correct"><option value="">Kies A of B</option>
        ${['A', 'B'].map(letter => `<option ${letter === correct ? 'selected' : ''}>${letter}</option>`).join('')}</select></label>
    </div></fieldset>`;
}

function newAssignmentScreen(id) {
  const template = sjablonen.find(item => item.id === id);
  const key = template?.id ?? 'leeg';
  const values = state.concepts[key] ?? {
    title: template?.title ?? '',
    klas: `Klas ${state.className}`,
    questions: (template?.questions ?? ['']).map(question => ({ question }))
  };
  return teacherPage(template ? `nieuw/${key}` : 'nieuw', 'Nieuwe leesopdracht', `${backToDashboard}
    <h1>Nieuwe leesopdracht</h1>
    <p class="lead">${template ? `Sjabloon · ${template.title}` : 'Maak een leesopdracht voor je klas.'}</p>
    <form class="stack form-width" data-form="assignment" data-key="${key}" novalidate>
      <section class="panel stack"><h2>Opdrachtgegevens</h2>
        <label>Titel<input name="title" maxlength="90" placeholder="Bijv. De mysterieuze schat" value="${escapeHTML(values.title)}"></label>
        <div class="two-fields"><label>Klas<input name="klas" maxlength="30" value="${escapeHTML(values.klas)}"></label>
          <label>Deadline<input type="date" name="deadline" value="${escapeHTML(values.deadline)}"></label></div>
        <label>Leestekst<textarea name="passage" rows="4" maxlength="4000" placeholder="Typ of plak hier de tekst die je leerlingen gaan lezen.">${escapeHTML(values.passage)}</textarea></label>
      </section>
      <section class="panel stack"><h2>Vragen</h2>
        <div class="stack" id="questions">${values.questions.map((question, index) => questionFields(index + 1, question)).join('')}</div>
        <p class="muted">Voeg bij elke vraag antwoordopties toe en duid het juiste antwoord aan.</p>
        <div><button type="button" class="button" data-action="add-question">+ Vraag toevoegen</button></div>
      </section>
      <p class="form-error" role="alert"></p>
      <div class="actions"><button type="button" class="button" data-action="concept">Bewaar als concept</button>
        <button type="submit" class="button primary">Publiceer leesopdracht</button></div>
    </form>`);
}

function settingsScreen() {
  return teacherPage('klasinstellingen', 'Klasinstellingen', `${backToDashboard}
    <h1>Klasinstellingen</h1><p class="lead">Beheer de gegevens van klas ${escapeHTML(state.className)}.</p>
    <form class="stack form-width" data-form="settings" novalidate>
      <section class="panel stack"><h2>Klasgegevens</h2><div class="two-fields">
        <label>Klasnaam<input name="className" maxlength="20" value="${escapeHTML(state.className)}"></label>
        <label>Schooljaar<input name="schoolYear" maxlength="20" value="${escapeHTML(state.schoolYear)}"></label></div></section>
      <section class="panel split"><div><h2>Leerlingen</h2><p class="muted">${leerlingen.length} leerlingen in deze klas</p></div>
        <a class="button" href="#leerlingen">Bekijk alle leerlingen <span aria-hidden="true">→</span></a></section>
      <p class="form-error" role="alert"></p>
      <div class="actions"><a class="button" href="#leerkracht">Annuleren</a>
        <button type="submit" class="button primary">Instellingen opslaan</button></div>
    </form>`);
}

/* Ouder */

function parentScreen() {
  const results = [['De verdwenen fiets', 8], ['Het bosavontuur', 9], ['Op kamp', 7]];
  return page('ouder', menu([['ouder', 'Dashboard']], 'ouder'), `<h1>Voortgang van Emma</h1>
    <section class="panel xp-card"><div><h2 class="large">Level 4</h2><p class="muted">Emma</p></div>
      <div><p><span>Naar level 5</span><strong>320 / 500 XP</strong></p>${progress(320, 'XP naar level 5', 500)}</div></section>
    <div class="parent-grid">
      <section class="panel"><h2>Recente resultaten</h2>
        <ul class="result-list">${results.map(([title, grade]) => `<li><strong>${title}</strong><span>${grade} / 10</span></li>`).join('')}</ul></section>
      <section class="panel"><h2>Evolutie begrijpend lezen</h2>
        <ol class="chart">${[52, 64, 73, 82].map((score, index) => `<li><span class="chart-bar" style="--score: ${score}%" aria-hidden="true"></span>
          <span>Week ${index + 1}<span class="visually-hidden">: ${score}%</span></span></li>`).join('')}</ol></section>
    </div>`);
}

/* Schermoverzicht en navigatie */

function indexScreen() {
  return `<div class="page"><h1>Alle schermen</h1><p class="lead">Klik op een scherm of gebruik daarna de pijlen bovenaan.</p>
    <div class="screen-index">${['Leerling', 'Leerkracht', 'Ouder'].map(role => `<section class="panel"><h2>${role}</h2>
      <ol>${screens.map(([owner, hash, label], index) => owner === role
        ? `<li value="${index + 1}"><a href="#${hash}">${label}</a></li>` : '').join('')}</ol></section>`).join('')}</div></div>`;
}

function renderScreenNav() {
  const index = screens.findIndex(([, hash]) => hash === currentHash());
  const link = (target, label, arrow) => screens[target]
    ? `<a href="#${screens[target][1]}" aria-label="${label}" title="${screens[target][2]}">${arrow}</a>`
    : `<span class="disabled" aria-hidden="true">${arrow}</span>`;
  document.querySelector('#screen-nav').innerHTML = index < 0 ? ''
    : `${link(index - 1, 'Vorig scherm', '←')}<span>${index + 1} / ${screens.length}</span>${link(index + 1, 'Volgend scherm', '→')}`;
}

const teacherScreens = {
  leerkracht: teacherScreen,
  leerlingen: studentsScreen,
  sjablonen: templatesScreen,
  nieuw: newAssignmentScreen,
  klasinstellingen: settingsScreen
};
const exerciseScreens = { lezen: readingScreen, vragen: questionScreen, antwoorden: answerScreen, overzicht: overviewScreen };
const otherScreens = {
  monster: monsterScreen, opdrachten: assignmentsScreen, voortgang: progressScreen,
  ouder: parentScreen, schermen: indexScreen
};

function render() {
  const { screen, id, step, assignment } = currentRoute();
  const role = screen === 'schermen' ? '' : screen === 'ouder' ? 'ouder' : teacherScreens[screen] ? 'leerkracht' : 'leerling';
  for (const link of document.querySelectorAll('[data-role]')) {
    if (link.dataset.role === role) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (exerciseScreens[screen] && assignment) app.innerHTML = exerciseScreens[screen](assignment, step);
  else if (teacherScreens[screen]) app.innerHTML = teacherScreens[screen](id);
  else app.innerHTML = (otherScreens[screen] ?? dashboardScreen)();
  renderScreenNav();
}

/* Acties */

function readAssignment(form) {
  const field = name => form.elements[name].value.trim();
  return {
    title: field('title'), klas: field('klas'), deadline: field('deadline'), passage: field('passage'),
    questions: [...form.querySelectorAll('.question-fields')].map(group =>
      Object.fromEntries(['question', 'a', 'b', 'correct'].map(name => [name, group.querySelector(`[name="${name}"]`).value.trim()])))
  };
}

function toTeacherDashboard(message) {
  notice = message;
  save();
  location.hash = 'leerkracht';
}

app.addEventListener('click', event => {
  const target = event.target.closest('button');
  if (!target) return;

  if (target.dataset.answer !== undefined) {
    const { assignment } = currentRoute();
    const answers = draftFor(assignment);
    const index = Number(target.dataset.question);
    answers[index] = Number(target.dataset.answer);
    if (index < answers.length - 1) {
      save();
      location.hash = `vragen/${assignment.id}/${index + 2}`;
    } else if (answers.includes(null)) {
      save();
      location.hash = `vragen/${assignment.id}/${nextQuestion(assignment)}`;
    } else {
      const correct = answers.filter((answer, i) => answer === assignment.questions[i].correct).length;
      const percent = Math.round(correct / answers.length * 100);
      state.results.push({ id: assignment.id, answers, correct, percent, xp: Math.round(percent / 4) });
      delete state.drafts[assignment.id];
      save();
      location.hash = `antwoorden/${assignment.id}`;
    }
  }

  if (target.dataset.action === 'add-question') {
    const list = app.querySelector('#questions');
    list.insertAdjacentHTML('beforeend', questionFields(list.children.length + 1));
    list.lastElementChild.querySelector('input').focus();
  }

  if (target.dataset.action === 'concept') {
    const form = target.form;
    state.concepts[form.dataset.key] = readAssignment(form);
    toTeacherDashboard('Concept bewaard. Open hetzelfde formulier om verder te werken.');
  }
});

app.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const error = form.querySelector('.form-error');

  if (form.dataset.form === 'settings') {
    const className = form.elements.className.value.trim();
    const schoolYear = form.elements.schoolYear.value.trim();
    if (!className || !schoolYear) {
      error.textContent = 'Vul elk veld in.';
      return;
    }
    Object.assign(state, { className, schoolYear });
    toTeacherDashboard('Klasinstellingen opgeslagen.');
    return;
  }

  const values = readAssignment(form);
  // Volledig lege vragen tellen niet mee.
  const questions = values.questions.filter(item => Object.values(item).some(Boolean));
  if (!values.title || !values.klas || !values.passage) error.textContent = 'Vul een titel, klas en leestekst in.';
  else if (!questions.length) error.textContent = 'Voeg minstens één vraag toe.';
  else if (questions.some(item => Object.values(item).some(value => !value))) error.textContent = 'Vul bij elke vraag beide antwoorden in en kies het juiste antwoord.';
  else {
    state.custom.push({
      id: `klas-${Date.now()}`,
      title: values.title,
      klas: values.klas,
      deadline: values.deadline,
      passage: values.passage.split(/\r?\n/).map(line => line.trim()).filter(Boolean),
      questions: questions.map(({ question, a, b, correct }) => ({ question, options: [a, b], correct: correct === 'A' ? 0 : 1 }))
    });
    delete state.concepts[form.dataset.key];
    toTeacherDashboard(`“${values.title}” is gepubliceerd.`);
  }
});

window.addEventListener('hashchange', () => {
  render();
  notice = '';
  app.focus({ preventScroll: true });
  window.scrollTo(0, 0);
});

render();
