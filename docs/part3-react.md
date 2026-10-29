# Part 3 — React 컴포넌트 테스트 (L09 ~ L15)

프론트엔드 실무에서 가장 많이 쓰는 부분이다. "사용자가 보는 방식으로 테스트한다"를 기준으로 삼는다.
도구: React Testing Library, `@testing-library/user-event`, `@testing-library/jest-dom`, jsdom, MSW

---

## L09 RTL 기초와 쿼리 우선순위

**목표**: 컴포넌트 테스트 환경을 설정하고, 접근성 기반 쿼리로 요소를 찾는다.

**이론 핵심**
- 쿼리 우선순위: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- `getBy` (없으면 에러) / `queryBy` (없으면 null, "없음"을 검증할 때) / `findBy` (비동기로 기다림)
- 접근 가능한 이름(accessible name)이 무엇으로 정해지는지: 텍스트, `aria-label`, `<label>`
- 역할로 찾으면 접근성이 깨질 때 테스트도 깨진다 → 테스트가 접근성 검사를 겸한다

**예측 질문 예시**
- `<div onClick>삭제</div>`를 `getByRole('button', { name: '삭제' })`로 찾을 수 있을까?

**실습**
1. 설정: jsdom, jest-dom, setup 파일. 설정은 학습자가 공식 문서를 보고 직접 한다 (막히면 힌트).
2. [레드 통과] Claude가 `SubscriptionCard`(이름, 주기, 월 환산 금액 표시)의 실패하는 테스트를 준다. 학습자가 컴포넌트를 구현한다. 테스트는 `getByRole`/`getByText`만 쓴다.
3. [테스트 리팩터] Claude가 `getByTestId`와 `container.querySelector`로 가득한 테스트를 준다. 학습자는 접근성 쿼리로 바꾸고, 그 과정에서 컴포넌트의 접근성 문제를 함께 고친다.

**통과 기준**
- 테스트에 `getByTestId`, `querySelector`가 없다
- 금액이 `4,333원`처럼 표시 형식까지 검증된다

**면접 질문**: "`getByTestId`를 피하는 이유는?"

---

## L10 사용자 상호작용

**목표**: `user-event`로 클릭, 입력, 키보드 동작을 테스트한다.

**이론 핵심**
- `userEvent.setup()` 후 `await user.click()`, `user.type()`, `user.keyboard()`, `user.tab()`
- `fireEvent`와 `user-event`의 차이 (실제 사용자 이벤트 순서를 흉내 내는가)
- 상태 변화는 화면 결과로 검증한다 (state를 직접 들여다보지 않는다)

**실습**
1. [TDD] `SubscriptionList`: 목록 표시, 월 합계 표시, 주기 필터(전체/월간/연간), 삭제 버튼. 테스트부터 하나씩.
2. 키보드만으로 필터 변경과 삭제가 가능한지 테스트한다.

**통과 기준**
- 필터 변경 시 목록과 합계가 함께 바뀌는 것이 검증된다
- 빈 목록 상태 문구가 테스트되어 있다

**면접 질문**: "컴포넌트 테스트에서 무엇을 검증하고 무엇을 검증하지 않나요?"

---

## L11 폼 테스트

**목표**: 입력 검증, 에러 메시지, 제출을 테스트한다. 검증 로직과 UI 테스트를 나눈다.

**이론 핵심**
- 검증 규칙은 순수 함수(또는 Zod 스키마)로 빼서 단위 테스트, 폼 테스트는 "에러가 사용자에게 보이는가"에 집중
- 에러 메시지 연결: `aria-invalid`, `aria-describedby` → `toHaveAccessibleDescription`
- 제출 콜백은 `vi.fn()`으로 받아서 호출 인자를 검증

**실습**
1. [TDD] 구독 입력 스키마(Zod)를 테스트부터 작성: 이름 필수, 금액 0 이상 정수, 주기 3종, 날짜 형식.
2. [TDD] `SubscriptionForm`: 잘못된 입력 시 필드별 에러 표시, 올바른 입력 시 `onSubmit` 호출, 제출 중 버튼 비활성화.

**통과 기준**
- 스키마 테스트와 폼 테스트가 같은 규칙을 중복 검증하지 않는다 (폼 테스트는 대표 케이스 1~2개)
- 에러 메시지가 입력 필드와 접근성으로 연결되어 있다

**면접 질문**: "폼 검증 로직은 어떻게 테스트하나요? 단위 테스트와 컴포넌트 테스트의 역할 분담은?"

---

## L12 커스텀 훅 테스트

**목표**: 훅을 직접 테스트할지, 사용하는 컴포넌트로 테스트할지 판단한다.

**이론 핵심**
- `renderHook`, `act`, `result.current`
- 재사용되는 훅(라이브러리처럼 쓰는 훅)은 직접, 특정 컴포넌트 전용 훅은 컴포넌트로 테스트
- 훅 테스트가 내부 상태 구조에 묶이지 않게 하기

**실습**
1. [TDD] `useDebouncedValue(value, ms)` — L08의 가짜 타이머 지식 활용.
2. [테스트 리팩터] Claude가 `useSubscriptionFilter` 훅을 내부 구현까지 들여다보며 테스트한 코드를 준다. 학습자는 이것을 컴포넌트 테스트로 옮길지 판단하고 이유를 말한 뒤 수정한다.

**통과 기준**
- 훅을 직접 테스트한 것과 컴포넌트로 테스트한 것 각각의 이유를 말할 수 있다

**면접 질문**: "커스텀 훅은 어떻게 테스트하나요?"

---

## L13 MSW로 네트워크 모킹

**목표**: `fetch`를 직접 모킹하지 않고 네트워크 경계에서 가로챈다.

**이론 핵심**
- MSW: 요청을 네트워크 수준에서 가로챔 → 컴포넌트는 진짜 `fetch`를 쓴다
- `setupServer`, `http.get`, `HttpResponse.json`, 테스트별 `server.use()`로 덮어쓰기
- `onUnhandledRequest: 'error'`로 처리 안 된 요청을 잡기
- 핸들러는 테스트, 개발 서버, (나중에) Storybook에서 재사용 가능

**예측 질문 예시**
- `vi.spyOn(global, 'fetch')`로 모킹하면 URL 오타 버그를 잡을 수 있을까?

**실습**
1. 설정: MSW 서버, 기본 핸들러(목록 조회, 생성).
2. [레드 통과] Claude가 데이터를 불러오는 `SubscriptionsPage`(클라이언트 컴포넌트)의 실패하는 테스트를 준다: 로딩 → 목록 표시.
3. [TDD] 서버 에러(500), 빈 목록, 생성 후 목록 갱신 케이스를 추가한다.

**통과 기준**
- 테스트 코드에 `fetch` 모킹이 없다
- 에러 상태에서 "다시 시도"가 동작하는 것이 검증된다

**면접 질문**: "API를 호출하는 컴포넌트는 어떻게 테스트하나요?"

---

## L14 비동기 UI와 흔한 함정

**목표**: 비동기 테스트가 흔들리는 원인을 알고 고친다.

**이론 핵심**
- `findBy` vs `waitFor` — `waitFor` 안에서는 검증만, 부수효과(클릭 등) 넣지 않기
- `act(...)` 경고의 뜻: 테스트가 끝난 뒤에 상태가 바뀌었다
- 사라짐 검증: `waitForElementToBeRemoved`, `queryBy` + `not.toBeInTheDocument()`
- 테스트 간 상태 누수: MSW `resetHandlers`, 캐시(React Query 등) 초기화

**실습**
1. [버그 잡기] Claude가 문제 있는 비동기 테스트 4개를 준다 (가끔 실패, act 경고, 거짓 통과, 다음 테스트에 영향). 학습자는 각각 원인을 말하고 고친다.

**통과 기준**
- `pnpm test`를 10번 연속 돌려도 결과가 같다 (Claude가 확인)
- 콘솔에 act 경고가 없다

**면접 질문**: "가끔 실패하는 테스트(flaky test)를 만난 적 있나요? 어떻게 해결했나요?"

---

## L15 Next.js 경계: Route Handler와 서버 컴포넌트

**목표**: App Router 환경에서 어느 층을 어떤 도구로 테스트할지 정한다.

**이론 핵심**
- Route Handler는 `Request`를 받아 `Response`를 돌려주는 함수 → 단위 테스트 가능
- 비동기 서버 컴포넌트는 RTL로 테스트하기 어렵다 → 로직을 함수로 빼서 단위 테스트, 화면은 E2E
- 클라이언트 컴포넌트는 RTL + MSW
- 에러 응답 형식 통일: `{ error: { code, message, fields? } }`

**실습**
1. [TDD] `GET/POST /api/subscriptions` Route Handler. 정상 201, 검증 실패 400 + 필드 에러, 목록 조회. L07의 서비스와 L11의 스키마를 재사용한다.
2. [리뷰] SubTrack의 각 파일을 "단위 / 컴포넌트 / E2E 중 어디서 테스트할지" 표로 정리하고 Claude와 토론한다.

**통과 기준**
- Route Handler 테스트가 서버를 띄우지 않고 실행된다
- 테스트 전략 표가 PROGRESS.md 또는 `docs/`에 있다

**면접 질문**: "Next.js App Router에서 서버 컴포넌트는 어떻게 테스트하나요?"

**Part 3 마무리**: PROGRESS.md에 "회사에서는 이렇게 적용하겠다" 3줄 작성
