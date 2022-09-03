import {fetchCountries} from './fetchCountries'
import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const listEl = document.querySelector('.country-list')
const infoBox = document.querySelector('.country-info')

inputEl.addEventListener('input', debounce(onSearchboxInput, DEBOUNCE_DELAY))
 
function onSearchboxInput() {
  let inputValue = inputEl.value.trim()
  if (!inputValue) {
    infoBox.innerHTML = ''
    listEl.innerHTML = ''
    return
  }
   fetchCountries(inputValue)
   .then(resolve => {
        if (!resolve.ok) {
          throw new Error(resolve.status || resolve.status === 404);
      }
        return resolve.json()   
    } )
    .then(countries => {
        if (countries.length > 10) {
            listEl.innerHTML = ''
             Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
            
        } else if (countries.length <= 10 & countries.length > 1) {
          renderMarcupList(countries)
     
        } else {
            listEl.innerHTML = ''
           renderMarcupBox(countries)
        }
    })
    .catch(error => {
        listEl.innerHTML = ''
        infoBox.innerHTML = ''
        console.log(error);
        Notiflix.Notify.failure("Oops, there is no country with that name")
        // Notiflix.Report.failure('извините, вы ищите какую-то хрень')

})
}

function renderMarcupList(countries) {
      const marcup = countries
            .map(({ name,flags,}) =>
             `<li class="country-item"><img src="${flags.svg}" alt="flag" width = "20" height = "15"><p class="country-title">${name.common}</p></li>`)
            .join('')
            listEl.innerHTML = marcup
            infoBox.innerHTML = ''
}
function renderMarcupBox(countries) {
 const marcup = countries
                .map(({ name, capital, population, flags, languages }) =>
                 `<div class="country-info-box">
                    <img src="${flags.svg}" alt="flag" width="20" height="15">
                     <h2 class = "country-info-title">${name.official}</h2>
                    </div>
                    <ul class="country-info-list">
                    <li class="country-info-item"><span class="country-info-span">Capital:</span> ${capital}</li>
                    <li class="country-info-item"><span class="country-info-span">Population:</span> ${population}</li>
                    <li class="country-info-item"><span class="country-info-span">Languages:</span> ${Object.values(languages).join(',  ')}</li>
                    </ul>`)
                .join('')
            infoBox.innerHTML = marcup
}
