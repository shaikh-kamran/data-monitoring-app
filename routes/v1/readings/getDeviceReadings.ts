import { list } from './model.js';

export const getDeviceReadings = ({ mongodb }) => {
    return async (req, res, next) => {

        try {

            const condition = { device: req.query.device };

            //Checking if time filter is passed from frontend, then apply it
            if (Number(req.query.starttime) || Number(req.query.endtime)) condition["timestamp"] = {};
            if (Number(req.query.starttime)) condition["timestamp"]["$gte"] = req.query.starttime;
            if (Number(req.query.endtime)) condition["timestamp"]["$lte"] = req.query.endtime;

            const data = await list(mongodb, condition);
            const p1data: any = [];
            const p25data: any = [];
            const p10data: any = [];
            data.forEach(element => {
                p1data.push({
                    timestamp: element['timestamp'],
                    datapoints: element['p1'],
                    device: element['device'],
                })
                p25data.push({
                    timestamp: element['timestamp'],
                    datapoints: element['p25'],
                    device: element['device'],
                })
                p10data.push({
                    timestamp: element['timestamp'],
                    datapoints: element['p10'],
                    device: element['device'],
                })
            });


            res.status(200).json({ p1data, p25data, p10data });

        } catch (err) {
            res.json(err);
        }

    }
}