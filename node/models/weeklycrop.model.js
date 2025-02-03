// Path: node/models/weeklycrop.model.js
const mongoose = require('mongoose');

const WeeklyCropSchema = new mongoose.Schema({
    cropName: { type: String, required: true },
    height: { type: Number, required: true },
    growthStage: { type: String, required: true },
    date: { type: Date, default: Date.now },
    // Add other fields specific to weekly crop data
});

module.exports = mongoose.model('WeeklyCrop', WeeklyCropSchema);
