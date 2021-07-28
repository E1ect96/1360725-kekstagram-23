import {popupOpen, popupClose} from './popup.js';
import {isEscEvent} from './utils.js';

const COMMENTS_COUNT_INIT = 5;
const IMAGE_SIDE_SIZE = 35;
const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('#picture-cancel');
const commentsCounter = popup.querySelector('.social__comment-count');
const commentsLoader = popup.querySelector('.comments-loader');
const popupImg = popup.querySelector('img');
const popupCaption = popup.querySelector('.social__caption');
const popupLikes = popup.querySelector('.likes-count');


function escPressHandler (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    popupClose();
  }
}

function closeButtonClickHandler () {
  popupClose();
}

function renderFullView (pictureData) {
  const currentPhoto = pictureData;
  popupImg.src = currentPhoto.url;
  popupCaption.textContent = currentPhoto.description;
  popupLikes.textContent = currentPhoto.likes;

  let commentsCount = COMMENTS_COUNT_INIT;
  let startIndex = 0;
  const commentsBlock = popup.querySelector('.social__comments');
  commentsBlock.textContent = '';
  const commentsFragment = new DocumentFragment();

  function showMoreComments () {
    if (currentPhoto.comments.length - commentsCount <= 0) {
      commentsCount = currentPhoto.comments.length;
      commentsLoader.classList.add('hidden');
    }
    if (commentsCount <= currentPhoto.comments.length) {
      for (let i = startIndex; i < commentsCount; i++) {
        const commentItem = document.createElement('li');
        commentItem.classList.add('social__comment');
        const commentAvatar = document.createElement('img');
        commentAvatar.classList.add('social__picture');
        commentAvatar.src = currentPhoto.comments[i].avatar;
        commentAvatar.alt = currentPhoto.comments[i].name;
        commentAvatar.width = IMAGE_SIDE_SIZE;
        commentAvatar.height = IMAGE_SIDE_SIZE;
        const commentText = document.createElement('p');
        commentText.classList.add('social__text');
        commentText.textContent = currentPhoto.comments[i].message;

        commentItem.appendChild(commentAvatar);
        commentItem.appendChild(commentText);
        commentsFragment.appendChild(commentItem);
        commentsBlock.appendChild(commentsFragment);
        commentsCounter.textContent = `${commentsCount  } из ${  currentPhoto.comments.length  } комментариев`;
      }
      startIndex += COMMENTS_COUNT_INIT;
      commentsCount += COMMENTS_COUNT_INIT;
    }
    popup.addEventListener('close',() => {
      commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
    });
  }
  showMoreComments();
  function commentsLoaderClickHandler () {
    showMoreComments();
  }
  commentsLoader.addEventListener('click', commentsLoaderClickHandler);
  document.addEventListener('keydown', escPressHandler);
  popupOpen();
  closeButton.addEventListener('click', closeButtonClickHandler);

}
export {renderFullView, closeButton, escPressHandler, commentsLoader, closeButtonClickHandler};
