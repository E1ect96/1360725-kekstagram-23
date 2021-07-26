const RANDOM_IMAGES_COUNT = 10;

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

const isEscEvent = function (evt){
  return (evt.key === 'Escape' || evt.key === 'Esc');
};

const getUniqImages = (images) => {
  const ids = [];
  const results = [];
  images.forEach((image, index) => {
    if (!ids.length) {
      results.push(image);
      ids.push(images[index].id);
    } else if (!ids.includes(images[index].id)) {
      results.push(image);
      ids.push(images[index].id);
    }
  });

  return results;
};

export const getRandomImages = function (array) {
  const results = [];

  for (let count = 0; count < array.length; count++) {
    const swapIndex = Math.floor(Math.random() * array.length);
    const currentCard = array[count];
    const cardToSwap = array[swapIndex];
    results[count] = cardToSwap;
    results[swapIndex] = currentCard;
  }

  return getUniqImages(results).slice(0, RANDOM_IMAGES_COUNT);
};

export const getSortedImages = function (images) {
  images.slice().sort((first, second) => second.comments.length - first.comments.length);
};

export {getRandomNumber, checkMaxLength, isEscEvent};
