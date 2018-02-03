var mongoose = require('mongoose');

// Project Schema
var JobSchema = mongoose.Schema({
    job_id: {
        type: String,
        index: true,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
    },
    student: {
        student_name: {
            type: String,
            required: true
        },
        student_nickname: {
            type: String
        },
        student_phone: {
            type: String,
            required: true
        },
        student_line: {
            type: String
        },
        student_gender: {
            type: String
        },
        student_grade: {
            type: String
        },
        student_gradeDetail:{
            type: String
        },
        student_number: {
            type: Number,
        },
        student_school: {
            type: String
        },
        student_knowledge: {
            type: String 
        }
    },
    tutor: {
        tutor_gender: {
            type: String
        },
        tutor_detail: {
            type: String
        }
    },
    location: {
        type: String
    },
    e6: {
        type: String
    },
    time: {
        type: String
    },
    hour: {
        type: Number
    },
    tuitionFee: {
        type: Number
    },
    suggestionFee: {
        type: Number
    },
    status: {
        type: Boolean
    }
});

var Job = module.exports = mongoose.model('Job', JobSchema);