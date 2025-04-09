const apiKey = "3ebd7b9c64c28c1e32f978d91b26c65d";
const button = document.querySelector("#btn");
const input = document.querySelector("#city");
const weatherInfo = document.querySelector("#weather-info");
const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});

async function getWeather() {
    const cityName = input.value.trim();
    if (!cityName) {
        weatherInfo.innerHTML = `<p class="text-danger">⚠️ Please enter a valid city name</p>`;
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const respn = await fetch(url);
        const data = await respn.json();

        if (data.cod === "404") {
            weatherInfo.innerHTML = `<p class="text-danger">❌ City not found. Please try again.</p>`;
            return;
        }

        weatherInfo.innerHTML = `
  <div class="text-center mb-4">
    <h3>${data.name}, ${data.sys.country}</h3>
    <hr/>
    <p class="mb-1 text-muted">📅 ${currentDate}</p>
    <h4 class="mb-3"> ${data.main.temp}℃</h4>
  </div>

  <div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
    <div class="card text-center shadow-sm p-3">
      <h6>🌬️ Wind Speed</h6>
      <p class="mb-0">${data.wind.speed} m/s</p>
    </div>
    <div class="card text-center shadow-sm p-3">
      <h6>💧 Humidity</h6>
      <p class="mb-0">${data.main.humidity}%</p>
    </div>
    <div class="card text-center shadow-sm p-3">
      <h6>⛅ Weather</h6>
      <p class="mb-0">${data.weather[0].description}</p>
    </div>
  </div>
`;
    } catch (error) {
        console.error(error);
        weatherInfo.innerHTML = `<p class="text-danger">🚫 Something went wrong. Please try again later.</p>`;
    }
}

button.addEventListener("click", getWeather);
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

getWeather();
