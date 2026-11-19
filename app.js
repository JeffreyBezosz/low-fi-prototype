const app = document.querySelector('#app');
const modal = document.querySelector('#modal');
const storageKey = 'leesprototype-v1';
const defaultClassName = '4B';
const navItems = [
  ['leerling', 'Dashboard'],
  ['opdrachten', 'Leesopdrachten'],
  ['monster', 'Mijn monstertje'],
  ['voortgang', 'Mijn voortgang']
];
const state = { results: [], custom: [], drafts: {}, className: defaultClassName };

try {
  Object.assign(state, JSON.parse(localStorage.getItem(storageKey)) || {});
} catch {
  // De demo blijft bruikbaar als de browser opslag blokkeert.
}

let selection = leesopdrachten[0].id;
let notice = '';

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // De huidige sessie behoudt de wijzigingen.
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function allAssignments() {
  return [...leesopdrachten, ...state.custom];
}

function currentRoute() {
  const [screen = 'leerling', id] = location.hash.slice(1).split('/');
  return { screen, assignment: allAssignments().find(item => item.id === id) };
}

function navigate(screen, assignment) {
  location.hash = assignment ? `${screen}/${assignment.id}` : screen;
}

function progress(value, label, max = 100) {
  return `<progress value="${value}" max="${max}" aria-label="${label}"></progress>`;
}

function progressStats() {
  const count = 12 + state.results.length;
  const total = state.results.reduce((sum, result) => sum + result.percent, 12 * 80);
  return { count, average: Math.round(total / count) };
}

function monsterStats() {
  const points = state.results.reduce((sum, result) => sum + result.percent, 200);
  return {
    level: 3 + Math.floor(points / 250),
    points: points % 250,
    xp: state.results.reduce((sum, result) => sum + result.xp, 0)
  };
}

function cardTitle(title) {
  return `<h2 class="card-title"><span class="tile" aria-hidden="true"></span>${title}</h2>`;
}

function studentLayout(screen, content) {
  return `<div class="student-layout">
    <aside class="sidebar">
      <a class="logo" href="#leerling" aria-label="Naar het leerlingdashboard">Logo</a>
      <nav class="student-nav" aria-label="Leerlingmenu">
        ${navItems.map(([key, label]) => `<a href="#${key}" ${key === screen ? 'aria-current="page"' : ''}>
          <span class="tile" aria-hidden="true"></span>${label}</a>`).join('')}
      </nav>
    </aside>
    <div class="student-content">${content}</div>
  </div>`;
}

function monsterCard(detail = false) {
  const { level, points, xp } = monsterStats();
  return `<section class="student-card monster-card ${detail ? 'monster-detail' : ''}">
    ${detail ? '<h1>Mijn monstertje</h1>' : cardTitle('Mijn monstertje')}
    <canvas class="monster" width="440" height="250" role="img" aria-label="Zwart silhouet van een zwaaiend monstertje met twee hoorntjes"></canvas>
    <p class="small">Level ${level} · Nog ${250 - points} punten tot level ${level + 1}</p>
    ${progress(points, 'Punten naar het volgende level', 250)}
    ${detail ? `<p>${xp} XP verdiend met nieuwe leesopdrachten.</p><a href="#opdrachten" class="button pink">Bekijk leesopdrachten</a>`
      : '<a href="#monster" class="button pink">Bekijk mijn monstertje</a>'}
  </section>`;
}

function drawMonster() {
  const canvas = app.querySelector('.monster');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(2, 2);
  ctx.fillStyle = '#1e1c1b';
  const shape = new Path2D('M 40 117 C 42 113 46 110 50 108 C 38 97 39 78 46 66 C 22 64 13 52 13 35 C 13 19 23 8 38 6 C 30 24 34 39 47 46 C 53 41 61 37 72 35 C 77 22 87 17 101 19 L 95 31 C 106 27 119 29 124 34 L 114 36 C 126 37 133 40 139 45 C 151 36 154 22 146 5 C 164 9 174 21 174 38 C 174 51 166 60 153 65 C 161 77 159 93 154 101 C 164 108 169 99 168 90 C 160 84 162 75 167 76 C 170 76 172 80 174 82 C 171 69 175 65 180 67 C 183 68 183 73 184 77 C 185 68 193 68 195 72 C 198 76 194 81 194 83 C 200 78 206 81 205 86 C 204 91 199 95 194 100 C 193 108 190 114 186 117 Z');
  ctx.fill(shape);
  ctx.strokeStyle = '#1e1c1b';
  ctx.lineWidth = 2.25;
  ctx.lineCap = 'round';
  ctx.stroke(new Path2D('M 202 49 Q 216 54 219 67 M 197 57 Q 207 62 210 74'));
}

function assignmentCard(assignments, full = false) {
  if (!assignments.some(item => item.id === selection)) selection = assignments[0].id;
  return `<section class="student-card assignment-card">
    ${full ? '<h1>Leesopdrachten</h1>' : cardTitle('Leesopdrachten')}
    <div class="assignment-list">
      ${assignments.map(item => `<button type="button" class="assignment-option" data-select="${item.id}"
        aria-pressed="${item.id === selection}">
        <span>${escapeHTML(item.title)}</span>
        <small>Begrijpend lezen · ${item.questions.length} ${item.questions.length === 1 ? 'vraag' : 'vragen'}</small>
      </button>`).join('')}
    </div>
    <a class="button pink" id="start-assignment" href="#lezen/${selection}">Start leesopdracht</a>
  </section>`;
}

function studentScreen(screen) {
  const { count, average } = progressStats();
  const stats = `<dl class="student-stats">
    <div><dt>Opdrachten gemaakt</dt><dd>${count}</dd></div>
    <div><dt>Gemiddelde score</dt><dd>${average}%</dd></div>
  </dl>`;

  if (screen === 'opdrachten') return assignmentCard(allAssignments(), true);
  if (screen === 'monster') return monsterCard(true);
  if (screen === 'voortgang') {
    const recent = state.results.slice(-5).reverse();
    return `<section class="student-card">
      <h1>Mijn voortgang</h1>
      ${stats}
      <h2>Recente resultaten</h2>
      ${recent.length ? `<ul class="result-list">${recent.map(result => {
        const assignment = allAssignments().find(item => item.id === result.id);
        return `<li><span>${escapeHTML(assignment.title)}</span><strong>${result.correct} / ${assignment.questions.length}</strong></li>`;
      }).join('')}</ul>` : '<p>Je nieuwe resultaten verschijnen hier zodra je een leesopdracht afwerkt.</p>'}
    </section>`;
  }

  return `<section class="student-card welcome"><h1>Hallo, Milan!</h1><p>Klaar voor een nieuwe leesuitdaging?</p></section>
    <div class="student-grid">
      ${monsterCard()}
      ${assignmentCard(leesopdrachten.slice(0, 2))}
      <section class="student-card student-summary">${cardTitle('Mijn voortgang')}${stats}</section>
    </div>`;
}

function steps(active) {
  return `<ol class="steps" aria-label="Stappen van de leesopdracht">
    ${['Lezen', 'Vragen', 'Antwoorden'].map((label, index) => `<li ${index === active ? 'aria-current="step"' : ''}>${index + 1}. ${label}</li>`).join('')}
  </ol>`;
}

function readingScreen(assignment) {
  return `<article class="exercise">
    ${steps(0)}
    <h1>${escapeHTML(assignment.title)}</h1>
    <div class="passage">${assignment.passage.map(part => `<p>${escapeHTML(part)}</p>`).join('')}</div>
    <nav class="exercise-actions" aria-label="Leesopdracht">
      <a class="button outline" href="#opdrachten">Terug</a>
      <a class="button pill" href="#vragen/${assignment.id}">Volgende <span aria-hidden="true">→</span></a>
    </nav>
  </article>`;
}

function draftFor(assignment) {
  return state.drafts[assignment.id] ??= {
    index: 0,
    answers: Array(assignment.questions.length).fill(null)
  };
}

function questionScreen(assignment) {
  const { index, answers } = draftFor(assignment);
  const [question, ...options] = assignment.questions[index];
  const order = index % 3 === 0 ? [1, 0, 2] : index % 3 === 1 ? [2, 1, 0] : [0, 2, 1];
  const last = index === assignment.questions.length - 1;
  return `<article class="exercise">
    ${steps(1)}
    <h1>${escapeHTML(assignment.title)}</h1>
    <p class="question-count">Vraag ${index + 1} van ${assignment.questions.length}</p>
    <form id="quiz-form">
      <fieldset class="question-box">
        <legend tabindex="-1">${escapeHTML(question)}</legend>
        ${order.map(option => `<label class="answer-option">
          <input type="radio" name="answer" value="${option}" required ${answers[index] === option ? 'checked' : ''}>
          <span>${escapeHTML(options[option])}</span>
        </label>`).join('')}
      </fieldset>
      <div class="exercise-actions">
        <button type="button" class="button outline" data-action="previous-question">${index ? 'Vorige vraag' : 'Terug naar de tekst'}</button>
        <button type="submit" class="button pill">${last ? 'Indienen' : 'Volgende'} <span aria-hidden="true">→</span></button>
      </div>
    </form>
  </article>`;
}

function latestResult(assignment) {
  return state.results.findLast(result => result.id === assignment.id);
}

function resultScreen(assignment, result) {
  return `<section class="assessment">
    <span class="star" aria-hidden="true">★</span>
    <h1>${result.percent >= 50 ? 'Goed gedaan!' : 'Opdracht afgerond!'}</h1>
    <p>Je scoorde ${result.correct} van de ${assignment.questions.length} vragen goed.</p>
    <strong class="result-percent">${result.percent}%</strong>
    ${progress(result.percent, 'Je score')}
    <p class="rewards">+ ${result.percent} punten <span aria-hidden="true">•</span> + ${result.xp} XP</p>
    <div class="assessment-actions">
      <a class="button primary" href="#antwoorden/${assignment.id}">Bekijk je antwoorden</a>
      <a class="button outline" href="#leerling">Naar het dashboard</a>
    </div>
  </section>`;
}

function answerScreen(assignment, result) {
  return `<article class="exercise">
    ${steps(2)}
    <h1>Je antwoorden</h1>
    <p>Je scoorde ${result.correct} van de ${assignment.questions.length} op ${escapeHTML(assignment.title)}.</p>
    <ol class="review-list">
      ${assignment.questions.map(([question, ...options], index) => {
        const selected = result.answers[index];
        return `<li><h2>${escapeHTML(question)}</h2>
          <p><strong>${selected === 0 ? 'Juist' : 'Onjuist'}</strong> · Jouw antwoord: ${escapeHTML(options[selected])}</p>
          ${selected === 0 ? '' : `<p>Juiste antwoord: ${escapeHTML(options[0])}</p>`}</li>`;
      }).join('')}
    </ol>
    <nav class="exercise-actions" aria-label="Na de leesopdracht">
      <a class="button outline" href="#beoordeling/${assignment.id}">Terug naar beoordeling</a>
      <a class="button primary" href="#leerling">Naar het dashboard</a>
    </nav>
  </article>`;
}

function teacherScreen() {
  const students = [['Emma', 92], ['Lars', 85], ['Noah', 78], ['Ella', 76]];
  return `<section class="role-screen">
    <div class="teacher-heading">
      <h1>Dashboard leerkracht</h1><p>Klas ${escapeHTML(state.className)}</p>
    </div>
    <dl class="teacher-stats">
      <div class="panel"><dt>leerlingen</dt><dd>21</dd></div>
      <div class="panel"><dt>actieve opdrachten</dt><dd>${allAssignments().length}</dd></div>
      <div class="panel"><dt>gemiddelde score</dt><dd>78%</dd></div>
    </dl>
    <div class="teacher-grid">
      <section class="panel">
        <h2>Voortgang per leerling</h2>
        <table>
          <thead><tr><th scope="col">Leerling</th><th scope="col">Score</th><th scope="col">Voortgang</th></tr></thead>
          <tbody>${students.map(([name, score]) => `<tr>
            <th scope="row">${name}</th><td><strong>${score}%</strong></td>
            <td>${progress(score, `Voortgang van ${name}`)}</td>
          </tr>`).join('')}</tbody>
        </table>
      </section>
      <section class="panel quick-actions">
        <h2>Snelle acties</h2>
        <button type="button" class="button primary" data-action="new-assignment">+ Nieuwe leesopdracht</button>
        <button type="button" class="button" data-action="templates">Opdrachtsjablonen</button>
        <button type="button" class="button" data-action="class-settings">Klasinstellingen</button>
      </section>
    </div>
    <p class="notice" role="status">${escapeHTML(notice)}</p>
  </section>`;
}

function parentScreen() {
  const results = [['De verdwenen fiets', 8], ['Het bosavontuur', 9], ['Op kamp', 7]];
  const weeklyScores = [52, 64, 73, 82];
  return `<section class="role-screen parent-screen">
    <h1>Voortgang van Emma</h1>
    <section class="panel xp-card" aria-label="Level en XP">
      <h2>Emma <span aria-hidden="true">•</span> Level 4</h2>
      <div><p>320 / 500 XP</p>${progress(320, 'XP naar het volgende level', 500)}</div>
    </section>
    <div class="parent-grid">
      <section class="panel">
        <h2>Recente resultaten</h2>
        <ul class="result-list">${results.map(([title, grade]) => `<li><span>${title}</span><strong>${grade} / 10</strong></li>`).join('')}</ul>
      </section>
      <section class="panel">
        <h2>Evolutie begrijpend lezen</h2>
        <ol class="chart">${weeklyScores.map((score, index) => `<li>
          <span class="chart-bar" style="--score: ${score}%" aria-hidden="true"></span>
          <span>Week ${index + 1}<span class="visually-hidden">: ${score}%</span></span>
        </li>`).join('')}</ol>
      </section>
    </div>
  </section>`;
}

function showDialog(title, content) {
  modal.innerHTML = `<div class="dialog-header">
    <h2 id="dialog-title">${title}</h2>
    <button type="button" class="button outline" data-close aria-label="Sluiten">×</button>
  </div>${content}`;
  if (!modal.open) modal.showModal();
}

function assignmentDialog(template) {
  const [question, correct, wrong1, wrong2] = template?.questions[0] ?? ['', '', '', ''];
  showDialog('Nieuwe leesopdracht', `<form data-dialog-action="assignment" class="dialog-form">
    <label>Titel <input name="title" maxlength="90" required value="${escapeHTML(template?.title ?? '')}"></label>
    <label>Leestekst <textarea name="passage" rows="5" maxlength="4000" required>${escapeHTML(template?.passage.join('\n\n') ?? '')}</textarea></label>
    <label>Vraag <input name="question" maxlength="160" required value="${escapeHTML(question)}"></label>
    <label>Juiste antwoord <input name="correct" maxlength="140" required value="${escapeHTML(correct)}"></label>
    <label>Afleider 1 <input name="wrong1" maxlength="140" required value="${escapeHTML(wrong1)}"></label>
    <label>Afleider 2 <input name="wrong2" maxlength="140" required value="${escapeHTML(wrong2)}"></label>
    <p class="form-error" role="alert"></p>
    <button type="submit" class="button primary">Opdracht toevoegen</button>
  </form>`);
}

function render({ focus = false } = {}) {
  const { screen, assignment } = currentRoute();
  const role = ['leerkracht', 'ouder'].includes(screen) ? screen : 'leerling';
  for (const link of document.querySelectorAll('[data-role]')) {
    if (link.dataset.role === role) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }

  if (screen === 'leerkracht') app.innerHTML = teacherScreen();
  else if (screen === 'ouder') app.innerHTML = parentScreen();
  else if (screen === 'lezen' && assignment) app.innerHTML = readingScreen(assignment);
  else if (screen === 'vragen' && assignment) app.innerHTML = questionScreen(assignment);
  else if (['beoordeling', 'antwoorden'].includes(screen) && assignment) {
    const result = latestResult(assignment);
    app.innerHTML = result
      ? (screen === 'beoordeling' ? resultScreen(assignment, result) : answerScreen(assignment, result))
      : readingScreen(assignment);
  } else {
    const student = navItems.some(([key]) => key === screen) ? screen : 'leerling';
    app.innerHTML = studentLayout(student, studentScreen(student));
  }
  drawMonster();
  if (focus) {
    app.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

function focusQuestion() {
  render({ focus: true });
  app.querySelector('legend').focus({ preventScroll: true });
}

app.addEventListener('click', event => {
  const target = event.target.closest('button');
  if (!target) return;

  if (target.dataset.select) {
    selection = target.dataset.select;
    for (const option of app.querySelectorAll('[data-select]')) {
      option.setAttribute('aria-pressed', String(option === target));
    }
    app.querySelector('#start-assignment').href = `#lezen/${selection}`;
  }

  if (target.dataset.action === 'previous-question') {
    const { assignment } = currentRoute();
    const draft = draftFor(assignment);
    if (draft.index === 0) navigate('lezen', assignment);
    else {
      draft.index -= 1;
      save();
      focusQuestion();
    }
  }

  if (target.dataset.action === 'new-assignment') assignmentDialog();
  if (target.dataset.action === 'templates') {
    showDialog('Opdrachtsjablonen', `<div class="assignment-list">
      ${leesopdrachten.map(item => `<button class="button" data-template="${item.id}">${escapeHTML(item.title)}</button>`).join('')}
    </div>`);
  }
  if (target.dataset.action === 'class-settings') {
    showDialog('Klasinstellingen', `<form class="dialog-form" data-dialog-action="class">
      <label>Klasnaam <input name="className" value="${escapeHTML(state.className)}" maxlength="20" required></label>
      <p class="form-error" role="alert"></p>
      <button type="submit" class="button primary">Opslaan</button>
    </form>`);
  }
});

app.addEventListener('change', event => {
  if (event.target.name !== 'answer') return;
  const draft = draftFor(currentRoute().assignment);
  draft.answers[draft.index] = Number(event.target.value);
  save();
});

app.addEventListener('submit', event => {
  if (event.target.id !== 'quiz-form') return;
  event.preventDefault();
  const { assignment } = currentRoute();
  const draft = draftFor(assignment);
  draft.answers[draft.index] = Number(new FormData(event.target).get('answer'));
  if (draft.index < assignment.questions.length - 1) {
    draft.index += 1;
    save();
    focusQuestion();
    return;
  }

  const correct = draft.answers.filter(answer => answer === 0).length;
  const percent = Math.round(correct / assignment.questions.length * 100);
  state.results.push({ id: assignment.id, answers: draft.answers, correct, percent, xp: Math.round(percent / 4) });
  delete state.drafts[assignment.id];
  save();
  navigate('beoordeling', assignment);
});

modal.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-close')) modal.close();
  if (button.dataset.template) {
    assignmentDialog(leesopdrachten.find(item => item.id === button.dataset.template));
    modal.querySelector('input').focus();
  }
});

modal.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const values = Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, value.trim()]));
  const error = form.querySelector('.form-error');
  if (Object.values(values).some(value => !value)) {
    error.textContent = 'Vul elk veld in.';
    return;
  }
  if (form.dataset.dialogAction === 'class') {
    state.className = values.className;
    notice = 'Klasinstellingen opgeslagen.';
  } else {
    const { title, passage, question, correct, wrong1, wrong2 } = values;
    if (new Set([correct, wrong1, wrong2].map(answer => answer.toLowerCase())).size < 3) {
      error.textContent = 'Gebruik drie verschillende antwoorden.';
      return;
    }
    state.custom.push({
      id: `klas-${Date.now()}-${state.custom.length}`,
      title,
      passage: passage.split(/\r?\n/).map(line => line.trim()).filter(Boolean),
      questions: [[question, correct, wrong1, wrong2]]
    });
    notice = `“${title}” staat nu bij de leesopdrachten.`;
  }
  save();
  modal.close();
  const action = form.dataset.dialogAction === 'class' ? 'class-settings' : 'new-assignment';
  render();
  app.querySelector(`[data-action="${action}"]`).focus();
});

window.addEventListener('hashchange', () => {
  if (modal.open) modal.close();
  notice = '';
  render({ focus: true });
});

render();
