//res 메서드로 응답 보냄
// - write로 응답 내용 적고
// - end로 응답 마무리(내용을 넣어도 됨)

// >> listen(포트)메서드로 특정 포트(주소, 우편번호)에 연결

const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});  // 헤더
  res.write('<h1>Hello Node!</h1>'); // 바디, 여러개 일 수 있다.
  res.end('<p>Hello Server!</p>'); // 누락이 되면 끝맺음이 없기 때문에 무한 로딩을 하게 됨
})
  .listen(8080, () => {   //서버 연결
    console.log('Server is running on port 8080');
  });


  // 브라우저에서 localhost:8080 또는 http://127.0.0.1:8080 접속
  // localhost 는 내 pc 안에서만 정해진 '집, 이름'
  // 외부에서 접근이 불가능.