const apiKey = "3ebd7b9c64c28c1e32f978d91b26c65d";
const button = document.querySelector("#btn");
const input = document.querySelector("#city");
const weatherInfo = document.querySelector("#weather-info");

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
      <h3>${data.name}, ${data.sys.country}</h3>
      <hr/>
      <p>🌡️ Temperature: ${data.main.temp}℃</p>
      <p>⛅ Weather: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind speed: ${data.wind.speed} m/s</p>
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
