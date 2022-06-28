'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*

ASYNCHRONOUS JAVASCRIPT

*/
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeEnd', msg);
//   // countriesContainer.style.opacity = 1;
// };

// const renderCountry = function (data, className = '') {
//   const languages = Object.values(data.languages);
//   const currencies = Object.values(data.currencies);
//   const html = `
//   <article class="country ${className}">
//  <img class="country__img" src= "${data.flags.svg}">
//  <div class="country__data">
//    <h3 class="country__name"> ${data.name.official}</h3>
//    <h4 class="country__region">${data.region}</h4>
//    <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
//      1
//    )} million</p>
//    <p class="country__row"><span>🗣️</span>${languages[0]}</p>
//    <p class="country__row"><span>💰</span>${currencies[0].name}</p>
//  </div>
// </article>`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   // countriesContainer.style.opacity = 1;
// };

// function renderCountry(data, className = '') {
//   const html = `
//   <article class="country ${className}">
//       <img class="country__img" src="${data.flags.png}" />
//       <div class="country__data">
//           <h3 class="country__name">${data.name.common}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👫</span>${Number(
//             data.population / 1000000
//           ).toFixed(1)}M people</p>
//           <p class="country__row"><span>🗣️</span>${
//             Object.values(data.languages)[0]
//           }</p>
//           <p class="country__row"><span>💰</span>${
//             Object.values(data.currencies)[0].name
//           }</p>
//       </div>
//   </article>`;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
// }

// Old way

// const getCountryAndNeighbour = function (country) {
//   // Ajax call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data); //use this to study the data you want to use.

//     //   Show country data 1
//     renderCountry(data);

//     // Get neighbour country
//     const [neighbour] = data.borders?.[0];
//     // Ajax call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// Sample countries whose details we want to display.
// getCountryAndNeighbour('usa');

// Newer way - promises (use this)
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// Promise is a container for a future value (asynchronus operation)

// const getCountryData = function (country) {
//   // Use fetch with a callback function
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       // How to see the response data, it will also return another promise
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Same as above just simplified

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// // Short way
// const getCountryData = function (country) {
//   // Use fetch with a callback function
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(response => response.json()) // Returns a response
//     .then(data => {
//       renderCountry(data[0]); // Use then to see the data and show it
//       const neighbour = data[0].borders;
//       if (!neighbour) throw new Error('No neighbour found!');

//       // Neighbour
//       // We need to return the promise in order to chain a new (then) method to it
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} :)`);
//       renderError(`Something went wrong ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// Long way
// const getCountryData = function (country) {
// Use fetch with a callback function
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json()) // Returns a response
//     .then(data => {
//       renderCountry(data[0]); // Use then to see the data and show it
//       // const neighbour = data[0].borders;
//       const neighbour = 'asdsadasda';
//       // Neighbour
//       // We need to return the promise in order to chain a new (then) method to it
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`);
//     })
//     .then(response => {
//       console.log(response);
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} :)`);
//       renderError(`Something went wrong ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('usa');

// Handling errors using catch (line 13, line 107)

// btn.addEventListener('click', function () {
//   getCountryData('macedonia');
// });

// getCountryData('dasdadasadas');

// Throwing errors manually

/*

CHALLENGE 01

Your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the
console
5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.
7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)

*/

function renderCountry(data, className = '') {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${Number(
            data.population / 1000000
          ).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
      </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeEnd', msg);
  countriesContainer.style.opacity = 1;
};

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
};

whereAmI(52.508, 13.381); // Berlin, Germany
whereAmI(19.037, 72.873); // Mumbai, India
whereAmI(-33.933, 18.474); //Cape Town South Africa
