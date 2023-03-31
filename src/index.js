import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function renderCountryList(countries) {
  countryList.innerHTML = '';
  countries.forEach(country => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const span = document.createElement('span');

    img.src = country.flags.svg;
    img.alt = `${country.name.common} flag`;
    span.textContent = country.name.official;

    li.append(img, span);
    countryList.append(li);
  });
}

function renderCountryInfo(country) {
  countryInfo.innerHTML = country
    .map(
      ({
        name,
        capital,
        population,
        flags,
        languages,
      }) => `<div class="country-info__flag">
      <img src="${flags.svg}" alt="${name.common} flag">
    </div>
    <div class="country-info__text">
      <h2 class="country-info__name">${name.official}</h2>
      <p><span>Capital:</span> ${capital}</p>
      <p><span>Population:</span> ${population.toLocaleString()}</p>
      <p><span>Languages:</span> ${Object.values(languages).join(', ')}</p>
    </div>`
    )
    .join('');
}
/* function renderCountryInfo(country) {
  const languages = Object.values(country.languages).join(', ');

  countryInfo.innerHTML = `
    <div class="country-info__flag">
      <img src="${country.flags.svg}" alt="${country.name.common} flag">
    </div>
    <div class="country-info__text">
      <h2 class="country-info__name">${country.name.official}</h2>
      <p><span>Capital:</span> ${country.capital}</p>
      <p><span>Population:</span> ${country.population.toLocaleString()}</p>
      <p><span>Languages:</span> ${languages}</p>
    </div>
  `;
} */

function handleSearch() {
  const searchTerm = searchBox.value.trim();

  if (!searchTerm) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchTerm).then(countries => {
    if (countries.length > 10) {
      throw Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (countries.length >= 2) {
      renderCountryList(countries);
    } else if (countries.length === 1) {
      renderCountryInfo(countries[0]);
    } else {
      throw Notify.failure('Oops, there is an error. Please try again.');
    }
  });
}
const handleSearchDebounced = debounce(handleSearch, DEBOUNCE_DELAY);

searchBox.addEventListener('input', handleSearchDebounced);
