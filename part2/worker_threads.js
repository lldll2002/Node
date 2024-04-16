const {
  Worker, isMainThread, parentPort,
} = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(filename);
  worker.on('message', (message) => {
    console.log(message);
  });
} else