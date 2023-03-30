/**
 * Add Reading to Mongodb Table
 * @param mongodb - mongodb connection ( this can be imported directly as well )
 * @param newreading - data of new reading
 * @returns response of mongodb
 */
export const add = async (mongodb, newreading) => {
    try {
        const reading = new mongodb.models.reading(newreading);
        return await reading.save();
    } catch (err) {
        return err;
    }
}

/**
 * Update a document in mongodb collection based on a condition
 * @param mongodb - mongodb connection ( this can be imported directly as well )
 * @param condition - condition on which documents will be updated
 * @param reading - updated values
 * @returns Mongodb response or error
 */
export const update = async (mongodb, condition, reading) => {
    try {
        return await mongodb.models.reading.updateOne(condition, reading)
    } catch (err) {
        return err;
    }
}

/**
 * List all documents of mongodb collection based on a condition
 * @param mongodb - mongodb connection ( this can be imported directly as well )
 * @param condition - condition on which documents will be fetched
 * @returns Mongodb response or error
 */
export const list = async (mongodb, condition) => {
    try {
        return await mongodb.models.reading.find(condition);
    } catch (err) {
        return err;
    }
}

/**
 * Fetch all disctinct value of a columns passed
 * @param mongodb - mongodb connection ( this can be imported directly as well )
 * @param column - column which will be fetched
 * @returns Mongodb response or error
 */
export const getDistinct = async (mongodb, column) => {
    try {
        return await mongodb.models.reading.distinct(column);
    } catch (err) {
        return err;
    }
}

/**
 * Delete a document based on a condition
 * @param mongodb - mongodb connection ( this can be imported directly as well )
 * @param condition - condition on which document will be removed
 * @returns Mongodb response or error
 */
export const deleteReading = async (mongodb, condition) => {
    try {
        return await mongodb.models.reading.remove(condition)
    } catch (err) {
        return err;
    }
}