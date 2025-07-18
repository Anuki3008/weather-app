const API_KEY = "0c421ff54e43e7c92fdb457ca57f1e42";

const SEARCH_INPUT = document.getElementById("search-input");
const SEARCH_BUTTON = document.getElementById("search-button");
const PLACE = document.getElementById("place");
const WEATHER_VALUE = document.getElementById("weather-value");
const WEATHER_STATUS = document.getElementById("weather-status");
const WIND_SPEED = document.getElementById("wind-speed");
const HUMIDITY = document.getElementById("humidity");
const FAVORITE_BUTTON = document.getElementById("favorite-button");
const FAVORITES_CONTAINER = document.getElementById("favorites");
const FAVORITE_STAR = document.getElementById("favorite-star");
const WEEKLY_CONTAINER = document.getElementById("weekly-weather");

const EMOJIES = ["🍕", "⛩️", "🗼", "🌮", "⚽", "🛕", "🐫", "🥨", "🐉", "🍇"];

const FAVORITE_PLACES =
  JSON.parse(localStorage.getItem("favorite-places")) ?? [];
const CURRENT_PLACE = localStorage.getItem("current-place");

const isFavoritePlace = FAVORITE_PLACES.includes(CURRENT_PLACE);
if (isFavoritePlace) {
  FAVORITE_STAR.innerHTML = "★";
}

const getWetherData = async (place) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=9b1eafa8504d3df1a475ec2a4e57743f`;
  const res = await fetch(apiUrl);

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
  const place = weatherData.name;
  PLACE.textContent = place;
  localStorage.setItem("current-place", place);
  const temp = weatherData.main.temp - 273.15;

  WEATHER_VALUE.textContent = temp.toFixed(0) + "°C";

  WEATHER_STATUS.textContent = weatherData.weather[0].main;

  WIND_SPEED.textContent = weatherData.wind.speed;
  HUMIDITY.textContent = weatherData.main.humidity;
};

FAVORITE_BUTTON.addEventListener("click", () => {
  const currentPlace = localStorage.getItem("current-place");
  const favoriteCitiesString = localStorage.getItem("favorite-places");
  const favoriteCities = JSON.parse(favoriteCitiesString) ?? [];
  const isFavorite = favoriteCities?.includes(currentPlace);

  let newFavorites = [];

  if (isFavorite) {
    newFavorites = favoriteCities.filter((city) => city !== currentPlace);
    FAVORITE_STAR.innerHTML = "☆";
  } else {
    newFavorites = [...favoriteCities, currentPlace];
    FAVORITE_STAR.innerHTML = "★";
  }
  localStorage.setItem("favorite-places", JSON.stringify(newFavorites));
  renderFavorites(newFavorites);
});

const renderFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorite-places")) ?? [];
  // 1. ზემოთ შექმენი ცვლადი რომელიც წამოიღებს ფავორიტი ადგილების დივს (id="favorites")
  // 2. წამოღებულ ფავორიტ ადგილებზე დაატრიალე ციკლი და შექმენი ფავორიტი ადგილის ელემენტი (class="favorite-city")
  FAVORITES_CONTAINER.innerHTML = "";
  favorites.forEach((favoritePlace) => {
    const randomEmoji = EMOJIES[Math.floor(Math.random() * EMOJIES.length)];
    const favoriteContainer = document.createElement("div");
    favoriteContainer.className = "favorite-city";
    favoriteContainer.addEventListener("click", () => {
      getWetherData(favoritePlace);
    });
    favoriteContainer.innerHTML = `<p>${randomEmoji}</p>
          <p>${favoritePlace}</p>
          <img src="../assets/icons/location.png" alt="" />`;
    FAVORITES_CONTAINER.appendChild(favoriteContainer);
  });
  // 3. შექმენი ემოჯიების მასივი და რენდომულად დაამატე ციკლის ყოველ იტერაციაზე
};

renderFavorites();

const renderWeeklyWeather = async () => {
  const weeklyWeather = await getWeeklyWeatherData(CURRENT_PLACE);

  console.log({ weeklyWeather });

  WEEKLY_CONTAINER.innerHTML = "";
  weeklyWeather.forEach((item) => {
    const weeklyCard = document.createElement("div");
    weeklyCard.className = "weekly-card";

    const currentTemp = item.main.temp - 273.15;
    const date = new Date(item.dt_txt);

    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
    });

    weeklyCard.innerHTML = `<h4>${formatter.format(date)}</h4>
        <p class="emojy">☁️</p>
        <div class="celsius">
          <p class="left">${currentTemp.toFixed(0)}°C</p>
        </div>
        <p>${item.weather[0].main}</p>`;

    WEEKLY_CONTAINER.appendChild(weeklyCard);
  });
};
renderWeeklyWeather();
