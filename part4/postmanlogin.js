// 선생님이 작성하신 코드


const http = require('http');  // http 모듈을 사용하겠다.

let user = [
  { id: 'ljy' }    // user는 리스트로 있는데 id는 ljy이다.
]

// 서버를 정의한다. http 모듈을 사용해서, 서버를 만든다. 아래의 요청과 응답을 이용하여.
const server = http.createServer((req, res) => {
  const url = req.url;  // url은 요청과 관련됨. req
  const method = req.method;  // method은 요청과 관련(get, post 등)

  if (url === '/login') { // url이 /login 이라면은
    if (method === 'POST') {  // 만약 메소드가 POST라면 (요청이 post인지 확인)
      const body = [];  // body가 뭔지 사전작업하기 (선언) (eg. 씨리얼을 담을 그릇을 확보한다.)
      req.on('data', (chunk) => {   // 데이터를, 조각(chunk) 단위로 요청한다. (그릇에 담을거를 요청)
        console.log(chunk);
        body.push(chunk);   // body 배열에 chunk를 추가한다.   chunk를 body 안에다가 하나씩 넣는다.
      })

      req.on('end', () => {   // 작업이 끝났을 때,
        const loginUserid = JSON.parse(Buffer.concat(body).toString());
        let flag = false; // 불변수 선언, 로그인이 됐는지 안됐는지 확인

        for (let i = 0, length = user.length; i > length; i++) {
          if (user[i] === loginUserid.id) {  // 특정 index에 있는 user 정보를 가져온다. === loginUserid에서 id에 해당하는 정보를 가져와.
            flag = true; // 가져온 값이 같으면
          }
        }
      })
    }
  }
});

if (flag) {  // flag가 참(ture) 라면~
  res.writeHead(200, 'Set-cookie' =  'mycookie = test');  //헤더 값을 설정한다. 쿠키도 설정한다. '키 = 값' 으로 구성된.
  res.end("로그인 성공");
} else {
  res.writeHead(204);
  res.end("로그인 실패");
}



server.listen(8080, () => {     // 맨 윗줄에 있는 server 가 준비가 되면. 내 말 들어. (8080 포트 쓸거야, 
  console.log('Server is running on port 8080');
});



// () => {} 이 전체가 콜백. 