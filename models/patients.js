const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    phone: {
        type: Number,
        minLength: [10, "Invalid Mobile and 10 numbers"],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    reports: [{
        status: {
            type: String,
            required: true,
            enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"]
        },
        date: {
            type: Date,
            required: true
        }
    }],
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
}, {
    timestamps: true
});


const Patient = new mongoose.model('Patient', patientSchema);

module.exports = Patient;