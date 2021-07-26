import {closeButton, EscPressHandler} from './render-fullview.js';
import {resetEffect} from './applying-filters.js';

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
  document.removeEventListener('keydown', EscPressHandler);
  popup.querySelector('.social__comment-count').classList.remove('hidden');
  popup.querySelector('.comments-loader').classList.remove('hidden');
  popup.dispatchEvent(close);
  resetEffect();
};

export {popupOpen, popupClose, popup, body};
