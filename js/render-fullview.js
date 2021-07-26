import {popupOpen, popupClose, popup} from './popup.js';
import {isEscEvent} from './utils.js';

const closeButton = popup.querySelector('#picture-cancel');
const comentsCounter = popup.querySelector('.social__comment-count');
const comentsLoader = popup.querySelector('.comments-loader');


const onEscPress = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    popupClose();
  }
};

const renderFullview = function (picturesData, photoId) {
  const currentPhoto = picturesData[photoId];
  popup.querySelector('img').src = currentPhoto.url;
  popup.querySelector('.social__caption').textContent = currentPhoto.description;
  popup.querySelector('.likes-count').textContent = currentPhoto.likes;

  let commentsCount = 5;
  let startIndex = 0;
  const commentsBlock = popup.querySelector('.social__comments');
  commentsBlock.textContent = '';
  const commentsFragment = new DocumentFragment();

  const showMoreComments = function () {
    if (currentPhoto.comments.length - commentsCount <= 0) {
      commentsCount = currentPhoto.comments.length;
      comentsLoader.classList.add('hidden');
    }
    if (commentsCount <= currentPhoto.comments.length) {
      for (let i = startIndex; i < commentsCount; i++) {
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
        commentsBlock.appendChild(commentsFragment);
        comentsCounter.textContent = `${commentsCount  } из ${  currentPhoto.comments.length  } комментариев`;
      }
      startIndex += 5;
      commentsCount += 5;
    }
    popup.addEventListener('close', () => {
      comentsLoader.removeEventListener('click', commentsLoaderClickHandler);
    });
  };
  showMoreComments();
  const commentsLoaderClickHandler = function () {
    showMoreComments();
  };
  comentsLoader.addEventListener('click', commentsLoaderClickHandler);
  document.addEventListener('keydown', onEscPress);
  popupOpen();
  closeButton.addEventListener('click', popupClose);

};
export {renderFullview, closeButton, onEscPress, comentsLoader};
