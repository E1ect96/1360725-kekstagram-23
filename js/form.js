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
  // eslint-disable-next-line no-use-before-define
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

const validateHashtags = function () {
  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  const enteredHashtags = textHashtags.value.split(' ');
  const validHashtags = [];
  const errors = [];

  enteredHashtags.forEach((element) => {
    if (!(re.test(element))) {
      errors.push('хэш-тег должен начинаться с символа # (решётка), состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д., и не может превышать длину 20 символов');
    }
    // element = element.toLowerCase();
    if (!(validHashtags.includes(element.toLowerCase()))) {
      validHashtags.push(element);
    } else {
      errors.push('хеш-теги не должны повторяться');
    }
    textHashtags.setCustomValidity(errors.join('. \n'));
  });
};

textHashtags.addEventListener('input', validateHashtags);
