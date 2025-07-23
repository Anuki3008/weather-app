async function getCityFromCoordinates(latitude, longitude) {
  const apiKey = "pk.ceea564ea18d92d7a874a9d4b46c1560";
  const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;

  const res = await fetch(apiUrl);

  const data = await res.json();

  return data.address.city;
}

const getWeeklyWeatherData = async (place) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=9b1eafa8504d3df1a475ec2a4e57743f`;
  const res = await fetch(apiUrl);

  const weeklyWeather = await res.json();

  const weeklyWeatherList = weeklyWeather.list;

  const weatherObj = {};

  weeklyWeatherList.forEach((item) => {
    const date = new Date(item.dt_txt);

    weatherObj[date.getDate()] = item;
  });

  return Object.values(weatherObj);
};

const weatherContentConfig = {
  rain: {
    backgroundColor:
      "linear-gradient(135deg, hsl(210 80% 80%), hsl(230 70% 70%))",
    textColor: "#1e3a8a",
    icon: "🌧️",
    quote: "Rain is just the sky crying — even it needs to let go sometimes.",
  },
  sunny: {
    backgroundColor:
      "linear-gradient(135deg, hsl(45 100% 85%), hsl(35 100% 75%))",
    textColor: "#1e3a8a",
    icon: "🔆",
    quote:
      "When the sun returns, it doesn't ask what you've been through — it just shines.",
  },
  Snow: {
    backgroundColor:
      "linear-gradient(135deg, hsl(280 60% 80%), hsl(200 100% 75%), hsl(160 60% 75%))",
    textColor: "#1e3a8a",
    icon: "❄️",
    quote: "Snow reminds us that stillness can sparkle too.",
  },
  Drizzle: {
    backgroundColor:
      "linear-gradient(135deg, hsl(320 65% 85%), hsl(280 60% 80%))",
    textColor: "#f8fafc",
    icon: "🌦️",
    quote: "Even the softest drizzle can water something beautiful.",
  },
  Thunderstorm: {
    backgroundColor:
      "linear-gradient(135deg, hsl(320 65% 85%), hsl(280 60% 80%))",
    textColor: "#f8fafc",
    icon: "⛈️",
    quote:
      "Every thunderstorm teaches us how strong silence can feel afterward.",
  },
  Clouds: {
    backgroundColor:
      "linear-gradient(135deg, hsl(195 100% 95%), hsl(220 100% 88%))",
    textColor: "#1e3a8a",
    icon: "☁️",
    quote: "Behind every cloud, the sky is still blue.",
  },
  Clear: {
    backgroundColor:
      "linear-gradient(135deg, hsl(45 100% 85%), hsl(35 100% 75%))",
    textColor: "#1e3a8a",
    icon: "🌤️",
    quote: "In the clearest skies, we see how far we’ve come.",
  },
};

// const renderWeeklyWeather = async (place) => {
//   const getWeeklyWeatherData = await getWeeklyWeatherData(place);
//   WEEKLY_CONTAINER.innerHTML = "";
//   getWeeklyWeatherData.forEach((item) => {
//     const weeklyCard = document.createElement("div");
//     weeklyCard.className = "weekly-card";
//     const currentTemp = item.main.temp - 273.15;
//     const date = new Date(item.dt_txt);
//     const formatter = new Intl.DateTimeFormat("en-US");
//     const weatherType = item.weather[0].main;
//     const weatherConect = weatherContentObject[weatherType]; // {
//     weeklyCard.style.backgroundColor =
//       weatherContentObject[weatherType].backgroundColor;
//     weeklyCard.style.color = weatherContentObject[weatherType].textColor;
//     weeklyCard.innerHTML = "h4>${formatter.format(date)}</h4.";
//     weeklyCard.innerHTML +=
//       'p class= "emojy">${weatherContentObject[weatherType].icon}</p>';
//     weeklyCard.innerHTML +=
//       'p class="celsius">${currentTemp.toFixed(0)} °C</p>';
//     weeklyCard.innerHTML +=
//       'p class="weather-type">${item.weather[0].main}</p>';
//     WEEKLY_CONTAINER.appendChild(weeklyCard);
//   });
// };
