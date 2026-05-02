/**
 * Raonjena Reading Bank (라온제나 독서통장)
 * Core Application Logic & Web Components
 */

// --- Constants & Database ---
const RECOMMENDED_LIBRARY = [
  { title: '만복이네 떡집', author: '리룡권', publisher: '비룡소', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200' },
  { title: '푸른 사자 와니니', author: '이현', publisher: '창비', cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=200' },
  { title: '가방 들어주는 아이', author: '고정욱', publisher: '사계절', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200' },
  { title: '마당을 나온 암탉', author: '황선미', publisher: '사계절', cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=200' },
  { title: '알사탕', author: '백희나', publisher: '책읽는곰', cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200' },
  { title: '책 먹는 여우', author: '프란치스카 비어만', publisher: '주니어김영사', cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=200' },
  { title: '긴긴밤', author: '루리', publisher: '문학동네', cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200' },
  { title: '두 배로 카메라', author: '임지형', publisher: '개암나무', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200' }
];

let MOCK_DATA = {
  currentUser: { id: 3, role: 'student' },
  students: [
    { id: 1, name: '김민준', grade: '3학년 1반', booksCount: 42, stats: [80, 70, 90, 60, 85, 75], level: '성실한 독서가' },
    { id: 2, name: '이서연', grade: '3학년 1반', booksCount: 28, stats: [60, 90, 70, 80, 65, 95], level: '호기심 많은 탐험가' },
    { id: 3, name: '박지우', grade: '3학년 1반', booksCount: 56, stats: [95, 85, 80, 90, 95, 80], level: '꼬마 철학자' },
  ],
  books: [
    { id: 1, studentId: 3, title: '어린 왕자', author: '생텍쥐페리', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200', date: '2024-05-01', review: '어른들을 위한 동화라는 말이 딱 맞아요.', rating: 5 },
    { id: 2, studentId: 3, title: '해리 포터와 마법사의 돌', author: 'J.K. 롤링', cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=200', date: '2024-04-20', review: '마법의 세계로 떠나는 즐거운 여행!', rating: 4 },
    { id: 3, studentId: 3, title: '데미안', author: '헤르만 헤세', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200', date: '2024-04-15', review: '자아를 찾아가는 과정이 인상 깊었습니다.', rating: 5 },
  ],
  recommendations: RECOMMENDED_LIBRARY.slice(0, 4)
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
    const size = 300, center = size / 2, radius = 100, angleStep = (Math.PI * 2) / 6;
    const labels = ['문학', '예술', '과학', '사회', '역사', '철학'];
    let levels = '', axis = '', labelTags = '';
    for (let i = 1; i <= 5; i++) {
      const r = (radius / 5) * i;
      let pts = [];
      for (let j = 0; j < 6; j++) {
        pts.push(`${center + r * Math.cos(j * angleStep - Math.PI / 2)},${center + r * Math.sin(j * angleStep - Math.PI / 2)}`);
      }
      levels += `<polygon points="${pts.join(' ')}" fill="none" stroke="#e2e8f0" stroke-width="1" />`;
    }
    for (let i = 0; i < 6; i++) {
      const x = center + radius * Math.cos(i * angleStep - Math.PI / 2), y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
      axis += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="#e2e8f0" stroke-width="1" />`;
      labelTags += `<text x="${center + (radius + 25) * Math.cos(i * angleStep - Math.PI / 2)}" y="${center + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2)}" text-anchor="middle" font-size="12" fill="#64748b">${labels[i]}</text>`;
    }
    const dataPoints = data.map((val, i) => {
      const r = (radius * val) / 100;
      return `${center + r * Math.cos(i * angleStep - Math.PI / 2)},${center + r * Math.sin(i * angleStep - Math.PI / 2)}`;
    }).join(' ');
    this.shadowRoot.innerHTML = `<style>svg{width:100%;height:auto;overflow:visible;}.area{fill:rgba(14,165,233,0.2);stroke:#0ea5e9;stroke-width:2;}</style><svg viewBox="0 0 ${size} ${size}">${levels}${axis}<polygon points="${dataPoints}" class="area" />${labelTags}</svg>`;
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
  connectedCallback() { this.render(); }
  setView(view, params = null) {
    this.currentView = view;
    if (params?.studentId) this.selectedStudent = MOCK_DATA.students.find(s => s.id === params.studentId);
    this.render();
  }
  render() {
    let content = '';
    if (this.currentView === 'login') content = '<login-view></login-view>';
    else if (this.currentView === 'teacher') content = '<teacher-dashboard></teacher-dashboard>';
    else if (this.currentView === 'student') content = '<student-dashboard></student-dashboard>';
    else if (this.currentView === 'student-detail') content = `<student-detail-view .student='${JSON.stringify(this.selectedStudent)}'></student-detail-view>`;
    this.innerHTML = `<main class="min-h-screen">${content}</main>`;
  }
}
customElements.define('app-root', AppRoot);

/**
 * Login View
 */
class LoginView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-brand-500 to-indigo-600">
        <div class="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md animate-scale-in">
          <div class="text-center mb-10"><h1 class="text-4xl font-bold text-slate-900 mb-2">라온제나</h1><p class="text-slate-600">즐거운 우리의 독서 통장</p></div>
          <div class="space-y-4">
            <button onclick="document.querySelector('app-root').setView('teacher')" class="w-full py-4 bg-white border-2 border-brand-500 text-brand-600 font-bold rounded-2xl hover:bg-brand-50 transition-all card-lifted">👨‍🏫 교사로 로그인</button>
            <button onclick="document.querySelector('app-root').setView('student')" class="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all card-lifted">🎒 학생으로 로그인</button>
          </div>
        </div>
      </div>`;
  }
}
customElements.define('login-view', LoginView);

/**
 * Teacher Dashboard
 */
class TeacherDashboard extends HTMLElement {
  connectedCallback() {
    const list = MOCK_DATA.students.map(s => `
      <div onclick="document.querySelector('app-root').setView('student-detail', {studentId: ${s.id}})" class="bg-white p-6 rounded-2xl card-lifted cursor-pointer border border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold text-lg">${s.name[0]}</div>
          <div><h3 class="font-bold text-slate-900">${s.name}</h3><p class="text-xs text-slate-500">${s.grade}</p></div>
        </div>
        <div class="text-right"><div class="text-sm font-medium text-brand-600">${s.booksCount}권 독독</div><div class="text-[10px] text-slate-400 mt-1">${s.level}</div></div>
      </div>`).join('');
    this.innerHTML = `
      <div class="max-w-4xl mx-auto p-6 animate-fade-in">
        <header class="flex justify-between items-center mb-10">
          <div><h1 class="text-2xl font-bold text-slate-900">우리 반 독서 현황</h1><p class="text-slate-500">전체 학생 ${MOCK_DATA.students.length}명 관리 중</p></div>
          <div class="flex gap-2">
            <button onclick="document.querySelector('student-modal').open()" class="px-4 py-2 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 transition-all shadow-lg flex items-center gap-2"><span>👤 학생 추가</span></button>
            <button onclick="document.querySelector('app-root').setView('login')" class="p-2 text-slate-400 hover:text-slate-600">로그아웃</button>
          </div>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${list}</div>
        <student-modal></student-modal>
      </div>`;
  }
}
customElements.define('teacher-dashboard', TeacherDashboard);

/**
 * Student Detail View
 */
class StudentDetailView extends HTMLElement {
  connectedCallback() {
    const student = JSON.parse(this.getAttribute('.student'));
    const books = MOCK_DATA.books.filter(b => b.studentId === student.id).map(b => `
      <div class="flex gap-4 p-4 border-b border-slate-50 last:border-0">
        <img src="${b.cover}" class="w-16 h-20 object-cover rounded-lg shadow-sm" />
        <div><h4 class="font-bold text-slate-800">${b.title}</h4><p class="text-xs text-slate-500 mb-1">${b.author} | ⭐${b.rating}</p><p class="text-sm text-slate-600 line-clamp-2 italic">"${b.review}"</p></div>
      </div>`).join('');
    this.innerHTML = `
      <div class="max-w-4xl mx-auto p-6 animate-fade-in">
        <button onclick="document.querySelector('app-root').setView('teacher')" class="mb-6 text-slate-500 hover:text-brand-600 transition-colors">← 뒤로 가기</button>
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-10">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-brand-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg">${student.name[0]}</div>
              <div><h2 class="text-2xl font-bold text-slate-900">${student.name} 학생</h2><p class="text-slate-500">${student.level}</p></div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-50 p-4 rounded-xl text-center"><div class="text-2xl font-bold text-brand-600">${student.booksCount}</div><div class="text-xs text-slate-400">총 독서량</div></div>
              <div class="bg-slate-50 p-4 rounded-xl text-center"><div class="text-2xl font-bold text-brand-600">85점</div><div class="text-xs text-slate-400">평균 집중도</div></div>
            </div>
          </div>
          <div class="flex-1 flex justify-center items-center"><reading-radar-chart data='${JSON.stringify(student.stats)}'></reading-radar-chart></div>
        </div>
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 class="text-lg font-bold text-slate-900 mb-6">최근 읽은 책</h3>
          <div class="space-y-2">${books || '<p class="text-center py-10 text-slate-400">기록이 없습니다.</p>'}</div>
        </div>
      </div>`;
  }
}
customElements.define('student-detail-view', StudentDetailView);

/**
 * Student Dashboard
 */
class StudentDashboard extends HTMLElement {
  connectedCallback() {
    const student = MOCK_DATA.students.find(s => s.id === MOCK_DATA.currentUser.id) || MOCK_DATA.students[0];
    const books = MOCK_DATA.books.filter(b => b.studentId === student.id).reverse().map(b => `
      <div class="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 mb-3 animate-fade-in shadow-sm">
        <img src="${b.cover}" class="w-12 h-16 object-cover rounded shadow-sm" />
        <div class="flex-1">
          <div class="flex justify-between"><h4 class="font-bold text-slate-800 text-sm">${b.title}</h4><span class="text-yellow-500 text-xs">⭐${b.rating}</span></div>
          <p class="text-[10px] text-slate-500">${b.author} | ${b.date}</p>
          <p class="text-xs text-slate-600 mt-1 line-clamp-1 italic">"${b.review}"</p>
        </div>
      </div>`).join('');
    const recs = MOCK_DATA.recommendations.map(r => `
      <div class="bg-white p-4 rounded-2xl border border-slate-100 card-lifted min-w-[160px]">
        <img src="${r.cover}" class="w-full h-40 object-cover rounded-xl mb-3 shadow-sm" />
        <h4 class="font-bold text-sm text-slate-800 line-clamp-1">${r.title}</h4>
        <p class="text-[10px] text-slate-400">${r.author}</p>
      </div>`).join('');
    this.innerHTML = `
      <div class="max-w-4xl mx-auto p-6 animate-fade-in pb-32">
        <header class="flex justify-between items-center mb-8">
          <div><h1 class="text-2xl font-bold text-slate-900">${student.name}의 독서 통장 📚</h1><p class="text-slate-500">벌써 ${student.booksCount}권의 책을 읽었네요!</p></div>
          <button onclick="document.querySelector('app-root').setView('login')" class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200">🚪</button>
        </header>
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8"><h3 class="text-lg font-bold text-slate-900 mb-4">나의 독서 성향</h3><div class="flex justify-center py-6"><reading-radar-chart data='${JSON.stringify(student.stats)}'></reading-radar-chart></div></div>
        <div class="mb-8"><h3 class="text-lg font-bold text-slate-900 mb-4">나의 독서 기록</h3><div class="max-h-[300px] overflow-y-auto no-scrollbar">${books || '<p class="text-center py-10 text-slate-400">아직 등록된 책이 없어요.</p>'}</div></div>
        <div class="mb-8"><h3 class="text-lg font-bold text-slate-900 mb-4">추천 도서 ✨</h3><div class="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">${recs}</div></div>
        <div class="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6"><button onclick="document.querySelector('book-modal').open()" class="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl shadow-xl hover:bg-brand-600 transition-all flex items-center justify-center gap-2 text-lg"><span>➕ 새로운 책 등록하기</span></button></div>
        <book-modal></book-modal>
      </div>`;
  }
}
customElements.define('student-dashboard', StudentDashboard);

/**
 * Book Modal Component
 */
class BookModal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.currentRating = 5;
    this.selectedBook = null;
  }
  open() { this.isOpen = true; this.currentRating = 5; this.selectedBook = null; this.render(); }
  close() { this.isOpen = false; this.render(); }
  setRating(r) { this.currentRating = r; this.renderStars(); }
  renderStars() {
    const container = this.querySelector('#star-container');
    if (!container) return;
    container.innerHTML = [1, 2, 3, 4, 5].map(i => `
      <span onclick="this.closest('book-modal').setRating(${i})" class="cursor-pointer text-3xl transition-transform hover:scale-110 ${i <= this.currentRating ? 'text-yellow-400' : 'text-slate-200'}">
        ★
      </span>`).join('');
  }
  handleSearch(val) {
    const results = this.querySelector('#search-results');
    if (val.length < 1) { results.classList.add('hidden'); return; }
    const filtered = RECOMMENDED_LIBRARY.filter(b => b.title.includes(val) || b.author.includes(val));
    if (filtered.length > 0) {
      results.innerHTML = filtered.map(b => `
        <div onclick="this.closest('book-modal').selectBook(${JSON.stringify(b).replace(/"/g, '&quot;')})" class="p-3 hover:bg-brand-50 cursor-pointer flex gap-3 items-center border-b border-slate-50 last:border-0">
          <img src="${b.cover}" class="w-10 h-12 rounded object-cover shadow-sm">
          <div><div class="font-bold text-sm">${b.title}</div><div class="text-[10px] text-slate-500">${b.author} | ${b.publisher}</div></div>
        </div>`).join('');
      results.classList.remove('hidden');
    } else {
      results.classList.add('hidden');
    }
  }
  selectBook(book) {
    this.selectedBook = book;
    this.querySelector('#book-title').value = book.title;
    this.querySelector('#search-results').classList.add('hidden');
  }
  addBook() {
    const title = this.querySelector('#book-title').value;
    const review = this.querySelector('#book-review').value;
    if (!title) { alert('책 제목을 입력해주세요.'); return; }
    const bookData = this.selectedBook || { title, author: '직접 입력', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200' };
    MOCK_DATA.books.push({
      id: MOCK_DATA.books.length + 1,
      studentId: MOCK_DATA.currentUser.id,
      title: bookData.title,
      author: bookData.author,
      cover: bookData.cover,
      date: new Date().toISOString().split('T')[0],
      review: review || '멋진 책이었습니다!',
      rating: this.currentRating
    });
    const s = MOCK_DATA.students.find(s => s.id === MOCK_DATA.currentUser.id);
    if (s) s.booksCount++;
    this.close();
    document.querySelector('app-root').setView('student');
  }
  connectedCallback() { this.render(); }
  render() {
    if (!this.isOpen) { this.innerHTML = ''; return; }
    this.innerHTML = `
      <div class="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white w-full max-w-2xl rounded-t-[32px] sm:rounded-[32px] max-h-[90vh] overflow-y-auto p-8 animate-scale-in">
          <div class="flex justify-between items-center mb-8"><h2 class="text-2xl font-bold text-slate-900">책 등록하기</h2><button onclick="this.closest('book-modal').close()" class="text-slate-400 hover:text-slate-600 p-2 text-xl">✕</button></div>
          <div class="space-y-6">
            <div class="relative">
              <label class="block text-sm font-bold text-slate-700 mb-2">도서 검색</label>
              <input type="text" id="book-title" placeholder="제목이나 저자를 입력하세요..." class="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-brand-500 rounded-2xl outline-none transition-all" oninput="this.closest('book-modal').handleSearch(this.value)">
              <div id="search-results" class="hidden absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden max-h-[200px] overflow-y-auto"></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label class="block text-sm font-bold text-slate-700 mb-2">한줄평</label><input type="text" id="book-review" placeholder="짧고 강렬하게!" class="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-500 outline-none transition-all"></div>
              <div><label class="block text-sm font-bold text-slate-700 mb-2">별점</label><div id="star-container" class="flex gap-2"></div></div>
            </div>
            <div><label class="block text-sm font-bold text-slate-700 mb-2">나의 감상</label><textarea id="book-content" rows="4" placeholder="책을 읽고 어떤 생각이 들었나요?" class="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-500 outline-none transition-all"></textarea></div>
            <button onclick="this.closest('book-modal').addBook()" class="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl shadow-lg hover:bg-brand-600 transition-all text-lg">등록 완료</button>
          </div>
        </div>
      </div>`;
    this.renderStars();
  }
}
customElements.define('book-modal', BookModal);

/**
 * Student Modal Component
 */
class StudentModal extends HTMLElement {
  constructor() { super(); this.isOpen = false; }
  open() { this.isOpen = true; this.render(); }
  close() { this.isOpen = false; this.render(); }
  addStudent() {
    const n = this.querySelector('#student-name').value, g = this.querySelector('#student-grade').value;
    if (!n || !g) { alert('이름과 학급을 입력해주세요.'); return; }
    MOCK_DATA.students.push({ id: MOCK_DATA.students.length + 1, name: n, grade: g, booksCount: 0, stats: [50, 50, 50, 50, 50, 50], level: '새로운 독서가' });
    this.close();
    document.querySelector('app-root').setView('teacher');
  }
  connectedCallback() { this.render(); }
  render() {
    if (!this.isOpen) { this.innerHTML = ''; return; }
    this.innerHTML = `
      <div class="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white w-full max-w-md rounded-[32px] p-8 animate-scale-in">
          <div class="flex justify-between items-center mb-8"><h2 class="text-2xl font-bold text-slate-900">새 학생 등록</h2><button onclick="this.closest('student-modal').close()" class="text-slate-400 hover:text-slate-600 p-2">✕</button></div>
          <div class="space-y-6">
            <div><label class="block text-sm font-bold text-slate-700 mb-2">학생 이름</label><input type="text" id="student-name" placeholder="이름을 입력하세요" class="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-brand-500 rounded-2xl outline-none transition-all"></div>
            <div><label class="block text-sm font-bold text-slate-700 mb-2">학년/반</label><input type="text" id="student-grade" placeholder="예: 3학년 1반" class="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-brand-500 rounded-2xl outline-none transition-all"></div>
            <button onclick="this.closest('student-modal').addStudent()" class="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl shadow-lg hover:bg-brand-600 transition-all">학생 추가하기</button>
          </div>
        </div>
      </div>`;
  }
}
customElements.define('student-modal', StudentModal);
