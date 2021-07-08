//Рандомное число из диапазона
const getRandomNumber = function (firstNumber, secondNumber) {

  if (secondNumber < firstNumber) {
    [firstNumber, secondNumber] = [secondNumber, firstNumber];
  }
  if (firstNumber >= 0 && secondNumber >= 0) {
    return Math.floor(Math.random() * (secondNumber - firstNumber + 1) + firstNumber);
  }
  throw new Error('Диапазон может быть только положительный, включая ноль');
};

getRandomNumber(10, 1);

//Проверка длинны строки
const checkMaxLength = function (string, maxLength) {
  return string <= maxLength;
};

checkMaxLength(14, 140);

const isEscEvent = function (evt) {
  if (evt.keyCode === 27) {
    return true;
  }
};

export {getRandomNumber, checkMaxLength, isEscEvent};
