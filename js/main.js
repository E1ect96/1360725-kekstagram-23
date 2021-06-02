const getRandomNumber = (minNumber, maxNumber) => {
  if (minNumber >= 0 && maxNumber >= 0 && maxNumber < minNumber) {
    return Math.floor(Math.random() * (minNumber - maxNumber + 1) + maxNumber);
  }
  if (maxNumber > minNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
  }
  throw new Error('Диапазон может быть только положительный, включая ноль');
};
getRandomNumber(10, 1);
