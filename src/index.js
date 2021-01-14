import './style/style.css';
import { apiParsedObj } from './api';
import {
  displayWeatherResqestForm, LoaderSpiner, displayCurrentWeather, WidgetContainer,
} from './DomsBuilder';

const Weather = require('./weather').default;

const container = document.querySelector('#container');
container.append(displayWeatherResqestForm(), WidgetContainer());
const widget = document.getElementById('weather_widget_container');

window.addEventListener('load', () => {
  const obj = apiParsedObj('rabat'); // default or form submitt value
  let interval;
  function loading() {
    if (obj.city === undefined) {
      // container.append(LoaderSpiner);
      console.log('loading en cours!');
    } else {
      const requestedWeather = new Weather(obj);
      widget.append(displayCurrentWeather(requestedWeather));
      console.log(requestedWeather.windDirection);
      clearInterval(interval);
    }
  }

  interval = setInterval(loading, 500);
});


const submitt = document.getElementById('weather_request_submit');
submitt.addEventListener('click', () => {
  widget.innerHTML = '';
  const swithcher = document.getElementById('switcher');
  swithcher.textContent = '°C';

  const cityInput = document.getElementById('weather_request_input');
  let location = '';
  if (cityInput.value === '') {
    location = 'rabat';
  } else {
    location = cityInput.value;
  }

  console.log(location);
  const obj = apiParsedObj(location); // default or form submitt value
  let interval;

  function loading() {
    if (obj.city === undefined) {
      // container.append(LoaderSpiner);
      console.log('loading en cours!');
    } else {
      const requestedWeather = new Weather(obj);
      widget.append(displayCurrentWeather(requestedWeather));
      clearInterval(interval);
    }
  }

  interval = setInterval(loading, 500);
});

const switcherTemp = document.getElementById('switcher');
switcherTemp.addEventListener('click', () => {
  const switcher = document.getElementById('switcher');
  if (switcher.textContent === '°C') {
    switcher.textContent = '°F';
  } else {
    switcher.textContent = '°C';
  }

  const feelsLikeTempF = document.getElementById('feels_like_tempF');
  const feelsLikeTempC = document.getElementById('feels_like_tempC');
  const windSpeedImp = document.getElementById('wind_speed_imperial');
  const windSpeedMetric = document.getElementById('wind_speed_metric');
  const mainTempF = document.getElementById('main_temp_F');
  const mainTempc = document.getElementById('main_temp_C');
  const maxMinTempF = document.getElementById('max_min_temp_F');
  const maxMinTempC = document.getElementById('max_min_temp_C');

  feelsLikeTempC.classList.toggle('hide');
  feelsLikeTempF.classList.toggle('hide');
  windSpeedImp.classList.toggle('hide');
  windSpeedMetric.classList.toggle('hide');
  mainTempF.classList.toggle('hide');
  mainTempc.classList.toggle('hide');
  maxMinTempF.classList.toggle('hide');
  maxMinTempC.classList.toggle('hide');
});
