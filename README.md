# 라온제나 독서통장 (Raonjena Reading Bank)

즐거운 독서 활동을 기록하고 관리하는 웹 애플리케이션입니다.

## 주요 기능
- 교사/학생 로그인 시뮬레이션
- 독서 기록 등록 및 별점 시스템
- 독서 성향 분석 (레이더 차트)
- **Gemini AI 챗봇 도우미** (NEW!)

## 로컬 실행 및 테스트 방법

1.  **의존성 설치**:
    ```bash
    npm install
    ```

2.  **환경변수 설정**:
    - 프로젝트 루트 폴더에 `.env.local` 파일을 생성합니다.
    - [Google AI Studio](https://aistudio.google.com/)에서 발급받은 Gemini API 키를 입력합니다.
    ```env
    GEMINI_API_KEY=여기에_발급받은_API_키_입력
    ```

3.  **로컬 서버 실행**:
    - 프론트엔드: `public/index.html`을 라이브 서버로 실행
    - 백엔드(Vercel CLI 사용 시): `vercel dev`

## Vercel 배포 시 환경변수 등록 방법

Vercel에 배포한 후 AI 기능을 사용하려면 환경변수를 반드시 등록해야 합니다.

1.  Vercel 프로젝트 대시보드로 이동합니다.
2.  **Settings** > **Environment Variables** 메뉴를 클릭합니다.
3.  아래 항목을 추가합니다:
    -   **Key**: `GEMINI_API_KEY`
    -   **Value**: Google AI Studio에서 발급받은 API 키
4.  **Production, Preview, Development** 모든 환경을 체크하고 **Save**를 클릭합니다.
5.  환경변수 추가 후에는 프로젝트를 **다시 배포(Redeploy)**해야 변경 사항이 적용됩니다.

---

**주의**: 보안을 위해 Gemini API 키는 절대로 프론트엔드 코드(`public/main.js` 등)에 직접 노출하지 마세요. 반드시 서버리스 함수(`api/chat.js`)를 통해 처리해야 합니다.
