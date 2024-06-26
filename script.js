'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function (country) {
//   // Old school way of doing AJAX in Javascript
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);

//     const data = JSON.parse(this.responseText)[0];

//     const language = Object.values(data.languages)[0];
//     const currency = Object.values(data.currencies)[0].name;

//     const html = `
//    <article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${language}</p>
//             <p class="country__row"><span>💰</span>${currency}</p>
//           </div>
//         </article>
//         `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);

//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('italy');
// getCountryData('japan');

// Get country and its neighbour
const renderCountry = function (data, className = '') {
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  const html = `
  <article class="country ${className}">
         <img class="country__img" src="${data.flags.svg}" />
         <div class="country__data">
           <h3 class="country__name">${data.name.common}</h3>
           <h4 class="country__region">${data.region}</h4>
           <p class="country__row"><span>👫</span>${(
             +data.population / 1000000
           ).toFixed(1)} people</p>
           <p class="country__row"><span>🗣️</span>${language}</p>
           <p class="country__row"><span>💰</span>${currency}</p>
         </div>
       </article>
       `;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX call country (1)
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText)[0];

    // Render country (1)
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // AJAX call country (2)
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// ==========================================
// Using fetch API

// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders[0];
      console.log(neighbour);

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0], 'neighbour');
    });
};

getCountryData('portugal');
