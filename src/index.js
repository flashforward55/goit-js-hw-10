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
    const name = document.createElement('span');
  });
}

function renderCountryInfo() {}

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
