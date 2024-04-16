async function getUser() {  // 로딩 시 사용자 가져오는 함수
  try {
    const res = await axios.get('/users');  // .get 하는 순간 restServer에서 GET /users로 들어가서 객체를 스트림화 시켜서
    // 개체를 가져와서 res에 담기게 된다.
    const users = res.data;
    const list = document.getElementById('list');
    list.innerHTML = '';

    // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
    Object.keys(users).map(function (key){
      console.log(key)  // 데이터는 있는데 실제로 보여줘야 하니까 하는 행위들
      const userDiv = document.createElement('div');    // html element 생성하는 방법
      const span = document.createElement('span');
      span.textContent = users[key];  // 사용자의key값의 이름을 텍스트에 집어넣겠다(span)
      const edit = document.createElement('button'); // 버튼을 만들어서
      edit.textContent = '수정'; // 버튼의 이름은 '수정'
      edit.addEventListener('click', async () => { //수정 버튼 클릭이라는 이벤트를 넣겠다
        const name = prompt('바꿀 이름을 입력해주세요.'); // 입력 창을 띄운다
        if(!name){  // name을 쓰지 않은 상태라면,(!)
          return alert('이름을 반드시 입력해야합니다.');
        }
        try {
          await axios.put('/user/'+ key, { name });
          getUser();    // 값을 불러 온 후에 다시 그려준다(처음페이지)
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => { //삭제 버튼 클릭
        try {
          await axios.delete('/user/'+ key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });   // 이 밑에가 실제로 들어가는 부분, 너무 기본적이라서 생략해도 됨
      userDiv.appendChild(span); // span은 이름
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv); // 리스트 하나 안에 이름, 추가, 삭제, 모두 들어감
      console.log(res.data);
    });
  }
  catch (err) {
    console.error(err);
  }
}

window.onload = getUser(); // 맨 처음에 화면 로딩 시 getUser 호출
// 폼 제출(summit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  if(!name){        // ! 는 부정 연산자. 이름이 안들어왔다면~ 알람을 띄워라 라는 의미
    return alert('이름을 입력해주세요.');
  }
  try {
    await axios.post('/users', {name});
    getUser();      // 이게 없으면 등록만되고 그냥 끝. 있어야 다시 로딩
  } catch (err) {
    console.log(err);
  }
  e.target.name.value = '';
});