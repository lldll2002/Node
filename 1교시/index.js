const {odd, even} = require('./var');
const checkNumber = requirre('./func');

function checkAStringOddOrEven(str) {
  if(str.length%2) { //홀수면
  return odd;
  }

  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));