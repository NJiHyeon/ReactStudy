# React·JSX 기초: 컴포넌트 태그, 대문자 규칙, 이벤트·링크

## 1. JSX에서 컴포넌트 쓰기

- 내가 만든 컴포넌트 이름이 `A`이면 JSX에서는 **` <A /> `** 또는 **` <A></A> `** 로 씁니다.
- HTML 태그와 같이 “태그 문법”으로 쓰지만, 실제로는 `React.createElement(A, …)`에 가까운 **신택스 슈가(syntactic sugar)** 입니다.

### Fragment (`<>…</>`)

- **` <>…</> `** 는 **Fragment(프래그먼트)** 입니다. DOM에 불필요한 래퍼 노드를 추가하지 않고, 여러 자식만 묶을 때 사용합니다.
- 긴 형태: **` <React.Fragment>…</React.Fragment> `** (key가 필요할 때는 이 형태만 사용).

---

## 2. 꼭 대문자(PascalCase)로 시작해야 하나?

**JSX에서 `<이름 />`처럼 태그로 쓸 때는 “커스텀 컴포넌트 = 대문자로 시작”이 규칙에 가깝습니다.**

| 태그 형태 | 의미 |
|-----------|------|
| 소문자 시작 (`<div />`, `<span />`) | 브라우저 **내장 HTML 요소** |
| 대문자 시작 (`<MyForm />`) | **직접 만든(또는 import한) React 컴포넌트** |

- `<myform />`처럼 소문자만 쓰면 React는 이를 **HTML 태그**로 해석하려 하므로, 내 컴포넌트로 연결되지 않습니다.
- 변수에 컴포넌트를 담은 뒤 `createElement`로 쓰는 방식은 별도이나, 일반적인 JSX 작성에서는 **컴포넌트 이름·태그 모두 PascalCase**가 표준입니다.

---

## 3. `onSubmit`의 `event`는 무엇인가?

```tsx
<form
  onSubmit={(event) => {
    event.preventDefault()
  }}
>
```

- **`event`** 는 이름일 뿐이며, `e` 등 다른 이름으로 받아도 됩니다.
- 폼이 제출될 때(버튼 `type="submit"`, Enter 등) React가 **`onSubmit` 핸들러를 호출하면서 첫 번째 인자로 이벤트 객체**를 넘깁니다. 그 객체는 브라우저 네이티브 이벤트를 감싼 **SyntheticEvent**에 해당합니다.
- **`event.preventDefault()`** : HTML 폼의 기본 동작(페이지 이동·새로고침 등)을 막습니다. SPA에서는 보통 이걸 호출한 뒤 fetch 등으로 직접 처리합니다.

즉, “마법처럼 생기는 값”이 아니라 **제출 이벤트가 발생했을 때 React가 규약대로 넣어 주는 첫 번째 인자**입니다.

---

## 4. `<a>` 의 `target="_blank"`

- **`target="_blank"`** : 링크를 **현재 탭이 아닌 새 탭(또는 새 창)**에서 엽니다.
- **`target="_self"`** : 기본값, **같은 탭**에서 이동.

외부 사이트를 새 탭으로 열 때는 보안·프라이버시를 위해 아래 조합을 자주 씁니다.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
```

- **`noopener`** : 새 페이지가 `window.opener`로 원래 페이지를 조작하기 어렵게 함.
- **`noreferrer`** : 리퍼러를 넘기지 않음.

---

## 5. `onSubmit`처럼 “호출될 때 인자가 정해져 있는” 경우

**원리:** 누가 내 함수를 호출하느냐에 따라 인자가 정해집니다. React/브라우저가 호출하면 그쪽 규약을 따릅니다.

### 이벤트 핸들러 (대부분 첫 인자 = SyntheticEvent)

예: `onClick`, `onSubmit`, `onChange`, `onInput`, `onFocus`, `onBlur`, `onKeyDown`, `onMouseMove`, `onScroll` …

```tsx
<button type="button" onClick={(e) => { /* e */ }} />
<input onChange={(e) => { /* e.target.value */ }} />
```

### ref 콜백

```tsx
<div ref={(node) => { /* 마운트 시 DOM 노드, 언마운트 시 null */ }} />
```

### “자동”이 아닌 경우

- `onClick={() => foo(123)}` → 인자는 **내가 클로저로 넣은 값**.
- 커스텀 컴포넌트의 `onRowClick={(row) => …}` → **`row`는 그 컴포넌트 구현이 호출할 때 넘겨 주는 규약**.

### 표준 API가 콜백에 넘기는 인자

- `array.map((item, index) => …)` → 배열 API가 `item`, `index`를 넣어 호출.
- `setState((prev) => …)` → React가 이전 상태를 `prev`로 넣어 호출.

---

## 한 줄 요약

| 주제 | 요약 |
|------|------|
| 컴포넌트 JSX | `<MyComponent />` |
| Fragment | `<>…</>`, DOM 래퍼 없이 묶기 |
| 대문자 | JSX 태그로 쓸 컴포넌트는 PascalCase |
| `onSubmit`의 `event` | 제출 시 React가 넘기는 이벤트; `preventDefault`로 기본 제출 방지 |
| `target="_blank"` | 새 탭에서 열기; 외부 링크는 `rel="noopener noreferrer"` 권장 |
| 인자 규칙 | 이벤트 핸들러는 보통 이벤트 객체, ref는 노드/null, 그 외는 “호출하는 쪽” 규약 |
