import {isEscEvent} from './utils.js';

const MAX_HASHTAGS_COUNT = 5;

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

let scaleValue = 100;

const resetInputValue = function () {
  uploadInput.value = '';
  textHashtags.value = '';
  textDescription.value = '';
};

const scaleDownControlHandler = function () {
  if (scaleControlValue.value > 25) {
    scaleControlValue.value = parseInt(scaleControlValue.value,10) - 25;
    scaleValue = scaleControlValue.value / 100;
    imgUploadPreview.style.transform = `scale(${scaleValue})`;
  }
};

const scaleUpControlHandler = function () {
  if (scaleControlValue.value < 100) {
    scaleControlValue.value = parseInt(scaleControlValue.value,10) + 25;
    scaleValue = scaleControlValue.value / 100;
    imgUploadPreview.style.transform = `scale(${scaleValue})`;
  }
};

const uploadFormCloseHandler = function () {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');
  resetInputValue();
  closeButton.removeEventListener('click', uploadFormCloseHandler);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscPress);
};

const onEscPress = function (evt) {
  if (isEscEvent(evt) && !(document.activeElement === textHashtags || document.activeElement === textDescription)) {
    evt.preventDefault();
    uploadFormCloseHandler();
  }
};

const uploadFormOpenHandler = function () {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');

  scaleControlValue.value = 100;
  scaleValue = 1;
  imgUploadPreview.style.transform = `scale(${scaleValue})`;
  scaleDownControl.addEventListener('click', scaleDownControlHandler);
  scaleUpControl.addEventListener('click', scaleUpControlHandler);

  closeButton.addEventListener('click', uploadFormCloseHandler);
  document.addEventListener('keydown', onEscPress);
};

uploadInput.addEventListener('change', uploadFormOpenHandler);

const hashtagsValidateHandler = function () {
  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  const enteredHashtags = textHashtags.value.split(' ');
  const validHashtags = [];
  const errors = [];

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
};

textHashtags.addEventListener('input', hashtagsValidateHandler);
