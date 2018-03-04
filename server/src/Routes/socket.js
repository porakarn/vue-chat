var express = require('express');
var router = express.Router();
const app = express()
var server = require('http').Server(app);
const client = require('socket.io')(server)

var Chat = require('../Models/chat');

var io = socket(server)

io.on('connection', function (socket) {
    console.log('made socket connection', socket.id);

    socket.on('chat', function (data) {
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data)

    })


})





// client.on('connection', function (socket) {
//     // var to mongoose

//     //Create function to send status 
//     sendStatus = function (s) {
//         socket.emit('status', s);
//     }

//     //get chats from mongo collection

//     // Chat.find().limit(100).sort({_id:1})function(err,res){
//     //     if (err) {
//     //         throw err;
//     //     } else {
//     //         socket.emit('output', res);
//     //     }
//     // }

//     // Handle input event
//     socket.on('input', function (data) {
//         let name = data.name;
//         let message = data.message;

//         // check 
//         if (name == '' || message == '') {
//             // send error
//             sendStatus('Please enter a name and message');
//         } else {
//             // insert message
//             Chat.insert({ name: name, message: message }, function () {
//                 client.emit('output', [data]);

//                 //sendStatus object
//                 sendStatus({
//                     message: 'Message sent',
//                     clear: true
//                 })
//             })
//         }
//     });

//     //Handle clear
//     socket.on('clear', function (data) {
//         // remove all chat from the collection
//         Chat.remove({}, function () {
//             //Emit Cleared
//             socket.emit('cleared');
//         })
//     });

// });

module.exports = router