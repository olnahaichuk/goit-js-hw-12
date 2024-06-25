'use strict';

import axios from 'axios';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import simpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages, showError } from './js/pixabay-api';
import {
  imageTemplate,
  imagesTemplate,
  showLoader,
  hideLoader,
  showLoadButton,
  hideLoadButton,
  skipOldElement,
  refs,
} from './js/render-functions';

let searchName;
let currentPage = 1;
export let maxPage = 1;
const perPage = 15;

hideLoader();

const lightbox = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formElem.addEventListener('submit', async e => {
  e.preventDefault();

  searchName = e.target.elements.query.value.trim();
  if (!searchName) {
    showError('The input field must not be empty');
    return;
  }
  currentPage = 1;
  showLoader();
  hideLoadButton();
  refs.galleryElem.innerHTML = '';

  try {
    const res = await getImages(searchName, currentPage);
    maxPage = Math.ceil(res.totalHits / perPage);
    const markup = imagesTemplate(res);
    refs.galleryElem.innerHTML = markup;

    updateBtnStatus();

    lightbox.refresh();
  } catch (error) {
    showError(
      'Sorry, there was an error fetching images.Please try again later!'
    );
  }

  hideLoader();
});

refs.btnLoadMore.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  hideLoadButton();
  try {
    const res = await getImages(searchName, currentPage);
    const markup = imagesTemplate(res);
    refs.galleryElem.insertAdjacentHTML('beforeend', markup);
    skipOldElement();
    lightbox.refresh();
  } catch {
    showError('Something goes wrong!');
  }

  hideLoader();
  updateBtnStatus();
});
export function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadButton();
    if (maxPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } else {
    showLoadButton();
  }
}
