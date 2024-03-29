const path = require("path");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const {Users} = require("./utils/users");
const {generateMessage,generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const publicPath = path.join(__dirname , "../public");
var app = express();
var port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIo(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
	console.log("New user connected");

	socket.on("join", (params, callback) =>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback("Name and room name is required");
		}

		socket.join(params.room);

		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		socket.emit("newMessage", generateMessage("Admin" ,"Welcome to the chat app"));
		socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin" ,`${params.name} has joined`));
		 callback();
	});

	socket.on('createMessage', (message, callback) =>{
		var user = users.getUser(socket.id);

		if(user){
			io.to(user.room).emit("newMessage" ,generateMessage(user.name ,message.text));
		}
		callback();
	});

	socket.on('createLocationMessage', (coords) =>{
		var user = users.getUser(socket.id);

		if(user){
			io.emit("newLocationMessage" ,generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});

	socket.on('disconnect', () =>{
		var user = users.removeUser(socket.id);

		if(user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});
});




server.listen(app.get('port') ,() =>{
	console.log(`Server is up on port ${port}`);
});
