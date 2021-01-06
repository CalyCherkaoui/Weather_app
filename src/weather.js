/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_title", "_tasks", "_id" , "_taskCounter" ,
 "_description", "_dueDate" , "_status" , "_priority" , "_projId"] }] */
class Weather {
  constructor(apiObj) {
    this._city = apiObj.city;
    this._county = apiObj.country;
    this._timeZone = apiObj.timeZone;
    this._time = apiObj.time;
    this._feelsLikeTempF = apiObj.feelsLikeTempF;
    this._windDirection = apiObj.windDirection;
    this._windSpeedImp = apiObj.windSpeedImp;
    this._sunrise = apiObj.sunrise;
    this._sunset = apiObj.sunset;
    this._iconId = apiObj.iconId;
    this._mainTempF = apiObj.mainTempF;
    this._maxTempF = apiObj.maxTempF;
    this._minTempF = apiObj.minTempF;
    this._skyDescription = apiObj.skyDescription;
  }

  // Getters
  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  get timeZone() {
    return this._timeZone;
  }

  get time() {
    return this._time;
  }

  get feelsLikeTempF() {
    return this._feelsLikeTempF;
  }

  get feelsLikeTempC() {
    const tempC = (this._feelsLikeTempF - 32) * 5/9;
    return tempC;
  }

  get windDirection() {
    const deg = this._windDirection;
    const degToCardinalDivision = Math.floor((deg / 22.5) + 0.5);
    const cadranNamesList = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return cadranNamesList[(degToCardinalDivision % 16)];
  }

  get windSpeedImp() {
    return this._windSpeedImp;
  }

  get windSpeedMetric() {
    return Math.floor(this._windSpeedImp * 1.60934);
  }


  get maxTemperatureF() {
    return this._maxTemperatureF;
  }
  
  get minTemperatureF() {
    return this._minTemperatureF;
  }

  get sky() {
    return this._sky;
  }

  get iconId() {
    return this._iconId;
  }

  get windSpeed() {
    return this._windSpeed;
  }

  get windDirection() {
    return this._windDirection;
  }
}

export default Weather;