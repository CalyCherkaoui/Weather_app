/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
class Weather {
  constructor(timeZone, feelsLTemperatureF, maxTemperatureF, minTemperatureF, sky, windSpeed, windDirection) {
    this._timeZone = timeZone;
    this._feelsLTemperatureF = feelsLTemperatureF;
    this._maxTemperatureF = maxTemperatureF;
    this._minTemperatureF = minTemperatureF;
    this._sky = sky;
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

  get windSpeed() {
    return this._windSpeed;
  }

  get windDirection() {
    return this._windDirection;
  }
}