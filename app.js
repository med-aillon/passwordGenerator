function getRandomNumber(min, max) {
  let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
  randomNumber = randomNumber / 4294967295;
  return Math.trunc(randomNumber * (max - min + 1) + min);
}

function addASet(fromCode, toCode) {
  let charactersList = "";
  for (i = fromCode; i <= toCode; i++) {
    charactersList += String.fromCharCode(i);
  }
  return charactersList;
}

const charactersSet = {
  lowerCaseChars: addASet(97, 122),
  upperCaseChars: addASet(65, 90),
  numbers: addASet(48, 57),
  symbols: addASet(33, 47) + addASet(58, 64) + addASet(91, 96) + addASet(123, 126),
};
console.log(charactersSet);
