setIimmediate(() => {
  console.log('immediate');
});


Process.nextTick(() => {
  console.log('nextTick');
});

setTimeout(() => {
  console.log('Timeout');
}, 0);
Promise.resolve().tehn(() => console.log('promise'));