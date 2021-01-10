# Context

- Context를 사용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있다.
- Context를 이용하면, 트리 단계마다 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 이러한 값을 공유할 수 있다.

## 언제 context를 써야 할까?

- context는 React 컴포넌트 트리 안에서 전역적이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법이다. 그러한 데이터로 현재 로그인한 유저, 테마, 선호하는 언어 등이 있다.
- 필자는 주로 기획쪽에서 요청하는 것이 PC에서는 일정 너비를 주어주고, 해당 너비보다 줄면 스크롤이 생기게하고, 모바일로 접속시에는 모바일 UI에 맞게 해달라고 요청 받을 때가 많았다. 그리고 API를 보낼때에도 PC인지, 모바일인지에 따라 다른 API 요청을 받아야할때 등등 그럴떄 UserAgent값을 이용해서 분기를 치는데 매번 UserAgent를 만들어주지 않고 Context를 하나 생성해서 사용하고 있다.

`context를 사용하지 않고, 다른 기타 상태 관리 라이브러리를 사용하지 않는 경우에는 트리 구조 상 App - TodoPage - TodoList - ListItem`에서 만약 ListItem만 item object를 받으면 되는 것을 결국 App에서 TodoPage로 넘겨주고 TodoList로 넘겨줘야 하는 경우가 생긴다. 하지만 Context를 사용하면 ListItem에서 Context를 사용하면 중간 엘리먼트들에게 props를 넘겨주지 않아도 된다.

## Context를 사용하기 전에 고려할 것.

- context의 주된 용도는 다양한 레벨에 중첩된 많은 컴포넌트들에게 데이터를 전달하는 것이다.
- 여러 레벨에 걸쳐 props를 넘기는 걸 대체하는 데에 context보다 <a href="https://ko.reactjs.org/docs/composition-vs-inheritance.html">컴포넌트 함성</a>이 더 간단한 해결책일 수 있다.

`간단하게 보는 컴포넌트 함성`

```jsx

<Page user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

> 지금 만약 Link와 Avatar 컴포넌트에게 user와 avatarSize라는 props를 전달행 하는 `Page`컴포넌트를 생각해보자.

- 실제 사용되는 곳은 Avatar 컴포넌트 뿐인데 user와 avatarSize props를 여러 단계에 걸쳐 보내줘야 한다는게 번거러울 수 있다.

`Avatar 컴포넌트 자체를 넘겨주면` context를 사용하지 않고, 이를 해결할 수 있다.

```jsx
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 이제 이렇게 쓸 수 있습니다.
<Page user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<PageLayout userLink={...} />
// ... 그 아래에 ...
<NavigationBar userLink={...} />
// ... 그 아래에 ...
{props.userLink}
```

> 그 아래에 표시는 트리구조 상 page -> pageLayout -> NavationBar -> Link -> Avatar이런식으로 있다고 보면된다.
>
> - `하지만 이방식 또한 복잡한 로직을 상위로 옮기면, 이 상위 컴포넌트들은 더 난해해지기 마련이고 하위 컴포넌트들은 필요 이상으로 유연해져야 한다.`

- 같은 데이터를 트리 안 여러 레벨이 있는 많은 컴포넌트에게 주어야 할 경우도 있을 수 있다. 이 때 데이터 값이 변할 때마다 모든 하위 컴포넌트에게 널리 `broadcast`하는 것이 context이다. 흔한 예시로 선호 로케일, 테마, 데이터 캐시 등을 관리하는 데에 있어서는 일반적으로 context를 사용하는 것이 가장 편리하다.
