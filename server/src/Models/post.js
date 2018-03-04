var mongoose = require('mongoose');

const { Schema } = mongoose;

var PostSchema = mongoose.Schema({

  
    title: { type: String, required: true },
    link: String,
    text: String,
    isDeleted: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now},
    _creator: { type: Schema.ObjectId, ref: 'User'},
    productImage: String,
    productImage2: String,
    // _comments: [{ type: Schema.ObjectId, ref: 'Comment'}]
})



var Post = module.exports = mongoose.model('Post', PostSchema);