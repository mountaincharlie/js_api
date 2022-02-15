// ----------------- API setup constants 
const API_KEY = "bgF6tfs0ZZA53GUd5a8X4x6-Vr4";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));  // reference to the bootstrap modal


// ----------------- Event Listeners

// click Event Listener for 'check key' button
document.getElementById("status").addEventListener("click", e => getStatus(e));
// click Event Listener for 'run checks' button
document.getElementById("submit").addEventListener("click", e => postForm(e));


// ----------------- POST request for the api to check our JS code

// POST request to the API_URL with API_KEY and form data - uses async function
async function postForm(e){
    // FormData method to convert form data into an object
    const form = new FormData(document.getElementById("checksform"));

    // test for checking the data is taken correctly from the form
    // for (let entry of form.entries()){
    //     console.log(entry);
    // };

    // dict object with info to POST to the API
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

    // converting into json
    const data = await response.json();
    // error checking - checking if the response = ok
    if (response.ok){
        displayErrors(data);
        // console.log(data);
    } else {
        throw new Error(data.error);  // throwing the descriptive msg from json
    }
};

// Displaying errors in the modal
function displayErrors(data){
    // // checking if no errors in their code
    if (data.total_errors === 0){
        results = `<div class="no_errors">No errors found!</div>`
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`
        // iterating thru the errors
        for (let error of data.error_list){
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}</span></div>`;
        results += `<div class="errors">${error.error}</div>`;
        }
    }
    // displaying in the modal
    document.getElementById("resultsModalTitle").innerText = `JSHint Results for ${data.file}`;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
};


// ----------------- GET request to retrieve/display api key status

// GET request to the API_URL with API_KEY - with async function
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

// Displaying status in the modal
function displayStatus(data){
    document.getElementById("resultsModalTitle").innerText = "API Key Status";
    document.getElementById("results-content").innerHTML = `<div>Your key is valid until<br>${data.expiry}</div>`;
    resultsModal.show();
}
