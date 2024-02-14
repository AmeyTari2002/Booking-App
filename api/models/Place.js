
const mongoose = require('mongoose')
const {Schema} = mongoose;

const placeSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId , ref:'User', required: true},
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: { type: [String], required: true }, // Updated line for the 'photos' field
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: { type: Number, required: true },
    checkOut: { type: Number, required: true },
    maxGuest: { type: Number, required: true },
    price: { type: Number, required: true }
})

const PlaceModel = mongoose.model('Place',placeSchema)


module.exports = PlaceModel;
