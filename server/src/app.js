const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const app = express()
var passport = require('passport');



app.use(morgan('combined'))



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors())

const index = require('./Routes/index');
var auth = require('./Routes/auth');

require('./config/passport')(passport);


app.get('/', function(req,res){
    res.send('test jaaa')
})

app.use('/', index);
app.use('/auth', auth);


// mongoose.connect('mongodb://localhost/porvue');
mongoose.connect('mongodb://porakarn:porakarn03@ds215739.mlab.com:15739/chat2'
);

app.use(passport.initialize());
// app.use(passport.session());

app.listen(process.env.PORT || 8081)


module.exports = app;