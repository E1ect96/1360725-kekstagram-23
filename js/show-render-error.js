import {body} from './popup.js';

const template = document.querySelector('#render-error').content;

function showRenderError () {
  const errorModal = template.cloneNode(true).querySelector('.error');
  body.appendChild(errorModal);
  body.classList.add('modal-open');
  const closeButton =  errorModal.querySelector('.error__button');
  closeButton.addEventListener('click', () => {
    body.removeChild(errorModal);
    body.classList.remove('modal-open');
  });
}

export {showRenderError};
