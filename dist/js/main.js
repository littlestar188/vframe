/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 8:
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: F:/wamp/www/vframe/js/index.js: Unexpected token (76:65)\n\n\u001b[0m \u001b[90m 74 | \u001b[39m\t\t\t\t  \u001b[33m+\u001b[39m\u001b[32m'</i> Home <span class=\"fa fa-chevron-down\"></span></a>'\u001b[39m\n \u001b[90m 75 | \u001b[39m\t\t          \u001b[33m+\u001b[39m\u001b[32m'<ul class=\"nav child_menu\" style=\"display: block;\">'\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 76 | \u001b[39m\t\t           \u001b[33m+\u001b[39m \u001b[32m'<li class=\"current-page\"><a href=\"index.html\">'\u001b[39m\u001b[33m+\u001b[39m{{first}}\u001b[33m+\u001b[39m\u001b[32m'</a></li>'\u001b[39m\n \u001b[90m    | \u001b[39m\t\t                                                               \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 77 | \u001b[39m\t\t           \u001b[33m+\u001b[39m \u001b[32m'<li><a href=\"index2.html\">'\u001b[39m\u001b[33m+\u001b[39m{{second}}\u001b[33m+\u001b[39m\u001b[32m'</a></li>'\u001b[39m\n \u001b[90m 78 | \u001b[39m\t\t          \u001b[33m+\u001b[39m\u001b[32m'</ul>'\u001b[39m\n \u001b[90m 79 | \u001b[39m\t\t        \u001b[33m+\u001b[39m\u001b[32m'</li>'\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ })

/******/ });