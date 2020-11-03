import React from "react";
import "./ChatBoard.scss";
import { Message } from "../Container";

interface IChatBoard {
  messages: Message[];
  nickname: string;
  onEditComplete: any;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>, itemIndex: number) => void;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>, itemIndex: number, value?: string) => void;
  refDom: React.RefObject<HTMLDivElement>;
}

/**
 *
 * @description 채팅을 보여줄 보드
 * @class ChatBoard
 * @extends {React.PureComponent<IChatBoard>}
 */
class ChatBoard extends React.PureComponent<IChatBoard> {
  messageRef: React.RefObject<HTMLDivElement>;
  constructor(props: IChatBoard) {
    super(props);

    this.state = {};
    this.messageRef = React.createRef();
  }

  render() {
    const { messages, nickname, onRemove, refDom, onEdit, onEditComplete } = this.props;
    return (
      <React.Fragment>
        <p>대화 목록</p>
        <div className="ChatBoard" ref={refDom}>
          {messages.map((item) => {
            return (
              <div className={`ChatBoard__message ${item.author === nickname ? "to" : "from"}`} key={item.index}>
                {item.author !== nickname && <p className="sender">{`${item.author}`}</p>}
                <div className={`messageControl ${item.author === nickname ? "to" : "from"}`}>
                  {!item.isDelete && item.author === nickname && (
                    <React.Fragment>
                      <button
                        id="edit"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          !item.isEdit ? onEdit(e, item.index) : onEditComplete(e, item.index, this.messageRef.current?.textContent);
                        }}
                      >
                        {item.isEdit ? "완료" : "수정"}
                      </button>
                      <button id="remove" onClick={(e: React.MouseEvent<HTMLButtonElement>) => onRemove(e, item.index)}>
                        삭제
                      </button>
                    </React.Fragment>
                  )}
                  {item.author === nickname && <span className="time">{item.time}</span>}
                  <div
                    className={`message ${item.author === nickname ? "to" : "from"}`}
                    contentEditable={item.isEdit ? "true" : "false"}
                    onKeyDown={(e: any) =>
                      item.content.length + e.target.textContent.length > 150 ? alert("150자 이상 불가능합니다.") : console.log(e.target)
                    }
                    ref={this.messageRef}
                  >
                    {!item.isDelete ? item.content : "삭제된 메시지입니다."}
                  </div>
                  {item.author !== nickname && <span className="time">{item.time}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default ChatBoard;
