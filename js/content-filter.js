import {getRandomImages, getSortedImages} from './utils.js';

const filterMenu = document.querySelector('.img-filters');

const setFilter = function (array, callback) {
  filterMenu.classList.remove('img-filters--inactive');
  const filterButtonClickHandler = function (evt) {
    if (evt.target.matches('.img-filters__button')) {
      filterMenu.querySelector('.img-filters__button--active')
        .classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      if (evt.target.matches('#filter-random')) {
        const uniquePhotos = getRandomImages(array);
        callback(uniquePhotos);
      } else if (evt.target.matches('#filter-discussed')) {
        const sortDiscussPhotos = getSortedImages(array);
        callback(sortDiscussPhotos);
      } else {
        // По умолчанию
        callback(array);
      }
    }
  };
  filterMenu.addEventListener('click', filterButtonClickHandler);
};

export {setFilter};
