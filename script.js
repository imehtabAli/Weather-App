const searchInput = document.getElementById('inputCity');
const temperature = document.getElementById('temperature');
const cityName = document.getElementById('cityName');
const windSpeed = document.getElementById('windSpeed');
const humidityNumber = document.getElementById('humidityNumber');
const container = document.querySelector('.container');
const searchButton = document.getElementById('searchButton');
let apiKey = 'f267923a09f6a5a4dcc4be5faa4ee0ff';

searchButton.addEventListener('click', () => {
    if (searchInput.value.trim() === "") {
        return;
    }
    getApiData();
    searchInput.value = '';
});

async function getApiData() {
    let cityName = searchInput.value;
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        appendApiData(data);
    } catch (error) {
        console.log("Some error happened: ", error)
    }
}

function appendApiData(data) {

    const existingOutPutSection = document.querySelector('.outPutSection');
    if (existingOutPutSection) {
        container.removeChild(existingOutPutSection);
    }

    let weatherIcon;
    if (data.weather[0].main === 'Clouds') {
        weatherIcon = "/utilities/clouds.svg"
    }
    else if (data.weather[0].main === 'Clear') {
        weatherIcon = "/utilities/sun.svg"
    }
    else if (data.weather[0].main === 'Rain') {
        weatherIcon = "/utilities/rain.svg"
    }
    else if (data.weather[0].main === 'Drizzle') {
        weatherIcon = "/utilities/drizzle.svg"
    }
    else if (data.weather[0].main === 'Mist') {
        weatherIcon = "/utilities/mist.svg"
    }

    const outPutSection = document.createElement('div');
    outPutSection.className = "outPutSection";
    outPutSection.innerHTML = `
    <div class="weather">
    <img src="${weatherIcon}" alt="">
    </div>
    <div class="info">
    <h4 id="temperature">${data.main.temp}°C</h4>
    <h3 id="cityName">${data.name}</h3>
    <div id="extraInfo"><span>min: ${data.main.temp_min}</span><span>max: ${data.main.temp_max}</span><span>Feels Like:${data.main.feels_like}</span></div>
    </div>
    <div class="humidity-and-wind">
    <div class="humidity">
    <img src="/utilities/humidity.svg" id="humiditySvg" alt="">
    <div id="randomDiv">
    <p id="humidityNumber">${data.main.humidity}%</p>
    <span>humidity</span>
    </div>
    </div>
    <div class="wind">
    <img src="/utilities/wind.svg" id="windSvg" alt="">
    <div id="randomDiv">
    <p id="windSpeed">${data.wind.speed} km/h</p>
    <span>Wind Speed</span>
    </div>
    
    </div>
    </div> 
    `;

    container.appendChild(outPutSection);
}