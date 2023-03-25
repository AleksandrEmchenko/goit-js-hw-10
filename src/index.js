import './css/styles.css';
import _debounce from "lodash.debounce";
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');

searchEl.addEventListener('input', _debounce(handleSearchCountry, DEBOUNCE_DELAY));



function handleSearchCountry(event){
    const nameCountry = event.target.value.trim();

   fetchCountries(nameCountry)
   .then((data) => {
    console.log(data);
    console.log(data.capital);

  })
  .catch((err) => {
    console.warn(err);
  });
}

// if (nameCountry > 2){
//     Notify.info('Too many matches found. Please enter a more specific name.')
//   }
// if(!nameCountry){
//     Notify.failure('Oops, there is no country with that name');
// }

