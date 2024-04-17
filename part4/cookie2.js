const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, [key, value]) => {
    acc[key.trim()] = decodeURIComponent(value);
    return acc;
  }, {});

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);

  // 주소가 /lonin 으로 시작하는 경우

  if (req.url.startsWith('/login')) {
    const {query} = url.parse(req.url);
    const {name} = qs.parse(query);
    const expires = new Date();
    //유효 쿠키 시간을 현재시간 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();

    // name 이라는 쿠키가 있는 경우

  } else if (cookies.name) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${cookies.name}님 안녕하세요`);
  } else {    // 아무 쿠키도 없는 경우에 else가 실행이 되면서 html이 시작된다
    try {
      const data = await fs.readFile('./cookie2.html');
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.write(data);
    } catch (err) {
      res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end(err.message);
    }
  }

})
  .listen(8084, () => {
    console.log('Server is running on port 8084');
  });