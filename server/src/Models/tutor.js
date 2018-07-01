var mongoose = require('mongoose');

const { Schema } = mongoose;

var TutorSchema = mongoose.Schema({

    username: String , 
    phone: { type: String },
    gender: String,
    subject: String,
    education: { type: String },
    profile: { type: String },
    _creator: { type: Schema.ObjectId, ref: 'User'},
   
    // _comments: [{ type: Schema.ObjectId, ref: 'Comment'}]
})



var Tutor = module.exports = mongoose.model('Tutor', TutorSchema);