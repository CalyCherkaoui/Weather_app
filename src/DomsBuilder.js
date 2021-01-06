// Main current weather

const displayCurrentWeather = (weather) => {
  const currentWetherContainer = document.createElement('div');
  currentWetherContainer.setAttribute('id', 'current_weather');

  // Location container
  const locationContainer = document.createElement('div');
  locationContainer.setAttribute('id', 'location_container');

  const locationIcon = document.createElement('span');
  locationIcon.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
  locationIcon.classList.add('icon_secondary');

  const locationCity = document.createElement('span');
  locationCity.classList.add('location_text');
  locationCity.textContent = weather.city;

  const locationSeparator = document.createElement('span');
  locationSeparator.classList.add('location_text');
  locationSeparator.textContent = '|';

  const locationCountry = document.createElement('span');
  locationCountry.classList.add('location_text');
  locationCountry.textContent = weather.country;

  locationContainer.append(locationIcon,locationCity, locationSeparator, locationCountry);

  // 


  return currentWetherContainer;
}


// Next 3 days forcast

const displayForcastDaysWeather = (weatherDaysList) => {
  const forcastDaysWeatherContainer = document.createElement('div');
  forcastDaysWeatherContainer.setAttribute('id', 'forcast_days_weather');
  return forcastDaysWeatherContainer;
}


// display wether request form

const displayWeatherResqestForm = () => {
  const weatherRequestForm = document.createElement('div');
  weatherRequestForm.setAttribute('id','weather_request_form');
  const requestInput = document.createElement('input');
  requestInput.setAttribute('type', 'text');
  requestInput.setAttribute('id', 'weather_request_input');
  requestInput.setAttribute('placeholder', 'Type a city name here!');
  const requestSubmitButton = document.createElement('button');
  requestSubmitButton.setAttribute('id', 'weather_request_submit');
  weatherRequestForm.append(requestInput, requestSubmitButton);
  return weatherRequestForm;
}



// display error

const displayError = (error) => {
  const errorCard =  document.createElement('div');
  errorCard.setAttribute('id', 'error_card');
  errorCard.textContent = error.message;
  return errorCard;
}



export {displayError};