"use strict";
exports.__esModule = true;
exports.readings = void 0;
var express = require("express");
var routes = express.Router({ mergeParams: true });
var getDeviceReadings_js_1 = require("./getDeviceReadings.js");
var bulkInsert_js_1 = require("./bulkInsert.js");
var readings = function (params) {
    routes.post('/', (0, bulkInsert_js_1.bulkInsert)(params));
    routes.get('/', (0, getDeviceReadings_js_1.getDeviceReadings)(params));
    return routes;
};
exports.readings = readings;
