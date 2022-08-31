import './css/styles.css';
import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
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
        if (countries.length > 5) {
          return  alert('Слишком много совпадений')
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


//    for (const country of countries) {
//             const marcup = `<li><img src="${country.flags.svg}" alt="flag" width = "80" height = "80" ></li>`
//            
//         }