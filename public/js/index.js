var socket = io();

socket.on('connect', function (){
	console.log("connected to server");
});

socket.on('newMessage', (message) =>{
	var formattedTime = moment().format("hh:mm a");
	var template = jQuery("#message__template").html();
	var html = Mustache.render(template,{
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	});

	jQuery("#messages").append(html);
});

socket.on('disconnect', function (){
	console.log("Disconnected form server");
});


socket.on('newLocationMessage', (message) =>{
	var formattedTime = moment().format("hh:mm a");
	var template = jQuery("#location__message__template").html();
	var html = Mustache.render(template,{
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	jQuery("#messages").append(html);
});

jQuery("#message-form").on("submit", function(e){
	e.preventDefault();

	var messageBox = jQuery("[name=message");

	socket.emit("createMessage",{
		from: "User",
		text: messageBox.val()
	}, function(){
		messageBox.val("");
	});

});


var locationButton = jQuery("#send-location");
locationButton.on("click", function(){

	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser.");
	}

	locationButton.attr("disabled", "disabled").text("Sending location...");

	navigator.geolocation.getCurrentPosition(function (position){

		locationButton.removeAttr("disabled").text("Send location");
		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function(){
		locationButton.removeAttr("disabled").text("Send location");
		alert("Unable to fetch location.")
	});
});