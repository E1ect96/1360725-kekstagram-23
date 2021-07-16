import {popupOpen, popupClose, popup} from './popup.js';
import {isEscEvent} from './utils.js';

const closeButton = popup.querySelector('#picture-cancel');
const comentsCounter = popup.querySelector('.social__comment-count');
/*const comentsLoader = popup.querySelector('.comments-loader');*/


const onEscPress = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    popupClose();
  }
};

const renderFullview = function (picturesData, photoId) {
  const currentPhoto = picturesData[photoId - 1];
  popup.querySelector('img').src = currentPhoto.url;
  popup.querySelector('.social__caption').textContent = currentPhoto.description;
  popup.querySelector('.likes-count').textContent = currentPhoto.likes;
  popup.querySelector('.comments-count').textContent = currentPhoto.comments.length;

  const COMMENTS_COUNT = 5;
  comentsCounter.textContent = COMMENTS_COUNT;
  const commentsBlock = popup.querySelector('.social__comments');
  commentsBlock.textContent = '';
  const commentsFragment = new DocumentFragment();

  for (let i = 0; i < COMMENTS_COUNT; i++) {
    /*currentPhoto.comments.forEach((comment) =>*/
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = currentPhoto.comments[i].avatar;
    commentAvatar.alt = currentPhoto.comments[i].name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = currentPhoto.comments[i].message;

    commentItem.appendChild(commentAvatar);
    commentItem.appendChild(commentText);
    commentsFragment.appendChild(commentItem);
  }

  commentsBlock.appendChild(commentsFragment);

  document.addEventListener('keydown', onEscPress);
  popupOpen();
  closeButton.addEventListener('click', popupClose);
};

export {renderFullview, closeButton, onEscPress};
