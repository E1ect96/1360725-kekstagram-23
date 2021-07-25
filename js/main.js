import {renderThumbnails} from './render-thumbnails.js';
import { getData } from './api.js';
import {showRenderError} from './show-render-error.js';
import './form.js';
import './applying-filters.js';

getData(renderThumbnails, showRenderError);
