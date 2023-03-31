import express from 'express';
import { Express } from 'express';
import { v1Routes } from './routes/v1/index.js';
//Middleware to auth all APIs
import { middleware } from './middleware';
import { mongodb } from './mongodb/index.js';
import cors from 'cors';

const myapp = async () => {

    try {

        //Create a MongoDB connection
        const mongodbInstance = await mongodb();

        const app: Express = express();
        app.use(express.json());
        app.use(cors({ origin: 'http://localhost:5000' }));

        //Serving Frontend static files
        app.use(express.static('dist'));

        // Use this one to authenticate APIs through JWT
        // Not using it now as frontend is not authenticated
        // app.use('/', middleware(), v1Routes({ mongodb }));

        app.use('/api/', v1Routes({ mongodb: mongodbInstance }));

        app.listen(5000, () => {
            console.log("We are listening http server on 5000");
        });

    } catch (err) {
        console.log(err);
    }
}

myapp();
