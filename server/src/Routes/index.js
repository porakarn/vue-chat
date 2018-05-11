
var express = require('express');
var router = express.Router();
var multer = require('multer');


var Job = require('../Models/job');
var User = require('../Models/index');
var Post = require('../Models/post');
var Comment = require('../Models/comment');
var Test = require('../Models/test');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });





router.post('/test2', function (req, res) {
    var newTest = new Test(req.body);

    newTest.save().then((newTest) => {
        res.json(newTest)

    }).catch((err) => {
        res.send(err)
    })
})


router.get('/tests', function (req, res) {
    Test.find({}, function (err, allTests) {
        if (err) {
            res.send(err)
        } else {
            res.json(allTests)
        }

    })
})







// router.get('/status', (req, res) => {
//     res.send({
//         messsage: '{3*8}'

//     })
// })


// router.get('/status2', (req, res) => {
//     res.send({
//         messsage: 'Hellossss world'

//     })
// })
// create_course(req, res){
//     let new_course = new Course(req.body)


//     new_course.save(function (err, course) {

//         if (err) {
//             res.send(err);
//         } else {
//             res.json(course);
//         }
//     });
// },

router.post('/jobs', function(req,res){
   const new_job = new Job(req.body)


   new_job.save().then((newJob)=>{
        res.json(newJob)

   }).catch((err)=>{
       res.send(err)
   })
})


router.get('/jobs', function(req,res){
    Job.find({}, function(err,alljobs){
        if (err) {
            res.send(err)  
        } else {
            res.json(alljobs)
        }

    })
})




// router.post('/signup', function (req, res) {
     
//     const {username, password } = req.body


//     const user = new User({
//         username,
//         password

//     }) 
//      user.save().then((newUser) => {
//          res.status(200).json({
//          success: true,
//          data: newUser,
        
//      }).catch((err)=>{
//          res.status(500).json({
//              message: err,
//          })
//      })
// })

// })

// router.get('/signup', function(req, res){
//   User.find({})

// })

// title
// link
// text
// creator


router.post('/posts', function (req, res, next) {
    const {
         title,
        text,
        link,
        userId,
        productImage,
        productImage2,
        } = req.body

// router.post('/posts', upload.single('productImage') ,function(req,res,next){
//     const {
//          title, 
//          text, 
//          link, 
//          userId,
//         productImage,
//         } = req.body


const post = new Post({
    title,
    text,
    link,
    _creator: userId,
    productImage,
    productImage2,

})

post.save().then((newPost) =>{
   res.status(200).json({
        success: true,
        data: newPost,
    }).catch((err)=>{
     res.status(200).json({
            message:err,
        })
    })
})

})

router.get('/posts', function(req,res){
     Post.find({}).populate({
         path: '_creator'
        
     }).then((posts)=>{
      res.json(posts)
      }).catch((err)=> {
      res.send(err)
      })
      })

     

router.get('/posts/:id', function (req, res) {
    Post.findById(req.params.id).populate({
        path: '_creator'
        
    }).then((posts) => {
        res.json(posts)
    }).catch((err) => {
        res.send(err)
    })

})
 


router.post('/comment', function(req,res){
    const { text , userId , postId } = req.body


const comment = new Comment({
          text,
          _creator: userId,
          _post : postId,

})

comment.save().then((newComment)=>{
    Post.findByIdAndUpdate(
        postId,
        { $push: { '_comments' : newComment}}
    ).then((existingPost)=>{
        res.status(200).json({
            success: true,
            data: newComment,
            existingPost,
        })
    }).catch((err)=>{
        res.status(500).json({
            message: err,
        })
    }).catch((err)=>{
        res.status(500).json({
            message: err,
        })
    } )

})

})


app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


module.exports = router;

