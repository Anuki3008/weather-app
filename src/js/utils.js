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


  return Object.values(weatherObj)
};

