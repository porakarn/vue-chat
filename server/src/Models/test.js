var mongoose = require('mongoose');

const { Schema } = mongoose;

var TestSchema = mongoose.Schema({


    name: String,
    subject: String

})



var Test = module.exports = mongoose.model('Test', TestSchema);