const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true
    },

    contactEmail: {
        type: String,
        required: true
    },

    contactPhone: {
        type: Number,
        required: true
    },

    contactTextArea: {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    }
})

const Property = mongoose.model('Property', PropertySchema, 'property')

module.exports = Property