import { add } from './model.js';

export const bulkInsert = ({ mongodb }) => {
    return async (req, res, next) => {

        try {
            const newreadings = req.body.readings;
            console.log("newreadings", newreadings);

            const response = await add(mongodb, newreadings)

            // var bulkreadings = await mongodb.models.reading.initializeOrderedBulkOp();

            // newreadings.forEach(reading => { bulkreadings.insert(reading) });

            // const response = await bulkreadings.execute();
            res.json(response);

        } catch (err) {
            res.json(err);
        }

    }
}