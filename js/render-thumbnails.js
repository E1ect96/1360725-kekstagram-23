import {renderFullView} from'./render-fullview.js';

function renderThumbnails (picturesData) {
  const picturesBlock = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const newPictureTemplate = pictureTemplate.querySelector('.picture');
  const fragmentThumbnail = document.createDocumentFragment();
  const allImages = picturesBlock.querySelectorAll('a');

  allImages.forEach((image) => image.remove());

  picturesData.forEach((pictureData) => {
    const {url, comments, likes} = pictureData;
    const picture = newPictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.addEventListener('click', () => {
      renderFullView(pictureData);
    });
    fragmentThumbnail.appendChild(picture);
  });
  picturesBlock.appendChild(fragmentThumbnail);
}
export {renderThumbnails};


