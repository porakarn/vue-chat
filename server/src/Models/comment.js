var mongoose = require('mongoose');

const { Schema } = mongoose;

var CommentSchema = mongoose.Schema({

    text: { type: String, required: true},
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    _creator: { type: Schema.ObjectId, ref: 'User' },
    _post: { type: Schema.ObjectId, ref: 'Post'}
})



var Comment = module.exports = mongoose.model('Comment', CommentSchema);