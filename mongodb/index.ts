import { connect } from 'mongoose';
const mongourl = "mongodb://kamran:l2pt0p@127.0.0.1:5678/praanio";
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