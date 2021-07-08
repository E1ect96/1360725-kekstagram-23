import {isEscEvent} from './utils.js';

const photoUpload = document.querySelector('.img-upload__form');
const uploadInput = photoUpload.querySelector('#upload-file');
const uploadForm = photoUpload.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = photoUpload.querySelector('.img-upload__cancel');
const textHashtags = photoUpload.querySelector('.text__hashtags');
const textDescription = photoUpload.querySelector('.text__description');

const resetInputValue = function () {
  uploadInput.value = '';
  textHashtags.value = '';
  textDescription.value = '';
};

const closeUploadForm = function () {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');
  resetInputValue();
  closeButton.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', onEscPress);
};

const onEscPress = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const openUploadForm = function () {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onEscPress);
};

uploadInput.addEventListener('change', openUploadForm);
