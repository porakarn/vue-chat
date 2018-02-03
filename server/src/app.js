const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())




const index = require('./Routes/index');
var auth = require('./Routes/auth');

app.use('/', index);
app.use('/auth', auth);

mongoose.connect('mongodb://localhost/porvue');

app.listen(process.env.PORT || 8081)


module.exports = app;