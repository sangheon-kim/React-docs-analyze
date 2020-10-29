// 버튼 클릭에 대한 정의
export const buttonClick = (e: any, refArray: any, index: number) => {
  const { current } = refArray[index];
  let _this:HTMLButtonElement = current;

  if (!!refArray[index]) {
    switch(refArray[index].current.id) {
      case 'button1':
        console.log('button1 클릭');
        _this.style.color = 'red'
        break;
      case 'button2':
        console.log('button2 클릭');
        _this.style.color = 'purple'
        break;
      case 'button3':
        console.log('butotn3 클릭');
        _this.style.color = 'skyblue'
        break;
      case 'button4':
        console.log('button4 클릭');
        _this.style.color = 'blue'
        break;
      default:
        console.log('정의 안되어있음')
    }
  }
}

// a태그 링크 관련 함수
export const linkClick = (e: any, refArray: any, index: number) => {
  e.preventDefault();
  const { current }  = refArray[index] as {current: HTMLAnchorElement};
  let _this = current;
  if (!!current) {
    switch(current.id) {
      case 'home':
        _this.style.color = 'red'
        break;
      case 'introduce':
        _this.style.color = 'purple'
        break;
      case 'portfolio':
        _this.style.color = 'skyblue'
        break;
      case 'inquire':
        _this.style.color = 'blue'
        break;
      default:
        console.log('정의 안되어있다.')
    }
  }
  console.log('a태그 클릭', e.target.id);
}
