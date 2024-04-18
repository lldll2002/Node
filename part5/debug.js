

function hello() {
  console.log('hello');
}

function sum (x,y) {
  console.log('calculating...');
  const resert = x + y;
  console.log('result: ', resert);
  hello();
  return resert;
}
// 옆에 watch 를 누르면 꾸준하게 값을 볼 수있다...
// 보고 싶은 값 등 지정가능
// 자신만의 연산을 이용해서 답을 찾을 수 있음

sum(1,2);

const stop =4;
console.log('반복반복');
// 장점 : 변수 순서를 마음대로 지정 가능
for ( let i=0; i<10; i++ ) {
  console.log('count', i);
  if(i === stop) {
    break;
  }
}