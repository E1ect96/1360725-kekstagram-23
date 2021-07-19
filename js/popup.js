import {closeButton, onEscPress} from './render-fullview.js';
const popup = document.querySelector('.big-picture');
const body = document.querySelector('body');
const close = new Event('close');

const popupOpen = function () {
  popup.classList.remove('hidden');
  body.classList.add('modal-open');
};

const popupClose = function () {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', popupClose);
  document.removeEventListener('keydown', onEscPress);
  /*  comentsLoader.removeEventListener('click', showMoreComments);*/

  popup.querySelector('.social__comment-count').classList.remove('hidden');
  popup.querySelector('.comments-loader').classList.remove('hidden');
  popup.dispatchEvent(close);
};

export {popupOpen, popupClose, popup};
