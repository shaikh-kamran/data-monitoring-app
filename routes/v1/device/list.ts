import { getDistinct } from '../readings/model.js';

export const list = ({ mongodb }) => {
    return async (req, res, next) => {
        try {
            //Get list of all distinct devices
            //Devices can be maintained in saperate table
            const data = await getDistinct(mongodb, 'device');
            res.json({ data });
        } catch (err) {
            res.json(err);
        }
    }
}