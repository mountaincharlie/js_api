// API setup constant 
const API_KEY = "bgF6tfs0ZZA53GUd5a8X4x6-Vr4";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultModal = new bootstrap.Modal(document.getElementById("resultsModal"));  // reference to the bootstrap modal

// wiring up the ___ button when clicked
document.getElementById("status").addEventListener("click", e => getStatus(e));

// GET request to the API_URL with API_KEY - with asynchronous function
async function getStatus(e){
    // creating in format from the API instructions
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    // getting the response ('await' since this is a promise)
    const response = await fetch(queryString);
    // converting into json
    const data = await response.json();
    // error checking - checking if the response = ok
    if (response.ok){
        console.log(data.expiry);
    };

}

// Passing the data to the display function