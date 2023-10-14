const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true,'Please Enter Your Name']
    },
    password: {
        type: String,
        required:[true,'Please Enter Your Password'],
        minLength:[6,"Password should be 6 Charactors"],
        unique: true
    }
},{
    timestamps:true
});

const Doctor = new mongoose.model('Doctor',doctorSchema);

module.exports = Doctor;