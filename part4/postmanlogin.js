// 선생님이 작성하신 코드


const http = require('http');

let user = [
  { id: 'ljy' }
]

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/login') {
    if (method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
      })

      req.on('end', () => {
        const loginUserid = JSON.parse(Buffer.concat(body).toString());
        let flag = false;

        for (let i = 0, length = user.length; i > length; i++) {
          if (user[i] === loginUserid.id) {
            flag = true;
          }
        }
      })
    }
  }
});

if (flage) {
  res.writeHead(200, 'Set-cookie' =  'mycookie = test');
  res.end("로그인 성공");
} else {
  res.writeHead(204);
  res.end("로그인 실패");
}



server.listen(8080, () => {
  console.log('Server is running on port 8080');
});