import {isEscEvent} from './utils.js';
import {resetEffect} from './applying-filters.js';
import {sendData} from './api.js';
import {formUploadSuccess} from './form-upload-success.js';
import {formUploadError} from './form-upload-error.js';

const MAX_HASHTAGS_COUNT = 5;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const photoUpload = document.querySelector('.img-upload__form');
const uploadInput = photoUpload.querySelector('#upload-file');
const uploadForm = photoUpload.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = photoUpload.querySelector('.img-upload__cancel');
const textHashtags = photoUpload.querySelector('.text__hashtags');
const textDescription = photoUpload.querySelector('.text__description');

const scaleDownControl = photoUpload.querySelector('.scale__control--smaller');
const scaleUpControl = photoUpload.querySelector('.scale__control--bigger');
const scaleControlValue = photoUpload.querySelector('.scale__control--value');
const imgUploadPreview = photoUpload.querySelector('.img-upload__preview').children[0];

let scaleValue = MAX_SCALE_VALUE;

const resetInputValue = () => {
  uploadInput.value = '';
  textHashtags.value = '';
  textDescription.value = '';
};

const scaleDownControlHandler = () => {
  if (scaleControlValue.value > MIN_SCALE_VALUE) {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) - SCALE_STEP;
    scaleValue = scaleControlValue.value / 100;
    imgUploadPreview.style.transform = `scale(${scaleValue})`;
  }
};

const scaleUpControlHandler = () => {
  if (scaleControlValue.value < MAX_SCALE_VALUE) {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) + SCALE_STEP;
    scaleValue = scaleControlValue.value / 100;
    imgUploadPreview.style.transform = `scale(${scaleValue})`;
  }
};

const formClose = () => {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');
  resetInputValue();
  resetEffect();
  // eslint-disable-next-line no-use-before-define
  photoUpload.removeEventListener('submit', photoUploadSubmitHandler);
  // eslint-disable-next-line no-use-before-define
  closeButton.removeEventListener('click', uploadFormCloseHandler);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', escPressHandler);
};

const photoUploadSubmitHandler = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  formClose();
  sendData(formUploadSuccess, formUploadError, formData);
};

const uploadFormCloseHandler = () => {
  formClose();
};

const escPressHandler = (evt) => {
  if (isEscEvent(evt) && !(document.activeElement === textHashtags || document.activeElement === textDescription)) {
    evt.preventDefault();
    uploadFormCloseHandler();
  }
};

const uploadFormOpenHandler = () => {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');

  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imgUploadPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  } else {
    formUploadError();
  }
  scaleControlValue.value = MAX_SCALE_VALUE;
  scaleValue = 1;
  imgUploadPreview.style.transform = `scale(${scaleValue})`;
  scaleDownControl.addEventListener('click', scaleDownControlHandler);
  scaleUpControl.addEventListener('click', scaleUpControlHandler);
  photoUpload.addEventListener('submit', photoUploadSubmitHandler);
  closeButton.addEventListener('click', uploadFormCloseHandler);
  document.addEventListener('keydown', escPressHandler);
};

uploadInput.addEventListener('change', uploadFormOpenHandler);

const hashtagsValidateHandler = () => {
  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  textHashtags.value = textHashtags.value.replace(/[\s{2,}]+/g, ' ');
  const enteredHashtags = textHashtags.value.split(' ');
  const validHashtags = [];
  const errors = [];

  if (enteredHashtags[0]) {
    enteredHashtags.forEach((element) => {
      if (!(re.test(element))) {
        errors.push('хэш-тег должен начинаться с символа # (решётка), состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д., и не может превышать длину 20 символов');
      }
      if (!(validHashtags.includes(element.toLowerCase()))) {
        validHashtags.push(element);
      } else {
        errors.push('хеш-теги не должны повторяться');
      }
      if (validHashtags.length > MAX_HASHTAGS_COUNT){
        errors.push('максимальное количество хеш-тегов - 5');
      }
      textHashtags.setCustomValidity(errors.join('. \n'));
    });
  } else  {
    textHashtags.setCustomValidity('');
  }
  textHashtags.reportValidity();
};

textHashtags.addEventListener('input', hashtagsValidateHandler);

export {photoUpload, uploadInput};
