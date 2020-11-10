/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

interface IFunctionRef {}

const FunctionRef: React.FC<IFunctionRef> = () => {
  const [index, setIndex]: any = React.useState(null);
  const _tabSection: React.RefObject<HTMLDivElement> = React.useMemo(() => React.createRef(), []);
  const _button1: React.RefObject<HTMLButtonElement> = React.useMemo(() => React.createRef(), []);
  const _button2: React.RefObject<HTMLButtonElement> = React.useMemo(() => React.createRef(), []);
  const _button3: React.RefObject<HTMLButtonElement> = React.useMemo(() => React.createRef(), []);
  const buttonArray = [_button1, _button2, _button3];
  React.useEffect(() => {
    // 옵셔널 체이닝 연산자
    _tabSection.current?.focus();
  }, [_tabSection]);

  const tabArrow = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let buttonCount = buttonArray.length - 1;

      if (e.keyCode === 37 || e.keyCode === 39) {
        if (index !== null) {
          if (e.keyCode === 37) {
            console.log("왼쪽 방향키 클릭");
            if (index === 0) {
              setIndex(2);
            } else {
              setIndex(index - 1);
            }
          } else {
            console.log("오른쪽 방향키 클릭");
            if (index === buttonCount) {
              setIndex(0);
            } else {
              setIndex(index + 1);
            }
          }
        } else {
          setIndex(0);
          if (e.keyCode === 37) {
            console.log("왼쪽 방향키 클릭");
          } else {
            console.log("오른쪽 방향키 클릭");
          }
        }
      }
    },
    [buttonArray.length, index]
  );

  React.useEffect(() => {
    if (index !== null) {
      buttonArray[index].current?.focus();
    }
  }, [index]);
  return (
    <div style={{ paddingLeft: 16 }}>
      <h1>함수형 컴포넌트의 DOM엘리먼트에 ref 넣기</h1>
      <p> 컴포넌트가 마운트되면 tab에 index하기 화살표 좌우로 움직여서 탭을 잡아보세요</p>
      <div className="buttonGroup" tabIndex={1} ref={_tabSection} onKeyDown={(e) => tabArrow(e)}>
        <button id="button1" name="Function-sangheon-button" tabIndex={-1} ref={_button1}>
          1번 버튼
        </button>
        <button id="button2" name="Function-sangheon-button" tabIndex={-1} ref={_button2}>
          2번 버튼
        </button>
        <button id="button3" name="Function-sangheon-button" tabIndex={-1} ref={_button3}>
          3번 버튼
        </button>
      </div>
    </div>
  );
};

export default FunctionRef;
