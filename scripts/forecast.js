const api = "6zEIsaJUtxhCVFyKiHEiGO9ItGmeGbhs";

// Weather Details
const get_weather = async (city_key) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${city_key}?apikey=${api}`;

  const result = await fetch(base + query);
  const data = await result.json();
  return data[0];
};

// City Details
const get_city = async (city) => {
  console.log(city);

  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${api}&q=${city}`;

  const result = await fetch(base + query);
  const data = await result.json();
  return data[0];
};

// get_city("manchester").then((data)=>{
//     console.log(data);
//     return get_weather(data.Key);
// }).then((data)=>{
//     console.log("weather",data);
// });
