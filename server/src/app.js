const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const app = express()
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
var passport = require('passport');
var autoIncrement = require('mongoose-auto-increment');



app.use(morgan('combined'))

var db = mongoose.connection;
autoIncrement.initialize(db);


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors())

const index = require('./Routes/index');
var auth = require('./Routes/auth');

require('./config/passport')(passport);


app.get('/', function(req,res){
    res.send('tesxdft jaaa')
})



//   message: this.course.message,
//       handle: this.$store.state.user.username,
//       time: new Date().getHours() + ':' + new Date().getMinutes()
//   email: this.$store.state.user.email

// app.post('/send', (req, res) => {
//     const output = `
//     <p>You have a new message</p>
//     <ul>  
//       <li>Name: ${req.body.handle}</li>
//       <li>Message: ${req.body.message}</li>
//       <li>Time: ${req.body.time}</li>
//     </ul>
//     <h3>Message</h3>
//   `;

//   const email3 = req.body.email


// // var transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //         user: 'youremail@address.com',
// //         pass: 'yourpassword'
// //     }
// // });

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//             service: 'gmail',

//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: 'porakarnsoon@gmail.com', // generated ethereal user
//             pass: '' // generated ethereal password
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: '"Sorns" <porakarnsoon@gmail.com>', // sender address
//         to: email3, // list of receivers
//         subject: 'คุณมีข้อความใหม่มา', // Subject line
//         text: 'คุณมีข้อความใหม่มา', // plain text body
//         html: output // html body
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         res.render('contact', {
//             msg: 'Email has been sent'
//         });
//     });
// });





app.use('/', index);
app.use('/auth', auth);


// mongoose.connect('mongodb://localhost/porvue');
mongoose.connect('mongodb://porakarn:porakarn03@ds215739.mlab.com:15739/chat2'
);

app.use(passport.initialize());
// app.use(passport.session());

app.listen(process.env.PORT || 8081)


module.exports = app;