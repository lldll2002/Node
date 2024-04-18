// 교보재에 있는 const dotenv = require('dotenv'); 는 옛날 느낌.
// 요즘은 import ~~ from ''; 을 더 많이 씀
import express from 'express';
// import morgan from 'morgan';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';

import path from 'path';
// const path = require('path');
const __dirname = path.resolve();

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

// const app = express();
// app.set('port', process.env.PORT || 3001);
// app이 express를 받아서 set으로 들어감

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
app.get('/', (req, res) => {
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.use((req, res, next) => {
  // app.use(미들웨어)
  console.log('모든 요청에 다 실행됩니다.');
  next();
});
// 미들웨어의 매개변수는 3개 (req, res, next)
app.get(
  '/',
  (req, res, next) => {
    // app.get('/', 미들웨어;next(); 미들웨어;res 미들웨어; throw error)
    // 하나의 app 뒤에 여러개의 미들웨어 들어올 수 있다.
    // 미들웨어 뒤의 next, res, error 중에 하나는 꼭 해야함. 안그럼 서버 에러남
    console.log('GET / 요청에만 실행됩니다.');
    next();
  },
  (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
  }
);
// 매개변수의 개수를 다르게 가져가면 오버로드, Error 처리를 위한 미들웨어
// 그래서 첫 번째가 error로 들어가는거
app.use((err, req, res, next) => {
  // app.use(미들웨어)
  console.error(err);
  res.status(500).send(err.message);
});
// 미들웨어는 위에서 부터 아래로 진행되기 때문에 에러처리는 맨 마지막에 두는게 좋다

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '빈 포트에서 대기 중');
});
