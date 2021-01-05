import './style/style.css';

const container = document.querySelector('#container');


const extractedRawData = async (location) => {

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ec69741690a685c21c21ffeda30cac37`;

  try {

    const response = await fetch(apiUrl, {mode: 'cors'});
    const data = await response.json();

    return data;

  }
  catch (error) {

    return error;

  }
}

console.log(extractedRawData('London'));