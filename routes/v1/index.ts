import * as express from 'express';
const routes = express.Router({ mergeParams: true });
import { readings } from './readings/index.js';
import { device } from './device/index.js';

export const v1Routes = (params) => {
    routes.use('/readings', readings(params));
    routes.use('/device', device(params));
    return routes;
}