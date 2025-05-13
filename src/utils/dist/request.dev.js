"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src/utils/request.js
var apiClient = _axios.default.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:1512",
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(function (config) {
  var token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = "Bearer ".concat(token);
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});
var _default = apiClient;
exports.default = _default;
//# sourceMappingURL=request.dev.js.map
