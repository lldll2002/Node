import express from 'express';

const router = express.Router();

// GET /user 라우터

router.get('/id/:id', (req, res) => {
  // /id/:id를 라우터로 잡아버릴거야~
  console.log(req.params, req.query);
  console.log('req.params', req.params);
  console.log('req.query', req.query);
  console.log('req.params.id', req.params.id);
  console.log('req.query.limit', req.query.limit);

  res.send(`Hello ${req.params.id}`);
  // 여기까지 센드 해버렸으니까 아래가 실행 안됨
});

router.get('/like', (req, res) => {
  console.log('req.params', req.params);
  console.log('req.query', req.query);
  console.log('req.params.id', req.params.id);
  console.log('req.query.limit', req.query.limit);

  res.send('Hello, Like!');
});

export default router;
