import { Schema, model } from 'mongoose';

//Adding Indexing on Device field is recommended for current setup
export const ReadingModel = () => {

    const ReadingSchema = new Schema({
        device: String,
        timestamp: Number,
        windspeed: { type: Number, default: 0 },
        winddirection: String,
        p1: Number,
        p25: Number,
        p10: Number
    }, { timestamps: true });

    return model('Reading', ReadingSchema);

}

// Wind Directions
// 0° — north wind (N)
// 22.5° — north-northeast wind (NNE)
// 45° — northeast wind (NE)
// 67.5° — east-northeast wind (ENE)
// 90°— east wind (E)
// 112.5° — east-southeast wind (ESE)
// 135° — southeast wind (SE)
// 157.5° — south-southeast wind (SSE)
// 180° — south wind (S)
// 202.5° — south-southwest wind (SSW)
// 225° — southwest wind (SW)
// 247.5° — west-southwest wind (WSW)
// 270° — west wind (W)
// 292.5° — west-northwest wind (WNW)
// 315° — northwest wind (NW)
// 337.5° — north-northwest wind (NNW)
// 360° — north wind (N)