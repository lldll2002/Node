

// 지금부터 내가 fs와 path를 사용하겠다. (fs, path 모듈 불러오기)
const fs = require('fs');
const path = require('path');


// 어디에 있는 파일을 이동시키고 싶다. (이동할 파일이 있는 경로 선택)
const sourceFolder = './file';

// video, image, text 라는 폴더를 만든다
const newFolderName = ['Video', 'Image', 'Text'];

// 이 폴더들은 file 이라는 폴더 아래에 만든다.
const parentsFolder = './file';

// 폴더들을 만드는 함수
function createNewFolder() {
  // 새로운 폴더의 경로
  const newFolderPath = path.join(paretsFolderPath, newFolderName);
  fs.mkdir(newFolderPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating folder', err);
      return;
    }
    console.log('new folder created');
  });
};

// 그 폴더에 어떤 파일들이 있다. (이동할 파일들의 목록 불러오기)
fs.readdir(sourceFolder, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(files);
});



const path = require('path');
const fs = require('fs');

// 1. 원하는 파일 경로 설정하기
// file 폴더 경로 찾기
// How? 현재 작업 경로 + "file"
const workingDirectory = path.join(__dirname, 'file');
// fs.existsSync를 통해 작업 폴더의 존재 유무 판별
if (!fs.existsSync(workingDirectory)) {
  console.log('working directory does not exist');
  return;
}

// 2. 폴더 만들기
// 2-1. 새로 만들 폴더 경로 설정
