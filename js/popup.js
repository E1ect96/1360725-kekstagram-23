const popup = document.querySelector('.big-picture');
const body = document.querySelector('body');

const popupOpen = function () {
  popup.classList.remove('hidden');
  body.classList.add('modal-open');
  popup.querySelector('.social__comment-count').classList.add('hidden');
  popup.querySelector('.comments-loader').classList.add('hidden');
};

const popupClose = function () {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  popup.querySelector('.social__comment-count').classList.remove('hidden');
  popup.querySelector('.comments-loader').classList.remove('hidden');
  document.removeEventListener('keydown');
};

export {popupOpen, popupClose, popup};
