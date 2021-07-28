import {showRenderError} from './show-render-error.js';
import {renderThumbnails} from './render-thumbnails.js';
import {setFilter} from './content-filter.js';
import {debounce} from './utils/debounce.js';

const URL = 'https://23.javascript.pages.academy/kekstagram';

function getData () {
  fetch(`${URL}/data`)
    .then((response) => response.json())
    .then((data) => {
      renderThumbnails(data);
      setFilter(data, debounce(renderThumbnails));
    })
    .catch(() => {
      showRenderError();
    });
}

function sendData (onSuccess, onError, data) {
  fetch( URL,
    {
      method: 'POST',
      body: data,
      type: 'multipart/form-data',
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    }
    else  {
      onError();
    }
  })
    .catch(() => {
      onError();
    });
}

export {getData, sendData};
