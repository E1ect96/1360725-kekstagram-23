import {renderThumbnails} from './render-thumbnails.js';
import { getData } from './api.js';
import {showRenderError} from './show-render-error.js';
import './form.js';
import './applying-filters.js';
const URL = 'https://23.javascript.pages.academy/kekstagram';

getData(URL, renderThumbnails, showRenderError);

export {URL};
