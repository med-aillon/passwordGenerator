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

const range = document.querySelector("input[type=range]");
const rangeLabel = document.querySelector(".range-group label");

rangeLabel.textContent = `Taille du mot de passe : ${range.value}`;
let passwordLength = range.value;

const passwordContent = document.querySelector(".password-content");
const errorMsg = document.querySelector(".error-msg");
const generateBtn = document.querySelector(".generate-btn");
const checkboxes = document.querySelectorAll("input[type=checkbox]");

generateBtn.addEventListener("click", createPassword);

function createPassword() {
  const checkedDataSets = checkedSets();

  if (!checkedDataSets.length) {
    errorMsg.textContent = "Au moin une case doit être cochée.";
  } else {
    errorMsg.textContent = "";
  }
  //Concaténer les élements du tableau checkedDataSets
  const concatenatedDataSets = checkedDataSets.reduce((acc, val) => acc + val);

  let password = "";

  //Créer un mdp de base qui contient un caractère de chaque ensemble coché
  const passwordBase = [];
  for (i = 0; i < checkedDataSets.length; i++) {
    passwordBase.push(checkedDataSets[i][getRandomNumber(0, checkedDataSets[i].length - 1)]);
  }
  //Compléter le mot de passe depuis concatenatedDataSets en fonction de la longueur désirée, même si des caractères doivent se repéter
  //piusqu'on a deja un caractère de chaque ensemble dans passwordBase que nous allons mélanger après
  for (i = checkedDataSets.length; i < passwordLength; i++) {
    password += concatenatedDataSets[getRandomNumber(0, concatenatedDataSets.length - 1)];
  }
  console.log(password);
  //Pour chaque élément de passwordBase on l'insére dans password dans un emplacement aléatoire choisi
  //avec randomIndex
  passwordBase.forEach((item, index) => {
    const randomIndex = getRandomNumber(0, password.length);
    //On découpe password avec la méthode slice à randomIndex, on insère un élément de passwordBase
    //puis on continue le password avec le reste depuis randomIndex
    password = password.slice(0, randomIndex) + passwordBase[index] + password.slice(randomIndex);
    console.log(randomIndex);
  });
  passwordContent.textContent = password;
  console.log(passwordBase);
  console.log(password);
}

function checkedSets() {
  const checkedSets = [];
  //Pour chaque case cochée on insère sa valeur dans le tableau checkedSets, bracket notation de l'objet
  //charactersSet veut dir itérer sur ses differentes proprietés
  checkboxes.forEach((checkbox) => checkbox.checked && checkedSets.push(charactersSet[checkbox.id]));
  return checkedSets;
}
range.addEventListener("input", handleRange);

function handleRange(e) {
  passwordLength = e.target.value;
  rangeLabel.textContent = `Taille du mot de passe : ${passwordLength}`;
}

const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", copyPassword);

let lock = false;
function copyPassword() {
  if (!passwordContent.textContent) {
    errorMsg.textContent = "Veuillez générer un mot de passe puis copié-le !";
  } else {
    if (lock) return;
    lock = true;
    navigator.clipboard.writeText(passwordContent.textContent);
    copyBtn.classList.add("active");
    setTimeout(() => {
      copyBtn.classList.remove("active");
      lock = false;
    }, 1000);
  }
}
