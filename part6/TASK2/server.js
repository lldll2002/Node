import express from 'express';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import authRouter from './routes/authRouter.js';

const __dirname = path.resolve();
dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  })
);

// app.get('/', (req, res) => {
//   res.send('Hello, 관리자');
// });
app.get('/', (req, res) => {
  console.log('?');
  console.log(__dirname);
  fs.readFile(path.join(__dirname, './signup.html'), (err, data) => {
    console.log(data);
    if (err) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.sendFile(path.join(__dirname, 'signup.html'));
    // res.status(200).type('text/html').end(data);
  });
});
app.use('/routes', authRouter); // 회원가입 라우터 사용
console.log('?');
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? error : {};
  res
    .status(error.status || 500)
    .send(error.message || 'Interner Server Error');
});

// // 서버 열기

// const server = http.createServer((req, res) => {
//   if (req.method === 'GET' && req.url === '/signup') {
//     // 회원가입 페이지
//     fs.readFile(path.join(__dirname, 'public', 'signup.html'), (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'content-type': 'text/plain' });
//         res.end('Internal Server Error');
//         return;
//       }
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     });
//   } else if (req.method === 'POST' && req.url === '/signup.html') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });
//     req.on('end', () => {
//       const userData = JSON.parse(body);
//       saveUser(userData);
//       res.writeHead(200, { 'Content-Type': 'application.json' });
//       res.end(JSON.stringify({ message: '회원가입이 완료되었습니다.' }));
//     });
//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('404 Not Found');
//   }
// });

function saveUser(userData) {
  console.log('Received User Data: ', userData);
}

// app.set('port', process.env.PORT || 3000);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
