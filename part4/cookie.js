const http = require('http');

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
  res.end('Hello Cookie');
})
  .listen(8083, () => {
    console.log('Server is running on port 8083');
  });