import express from 'express';
const routes = express.Router({ mergeParams: true });
import { getDeviceReadings } from './getDeviceReadings.js';
import { bulkInsert } from './bulkInsert.js';

export const readings = (params) => {
    routes.post('/', bulkInsert(params));
    routes.get('/', getDeviceReadings(params));
    return routes;
}