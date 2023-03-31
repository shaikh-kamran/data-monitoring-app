"use strict";
exports.__esModule = true;
exports.v1Routes = void 0;
var express = require("express");
var routes = express.Router({ mergeParams: true });
var index_js_1 = require("./readings/index.js");
var index_js_2 = require("./device/index.js");
var v1Routes = function (params) {
    routes.use('/readings', (0, index_js_1.readings)(params));
    routes.use('/device', (0, index_js_2.device)(params));
    return routes;
};
exports.v1Routes = v1Routes;
