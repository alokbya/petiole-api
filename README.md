# Petiole API

## Models
### Plant
```JSON
{
    name: string,
    lastWatered: date,
    notes: string,
    location: string,
    garden: string      // string representation of garden _id
}
```
### Garden
```JSON
{
    name: string
    plants: [mongoose.Schema.Types.ObjectId <PLANT>],   // list of references to plant documents
    gardener: [string]  // list of user ids
}
```
### User
```JSON
{
    name: string
    gardens: [mongoose.Schema.Types.ObjectId <GARDEN>], // list of gardens
}
```