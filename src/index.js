import "./css/styles.css";
import debounce from "lodash.debounce";
import { fetchCountries } from "./fetchCountries";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector("#search-box");
const countryInfoEl = document.querySelector(".country-info");
const countryListEl = document.querySelector(".country-list");

searchEl.addEventListener("input", debounce(handleSearchCountry, DEBOUNCE_DELAY)
);

function handleSearchCountry(event) {
    let country = event.target.value.trim();
        if(country){
            return fetchCountries(country)
    .then(data =>{
        markup(data);

    })
    .catch(error => {
        Notify.failure("Oops, there is no country with that name");
    })
        }else{
            countryListEl.innerHTML = '';
            countryInfoEl.innerHTML = '';
        }
    

}

function markup(data){
    if(data.length === 1){
        countryListEl.innerHTML = '';

        return cardOfCountry(data);
    }

    if (data.length >= 2 && data.length <= 10){
        countryInfoEl.innerHTML = '';

        return listOfCountries(data);
    }

    return Notify.info("Too many matches found. Please enter a more specific name.");
}

function listOfCountries(data){
    const card = data.map(el => {
    return `<li><img src=${el.flags.svg} width=40 alt="flags"> ${el.name.official}</li>`}).join('');

    countryListEl.innerHTML = card;
}

function cardOfCountry(data){
    const card = data.map(el => {
        return `<ul>
        <li><img src=${el.flags.svg} width=40 alt="flags"> <h2>${el.name.official}</h2></li>
        <li><h3>Capital:</h3> ${el.capital}</li>
        <li><h3>Population:</h3> ${el.population}</li>
        <li><h3>Languages:</h3> ${Object.values(el.languages).join(', ')}</li>
        </ul>
        `}).join('');
    countryInfoEl.innerHTML = card;
}