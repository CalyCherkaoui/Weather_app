// Main current weather

const displayCurrentWeather = (weather) => {
  const currentWetherContainer = document.createElement('div');
  currentWetherContainer.setAttribute('id', 'current_weather');
  currentWetherContainer.textContent = weather.sky;
  return currentWetherContainer;
}


// Next 3 days forcast

const DisplayForcastDaysWeather = (weatherDaysList) => {
  const forcastDaysWeatherContainer = document.createElement('div');
  forcastDaysWeatherContainer.setAttribute('id', 'forcast_days_weather');
  return forcastDaysWeatherContainer;
}



// display error

const displayError = (error) => {
  const errorCard =  document.createElement('div');
  errorCard.setAttribute('id', 'error_card');
  errorCard.textContent = error.message;
  return errorCard;
}



export {displayError};