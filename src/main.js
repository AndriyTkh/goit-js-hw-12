'use strict';

// Описаний у документації
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import * as pixabay from './js/pixabay-api.js';
import * as imgRender from './js/render-functions.js';

const form = document.querySelector(`.search-form`);
const loader = document.querySelector(`.loader`);
let userInput;
let lightbox = new SimpleLightbox('.gallery-link');
lightbox.options.captionDelay = 250;
lightbox.options.captionsData = 'alt';

form.addEventListener('submit', event => {
  event.preventDefault();
  userInput = form.elements.userSearch.value.trim();

  if (!userInput) {
    iziToast.error({
      theme: 'dark',
      position: 'topRight',
      messageColor: '#FFFFFF',
      backgroundColor: 'red',
      progressBarColor: '#ff91a4',
      message: `No input provided`,
      title: 'Error',
      timeout: 2000,
    });
    return;
  }

  const dataPromise = pixabay.getImgData(userInput);

  dataPromise
    .then(data => {
      const hits = data.hits;

      if (hits.length == 0) {
        document.querySelector('.gallery').innerHTML = '';

        iziToast.error({
          theme: 'dark',
          position: 'topRight',
          messageColor: '#FFFFFF',
          backgroundColor: 'red',
          progressBarColor: '#ff91a4',
          message: `Sorry, there are no images matching your search query. Please try again!`,
          title: 'Error',
          timeout: 2000,
        });
        return;
      }

      loader.hidden = false;

      setTimeout(() => {
        loader.hidden = true;

        imgRender.renderGallery(hits);
        lightbox.refresh();
      }, 500);
    })
    .catch(error => {
      console.error(error);
    });
});
