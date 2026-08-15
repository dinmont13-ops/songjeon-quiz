# 송전전기원 필기 문제풀이

Next.js(App Router) 기반 4지선다 객관식 문제풀이 웹앱입니다. Vercel에 바로 배포할 수 있는 구조입니다.

## 폴더 구조

- `data/questions.js` — 문제 데이터 (현재는 샘플 5문제, 실제 문제로 교체 예정)
- `components/Quiz.js` — 문제풀이 로직 (정답확인, 점수, 랜덤출제)
- `app/page.js`, `app/layout.js` — 페이지 구성
- `app/globals.css` — 스타일

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

## Vercel 배포 방법

### 방법 A: GitHub 연동 (추천)
1. 이 폴더를 GitHub 저장소로 push
2. https://vercel.com 에서 "Add New Project" → 해당 저장소 선택
3. Framework는 Next.js로 자동 인식됨 → Deploy 클릭

### 방법 B: Vercel CLI로 바로 배포
```bash
npm i -g vercel
vercel
```
안내에 따라 로그인 후 진행하면 배포 URL이 생성됩니다.

## 문제 데이터 교체 방법

`data/questions.js` 파일을 열어 아래 형식으로 문제를 추가/수정하세요.

```js
{
  id: 6,
  question: "문제 내용",
  options: ["보기1", "보기2", "보기3", "보기4"],
  answerIndex: 0, // 정답 보기의 인덱스 (0=보기1, 1=보기2, ...)
  explanation: "해설 (선택사항)",
}
```

문제 파일(엑셀/워드/텍스트 등)을 주시면 이 형식으로 변환해서 자동으로 채워드릴 수 있습니다.

## 다음 단계로 논의할 만한 것들

- 실제 보유하신 송전전기원 문제 데이터 반영
- 과목/챕터별 분류 및 필터
- 오답노트 / 다시 풀기(틀린 문제만)
- 로컬 저장(진행상황 기억) 또는 회원 기능
