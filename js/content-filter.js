const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const changeActiveFilter = (button) => {
  const activeFilter = document.querySelector('.img-filters__button--active');

  activeFilter.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const applyDefaultFilter = (callback) => {
  defaultFilter.addEventListener('click', () => {
    changeActiveFilter(defaultFilter);
    callback();
  });
};

const applyRandomFilter = (callback) => {
  randomFilter.addEventListener('click', () => {
    changeActiveFilter(randomFilter);
    callback();
  });
};

const applyDiscussedFilter = (callback) => {
  discussedFilter.addEventListener('click', () => {
    changeActiveFilter(discussedFilter);
    callback();
  });
};

export {applyDefaultFilter, applyRandomFilter, applyDiscussedFilter};
