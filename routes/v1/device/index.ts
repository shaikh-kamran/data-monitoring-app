import express from 'express';
const routes = express.Router({ mergeParams: true });
import { list } from './list.js';

export const device = (params) => {
    routes.get('/', list(params));
    return routes;
}