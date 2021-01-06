import './style/style.css';
import {apiParsedObj, extractRawData} from './api';
import {displayError} from './DomsBuilder';

const Weather = require('./weather').default;

const container = document.querySelector('#container');

window.addEventListener("load", () => {
  let testerror = {message: 'error!'};
  container.append(displayError(testerror));
  
  console.log(apiParsedObj('Osaka'));

  console.log(extractRawData('London'));
});



