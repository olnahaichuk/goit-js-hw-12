'use strict';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './pixabay-api.js';

export const refs = {
  formElem: document.querySelector('form'),
  galleryElem: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.js-btn-load'),
};

refs.loader.className = 'loader';

export function showLoader() {
  refs.loader.classList.remove('hidden');
}
export function hideLoader() {
  refs.loader.classList.add('hidden');
}
export function showLoadButton() {
  refs.btnLoadMore.classList.remove('hidden-btn');
}
export function hideLoadButton() {
  refs.btnLoadMore.classList.add('hidden-btn');
}
export function imageTemplate({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item">
          <a
            class="gallery-link"
            href="${largeImageURL}"
          >
            <img
              class="gallery-image"
              src="${webformatURL}"
              data-source="${largeImageURL}"
              alt="${tags}"
            />
          </a>
          <div class="desc">
          <p class="desc-item"><span class="desc-item-style">Likes</span><br> ${likes}</p>
          <p class="desc-item"><span class="desc-item-style">Views</span><br> ${views}</p>
          <p class="desc-item"><span class="desc-item-style">Comments</span><br> ${comments}</p>
          <p class="desc-item"><span class="desc-item-style">Downloads</span><br> ${downloads}</p>
          </div>
          
        </li>
  `;
}

export function imagesTemplate(data) {
  return data.hits.map(image => imageTemplate(image)).join('\n');
}
export function skipOldElement() {
  const liElem = refs.galleryElem.children[0];
  const height = liElem.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
