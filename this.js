function hello() {
  console.log(this)
  // console.log(this === global)
}

hello()
class A {
  constructor(num) {
    this.num = num;
  }
  memberFunction() {
    console.log('class call')
    console.log(this)
    console.log(this === global)
  }
}

const a = new A(1);
a. memberFunction()
console.log('최상위 스코프')
console.log(this)
