import {renderThumbnails} from './render-thumbnails.js';
import { getData } from './api.js';
import './form.js';
import './applying-filters.js';
import {applyDefaultFilter, applyRandomFilter, applyDiscussedFilter} from './content-filter.js';
import {debounce} from './utils/debounce.js';
import {getRandomImages, getSortedImages} from './utils.js';
/*getData(renderThumbnails, showRenderError);*/

getData((images) => {
  renderThumbnails(images);
  applyDefaultFilter(debounce(() => renderThumbnails(images)));
  applyRandomFilter(debounce(() => renderThumbnails(getRandomImages(images))));
  applyDiscussedFilter(debounce(() => renderThumbnails(getSortedImages(images))));
});

