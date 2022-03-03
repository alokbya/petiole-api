import * as petiole from './petiole_model.mjs'
import express, { response } from 'express';

const PORT = 3001;

const app = express();

// middleware
app.use(express.json());

// endpoints
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/plants', (req, res) => {
    let filter = {};
    petiole.getPlant(filter, '', 0)
        .then(plants => {
            res.send(plants);
        })
        .catch(error => {
            console.error(error);
            res.status(404).json({ Error: 'Not found' });
        });
});

app.get('/plants/:_id', (req, res) => {
    const plantId = req.params._id;
    petiole.getPlantById(plantId)
        .then(plant => {
            if (plant !== null) {
                res.json(plant);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.post('/plants', (req, res) => {
    petiole.createPlant(req.body.name, req.body.lastWatered, req.body.notes)
        .then(plant => {
            res.status(201).json(plant);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});



// Listen for requests on port:PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});