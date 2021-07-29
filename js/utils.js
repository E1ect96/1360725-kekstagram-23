const RANDOM_IMAGES_COUNT = 10;

const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

const getUniqImages = (images) => {
  const ids = [];
  const results = [];
  images.forEach( (image, index) => {
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

const getRandomImages = (array) => {
  const results = [];

  for (let count = 0; count < array.length; count++) {
    const swapIndex = Math.floor(Math.random() * array.length);
    const currentCard = array[count];
    results[count] = array[swapIndex];
    results[swapIndex] = currentCard;
  }

  return getUniqImages(results).slice(0, RANDOM_IMAGES_COUNT);
};

const getSortedImages = (images) => images.slice().sort((first, second) => second.comments.length - first.comments.length);

export {getRandomImages, getSortedImages, isEscEvent};
