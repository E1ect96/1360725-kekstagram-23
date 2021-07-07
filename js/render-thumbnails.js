import {renderFullview} from'./render-fullview.js';

const renderThumbnails = function (picturesData) {
  const picturesBlock = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const newPictureTemplate = pictureTemplate.querySelector('.picture');
  const fragmentThumbnail = document.createDocumentFragment();

  picturesData.forEach(({url, comments, likes, id}) => {
    const picture = newPictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.addEventListener('click', () => {
      renderFullview(picturesData, id);
    });
    fragmentThumbnail.appendChild(picture);
  });
  picturesBlock.appendChild(fragmentThumbnail);
};
export {renderThumbnails};


