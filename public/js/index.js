var socket = io();

socket.on('connect', function (){
	console.log("connected to server");
});

socket.on('newMessage', (message) =>{
	console.log("newMessage" , message);

	var li = jQuery("<li></li>");
	li.text(`${message.from}: ${message.text}`);
	jQuery("#messages").append(li);
});

socket.on('disconnect', function (){
	console.log("Disconnected form server");
});


jQuery("#message-form").on("submit", function(e){
	e.preventDefault();

	socket.emit("createMessage",{
		from: "User",
		text: jQuery("[name=message").val()
	}, function(data){
		console.log("Got it" ,data);
	});

});