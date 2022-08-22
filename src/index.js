import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
let debounce = require('lodash.debounce');

const searchBox = document.querySelector('#searchBox');
const countryList = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
function searchCountry() {
  const inputText = searchBox.value.trim();

  fetchCountries(inputText)
    .then(value => {
      if (value.length === 1) {
        renderPost(value);
      } else if (value.length >= 2 && value.length <= 10) {
        renderPosts(value);
      } else if (value.length != 0) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    })
    .catch(err => {});
}
function renderPosts(posts) {
  const markup = posts
    .map(({ name, flags }) => {
      return `<li class="list"    >
      <img src="${flags.svg}" alt="flags" width="30" height="20">
          <h5>${name.official}</h5>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
function renderPost(posts) {
  const markup = posts
    .map(({ name, capital, population, flags, languages }) => {
      return `
      <li>
      <div  class ="capital">
       <img src="${flags.svg}" alt="flags" width="50" height="30">
        <h2>${name.official}</h2>
       </div>
         
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${Object.values(languages).join(', ')}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
