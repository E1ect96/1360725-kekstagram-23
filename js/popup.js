import {escPressHandler, closeButtonClickHandler} from './render-fullview.js';
import {resetEffect} from './applying-filters.js';

const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('#picture-cancel');
const body = document.querySelector('body');
const close = new Event('close');

const popupOpen = () => {
  popup.classList.remove('hidden');
  body.classList.add('modal-open');
};

const popupClose = () => {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  popup.querySelector('.social__comment-count').classList.remove('hidden');
  popup.querySelector('.comments-loader').classList.remove('hidden');
  popup.dispatchEvent(close);
  document.removeEventListener('keydown', escPressHandler);
  closeButton.removeEventListener('click', closeButtonClickHandler);
  resetEffect();
};

export {popupOpen, popupClose, popup, body};
