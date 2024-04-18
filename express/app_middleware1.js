import express from 'express';
const app = express();

app.set('port', process.env.PORT || 3000);

app.get(
  '/',
  (req, res, next) => {
    console.log('1번');
    // next(); 를 추가 안하면 '1번'만 나옴
    // next('route')를 쳤다면, 같은 get('/') 안에 있는 '2번'을 건너뛰고
    // 아래의 다른 get('/') 의 3번이 출력됨
  },
  (req, res, next) => {
    console.log('2번');
    // next(); 를 추가 안하면 '2번' 까지 나옴
    // return res.send('끝') 을 써넣으면 여기까지 응답이 오면 끝을 낸다.
    // 리턴 안시키면 끝 응답을 받아도 나머지 다 진행함
  }
);

app.get('/', (req, res, next) => {
  console.log('3번');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '빈 포트에서 대기 중');
});
