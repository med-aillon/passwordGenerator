function getRandomNumber(min, max) {
  let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
  randomNumber = randomNumber / 4294967295;
  return Math.trunc(randomNumber * (max - min + 1) + min);
}
console.log(getRandomNumber(0, 5));
