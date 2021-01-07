import './style/style.css';
import {apiParsedObj, extractRawData} from './api';
import {displayError, displayWeatherResqestForm, LoaderSpiner ,displayCurrentWeather} from './DomsBuilder';
import moment from 'moment';

const Weather = require('./weather').default;

const container = document.querySelector('#container');

window.addEventListener("load", () => {
  
  container.append(displayWeatherResqestForm());

  const obj = apiParsedObj('rabat'); // default or form submitt value

  const interval = setInterval( loading, 300);

  function loading() {
    
    if ( obj.city == undefined ) {
      container.append(LoaderSpiner);
      console.log('loading en cours!');
    } else {
      clearInterval(interval);
      const requestedWeather = new Weather(obj);
      container.append(displayCurrentWeather(requestedWeather));
      console.log(requestedWeather.windDirection);
    }
  }

  // console.log(extractRawData('london'));

});



