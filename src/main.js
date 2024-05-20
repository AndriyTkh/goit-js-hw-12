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
const loadMoreBtn = document.querySelector('button[type="button"]');
const loader = document.querySelector(`.loader`);
let userInput;
let currentPage;
let lightbox = new SimpleLightbox('.gallery-link');
lightbox.options.captionDelay = 250;
lightbox.options.captionsData = 'alt';

form.addEventListener('submit', event => {
  event.preventDefault();

  document.querySelector('.gallery').innerHTML = '';
  currentPage = 1;

  loadPage(currentPage);
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;

  loadPage(currentPage);
});

async function loadPage(page) {
  /* --------- Check user input ----------- */

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

  /* ----------- Render gallery ----------- */

  const dataPromise = pixabay.getImgData(userInput, page);

  dataPromise
    .then(response => {
      const hits = response.data.hits;

      if (hits.length == 0) {
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

      /* ----------- Render loader ------------- */

      loader.hidden = false;
      loadMoreBtn.hidden = true;

      setTimeout(() => {
        loader.hidden = true;

        imgRender.renderGallery(hits);
        lightbox.refresh();

        if (response.data.totalHits <= page * 15) {
          loadMoreBtn.hidden = true;
          iziToast.info({
            theme: 'dark',
            position: 'topRight',
            messageColor: '#FFFFFF',
            backgroundColor: '#0099FF',
            progressBarColor: '#0071BD',
            message: `We're sorry, but you've reached the end of search results.`,
            timeout: 2000,
          });
        } else {
          loadMoreBtn.hidden = false;
        }

        if (page !== 1) {
          window.scrollBy({
            top:
              document.querySelector('.img-container').getBoundingClientRect()
                .height * 2,
            behavior: 'smooth',
          });
        }
      }, 500);
    })
    .catch(error => {
      console.error(error);
    });
}
