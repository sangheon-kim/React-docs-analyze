# Virtual DOM과 Internals(가상 DOM은 그러면 무엇일까? 왜 리액트는 가상돔을 선택한 것일까?에 대한 이유에 대해서도 알아보자)

> Virtual DOM and Internals (what are virtual DOMs then? Why did React choose Virtual Dome?Let's also find out why.)

- 가상 DOM에 대해서는 설명이 그렇게 많지 않아 리액트 공식문서가 아닌 구글링을 통해서 외부문서에서 정보를 수집후에 정리를 같이해보았습니다.

## Written by. Sangheon Kim(ksj8367@gmail.com)

-- 출처 : https://jeong-pro.tistory.com/210,

- 선수지식
  - DOM
  - 재조정(https://github.com/sangheon-kim/React-docs-analyze/blob/master/src/Pages/4.Reconciliation/README.md)

### DOM (Document Object Model)

- 출처 https://www.w3schools.com/js/js_htmldom.asp
- DOM은 문서 객체 모델이라고 하며, 브라우저가 생성하는 것을 말합니다.
  ![](img/sh-11-08-22-28.png)

- W3C(World Wide Web Constortium) 표준입니다.
- DOM은 문서에 엑세스하기 위한 표준을 정의한다.
- W3C DOM은 프로그램과 스크립트가 문서의 콘텐츠, 구조 및 스타일에 동적으로 엑세스하고 업데이트 할 수 있도록하는 플랫폼 및 언어 중립적 인터페이스입니다.

W3C DOM 표준 세부분

- Core DOM
  - 모든 문서 유형에 대한 표준 모델
- XML DOM
  - XML 문서의 표준 모델
- HTML DOM
  - HTML 문서의 표준 모델

### HTML DOM이란??

- HTML을 위한 표준 개체 모델 및 프로그래밍 인터페이스 이다. 다음을 정의합니다.
  - 개체로서의 HTML 요소
  - 모든 HTML 요소의 속성
  - 모든 HTML 요소에 엑세스 하는 방법
  - 이벤트의 모든 HTML 요소

**웹 페이지를 구성하는 요소를 구조화해서 나타낸 객체이자 이 객체를 이용해서 웹 페이지 구성요소를 제어할 수 있다**

## Virtual DOM이란?

- DOM을 추상화한 가상의 객체 라고 생각하면 좋을 것 같습니다.
- SPA(Single Page Application)특징으로 DOM 복잡도 증가에 따른 최적화 및 유지 보수가 더 어려워지는 문제를 해결하기 위해 나왔다. DOM을 반복적으로 직접 조작시 브라우저가 렌더링을 더 자주하게 되고 그에 따라 PC나 브라우저의 자원을 많이 소모하게 되는 문제를 해결하기 위해 나왔다고 할 수 있다.

```js
document.getElementById("hello").innerHTML = "hello world!";
document.body.style.background = "blue";
```

- 해당 DOM에 텍스트 노드를 삽입하고, 스타일을 변경하면서 벌써 DOM트리가 바뀌고 스타일이 변경됨에 따라 리플로우와 리페인트가 발생하게 되었다.
- 이전에 Fragment를 설명할때 이야기한적이 있는 주제가 있다. 렌더트리(DOM Tree + CSSOM)가 변경될 때마다 리플로우 리페인트가 발생한다고 이야기 했다. DOM을 변경하는 것이 문제가 아닌 리플로우 리페인트를 여러번하는 것이 문제가 된다.

### 과연 이것을 Virtual DOM이 어떻게 해결했을까??

- 변경 사항을 DOM에 직접 수정하는 것이 아니라 중간 단계로 Virtual DOM을 수정하고, Virtual DOM을 통해서 DOM을 수정하게 된다. 자 이때 과정이 Virtual DOM에 변경내역을 한 번에 모으고 실제 DOM과 변경된 Virtual DOM의 차이를 확인 후 변경된 부분을 찾은 후, 1번의 리렌더링으로 해결하는 것을 말합니다.

### 한계와 주의 사항

- 0.1초마다 화면에 데이터가 변경된다면? Virtual DOM으로 0.5초씩 모아가지고 렌더링을 적게할 수 있을까? -> 동시에 변경되는 것에 한해서만 렌더링이 된다.
- Virtual DOM이 무조건 빠른가? -> 아니다 리액트에서는 최적화를 위한 여러가지 성능 개선을 제공해준다. ShouldComponentUpdate나 React.memo 또는 PureComponent를 활용해서라도 반복 렌더링에 대해서 잘 제어해주는 것도 방법이다.
- Virtual DOM은 메모리에 존재한다
- Virtual DOM을 조작하는 것도 많은 컴포넌트를 조작하게 되면 오버헤드가 발생하게 된다. Virtual DOM이 무조건 좋은것은 아니다. DOM 직접 제어에 비해 상대적으로 비용이 저렴할뿐이다..

## React에서의 Virtual DOM과 내부

- Virtual DOM은 DOM을 추상화한 가상의 객체를 메모리에 만들어 놓은 것을 말하는데 DOM과 유사한 역할을 담당한다.
  그리고 DOM과 동기화하는 프로그래밍적인 개념이다. 이 과정을 <a href="https://github.com/sangheon-kim/React-docs-analyze/blob/master/src/Pages/4.Reconciliation/README.md">재조정</a>이라고 한다.
- 리액트에게 원하는 UI를 알려주면 알려준 상태와 일치하도록 합니다. 어트리뷰트를 조작하거나, 이벤트 처리, 수동 DOM 업데이트를 추상화한다.
- Virtual DOM은 React Elements와 연관된다. 컴포넌트 트리에 대한 추가 정보를 포함하기 위해 fibers 라는 내부 객체를 사용한다.

### Shadow DOM과 Virtual DOM?

- Shadow DOM
  - 웹 컴포넌트의 범위를 지정하고 변수 및 CSS 용으로 설계된 브라우저 기술이다.
  - virtual DOM은 브라우저 API 위에있는 Javascript 라이브러리에서 구현되는 개념

### React Fiber는 뭘까?

- React 16부터 나온 새로운 재조정 엔진입니다. Fiber의 주요 목표는 virtual DOM의 증분 렌더링을 활성화하는 것.

### 증분 렌더링

- 렌더링 작업을 여러 chunk로 분할하여 우선순위를 매기고 우선순위에 따라 여러 프레임에 걸쳐 실행할 수 있도록 하는 것인데, 결국 비동기 렌더링이 가능해진 것이다. 싱글 스레드 기반인 javascript에서는 비용이 큰 작업(시간이 오래 걸리는 작업)이 있을 경우 렌더링이 block 되는 경우가 간혹 있는데, fiber가 적용된 react에서는 적절한 스케쥴링을 통해서 렌더링 중인 메인 스레드를 block하지 않는다는 것이다.
