import {renderThumbnails} from './render-thumbnails.js';
import {getPhotos} from './data.js';
import './form.js';

const NUMBER_OF_PHOTOS = 25;
const demoData = getPhotos(NUMBER_OF_PHOTOS);
renderThumbnails(demoData);
