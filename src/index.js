import './css/styles.css';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const listEl = document.querySelector('.country-list')


inputEl.addEventListener('input', debounce(onSearchboxInput, DEBOUNCE_DELAY))

function onSearchboxInput() {
    fetchCountries(inputEl.value)
}



function fetchCountries(name) {
fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(resolve => resolve.json())
    .then(countries => {
        console.log(countries);
        for (const country of countries) {
            const marcup = `<li><img src="${country.flags.svg}" alt="flag" width = "80" height = "80" ></li>`
            listEl.innerHTML = marcup
        }
    })
.catch(error => console.log(error))
}


