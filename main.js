/**
 * Raonjena Reading Bank (라온제나 독서통장)
 * Core Application Logic & Web Components
 */

// --- Fake Data ---
const MOCK_DATA = {
  students: [
    { id: 1, name: '김민준', grade: '3학년 1반', booksCount: 42, stats: [80, 70, 90, 60, 85, 75], level: '성실한 독서가' },
    { id: 2, name: '이서연', grade: '3학년 1반', booksCount: 28, stats: [60, 90, 70, 80, 65, 95], level: '호기심 많은 탐험가' },
    { id: 3, name: '박지우', grade: '3학년 1반', booksCount: 56, stats: [95, 85, 80, 90, 95, 80], level: '꼬마 철학자' },
  ],
  books: [
    { id: 1, title: '어린 왕자', author: '생텍쥐페리', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200', date: '2024-05-01', review: '어른들을 위한 동화라는 말이 딱 맞아요.' },
    { id: 2, title: '해리 포터와 마법사의 돌', author: 'J.K. 롤링', cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=200', date: '2024-04-20', review: '마법의 세계로 떠나는 즐거운 여행!' },
    { id: 3, title: '데미안', author: '헤르만 헤세', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200', date: '2024-04-15', review: '자아를 찾아가는 과정이 인상 깊었습니다.' },
  ],
  recommendations: [
    { title: '우주로 가는 계단', author: '전수경', cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=200' },
    { title: '긴긴밤', author: '루리', cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200' },
  ]
};

// --- Utilities ---
const navigate = (view) => {
  document.querySelector('app-root').setView(view);
};

// --- Web Components ---

/**
 * Radar Chart Component
 */
class ReadingRadarChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const data = JSON.parse(this.getAttribute('data') || '[50, 50, 50, 50, 50, 50]');
    this.render(data);
  }

  render(data) {
    const size = 300;
    const center = size / 2;
    const radius = 100;
    const angleStep = (Math.PI * 2) / 6;
    const labels = ['문학', '예술', '과학', '사회', '역사', '철학'];

    let levels = '';
    for (let i = 1; i <= 5; i++) {
      const r = (radius / 5) * i;
      let points = [];
      for (let j = 0; j < 6; j++) {
        const x = center + r * Math.cos(j * angleStep - Math.PI / 2);
        const y = center + r * Math.sin(j * angleStep - Math.PI / 2);
        points.push(`${x},${y}`);
      }
      levels += `<polygon points="${points.join(' ')}" fill="none" stroke="#e2e8f0" stroke-width="1" />`;
    }

    let axis = '';
    let labelTags = '';
    for (let i = 0; i < 6; i++) {
      const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
      const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
      axis += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="#e2e8f0" stroke-width="1" />`;
      
      const lx = center + (radius + 25) * Math.cos(i * angleStep - Math.PI / 2);
      const ly = center + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
      labelTags += `<text x="${lx}" y="${ly}" text-anchor="middle" font-size="12" fill="#64748b">${labels[i]}</text>`;
    }

    const dataPoints = data.map((val, i) => {
      const r = (radius * val) / 100;
      const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
      const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
      return `${x},${y}`;
    }).join(' ');

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        svg { width: 100%; height: auto; overflow: visible; }
        .area { fill: rgba(14, 165, 233, 0.2); stroke: #0ea5e9; stroke-width: 2; }
      </style>
      <svg viewBox="0 0 ${size} ${size}">
        ${levels}
        ${axis}
        <polygon points="${dataPoints}" class="area" />
        ${labelTags}
      </svg>
    `;
  }
}
customElements.define('reading-radar-chart', ReadingRadarChart);

/**
 * App Root Component
 */
class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.currentView = 'login';
    this.selectedStudent = null;
  }

  connectedCallback() {
    this.render();
  }

  setView(view, params = null) {
    this.currentView = view;
    if (params && params.studentId) {
      this.selectedStudent = MOCK_DATA.students.find(s => s.id === params.studentId);
    }
    this.render();
  }

  render() {
    let content = '';
    switch (this.currentView) {
      case 'login':
        content = `<login-view></login-view>`;
        break;
      case 'teacher':
        content = `<teacher-dashboard></teacher-dashboard>`;
        break;
      case 'student':
        content = `<student-dashboard></student-dashboard>`;
        break;
      case 'student-detail':
        content = `<student-detail-view .student="${JSON.stringify(this.selectedStudent)}"></student-detail-view>`;
        break;
    }

    this.innerHTML = `
      <main class="min-h-screen">
        ${content}
      </main>
    `;
  }
}
customElements.define('app-root', AppRoot);

/**
 * Login View Component
 */
class LoginView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-brand-500 to-indigo-600">
        <div class="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md animate-scale-in">
          <div class="text-center mb-10">
            <h1 class="text-4xl font-bold text-slate-900 mb-2">라온제나</h1>
            <p class="text-slate-600">즐거운 우리의 독서 통장</p>
          </div>
          
          <div class="space-y-4">
            <button onclick="document.querySelector('app-root').setView('teacher')" 
              class="w-full py-4 bg-white border-2 border-brand-500 text-brand-600 font-bold rounded-2xl hover:bg-brand-50 transition-all flex items-center justify-center gap-3 card-lifted">
              <span>👨‍🏫 교사로 로그인</span>
            </button>
            <button onclick="document.querySelector('app-root').setView('student')" 
              class="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all flex items-center justify-center gap-3 card-lifted">
              <span>🎒 학생으로 로그인</span>
            </button>
          </div>
          
          <div class="mt-10 text-center text-sm text-slate-500">
            © 2024 Raonjena Reading Bank
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('login-view', LoginView);

/**
 * Teacher Dashboard Component
 */
class TeacherDashboard extends HTMLElement {
  connectedCallback() {
    const studentList = MOCK_DATA.students.map(s => `
      <div onclick="document.querySelector('app-root').setView('student-detail', {studentId: ${s.id}})"
        class="bg-white p-6 rounded-2xl card-lifted cursor-pointer border border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold text-lg">
            ${s.name[0]}
          </div>
          <div>
            <h3 class="font-bold text-slate-900">${s.name}</h3>
            <p class="text-xs text-slate-500">${s.grade}</p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-medium text-brand-600">${s.booksCount}권 독독</div>
          <div class="text-[10px] text-slate-400 mt-1">${s.level}</div>
        </div>
      </div>
    `).join('');

    this.innerHTML = `
      <div class="max-w-4xl mx-auto p-6 animate-fade-in">
        <header class="flex justify-between items-center mb-10">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">우리 반 독서 현황</h1>
            <p class="text-slate-500">전체 학생 ${MOCK_DATA.students.length}명의 기록을 관리합니다.</p>
          </div>
          <button onclick="document.querySelector('app-root').setView('login')" class="p-2 text-slate-400 hover:text-slate-600 transition-colors">로그아웃</button>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${studentList}
        </div>
      </div>
    `;
  }
}
customElements.define('teacher-dashboard', TeacherDashboard);

/**
 * Student Detail View (Teacher Side)
 */
class StudentDetailView extends HTMLElement {
  connectedCallback() {
    const student = JSON.parse(this.getAttribute('.student'));
    const bookList = MOCK_DATA.books.map(b => `
      <div class="flex gap-4 p-4 border-b border-slate-50 last:border-0">
        <img src="${b.cover}" class="w-16 h-20 object-cover rounded-lg shadow-sm" />
        <div>
          <h4 class="font-bold text-slate-800">${b.title}</h4>
          <p class="text-xs text-slate-500 mb-2">${b.author} | ${b.date}</p>
          <p class="text-sm text-slate-600 line-clamp-2 italic">"${b.review}"</p>
        </div>
      </div>
    `).join('');

    this.innerHTML = `
      <div class="max-w-4xl mx-auto p-6 animate-fade-in">
        <button onclick="document.querySelector('app-root').setView('teacher')" class="mb-6 text-slate-500 flex items-center gap-2 hover:text-brand-600 transition-colors">
          ← 뒤로 가기
        </button>

        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-10">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-brand-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-brand-200">
                ${student.name[0]}
              </div>
              <div>
                <h2 class="text-2xl font-bold text-slate-900">${student.name} 학생</h2>
                <p class="text-slate-500">${student.level}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-50 p-4 rounded-xl text-center">
                <div class="text-2xl font-bold text-brand-600">${student.booksCount}</div>
                <div class="text-xs text-slate-400">총 독서량</div>
              </div>
              <div class="bg-slate-50 p-4 rounded-xl text-center">
                <div class="text-2xl font-bold text-brand-600">85점</div>
                <div class="text-xs text-slate-400">평균 집중도</div>
              </div>
            </div>
          </div>
          
          <div class="flex-1 flex justify-center items-center">
            <reading-radar-chart data="${JSON.stringify(student.stats)}"></reading-radar-chart>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 class="text-lg font-bold text-slate-900 mb-6">최근 읽은 책</h3>
          <div class="space-y-2">
            ${bookList}
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('student-detail-view', StudentDetailView);

/**
 * Student Dashboard Component
 */
class StudentDashboard extends HTMLElement {
  connectedCallback() {
    const recommendations = MOCK_DATA.recommendations.map(r => `
      <div class="bg-white p-4 rounded-2xl border border-slate-100 card-lifted min-w-[160px]">
        <img src="${r.cover}" class="w-full h-40 object-cover rounded-xl mb-3 shadow-sm" />
        <h4 class="font-bold text-sm text-slate-800 line-clamp-1">${r.title}</h4>
        <p class="text-[10px] text-slate-400">${r.author}</p>
      </div>
    `).join('');

    this.innerHTML = `
      <div class="max-w-4xl mx-auto p-6 animate-fade-in pb-32">
        <header class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">지우의 독서 통장 📚</h1>
            <p class="text-slate-500">벌써 56권의 책을 읽었네요! 대단해요!</p>
          </div>
          <button onclick="document.querySelector('app-root').setView('login')" class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all">
            🚪
          </button>
        </header>

        <!-- Stats Section -->
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
          <h3 class="text-lg font-bold text-slate-900 mb-4">나의 독서 성향</h3>
          <div class="flex justify-center py-6">
            <reading-radar-chart data="[95, 85, 80, 90, 95, 80]"></reading-radar-chart>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="mb-8">
          <div class="flex justify-between items-end mb-4">
            <h3 class="text-lg font-bold text-slate-900">AI 추천 도서 ✨</h3>
            <button class="text-sm text-brand-600 font-medium">더보기</button>
          </div>
          <div class="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
            ${recommendations}
          </div>
        </div>

        <!-- FAB for Adding Book -->
        <div class="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
          <button onclick="document.querySelector('book-modal').open()"
            class="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl shadow-xl shadow-brand-200 hover:bg-brand-600 transition-all flex items-center justify-center gap-2 text-lg">
            <span>➕ 새로운 책 등록하기</span>
          </button>
        </div>

        <book-modal></book-modal>
      </div>
    `;
  }
}
customElements.define('student-dashboard', StudentDashboard);

/**
 * Book Registration Modal Component
 */
class BookModal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
    this.render();
  }

  close() {
    this.isOpen = false;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.isOpen) {
      this.innerHTML = '';
      return;
    }

    this.innerHTML = `
      <div class="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white w-full max-w-2xl rounded-t-[32px] sm:rounded-[32px] max-h-[90vh] overflow-y-auto p-8 animate-scale-in">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold text-slate-900">책 등록하기</h2>
            <button onclick="this.closest('book-modal').close()" class="text-slate-400 hover:text-slate-600 p-2">✕</button>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">도서 검색</label>
              <div class="relative">
                <input type="text" placeholder="제목이나 저자를 입력하세요..." 
                  class="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-brand-500 rounded-2xl outline-none transition-all"
                  oninput="const results = this.nextElementSibling; if(this.value.length > 1) results.classList.remove('hidden'); else results.classList.add('hidden');">
                <div class="hidden absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-10 overflow-hidden">
                  <div class="p-3 hover:bg-brand-50 cursor-pointer flex gap-3 items-center">
                    <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=50" class="w-10 h-12 rounded object-cover">
                    <div>
                      <div class="font-bold text-sm">긴긴밤</div>
                      <div class="text-[10px] text-slate-500">루리 | 문학동네</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">한줄평</label>
                <input type="text" placeholder="짧고 강렬하게!" class="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-brand-500 transition-all">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">별점</label>
                <div class="flex gap-2 text-2xl">
                  <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">나의 감상</label>
              <textarea rows="4" placeholder="책을 읽고 어떤 생각이 들었나요?" 
                class="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-brand-500 transition-all"></textarea>
            </div>

            <button onclick="this.closest('book-modal').close()"
              class="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl shadow-lg hover:bg-brand-600 transition-all">
              등록 완료
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('book-modal', BookModal);
