export function renderGallery(hits) {
  const gallery = document.querySelector('.gallery');
  let galleryCode = '';

  hits.map(element => {
    galleryCode += `<li>
        <div class = "img-container">
            <a class="gallery-link" href="${element.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${element.webformatURL}"
                    alt="${element.tags}"
                />
            </a>
        </div>
        
        <ul class="description-list">
          <li>
            <span class="list-title">Likes</span>
            <p class="list-text">${element.likes}</p>
          </li>
          <li>
            <span class="list-title">Views</span>
            <p class="list-text">${element.views}</p>
          </li>
          <li>
            <span class="list-title">Comments</span>
            <p class="list-text">${element.comments}</p>
          </li>
          <li>
            <span class="list-title">Downloads</span>
            <p class="list-text">${element.downloads}</p>
          </li>
        </ul>
      </li>`;
  });

  gallery.innerHTML = galleryCode;
}
