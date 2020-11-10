/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ChatBoard from "./ChatBoard/ChatBoard";
import "./Container.scss";

/**
 *
 * @description 메시지 추상화 인터페이스 (Message 클래스의 Implements로 사용)
 * @interface IMessage
 */
interface IMessage {
  /** 메시지 인덱스 */
  index: number;
  /** 메시지 작성자 */
  author: string;
  /** 메시지 내용 */
  content: string;
  /** 메시지 시간 */
  time: string;
  /** 수정 */
  isEdit: boolean;
  /** 메시지 삭제*/
  isDelete: boolean;
}

/**
 *
 * @description 메시지 관련 인터페이스 생성자
 * @class Message
 * @implements {IMessage}
 */
export class Message implements IMessage {
  static number: number = 0; // index값을 다른 인스턴스들도 공유받아야 하기에 static으로 설정
  isDelete: boolean;
  isEdit: boolean;
  time: string;
  index: number;

  // 깨알팁으로 constructor에 매개변수에 미리 접근지정자와 타입을 같이 명시해두면, 자동으로 초기화도해준다.
  constructor(public author: string = "anonymous", public content: string = "") {
    this.isDelete = false;
    this.isEdit = false;
    this.time = `${new Date().getHours() >= 12 ? "오후" : "오전"} ${
      new Date().getHours() >= 12 ? new Date().getHours() - 12 : new Date().getHours()
    }:${new Date().getMinutes() >= 10 ? new Date().getMinutes() : "0" + new Date().getMinutes()}`;
    this.index = ++Message.number;
  }
}

const Container: React.FC = () => {
  // 튜플 타입 방식으로 선언
  // TODO: SetStageAction 부분 타입 any 말고 적절한 타입 찾기
  const [messages, setMessages]: [IMessage[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]); // 메시지 인스턴스 담아줄 배열
  const [nickName, setNickName]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState(""); // 닉네임을 담아줄 배열 선언
  const [message, setMessage]: [string, React.Dispatch<React.SetStateAction<string>>] = React.useState(""); // 메시지 내용

  const _chatBoard: React.RefObject<HTMLDivElement> = React.createRef(); // _chatBoard DOM에 접근하기 위한 Ref 생성
  const _message: React.RefObject<HTMLInputElement> = React.createRef(); // _message DOM에 접근하기 위해 Ref 생성
  const _nickname: React.RefObject<HTMLInputElement> = React.createRef(); // _nickname DOM을 건드리기 위해 Ref 생성

  React.useEffect(() => {
    // 옵셔널 체이닝 연산자 (undefined나 null이 아닌 경우에만 실행 (실행이 안되면 undefined 반환))
    _nickname.current?.focus(); // 초기 마운트시에는 닉네임으로 포커싱이 이동되게 합니다.
    // _message.current?.focus(); // 마운트가 되고 _message.current가 존재할때 focus 해줍니다.
  }, []);

  /**
   * @description 메시지 리스트를 subscribe하고 있다가,
   * 변경이 감지되면 chatBoard의 스크롤 맨위지점을 chatBoard의 높이 값으로 잡아주면 항상 맨밑에 위치시킬 수 있다.
   */
  React.useEffect(() => {
    // 옵셔널 체이닝 연산자 (undefined나 null이 아닌 경우에만 실행 (실행이 안되면 undefined 반환))
    _message.current?.focus();
    // 채팅보드를 chat변수에 할당해준다.
    let chat = _chatBoard.current;

    if (!!chat) {
      chat.scrollTop = chat.scrollHeight;
    }

    /**
     *
     *  메시지 배열에 정상적으로 들어갔다면 setMessage를 빈배열로 넣어주어 전송보냄과 동시에 message를 초기화해준다.
     * 이전에 배운 component타입에서 보았듯이 Function Component는 디테일한 제어가 힘들어
     * 클래스 컴포넌트로 한뒤에 디테일하게 배열의 길이를 기준으로 두고 초기화 시켜줄 수도 있지만, ref가 테마인지라
     * 만약 전송시에만 초기화를 시켜주고싶다면 custom hook을 사용하거나, 클래스 컴포넌트를 사용하길 바란다.
     */
    setMessage("");
  }, [messages]);

  /**
   * @description 메시지 저장을 위한 함수
   */
  const onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 전파 차단
    e.preventDefault();
    // 메시지 배열에 추가해주는데, Message 클래스를 활용하여 담아준 인스턴스를 기준으로 생성해준다.
    setMessages([...messages, new Message(nickName, message)]);
  };

  /**
   * @description 메시지 삭제를 위한 함수
   */
  const onRemove = (e: React.MouseEvent<HTMLButtonElement>, itemIndex: number) => {
    // 이벤트 전파 차단
    e.stopPropagation();
    // 메시지 배열을 덮어씌우는데 index와 메시지배열에서 일치하는 것에 대해서는, isDelete를 true로 만들어준다. isEdit은 false로 두어 수정도중 삭제시 삭제처리하고 수정을 비활성화
    setMessages(messages.map((item: Message) => (item.index !== itemIndex ? item : { ...item, isDelete: true, isEdit: false })));
  };

  /**
   * @description 메시지 수정 요청
   */
  const onEdit = (e: React.MouseEvent<HTMLButtonElement>, itemIndex: number) => {
    // 이벤트 전파 차단
    e.stopPropagation();

    // 메시지 수정요청이 들어오면 메시지 리스트에서 isEdit을 true로 바꿔주어 활성화 시켜준다.
    setMessages(messages.map((item: Message) => (item.index !== itemIndex ? item : { ...item, isEdit: true })));
  };

  const onEditComplete = (e: React.MouseEvent<HTMLButtonElement>, itemIndex: number, value?: string) => {
    // 이벤트 전파 차단
    e.stopPropagation();

    // 수정이 완료되었다면 해당 인덱스에 맞는 아이템을 찾아서 내용은 들어온 value로 바꾸어주고, isEdit은 false로 두어 수정 가능상태를 꺼주자
    setMessages(messages.map((item: Message) => (item.index !== itemIndex ? item : { ...item, content: value, isEdit: false })));
  };

  return (
    <div className="Container">
      <h1>Ref 설명을 위한 CRUD 게시판(Without DB)</h1>
      <h3>Made By Sangheon.Kim</h3>
      {/* 조건부 렌더링의 경우에는 독립된 컴포넌트로 보기에 서브노드로 감싸주어야 한다. 
          가급적이면 form양식인 경우에는 form태그를 감싸주자.. 접근성 측면에서도 그게 좋다..
      */}
      {!nickName && (
        <form>
          <label htmlFor="message">닉네임</label>
          <input type="text" name="nickname" id="nickname" placeholder="20글자 미만 닉네임을 입력해주세요" ref={_nickname} />
          <button
            type="submit"
            onClick={() => {
              if (!!_nickname.current && _nickname.current.value.length < 20) {
                setNickName(!!_nickname.current ? _nickname.current.value : "");
              } else {
                alert("20자 미만으로 설정해주세요");
                if (!!_nickname.current) {
                  _nickname.current.value = "";
                }
              }
            }}
          >
            접속
          </button>
        </form>
      )}
      {/* 위에서 말한것 처럼 조건부 렌더링의 경우에는 독립된 컴포넌트로 인식한다.
          바로 전 시간에 배웠던 Fragment를 사용해보았다. 
      */}
      {!!nickName && (
        <React.Fragment>
          <h1 style={{ display: "inline-block" }}>{nickName}님 안녕하세요.</h1>
          <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => setNickName("")} style={{ marginLeft: 16 }}>
            로그아웃
          </button>
          <form>
            <label htmlFor="message">메시지</label>
            <input
              type="text"
              ref={_message}
              name="message"
              id="message"
              placeholder="150자 미만 메시지를 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value.length < 150 && setMessage(e.target.value)}
              value={message}
            />
            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSave(e)}>입력</button>
          </form>
        </React.Fragment>
      )}
      <ChatBoard
        messages={messages}
        nickname={nickName}
        onRemove={onRemove}
        refDom={_chatBoard}
        onEdit={onEdit}
        onEditComplete={onEditComplete}
      />
    </div>
  );
};

/* 부모 컴포넌트의 렌더링에 관계없이 해당 컴포넌트의 props와 state 변경시에만 
리렌더링이 발생하도록 React.memo를 활용하여 감싸주었다. */
export default React.memo(Container);
