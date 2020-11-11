# 리액트 공식문서 파헤치기

## Written By Sangheon Kim

## 남에게 설명을 못하면.. 아직 잘 모르는 것이라고 생각되어 공식문서를 읽고 정리하면서 설명하는 Repo입니다. 그리고 제 글 보시는 분들과 함께 여러가지 팁도 공유하고, 저도 들을 수 있으면 좋겠다는 생각이 들었습니다:) Happy Hacking 하세요:)

- Stage1. React 사용자 정의 컴포넌트 종류별 정리

  - 리액트에서 적절한 사용자 정의 컴포넌트 생성을 위한 사용자 정의 컴포넌트의 종류별 차이를 알아보자. (React.Component, React.PureComponent, Function Component)
  - > Let's look at the differences in the types of user-defined components for creating the appropriate user-defined components in the react. (React.Component, React.PureComponent, Function Component)
    > <br /> > <a href="https://github.com/sangheon-kim/React-docs-analyze/blob/master/src/Pages/1.ComponentType/README.md">Go to Learn</a>

- Stage2. React 엘리먼트 변환 및 생성

  - React 엘리먼트를 변환 하거나 생성시에 쓰는 메서드를 알아보자
  - > Let's look at the methods used to convert or create React elements. <br /> > <a href="https://github.com/sangheon-kim/React-docs-analyze/blob/master/src/Pages/2.ElementConversion/README.md">Go to Learn</a>

- Stage3. React.Fragment 와 자바스크립트의 Fragment에 대해 알아보자

  - > Let's find out about React.Fragment and JavaScript' Fragment.<br /> > <a href="https://github.com/sangheon-kim/React-docs-analyze/blob/master/src/Pages/3.Fragments/README.md">Go to Learn</a>

- Stage4. Reconciliation 을 보면서 어떻게 리액트는 변화에 대해서 감지하고 최신의 변경된 사항들을 보여줄 수 있는지에 대해 깊이 있게 알아봅시다. 키를 왜 할당하는가? 그리고 키값은 어떤 값을 넣어줘야하는가??

  - > Let's look at Reconciliation and learn more about how react can detect changes and show the latest changes. Why assign keys? And what value should I put in the key value?
    > <br /> > <a href="https://github.com/sangheon-kim/React-docs-analyze/tree/master/src/Pages/4.Reconciliation/README.md">Go to Learn</a>

- Stage5. Virtual DOM과 Internals(가상 DOM은 그러면 무엇일까? 왜 리액트는 가상돔을 선택한 것일까?에 대한 이유에 대해서도 알아보자)

  - > Virtual DOM and Internals (what are virtual DOMs then? Why did React choose Virtual Dome?Let's also find out why.)
    > <br /> <a href="https://github.com/sangheon-kim/React-docs-analyze/tree/master/src/Pages/5.VirtualDOM/README.md">Go to Learn</a>

- Stage6. Ref와 DOM (Ref와 DOM을 이해해보자... ref는 언제 쓰는것이 좋으며, 어떠한 기능까지도 제공해주며, querySelector나 getElementBy~ 같은 DOM API를 쓰면 안되는지 등과 여러가지 기능을 제공해주는 ref에 대해서 알아봅시다.)

  - > Ref & DOM (Let's understand Ref and DOM... Let's find out when to use the ref, what functions to provide, and whether to not use DOM APIs such as QuerySelector or getElementBy~)
    > <br /> <a href="https://github.com/sangheon-kim/React-docs-analyze/blob/master/src/Pages/6.Ref/README.md">Go to Learn</a>

- Stage7. ref 전달하기(함수 컴포넌트인 하위 컴포넌트에게 ref를 전달해보자) - (useImperativeHandle, forwardRef)
  - > Ref forwarding (let's deliver the ref to the subcomponent that is the function component) - (useImproactiveHandle, forwardRef)
    > <br /> <a href="https://github.com/sangheon-kim/React-docs-analyze/tree/master/src/Pages/7.ForwardingRef">Go to Learn</a>

### 중간 수정 사항

`20201112 - 00:04 관련 예제 코드 스와이퍼모듈 활용할때 사용한 Element Conversion과 ref 코드 Stage2에 가장 하단에 올려놓았습니다:) 참고 하시면 좋을 듯하여 추가드립니다.`
