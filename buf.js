
// 숫자의 배열, 데이터의 Byte 그 자체
const buf = Buffer.from('Hi');

//Buffer 객체 형태로 출력(유니코드 형태)
console.log(buf);

//Buffer 길이
console.log(buf.length);

//Buffer 배열 출력
//배열에 있는 value에 접근하게 되면 ASCII(아스키코드)로 출력
console.log(buf[0])
console.log(buf[1])
//Buffer 정보를 문자열로 출력하고 싶은 경우
console.log(buf.toString());

// concat 붙이기
