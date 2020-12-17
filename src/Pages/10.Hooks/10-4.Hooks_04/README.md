# Hook의 규칙

- Hook은 Javascript gkatn.

## Written By Sangheon Kim(ksj8367@gmail.com)

## 최상위에서만 Hook을 호출해야 한다.

- 반복문, 조건문 혹은 중첩된 함수 내에서 Hook을 호출하지말자. 이 규칙을 이용해야 Hook이 항상 동일한 규칙에 맞춰서 Hook이 호출되는 것을 보장한다.
- 위 말이 이해가 안되는 사람들을 위한 설명이다.

```tsx
const clienUpCaseHook = () => {
  const [displaySize, setDisplaySize] = React.useState({
    width: 0,
    height: 0,
  });

  // ...
  // 반복문에서 Hook을 사용한 경우
  for (let i = 0; i < 100; i++) {
    const [number, setNumber] = React.useState(0);
    React.useEffect(() => {
      console.log("Hello");
    }, []);
  }

  // 조건문 안에서 Hook을 적용한 사례
  if ([조건문]) {
    const [number, setNumber] = React.useState(0);
    React.useEffect(() => {
      console.log("Hello");
    }, []);
  }

  // 중첩함수에 Hook을 사용한 사례
  function function2() {
    const [number, setNumber] = React.useState(0);
    React.useEffect(() => {
      console.log("Hello");
    }, []);
  }
  // ...
};
```

> 우선 무엇이 문제인것인가 생각해보자. 함수 컴포넌트의 최상위 영역에다가 지정을 하지 않고, 지금은 블록 레벨 스코프 또는 함수 컴포넌트에서 별도로 정의한 함수인 중첩 함수의 함수레벨 스코프에 Hook을 사용하였다. const, let은 함수 레벨 스코프랑 블록레벨 스코프 모두 스코프 영역으로 인식하기에 우선 참조가 불가능할 것이다. 렌더링 하는 부분에서 해당 스코프를 참조가 불가능하다.

- 반복문이 동작하게 되거나 조건문안에서 Hook을 넣어서 개발시 내가 원하는 동작방식으로 동작이 안될 수 있다. 그런 경우를 살펴 보자.

> 이전 렌더에서 3번째 실행된 훅과 현재 렌더에서 3번째 실행된 훅은 같은 훅이라는 가정을 하기에 stateless한 함수에서 state를 저장하는게 가능한 것이다. 그래서 이런 경우를 가정해도 반복문이나 조건문에 의해 훅의 실행횟수가 변하게되면 이런 규칙들이 깨지게 된다. 따라서 최상위 블럭에 Hook을 사용하라는 이야기다.
> Donghyeon Kim님의 피드백

## 오직 React 함수 내에서 Hook을 호출해야 한다.

- Hook을 일반적인 Javascript 함수에서 호출하지 말자.
- React 함수 컴포넌트에서 Hook을 호출하자.
- Custom Hook에서 호출을 하자.(이 부분은 다음 자신만의 Hook 만들기에서 살펴보자.)

## ESLint 플러그인

- Eslint 플러그인을 사용하게 되면 위에서 이야기한 두가지 규칙을 강제할 수 있다.

```bash
$ npm install eslint-plugin-react-hooks --save-dev
```

```json
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
}
```

## 설명

- 바로 이전장에서 설명했듯이 한 컴포넌트안에서 State나 Effect Hook을 여러개 사용 가능하다.

```tsx
function Form() {
  // 1. name이라는 state 변수를 사용하세요.
  const [name, setName] = useState("Mary");

  // 2. Effect를 사용해 폼 데이터를 저장하세요.
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  // 2-1. () 그룹 연산자는 함수 표현식으로 만들어주어 익명함수가 가능하다.
  useEffect(() => {
    localStorage.setItem("formData", name);
  });

  // 3. surname이라는 state 변수를 사용하세요.
  const [surname, setSurname] = useState("Poppins");

  // 4. Effect를 사용해서 제목을 업데이트합니다.
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // 4-1. function 함수 표현식으로 사용해도 익명함수는 가능하다.
  useEffect(function () {
    document.title = name + " " + surname;
  });

  // ...
}
```

> 위의 코드를 동작 순서에 맞게 한번 볼까?

```tsx
// ------------
// 첫 번째 렌더링
// ------------
useState("Mary"); // 1. 'Mary'라는 name state 변수를 선언합니다.
useEffect(persistForm); // 2. 폼 데이터를 저장하기 위한 effect를 추가합니다.
useState("Poppins"); // 3. 'Poppins'라는 surname state 변수를 선언합니다.
useEffect(updateTitle); // 4. 제목을 업데이트하기 위한 effect를 추가합니다.

// -------------
// 두 번째 렌더링
// -------------
useState("Mary"); // 1. name state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(persistForm); // 2. 폼 데이터를 저장하기 위한 effect가 대체됩니다.
useState("Poppins"); // 3. surname state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(updateTitle); // 4. 제목을 업데이트하기 위한 effect가 대체됩니다.

// ...
```

> StateHook에서 초기화 과정을 거치면서 State가 변경됨에 따라 Effect 함수가 발동된다. 그래서 persistForm 함수가 실행될 것이다. 그리고, 그 밑에 지정해놓은 State Hook에서 Surname을 초기화 해주고 그 아래에 Effect Hook에 지정해놓은 updateTitle함수가 발동된다.

`여기서 알 수 있는건, 동작 순서를 신경쓰기 위해서라도 stateHook과 Effect Hook의 사용 위치도 잘 작성해놓아야 한다는 이야기다. 항상 동시다발적으로 실행되는 것이 아니라는 이야기다. 자바스크립트는 인터프리터 언어이다. 위에서부터 한줄씩 읽어 내려온다.`

```tsx
// 🔴 조건문에 Hook을 사용함으로써 첫 번째 규칙을 깼습니다
if (name !== "") {
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });
}
```

> 조건을 성립할 경우에는 동작순서가 보장되지만 만약 name에 대한 조건문이 성립하지 않는다면 그때부터는 동작 순서가 틀려지게 될 것이고, 내가 원치 않는 동작 순서로 동작할 수 있다.
> 조건부 실행을 원한다면, Effect Hook에서 조건문을 넣어주어, 조건부 Effect를 실행 시켜주자.

```tsx
useEffect(function persistForm() {
  // 👍 더 이상 첫 번째 규칙을 어기지 않습니다
  if (name !== "") {
    localStorage.setItem("formData", name);
  }
});
```

> 위의 ESLint 플러그인을 사용하면 이런 예기치않은 동작을 일으키는 개발자의 실수를 줄여줄 수 있는 Hook의 규칙을 강제화할 수 있게 됩니다.
