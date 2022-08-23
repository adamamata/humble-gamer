const apiKey = process.env.API_KEY||'50c84e8a12de4985bebf0f23e0d6ed5d';
const apiBase = "https://api.rawg.io/api/games?key="
const axios = require('axios');
// const { response } = require('../../app');

const searchItem = 'Fortnite';

function searchButton() {
axios
    .get(`${apiBase}${apiKey}&search=${searchItem}`)
    .then((response) => {
        // const results = response.results;
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    })
}
searchButton();