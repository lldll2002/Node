// 파일 시스템에 접근하는 모듈
// 파일/폴더 생성,삭제,읽기,쓰기 가능
// 웹 브라우저에서는 제한적이었으나 노드는 권한을 가지고 있음

const fs = require('fs');
const fs2 = require('fs2').promises;

fs.readFile('./readme.txt', (err, data) => {
  if (err){
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});

// 파일 실행하는 경로는 js와 txt 정확하게 적기
// 지금의 경우는 file 안에 js와 txt가 함께 있으니까 경로에 마지막 readme.txt만 써도 됨

//Sync를 사용하여 동기적으로 처리
try {
  const readData = fs.readFileSync('./text.txt')
  console.log(readData);
  console.log(readData.toString());
}
catch (err) {
  console.log(err);
}

// 콜백 형식으로 작성
// 콜백이 적으면 이 방법도 괜찮음. 길어지면 promise를 선호함
fs.readFile('./text.txt', (err, data) => {
  if(err){
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});

// Promise 형식으로 작성
// fs2.readFile('./text.txt')
// depth를 줄여서 코딩 할 수 있어서 선호함
fs.promises.readFile('./text.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  }).catch((err) => {
    console.log(err);
  });