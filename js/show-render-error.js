import {body} from './popup.js';

const showRenderError = function () {
  const template = document.querySelector('#render-error').content;
  const errorModal = template.cloneNode(true).querySelector('.error');
  body.appendChild(errorModal);
  body.classList.add('modal-open');
  const closeButton =  errorModal.querySelector('.error__button');
  closeButton.addEventListener('click', () => {
    body.removeChild(errorModal);
    body.classList.remove('modal-open');
  });
};

export {showRenderError};
