import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const listEl = document.querySelector('.country-list')


inputEl.addEventListener('input', debounce(onSearchboxInput, DEBOUNCE_DELAY))

function onSearchboxInput() {
    fetchCountries(inputEl.value.trim())
}



function fetchCountries(name) {
fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(resolve => resolve.json())
    .then(countries => {
        if (countries.length > 10) {
         return Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
        } else if(countries.length === 1) {
listEl.classList.add('country-title-info')
        }
        const marcup = countries
            .map(({ name, capital, population, flags, languages }) =>
             `<li class="country-item">
            <img src="${flags.svg}" alt="flag" width = "20" height = "15">
            <p class="country-title">${name.common}</p>
            </li>`)
            .join('')
         listEl.innerHTML = marcup
     console.log(countries.length);
    })
.catch(error => console.log(error))
}


