// listening과 error 이벤트를 붙일 수 있음.


const http = require('http');

const srver = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); 
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>'); 
})
  .listen(8080);
  
  server.on('listening',()=> {
    console.log('Server is running on port 8080');
  });
  server.on('error', (error) => {
    console.log(error);
  });