async function getCityFromCoordinates(latitude, longitude) {
  const apiKey = "pk.ceea564ea18d92d7a874a9d4b46c1560";
  const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;

  const res = await fetch(apiUrl);

  const data = await res.json();

  return data.address.city;
}
