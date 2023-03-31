import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountries(name) {
  const fields = 'name,capital,population,flags,languages';
  const url = `https://restcountries.com/v3.1/name/${name}?fields=${fields}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      Notify.failure(`Oops, there is no country with that name`);
    }
    return response.json();
  });
}
export default fetchCountries;
