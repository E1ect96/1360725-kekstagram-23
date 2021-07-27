import '../nouislider/nouislider.js';
import {photoUpload} from './form.js';

const imgUploadPreview = photoUpload.querySelector('.img-upload__preview').children[0];
const effectLevel = photoUpload.querySelector('.effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effects = document.querySelector('.effects__list');
const effectNone = document.querySelector('#effect-none');

noUiSlider.create(effectLevelSlider, {
  start: 100,
  range: {
    'min': 0,
    'max': 100,
  },
  step: 1,
  connect: 'lower',
});

let effect = 'none';

const resetEffect = function () {
  imgUploadPreview.style.removeProperty('filter');
  imgUploadPreview.removeAttribute('class');
  effectLevel.classList.add('hidden');
  effect = 'none';
  effectNone.checked = true;
};

const effectsClickHandler = function (evt) {
  effect = evt.target.value;
  effectLevel.classList.remove('hidden');
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.classList.add(`effects__preview--${effect}`);

  switch (effect) {
    case 'chrome':
      effectLevelSlider.noUiSlider.updateOptions ({
        range: {
          'min': 0,
          'max': 1,
        },
        step: 0.1,
        start: 1,
      });
      effectLevelSlider.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
      });
      break;
    case 'sepia':
      effectLevelSlider.noUiSlider.updateOptions ({
        range: {
          'min': 0,
          'max': 1,
        },
        step: 0.1,
        start: 1,
      });
      effectLevelSlider.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
      });
      break;
    case 'marvin':
      effectLevelSlider.noUiSlider.updateOptions ({
        range: {
          'min': 0,
          'max': 100,
        },
        step: 1,
        start: 100,
      });
      effectLevelSlider.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
      });
      break;
    case 'phobos':
      effectLevelSlider.noUiSlider.updateOptions ({
        range: {
          'min': 0,
          'max': 3,
        },
        step: 0.1,
        start: 3,
      });
      effectLevelSlider.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
      });
      break;
    case 'heat':
      effectLevelSlider.noUiSlider.updateOptions ({
        range: {
          'min': 1,
          'max': 3,
        },
        step: 0.1,
        start: 3,
      });
      effectLevelSlider.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
      });
      break;
    case 'none':
      resetEffect();
      break;
  }
};

effects.addEventListener('click', effectsClickHandler);

export {resetEffect};

