
var express = require('express');
var router = express.Router();
var multer = require('multer');


var Job = require('../Models/job');
var User = require('../Models/index');
var Post = require('../Models/post');
var Comment = require('../Models/comment');
var Test = require('../Models/test');
var Room = require('../Models/room');
var Tutor = require('../Models/tutor');

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



router.get('/adminroom', function (req, res) {
    Room.find({}, function (err, allTests) {
        if (err) {
            res.send(err)
        } else {
            res.json(allTests)
        }

    })
})

router.post('/adminroom', function (req, res) {
    const new_room = new Room(req.body)


    new_room.save().then((newJob) => {
        res.json(newJob)

    }).catch((err) => {
        res.send(err)
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
//    const new_job = new Job(req.body)

     const {
         
         subject,
         gradeDetail,
         phone,
         school,
         grade,
         location,
         day,
         time,
         extraDetail,
         userId,         
         tuitionFee,
         suggestionFee,
     } = req.body

     const job = new Job({

          subject,
          gradeDetail,
          phone,
          school,
          grade,
          location,
          day,
          time,
          extraDetail,
          _creator: userId,
          tuitionFee,
          suggestionFee,

     })


   job.save().then((newJob)=>{
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


router.post('/posts', function (req, res) {
    const {
         title,
        text,
        link,
        userId,
        productImage,
        productImage2,
        } = req.body

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




router.get('/tutor/profile/:username', function(req,res){
Tutor.findOne({ username : req.params.username  }).then((users) => {
        res.json(users)
    }).catch((err) => {
        res.send(err)
    })

})



router.get('/tutor/profile/:id', function(req,res){
Tutor.findOne({_creator : req.params.id  }).then((users) => {
        res.json(users)
    }).catch((err) => {
        res.send(err)
    })

})


router.post('/tutor/profile/:id', function (req, res) {

var query = { _creator : req.params.id  },
    update = {
       username : req.body.username, 
       phone : req.body.phone,
       gender : req.body.gender,
       subject : req.body.subject,
       education : req.body.education,
       profile : req.body.profile,
       _creator : req.body.userId,



    },
    options = {
        upsert: true
    };

// Find the document
Tutor.findOneAndUpdate(query, update, options, function (error, result) {
    if (!error) {
        // If the document doesn't exist
        if (!result) {
            // Create it
            result = new Tutor();
        }
        // Save the document
        // result.save(function (error) {
        //     if (!error) {
        //         // Do something with the document
        //     } else {
        //         throw error;
        //     }
        // });
    }
});





   



 

})


// router.post('/posts', function (req, res, next) {
//     const {
//         title,
//         text,
//         link,
//         userId,
//         productImage,
//         productImage2,
//     } = req.body

//     // router.post('/posts', upload.single('productImage') ,function(req,res,next){
//     //     const {
//     //          title, 
//     //          text, 
//     //          link, 
//     //          userId,
//     //         productImage,
//     //         } = req.body


//     const post = new Post({
//         title,
//         text,
//         link,
//         _creator: userId,
//         productImage,
//         productImage2,

//     })

//     post.save().then((newPost) => {
//         res.status(200).json({
//             success: true,
//             data: newPost,
//         }).catch((err) => {
//             res.status(200).json({
//                 message: err,
//             })
//         })
//     })

// })

router.get('/posts', function(req,res){
     Post.find({}).populate({
         path: '_creator'

        
     }).then((posts)=>{
      res.json(posts)
      }).catch((err)=> {
      res.send(err)
      })
      })

      router.get('/jobs/:id', function (req, res) {
          Job.findById(req.params.id).populate({
              path: '_creator'

          }).then((posts) => {
              res.json(posts)
          }).catch((err) => {
              res.send(err)
          })

      })

        router.get('/tutor/:id', function (req, res) {
            Tutor.findById(req.params.id).populate({
                path: '_creator'

            }).then((posts) => {
                res.json(posts)
            }).catch((err) => {
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
 
router.get('/user/:username', function (req, res) {
    User.findOne({ username: req.params.username}).then((users) => {
        res.json(users)
    }).catch((err) => {
        res.send(err)
    })

})
// Model.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)

router.patch('/user/:username', function (req, res) {
    User.findOne({ username: req.params.username}).update(req.body).then((users) => {
        res.json(users)
    }).catch((err) => {
        res.send(err)
    })

})

// findOne({ username: req.body.name }
router.get('/pic/:username', function (req, res) {
    User.findOne({ username: req.params.username}).then((users) => {
        res.json(users)
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




// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.



module.exports = router;

