import {showRenderError} from './show-render-error.js';

const URL = 'https://23.javascript.pages.academy/kekstagram';

const getData = function (onSuccess) {
  fetch(`${URL}/data`)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showRenderError();
    });
};

const sendData = function (onSuccess, onError, data) {
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
};

export {getData, sendData};