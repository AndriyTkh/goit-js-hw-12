export function getImgData(userRequest) {
  const searchParams = new URLSearchParams({
    key: '43812244-bec36bb850e93fe60ae9591d0',
    q: `${userRequest}`,
    image_type: `photo`,
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = 'https://pixabay.com/api/?' + searchParams.toString();

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
