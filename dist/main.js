/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _DomsBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);




const Weather = __webpack_require__(8).default;

const container = document.querySelector('#container');

window.addEventListener("load", () => {
  let testerror = {message: 'error!'};
  container.append((0,_DomsBuilder__WEBPACK_IMPORTED_MODULE_2__.displayError)(testerror));
  
  console.log((0,_api__WEBPACK_IMPORTED_MODULE_1__.apiParsedObj)('Osaka'));

  console.log((0,_api__WEBPACK_IMPORTED_MODULE_1__.extractRawData)('London'));
});





/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: aquamarine;\n}", "",{"version":3,"sources":["webpack://./src/style/style.css"],"names":[],"mappings":"AAAA;EACE,4BAA4B;AAC9B","sourcesContent":["body {\n  background-color: aquamarine;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiParsedObj": () => /* binding */ apiParsedObj,
/* harmony export */   "extractRawData": () => /* binding */ extractRawData
/* harmony export */ });
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
  const resultObj = {};
  extractRawData(location)
                .then( (obj) => {
                  resultObj.city = obj.name;
                  resultObj.country = obj.sys.country;
                  resultObj.timeZone = obj.timezone;
                  resultObj.time = obj.dt;
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

  return resultObj;
}




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayError": () => /* binding */ displayError,
/* harmony export */   "displayCurrentWeather": () => /* binding */ displayCurrentWeather,
/* harmony export */   "displayWeatherResqestForm": () => /* binding */ displayWeatherResqestForm
/* harmony export */ });
// Main current weather

const displayCurrentWeather = (weather) => {
  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.setAttribute('id', 'current_weather');

  // ---------------------- Location container --------------------

  const locationContainer = document.createElement('div');
  locationContainer.setAttribute('id', 'location_container');

  const locationIcon = document.createElement('span');
  locationIcon.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
  locationIcon.classList.add('icon_secondary');

  const locationCity = document.createElement('span');
  locationCity.classList.add('location_text');
  locationCity.textContent = `${weather.city}, ${weather.country}`;

  const locationSeparator = document.createElement('span');
  locationSeparator.classList.add('location_text');
  locationSeparator.textContent = '|';

  const locationTimeZone = document.createElement('span');
  locationTimeZone.classList.add('location_text');
  locationTimeZone.textContent = weather.timeZone;

  locationContainer.append(locationIcon,locationCity, locationSeparator, locationTimeZone);

  // -------------------- Time Container --------------------------

  const timeContainer = document.createElement('div');
  timeContainer.setAttribute('id', 'time_container');
  timeContainer.textContent = weather.time;

  // -------------------- Secondary info container ----------------

  const secondaryInfoContainer = document.createElement('div');
  secondaryInfoContainer.setAttribute('id', 'secondary_info_container');

  // feels Like temperature info
  const feelsLikeInfo = document.createElement('div');
  const feelsLikeText = document.createElement('span');
  feelsLikeText.classList.add('second_info_text');
  feelsLikeText.textContent = 'Feels Like: ';
  const feelsLikeTempF = document.createElement('span');
  feelsLikeTempF.classList.add('second_info_text');
  feelsLikeTempF.setAttribute('id', 'feels_like_tempF');
  feelsLikeTextF.textContent = `${weather.feelsLikeTempF} °F`;
  const feelsLikeTempC = document.createElement('span');
  feelsLikeTempC.classList.add('second_info_text');
  feelsLikeTempC.classList.add('hide');
  feelsLikeTempC.setAttribute('id', 'feels_like_tempC');
  feelsLikeTempC.textContent = `${weather.feelsLikeTempC} °C`;
  feelsLikeInfo.append(feelsLikeText, feelsLikeTempF, feelsLikeTempC);

  // Wind info
  const windInfo = document.createElement('div');
  const windText = document.createElement('span');
  windText.classList.add('second_info_text');
  windText.textContent = `Wind: ${weather.windDirection} `;
  const windSpeedImp = document.createElement('span');
  windSpeedImp.classList.add('second_info_text');
  windSpeedImp.setAttribute('id', 'wind_speed_SpeedImperial');
  windSpeedImp.textContent = `${weather.windSpeedImp} mph`;
  const windSpeedM = document.createElement('span');
  windSpeedM.classList.add('second_info_text');
  windSpeedM.classList.add('hide');
  windSpeedM.setAttribute('id', 'wind_Speed_metric');
  windSpeedM.textContent = `${weather.windSpeedMetric} km/h`;
  windInfo.append(windText, windSpeedImp, windSpeedM);

  //Sunrise info
  const sunriseInfo = document.createElement('div');
  const sunriseText = document.createElement('span');
  sunriseText.classList.add('second_info_text');
  sunriseText.textContent = `Sunrise: ${weather.sunrise}`;
  sunriseInfo.append(sunriseText);

  //sunset info
  const sunsetInfo = document.createElement('div');
  const sunsetText = document.createElement('span');
  sunsetText.classList.add('second_info_text');
  sunsetText.textContent = `sunset: ${weather.sunset}`;
  sunsetInfo.append(sunsetText);

  // append sencondary info container
  secondaryInfoContainer.append(feelsLikeInfo, windInfo, sunriseInfo, sunsetInfo);

  // ------------------------------- Sky image Info --------------------

  const skyImage = new Image();
  skyImage.setAttribute('src', `skyimg${weather.iconId}`);
  skyImage.setAttribute('id', 'sky_image');

  // ------------------------------ Primary Info -------------------

  const primaryInfoContainer = document.createElement('div');
  primaryInfoContainer.setAttribute('id', 'primary_info_container');

  // main Temperature
  const mainTempWrapper = document.createElement('div');
  const mainTempF = document.createElement('div');
  mainTempF.classList.add('primary_info_text');
  mainTempF.setAttribute('id', 'main_temp_F');
  mainTempF.textContent = `${weather.mainTemperatureF} °F`;
  const mainTempC = document.createElement('div');
  mainTempC.classList.add('primary_info_text');
  mainTempC.classList.add('hide');
  mainTempC.setAttribute('id', 'main_temp_C');
  mainTempC.textContent = `${weather.mainTemperatureC} °C`;

  mainTempWrapper.append(mainTempF, mainTempC);

  // max & min temp
  const maxMinTempWrapper = document.createElement('div');

  const maxMinTempF = document.createElement('div');
  maxMinTempF.setAttribute('id', 'max_min_temp_F');
  const maxTempF = document.createElement('div');
  maxTempF.setAttribute('class', 'small_text');
  maxTempF.textContent = `${weather.maxTempF}°`;
  const minTempF = document.createElement('div');
  minTempF.setAttribute('class', 'small_text');
  minTempF.textContent = `${weather.minTempF}°`;
  maxMinTempF.append(maxTempF, minTempF);

  const maxMinTempC = document.createElement('div');
  maxMinTempC.setAttribute('id', 'max_min_temp_C');
  maxMinTempC.classList.add('hide');
  const maxTempC = document.createElement('div');
  maxTempC.setAttribute('class', 'small_text');
  maxTempC.textContent = `${weather.maxTempC}°`;
  const minTempC = document.createElement('div');
  minTempC.setAttribute('class', 'small_text');
  minTempC.textContent = `${weather.minTempC}°`;
  maxMinTempC.append(maxTempC, minTempC);

  maxMinTempWrapper.append(maxMinTempF, maxMinTempC);

  // append primary info container

  primaryInfoContainer.append(mainTempWrapper, maxMinTempWrapper);

  // ----------------------------- Wether Description text ------------

  const skyDescription = document.createElement('p');
  skyDescription.setAttribute('class', 'second_info_text');
  skyDescription.textContent = weather.skyDescription;

  // --------------------------- append global grid container ----------

  currentWeatherContainer.append(locationContainer, timeContainer,
                                  secondaryInfoContainer, skyImage, 
                                  primaryInfoContainer, skyDescription);

  return currentWeatherContainer;
}

// display wether request form
const displayWeatherResqestForm = () => {
  const weatherRequestForm = document.createElement('div');
  weatherRequestForm.setAttribute('id','weather_request_form');
  const requestInput = document.createElement('input');
  requestInput.setAttribute('type', 'text');
  requestInput.setAttribute('id', 'weather_request_input');
  requestInput.setAttribute('placeholder', 'Type a city name here!');
  const requestSubmitButton = document.createElement('button');
  requestSubmitButton.setAttribute('id', 'weather_request_submit');
  weatherRequestForm.append(requestInput, requestSubmitButton);
  return weatherRequestForm;
}

// display error
const displayError = (error) => {
  const errorCard =  document.createElement('div');
  errorCard.setAttribute('id', 'error_card');
  errorCard.textContent = error.message;
  return errorCard;
}





/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Weather);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL3NyYy9zdHlsZS9zdHlsZS5jc3M/YzlmMCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL3NyYy9zdHlsZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvLi9zcmMvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwLy4vc3JjL0RvbXNCdWlsZGVyLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwLy4vc3JjL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXJfYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7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QUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlL3N0eWxlLmNzcyc7XG5pbXBvcnQge2FwaVBhcnNlZE9iaiwgZXh0cmFjdFJhd0RhdGF9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7ZGlzcGxheUVycm9yfSBmcm9tICcuL0RvbXNCdWlsZGVyJztcblxuY29uc3QgV2VhdGhlciA9IHJlcXVpcmUoJy4vd2VhdGhlcicpLmRlZmF1bHQ7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWluZXInKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgbGV0IHRlc3RlcnJvciA9IHttZXNzYWdlOiAnZXJyb3IhJ307XG4gIGNvbnRhaW5lci5hcHBlbmQoZGlzcGxheUVycm9yKHRlc3RlcnJvcikpO1xuICBcbiAgY29uc29sZS5sb2coYXBpUGFyc2VkT2JqKCdPc2FrYScpKTtcblxuICBjb25zb2xlLmxvZyhleHRyYWN0UmF3RGF0YSgnTG9uZG9uJykpO1xufSk7XG5cblxuXG4iLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxudmFyIHN0eWxlc0luRG9tID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5Eb20ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5Eb21baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzSW5Eb20ucHVzaCh7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IGFkZFN0eWxlKG9iaiwgb3B0aW9ucyksXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHZhciBhdHRyaWJ1dGVzID0gb3B0aW9ucy5hdHRyaWJ1dGVzIHx8IHt9O1xuXG4gIGlmICh0eXBlb2YgYXR0cmlidXRlcy5ub25jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBhdHRyaWJ1dGVzLm5vbmNlID0gbm9uY2U7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KG9wdGlvbnMuaW5zZXJ0IHx8ICdoZWFkJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG52YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbiByZXBsYWNlVGV4dCgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmoubWVkaWEgPyBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpLmNvbmNhdChvYmouY3NzLCBcIn1cIikgOiBvYmouY3NzOyAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgnbWVkaWEnKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSw0QkFBNEI7QUFDOUJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhbWFyaW5lO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCAnJykuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsImNvbnN0IGV4dHJhY3RSYXdEYXRhID0gYXN5bmMgKGxvY2F0aW9uKSA9PiB7XG5cbiAgY29uc3QgYXBpVXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mYXBwaWQ9ZWM2OTc0MTY5MGE2ODVjMjFjMjFmZmVkYTMwY2FjMzdgO1xuXG4gIHRyeSB7XG4gICAgLy9mZXRjaCBkYXRhIGZyb20gYXBpXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlVcmwpO1xuXG4gICAgLy8gcGFyc2UgcHJvbWlzZSBkYXRhIGludG8ganNvblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gZGF0YTtcblxuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJvcjtcbiAgfVxufVxuXG5jb25zdCBhcGlQYXJzZWRPYmogPSAobG9jYXRpb24pID0+IHtcbiAgY29uc3QgcmVzdWx0T2JqID0ge307XG4gIGV4dHJhY3RSYXdEYXRhKGxvY2F0aW9uKVxuICAgICAgICAgICAgICAgIC50aGVuKCAob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmouY2l0eSA9IG9iai5uYW1lO1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLmNvdW50cnkgPSBvYmouc3lzLmNvdW50cnk7XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmoudGltZVpvbmUgPSBvYmoudGltZXpvbmU7XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmoudGltZSA9IG9iai5kdDtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdE9iai5mZWVsc0xpa2VUZW1wRiA9IG9iai5tYWluLmZlZWxzX2xpa2U7XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmoud2luZERpcmVjdGlvbiA9IG9iai53aW5kLmRlZztcbiAgICAgICAgICAgICAgICAgIHJlc3VsdE9iai53aW5kU3BlZWRJbXAgPSBvYmoud2luZC5zcGVlZDtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdE9iai5zdW5yaXNlID0gb2JqLnN5cy5zdW5yaXNlO1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLnN1bnNldCA9IG9iai5zeXMuc3Vuc2V0O1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLmljb25JZCA9IG9iai53ZWF0aGVyWzBdLmljb247XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmoubWFpblRlbXBGID0gb2JqLm1haW4udGVtcDtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdE9iai5tYXhUZW1wRiA9IG9iai5tYWluLnRlbXBfbWF4O1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLm1pblRlbXBGID0gb2JqLm1haW4udGVtcF9taW47XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmouc2t5RGVzY3JpcHRpb24gPSBvYmoud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLmVycm9yID0gZS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gIHJldHVybiByZXN1bHRPYmo7XG59XG5cblxuZXhwb3J0IHthcGlQYXJzZWRPYmosIGV4dHJhY3RSYXdEYXRhfTsiLCIvLyBNYWluIGN1cnJlbnQgd2VhdGhlclxuXG5jb25zdCBkaXNwbGF5Q3VycmVudFdlYXRoZXIgPSAod2VhdGhlcikgPT4ge1xuICBjb25zdCBjdXJyZW50V2VhdGhlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjdXJyZW50V2VhdGhlckNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2N1cnJlbnRfd2VhdGhlcicpO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTG9jYXRpb24gY29udGFpbmVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgY29uc3QgbG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbG9jYXRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdsb2NhdGlvbl9jb250YWluZXInKTtcblxuICBjb25zdCBsb2NhdGlvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxvY2F0aW9uSWNvbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbWFwLW1hcmtlci1hbHRcIj48L2k+JztcbiAgbG9jYXRpb25JY29uLmNsYXNzTGlzdC5hZGQoJ2ljb25fc2Vjb25kYXJ5Jyk7XG5cbiAgY29uc3QgbG9jYXRpb25DaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBsb2NhdGlvbkNpdHkuY2xhc3NMaXN0LmFkZCgnbG9jYXRpb25fdGV4dCcpO1xuICBsb2NhdGlvbkNpdHkudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyLmNpdHl9LCAke3dlYXRoZXIuY291bnRyeX1gO1xuXG4gIGNvbnN0IGxvY2F0aW9uU2VwYXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBsb2NhdGlvblNlcGFyYXRvci5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbl90ZXh0Jyk7XG4gIGxvY2F0aW9uU2VwYXJhdG9yLnRleHRDb250ZW50ID0gJ3wnO1xuXG4gIGNvbnN0IGxvY2F0aW9uVGltZVpvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxvY2F0aW9uVGltZVpvbmUuY2xhc3NMaXN0LmFkZCgnbG9jYXRpb25fdGV4dCcpO1xuICBsb2NhdGlvblRpbWVab25lLnRleHRDb250ZW50ID0gd2VhdGhlci50aW1lWm9uZTtcblxuICBsb2NhdGlvbkNvbnRhaW5lci5hcHBlbmQobG9jYXRpb25JY29uLGxvY2F0aW9uQ2l0eSwgbG9jYXRpb25TZXBhcmF0b3IsIGxvY2F0aW9uVGltZVpvbmUpO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFRpbWUgQ29udGFpbmVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aW1lQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndGltZV9jb250YWluZXInKTtcbiAgdGltZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IHdlYXRoZXIudGltZTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBTZWNvbmRhcnkgaW5mbyBjb250YWluZXIgLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGNvbnN0IHNlY29uZGFyeUluZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2Vjb25kYXJ5SW5mb0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3NlY29uZGFyeV9pbmZvX2NvbnRhaW5lcicpO1xuXG4gIC8vIGZlZWxzIExpa2UgdGVtcGVyYXR1cmUgaW5mb1xuICBjb25zdCBmZWVsc0xpa2VJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGZlZWxzTGlrZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGZlZWxzTGlrZVRleHQuY2xhc3NMaXN0LmFkZCgnc2Vjb25kX2luZm9fdGV4dCcpO1xuICBmZWVsc0xpa2VUZXh0LnRleHRDb250ZW50ID0gJ0ZlZWxzIExpa2U6ICc7XG4gIGNvbnN0IGZlZWxzTGlrZVRlbXBGID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBmZWVsc0xpa2VUZW1wRi5jbGFzc0xpc3QuYWRkKCdzZWNvbmRfaW5mb190ZXh0Jyk7XG4gIGZlZWxzTGlrZVRlbXBGLnNldEF0dHJpYnV0ZSgnaWQnLCAnZmVlbHNfbGlrZV90ZW1wRicpO1xuICBmZWVsc0xpa2VUZXh0Ri50ZXh0Q29udGVudCA9IGAke3dlYXRoZXIuZmVlbHNMaWtlVGVtcEZ9IMKwRmA7XG4gIGNvbnN0IGZlZWxzTGlrZVRlbXBDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBmZWVsc0xpa2VUZW1wQy5jbGFzc0xpc3QuYWRkKCdzZWNvbmRfaW5mb190ZXh0Jyk7XG4gIGZlZWxzTGlrZVRlbXBDLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgZmVlbHNMaWtlVGVtcEMuc2V0QXR0cmlidXRlKCdpZCcsICdmZWVsc19saWtlX3RlbXBDJyk7XG4gIGZlZWxzTGlrZVRlbXBDLnRleHRDb250ZW50ID0gYCR7d2VhdGhlci5mZWVsc0xpa2VUZW1wQ30gwrBDYDtcbiAgZmVlbHNMaWtlSW5mby5hcHBlbmQoZmVlbHNMaWtlVGV4dCwgZmVlbHNMaWtlVGVtcEYsIGZlZWxzTGlrZVRlbXBDKTtcblxuICAvLyBXaW5kIGluZm9cbiAgY29uc3Qgd2luZEluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgd2luZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHdpbmRUZXh0LmNsYXNzTGlzdC5hZGQoJ3NlY29uZF9pbmZvX3RleHQnKTtcbiAgd2luZFRleHQudGV4dENvbnRlbnQgPSBgV2luZDogJHt3ZWF0aGVyLndpbmREaXJlY3Rpb259IGA7XG4gIGNvbnN0IHdpbmRTcGVlZEltcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgd2luZFNwZWVkSW1wLmNsYXNzTGlzdC5hZGQoJ3NlY29uZF9pbmZvX3RleHQnKTtcbiAgd2luZFNwZWVkSW1wLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2luZF9zcGVlZF9TcGVlZEltcGVyaWFsJyk7XG4gIHdpbmRTcGVlZEltcC50ZXh0Q29udGVudCA9IGAke3dlYXRoZXIud2luZFNwZWVkSW1wfSBtcGhgO1xuICBjb25zdCB3aW5kU3BlZWRNID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICB3aW5kU3BlZWRNLmNsYXNzTGlzdC5hZGQoJ3NlY29uZF9pbmZvX3RleHQnKTtcbiAgd2luZFNwZWVkTS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIHdpbmRTcGVlZE0uc2V0QXR0cmlidXRlKCdpZCcsICd3aW5kX1NwZWVkX21ldHJpYycpO1xuICB3aW5kU3BlZWRNLnRleHRDb250ZW50ID0gYCR7d2VhdGhlci53aW5kU3BlZWRNZXRyaWN9IGttL2hgO1xuICB3aW5kSW5mby5hcHBlbmQod2luZFRleHQsIHdpbmRTcGVlZEltcCwgd2luZFNwZWVkTSk7XG5cbiAgLy9TdW5yaXNlIGluZm9cbiAgY29uc3Qgc3VucmlzZUluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgc3VucmlzZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHN1bnJpc2VUZXh0LmNsYXNzTGlzdC5hZGQoJ3NlY29uZF9pbmZvX3RleHQnKTtcbiAgc3VucmlzZVRleHQudGV4dENvbnRlbnQgPSBgU3VucmlzZTogJHt3ZWF0aGVyLnN1bnJpc2V9YDtcbiAgc3VucmlzZUluZm8uYXBwZW5kKHN1bnJpc2VUZXh0KTtcblxuICAvL3N1bnNldCBpbmZvXG4gIGNvbnN0IHN1bnNldEluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgc3Vuc2V0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgc3Vuc2V0VGV4dC5jbGFzc0xpc3QuYWRkKCdzZWNvbmRfaW5mb190ZXh0Jyk7XG4gIHN1bnNldFRleHQudGV4dENvbnRlbnQgPSBgc3Vuc2V0OiAke3dlYXRoZXIuc3Vuc2V0fWA7XG4gIHN1bnNldEluZm8uYXBwZW5kKHN1bnNldFRleHQpO1xuXG4gIC8vIGFwcGVuZCBzZW5jb25kYXJ5IGluZm8gY29udGFpbmVyXG4gIHNlY29uZGFyeUluZm9Db250YWluZXIuYXBwZW5kKGZlZWxzTGlrZUluZm8sIHdpbmRJbmZvLCBzdW5yaXNlSW5mbywgc3Vuc2V0SW5mbyk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTa3kgaW1hZ2UgSW5mbyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGNvbnN0IHNreUltYWdlID0gbmV3IEltYWdlKCk7XG4gIHNreUltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgYHNreWltZyR7d2VhdGhlci5pY29uSWR9YCk7XG4gIHNreUltYWdlLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2t5X2ltYWdlJyk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFByaW1hcnkgSW5mbyAtLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgY29uc3QgcHJpbWFyeUluZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJpbWFyeUluZm9Db250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdwcmltYXJ5X2luZm9fY29udGFpbmVyJyk7XG5cbiAgLy8gbWFpbiBUZW1wZXJhdHVyZVxuICBjb25zdCBtYWluVGVtcFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgbWFpblRlbXBGID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1haW5UZW1wRi5jbGFzc0xpc3QuYWRkKCdwcmltYXJ5X2luZm9fdGV4dCcpO1xuICBtYWluVGVtcEYuc2V0QXR0cmlidXRlKCdpZCcsICdtYWluX3RlbXBfRicpO1xuICBtYWluVGVtcEYudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyLm1haW5UZW1wZXJhdHVyZUZ9IMKwRmA7XG4gIGNvbnN0IG1haW5UZW1wQyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtYWluVGVtcEMuY2xhc3NMaXN0LmFkZCgncHJpbWFyeV9pbmZvX3RleHQnKTtcbiAgbWFpblRlbXBDLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgbWFpblRlbXBDLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWFpbl90ZW1wX0MnKTtcbiAgbWFpblRlbXBDLnRleHRDb250ZW50ID0gYCR7d2VhdGhlci5tYWluVGVtcGVyYXR1cmVDfSDCsENgO1xuXG4gIG1haW5UZW1wV3JhcHBlci5hcHBlbmQobWFpblRlbXBGLCBtYWluVGVtcEMpO1xuXG4gIC8vIG1heCAmIG1pbiB0ZW1wXG4gIGNvbnN0IG1heE1pblRlbXBXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgY29uc3QgbWF4TWluVGVtcEYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWF4TWluVGVtcEYuc2V0QXR0cmlidXRlKCdpZCcsICdtYXhfbWluX3RlbXBfRicpO1xuICBjb25zdCBtYXhUZW1wRiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtYXhUZW1wRi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NtYWxsX3RleHQnKTtcbiAgbWF4VGVtcEYudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyLm1heFRlbXBGfcKwYDtcbiAgY29uc3QgbWluVGVtcEYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWluVGVtcEYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzbWFsbF90ZXh0Jyk7XG4gIG1pblRlbXBGLnRleHRDb250ZW50ID0gYCR7d2VhdGhlci5taW5UZW1wRn3CsGA7XG4gIG1heE1pblRlbXBGLmFwcGVuZChtYXhUZW1wRiwgbWluVGVtcEYpO1xuXG4gIGNvbnN0IG1heE1pblRlbXBDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1heE1pblRlbXBDLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWF4X21pbl90ZW1wX0MnKTtcbiAgbWF4TWluVGVtcEMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICBjb25zdCBtYXhUZW1wQyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtYXhUZW1wQy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NtYWxsX3RleHQnKTtcbiAgbWF4VGVtcEMudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyLm1heFRlbXBDfcKwYDtcbiAgY29uc3QgbWluVGVtcEMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWluVGVtcEMuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzbWFsbF90ZXh0Jyk7XG4gIG1pblRlbXBDLnRleHRDb250ZW50ID0gYCR7d2VhdGhlci5taW5UZW1wQ33CsGA7XG4gIG1heE1pblRlbXBDLmFwcGVuZChtYXhUZW1wQywgbWluVGVtcEMpO1xuXG4gIG1heE1pblRlbXBXcmFwcGVyLmFwcGVuZChtYXhNaW5UZW1wRiwgbWF4TWluVGVtcEMpO1xuXG4gIC8vIGFwcGVuZCBwcmltYXJ5IGluZm8gY29udGFpbmVyXG5cbiAgcHJpbWFyeUluZm9Db250YWluZXIuYXBwZW5kKG1haW5UZW1wV3JhcHBlciwgbWF4TWluVGVtcFdyYXBwZXIpO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFdldGhlciBEZXNjcmlwdGlvbiB0ZXh0IC0tLS0tLS0tLS0tLVxuXG4gIGNvbnN0IHNreURlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBza3lEZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NlY29uZF9pbmZvX3RleHQnKTtcbiAgc2t5RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB3ZWF0aGVyLnNreURlc2NyaXB0aW9uO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBhcHBlbmQgZ2xvYmFsIGdyaWQgY29udGFpbmVyIC0tLS0tLS0tLS1cblxuICBjdXJyZW50V2VhdGhlckNvbnRhaW5lci5hcHBlbmQobG9jYXRpb25Db250YWluZXIsIHRpbWVDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5SW5mb0NvbnRhaW5lciwgc2t5SW1hZ2UsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlJbmZvQ29udGFpbmVyLCBza3lEZXNjcmlwdGlvbik7XG5cbiAgcmV0dXJuIGN1cnJlbnRXZWF0aGVyQ29udGFpbmVyO1xufVxuXG4vLyBkaXNwbGF5IHdldGhlciByZXF1ZXN0IGZvcm1cbmNvbnN0IGRpc3BsYXlXZWF0aGVyUmVzcWVzdEZvcm0gPSAoKSA9PiB7XG4gIGNvbnN0IHdlYXRoZXJSZXF1ZXN0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB3ZWF0aGVyUmVxdWVzdEZvcm0uc2V0QXR0cmlidXRlKCdpZCcsJ3dlYXRoZXJfcmVxdWVzdF9mb3JtJyk7XG4gIGNvbnN0IHJlcXVlc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIHJlcXVlc3RJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICByZXF1ZXN0SW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyX3JlcXVlc3RfaW5wdXQnKTtcbiAgcmVxdWVzdElucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnVHlwZSBhIGNpdHkgbmFtZSBoZXJlIScpO1xuICBjb25zdCByZXF1ZXN0U3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHJlcXVlc3RTdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyX3JlcXVlc3Rfc3VibWl0Jyk7XG4gIHdlYXRoZXJSZXF1ZXN0Rm9ybS5hcHBlbmQocmVxdWVzdElucHV0LCByZXF1ZXN0U3VibWl0QnV0dG9uKTtcbiAgcmV0dXJuIHdlYXRoZXJSZXF1ZXN0Rm9ybTtcbn1cblxuLy8gZGlzcGxheSBlcnJvclxuY29uc3QgZGlzcGxheUVycm9yID0gKGVycm9yKSA9PiB7XG4gIGNvbnN0IGVycm9yQ2FyZCA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZXJyb3JDYXJkLnNldEF0dHJpYnV0ZSgnaWQnLCAnZXJyb3JfY2FyZCcpO1xuICBlcnJvckNhcmQudGV4dENvbnRlbnQgPSBlcnJvci5tZXNzYWdlO1xuICByZXR1cm4gZXJyb3JDYXJkO1xufVxuXG5cblxuZXhwb3J0IHtkaXNwbGF5RXJyb3IsIGRpc3BsYXlDdXJyZW50V2VhdGhlciwgZGlzcGxheVdlYXRoZXJSZXNxZXN0Rm9ybX07IiwiLyogZXNsaW50IG5vLXVuZGVyc2NvcmUtZGFuZ2xlOiBbXCJlcnJvclwiLCB7IFwiYWxsb3dBZnRlclRoaXNcIjogdHJ1ZSB9XSAqL1xuLyogZXNsaW50IG5vLXVuZGVyc2NvcmUtZGFuZ2xlOiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wiX3RpdGxlXCIsIFwiX3Rhc2tzXCIsIFwiX2lkXCIgLCBcIl90YXNrQ291bnRlclwiICxcbiBcIl9kZXNjcmlwdGlvblwiLCBcIl9kdWVEYXRlXCIgLCBcIl9zdGF0dXNcIiAsIFwiX3ByaW9yaXR5XCIgLCBcIl9wcm9qSWRcIl0gfV0gKi9cbmNsYXNzIFdlYXRoZXIge1xuICBjb25zdHJ1Y3RvcihhcGlPYmopIHtcbiAgICB0aGlzLl9jaXR5ID0gYXBpT2JqLmNpdHk7XG4gICAgdGhpcy5fY291bnR5ID0gYXBpT2JqLmNvdW50cnk7XG4gICAgdGhpcy5fdGltZVpvbmUgPSBhcGlPYmoudGltZVpvbmU7XG4gICAgdGhpcy5fdGltZSA9IGFwaU9iai50aW1lO1xuICAgIHRoaXMuX2ZlZWxzTGlrZVRlbXBGID0gYXBpT2JqLmZlZWxzTGlrZVRlbXBGO1xuICAgIHRoaXMuX3dpbmREaXJlY3Rpb24gPSBhcGlPYmoud2luZERpcmVjdGlvbjtcbiAgICB0aGlzLl93aW5kU3BlZWRJbXAgPSBhcGlPYmoud2luZFNwZWVkSW1wO1xuICAgIHRoaXMuX3N1bnJpc2UgPSBhcGlPYmouc3VucmlzZTtcbiAgICB0aGlzLl9zdW5zZXQgPSBhcGlPYmouc3Vuc2V0O1xuICAgIHRoaXMuX2ljb25JZCA9IGFwaU9iai5pY29uSWQ7XG4gICAgdGhpcy5fbWFpblRlbXBGID0gYXBpT2JqLm1haW5UZW1wRjtcbiAgICB0aGlzLl9tYXhUZW1wRiA9IGFwaU9iai5tYXhUZW1wRjtcbiAgICB0aGlzLl9taW5UZW1wRiA9IGFwaU9iai5taW5UZW1wRjtcbiAgICB0aGlzLl9za3lEZXNjcmlwdGlvbiA9IGFwaU9iai5za3lEZXNjcmlwdGlvbjtcbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgZ2V0IGNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NpdHk7XG4gIH1cblxuICBnZXQgY291bnRyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY291bnRyeTtcbiAgfVxuXG4gIGdldCB0aW1lWm9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGltZVpvbmU7XG4gIH1cblxuICBnZXQgdGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGltZTtcbiAgfVxuXG4gIGdldCBmZWVsc0xpa2VUZW1wRigpIHtcbiAgICByZXR1cm4gdGhpcy5fZmVlbHNMaWtlVGVtcEY7XG4gIH1cblxuICBnZXQgZmVlbHNMaWtlVGVtcEMoKSB7XG4gICAgY29uc3QgdGVtcEMgPSAodGhpcy5fZmVlbHNMaWtlVGVtcEYgLSAzMikgKiA1Lzk7XG4gICAgcmV0dXJuIHRlbXBDO1xuICB9XG5cbiAgZ2V0IHdpbmREaXJlY3Rpb24oKSB7XG4gICAgY29uc3QgZGVnID0gdGhpcy5fd2luZERpcmVjdGlvbjtcbiAgICBjb25zdCBkZWdUb0NhcmRpbmFsRGl2aXNpb24gPSBNYXRoLmZsb29yKChkZWcgLyAyMi41KSArIDAuNSk7XG4gICAgY29uc3QgY2FkcmFuTmFtZXNMaXN0ID0gW1wiTlwiLCBcIk5ORVwiLCBcIk5FXCIsIFwiRU5FXCIsIFwiRVwiLCBcIkVTRVwiLCBcIlNFXCIsIFwiU1NFXCIsIFwiU1wiLCBcIlNTV1wiLCBcIlNXXCIsIFwiV1NXXCIsIFwiV1wiLCBcIldOV1wiLCBcIk5XXCIsIFwiTk5XXCJdO1xuICAgIHJldHVybiBjYWRyYW5OYW1lc0xpc3RbKGRlZ1RvQ2FyZGluYWxEaXZpc2lvbiAlIDE2KV07XG4gIH1cblxuICBnZXQgd2luZFNwZWVkSW1wKCkge1xuICAgIHJldHVybiB0aGlzLl93aW5kU3BlZWRJbXA7XG4gIH1cblxuICBnZXQgd2luZFNwZWVkTWV0cmljKCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuX3dpbmRTcGVlZEltcCAqIDEuNjA5MzQpO1xuICB9XG5cblxuICBnZXQgbWF4VGVtcGVyYXR1cmVGKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXhUZW1wZXJhdHVyZUY7XG4gIH1cbiAgXG4gIGdldCBtaW5UZW1wZXJhdHVyZUYoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21pblRlbXBlcmF0dXJlRjtcbiAgfVxuXG4gIGdldCBza3koKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NreTtcbiAgfVxuXG4gIGdldCBpY29uSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb25JZDtcbiAgfVxuXG4gIGdldCB3aW5kU3BlZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dpbmRTcGVlZDtcbiAgfVxuXG4gIGdldCB3aW5kRGlyZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl93aW5kRGlyZWN0aW9uO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYXRoZXI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=