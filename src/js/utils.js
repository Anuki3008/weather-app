async function getCityFromCoordinates(latitude, longitude) {
  const apiKey = "pk.ceea564ea18d92d7a874a9d4b46c1560";
  const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;

  const res = await fetch(apiUrl);

  const data = await res.json();
  console.log(data.address.city);

  return data.address.city;

  // .then((response) => response.json())
  // .then((data) => {
  //   if (data.address && data.address.city) {
  //     console.log("Current city:", data.address.city);

  //     return data.address.city;
  //   } else {
  //     console.log("Could not determine city from coordinates.");
  //   }
  // })
  // .catch((error) => {
  //   console.error("Error during reverse geocoding:", error);
  // });
}
