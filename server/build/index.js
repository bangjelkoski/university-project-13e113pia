/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var method_override__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! method-override */ \"method-override\");\n/* harmony import */ var method_override__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(method_override__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! debug */ \"debug\");\n/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! express-validation */ \"express-validation\");\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(express_validation__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _classes_APIClientError__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/classes/APIClientError */ \"./src/classes/APIClientError.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes */ \"./src/routes/index.js\");\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./database */ \"./src/database/index.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nconst log = debug__WEBPACK_IMPORTED_MODULE_4___default()('app');\n\n/**\n * App Middleware\n */\napp.use(cors__WEBPACK_IMPORTED_MODULE_2___default()());\napp.use(method_override__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.urlencoded({ extended: false }));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.json());\napp.use(compression__WEBPACK_IMPORTED_MODULE_1___default()());\napp.use(helmet__WEBPACK_IMPORTED_MODULE_6___default()());\n\n/**\n * Database Setup\n */\n_database__WEBPACK_IMPORTED_MODULE_10__[\"default\"].sequelize\n  .authenticate()\n  .then(() => {\n    log('Connected to the database');\n  })\n  .catch((err) => {\n    log('Unable to connect to the database: ', err);\n  });\n\n_database__WEBPACK_IMPORTED_MODULE_10__[\"default\"].sequelize.sync({ force: false });\n\n/**\n * API Routes\n */\napp.use(_routes__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\n\n/**\n * Validation Errors\n */\napp.use((err, req, res, next) => {\n  if (err instanceof express_validation__WEBPACK_IMPORTED_MODULE_7__[\"ValidationError\"]) {\n    return res.status(err.status).json(err);\n  }\n\n  return next(err);\n});\n\n/**\n * API Errors\n */\napp.use((err, req, res, next) => {\n  if (err instanceof _classes_APIClientError__WEBPACK_IMPORTED_MODULE_8__[\"default\"]) {\n    return res.status(err.status).json(err.toJson());\n  }\n\n  return next(err);\n});\n\n/**\n * Unhandled Errors\n */\nprocess.on('unhandledRejection', (error) => {\n  console.error('Uncaught Error', error);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/classes/APIClientError.js":
/*!***************************************!*\
  !*** ./src/classes/APIClientError.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return APIClientError; });\nclass APIClientError {\n  //\n}\n\n\n//# sourceURL=webpack:///./src/classes/APIClientError.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst config = {\n  PORT: \"3000\" || false,\n\n  DB_DIALECT: \"mysql\" || false,\n  DB_HOST: \"localhost\",\n  DB_PORT: \"3306\",\n  DB_NAME: \"pia\",\n  DB_USER: \"root\",\n  DB_PASSWORD: \"\",\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\n\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/database/index.js":
/*!*******************************!*\
  !*** ./src/database/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/config */ \"./src/config.js\");\n\n\n\nconst { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } = _config__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\nconst sequelize = new sequelize__WEBPACK_IMPORTED_MODULE_0___default.a(DB_NAME, DB_USER, DB_PASSWORD, {\n  host: DB_HOST,\n  dialect: DB_DIALECT,\n  port: DB_PORT,\n  // eslint-disable-next-line no-console\n  logging: console.log,\n  timezone: '+02:00',\n});\n\nconst db = {\n  sequelize,\n  Sequelize: (sequelize__WEBPACK_IMPORTED_MODULE_0___default()),\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (db);\n\n\n//# sourceURL=webpack:///./src/database/index.js?");

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-status */ \"http-status\");\n/* harmony import */ var http_status__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_status__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst router = Object(express__WEBPACK_IMPORTED_MODULE_1__[\"Router\"])();\n\nrouter.get('/', (req, res) => {\n  res.json({\n    statusCode: http_status__WEBPACK_IMPORTED_MODULE_0___default.a.OK,\n    message: 'Welcome to 13e113pia project API',\n  });\n});\n\nrouter.all('*', async (req, res) => {\n  res.json({\n    message: http_status__WEBPACK_IMPORTED_MODULE_0___default.a[404],\n    statusCode: http_status__WEBPACK_IMPORTED_MODULE_0___default.a.NOT_FOUND,\n  });\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n\n//# sourceURL=webpack:///./src/routes/index.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/app */ \"./src/app.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/config */ \"./src/config.js\");\n\n\n\n\nconst { PORT } = _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n\nconst onError = (error) => {\n  if (error.syscall !== 'listen') {\n    throw error;\n  }\n\n  switch (error.code) {\n    case 'EACCES':\n      console.error(`Port ${PORT} requires elevated privileges`);\n      process.exit(1);\n      break;\n    case 'EADDRINUSE':\n      console.error(`Port ${PORT} is already in use`);\n      process.exit(1);\n      break;\n    default:\n      throw error;\n  }\n};\n\nconst server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\nserver.listen(PORT, () => {\n  console.log('==========**********==========');\n  console.log('========SERVER RUNNING========');\n  console.log(`==========PORT ${PORT}===========`);\n  console.log('==========**********==========');\n});\nserver.on('error', onError);\n\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-validation":
/*!*************************************!*\
  !*** external "express-validation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validation\");\n\n//# sourceURL=webpack:///external_%22express-validation%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "http-status":
/*!******************************!*\
  !*** external "http-status" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-status\");\n\n//# sourceURL=webpack:///external_%22http-status%22?");

/***/ }),

/***/ "method-override":
/*!**********************************!*\
  !*** external "method-override" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"method-override\");\n\n//# sourceURL=webpack:///external_%22method-override%22?");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sequelize\");\n\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ })

/******/ });