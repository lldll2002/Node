const fs = require('fs').promises;

fs.writeFile('./file.txt','write hello!')
.catch();

fs.copyFile('./file.txt', 'file2.txt')
.catch(console.error);

// file2.txt에 내용이 있을 수도 있고 없을 수도 있다.
// 비동기로 처리되기 때문에 줄이 아래 있다고 해서 순서대로 진행된다고 확신 할 수 없다.

// 수정 방법
// 특정 비동기 처리 후 내용을 수행하려면 then으로 묶어서 처리한다.
fs.appendFile('./file.txt', 'append hello!')
  .then(
    fs.copyFile('./file.txt', 'file3.txt')
    .catch(console.error)
  ).catch(console.error)

// 폴더 만들기
fs.mkdir('new-folder').catch(console.error);