function run() {
  console.log('0초 후 실행');
}


// 시작, 0초 후 실행, 끝 - 논블로킹
console.log('시작');
run();
console.log('끝');

// 시작, 끝, 0초 후 실행 - 블로킹
console.log('시작');
setTimeout(run, 0);
setTimeout(run, 1000);
setTimeout(run, 2000);
setTimeout(run, 3000);
console.log('끝');



// 자.스 에서 동기-> 노드에서 블로킹 이랑 비슷
// 비동기 -> 노드에서 논블로킹 비슷
// 노드에서는 동시에 여러개 업무를 할 수 있어 x
// 백그라운드로 보내는 것 일 뿐