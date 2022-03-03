import mongoose from 'mongoose';

// establish connection
mongoose.connect(
    "mongodb://localhost:27017/petiole_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// connect to db
const db = mongoose.connection;

// the "open" event is called when the db connection is successful
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose.")
});

/*
** Schemas
*/

// Plant
// name: name of plant
// lastWatered: date that plant was last watered
// notes: any additional notes for this plant
// location: where the plant lives
// garden: string identifier of the garden this plant lives within
const PlantSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastWatered: { type: Date, required: false },
    notes: { type: String, required: false },
    location: { type: string, required: true },
    garden: { type: string, required: true }
});

// Garden
// name: name of garden
// plants: list of plants in garden
// gardener: list of gardeners (users) who own this garden
const GardenSchema = mongoose.Schema({
    name: { type: String, required: true },
    plants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],
    gardener: [{ type: String, required: true }]
});

// User
// name: name of user
// gardens: list of gardens owned by this user
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    gardens: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Garden'
        }
    ] 
});

/*
** Models
*/

const Plant = mongoose.model("Plant", PlantSchema);
const Garden = mongoose.model("Garden", GardenSchema);
const User = mongoose.model("User", UserSchema);

/*
** Methods
*/

// name: string
// lastWatered: date
// notes: string
const createPlant = async (name, lastWatered, notes) => {
    const plant = new Plant({name: name, lastWatered: lastWatered, notes: notes});
    return plant.save();
}

// Get plant by id
const getPlantById = (_id) => {
    const query = Plant.findById(_id);
    return query.exec();
}

// Get plant based on input filter params
const getPlant = async (filter, projection, limit) => {
    const query = Plant.find();
    if (Object.keys(filter).length > 0) {
        query.and(filter);
    }
    return query.exec();
}

// Update plant
const updatePlant = async (conditions, update, options) => {
    return await Plant.findOneAndUpdate(conditions, update, options);
}

// Delete plant by id
const deletePlantById = async (_id) => {
    return await Plant.deleteOne({_id: _id});
}

// Delete plant(s) by various criteria
const deletePlants = async (conditions) => {
    return await Plant.deleteMany(conditions);
}

//
export {createPlant, getPlantById, getPlant, updatePlant, deletePlantById, deletePlants};