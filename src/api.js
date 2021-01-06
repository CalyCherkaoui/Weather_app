const extractRawData = async (location) => {

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ec69741690a685c21c21ffeda30cac37`;

  try {
    //fetch data from api
    const response = await fetch(apiUrl);

    // parse promise data into json
    const data = await response.json();

    return data;

  }
  catch (error) {
    return error;
  }
}

const apiParsedObj = (location) => {
  const resultObj = {error: ''};
  extractRawData(location)
                .then( (obj) => {
                  resultObj.timeZone = obj.timezone;
                  resultObj.feelsLTemperatureF = obj.main.feels_like;
                  resultObj.maxTemperatureF = obj.main.temp_max;
                  resultObj.minTemperatureF = obj.main.temp_min;
                  resultObj.sky = obj.weather[0].description;
                  // resultObj.windSpeed = obj.windSpeed;
                  // resultObj.windDirection = obj.windDirection;
                })
                .catch((e) => {
                  resultObj.error = e.message;
                });

  return resultObj;
}


export {apiParsedObj, extractRawData};