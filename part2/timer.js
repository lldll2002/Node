// setTimeout(콜백 함수, 밀리초): 주어진 밀리초(1000분의 1초) 이후에 콜백함수 실행
// setInterval(콜백 함수, 밀리초): 주어진 밀리초마다 콜백 함수를 반복 실행
// setImmediate(콜백 함수): 




// console.time('timeout 0');
// setTimeout(()=> {
//   console.timeEnd('timeout 0');
//   console.log('setTimeout 0');
// },)

// console.time('timeout 1');
// setImmediate(()=> {
//   console.timeEnd('timeout 1');
//   console.log('setTimeout 1');
// })


// setImmediate가 좀 더 빠르고 일정하다

const timeout = setTimeout(() => {
  console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => {
  console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
  console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
  console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
  console.log('실행되지 않습니다');
});

clearImmediate(immediate);

console.log(process.env)