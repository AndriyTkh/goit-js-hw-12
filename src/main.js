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
  lightbox.refresh();
  currentPage = 1;

  loadPage();
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;

  loadPage();
});

async function loadPage() {
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

  let response;

  try {
    response = await pixabay.getImgData(userInput, currentPage);
  } catch (error) {
    console.error(error);
  }

  /* --------- Hits check ---------------- */

  const hits = response.data.hits;
  const totalHits = response.data.totalHits;

  if (hits.length == 0) {
    loadMoreBtn.hidden = true;

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
    setLoading(hits, totalHits);
  }, 500);
}

function setLoading(hits, totalHits) {
  loader.hidden = true;

  imgRender.renderGallery(hits);
  lightbox.refresh();

  if (totalHits <= currentPage * 15) {
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

  if (currentPage !== 1) {
    window.scrollBy({
      top:
        document.querySelector('.img-container').getBoundingClientRect()
          .height * 2,
      behavior: 'smooth',
    });
  }
}
