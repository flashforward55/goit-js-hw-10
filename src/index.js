import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function handleSearch() {
  const searchTerm = searchBox.value.trim();

  if (!searchTerm) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
}

const handleSearchDebounced = debounce(handleSearch, DEBOUNCE_DELAY);

searchBox.addEventListener('input', handleSearchDebounced);
