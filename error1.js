setInterval(() => {
  console.log('시작');
try{
  throw new Error('서버를 고장내주마!');
} catch (error) {
  console.error(error);
}
}, 1000);

// 무한히 반복 되기 때문에, catch 써서 에러 잡고 후처리 까지 하는게 좋다