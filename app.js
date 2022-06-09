//GLOBAL CONSTANTS
const API_KEY = "nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H";
const LIMIT = "9";
const RATING = "g";

//Query Selector Elements
let giphForm = document.querySelector("#form-area");
let giphArea = document.querySelector("#gif-results");
let giphInput = document.getElementById("input");
let giphButton = document.getElementById("search");
let resetButton = document.getElementById("reset");
let showMoreButton = document.querySelector(".hidden");

//Variables for Show More Button
let pgNum = 0;
let offset = 0;

//Event Listener Elements
giphButton.addEventListener("click", () => {
    let apiRequest = "http://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + giphInput.value + "&limit=" + LIMIT + "&rating=" + RATING;
    getResults(apiRequest);
    
    showMoreButton.classList.remove("hidden");

    showMoreButton.addEventListener("click", () => {
        offset+=10;
        getResults(apiRequest);
        pgNum++;
    });
});

resetButton.addEventListener("click", () => {
    giphArea.innerHTML = ``;
    giphInput.value ="";
    showMoreButton.classList.add("hidden");
});


//Function to get results from the API
/**
 * @param {String} apiRequest - HTTP Request
 */
 async function getResults(apiRequest)
 {
     apiRequest = apiRequest + "&offset=" + offset; //Updates url whenever show me more button is pressed
     let response = await fetch(apiRequest);
     let responseData = await response.json();
     displayResults(responseData);
 }

//Function to handle the logic for displaying gifs
/**
 * 
 * @param {String} giphyData 
 */
function displayResults(giphyData)
{   console.log(giphyData);
    for(let i = 0; i < giphyData.data.length; i++)
    {
        giphArea.innerHTML +=
        `
            <img src="${giphyData.data[i].images.fixed_height.url}" alt="${giphInput} gif" />
        `;
    }
}