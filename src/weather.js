/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_title", "_tasks", "_id" , "_taskCounter" ,
 "_description", "_dueDate" , "_status" , "_priority" , "_projId"] }] */
 import moment from 'moment';
 class Weather {
  constructor(apiObj) {
    this._city = apiObj.city;
    this._country = apiObj.country;
    this._timeZone = apiObj.timeZone;
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
    const tmH = this._timeZone / 3600;
    let tmZ = `GMT${tmH}`;
    return tmZ;
  }

  get time() {
    const timeZoneOffset =  this._timeZone / 3600;
    const unixUtc = moment.utc().utcOffset(timeZoneOffset);
    const dateObj = {
      week : moment(unixUtc).format('ddd'),
      month: moment(unixUtc).format('MMM'),
      day: moment(unixUtc).format('Do'),
      hour: moment(unixUtc).format('LT')
    };

    return dateObj;
  }

  get feelsLikeTempF() {
    return Math.floor(this._feelsLikeTempF);
  }

  get feelsLikeTempC() {
    const tempC = Math.floor((this._feelsLikeTempF - 32) * 5/9);
    return tempC;
  }

  get windDirection() {
    const deg = parseInt(this._windDirection);
    const degToCardinalDivision = Math.round(deg / 22.5);
    const cadranNamesList = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const cardinal = cadranNamesList[degToCardinalDivision];
    return cardinal;
  }

  get windSpeedImp() {
    return this._windSpeedImp;
  }

  get windSpeedMetric() {
    return Math.floor(this._windSpeedImp * 1.60934);
  }

  get mainTempF() {
    return this._mainTempF;
  }

  get maxTempF() {
    return this._maxTempF;
  }
  
  get minTempF() {
    return this._minTempF;
  }

  get mainTempC() {
    const tempC = Math.floor((this._mainTempF - 32) * 5/9);
    return tempC;
  }

  get maxTempC() {
    const tempC = Math.floor((this._maxTempF - 32) * 5/9);
    return tempC;
  }
  
  get minTempC() {
    const tempC = Math.floor((this._minTempF - 32) * 5/9);
    return tempC;
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

  get sunrise() {
    const timeZoneOffset =  this._timeZone / 3600;
    return moment(this._sunrise*1000).utcOffset(timeZoneOffset).format('LT');
  }

  get sunset() {
    const timeZoneOffset =  this._timeZone / 3600;
    return moment(this._sunset*1000).utcOffset(timeZoneOffset).format('LT');
  }

  get skyDescription() {
    return this._skyDescription;
  }
}

export default Weather;