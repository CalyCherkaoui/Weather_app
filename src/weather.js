/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_title", "_tasks", "_id" , "_taskCounter" ,
 "_description", "_dueDate" , "_status" , "_priority" , "_projId"] }] */
class Weather {
  constructor(timeZone, feelsLTemperatureF, maxTemperatureF, minTemperatureF, sky, iconId, windSpeed, windDirection) {
    this._timeZone = timeZone;
    this._feelsLTemperatureF = feelsLTemperatureF;
    this._maxTemperatureF = maxTemperatureF;
    this._minTemperatureF = minTemperatureF;
    this._sky = sky;
    this._iconId =  iconId;
    this._windSpeed = windSpeed;
    this._windDirection = windDirection;
  }

  get timeZone() {
    return this._timeZone;
  }

  get feelsLTemperatureF() {
    return this._feelsLTemperatureF;
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