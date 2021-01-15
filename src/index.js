import './style/style.css';
import { apiParsedObj } from './api';
import {
  displayWeatherResqestForm, displayCurrentWeather, WidgetContainer,
} from './DomsBuilder';

const Weather = require('./weather').default;

const container = document.querySelector('#container');
container.append(displayWeatherResqestForm(), WidgetContainer());
const widget = document.getElementById('weather_widget_container');

window.addEventListener('load', () => {
  const obj = apiParsedObj('kyoto'); // default or form submitt value

  let interval;
  const loading = () => {
    if (obj.city !== undefined && obj.image !== undefined) {
      const requestedWeather = new Weather(obj);
      widget.append(displayCurrentWeather(requestedWeather));
      widget.style.backgroundImage = `url(${obj.image})`;
      clearInterval(interval);
    }
  };

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
    location = 'kyoto';
  } else {
    location = cityInput.value;
  }

  const obj = apiParsedObj(location); // default or form submitt value
  let interval;

  const loading = () => {
    if (obj.city !== undefined && obj.image !== undefined) {
      const requestedWeather = new Weather(obj);
      widget.append(displayCurrentWeather(requestedWeather));
      widget.style.backgroundImage = `url(${obj.image})`;
      clearInterval(interval);
    }
  };

  interval = setInterval(loading, 500);
});

const switcherTemp = document.getElementById('switcher');
switcherTemp.addEventListener('click', () => {
  const switcher = document.getElementById('switcher');
  switcher.textContent = switcher.textContent === '°C' ? '°F' : '°C';

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
