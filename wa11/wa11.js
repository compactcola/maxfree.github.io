let generateBtn = document.querySelector("#js-new-forecast").addEventListener('click', getWeather);
let clearBtn = document.querySelector("#js-clear-storage").addEventListener('click', clearStorage);
let exportBtn = document.querySelector("#js-export").addEventListener('click', exportStorage);
let modeSelect = document.querySelector("#js-mode");
let citySelect = document.querySelector("#js-city");
let resultsBox = document.querySelector("#js-results")

const KEY = "5239858daf994f1f857182705250211";
const baseEndpoint = "https://api.weatherapi.com/v1/current.json";

var currentCity = "";
var forecast = "";

//local storage load city on page load
window.addEventListener('load', ()=> {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
        citySelect.value = savedCity;
        currentCity = savedCity;
        getWeather();
    }
});


function getLocation() {
    currentCity = citySelect.value.trim() || "Boulder";
    localStorage.setItem("lastCity", currentCity)
}

async function getWeather() {
    let mode = modeSelect.value
    getLocation()
    try {
        const response = await fetch(`${baseEndpoint}?key=${KEY}&q=${currentCity}&aqi=no`);
        if (!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json();
        const weather = json.current
        const iconUrl = "https:" + weather.condition.icon;

        if (mode === "temp") {
            forecast = `${weather.temp_f}°F (${weather.temp_c}°C)`;
        } else if (mode === "wind") {
            forecast = `${weather.wind_kph} kph wind`;
        } else if (mode === "humidity") {
            forecast = `${weather.humidity}% humidity`;
        } else {
            forecast = weather.condition.text;
        }

        console.log(`${mode.toUpperCase()}: ${forecast}`);

        resultsBox.innerHTML = `<h2>${currentCity}</h2><img src="${iconUrl}" alt"weather_icon" height=120px/><p>${forecast}</p>`;
        return weather;

    } catch (err) {
        console.log(err);
        alert("Weather fetch failed")
    }
}

function clearStorage() {
    localStorage.clear();
    citySelect.value="";
    resultsBox.innerHTML = "<p>Successfully cleared saved city.</p>";
}

// helper json download function I found online :)
function downloadAsJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "weather.json";
  a.click();
  URL.revokeObjectURL(url);
}

function exportStorage() {
    const data = getWeather()
    downloadAsJSON(data);
}