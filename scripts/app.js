const inputForm = document.querySelector(".input_form");
const weather_txt = document.querySelector(".weather_txt");
const weather_wrapper = document.querySelector(".weather_wrapper");
const weather_img = document.querySelector(".weather_img");
const weather_icon = document.querySelector(".weather_icon");

// Update UI
const updateUi = (weather_details) => {
  document.activeElement.blur();
  const update_txt = `<div class="weather_txt">
                <h2 class="city_name">${
                  weather_details.citydets.LocalizedName
                }</h2>
                <h4 class="weather_condition">${
                  weather_details.weatherdets.WeatherText
                }</h4> 
                <h3 class="temps">${Math.round(
                  weather_details.weatherdets.Temperature.Metric.Value
                )} &deg;C</h3>
            </div>`;

  weather_txt.innerHTML = update_txt;

  // Update Image
  let timesrc = null;
  if (weather_details.weatherdets.IsDayTime) {
    timesrc = "./img/day.svg";
  } else {
    timesrc = "./img/night.svg";
  }
  weather_img.setAttribute("src", timesrc);

  // Update Icon
  const icon_new = `./img/icons/${weather_details.weatherdets.WeatherIcon}.svg`;
  weather_icon.setAttribute("src", icon_new);

  if (weather_wrapper.classList.contains("hide")) {
    weather_wrapper.classList.remove("hide");
  }
};

// Weather Details
const weather_details = async (city_val) => {
  const citydets = await get_city(city_val);
  const weatherdets = await get_weather(citydets.Key);
  return { citydets, weatherdets };
};

// Submit Event
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city_val = inputForm.city.value.trim();
  inputForm.reset();
  weather_details(city_val)
    .then((data) => {
      updateUi(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
