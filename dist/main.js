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
  
  container.append((0,_DomsBuilder__WEBPACK_IMPORTED_MODULE_2__.displayWeatherResqestForm)());

  const obj = (0,_api__WEBPACK_IMPORTED_MODULE_1__.apiParsedObj)('boston'); // default or form submitt value

  const interval = setInterval( loading, 300);

  function loading() {
    
    if ( obj.city == undefined ) {
      container.append(_DomsBuilder__WEBPACK_IMPORTED_MODULE_2__.LoaderSpiner);
      console.log('loading en cours!');
    } else {
      clearInterval(interval);
      const requestedWeather = new Weather(obj);
      container.append((0,_DomsBuilder__WEBPACK_IMPORTED_MODULE_2__.displayCurrentWeather)(requestedWeather));
      console.log(requestedWeather.windDirection);
    }
  }

  // console.log(extractRawData('london'));

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
/* harmony export */   "displayWeatherResqestForm": () => /* binding */ displayWeatherResqestForm,
/* harmony export */   "LoaderSpiner": () => /* binding */ LoaderSpiner,
/* harmony export */   "displayCurrentWeather": () => /* binding */ displayCurrentWeather
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
  feelsLikeTempF.textContent = `${weather.feelsLikeTempF} °F `;
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
  windSpeedImp.textContent = `${weather.windSpeedImp} mph `;
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
  mainTempF.textContent = `${weather.mainTempF} °F`;
  const mainTempC = document.createElement('div');
  mainTempC.classList.add('primary_info_text');
  mainTempC.classList.add('hide');
  mainTempC.setAttribute('id', 'main_temp_C');
  mainTempC.textContent = `${weather.mainTempC} °C`;

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
  requestSubmitButton.textContent = 'Get Weather Forcast!'
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


// Loading bare while waiting for api success

const LoaderSpiner = () => {
  const loader = document.createElement('div');
  loader.setAttribute('id', 'loader');
  loader.textContent = 'loadind data from Api!'
  return loader;
}







/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_title", "_tasks", "_id" , "_taskCounter" ,
 "_description", "_dueDate" , "_status" , "_priority" , "_projId"] }] */
 
 class Weather {
  constructor(apiObj) {
    this._city = apiObj.city;
    this._country = apiObj.country;
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
    const tmH = this._timeZone / 3600;
    let tmZ = `GMT${tmH}`;
    return tmZ;
  }

  get time() {
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.default)(this._time);
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
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.default)(this._sunrise);
  }

  get sunset() {
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.default)(this._sunset);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Weather);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ fromUnixTime
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);



/**
 * @name fromUnixTime
 * @category Timestamp Helpers
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Number} unixTime - the given Unix timestamp
 * @returns {Date} the date
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * var result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */

function fromUnixTime(dirtyUnixTime) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var unixTime = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyUnixTime);
  return (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(unixTime * 1000);
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ requiredArgs
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ toInteger
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ toDate
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL3NyYy9zdHlsZS9zdHlsZS5jc3M/YzlmMCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL3NyYy9zdHlsZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvLi9zcmMvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwLy4vc3JjL0RvbXNCdWlsZGVyLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwLy4vc3JjL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2Zyb21Vbml4VGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXJfYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUEyQjtBQUN3QjtBQUN3RDtBQUNuRTtBQUNOOztBQUVsQyxnQkFBZ0IsOEJBQTRCOztBQUU1Qzs7QUFFQTs7QUFFQSxtQkFBbUIsdUVBQXlCOztBQUU1QyxjQUFjLGtEQUFZLFdBQVc7O0FBRXJDOztBQUVBOztBQUVBO0FBQ0EsdUJBQXVCLHNEQUFZO0FBQ25DO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx1QkFBdUIsbUVBQXFCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDMkY7QUFDNUYsWUFBMEY7O0FBRTFGOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSwwR0FBRyxDQUFDLG1GQUFPOzs7O0FBSXhCLGlFQUFlLDBGQUFjLE1BQU0sRTs7Ozs7O0FDWnRCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTtBQUNBO0FB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QUV4RDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLHVLQUF1Szs7QUFFdks7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7VUNuREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZS9zdHlsZS5jc3MnO1xuaW1wb3J0IHthcGlQYXJzZWRPYmosIGV4dHJhY3RSYXdEYXRhfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQge2Rpc3BsYXlFcnJvciwgZGlzcGxheVdlYXRoZXJSZXNxZXN0Rm9ybSwgTG9hZGVyU3BpbmVyICxkaXNwbGF5Q3VycmVudFdlYXRoZXJ9IGZyb20gJy4vRG9tc0J1aWxkZXInO1xuaW1wb3J0IHsgZnJvbVVuaXhUaW1lIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5jb25zdCBXZWF0aGVyID0gcmVxdWlyZSgnLi93ZWF0aGVyJykuZGVmYXVsdDtcblxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBcbiAgY29udGFpbmVyLmFwcGVuZChkaXNwbGF5V2VhdGhlclJlc3Flc3RGb3JtKCkpO1xuXG4gIGNvbnN0IG9iaiA9IGFwaVBhcnNlZE9iaignYm9zdG9uJyk7IC8vIGRlZmF1bHQgb3IgZm9ybSBzdWJtaXR0IHZhbHVlXG5cbiAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCggbG9hZGluZywgMzAwKTtcblxuICBmdW5jdGlvbiBsb2FkaW5nKCkge1xuICAgIFxuICAgIGlmICggb2JqLmNpdHkgPT0gdW5kZWZpbmVkICkge1xuICAgICAgY29udGFpbmVyLmFwcGVuZChMb2FkZXJTcGluZXIpO1xuICAgICAgY29uc29sZS5sb2coJ2xvYWRpbmcgZW4gY291cnMhJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgY29uc3QgcmVxdWVzdGVkV2VhdGhlciA9IG5ldyBXZWF0aGVyKG9iaik7XG4gICAgICBjb250YWluZXIuYXBwZW5kKGRpc3BsYXlDdXJyZW50V2VhdGhlcihyZXF1ZXN0ZWRXZWF0aGVyKSk7XG4gICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0ZWRXZWF0aGVyLndpbmREaXJlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNvbnNvbGUubG9nKGV4dHJhY3RSYXdEYXRhKCdsb25kb24nKSk7XG5cbn0pO1xuXG5cblxuIiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGUuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXIgc2luZ2xldG9uQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgc3R5bGU7XG4gIHZhciB1cGRhdGU7XG4gIHZhciByZW1vdmU7XG5cbiAgaWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG4gICAgc3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZSA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlKG9iaik7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4gIC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcblxuICBpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG4gIH1cblxuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ld0xpc3QpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhbWFyaW5lO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsNEJBQTRCO0FBQzlCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YW1hcmluZTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAodHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgJycpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJjb25zdCBleHRyYWN0UmF3RGF0YSA9IGFzeW5jIChsb2NhdGlvbikgPT4ge1xuXG4gIGNvbnN0IGFwaVVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JmFwcGlkPWVjNjk3NDE2OTBhNjg1YzIxYzIxZmZlZGEzMGNhYzM3YDtcblxuICB0cnkge1xuICAgIC8vZmV0Y2ggZGF0YSBmcm9tIGFwaVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpVXJsKTtcblxuICAgIC8vIHBhcnNlIHByb21pc2UgZGF0YSBpbnRvIGpzb25cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG5cbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cbn1cblxuY29uc3QgYXBpUGFyc2VkT2JqID0gKGxvY2F0aW9uKSA9PiB7XG4gIGNvbnN0IHJlc3VsdE9iaiA9IHt9O1xuICBleHRyYWN0UmF3RGF0YShsb2NhdGlvbilcbiAgICAgICAgICAgICAgICAudGhlbiggKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLmNpdHkgPSBvYmoubmFtZTtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdE9iai5jb3VudHJ5ID0gb2JqLnN5cy5jb3VudHJ5O1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLnRpbWVab25lID0gb2JqLnRpbWV6b25lO1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLnRpbWUgPSBvYmouZHQ7XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmouZmVlbHNMaWtlVGVtcEYgPSBvYmoubWFpbi5mZWVsc19saWtlO1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLndpbmREaXJlY3Rpb24gPSBvYmoud2luZC5kZWc7XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmoud2luZFNwZWVkSW1wID0gb2JqLndpbmQuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmouc3VucmlzZSA9IG9iai5zeXMuc3VucmlzZTtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdE9iai5zdW5zZXQgPSBvYmouc3lzLnN1bnNldDtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdE9iai5pY29uSWQgPSBvYmoud2VhdGhlclswXS5pY29uO1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLm1haW5UZW1wRiA9IG9iai5tYWluLnRlbXA7XG4gICAgICAgICAgICAgICAgICByZXN1bHRPYmoubWF4VGVtcEYgPSBvYmoubWFpbi50ZW1wX21heDtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdE9iai5taW5UZW1wRiA9IG9iai5tYWluLnRlbXBfbWluO1xuICAgICAgICAgICAgICAgICAgcmVzdWx0T2JqLnNreURlc2NyaXB0aW9uID0gb2JqLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdE9iai5lcnJvciA9IGUubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgcmV0dXJuIHJlc3VsdE9iajtcbn1cblxuXG5leHBvcnQge2FwaVBhcnNlZE9iaiwgZXh0cmFjdFJhd0RhdGF9OyIsIi8vIE1haW4gY3VycmVudCB3ZWF0aGVyXG5cbmNvbnN0IGRpc3BsYXlDdXJyZW50V2VhdGhlciA9ICh3ZWF0aGVyKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRXZWF0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGN1cnJlbnRXZWF0aGVyQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY3VycmVudF93ZWF0aGVyJyk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBMb2NhdGlvbiBjb250YWluZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBjb25zdCBsb2NhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsb2NhdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2xvY2F0aW9uX2NvbnRhaW5lcicpO1xuXG4gIGNvbnN0IGxvY2F0aW9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbG9jYXRpb25JY29uLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1tYXAtbWFya2VyLWFsdFwiPjwvaT4nO1xuICBsb2NhdGlvbkljb24uY2xhc3NMaXN0LmFkZCgnaWNvbl9zZWNvbmRhcnknKTtcblxuICBjb25zdCBsb2NhdGlvbkNpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxvY2F0aW9uQ2l0eS5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbl90ZXh0Jyk7XG4gIGxvY2F0aW9uQ2l0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXIuY2l0eX0sICR7d2VhdGhlci5jb3VudHJ5fWA7XG5cbiAgY29uc3QgbG9jYXRpb25TZXBhcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxvY2F0aW9uU2VwYXJhdG9yLmNsYXNzTGlzdC5hZGQoJ2xvY2F0aW9uX3RleHQnKTtcbiAgbG9jYXRpb25TZXBhcmF0b3IudGV4dENvbnRlbnQgPSAnfCc7XG5cbiAgY29uc3QgbG9jYXRpb25UaW1lWm9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbG9jYXRpb25UaW1lWm9uZS5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbl90ZXh0Jyk7XG4gIGxvY2F0aW9uVGltZVpvbmUudGV4dENvbnRlbnQgPSB3ZWF0aGVyLnRpbWVab25lO1xuXG4gIGxvY2F0aW9uQ29udGFpbmVyLmFwcGVuZChsb2NhdGlvbkljb24sbG9jYXRpb25DaXR5LCBsb2NhdGlvblNlcGFyYXRvciwgbG9jYXRpb25UaW1lWm9uZSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gVGltZSBDb250YWluZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBjb25zdCB0aW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRpbWVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd0aW1lX2NvbnRhaW5lcicpO1xuICB0aW1lQ29udGFpbmVyLnRleHRDb250ZW50ID0gd2VhdGhlci50aW1lO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFNlY29uZGFyeSBpbmZvIGNvbnRhaW5lciAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgY29uc3Qgc2Vjb25kYXJ5SW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzZWNvbmRhcnlJbmZvQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2Vjb25kYXJ5X2luZm9fY29udGFpbmVyJyk7XG5cbiAgLy8gZmVlbHMgTGlrZSB0ZW1wZXJhdHVyZSBpbmZvXG4gIGNvbnN0IGZlZWxzTGlrZUluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZmVlbHNMaWtlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZmVlbHNMaWtlVGV4dC5jbGFzc0xpc3QuYWRkKCdzZWNvbmRfaW5mb190ZXh0Jyk7XG4gIGZlZWxzTGlrZVRleHQudGV4dENvbnRlbnQgPSAnRmVlbHMgTGlrZTogJztcbiAgY29uc3QgZmVlbHNMaWtlVGVtcEYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGZlZWxzTGlrZVRlbXBGLmNsYXNzTGlzdC5hZGQoJ3NlY29uZF9pbmZvX3RleHQnKTtcbiAgZmVlbHNMaWtlVGVtcEYuc2V0QXR0cmlidXRlKCdpZCcsICdmZWVsc19saWtlX3RlbXBGJyk7XG4gIGZlZWxzTGlrZVRlbXBGLnRleHRDb250ZW50ID0gYCR7d2VhdGhlci5mZWVsc0xpa2VUZW1wRn0gwrBGIGA7XG4gIGNvbnN0IGZlZWxzTGlrZVRlbXBDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBmZWVsc0xpa2VUZW1wQy5jbGFzc0xpc3QuYWRkKCdzZWNvbmRfaW5mb190ZXh0Jyk7XG4gIGZlZWxzTGlrZVRlbXBDLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgZmVlbHNMaWtlVGVtcEMuc2V0QXR0cmlidXRlKCdpZCcsICdmZWVsc19saWtlX3RlbXBDJyk7XG4gIGZlZWxzTGlrZVRlbXBDLnRleHRDb250ZW50ID0gYCR7d2VhdGhlci5mZWVsc0xpa2VUZW1wQ30gwrBDYDtcbiAgZmVlbHNMaWtlSW5mby5hcHBlbmQoZmVlbHNMaWtlVGV4dCwgZmVlbHNMaWtlVGVtcEYsIGZlZWxzTGlrZVRlbXBDKTtcblxuICAvLyBXaW5kIGluZm9cbiAgY29uc3Qgd2luZEluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgd2luZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHdpbmRUZXh0LmNsYXNzTGlzdC5hZGQoJ3NlY29uZF9pbmZvX3RleHQnKTtcbiAgd2luZFRleHQudGV4dENvbnRlbnQgPSBgV2luZDogJHt3ZWF0aGVyLndpbmREaXJlY3Rpb259IGA7XG4gIGNvbnN0IHdpbmRTcGVlZEltcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgd2luZFNwZWVkSW1wLmNsYXNzTGlzdC5hZGQoJ3NlY29uZF9pbmZvX3RleHQnKTtcbiAgd2luZFNwZWVkSW1wLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2luZF9zcGVlZF9TcGVlZEltcGVyaWFsJyk7XG4gIHdpbmRTcGVlZEltcC50ZXh0Q29udGVudCA9IGAke3dlYXRoZXIud2luZFNwZWVkSW1wfSBtcGggYDtcbiAgY29uc3Qgd2luZFNwZWVkTSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgd2luZFNwZWVkTS5jbGFzc0xpc3QuYWRkKCdzZWNvbmRfaW5mb190ZXh0Jyk7XG4gIHdpbmRTcGVlZE0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB3aW5kU3BlZWRNLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2luZF9TcGVlZF9tZXRyaWMnKTtcbiAgd2luZFNwZWVkTS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXIud2luZFNwZWVkTWV0cmljfSBrbS9oYDtcbiAgd2luZEluZm8uYXBwZW5kKHdpbmRUZXh0LCB3aW5kU3BlZWRJbXAsIHdpbmRTcGVlZE0pO1xuXG4gIC8vU3VucmlzZSBpbmZvXG4gIGNvbnN0IHN1bnJpc2VJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHN1bnJpc2VUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBzdW5yaXNlVGV4dC5jbGFzc0xpc3QuYWRkKCdzZWNvbmRfaW5mb190ZXh0Jyk7XG4gIHN1bnJpc2VUZXh0LnRleHRDb250ZW50ID0gYFN1bnJpc2U6ICR7d2VhdGhlci5zdW5yaXNlfWA7XG4gIHN1bnJpc2VJbmZvLmFwcGVuZChzdW5yaXNlVGV4dCk7XG5cbiAgLy9zdW5zZXQgaW5mb1xuICBjb25zdCBzdW5zZXRJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHN1bnNldFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHN1bnNldFRleHQuY2xhc3NMaXN0LmFkZCgnc2Vjb25kX2luZm9fdGV4dCcpO1xuICBzdW5zZXRUZXh0LnRleHRDb250ZW50ID0gYHN1bnNldDogJHt3ZWF0aGVyLnN1bnNldH1gO1xuICBzdW5zZXRJbmZvLmFwcGVuZChzdW5zZXRUZXh0KTtcblxuICAvLyBhcHBlbmQgc2VuY29uZGFyeSBpbmZvIGNvbnRhaW5lclxuICBzZWNvbmRhcnlJbmZvQ29udGFpbmVyLmFwcGVuZChmZWVsc0xpa2VJbmZvLCB3aW5kSW5mbywgc3VucmlzZUluZm8sIHN1bnNldEluZm8pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU2t5IGltYWdlIEluZm8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBjb25zdCBza3lJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBza3lJbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGBza3lpbWcke3dlYXRoZXIuaWNvbklkfWApO1xuICBza3lJbWFnZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3NreV9pbWFnZScpO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQcmltYXJ5IEluZm8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGNvbnN0IHByaW1hcnlJbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByaW1hcnlJbmZvQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJpbWFyeV9pbmZvX2NvbnRhaW5lcicpO1xuXG4gIC8vIG1haW4gVGVtcGVyYXR1cmVcbiAgY29uc3QgbWFpblRlbXBXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IG1haW5UZW1wRiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtYWluVGVtcEYuY2xhc3NMaXN0LmFkZCgncHJpbWFyeV9pbmZvX3RleHQnKTtcbiAgbWFpblRlbXBGLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWFpbl90ZW1wX0YnKTtcbiAgbWFpblRlbXBGLnRleHRDb250ZW50ID0gYCR7d2VhdGhlci5tYWluVGVtcEZ9IMKwRmA7XG4gIGNvbnN0IG1haW5UZW1wQyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtYWluVGVtcEMuY2xhc3NMaXN0LmFkZCgncHJpbWFyeV9pbmZvX3RleHQnKTtcbiAgbWFpblRlbXBDLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgbWFpblRlbXBDLnNldEF0dHJpYnV0ZSgnaWQnLCAnbWFpbl90ZW1wX0MnKTtcbiAgbWFpblRlbXBDLnRleHRDb250ZW50ID0gYCR7d2VhdGhlci5tYWluVGVtcEN9IMKwQ2A7XG5cbiAgbWFpblRlbXBXcmFwcGVyLmFwcGVuZChtYWluVGVtcEYsIG1haW5UZW1wQyk7XG5cbiAgLy8gbWF4ICYgbWluIHRlbXBcbiAgY29uc3QgbWF4TWluVGVtcFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBjb25zdCBtYXhNaW5UZW1wRiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtYXhNaW5UZW1wRi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21heF9taW5fdGVtcF9GJyk7XG4gIGNvbnN0IG1heFRlbXBGID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1heFRlbXBGLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc21hbGxfdGV4dCcpO1xuICBtYXhUZW1wRi50ZXh0Q29udGVudCA9IGAke3dlYXRoZXIubWF4VGVtcEZ9wrBgO1xuICBjb25zdCBtaW5UZW1wRiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtaW5UZW1wRi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NtYWxsX3RleHQnKTtcbiAgbWluVGVtcEYudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyLm1pblRlbXBGfcKwYDtcbiAgbWF4TWluVGVtcEYuYXBwZW5kKG1heFRlbXBGLCBtaW5UZW1wRik7XG5cbiAgY29uc3QgbWF4TWluVGVtcEMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWF4TWluVGVtcEMuc2V0QXR0cmlidXRlKCdpZCcsICdtYXhfbWluX3RlbXBfQycpO1xuICBtYXhNaW5UZW1wQy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIGNvbnN0IG1heFRlbXBDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1heFRlbXBDLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc21hbGxfdGV4dCcpO1xuICBtYXhUZW1wQy50ZXh0Q29udGVudCA9IGAke3dlYXRoZXIubWF4VGVtcEN9wrBgO1xuICBjb25zdCBtaW5UZW1wQyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtaW5UZW1wQy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NtYWxsX3RleHQnKTtcbiAgbWluVGVtcEMudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyLm1pblRlbXBDfcKwYDtcbiAgbWF4TWluVGVtcEMuYXBwZW5kKG1heFRlbXBDLCBtaW5UZW1wQyk7XG5cbiAgbWF4TWluVGVtcFdyYXBwZXIuYXBwZW5kKG1heE1pblRlbXBGLCBtYXhNaW5UZW1wQyk7XG5cbiAgLy8gYXBwZW5kIHByaW1hcnkgaW5mbyBjb250YWluZXJcblxuICBwcmltYXJ5SW5mb0NvbnRhaW5lci5hcHBlbmQobWFpblRlbXBXcmFwcGVyLCBtYXhNaW5UZW1wV3JhcHBlcik7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gV2V0aGVyIERlc2NyaXB0aW9uIHRleHQgLS0tLS0tLS0tLS0tXG5cbiAgY29uc3Qgc2t5RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHNreURlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2Vjb25kX2luZm9fdGV4dCcpO1xuICBza3lEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHdlYXRoZXIuc2t5RGVzY3JpcHRpb247XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGFwcGVuZCBnbG9iYWwgZ3JpZCBjb250YWluZXIgLS0tLS0tLS0tLVxuXG4gIGN1cnJlbnRXZWF0aGVyQ29udGFpbmVyLmFwcGVuZChsb2NhdGlvbkNvbnRhaW5lciwgdGltZUNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlJbmZvQ29udGFpbmVyLCBza3lJbWFnZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeUluZm9Db250YWluZXIsIHNreURlc2NyaXB0aW9uKTtcblxuICByZXR1cm4gY3VycmVudFdlYXRoZXJDb250YWluZXI7XG59XG5cbi8vIGRpc3BsYXkgd2V0aGVyIHJlcXVlc3QgZm9ybVxuY29uc3QgZGlzcGxheVdlYXRoZXJSZXNxZXN0Rm9ybSA9ICgpID0+IHtcbiAgY29uc3Qgd2VhdGhlclJlcXVlc3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHdlYXRoZXJSZXF1ZXN0Rm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywnd2VhdGhlcl9yZXF1ZXN0X2Zvcm0nKTtcbiAgY29uc3QgcmVxdWVzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgcmVxdWVzdElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gIHJlcXVlc3RJbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXJfcmVxdWVzdF9pbnB1dCcpO1xuICByZXF1ZXN0SW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsICdUeXBlIGEgY2l0eSBuYW1lIGhlcmUhJyk7XG4gIGNvbnN0IHJlcXVlc3RTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgcmVxdWVzdFN1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXJfcmVxdWVzdF9zdWJtaXQnKTtcbiAgcmVxdWVzdFN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdHZXQgV2VhdGhlciBGb3JjYXN0ISdcbiAgd2VhdGhlclJlcXVlc3RGb3JtLmFwcGVuZChyZXF1ZXN0SW5wdXQsIHJlcXVlc3RTdWJtaXRCdXR0b24pO1xuXG4gIHJldHVybiB3ZWF0aGVyUmVxdWVzdEZvcm07XG59XG5cbi8vIGRpc3BsYXkgZXJyb3JcbmNvbnN0IGRpc3BsYXlFcnJvciA9IChlcnJvcikgPT4ge1xuICBjb25zdCBlcnJvckNhcmQgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVycm9yQ2FyZC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Vycm9yX2NhcmQnKTtcbiAgZXJyb3JDYXJkLnRleHRDb250ZW50ID0gZXJyb3IubWVzc2FnZTtcbiAgcmV0dXJuIGVycm9yQ2FyZDtcbn1cblxuXG4vLyBMb2FkaW5nIGJhcmUgd2hpbGUgd2FpdGluZyBmb3IgYXBpIHN1Y2Nlc3NcblxuY29uc3QgTG9hZGVyU3BpbmVyID0gKCkgPT4ge1xuICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbG9hZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnbG9hZGVyJyk7XG4gIGxvYWRlci50ZXh0Q29udGVudCA9ICdsb2FkaW5kIGRhdGEgZnJvbSBBcGkhJ1xuICByZXR1cm4gbG9hZGVyO1xufVxuXG5cblxuXG5cbmV4cG9ydCB7ZGlzcGxheUVycm9yLCBkaXNwbGF5V2VhdGhlclJlc3Flc3RGb3JtLCBMb2FkZXJTcGluZXIsIGRpc3BsYXlDdXJyZW50V2VhdGhlcn07IiwiLyogZXNsaW50IG5vLXVuZGVyc2NvcmUtZGFuZ2xlOiBbXCJlcnJvclwiLCB7IFwiYWxsb3dBZnRlclRoaXNcIjogdHJ1ZSB9XSAqL1xuLyogZXNsaW50IG5vLXVuZGVyc2NvcmUtZGFuZ2xlOiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wiX3RpdGxlXCIsIFwiX3Rhc2tzXCIsIFwiX2lkXCIgLCBcIl90YXNrQ291bnRlclwiICxcbiBcIl9kZXNjcmlwdGlvblwiLCBcIl9kdWVEYXRlXCIgLCBcIl9zdGF0dXNcIiAsIFwiX3ByaW9yaXR5XCIgLCBcIl9wcm9qSWRcIl0gfV0gKi9cbiBpbXBvcnQgeyBmcm9tVW5peFRpbWUgfSBmcm9tICdkYXRlLWZucydcbiBjbGFzcyBXZWF0aGVyIHtcbiAgY29uc3RydWN0b3IoYXBpT2JqKSB7XG4gICAgdGhpcy5fY2l0eSA9IGFwaU9iai5jaXR5O1xuICAgIHRoaXMuX2NvdW50cnkgPSBhcGlPYmouY291bnRyeTtcbiAgICB0aGlzLl90aW1lWm9uZSA9IGFwaU9iai50aW1lWm9uZTtcbiAgICB0aGlzLl90aW1lID0gYXBpT2JqLnRpbWU7XG4gICAgdGhpcy5fZmVlbHNMaWtlVGVtcEYgPSBhcGlPYmouZmVlbHNMaWtlVGVtcEY7XG4gICAgdGhpcy5fd2luZERpcmVjdGlvbiA9IGFwaU9iai53aW5kRGlyZWN0aW9uO1xuICAgIHRoaXMuX3dpbmRTcGVlZEltcCA9IGFwaU9iai53aW5kU3BlZWRJbXA7XG4gICAgdGhpcy5fc3VucmlzZSA9IGFwaU9iai5zdW5yaXNlO1xuICAgIHRoaXMuX3N1bnNldCA9IGFwaU9iai5zdW5zZXQ7XG4gICAgdGhpcy5faWNvbklkID0gYXBpT2JqLmljb25JZDtcbiAgICB0aGlzLl9tYWluVGVtcEYgPSBhcGlPYmoubWFpblRlbXBGO1xuICAgIHRoaXMuX21heFRlbXBGID0gYXBpT2JqLm1heFRlbXBGO1xuICAgIHRoaXMuX21pblRlbXBGID0gYXBpT2JqLm1pblRlbXBGO1xuICAgIHRoaXMuX3NreURlc2NyaXB0aW9uID0gYXBpT2JqLnNreURlc2NyaXB0aW9uO1xuICB9XG5cbiAgLy8gR2V0dGVyc1xuICBnZXQgY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2l0eTtcbiAgfVxuXG4gIGdldCBjb3VudHJ5KCkge1xuICAgIHJldHVybiB0aGlzLl9jb3VudHJ5O1xuICB9XG5cbiAgZ2V0IHRpbWVab25lKCkge1xuICAgIGNvbnN0IHRtSCA9IHRoaXMuX3RpbWVab25lIC8gMzYwMDtcbiAgICBsZXQgdG1aID0gYEdNVCR7dG1IfWA7XG4gICAgcmV0dXJuIHRtWjtcbiAgfVxuXG4gIGdldCB0aW1lKCkge1xuICAgIHJldHVybiBmcm9tVW5peFRpbWUodGhpcy5fdGltZSk7XG4gIH1cblxuICBnZXQgZmVlbHNMaWtlVGVtcEYoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5fZmVlbHNMaWtlVGVtcEYpO1xuICB9XG5cbiAgZ2V0IGZlZWxzTGlrZVRlbXBDKCkge1xuICAgIGNvbnN0IHRlbXBDID0gTWF0aC5mbG9vcigodGhpcy5fZmVlbHNMaWtlVGVtcEYgLSAzMikgKiA1LzkpO1xuICAgIHJldHVybiB0ZW1wQztcbiAgfVxuXG4gIGdldCB3aW5kRGlyZWN0aW9uKCkge1xuICAgIGNvbnN0IGRlZyA9IHBhcnNlSW50KHRoaXMuX3dpbmREaXJlY3Rpb24pO1xuICAgIGNvbnN0IGRlZ1RvQ2FyZGluYWxEaXZpc2lvbiA9IE1hdGgucm91bmQoZGVnIC8gMjIuNSk7XG4gICAgY29uc3QgY2FkcmFuTmFtZXNMaXN0ID0gW1wiTlwiLCBcIk5ORVwiLCBcIk5FXCIsIFwiRU5FXCIsIFwiRVwiLCBcIkVTRVwiLCBcIlNFXCIsIFwiU1NFXCIsIFwiU1wiLCBcIlNTV1wiLCBcIlNXXCIsIFwiV1NXXCIsIFwiV1wiLCBcIldOV1wiLCBcIk5XXCIsIFwiTk5XXCJdO1xuICAgIGNvbnN0IGNhcmRpbmFsID0gY2FkcmFuTmFtZXNMaXN0W2RlZ1RvQ2FyZGluYWxEaXZpc2lvbl07XG4gICAgcmV0dXJuIGNhcmRpbmFsO1xuICB9XG5cbiAgZ2V0IHdpbmRTcGVlZEltcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2luZFNwZWVkSW1wO1xuICB9XG5cbiAgZ2V0IHdpbmRTcGVlZE1ldHJpYygpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLl93aW5kU3BlZWRJbXAgKiAxLjYwOTM0KTtcbiAgfVxuXG4gIGdldCBtYWluVGVtcEYoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21haW5UZW1wRjtcbiAgfVxuXG4gIGdldCBtYXhUZW1wRigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4VGVtcEY7XG4gIH1cbiAgXG4gIGdldCBtaW5UZW1wRigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWluVGVtcEY7XG4gIH1cblxuICBnZXQgbWFpblRlbXBDKCkge1xuICAgIGNvbnN0IHRlbXBDID0gTWF0aC5mbG9vcigodGhpcy5fbWFpblRlbXBGIC0gMzIpICogNS85KTtcbiAgICByZXR1cm4gdGVtcEM7XG4gIH1cblxuICBnZXQgbWF4VGVtcEMoKSB7XG4gICAgY29uc3QgdGVtcEMgPSBNYXRoLmZsb29yKCh0aGlzLl9tYXhUZW1wRiAtIDMyKSAqIDUvOSk7XG4gICAgcmV0dXJuIHRlbXBDO1xuICB9XG4gIFxuICBnZXQgbWluVGVtcEMoKSB7XG4gICAgY29uc3QgdGVtcEMgPSBNYXRoLmZsb29yKCh0aGlzLl9taW5UZW1wRiAtIDMyKSAqIDUvOSk7XG4gICAgcmV0dXJuIHRlbXBDO1xuICB9XG5cbiAgZ2V0IHNreSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2t5O1xuICB9XG5cbiAgZ2V0IGljb25JZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWNvbklkO1xuICB9XG5cbiAgZ2V0IHdpbmRTcGVlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2luZFNwZWVkO1xuICB9XG5cbiAgZ2V0IHN1bnJpc2UoKSB7XG4gICAgcmV0dXJuIGZyb21Vbml4VGltZSh0aGlzLl9zdW5yaXNlKTtcbiAgfVxuXG4gIGdldCBzdW5zZXQoKSB7XG4gICAgcmV0dXJuIGZyb21Vbml4VGltZSh0aGlzLl9zdW5zZXQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYXRoZXI7IiwiaW1wb3J0IHRvRGF0ZSBmcm9tICcuLi90b0RhdGUvaW5kZXguanMnO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tICcuLi9fbGliL3RvSW50ZWdlci9pbmRleC5qcyc7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gJy4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzJztcbi8qKlxuICogQG5hbWUgZnJvbVVuaXhUaW1lXG4gKiBAY2F0ZWdvcnkgVGltZXN0YW1wIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENyZWF0ZSBhIGRhdGUgZnJvbSBhIFVuaXggdGltZXN0YW1wLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlIGEgZGF0ZSBmcm9tIGEgVW5peCB0aW1lc3RhbXAuXG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdW5peFRpbWUgLSB0aGUgZ2l2ZW4gVW5peCB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZGF0ZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENyZWF0ZSB0aGUgZGF0ZSAyOSBGZWJydWFyeSAyMDEyIDExOjQ1OjA1OlxuICogdmFyIHJlc3VsdCA9IGZyb21Vbml4VGltZSgxMzMwNTE1OTA1KVxuICogLy89PiBXZWQgRmViIDI5IDIwMTIgMTE6NDU6MDVcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmcm9tVW5peFRpbWUoZGlydHlVbml4VGltZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIHVuaXhUaW1lID0gdG9JbnRlZ2VyKGRpcnR5VW5peFRpbWUpO1xuICByZXR1cm4gdG9EYXRlKHVuaXhUaW1lICogMTAwMCk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9JbnRlZ2VyKGRpcnR5TnVtYmVyKSB7XG4gIGlmIChkaXJ0eU51bWJlciA9PT0gbnVsbCB8fCBkaXJ0eU51bWJlciA9PT0gdHJ1ZSB8fCBkaXJ0eU51bWJlciA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgdmFyIG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG5cbiAgcmV0dXJuIG51bWJlciA8IDAgPyBNYXRoLmNlaWwobnVtYmVyKSA6IE1hdGguZmxvb3IobnVtYmVyKTtcbn0iLCJpbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gJy4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzJztcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7IC8vIENsb25lIHRoZSBkYXRlXG5cbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgYXJndW1lbnQgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0LmlvL2ZqdWxlXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=