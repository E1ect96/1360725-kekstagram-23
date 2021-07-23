import {body} from './popup.js';

const template = document.querySelector('#success').content;
const successModal = template.cloneNode(true).querySelector('.success');

const formUploadSuccess = function () {
  body.appendChild(successModal);
  body.classList.add('modal-open');
  const closeButton =  successModal.querySelector('.success__button');
  closeButton.addEventListener('click', () => {
    body.removeChild(successModal);
    body.classList.remove('modal-open');
  });
};

export {formUploadSuccess};
