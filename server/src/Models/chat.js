var mongoose = require('mongoose');

const { Schema } = mongoose;

var ChatSchema = mongoose.Schema({


    username: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    // _creator: { type: Schema.ObjectId, ref: 'User' },
    
    
    // _comments: [{ type: Schema.ObjectId, ref: 'Comment'}]
})



var Chat = module.exports = mongoose.model('Chat', ChatSchema);