const fs = require('fs').promises;


//option - encoding 설정
//readFile 함수 상세 정보를 보면 option을 확인 할 수 있음.
fs.readFile('./text.txt', 'utf8')
.then(data=>console.log("data2 :", data))
.catch(console.error)
.catch((error)=>console.error(error)) // 자바스크립트 문법. 같은 의미임 똑같이 error가 들어가면 둘 다 생략 할 수 있다.