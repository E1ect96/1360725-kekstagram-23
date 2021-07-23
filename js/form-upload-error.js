import {body} from './popup.js';

const template = document.querySelector('#error').content;
const uploadErrorModal = template.cloneNode(true).querySelector('.error');

const formUploadError = function () {
  body.appendChild(uploadErrorModal);
  body.classList.add('modal-open');
  const closeButton =  uploadErrorModal.querySelector('.error__button');
  closeButton.addEventListener('click', () => {
    body.removeChild(uploadErrorModal);
    body.classList.remove('modal-open');
  });
};

export {formUploadError};
