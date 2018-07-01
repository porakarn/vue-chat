var mongoose = require('mongoose');

const { Schema } = mongoose;

var EnrollSchema = mongoose.Schema({

    subject: { type: String, required: true},
    class: { type: String, required: true },
    location: { type: String },
    _creator: { type: Schema.ObjectId, ref: 'User' },
    day: { type: String },
    time: { type: String },
    hour: { type: String },
    wage : { type: String },
    fee  : { type: String },
    status : { type: Boolean , default : false },
    code : { type: String},
    {
        timestamps: true
    }



})



var Enroll = module.exports = mongoose.model('Enroll', EnrollSchema);