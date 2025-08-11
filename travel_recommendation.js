const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

function searchRecommendation() {
const input = document.getElementById('keywordInput').value.toLowerCase();
const resultDiv = document.getElementById('result');
resultDiv.innerHTML = '';

fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

    let resultsFound = false;

      data.countries.forEach(country => {
        if (country.name.toLowerCase().includes(input)) {
          country.cities.forEach(city => {
            resultDiv.innerHTML += `
              <div class="item">
              <h2>${city.name}</h2>
              <img src="${city.imageUrl}" alt="${city.name}" style="max-width: 300px;"/>
              <p>${city.description}</p>

              </div>
              <hr/>
            `;
          });
          resultsFound = true;
        }
      });

      data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(input)) {
          resultDiv.innerHTML += `
          <div class="item">
            <h2>${temple.name}</h2>
            <img src="${temple.imageUrl}" alt="${temple.name}" style="max-width: 300px;"/>
            <p>${temple.description}</p>
            </div>
            <hr/>
          `;
          resultsFound = true;
        }
      });

      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(input)) {
          resultDiv.innerHTML += `
            <div class="item">
            <h2>${beach.name}</h2>
            <img src="${beach.imageUrl}" alt="${beach.name}" style="max-width: 300px;"/>
            <p>${beach.description}</p>
            </div>
            <hr/>
          `;
          resultsFound = true;
        }
      });

      if (input === 'beach' || input === 'beaches') {
        data.beaches.forEach(beach => {
          resultDiv.innerHTML += `
            <div class="item">
              <h2>${beach.name}</h2>
              <img src="${beach.imageUrl}" alt="${beach.name}" style="max-width: 300px;"/>
              <p>${beach.description}</p>
            </div><hr/>
          `;
        });
        resultsFound = data.beaches.length > 0;
      }
   
      else if (input === 'temple' || input === 'temples') {
        data.temples.forEach(temple => {
          resultDiv.innerHTML += `
            <div class="item">
              <h2>${temple.name}</h2>
              <img src="${temple.imageUrl}" alt="${temple.name}" style="max-width: 300px;"/>
              <p>${temple.description}</p>
            </div><hr/>
          `;
        });
        resultsFound = data.temples.length > 0;
      }
      else if (input === 'country' || input === 'countries') {

        data.countries.forEach(country => {
          country.cities.forEach(city => {
            resultDiv.innerHTML += `
              <div class="item">
                <h2>${city.name}</h2>
                <img src="${city.imageUrl}" alt="${city.name}" style="max-width: 300px;"/>
                <p>${city.description}</p>
              </div><hr/>
            `;
          });
        });
        resultsFound = true;
      }
      if (!resultsFound) {
        resultDiv.innerHTML = '<p>Sorry, there is no matching recommendations.</p>';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'Please check the procedure of fetching data.';
    });
}
function resetRecommendation() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    document.getElementById('keywordInput').value = '';

}
btnSearch.addEventListener('click', searchRecommendation);

btnReset.addEventListener('click', resetRecommendation);