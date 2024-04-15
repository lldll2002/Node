const fs = require('fs').promises;

fs.writeFile('./file/file.txt','write hello!')
.catch();

fs.copyFile('./file/file.txt', 'file2.txt')
.catch(console.error);