



// 에러 처리 !

app.get('/file1', (req, res) => {
  if (err) {
    res.sendStatus(404);
  }
});

2.
try {
  const data = fs.readFilesync('./file.txt')
  catch (err) {
    console.error(err);
  }
}

app.get('file2', (req, res) => {
  fsAsync    // 비동기로 실행 됨
    .readFile('file2.txt')
    .catch((err) => {})
});



app.get('/file3', async, (req, res) => {
  )