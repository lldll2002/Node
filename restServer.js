const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용 users라는 객체에 저장을 하겠다, 서버를 켰을 때만 유효한 변수(초기화)

http.createServer(async (req, res) => {
  try { 
    if (req.method === 'GET') { // Front로 부터 넘어오는게 GET이다. GET은 정보 구성용.
      if (req.url ==='/') { // /는 기본주소
        const data = await fs.readFile('./restFront.html');   // 기본페이지 가져오기로 함
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);   // 이 데이터를 리턴해주고 종료하겠다.
      } else if (req.url === '/about') {    // 소개 페이지. txt만 있음
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      }
      else if (req.url === '/users') {    // html 파일을 가져오는게 아니라, '데이터 저장용' 에 저장된 객체에서 가져옴
        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(users));    // '객체' 이기 때문에 문자화 해줘야함
      }
      // /도 /about도 /users도 아니라면
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data); // req.url에 해당하는 파일을 가져와서 던진다
      } catch (err) {
          // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    }
    else if (req.method === 'POST') {
      if (req.url === '/users') { // user로 post 접속을 했을 때,
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => { // data가 엽서(post)안에 있는 내용.
          body += data; // 그 안의 내용을 body에 담는 것.
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {        // req."on" 은 PUT, POST 에만 들어간다. ~에 집어 넣는 거니까
          console.log('POST 본문(Body): ' + body);
          const { name } = JSON.parse(body); // 객체 형식으로 파싱을 함
          const id = Date.now();  // 객체에 집어넣는 행위를 하려다 보니 들어간 코딩
          users[id] = name; // 파싱해서 가져온 이름
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' }); // 201 : 상태가 정상적으로 진행이 됐다.
          res.end('ok');
        });
      }
    } else if (req.method === 'PUT') {  // PUT은 뒤에 고유한 값이 들어가니까(restFront.html에 axios.put 위치를 확인)
      if (req.url.startsWith('/user/')) { 
        // user로 시작한다면~ 들어와라, 뒤쪽의 키값이 같이 들어오니까 ===(동등연산자)를 사용할 수 없다.
        const key = req.url.split('/')[2]; // '/'을 기준으로 url 을 짜른다 '빈주소.user.키' 총 하나의 배열 안에 3개의 값을 가짐
        // 그 중에, 2번째인 (0,1,2 번쨰) "키값"을 가져가겠다.
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body: ' + body);
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { 'Content-Type': 'text/plain; charset' });
          return res.end('ok');
        });
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        console.log('key',key)
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('ok');
      }
    }
    // 위의 모든 것에 포함 되지 않았다 -> 에러다! 아래의 것을 출력
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) { // 코드 상의 에러로 발생한다면 catch로 빠짐(Front상의 에러가 아니라)
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8082, () => { // 서버를 키는 것 확인
    console.log('8082번 ㅍ포트에서 서버 대기 중입니다.');
  });