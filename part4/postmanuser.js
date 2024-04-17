const http = require('http');

let user = [
  { id : "ljy"}
]

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === '/user') {
    // 1. 유저 정보 만들기
    // if(method === 'GET') {          ===> GET을 쓰면 보안이 취약하고, 정보를 '받아' 오는 것이기 때문에 로그인에 쓰지 않음
    //   // GET 요청에 대한 응답
    // res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8 ' });
    // res.end(JSON.stringify(user));
    // }
    if(method === 'POST') {
      let body = '';

      // 요청 본문에서 데이터 불러오기

      req.on('data', (chunk) => {
        console.log(chunk);
        body += chunk.toString();
      });
        // 본문 요청 읽기가 끝나면 데이터 처리
      req.on('end', () => {
        // 요청한 본문을 JSON 형식으로 변환
        const userData = JSON.parse(body);
        // 새 유저 데이터를 users 배열에 추가
        users.push(userData);
    });
  }
    // 2. 간단한 login api 만들기 => { key : value } 쿠키에 담아서 보내기
    // 로그인은 메서드를 어떤 것으로 표현할지 고민 (GET VS POST) -RESTful
    // 로그인은 새로 만든 user 정보를 받아야 함 (GET이면 url, POST면 body)
    // 로그인은 id 가 같은 경우로 함 ( password 추가 ok )
    // 로그인 성공 console - 쿠키 생성
    // 로그인 실패 console - 쿠키 미생성, 상태코드 mdn에서 확인 필요
    // key value는 아무 값이나 상관 없음 (쿠키가 생성만 되면 ok)
    // 금일 실습한 쿠키 코드 활용 - cookie.js

  else {
    res.writeHead(404);
    res.end();
  }
  }
})
server.listen(8080, () => {
  console.log('8080번 포트에서 서버 대기 중입니다');
})