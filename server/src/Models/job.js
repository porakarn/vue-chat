var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const { Schema } = mongoose;

var JobSchema = mongoose.Schema({
  
 job_id: {
        type: String,
        index: true,
    },
    
    subject: { type: String, required: true},
    gradeDetail: { type: String, required: true },
    phone: { type: String, required: true },
    school: { type: String, required: true },
    grade: { type: String, required: true },
    location: { type: String },
    day: { type: String },
    time: { type: String },
    extraDetail: { type: String },
    
    _creator: {
         type: Schema.ObjectId,
         ref: 'User'
     },
    tuitionFee  : { type: Number },
    suggestionFee: {
        type: Number
    },
    // status : { type: Boolean , default : false },
    
        // timestamps: true
    







});
JobSchema.plugin(autoIncrement.plugin, 'Job');
JobSchema.plugin(autoIncrement.plugin, {
    model: 'Job',
    field: 'job_id',
    startAt: 1000,
    incrementBy: 1
});

var Job = module.exports = mongoose.model('Job', JobSchema);