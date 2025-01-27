const searchBtn = document.querySelector('.searchBtn');
const inputSearch = document.querySelector('.searchInput');
const searchContainer = document.querySelector('.searchContainer');
const clearBtn = document.querySelector('.closeBtn');

const getData = async function (e) {
  searchContainer.innerHTML = '';

  e.preventDefault();
  try {
    const data = await fetch('./travel_recommendation_api.json');
    const recData = await data.json();
    const countries = recData.countries;
    const beaches = recData.beaches;
    const temples = recData.temples;
    const search = inputSearch.value.toLowerCase().trim();
    if (search === 'beach' || search === 'beaches') {
      beaches.forEach((el) => {
        const html = `<div class="searchItems">
          <div>
            <img
              src="${el.imageUrl}"
              alt=""
              class="searchImg"
            />
          </div>
          <div class="searchPlace">
            <p class="placeName">${el.name}</p>
            <p class="placeDesc">
              ${el.description}
            </p>
            <div>
              <button class="visitBtn">Visit</button>
            </div>
          </div>
        </div>`;
        searchContainer.insertAdjacentHTML('afterbegin', html);
      });
    } else if (search === 'temple' || search === 'temples') {
      temples.forEach((el) => {
        const html = `<div class="searchItems">
          <div>
            <img
              src="${el.imageUrl}"
              alt=""
              class="searchImg"
            />
          </div>
          <div class="searchPlace">
            <p class="placeName">${el.name}</p>
            <p class="placeDesc">
              ${el.description}
            </p>
            <div>
              <button class="visitBtn">Visit</button>
            </div>
          </div>
        </div>`;
        searchContainer.insertAdjacentHTML('afterbegin', html);
      });
    } else if (countries.find((el) => el.name.toLowerCase() === search)) {
      const country = countries.find((el) => el.name.toLowerCase() === search);
      country.cities.forEach((el) => {
        const html = `<div class="searchItems">
          <div>
            <img
              src="${el.imageUrl}"
              alt=""
              class="searchImg"
            />
          </div>
          <div class="searchPlace">
            <p class="placeName">${el.name}</p>
            <p class="placeDesc">
              ${el.description}
            </p>
            <div>
              <button class="visitBtn">Visit</button>
            </div>
          </div>
        </div>`;
        searchContainer.insertAdjacentHTML('afterbegin', html);
      });
    } else alert('Destination not found');
  } catch (error) {
    console.log(error);
  }
};

searchBtn.addEventListener('click', getData);
clearBtn.addEventListener('click', () => {
  searchContainer.innerHTML = '';
});
