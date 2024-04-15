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