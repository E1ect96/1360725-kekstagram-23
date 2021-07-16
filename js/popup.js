import {closeButton, onEscPress} from './render-fullview.js';
const popup = document.querySelector('.big-picture');
const body = document.querySelector('body');

const popupOpen = function () {
  popup.classList.remove('hidden');
  body.classList.add('modal-open');
};

const popupClose = function () {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', popupClose);
  document.removeEventListener('keydown', onEscPress);

  popup.querySelector('.social__comment-count').classList.remove('hidden');
  popup.querySelector('.comments-loader').classList.remove('hidden');
};

export {popupOpen, popupClose, popup};
