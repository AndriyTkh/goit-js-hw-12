import axios from 'axios';

export function getImgData(userRequest, page) {
  return axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '43812244-bec36bb850e93fe60ae9591d0',
      q: `${userRequest}`,
      image_type: `photo`,
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${page}`,
      per_page: '15',
    },
  });
}
