var mongoose = require('mongoose');

const { Schema } = mongoose;

var RoomSchema = mongoose.Schema({

 tutorname: String ,
     studentId: String,
     latest: String,
     time: String,
     oppname: String,
     pic: String,
     pic2: String


  
})



var Room = module.exports = mongoose.model('Room', RoomSchema);