var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({


  username: {
    type: String,
    required: true
  },
   email: {
     type: String
   },
   picture: {
      type: String
    },
  password:{
    type: String,
    // required: true,
    minlength: [6, 'Password must be 8 characters or more']
  },
    approve: {
      type: Boolean,
      default: false
    },


}, {
  timestamps: true
}


);


/**
 * Password hash middleware.
 */

// UserSchema.pre('save', function save(next){
//   const user = this;
//   if(!user.isModified('password')){ return next();}
//   bcrypt.genSalt(10, (err, salt)=>{
//      if(err){ return next(err);}
//      bcrypt.hash(user.password, salt, null,(err,hash)=>{
//        if(err){return next(err);}
//        user.password = hash;
//        next();
//      })
//   })

//   })

var User = module.exports = mongoose.model('User', UserSchema);