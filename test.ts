let cnt = 10;
let objArr = new Array(cnt)
              .fill(undefined)
              .map((_, index) => ({key: `${index+1}`, quest: '', ans: ''}));
console.log(objArr);

export {}