// Main current weather

const displayCurrentWeather = (weather) => {
  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.setAttribute('id', 'current_weather');

  // ---------------------- Location container --------------------

  const locationContainer = document.createElement('div');
  locationContainer.setAttribute('id', 'location_container');

  const locationIcon = document.createElement('span');
  locationIcon.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
  locationIcon.classList.add('icon_secondary');

  const locationCity = document.createElement('span');
  locationCity.classList.add('location_text');
  locationCity.textContent = `${weather.city}, ${weather.country}`;

  const locationSeparator = document.createElement('span');
  locationSeparator.classList.add('location_text');
  locationSeparator.textContent = '|';

  const locationTimeZone = document.createElement('span');
  locationTimeZone.classList.add('location_text');
  locationTimeZone.textContent = weather.timeZone;

  locationContainer.append(locationIcon, locationCity, locationSeparator, locationTimeZone);

  // -------------------- Time Container --------------------------

  const timeContainer = document.createElement('div');
  timeContainer.setAttribute('id', 'time_container');
  timeContainer.textContent = `${weather.time.week}-${weather.time.month} ${weather.time.day} | ${weather.time.hour}`;

  // -------------------- Secondary info container ----------------

  const secondaryInfoContainer = document.createElement('div');
  secondaryInfoContainer.setAttribute('id', 'secondary_info_container');

  // feels Like temperature info
  const feelsLikeInfo = document.createElement('div');
  const feelsLikeText = document.createElement('span');
  feelsLikeText.classList.add('second_info_text');
  feelsLikeText.textContent = 'Feels Like: ';
  const feelsLikeTempF = document.createElement('span');
  feelsLikeTempF.classList.add('second_info_text');
  feelsLikeTempF.setAttribute('id', 'feels_like_tempF');
  feelsLikeTempF.textContent = `${weather.feelsLikeTempF} °F `;
  const feelsLikeTempC = document.createElement('span');
  feelsLikeTempC.classList.add('second_info_text');
  feelsLikeTempC.classList.add('hide');
  feelsLikeTempC.setAttribute('id', 'feels_like_tempC');
  feelsLikeTempC.textContent = `${weather.feelsLikeTempC} °C`;
  feelsLikeInfo.append(feelsLikeText, feelsLikeTempF, feelsLikeTempC);

  // Wind info
  const windInfo = document.createElement('div');
  const windText = document.createElement('span');
  windText.classList.add('second_info_text');
  windText.textContent = `Wind: ${weather.windDirection} `;
  const windSpeedImp = document.createElement('span');
  windSpeedImp.classList.add('second_info_text');
  windSpeedImp.setAttribute('id', 'wind_speed_imperial');
  windSpeedImp.textContent = `${weather.windSpeedImp} mph `;
  const windSpeedM = document.createElement('span');
  windSpeedM.classList.add('second_info_text');
  windSpeedM.classList.add('hide');
  windSpeedM.setAttribute('id', 'wind_speed_metric');
  windSpeedM.textContent = `${weather.windSpeedMetric} km/h`;
  windInfo.append(windText, windSpeedImp, windSpeedM);

  // Sunrise info
  const sunriseInfo = document.createElement('div');
  const sunriseText = document.createElement('span');
  sunriseText.classList.add('second_info_text');
  sunriseText.textContent = `Sunrise: ${weather.sunrise}`;
  sunriseInfo.append(sunriseText);

  // sunset info
  const sunsetInfo = document.createElement('div');
  const sunsetText = document.createElement('span');
  sunsetText.classList.add('second_info_text');
  sunsetText.textContent = `sunset: ${weather.sunset}`;
  sunsetInfo.append(sunsetText);

  // append sencondary info container
  secondaryInfoContainer.append(feelsLikeInfo, windInfo, sunriseInfo, sunsetInfo);

  // ------------------------------- Sky image Info --------------------

  const skyImage = new Image();
  skyImage.setAttribute('src', `skyimg${weather.iconId}`);
  skyImage.setAttribute('id', 'sky_image');

  // ------------------------------ Primary Info -------------------

  const primaryInfoContainer = document.createElement('div');
  primaryInfoContainer.setAttribute('id', 'primary_info_container');

  // main Temperature
  const mainTempWrapper = document.createElement('div');
  const mainTempF = document.createElement('div');
  mainTempF.classList.add('primary_info_text');
  mainTempF.setAttribute('id', 'main_temp_F');
  mainTempF.textContent = `${weather.mainTempF} °F`;
  const mainTempC = document.createElement('div');
  mainTempC.classList.add('primary_info_text');
  mainTempC.classList.add('hide');
  mainTempC.setAttribute('id', 'main_temp_C');
  mainTempC.textContent = `${weather.mainTempC} °C`;

  mainTempWrapper.append(mainTempF, mainTempC);

  // max & min temp
  const maxMinTempWrapper = document.createElement('div');

  const maxMinTempF = document.createElement('div');
  maxMinTempF.setAttribute('id', 'max_min_temp_F');
  const maxTempF = document.createElement('div');
  maxTempF.setAttribute('class', 'small_text');
  maxTempF.textContent = `${weather.maxTempF}°`;
  const minTempF = document.createElement('div');
  minTempF.setAttribute('class', 'small_text');
  minTempF.textContent = `${weather.minTempF}°`;
  maxMinTempF.append(maxTempF, minTempF);

  const maxMinTempC = document.createElement('div');
  maxMinTempC.setAttribute('id', 'max_min_temp_C');
  maxMinTempC.classList.add('hide');
  const maxTempC = document.createElement('div');
  maxTempC.setAttribute('class', 'small_text');
  maxTempC.textContent = `${weather.maxTempC}°`;
  const minTempC = document.createElement('div');
  minTempC.setAttribute('class', 'small_text');
  minTempC.textContent = `${weather.minTempC}°`;
  maxMinTempC.append(maxTempC, minTempC);

  maxMinTempWrapper.append(maxMinTempF, maxMinTempC);

  // append primary info container

  primaryInfoContainer.append(mainTempWrapper, maxMinTempWrapper);

  // ----------------------------- Wether Description text ------------

  const skyDescription = document.createElement('p');
  skyDescription.setAttribute('class', 'second_info_text');
  skyDescription.textContent = weather.skyDescription;

  // --------------------------- append global grid container ----------

  currentWeatherContainer.append(locationContainer, timeContainer,
    secondaryInfoContainer, skyImage,
    primaryInfoContainer, skyDescription);

  return currentWeatherContainer;
};

// display wether request form
const displayWeatherResqestForm = () => {
  const weatherRequestForm = document.createElement('div');
  weatherRequestForm.setAttribute('id', 'weather_request_form');
  const requestInput = document.createElement('input');
  requestInput.setAttribute('type', 'text');
  requestInput.setAttribute('id', 'weather_request_input');
  requestInput.setAttribute('placeholder', 'Type a city name here!');

  const requestSubmitButton = document.createElement('button');
  requestSubmitButton.setAttribute('id', 'weather_request_submit');
  requestSubmitButton.textContent = 'Get Weather Forcast!';

  const tempSwitcherWrapper = document.createElement('div');
  const tempSwitcherButtonC = document.createElement('button');
  tempSwitcherButtonC.setAttribute('id', 'switcher');

  tempSwitcherButtonC.textContent = 'Switch to °C';
  tempSwitcherWrapper.append(tempSwitcherButtonC);

  weatherRequestForm.append(requestInput, requestSubmitButton, tempSwitcherWrapper);

  return weatherRequestForm;
};

// display error
const displayError = (error) => {
  const errorCard = document.createElement('div');
  errorCard.setAttribute('id', 'error_card');
  errorCard.textContent = error.message;
  return errorCard;
};


// Loading bare while waiting for api success

const LoaderSpiner = () => {
  const loader = document.createElement('div');
  loader.setAttribute('id', 'loader');
  loader.textContent = 'loadind data from Api!';
  return loader;
};

// Widget div

const WidgetContainer = () => {
  const widget = document.createElement('div');
  widget.setAttribute('id', 'weather_widget_container');
  return widget;
};


export {
  displayError, displayWeatherResqestForm, LoaderSpiner, displayCurrentWeather, WidgetContainer,
};