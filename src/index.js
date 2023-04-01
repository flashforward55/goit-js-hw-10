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
    li.addEventListener('click', () => {
      searchBox.value = country.name.official;
      renderCountryInfo([country]); // one country
      // renderCountryInfo(countries); // all countries
      countryList.innerHTML = '';
      Notify.success('Request completed successfully.');
    });
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
  const searchCountries = searchBox.value.trim();

  if (!searchCountries) {
    handleSearchClearMarkup();
    return;
  }

  fetchCountries(searchCountries).then(countries => {
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length >= 2) {
      renderCountryList(countries);
      countryInfo.innerHTML = '';
    } else if (countries.length === 1) {
      renderCountryInfo(countries[0]);
      countryList.innerHTML = '';
      Notify.success('Request completed successfully.');
    } else {
      Notify.warning(`Error! Status ${countries.status}`);
      handleSearchClearMarkup();
    }
  });
}

function handleSearchClearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
const handleSearchDebounced = debounce(handleSearch, DEBOUNCE_DELAY);

searchBox.addEventListener('input', handleSearchDebounced);
