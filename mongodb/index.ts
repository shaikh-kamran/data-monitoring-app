import { connect } from 'mongoose';
const mongourl = "mongodb://localhost:27017/praanio";
import { ReadingModel } from './reading.js';

export const mongodb = async () => {
    try {

        const connection = await connect(mongourl);
        console.log("Connection established");

        const models = {};
        models['reading'] = ReadingModel();
        return { connection, models };

    } catch (err) {
        console.log("Err", err);
    }
}