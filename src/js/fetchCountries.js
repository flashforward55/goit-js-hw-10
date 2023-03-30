import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountries(name) {
  const fields = 'name,capital,population,flags,languages';
  const url = `https://restcountries.com/v3.1/name/${name}?fields=${fields}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      if (response.status == 404) {
        throw Notify.failure(`Oops, there is no country with that name`);
      }
      throw Notify.failure(`Error! Status ${response.status}`);
    }
    return response.json();
  });
}
export default fetchCountries;
