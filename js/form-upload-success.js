import {body} from './popup.js';

const template = document.querySelector('#success').content;
const successModal = template.cloneNode(true).querySelector('.success');
const closeButton =  successModal.querySelector('.success__button');

function closeModalHandler () {
  body.removeChild(successModal);
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeModalHandler);
}

function formUploadSuccess () {
  body.appendChild(successModal);
  body.classList.add('modal-open');
  closeButton.addEventListener('click', closeModalHandler);
}

export {formUploadSuccess};
