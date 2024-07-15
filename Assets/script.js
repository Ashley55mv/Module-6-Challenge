// Assuming 'apiKey' is your OpenWeatherMap API key
const apiKey = '7f5494f3e2adf432ba344342df24872e';


document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const cityInput = document.getElementById('city-input').value;
        fetchWeatherAndForecast(cityInput);
    });
});

async function fetchWeatherAndForecast(city) {
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
        if (!weatherResponse.ok) throw new Error('Weather data fetch failed');
        const weatherData = await weatherResponse.json();

        updateCurrentWeather(weatherData);

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=imperial&appid=${apiKey}`);
        if (!forecastResponse.ok) throw new Error('Forecast data fetch failed');
        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateCurrentWeather(weatherData) {
    const currentCityDate = document.getElementById('current-city-date');
    const currentTemp = document.getElementById('current-temp');
    const currentWind = document.getElementById('current-wind');
    const currentHumidity = document.getElementById('current-humidity');

    const date = new Date(weatherData.dt * 1000).toLocaleDateString();
    currentCityDate.innerHTML = `${weatherData.name} (${date}) <span id="current-weather-icon">${getWeatherIcon(weatherData.weather[0].icon)}</span>`;
    currentTemp.textContent = `Temp: ${weatherData.main.temp}°F`;
    currentWind.textContent = `Wind: ${weatherData.wind.speed} MPH`;
    currentHumidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
}

function getWeatherIcon(iconCode) {
    // Placeholder for actual icon based on iconCode
    return '🌞'; // Simplified for demonstration
}

function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous forecasts

    // Example: Display only the first 5 forecasts
    forecastData.list.slice(0, 5).forEach(forecast => {
        const forecastElement = document.createElement('div');
        forecastElement.className = 'forecast-card';
        forecastElement.innerHTML = `
            <h4>${new Date(forecast.dt * 1000).toLocaleDateString()}</h4>
            <p>Temp: ${forecast.main.temp}°F</p>
            <p>Wind: ${forecast.wind.speed} MPH</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}
  fetchWeatherAndForecast(city);