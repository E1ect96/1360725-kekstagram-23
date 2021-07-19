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
  const currentPhoto = picturesData[photoId - 1];
  popup.querySelector('img').src = currentPhoto.url;
  popup.querySelector('.social__caption').textContent = currentPhoto.description;
  popup.querySelector('.likes-count').textContent = currentPhoto.likes;

  let COMMENTS_COUNT = 5;
  let START_INDEX = 0;
  const commentsBlock = popup.querySelector('.social__comments');
  commentsBlock.textContent = '';
  const commentsFragment = new DocumentFragment();

  const showMoreComments = function () {
    if (currentPhoto.comments.length - COMMENTS_COUNT < 0) {
      COMMENTS_COUNT = currentPhoto.comments.length;
    }
    if (COMMENTS_COUNT <= currentPhoto.comments.length) {
      for (let i = START_INDEX; i < COMMENTS_COUNT; i++) {
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
        comentsCounter.textContent = `${COMMENTS_COUNT  } из ${  currentPhoto.comments.length  } комментариев`;
      }
      START_INDEX += 5;
      COMMENTS_COUNT += 5;
      /*console.log(START_INDEX);
      console.log(COMMENTS_COUNT);*/
    }
    popup.addEventListener('close', () => {
      comentsLoader.removeEventListener('click', showMoreComments);
    });
  };
  showMoreComments();
  comentsLoader.addEventListener('click', showMoreComments);
  document.addEventListener('keydown', onEscPress);
  popupOpen();
  closeButton.addEventListener('click', popupClose);

};
export {renderFullview, closeButton, onEscPress, comentsLoader};
