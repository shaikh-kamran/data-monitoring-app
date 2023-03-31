"use strict";
exports.__esModule = true;
exports.device = void 0;
var express = require("express");
var routes = express.Router({ mergeParams: true });
var list_js_1 = require("./list.js");
var device = function (params) {
    routes.get('/', (0, list_js_1.list)(params));
    return routes;
};
exports.device = device;
