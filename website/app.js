/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=9f3cc97527bc254a864395a08dde41f8";
const newZip = document.getElementById("zip");
const yourFeels = document.getElementById("feelings");
const postURL = "http://localhost:3030";
const getURL = "http://localhost:3030/all";
const dateHolder = document.getElementById("date");
const tempHolder = document.getElementById("temp");
const contentHolder = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const generate = async () => {
    getTemp(baseURL, newZip.value, apiKey);
};
//creates the link to fetch the API data then runs the post function and updateUI functions
const getTemp = async (link, zip, key) => {
    const res = await fetch(`${link}${zip}${key}`);
    try {
        const apiData = await res.json();
        console.log(apiData.main.temp);
        const data = {
            date: newDate,
            temperature: apiData.main.temp,
            feelings: yourFeels.value,
        };
        await postData(postURL, data);
        updateUI();
        return data;
    } catch (error) {
        //displays a warning if the zip code entered is invalid
        alert("Invalid Zip Code!");
        console.log("error", error);
    }
};
//posts the data to the server
const postData = async (path, data = {}) => {
    const response = await fetch(path, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};
// updates the UI with the date, user's feelings, and temp from API
const updateUI = async () => {
    const response = await fetch(getURL);
    const jsonResponse = await response.json();
    dateHolder.innerHTML = `<span class="entry-item">Date: </span>${jsonResponse.date}`;
    contentHolder.innerHTML = `<span class="entry-item">You feel: </span>${jsonResponse.feelings}`;
    tempHolder.innerHTML = `<span class="entry-item">Temperature: </span>${jsonResponse.temperature}`;
};
document.getElementById("generate").addEventListener("click", generate);
