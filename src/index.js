import './style/style.css';
import {apiParsedObj, extractRawData} from './api';
import {displayError} from './DomsBuilder';

const container = document.querySelector('#container');

window.addEventListener("load", () => {
  let testerror = {message: 'error!'};
  container.append(displayError(testerror));
  
  console.log(apiParsedObj('Tokyo'));

  console.log(extractRawData('London'));
});



