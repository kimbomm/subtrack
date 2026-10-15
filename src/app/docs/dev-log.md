## Vitest 설정

### 완료한 것

- vitest, @vitest/coverage-v8, vite-tsconfig-paths 설치
- environment를 node로 설정 (도메인 로직은 DOM이 필요 없음)
- coverage 임계값 90% 설정 (src/domain 기준)

### 배운 것

- toBeCloseTo: 부동소수점 오차를 허용하는 비교. 두 번째 인자는 정밀도가 아니라 소수점 자릿수
- test.each: 입력 표로 여러 케이스를 한 번에 검증. 많아지면 규칙별로 나눠야 가독성이 유지됨
- 내부 계산은 toBeCloseTo, 출력 정책은 반올림 후 toBe로 검증

### 막혔던 부분

- toBe: 부동소수점에 대한 오차를 인지하지 못하고 비교 및 오류 발생.
- 부동소수점(Float Point)이란?
  컴퓨터가 정수와 소수같은 실수를 표현하기 위해 사용되는 방식
  유저가 사용하는 10진수를 컴퓨터가 이해하는 2진수로 표현할 수 없는 값이 존재. 따라서 저장공간에 따른 가장 근사치로 저장을 한다.
  ex 0.1 + 0.2 = 0.30000000000000004

## Vitest 설정, TDD로 toMonthlyCost 구현

### 완료한 것

- Vitest 설정, 커버리지 임계값 90% (src/domain)
- toMonthlyCost 테스트 5개를 구현 전에 작성하고 실패를 확인
- 구현 후 전체 통과, 스모크 테스트 제거

### 배운 것

- TDD는 Red → Green → Refactor 순서. 실패를 직접 봐야 테스트가 연결되었다고 확신할 수 있음
- 내부 계산은 toBeCloseTo, 반올림은 출력 정책으로 분리 (10/19에 roundWon으로 처리)

### 내일 이후

- 1주차 4일(10/18 일): toYearlyCost, 교차 검증 테스트, 기본기(클로저, 이벤트 루프)
