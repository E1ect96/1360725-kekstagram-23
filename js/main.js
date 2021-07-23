import {renderThumbnails} from './render-thumbnails.js';
import { getData } from './api.js';
import './form.js';
import './applying-filters.js';

const showRenderError = function () {
  alert('Ошибка');
};

const URL = 'https://23.javascript.pages.academy/kekstagram';
getData(URL, renderThumbnails, showRenderError);
