import {popupOpen, popupClose, popup} from './popup.js';

const renderFullview = function (picturesData, photoId) {
  const currentPhoto = picturesData[photoId - 1];
  popup.querySelector('img').src = currentPhoto.url;
  popup.querySelector('.social__caption').textContent = currentPhoto.description;
  popup.querySelector('.likes-count').textContent = currentPhoto.likes;
  popup.querySelector('.comments-count').textContent = currentPhoto.comments.length;

  const commentsBlock = popup.querySelector('.social__comments');
  const commentsFragment = new DocumentFragment();
  currentPhoto.comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentItem.appendChild(commentAvatar);
    commentItem.appendChild(commentText);
    commentsFragment.appendChild(commentItem);
  });

  commentsBlock.appendChild(commentsFragment);


  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      popupClose();
    }
  });
  popupOpen();
  const closeButton = popup.querySelector('#picture-cancel');
  closeButton.addEventListener('click', ()=> {
    popupClose();
  });
};

export {renderFullview};
