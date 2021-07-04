const renderThumbnails = function (data) {
  //то, куда будут добавляться фотографии
  const picturesBlock = document.querySelector('.pictures');
  //находим шаблон
  const pictureTemplate = document.querySelector('#picture').content;
  const newPictureTemplate = pictureTemplate.querySelector('.picture');
  const fragmentThumbnail = document.createDocumentFragment();

  data.forEach(({url, comments, likes}) => {
    const picture = newPictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    fragmentThumbnail.appendChild(picture);
  });
  picturesBlock.appendChild(fragmentThumbnail);
};
export {renderThumbnails};


