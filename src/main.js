'use strict';

import axios from 'axios';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import simpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './js/pixabay-api';
import {
  imageTemplate,
  imagesTemplate,
  showLoader,
  hideLoader,
  showLoadButton,
  hideLoadButton,
  refs,
} from './js/render-functions';

let searchName;
let currentPage = 1;
let maxPage = 1;
const perPage = 15;

hideLoader();

const lightbox = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formElem.addEventListener('submit', async e => {
  e.preventDefault();

  searchName = e.target.elements.query.value.trim();
  currentPage = 1;
  showLoader();

  refs.galleryElem.innerHTML = '';

  try {
    const res = await getImages(searchName, currentPage);
    console.log(res);
    maxPage = Math.ceil(res.totalHits / perPage);
    const markup = imagesTemplate(res);
    refs.galleryElem.innerHTML = markup;

    updateBtnStatus();

    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      message:
        'Sorry, there was an error fetching images. Please try again later!',
      maxWidth: '322px',
      iconUrl: closeImageURL,
      backgroundColor: '#EF4040',
      messageColor: '#fff',
      titleColor: '#fff',
      theme: 'dark',
    });
  }

  hideLoader();
});
function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadButton();
  } else {
    showLoadButton();
  }
}
refs.btnLoadMore.addEventListener('click', async () => {
  currentPage++;
  const res = await getImages(searchName, currentPage);
  const markup = imagesTemplate(res);
  refs.galleryElem.insertAdjacentHTML('beforeend', markup);
  updateBtnStatus();
});
