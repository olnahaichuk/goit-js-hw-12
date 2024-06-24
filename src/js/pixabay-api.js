'use strict';
import axios from 'axios';
import iziToast from 'izitoast';

import closeImageURL from '../img/close.png';

let userSymbol;
axios.defaults.baseURL = 'https://pixabay.com';

export async function getImages(userSymbol, currentPage) {
  try {
    const responce = await axios.get('/api/', {
      params: {
        q: userSymbol,
        image_type: 'photo',
        orientation: 'horizontal',
        page: currentPage,
        per_page: 15,
        safesearch: 'true',
        key: '44388717-c7f861c042cec84afe94caebd',
      },
    });
    if (responce.data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    return responce.data;
  } catch (error) {
    showError(
      'Sorry, there was an error fetching images. Please try again later!'
    );
  }
  throw Error;
}
export function showError(message) {
  iziToast.error({
    message,
    maxWidth: '322px',
    iconUrl: closeImageURL,
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    titleColor: '#fff',
    theme: 'dark',
  });
}
