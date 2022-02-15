// API setup constant 
const API_KEY = "bgF6tfs0ZZA53GUd5a8X4x6-Vr4";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));  // reference to the bootstrap modal

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
        displayStatus(data);
        // console.log(data);
    } else {
        throw new Error(data.error);  // throwing the descriptive msg from json
    }
};

// Passing the data to the display function
function displayStatus(data){
    document.getElementById("resultsModalTitle").innerText = "API Key Status";
    document.getElementById("results-content").innerText = `Your key is valid until\n${data.expiry}`;
    resultsModal.show();
}