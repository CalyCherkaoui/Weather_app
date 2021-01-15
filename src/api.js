const extractRawData = async (location) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ec69741690a685c21c21ffeda30cac37&units=imperial`;

  try {
    // fetch data from api
    const response = await fetch(apiUrl);

    // parse promise data into json
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

const extractImageBg = async (location) => {
  const apiUrl = `https://api.pexels.com/v1/search?query=${location}&per_page=1&orientation=landscape`;
  const authoriz = '563492ad6f9170000100000126e48586a278499298d539010fe7b7ca';

  try {
    // fetch photo from pexel api
    const response = await fetch(apiUrl, {method: 'GET', headers: {authorization: authoriz} });

    // parse promise data into json
    const data = await response.json();

    return data.photos[0].src.original;

  } catch (error) {
    return error;
  }
}

const apiParsedObj = (location) => {
  const resultObj = {};
  extractRawData(location)
    .then((obj) => {
      resultObj.city = obj.name;
      resultObj.country = obj.sys.country;
      resultObj.timeZone = obj.timezone;
      resultObj.feelsLikeTempF = obj.main.feels_like;
      resultObj.windDirection = obj.wind.deg;
      resultObj.windSpeedImp = obj.wind.speed;
      resultObj.sunrise = obj.sys.sunrise;
      resultObj.sunset = obj.sys.sunset;
      resultObj.iconId = obj.weather[0].icon;
      resultObj.mainTempF = obj.main.temp;
      resultObj.maxTempF = obj.main.temp_max;
      resultObj.minTempF = obj.main.temp_min;
      resultObj.skyDescription = obj.weather[0].description;
    })
    .catch((e) => {
      resultObj.error = e.message;
    });
  

  extractImageBg(location)
    .then( (response) => {
      resultObj.image = response;
    }).catch((e) => {
      resultObj.error = e.message;
    });
  return resultObj;
};


export { apiParsedObj, extractImageBg };