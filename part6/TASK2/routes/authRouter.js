import express from 'express';
import fs from 'fs';
const router = express.Router();
// router.get('/signup', (req, res) => {
//   res.sendFile('signup.html', { root: './public' });
// });

console.log('??');
router.post('/signup', async (req, res, next) => {
  console.log('Signup request received');

  try {
    const { username, password } = req.body;

    // 기존 사용자 목록 로드
    let users = [];
    try {
      const userData = fs.readFileSync('./users.json');
      users = JSON.parse(userData);
    } catch (error) {
      console.error('Error loading User Data:', error);
    }
    // 이미 존재하는 이용자인지 확인
    const existingUser = users.find((user) => user.name === username);
    if (existingUser) {
      throw new Error('이미 존재하는 아이디입니다.');
    }
    // 새 이용자 등록
    const newUser = { username, password };
    users.push(newUser);
    // 사용자 목록 파일에 저장
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    // 201 Created
    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    next(error);
  }
});

export default router;
