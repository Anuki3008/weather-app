const API_KEY = "0c421ff54e43e7c92fdb457ca57f1e42";

const SEARCH_INPUT = document.getElementById("search-input");
const SEARCH_BUTTON = document.getElementById("search-button");
const PLACE = document.getElementById("place");
const WEATHER_VALUE = document.getElementById("weather-value");
const WEATHER_STATUS = document.getElementById("weather-status");
const WIND_SPEED = document.getElementById("wind-speed");
const HUMIDITY = document.getElementById("humidity");

const getWetherData = async (place) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=9b1eafa8504d3df1a475ec2a4e57743f`
  );

  const weatherData = await res.json();
  renderContent(weatherData);
};

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Now use these coordinates to get the city name
      city = await getCityFromCoordinates(latitude, longitude);
      getWetherData(city ?? "Batumi");
    },
    (error) => {
      console.error("Error getting location:", error.message);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}

SEARCH_BUTTON.addEventListener("click", async () => {
  const inputValue = SEARCH_INPUT.value;

  getWetherData(inputValue);
});

const renderContent = (weatherData) => {
  PLACE.textContent = weatherData.name;
  const temp = weatherData.main.temp - 273.15;

  WEATHER_VALUE.textContent = temp.toFixed(0) + "°C";

  WEATHER_STATUS.textContent = weatherData.weather[0].main;

  WIND_SPEED.textContent = weatherData.wind.speed;
  HUMIDITY.textContent = weatherData.main.humidity;
};
