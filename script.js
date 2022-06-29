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
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeEnd', msg);
//   countriesContainer.style.opacity = 1;
// };

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   )
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}`));
// };

// whereAmI(52.508, 13.381); // Berlin, Germany
// whereAmI(19.037, 72.873); // Mumbai, India
// whereAmI(-33.933, 18.474); //Cape Town South Africa

/*

THE EVENT LOOP IN PRACTICE

*/

/*
The console log for the code above (priority)


Test Start
script.js:279 Test end
script.js:278 Resolved promise 1
script.js:277 0 sec timer

*/

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 5000; i++) console.log(res);
// });
// console.log('Test end');

/*

BUILD A SIMPLE PROMISE

*/

// Simulate a lottery

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('The lottery draw begin');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN :)');
//     } else {
//       reject(new Error('You lost your money :('));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisify -  seTimeot

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(3);
//   })
//   .then(() => console.log('4 seconds passed'));

// the above is the same

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem')).catch(x => console.error(x));

/*

PROMISIFYING THE GEOLOCATION API

*/

// console.log('Getting the current position');

// Promisify
// const getPositon = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(new Error('I didnt get your position'))
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPositon().then(position => console.log(position));

// const whereAmI = function () {
//   getPositon()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//       );
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}`));
// };

// btn.addEventListener('click', whereAmI);

/*
Coding Challenge #2
For this challenge you will actually have to watch the video! Then, build the image
loading functionality that I just showed you on the screen.
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by
yourself. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives 'imgPath' as an input.
This function returns a promise which creates a new image (use
document.createElement('img')) and sets the .src attribute to the
provided image path
2. When the image is done loading, append it to the DOM element with the
'images' class, and resolve the promise. The fulfilled value should be the
image element itself. In case there is an error loading the image (listen for
the'error' event), reject the promise
3. If this part is too tricky for you, just watch the first part of the solution
PART 2
4. Consume the promise using .then and also add an error handler
5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier
6. After the 2 seconds have passed, hide the current image (set display CSS
property to 'none'), and load a second image (Hint: Use the image element
returned by the 'createImage' promise to hide the current image. You will
need a global variable for that 😉)
7. After the second image has loaded, pause execution for 2 seconds again
8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong
image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
otherwise images load too fast
GOOD LUCK 😀
*/

// find the image class
// const imgContainer = document.querySelector('.images');

// Add a wait function for for the loading time
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // Add a function that creates the images
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Cant load the image'));
//     });
//   });
// };

// Add the current image to a variable outside so you can access it
// let currentImg;

// Call the createImage function and make it switch images every 3 seconds
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 is loaded');
//     return wait(3);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 is loaded');
//     return wait(3);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 3 is loaded');
//     return wait(3);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error('Image not found'));

/*

CONSUMING PROMISES ASYNC/AWAIT

*/

// const getPositon = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPositon();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     // reverse geocoding
//     const reverseGeo = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//     );
//     if (!reverseGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await reverseGeo.json();

//     // Country data
//     const response = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.countryName}`
//     );
//     if (!response.ok) throw new Error('Problem getting country');
//     const data = await response.json();

//     renderCountry(data[0]);
//     return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
//   } catch (err) {
//     console.error(err);
//     renderError(`${err.message}`);
//     // reject promise returned from async unction
//     throw err;
//   }
// };

// console.log('1: will get location');

// IFFY async function calling other async function!

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (err) {
//     console.err(`2:${err.message}`);
//   }
//   console.log('3: finished getting location');
// })();

// Try catch - handling errors
// try {
//   let y = 1;
//   const x = 1;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

// Running promises in parallel

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// Running the data in sequence
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     console.log(data1.capital, data2.capital, data3.capital);
//   } catch (err) {
//     console.error(err);
//   }
// };

// Running in parallel to load it faster

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(data.flatMap(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('macedonia', 'canada', 'tanzania');

// Promise.race

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };
// (async function () {
//   const res = await Promise.race(
//     getJSON(`https://restcountries.com/v3.1/name/macedonia`),
//     getJSON(`https://restcountries.com/v3.1/name/iatly`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`)
//   );
//   console.log(res[0]);
// })();

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/macedonia`),
//   timeout(0.1),
// ]);

// Promise.allSettled
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('error'),
//   Promise.resolve('Success 2'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// Promise.any [ES 2021]
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('error'),
//   Promise.resolve('Success 2'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

/*

Coding Challenge #3
Your tasks:
PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time
using async/await (only the part where the promise is consumed, reuse the
'createImage' function from before)
2. Compare the two versions, think about the big differences, and see which one
you like more
3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab
PART 2
1. Create an async function 'loadAll' that receives an array of image paths
'imgArr'
2. Use .map to loop over the array, to load all the images with the
'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles)
Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
3.jpg']. To test, turn off the 'loadNPause' function
GOOD LUCK 😀

  */

const imgContainer = document.querySelector('.images');
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

let currentImg;

const loadNPause = async function () {
  const createImage = await createImage('img/img-1.jpg')
    .then(img => {
      currentImg = img;
      console.log('Image 1 is loaded');
      return wait(3);
    })
    .then(() => {
      currentImg.style.display = 'none';
      return createImage('img/img-2.jpg');
    })
    .then(img => {
      currentImg = img;
      console.log('Image 2 is loaded');
      return wait(3);
    })
    .then(() => {
      currentImg.style.display = 'none';
      return createImage('img/img-3.jpg');
    })
    .then(img => {
      currentImg = img;
      console.log('Image 3 is loaded');
      return wait(3);
    })
    .then(() => {
      currentImg.style.display = 'none';
    })
    .catch(err => console.error('Image not found'));

  // Add a function that creates the images
  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;

      img.addEventListener('load', function () {
        imgContainer.append(img);
        resolve(img);
      });
      img.addEventListener('error', function () {
        reject(new Error('Cant load the image'));
      });
    });
  };
};
