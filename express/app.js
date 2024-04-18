const express = require('express');
const path = require('path');
const __dirname = path.resolve();

const app = express();
app.set('port', precess.env.PORT || 3000);

app.get('/', (req, res) => {
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/index.thml'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '빈 포트에서 대기 중');
});
