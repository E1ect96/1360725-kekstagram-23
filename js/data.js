import {getRandomNumber} from'./utils.js';
// Создание данных
const sentences = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = [
  'Артём',
  'Сергей',
  'Николай',
  'Евгений',
  'Семён',
  'Михаил',
  'Никита',
  'Андрей',
  'Ярослав',
  'Пётр',
  'Дмитрий',
  'Юрий',
  'Леонид',
  'Алексей',
  'Павел'];

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];
const getComments = (commentsNumber) => {
  const usedIds = [0];
  let randomId = 0;
  const comments = [];
  for (let i = 1; i <= commentsNumber ; i++) {
    while (usedIds.includes(randomId, 0)) {
      randomId = getRandomNumber(1, 999);
    }
    usedIds.push(randomId);
    comments.push({
      id: randomId,
      avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
      message: getRandomArrayElement(sentences),
      name: getRandomArrayElement(names)});
  }
  return comments;
};
const getPhotos = (photosNumber) => {
  const photos = [];
  for (let i = 1; i <= photosNumber ; i++) {
    photos.push({
      id: i,
      url: `photos/${  i  }.jpg`,
      description: `Фотография с id:${  i}`,
      likes: getRandomNumber(15, 200),
      comments: getComments(getRandomNumber(5, 125))});
  }
  return photos;
};

export {getPhotos};
